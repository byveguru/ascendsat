"""Build data/items-math6.json (the Math 6 item bank).

Run from middle-school/tools:  python3 -I build_math6.py
Deterministic: choice order is shuffled with a per-item seed, so reruns produce identical output.
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_common import Bank          # noqa: E402
import math6_a, math6_b, math6_c      # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")

std = {s["code"]: s for s in json.load(open(os.path.join(DATA, "math-standards.json")))["6"]}
bank = Bank(std)

math6_a.rp(bank)
math6_a.ns_divide_fractions(bank)
math6_a.ns_fluency(bank)
math6_a.ns_rational(bank)
math6_b.ee_expressions(bank)
math6_b.ee_equations(bank)
math6_b.ee_inequalities(bank)
math6_b.ee_relationships(bank)
math6_c.geometry(bank)
math6_c.sp_variability(bank)
math6_c.sp_distributions(bank)

out = {
    "bank": "math6",
    "grade": 6,
    "standardsSource": "NC K-12 Mathematics SCOS (adopted June 2017, implementation 2018-19)",
    "reviewStatus": "ai-drafted: none of these items has been human-reviewed; do not ship to students yet",
    "items": bank.items,
}
path = os.path.join(DATA, "items-math6.json")
json.dump(out, open(path, "w"), indent=1, ensure_ascii=False)
print(f"wrote {len(bank.items)} items to {os.path.normpath(path)}")
