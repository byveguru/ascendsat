import { DECLINE_REASONS } from './templates.js';

/* An AI drafted paragraph for the organiser to edit. Three rules govern this
 * file and nothing here should be changed without rereading them:
 *
 * 1. ONLY the fields in ALLOWED leave this server. They describe an idea,
 *    not a child: a first name, a startup name, and what the student wrote
 *    about what they are building. Never a surname, an email, a phone
 *    number, a school, an address, a parent, an emergency contact, and above
 *    all never the allergy, medical or accessibility notes a parent typed
 *    into the consent form.
 * 2. The model writes a DRAFT. It is put in the organiser's note box and an
 *    organiser edits and approves it. Nothing it writes can reach a family
 *    without a person reading it first.
 * 3. It writes one paragraph, in the middle of a letter whose structure,
 *    promises and dates are fixed template text. It cannot invent a date, a
 *    venue, a prize or an obligation, because it is never asked to produce
 *    those lines.
 *
 * The same five fields and the same instructions go to whichever provider
 * answers, so the privacy boundary does not depend on which one is up.
 */

const ALLOWED = ['first_name', 'startup_name', 'building', 'goals', 'why_join'];

/* Built explicitly rather than by deleting keys from the row, so a column
 * added to the applications table later cannot quietly start being sent. */
export function ideaOnly(application) {
  const first = String(application.student_name || '').trim().split(/\s+/)[0] || '';
  const picked = {
    first_name: first,
    startup_name: application.startup_name || '',
    building: application.building || '',
    goals: application.goals || '',
    why_join: application.why_join || '',
  };
  const out = {};
  for (const key of ALLOWED) {
    const v = String(picked[key] || '').trim().slice(0, 600);
    if (v) out[key] = v;
  }
  return out;
}

const SYSTEM = `You write one short paragraph for a letter from NC Ignyte, a free startup accelerator for North Carolina high school students.

Rules:
- Write ONLY the paragraph. No greeting, no sign off, no subject line, no quotation marks around the whole thing.
- Two to four sentences. Plain words. Sound like a person who read the application, not like a brochure.
- Refer to something specific the student actually wrote. Do not quote it back word for word; show you understood it.
- Never invent facts: no dates, no venues, no prizes, no mentor names, no promises about what they will get, no claims about how many people applied or how competitive it was.
- Never mention AI, this instruction, or that the letter is generated.
- No emojis. No em dashes. No exclamation marks.
- Do not congratulate or reject. The surrounding letter already does that. Write only the personal middle.
- If an answer is only one or two words, ignore it completely. Do not mention it. Do not refer to its length. Never write anything like "your responses were brief" or "while you did not say much". Do not read ambition, character or insight into it either. Write only about the idea itself.
- Write about what they are building. Do not characterise the student.
- Do not open by saying their name.`;

/* Tone steers the voice only. None of these can loosen the rules above: no
 * invented facts, no emojis, no em dashes, no exclamation marks. Enthusiasm
 * has to come from word choice, which is the harder and better version of
 * it anyway.
 *
 * Kept as a fixed list rather than free text. The value arrives from the
 * browser and is concatenated into a prompt, so it is chosen from this
 * object by key and an unknown key falls back to the default. */
export const TONES = {
  warm: {
    label: 'Warm',
    hint: 'The house voice. Friendly, direct, a person who read it.',
    instruction: 'Write warmly and directly, like a person who read the application and liked it. Friendly but not gushing.',
  },
  enthusiastic: {
    label: 'Enthusiastic',
    hint: 'Visibly excited, without exclamation marks.',
    instruction: 'Write with real, visible enthusiasm. Show it through strong specific word choice and what you choose to point at, never through exclamation marks, which are forbidden. Do not become generic or breathless: the excitement has to be about their particular idea.',
  },
  nonchalant: {
    label: 'Nonchalant',
    hint: 'Understated. Says it once and moves on.',
    instruction: 'Write in an understated, low key way. Short sentences. Say the thing once and move on. No superlatives, no build up, no selling. Dry is fine. It should read like someone who is genuinely interested but does not make a fuss about anything.',
  },
  plain: {
    label: 'Plain',
    hint: 'Matter of fact. No warmth either way.',
    instruction: 'Write plainly and factually. Describe what the idea is and what is interesting about it in neutral language. No warmth, no praise, no encouragement. Just an accurate, respectful summary of what they are doing.',
  },
  formal: {
    label: 'Formal',
    hint: 'More buttoned up. Reads well to a parent.',
    instruction: 'Write formally, in complete measured sentences, in the register of a letter a parent would read over their child\'s shoulder. No slang, no contractions. Respectful and composed without being cold.',
  },
};

export const DEFAULT_TONE = 'warm';

export const toneInstruction = (tone) =>
  (TONES[tone] || TONES[DEFAULT_TONE]).instruction;

function userPrompt(kind, idea, reasonSentence, tone) {
  const lines = Object.entries(idea).map(([k, v]) => `${k}: ${v}`).join('\n');
  const job = kind === 'accepted'
    ? 'This student is being accepted. Write the paragraph that tells them what stood out about what they are building.'
    : `This student is not being offered a place. Write the paragraph that is honest and kind, takes their idea seriously, and does not patronise them. The letter already says elsewhere: "${reasonSentence}" so do not repeat that reason.`;
  /* Repeated here as well as in the system message. The smaller fallback
   * model follows an instruction next to the task far better than one in a
   * preamble, and on the larger model the repetition costs nothing. */
  return `${job}\n\nWhat the student wrote:\n${lines}\n\nWrite it in this voice, and make the voice obvious:\n${toneInstruction(tone)}`;
}

