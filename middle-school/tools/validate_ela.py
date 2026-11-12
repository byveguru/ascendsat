"""Validate an ELA item bank and its passages.

Usage: python3 -I validate_ela.py <grade>
Hard failures exit 1. Soft warnings (style bias) are printed but do not fail.
"""
import json
import os
import re
import sys
from collections import Counter, defaultdict

grade = int(sys.argv[1])
DATA = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
bank = json.load(open(os.path.join(DATA, f"items-ela{grade}.json")))
pbank = json.load(open(os.path.join(DATA, f"passages-ela{grade}.json")))
std = {s["code"] for s in json.load(open(os.path.join(DATA, "ela-standards-2017.json")))[str(grade)]}
items, passages = bank["items"], {p["id"]: p for p in pbank["passages"]}
WORDS = {6: (140, 300), 7: (180, 340), 8: (220, 400)}

errors, warns = [], []
err = lambda i, m: errors.append(f"{i}: {m}")
warn = lambda m: warns.append(m)

if Counter(i["id"] for i in items).most_common(1)[0][1] > 1:
    errors.append("duplicate item ids")

per_passage = defaultdict(list)
for i in items:
    iid = i["id"]
    if i["standards"][0] not in std:
        err(iid, f"unknown standard {i['standards'][0]}")
    ch = i["choices"]
    if len(ch) != 4 or len(set(ch)) != 4:
        err(iid, "needs 4 distinct choices")
    if i["answer"] not in ch:
        err(iid, "answer not among choices")
    if len(i["commonErrors"]) != 3 or any(not e["why"] for e in i["commonErrors"]):
        err(iid, "needs 3 commonErrors with reasons")
    for e in i["commonErrors"]:
        if e["answer"] == i["answer"] or e["answer"] not in ch:
            err(iid, "commonError inconsistent with choices")
    if re.search(r"all of the above|none of the above|both a and b", " ".join(ch), re.I):
        err(iid, "uses all/none/both of the above")
    if not i.get("explanation") or len(i["prompt"]) < 15:
        err(iid, "missing explanation or prompt too short")
    strand = i["standards"][0].split(".")[0]
    if strand in ("RL", "RI"):
        if i["passageId"] not in passages:
            err(iid, "RL/RI item must reference a passage")
        else:
            per_passage[i["passageId"]].append(i)
            kind = passages[i["passageId"]]["kind"]
            if strand == "RI" and kind != "informational":
                err(iid, "RI item on a non-informational passage")
            if strand == "RL" and kind not in ("literary", "poem"):
                err(iid, "RL item on an informational passage")
    elif i["passageId"] is not None:
        err(iid, "L item should be standalone (passageId null)")

lo, hi = WORDS[grade]
for pid, p in passages.items():
    if not lo <= p["wordCount"] <= hi:
        warn(f"{pid} '{p['title']}': {p['wordCount']} words (expected {lo}-{hi})")
    n = len(per_passage.get(pid, []))
    if n < 4 or n > 6:
        err(pid, f"has {n} questions, expected 4-6")
    # an answer that is a verbatim quote of the whole passage is fine; a prompt that quotes nothing is fine

# style bias checks
pos = Counter(i["choices"].index(i["answer"]) for i in items)
if max(pos.values()) > 0.35 * len(items):
    warn(f"answer positions uneven: {dict(sorted(pos.items()))}")
longest = sum(1 for i in items if len(i["answer"]) == max(len(c) for c in i["choices"]) and sorted(len(c) for c in i["choices"])[-1] > sorted(len(c) for c in i["choices"])[-2])
if longest > 0.4 * len(items):
    warn(f"correct answer is strictly the longest choice in {longest}/{len(items)} items")
dup_prompts = [p for p, n in Counter(i["prompt"] for i in items).items() if n > 1]
if dup_prompts:
    warn(f"{len(dup_prompts)} repeated prompts, e.g. {dup_prompts[0][:60]}")

by_std = Counter(i["standards"][0] for i in items)
clusters = Counter(i["cluster"] for i in items)
print(f"grade {grade}: {len(items)} items | clusters {dict(clusters)} | passages {len(passages)} "
      f"(words {min(p['wordCount'] for p in passages.values())}-{max(p['wordCount'] for p in passages.values())}, "
      f"FK {min(p['readability']['fleschKincaid'] for p in passages.values())}-{max(p['readability']['fleschKincaid'] for p in passages.values())})")
print("standards:", ", ".join(f"{k.split('.')[0]}.{k.split('.')[2]}x{v}" for k, v in sorted(by_std.items())))
for w in warns:
    print(" warn:", w)
if errors:
    print(f"\n{len(errors)} problem(s):")
    for e in errors:
        print(" -", e)
    sys.exit(1)
print("OK: no structural problems")
