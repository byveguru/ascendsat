"""Build data/items-math7.json (the Math 7 item bank).

Run from middle-school/tools:  python3 -I build_math7.py
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_common import Bank          # noqa: E402
import math7_a, math7_b, math7_c      # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")

std = {s["code"]: s for s in json.load(open(os.path.join(DATA, "math-standards.json")))["7"]}
# Math 6 Plus covers "a portion" of grade 7 (guide lists proportional relationships, rational-number
# operations, and angle/area/volume). The exact portion is unknown, so it is recorded as provisional.
bank = Bank(std, grade=7, provisional_courses=["math6plus"])

math7_a.rp(bank)
math7_a.ns(bank)
math7_a.ee_expressions(bank)
math7_a.ee_equations(bank)
math7_b.g_scale_triangles(bank)
math7_b.g_angles_circles_volume(bank)
math7_b.sp_sampling(bank)
math7_c.sp_compare(bank)
math7_c.sp_probability(bank)

# Only items in the domains Math 6 Plus is said to include keep the provisional tag.
PLUS6_DOMAINS = ("NC.7.RP.", "NC.7.NS.", "NC.7.G.")
for it in bank.items:
    if not it["standards"][0].startswith(PLUS6_DOMAINS):
        it.pop("provisionalCourses", None)

out = {
    "bank": "math7",
    "grade": 7,
    "standardsSource": "NC K-12 Mathematics SCOS (adopted June 2017, implementation 2018-19)",
    "reviewStatus": "ai-drafted: none of these items has been human-reviewed; do not ship to students yet",
    "items": bank.items,
}
path = os.path.join(DATA, "items-math7.json")
json.dump(out, open(path, "w"), indent=1, ensure_ascii=False)
print(f"wrote {len(bank.items)} items to {os.path.normpath(path)}")
