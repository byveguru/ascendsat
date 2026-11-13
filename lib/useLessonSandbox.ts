import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

/** Device-only sandbox drafts, never assessment records. */
export function useLessonSandbox<T>(scope: string | null, id: string, initial: T, validate: (value: any) => value is T) {
  const [state, setState] = useState(initial);
  const [readyKey, setReadyKey] = useState<string | null>(null);
  const [notice, setNotice] = useState("");
  const current = useRef({ initial, validate }); current.current = { initial, validate };
  const key = scope ? `ascend:lesson-sandbox:v1:${encodeURIComponent(scope)}:${id}` : "session";
  useEffect(() => {
    let cancelled = false;
    setReadyKey(null); setState(current.current.initial); setNotice("");
    const restore = async () => {
      try {
        const raw = key === "session" ? null : await AsyncStorage.getItem(key);
        const saved = raw ? JSON.parse(raw) : null;
        if (!cancelled && saved?.version === 1 && current.current.validate(saved.state)) setState(saved.state);
      } catch { if (!cancelled) setNotice("Device saving is unavailable; this activity still works in this session."); }
      finally { if (!cancelled) setReadyKey(key); }
    };
    void restore(); return () => { cancelled = true; };
  }, [key]);
  const ready = readyKey === key;
  useEffect(() => {
    if (!ready || key === "session") return;
    const timer = setTimeout(() => {
      AsyncStorage.setItem(key, JSON.stringify({ version: 1, state })).catch(() => setNotice("Device saving is unavailable; this activity still works in this session."));
    }, 250);
    return () => clearTimeout(timer);
  }, [ready, key, state]);
  return { state, setState, ready, notice };
}