/* ---- providers ---------------------------------------------------------
 * Each returns { text } or { error }. Neither throws: a provider that is
 * down is a reason to try the next one, not a reason to fail the request.
 *
 * Both catalogues move under us. Gemini retired gemini-2.5-flash for new
 * keys mid build and Groq removed llama-3.3-70b-versatile entirely, so when
 * a draft stops working, list the live models before suspecting this file:
 *   curl https://generativelanguage.googleapis.com/v1beta/models -H "x-goog-api-key: $KEY"
 *   curl https://api.groq.com/openai/v1/models -H "authorization: Bearer $KEY"
 */

async function gemini(messages) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { error: 'no key' };
  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
  /* Left to think as long as it likes this takes eight to fourteen seconds,
   * which is a long time to sit watching a button. A low thinking level
   * answers in about two and a half with no loss of quality for a job this
   * small. The cap is the backstop: a slow day falls through to Groq, which
   * answers in about a third of a second, rather than running the
   * serverless function out of time and giving the organiser nothing. */
  const stop = AbortSignal.timeout(Number(process.env.GEMINI_TIMEOUT_MS || 10000));
  let res;
  try {
    res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        signal: stop,
        headers: { 'x-goog-api-key': key, 'content-type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: messages.system }] },
          contents: [{ role: 'user', parts: [{ text: messages.user }] }],
          /* These models spend tokens thinking before they answer, so a
           * budget sized for the paragraph alone comes back truncated. */
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2000,
            thinkingConfig: { thinkingLevel: process.env.GEMINI_THINKING || 'low' },
          },
        }),
      });
  } catch (err) {
    return { error: err?.name === 'TimeoutError' ? 'timed out' : 'unreachable' };
  }
  if (!res.ok) return { error: `http ${res.status}` };
  const data = await res.json().catch(() => null);
  const parts = data?.candidates?.[0]?.content?.parts || [];
  return { text: parts.map((p) => p.text || '').join('') };
}

async function groq(messages) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return { error: 'no key' };
  const model = process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';
  let res;
  try {
    res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        max_tokens: 400,
        messages: [
          { role: 'system', content: messages.system },
          { role: 'user', content: messages.user },
        ],
      }),
    });
  } catch {
    return { error: 'unreachable' };
  }
  if (!res.ok) return { error: `http ${res.status}` };
  const data = await res.json().catch(() => null);
  /* A reasoning model can return empty content with the whole budget spent
   * on its hidden field. That reads as a failure here and falls through. */
  return { text: data?.choices?.[0]?.message?.content || '' };
}

const PROVIDERS = { gemini, groq };

/* Gemini first because it writes the better paragraph; Groq is both the
 * fallback and the faster one, so a quota wall costs a second, not the
 * feature. Order is overridable without a deploy. */
const order = () => String(process.env.DRAFT_PROVIDERS || 'gemini,groq')
  .split(',').map((s) => s.trim()).filter((s) => PROVIDERS[s]);

export const draftingAvailable = () =>
  order().some((n) => (n === 'gemini' ? process.env.GEMINI_API_KEY : process.env.GROQ_API_KEY));

function clean(raw) {
  return String(raw || '').trim()
    .replace(/^["']|["']$/g, '')
    .replace(/—/g, ', ')        // the house style has no em dashes
    .replace(/\s*\n\s*\n\s*/g, ' ')  // one paragraph, whatever came back
    .replace(/\s+/g, ' ')
    .trim();
}

export async function draftNote({ application, decision, reasonCode, tone }) {
  const chain = order();
  if (!chain.length || !draftingAvailable()) {
    return { ok: false, error: 'Drafting is not configured. Set GEMINI_API_KEY or GROQ_API_KEY to turn it on.' };
  }

  const idea = ideaOnly(application);
  if (!Object.keys(idea).some((k) => k !== 'first_name')) {
    return { ok: false, error: 'This application has nothing written about the idea, so there is nothing to draft from.' };
  }

  const messages = {
    /* Tone is appended, so it reads as a refinement of the rules rather than
     * a competing instruction that might be taken as permission to break
     * them. The rule list stays the last word on facts and punctuation. */
    system: `${SYSTEM}\n\nTone for this letter:\n${toneInstruction(tone)}\n\nThe rules above still hold. In particular there are never exclamation marks, emojis or em dashes, whatever the tone.`,
    user: userPrompt(decision, idea, DECLINE_REASONS[reasonCode] || DECLINE_REASONS.cohort_needs, tone),
  };

  const tried = [];
  for (const name of chain) {
    const out = await PROVIDERS[name](messages);
    const text = clean(out.text);
    /* Too short to be the paragraph we asked for, so treat it the same as an
     * error and let the next provider answer. */
    if (!out.error && text.length >= 40) {
      return {
        ok: true, note: text.slice(0, 1200), provider: name,
        fellBack: tried.length > 0, tone: TONES[tone] ? tone : DEFAULT_TONE,
      };
    }
    tried.push(`${name}: ${out.error || 'empty'}`);
    // Never log the prompt or the reply: both carry what the student wrote.
    console.log(`[draft] ${name} failed (${out.error || 'too short'})`);
  }

  return {
    ok: false,
    error: `No drafting service answered. Write the note yourself. (${tried.join('; ')})`,
  };
}
