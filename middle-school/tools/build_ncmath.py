"""Build an NC Math item bank (NC Math 1, 2 or 3) from authored source files.

Source files:  tools/math_source/<course>_*.json   e.g. nm1_a.json, nm1_b.json
Output:        data/items-<course>.json            e.g. data/items-nm1.json

Usage (from middle-school/tools):
  python3 -I build_ncmath.py nm1                       build the merged bank from all nm1_*.json
  python3 -I build_ncmath.py nm1 --check math_source/nm1_a.json     check one source file, write nothing

Source item format
  {"cluster": "SOLVE", "standard": "NC.M1.A-REI.3", "difficulty": "core|stretch|challenge", "type": "mcq|numeric",
   "prompt": "...", "answer": "...", "wrong": [{"text": "...", "why": "..."} x3 for mcq, optional for numeric],
   "accept": ["other accepted forms"],  (numeric only)   "unit": "...",   "tolerance": 0.01 (optional),   "explanation": "..."}
"""
import glob
import json
import os
import random
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")
MINUS = "−"

COURSES = {
    "nm1": {"std": "M1", "name": "NC Math 1", "course": "ncmath1",
            "clusters": {
                "EXPR": ["N-RN.2", "A-SSE.1", "A-SSE.1a", "A-SSE.1b", "A-SSE.3", "A-APR.1", "A-APR.3"],
                "CED": ["A-CED.1", "A-CED.2", "A-CED.3", "A-CED.4"],
                "SOLVE": ["A-REI.1", "A-REI.3", "A-REI.4"],
                "SYS": ["A-REI.5", "A-REI.6"],
                "GRAPH": ["A-REI.10", "A-REI.11", "A-REI.12"],
                "FUNC": ["F-IF.1", "F-IF.2", "F-IF.4", "F-IF.5", "F-IF.6"],
                "ANALYZE": ["F-IF.7", "F-IF.8", "F-IF.8a", "F-IF.8b", "F-IF.9"],
                "BUILD": ["F-BF.1", "F-BF.1a", "F-BF.1b", "F-BF.2"],
                "MODEL": ["F-LE.1", "F-LE.3", "F-LE.5"],
                "COORD": ["G-GPE.4", "G-GPE.5", "G-GPE.6"],
                "DATA1": ["S-ID.1", "S-ID.2", "S-ID.3"],
                "DATA2": ["S-ID.6", "S-ID.6a", "S-ID.6b", "S-ID.6c", "S-ID.7", "S-ID.8", "S-ID.9"],
            }},
    "nm2": {"std": "M2", "name": "NC Math 2", "course": "ncmath2",
            "clusters": {
                "RADICALS": ["N-RN.1", "N-RN.2", "N-RN.3", "N-CN.1"],
                "EXPR": ["A-SSE.1", "A-SSE.1a", "A-SSE.1b", "A-SSE.3", "A-APR.1"],
                "CED": ["A-CED.1", "A-CED.2", "A-CED.3"],
                "SOLVE": ["A-REI.1", "A-REI.2", "A-REI.4", "A-REI.4a", "A-REI.4b"],
                "SYSGRAPH": ["A-REI.7", "A-REI.11"],
                "FUNC": ["F-IF.1", "F-IF.2", "F-IF.4", "F-IF.7"],
                "FUNC2": ["F-IF.8", "F-IF.9", "F-BF.1", "F-BF.3"],
                "TRANS": ["G-CO.2", "G-CO.3", "G-CO.4", "G-CO.5", "G-CO.6"],
                "CONGR": ["G-CO.7", "G-CO.8", "G-CO.9", "G-CO.10"],
                "DILATE": ["G-SRT.1", "G-SRT.1a", "G-SRT.1b", "G-SRT.1c", "G-SRT.1d", "G-SRT.2", "G-SRT.2a", "G-SRT.2b", "G-SRT.3"],
                "TRIG": ["G-SRT.4", "G-SRT.6", "G-SRT.8", "G-SRT.12"],
                "PROB1": ["S-IC.2", "S-CP.1", "S-CP.3", "S-CP.3a", "S-CP.3b", "S-CP.4", "S-CP.5"],
                "PROB2": ["S-CP.6", "S-CP.7", "S-CP.8"],
            }},
    "nm3": {"std": "M3", "name": "NC Math 3", "course": "ncmath3",
            "clusters": {
                "POLY": ["N-CN.9", "A-APR.2", "A-APR.3"],
                "RATEXPR": ["A-APR.6", "A-APR.7", "A-APR.7a", "A-APR.7b"],
                "STRUCT": ["A-SSE.1", "A-SSE.1a", "A-SSE.1b", "A-SSE.2", "A-SSE.3"],
                "CEDREI": ["A-CED.1", "A-CED.2", "A-CED.3", "A-REI.1", "A-REI.2", "A-REI.11"],
                "FUNC": ["F-IF.1", "F-IF.2", "F-IF.4", "F-IF.7", "F-IF.9"],
                "BUILD": ["F-BF.1", "F-BF.1a", "F-BF.1b", "F-BF.3"],
                "INVERSE": ["F-BF.4", "F-BF.4a", "F-BF.4b", "F-BF.4c"],
                "LOG": ["F-LE.3", "F-LE.4"],
                "TRIG": ["F-TF.1", "F-TF.2", "F-TF.2a", "F-TF.2b", "F-TF.5"],
                "PROOF": ["G-CO.10", "G-CO.11", "G-CO.14"],
                "CIRCLES": ["G-C.2", "G-C.5", "G-GPE.1"],
                "SOLIDS": ["G-GMD.3", "G-GMD.4", "G-MG.1"],
                "INFER": ["S-IC.3", "S-IC.4", "S-IC.5", "S-IC.6"],
            }},
}


