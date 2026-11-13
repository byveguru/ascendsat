// Server-only ordered failover. Never expose credentials or provider error bodies.
const cooldowns=new Map();
const unique=values=>[...new Set(values.filter(v=>typeof v==='string'&&v.trim()).map(v=>v.trim()))];
const numbered=(env,prefix)=>Object.keys(env).filter(k=>new RegExp('^'+prefix+'_\\d+$').test(k)).sort((a,b)=>Number(a.slice(prefix.length+1))-Number(b.slice(prefix.length+1))).map(k=>env[k]);
function credentials(env){
 const gemini=unique([env.GEMINI_API_KEY,env.GOOGLE_API_KEY,...numbered(env,'GEMINI_API_KEY'),env.GEMINI_API_KEY_BACKUP_1,env.GEMINI_API_KEY_BACKUP_2]);
 const groq=unique([env.GROQ_API_KEY,...numbered(env,'GROQ_API_KEY'),env.GROQ_API_KEY_BACKUP_1,env.GROQ_API_KEY_BACKUP_2]);
 return [...gemini.map((key,i)=>({provider:'gemini',slot:i+1,key})),...groq.map((key,i)=>({provider:'groq',slot:i+1,key}))];
}
const blockedReasons=new Set(['SAFETY','PROHIBITED_CONTENT','BLOCKLIST','SPII','RECITATION','IMAGE_SAFETY','IMAGE_PROHIBITED_CONTENT','CONTENT_FILTER','CONTENT_POLICY_VIOLATION','SAFETY_VIOLATION']);
const reasonBlocked=value=>typeof value==='string'&&blockedReasons.has(value.toUpperCase());
function blockedResponse(data){
 return !!data?.promptFeedback?.blockReason||data?.candidates?.some(c=>reasonBlocked(c.finishReason))||data?.choices?.some(c=>reasonBlocked(c.finish_reason)||!!c.message?.refusal)||reasonBlocked(data?.error?.code)||reasonBlocked(data?.error?.type)||data?.error?.details?.some(d=>reasonBlocked(d.reason));
}
const blockedError=()=>Object.assign(new Error('The provider could not review this content.'),{code:'AI_CONTENT_BLOCKED'});
async function generateReply({messages,maxTokens,model,responseFormat},{env=process.env,fetchImpl=fetch,now=Date.now,totalTimeoutMs=50000}={}){
 const options=credentials(env),started=now(),attempts=[];
 if(!options.length)throw Object.assign(new Error('AI feedback is not configured.'),{code:'AI_NOT_CONFIGURED',attempts});
 for(const option of options){
  const cacheKey=option.provider+':'+option.key;
  if((cooldowns.get(cacheKey)||0)>now()){attempts.push({provider:option.provider,slot:option.slot,status:'cooldown'});continue;}
  const remaining=totalTimeoutMs-(now()-started);if(remaining<=0)break;
  const timeout=Math.max(1,Math.floor(Math.min(15000,remaining))),signal=AbortSignal.timeout(timeout);
  const geminiModel=['gemini-3.8-flash','gemini-3.5-flash-lite','gemini-2.5-flash','gemini-2.5-flash-lite'].includes(env.GEMINI_MODEL)?env.GEMINI_MODEL:'gemini-3.8-flash';
  const system=messages.filter(m=>m.role==='system').map(m=>m.content).join('\n\n');
  const contents=messages.filter(m=>m.role!=='system').map(m=>({role:m.role==='assistant'?'model':'user',parts:[{text:m.content}]}));
  if(!contents.length)contents.push({role:'user',parts:[{text:'Respond to the instructions.'}]});
  const modern=option.provider==='gemini'&&!geminiModel.startsWith('gemini-2.5');
 const url=option.provider==='gemini'?(modern?'https://generativelanguage.googleapis.com/v1beta/interactions':`https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent`):'https://api.groq.com/openai/v1/chat/completions';
  const payload=option.provider==='gemini'?{...(system?{systemInstruction:{parts:[{text:system}]}}:{}),contents,generationConfig:{maxOutputTokens:maxTokens,temperature:responseFormat==='json'?0.1:0.5,thinkingConfig:geminiModel.startsWith('gemini-2.5')?{thinkingBudget:0}:{thinkingLevel:'low'},...(responseFormat==='json'?{responseMimeType:'application/json'}:{})}}:{model,max_tokens:maxTokens,messages,...(responseFormat==='json'?{response_format:{type:'json_object'}}:{})};
  const body=modern?{model:geminiModel,store:false,...(responseFormat==='json'?{response_format:{type:'text',mime_type:'application/json'}}:{}),input:contents.length===1?contents[0].parts.map(p=>p.text).join('\n'):JSON.stringify(contents.map(turn=>({role:turn.role,content:turn.parts.map(p=>p.text).join('\n')}))),system_instruction:system+(responseFormat==='json'?'\nReturn only a valid JSON object.':''),generation_config:{max_output_tokens:maxTokens,thinking_level:'low',temperature:responseFormat==='json'?.1:.5}}:payload;
  try{
   const res=await fetchImpl(url,{method:'POST',headers:{'Content-Type':'application/json',...(option.provider==='gemini'?{'x-goog-api-key':option.key,...(modern?{'Api-Revision':'2026-05-20'}:{})}:{Authorization:'Bearer '+option.key})},body:JSON.stringify(body),signal});
   if(!res.ok){
    // Inspect only structured policy indicators, never forward upstream text.
    let errorData=null;try{errorData=await res.json();}catch(e){}
    if(blockedResponse(errorData))throw blockedError();
    attempts.push({provider:option.provider,slot:option.slot,status:res.status});
    if([400,401,403,404,429].includes(res.status)||res.status>=500){
     const raw=res.headers?.get?.('retry-after'),seconds=raw==null?NaN:Number(raw),date=typeof raw==='string'?Date.parse(raw):NaN;
     const retryMs=Number.isFinite(seconds)?seconds*1000:Number.isFinite(date)?date-now():60000;
     cooldowns.set(cacheKey,now()+([401,403].includes(res.status)?600000:res.status===429?Math.min(600000,Math.max(60000,retryMs)):30000));
    }
    continue;
   }
   const data=await res.json();
   if(blockedResponse(data)||(Array.isArray(data.steps)&&data.steps.some(step=>step.status==='blocked'||step.type==='refusal'||Array.isArray(step.content)&&step.content.some(part=>part.type==='refusal'))))throw blockedError();
   const finish=modern?data.status:option.provider==='gemini'?data.candidates?.[0]?.finishReason:data.choices?.[0]?.finish_reason;
   const reply=modern?(data.steps||[]).filter(step=>step.type==='model_output').at(-1)?.content?.filter(part=>part.type==='text').map(part=>part.text||'').join(''):option.provider==='gemini'?data.candidates?.[0]?.content?.parts?.filter(p=>!p.thought).map(p=>p.text||'').join(''):data.choices?.[0]?.message?.content;
   if(typeof reply!=='string'||!reply.trim()||(finish&&!(modern?['completed']:option.provider==='gemini'?['STOP']:['stop']).includes(finish))){attempts.push({provider:option.provider,slot:option.slot,status:'incomplete'});cooldowns.set(cacheKey,now()+5000);continue;}
   if(responseFormat==='json'){try{const parsed=JSON.parse(reply);if(!parsed||Array.isArray(parsed)||typeof parsed!=='object')throw Error();}catch(e){attempts.push({provider:option.provider,slot:option.slot,status:'invalid_json'});cooldowns.set(cacheKey,now()+5000);continue;}}
   return {reply,provider:option.provider,model:option.provider==='gemini'?geminiModel:model};
  }catch(error){if(error.code==='AI_CONTENT_BLOCKED')throw error;attempts.push({provider:option.provider,slot:option.slot,status:'unavailable'});cooldowns.set(cacheKey,now()+60000);}
 }
 throw Object.assign(new Error('Writing feedback is temporarily unavailable. Your response has not been graded. Please retry shortly.'),{code:'AI_PROVIDERS_UNAVAILABLE',attempts});
}
module.exports={generateReply,credentials};
