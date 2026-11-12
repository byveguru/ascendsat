"""Build data/items-math8.json (the Math 8 item bank).

Run from middle-school/tools:  python3 -I build_math8.py
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_common import Bank          # noqa: E402
import math8_a, math8_b, math8_c      # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")

std = {s["code"]: s for s in json.load(open(os.path.join(DATA, "math-standards.json")))["8"]}
bank = Bank(std, grade=8)      # courses: math8, math7plus (covers all of grade 8), compacted67

math8_a.ns(bank)
math8_a.ee_exponents(bank)
math8_a.ee_linear(bank)
math8_a.ee_systems(bank)
math8_b.f_define(bank)
math8_b.f_model(bank)
math8_b.g_transformations(bank)
math8_b.g_angles(bank)
math8_c.g_pythagorean(bank)
math8_c.g_volume(bank)
math8_c.sp_scatter(bank)

out = {
    "bank": "math8",
    "grade": 8,
    "standardsSource": "NC K-12 Mathematics SCOS (adopted June 2017, implementation 2018-19)",
    "reviewStatus": "ai-drafted: none of these items has been human-reviewed; do not ship to students yet",
    "items": bank.items,
}
path = os.path.join(DATA, "items-math8.json")
json.dump(out, open(path, "w"), indent=1, ensure_ascii=False)
print(f"wrote {len(bank.items)} items to {os.path.normpath(path)}")