def load(course, files):
    cfg = COURSES[course]
    std = {s["code"] for s in json.load(open(os.path.join(DATA, "math-standards.json")))[cfg["std"]]}
    items, problems = [], []
    for f in files:
        for k, it in enumerate(json.load(open(f, encoding="utf-8"))["items"]):
            tag = f"{os.path.basename(f)}[{k}]"
            code = it["standard"]
            if code not in std:
                problems.append(f"{tag}: unknown standard {code}")
            cl = it["cluster"]
            if cl not in cfg["clusters"]:
                problems.append(f"{tag}: unknown cluster {cl}")
            elif code.replace(f"NC.{cfg['std']}.", "") not in cfg["clusters"][cl]:
                problems.append(f"{tag}: standard {code} does not belong to cluster {cl}")
            if it["type"] == "mcq" and len(it.get("wrong", [])) != 3:
                problems.append(f"{tag}: mcq needs exactly 3 wrong answers")
            if it["type"] == "numeric" and not it.get("answer"):
                problems.append(f"{tag}: numeric needs an answer")
            if it["difficulty"] not in ("core", "stretch", "challenge"):
                problems.append(f"{tag}: bad difficulty")
            if it["type"] not in ("mcq", "numeric"):
                problems.append(f"{tag}: bad type")
            items.append(it)
    return items, problems


def build(course):
    cfg = COURSES[course]
    files = sorted(glob.glob(os.path.join(HERE, "math_source", f"{course}_*.json")))
    items, problems = load(course, files)
    if problems:
        print("\n".join(problems)); sys.exit(1)
    mcq_idx = [k for k, it in enumerate(items) if it["type"] == "mcq"]
    positions = [k % 4 for k in range(len(mcq_idx))]
    random.Random(f"{course}-positions").shuffle(positions)
    pos_of = dict(zip(mcq_idx, positions))
    counters, out = {}, []
    for k, it in enumerate(items):
        key = it["standard"].replace(f"NC.{cfg['std']}.", "").lower().replace(".", "-")
        counters[key] = counters.get(key, 0) + 1
        iid = f"ms-{course}-{key}-{counters[key]:03d}"
        base = {"id": iid, "subject": "math", "grade": cfg["std"], "courses": [cfg["course"]], "cluster": it["cluster"],
                "standards": [it["standard"]], "type": it["type"], "difficulty": it["difficulty"], "prompt": it["prompt"],
                "explanation": it["explanation"], "visual": None, "passageId": None, "provisional": False,
                "review": {"status": "ai-drafted", "reviewer": "", "date": ""}}
        if it["type"] == "mcq":
            wrong = list(it["wrong"]); random.Random(iid).shuffle(wrong)
            choices = [w["text"] for w in wrong]; choices.insert(pos_of[k], it["answer"])
            base.update({"choices": choices, "answer": it["answer"],
                         "commonErrors": [{"answer": w["text"], "why": w["why"]} for w in wrong]})
        else:
            acc = [it["answer"]] + list(it.get("accept", []))
            acc += [a.replace(MINUS, "-") for a in acc if MINUS in a]
            base.update({"choices": None, "answer": it["answer"], "accept": sorted(set(acc)),
                         "commonErrors": [{"answer": w["text"], "why": w["why"]} for w in it.get("wrong", [])]})
            if it.get("unit"):
                base["unit"] = it["unit"]
            if it.get("tolerance") is not None:
                base["tolerance"] = it["tolerance"]   # grade numerically: |typed - answer| <= tolerance (for repeating decimals)
        out.append(base)
    path = os.path.join(DATA, f"items-{course}.json")
    json.dump({"bank": course, "grade": cfg["std"], "standardsSource": "NC K-12 Mathematics SCOS (adopted June 2017, implementation 2018-19)",
               "reviewStatus": "ai-drafted: none of these items has been human-reviewed; do not ship to students yet", "items": out},
              open(path, "w"), indent=1, ensure_ascii=False)
    print(f"wrote {len(out)} items to {os.path.normpath(path)} from {len(files)} source file(s)")


if __name__ == "__main__":
    course = sys.argv[1]
    if "--check" in sys.argv:
        f = sys.argv[sys.argv.index("--check") + 1]
        items, problems = load(course, [f])
        from collections import Counter
        print(f"{len(items)} items | clusters {dict(Counter(i['cluster'] for i in items))} | types {dict(Counter(i['type'] for i in items))}")
        print("\n".join(problems) if problems else "OK: source file is consistent")
        sys.exit(1 if problems else 0)
    build(course)
