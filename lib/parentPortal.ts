import { auth } from '../firebase';
export { buildSummary as buildParentSummary } from './parentSummary.cjs';
export async function callParentApi(action: string, payload: Record<string, any> = {}, user = auth.currentUser) {
  if (!user) throw new Error('Sign in to continue.');
  const uid = user.uid;
  const token = await user.getIdToken();
  if (auth.currentUser?.uid !== uid) throw new Error('Your account changed. Please retry.');
  const local = typeof window !== 'undefined' && ['127.0.0.1', 'localhost'].includes(window.location.hostname);
  const base = local ? 'http://127.0.0.1:8772' : 'https://ascendsat.com';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 20000);
  let response, result;
  try {
    response = await fetch(`${base}/api/parent`, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ ...payload, action }), signal: controller.signal });
    result = await response.json().catch(() => ({}));
  } catch (error) {
    if (controller.signal.aborted) throw new Error('Parent sharing took too long to respond. Please retry.');
    throw error;
  } finally { clearTimeout(timer); }
  if (auth.currentUser?.uid !== uid) throw new Error('Your account changed. Please retry.');
  if (!response.ok) throw new Error(result.error || 'Parent sharing could not be loaded. Please retry.');
  return result;
}
