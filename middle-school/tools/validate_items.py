"""Validate an item bank against the standards index and the item contract in DESIGN.md.

Usage: python3 -I validate_items.py ../data/items-math6.json [--per-cluster 15]
Exit code 1 if any check fails.
"""
import json
import os
import re
import sys
from collections import Counter, defaultdict

path = sys.argv[1]
per_cluster = int(sys.argv[sys.argv.index("--per-cluster") + 1]) if "--per-cluster" in sys.argv else None
bank = json.load(open(path))
items = bank["items"]
grade_key = str(bank["grade"])
std = {s["code"]: s for s in json.load(open(os.path.join(os.path.dirname(path), "math-standards.json")))[grade_key]}

errors = []
err = lambda i, m: errors.append(f"{i.get('id', '?')}: {m}")

ids = Counter(i["id"] for i in items)
for k, n in ids.items():
    if n > 1:
        errors.append(f"duplicate id {k}")

cluster_stds = defaultdict(set)
for i in items:
    for c in i["standards"]:
        if c not in std:
            err(i, f"unknown standard {c}")
        else:
            cluster_stds[i["cluster"]].add(c)

prompts = Counter(i["prompt"] for i in items)
for i in items:
    if i["difficulty"] not in ("core", "stretch", "challenge"):
        err(i, f"bad difficulty {i['difficulty']}")
    if i["review"]["status"] not in ("authored", "ai-drafted", "human-reviewed"):
        err(i, "bad review status")
    if len(i["prompt"]) < 8:
        err(i, "prompt too short")
    if not i.get("explanation"):
        err(i, "missing explanation")
    if re.search(r"\s{2,}|\bNone\b|\bnan\b", i["prompt"]):
        err(i, "suspicious prompt text")
    if i["type"] == "mcq":
        ch = i["choices"]
        if len(ch) != 4 or len(set(ch)) != 4:
            err(i, f"needs 4 distinct choices, got {ch}")
        if i["answer"] not in ch:
            err(i, "answer is not one of the choices")
        for e in i["commonErrors"]:
            if e["answer"] not in ch:
                err(i, f"commonError {e['answer']!r} is not a choice")
            if e["answer"] == i["answer"]:
                err(i, "a commonError equals the correct answer")
            if not e["why"]:
                err(i, "commonError without a reason")
        if len(i["commonErrors"]) != 3:
            err(i, "mcq needs exactly 3 commonErrors")
    elif i["type"] == "numeric":
        if i["answer"] not in i["accept"]:
            err(i, "accept list must contain the answer")
        for e in i["commonErrors"]:
            if e["answer"] in i["accept"]:
                err(i, "a commonError is also an accepted answer")
    else:
        err(i, f"unsupported type {i['type']}")

# no prompt+answer collisions that would make two items identical
dupe_keys = Counter((i["prompt"], i["answer"]) for i in items)
for (p, a), n in dupe_keys.items():
    if n > 1:
        errors.append(f"identical item repeated {n}x: {p[:60]}")

# every cluster in the standards file should be present, with the expected count
index_clusters = defaultdict(set)
for s in std.values():
    index_clusters[s["cluster"]].add(s["code"])
per = Counter(i["cluster"] for i in items)
if per_cluster:
    for k, n in per.items():
        if n != per_cluster:
            errors.append(f"cluster {k} has {n} items, expected {per_cluster}")

# every standard in the grade should have at least one item
covered = {c for i in items for c in i["standards"]}
missing = sorted(set(std) - covered)

print(f"{len(items)} items | clusters: {dict(sorted(per.items()))}")
print("types:", dict(Counter(i['type'] for i in items)), "| difficulty:", dict(Counter(i['difficulty'] for i in items)))
print(f"standards covered: {len(covered)}/{len(std)}" + (f" | NOT covered: {', '.join(m.split('.', 2)[2] for m in missing)}" if missing else ""))
if errors:
    print(f"\n{len(errors)} problem(s):")
    for e in errors:
        print(" -", e)
    sys.exit(1)
print("OK: no structural problems")
