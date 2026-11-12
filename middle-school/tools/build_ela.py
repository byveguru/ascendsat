"""Build the ELA passage and item banks from the authored source files.

Source:  tools/ela_source/grade<N>.json   (the files authors edit)
Output:  data/passages-ela<N>.json and data/items-ela<N>.json

Run from middle-school/tools:  python3 -I build_ela.py
Deterministic: the order of choices is decided by a per-grade seeded shuffle that also keeps the
correct answer evenly spread across positions A-D.

Source format
{
  "passages": [{"kind": "literary|informational|poem", "title": "...", "text": "...", "topic": "..."}],
  "items": [{"passage": 0 or null, "standard": "RL.6.2", "difficulty": "core|stretch|challenge",
             "prompt": "...", "answer": "...", "wrong": [{"text": "...", "why": "..."} x3],
             "explanation": "..."}]
}
"passage" is the 0-based index into the passages list; null for standalone vocabulary items (L.*).
"""
import json
import os
import random
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
SRC = os.path.join(HERE, "ela_source")


def syllables(word):
    w = re.sub(r"[^a-z]", "", word.lower())
    if not w:
        return 0
    n = len(re.findall(r"[aeiouy]+", w))
    if w.endswith("e") and not w.endswith(("le", "ee")) and n > 1:
        n -= 1
    return max(n, 1)


def flesch_kincaid(text):
    sents = max(len(re.findall(r"[.!?]+(?:\s|$)", text)), 1)
    words = re.findall(r"[A-Za-z']+", text)
    if not words:
        return 0.0
    syl = sum(syllables(w) for w in words)
    return round(0.39 * len(words) / sents + 11.8 * syl / len(words) - 15.59, 1)


def build(grade):
    src = json.load(open(os.path.join(SRC, f"grade{grade}.json"), encoding="utf-8"))
    std = {s["code"] for s in json.load(open(os.path.join(DATA, "ela-standards-2017.json")))[str(grade)]}
    passages = []
    for i, p in enumerate(src["passages"]):
        text = p["text"].strip()
        passages.append({
            "id": f"ms-ela{grade}-p{i + 1:02d}", "grade": grade, "kind": p["kind"], "title": p["title"], "topic": p.get("topic", ""),
            "text": text, "wordCount": len(re.findall(r"[A-Za-z0-9']+", text)),
            "readability": {"fleschKincaid": flesch_kincaid(text), "note": "estimate from sentence and word length; not a Lexile measure"},
            "lexile": None, "source": "original",
            "review": {"status": "ai-drafted", "reviewer": "", "date": ""},
        })
    # balanced answer positions: every position used equally often, order decided by a seeded shuffle
    n = len(src["items"])
    positions = [k % 4 for k in range(n)]
    random.Random(f"ela{grade}-positions").shuffle(positions)

    items, counters = [], {}
    for k, it in enumerate(src["items"]):
        code = it["standard"]
        assert code in std, f"grade {grade} item {k}: unknown standard {code}"
        strand = code.split(".")[0].lower()
        counters[strand] = counters.get(strand, 0) + 1
        iid = f"ms-ela{grade}-{strand}-{counters[strand]:03d}"
        wrong = it["wrong"]
        assert len(wrong) == 3, f"{iid}: needs exactly 3 wrong answers"
        rng = random.Random(iid)
        others = list(wrong)
        rng.shuffle(others)
        pos = positions[k]
        choices = [w["text"] for w in others]
        choices.insert(pos, it["answer"])
        pid = None if it.get("passage") is None else passages[it["passage"]]["id"]
        items.append({
            "id": iid, "subject": "ela", "grade": grade, "courses": [f"ela{grade}"], "cluster": strand.upper(),
            "standards": [code], "type": "mcq", "difficulty": it["difficulty"], "passageId": pid,
            "prompt": it["prompt"], "choices": choices, "answer": it["answer"], "explanation": it["explanation"],
            "commonErrors": [{"answer": w["text"], "why": w["why"]} for w in wrong],
            "visual": None, "provisional": False, "review": {"status": "ai-drafted", "reviewer": "", "date": ""},
        })
    json.dump({"grade": grade, "standardsSource": "NC ELA SCOS 2017 (in force through 2026-27)", "passages": passages},
              open(os.path.join(DATA, f"passages-ela{grade}.json"), "w"), indent=1, ensure_ascii=False)
    json.dump({"bank": f"ela{grade}", "grade": grade, "subject": "ela", "standardsSource": "NC ELA SCOS 2017 (in force through 2026-27)",
               "reviewStatus": "ai-drafted: none of these items or passages has been human-reviewed; do not ship to students yet",
               "items": items}, open(os.path.join(DATA, f"items-ela{grade}.json"), "w"), indent=1, ensure_ascii=False)
    print(f"grade {grade}: {len(passages)} passages, {len(items)} items")


if __name__ == "__main__":
    grades = [int(a) for a in sys.argv[1:]] or [6, 7, 8]
    for g in grades:
        build(g)
