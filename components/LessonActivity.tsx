import SortableLessonSteps from "./SortableLessonSteps";
import { lessonChoiceOrder } from "../lib/lessonChoiceOrder";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MathText } from "../MathText";
import MathAnswerInput from "./MathAnswerInput";
import { makeLessonActivityStyles } from "../appStyles";
import { normalizeLessonNumericResponse } from "../lib/lessonNumericResponse";

export const LESSON_ACTIVITY_TYPES = new Set(["guidedExample", "prediction", "recall", "sequence", "reflection"]);

type ActivityState = { step?: number; selected?: Record<string, number>; checked?: Record<string, boolean>; hints?: Record<string, boolean>; text?: string; revealed?: boolean; order?: number[] };
const initialState = (block: any): ActivityState => ({ step:0, selected:{}, checked:{}, hints:{}, text:"", revealed:false, order:block.initialOrder || block.items?.map((_:any,index:number)=>index) });

/** Activities are learning work, not exam grades. Drafts stay on this device. */
export default function LessonActivity({ block, isLight=true, scopeKey=null, renderCoach }: any) {
  const s=makeLessonActivityStyles(isLight);
  const key=scopeKey&&block.id?`ascend:lesson-activity:v1:${encodeURIComponent(scopeKey)}:${encodeURIComponent(block.id)}`:null;
  const [state,setState]=useState<ActivityState>(()=>initialState(block));
  const [ready,setReady]=useState(!key);
  const [storageNotice,setStorageNotice]=useState("");
  const update=(patch:Partial<ActivityState>)=>setState(prev=>({...prev,...patch}));
  useEffect(()=>{
    let cancelled=false;
    if(!key){setReady(true);return;}
    AsyncStorage.getItem(key).then(raw=>{
      if(cancelled)return;
      if(raw){try{const saved=JSON.parse(raw);if(saved.version===1&&saved.id===block.id&&saved.state&&typeof saved.state==='object'){
        const value=saved.state;
        setState({...initialState(block),...value,step:Math.max(0,Math.min(Number.isInteger(value.step)?value.step:0,Math.max(0,(block.steps?.length||1)-1))),text:typeof value.text==='string'?value.text.slice(0,12000):"",order:Array.isArray(value.order)&&value.order.length===block.items?.length&&new Set(value.order).size===value.order.length&&value.order.every((x:any)=>Number.isInteger(x)&&x>=0&&x<value.order.length)?value.order:initialState(block).order});
      }}catch{setStorageNotice("A saved attempt could not be restored. You can try the activity again.");}}
      setReady(true);
    }).catch(()=>{if(!cancelled){setReady(true);setStorageNotice("Your work is available in this session; device saving is unavailable.");}});
    return()=>{cancelled=true;};
  },[key,block.id]);
  useEffect(()=>{
    if(!key||!ready)return;
    const timer=setTimeout(()=>{AsyncStorage.setItem(key,JSON.stringify({version:1,id:block.id,state})).catch(()=>setStorageNotice("Your work is available in this session; device saving is unavailable."));},350);
    return()=>clearTimeout(timer);
  },[key,ready,state,block.id]);
  const button=(label:string,onPress:()=>void,disabled=false,secondary=false,accessibleLabel?:string)=><TouchableOpacity accessibilityLabel={accessibleLabel||label} accessibilityRole="button" disabled={disabled} accessibilityState={{disabled}} onPress={onPress} style={[secondary?s.secondary:s.primary,disabled&&s.disabled]}><Text style={secondary?s.secondaryText:s.primaryText}>{label}</Text></TouchableOpacity>;
  const math=(text:string,style:any=s.body)=><MathText text={text||""} style={style} selectable={false}/>;
  const title=block.title||({guidedExample:"Work through an example",prediction:"Predict, then check",recall:"Try it yourself",sequence:"Put the reasoning in order",reflection:"Explain your thinking"} as any)[block.type];
  const choiceActivity=(item:any,id:string)=>{
    const selected=state.selected?.[id];const checked=!!state.checked?.[id];const correct=selected===item.answer;
    return <View>
      {math(item.prompt||item.question,s.prompt)}
      <View accessibilityRole="radiogroup" accessibilityLabel={item.prompt||item.question}>{lessonChoiceOrder(item.choices.length,`${block.id}:${id}`).map((index:number,displayIndex:number)=>{const choice=item.choices[index];return <TouchableOpacity key={index} accessibilityRole="radio" accessibilityLabel={choice} aria-checked={selected===index} accessibilityState={{checked:selected===index,disabled:checked||!ready}} disabled={checked||!ready} onPress={()=>update({selected:{...state.selected,[id]:index}})} style={[s.option,selected===index&&s.selected,checked&&index===item.answer&&s.correct,checked&&selected===index&&!correct&&s.incorrect]}><Text style={s.optionLabel}>{String.fromCharCode(65+displayIndex)}</Text><View style={s.choiceText}>{math(choice)}</View></TouchableOpacity>;})}</View>
      {!checked?<View style={s.actions}>{button("Check my reasoning",()=>update({checked:{...state.checked,[id]:true}}),selected===undefined||!ready)}{item.hint&&button(state.hints?.[id]?"Hide hint":"Give me a hint",()=>update({hints:{...state.hints,[id]:!state.hints?.[id]}}),!ready,true)}</View>:<View style={[s.feedback,!correct&&s.incorrectFeedback]}><Text accessibilityLiveRegion="polite" style={correct?s.success:s.feedbackTitle}>{correct?"That reasoning works.":"Not quite — compare the two approaches."}</Text>{math(item.explanation)}{!correct&&math(`The supported answer is: ${item.choices[item.answer]}`)}{button("Try this step again",()=>update({checked:{...state.checked,[id]:false}}),false,true)}</View>}
      {state.hints?.[id]&&!checked&&math(item.hint,s.hint)}
    </View>;
  };
  const renderBody=()=>{
    if(block.type==="guidedExample"){
      const steps=block.steps||[];if(!steps.length)return null;
      const index=state.step||0,step=steps[index];
      const done=!!state.checked?.[`step-${index}`];
      return <View>{math(block.scenario,s.body)}<Text style={s.progress}>Step {index+1} of {steps.length}</Text>{step.choices?choiceActivity(step,`step-${index}`):<View>{math(step.prompt,s.prompt)}{!done?button("Show this step",()=>update({checked:{...state.checked,[`step-${index}`]:true}}),!ready):<View style={s.feedback}>{math(step.explanation)}</View>}</View>}<View style={s.actions}>{index>0&&button("Previous step",()=>update({step:index-1}),!ready,true)}{index<steps.length-1&&button("Next step",()=>update({step:index+1}),!done||!ready)}</View>{index===steps.length-1&&done&&block.takeaway&&<View style={s.summary}>{math(block.takeaway)}</View>}</View>;
    }
    if(block.type==="prediction")return choiceActivity(block,"prediction");
    if(block.type==="sequence"){
      const order=state.order||block.items.map((_:any,index:number)=>index),checked=!!state.revealed;
      const target=block.correctOrder||block.items.map((_:any,index:number)=>index);
      const correct=order.every((value:number,index:number)=>value===target[index]);
      const move=(from:number,to:number)=>{const next=[...order];[next[from],next[to]]=[next[to],next[from]];update({order:next,revealed:false});};
      return <View>{math(block.prompt,s.prompt)}<SortableLessonSteps items={block.items} order={order} onChange={(next:number[])=>update({order:next,revealed:false})} disabled={!ready} isLight={isLight}/>{button("Check the order",()=>update({revealed:true}),!ready)}{checked&&<View style={[s.feedback,!correct&&s.incorrectFeedback]}><Text accessibilityLiveRegion="polite" style={correct?s.success:s.feedbackTitle}>{correct?"The sequence is supported.":"Not quite — revisit the connections between these steps."}</Text>{math(block.explanation)}{!correct&&math(target.map((item:number,index:number)=>`${index+1}. ${block.items[item]}`).join("\n"))}</View>}</View>;
    }
    const typed=state.text||"",revealed=!!state.revealed;
    const numeric=block.type==="recall"&&Array.isArray(block.acceptedAnswers)&&block.acceptedAnswers.length>0;
    const normalized=normalizeLessonNumericResponse(typed);
    const correct=numeric&&normalized!==null&&block.acceptedAnswers.some((answer:string)=>normalizeLessonNumericResponse(answer)===normalized);
    return <View>{math(block.prompt,s.prompt)}<MathAnswerInput value={typed} onChangeText={(text:string)=>update({text,revealed:false})} editable={ready} isLight={isLight} mathEnabled={!!block.math} accessibilityLabel={block.type==="reflection"?"Explain your reasoning":"Activity response"} placeholder={block.math?"Write your calculation or reasoning…":"Write your reasoning…"}/><View style={s.actions}>{button(numeric?"Check my answer":"Compare with an example",()=>update({revealed:true}),!typed.trim()||!ready)}{block.hint&&button(state.hints?.writing?"Hide hint":"Give me a hint",()=>update({hints:{...state.hints,writing:!state.hints?.writing}}),!ready,true)}</View>{state.hints?.writing&&!revealed&&math(block.hint,s.hint)}{revealed&&<View style={[s.feedback,numeric&&!correct&&s.incorrectFeedback]}><Text accessibilityLiveRegion="polite" style={numeric&&correct?s.success:s.feedbackTitle}>{numeric?(correct?"Your value matches.":normalized===null?"Use a number or a fraction for this check.":"Check the method and units."):"Compare the reasoning, not just the final sentence."}</Text>{math(block.sampleAnswer||block.explanation)}{block.checklist?.map((item:string,index:number)=><Text key={index} style={s.body}>• {item}</Text>)}{!numeric&&<Text style={s.note}>This is a learning reflection, not an automated grade.</Text>}</View>}</View>;
  };
  const step = block.steps?.[state.step || 0];
  const checkedId = block.type === "guidedExample" ? `step-${state.step || 0}` : "prediction";
  const choiceChecked = !!state.checked?.[checkedId];
  const choiceCorrect = state.selected?.[checkedId] === (step || block).answer;
  const showCoach = choiceChecked || !!state.revealed;
  const coachCorrect = block.type === "sequence" ? (state.order || []).every((value:number,index:number)=>value===(block.correctOrder || block.items.map((_:any,i:number)=>i))[index]) : choiceChecked ? choiceCorrect : block.type === "recall" && block.acceptedAnswers ? block.acceptedAnswers.some((answer:string)=>normalizeLessonNumericResponse(answer)===normalizeLessonNumericResponse(state.text||"")) : null;
  return <View style={s.panel}><Text accessibilityRole="header" style={s.title}>{title}</Text>{!ready&&<Text style={s.note}>Restoring your attempt…</Text>}{renderBody()}{showCoach&&renderCoach?.(coachCorrect===true?"proud":coachCorrect===false?"encouraging":"thinking",coachCorrect===true?"You’ve got the reasoning. Try the next step when you’re ready.":coachCorrect===false?"Let’s work through the explanation. You can try this step again.":"Compare your explanation with the example. Which part would you keep or revise?")}{storageNotice?<Text accessibilityLiveRegion="polite" style={s.note}>{storageNotice}</Text>:null}</View>;
}
