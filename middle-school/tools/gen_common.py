"""Shared helpers for building the Math 6 item bank.

Rules enforced here (the validator re-checks them on the final JSON):
- every multiple-choice item has exactly 4 distinct choices, one of them correct
- every wrong choice carries the misconception that produces it (commonErrors)
- ids are stable: ms-m6-<standard>-<nnn>
"""
import json
import random
from fractions import Fraction as F

MINUS = "−"


def fmt(x):
    """Format int / Fraction as plain text: 7, 5/2, -3 (with a real minus sign)."""
    if isinstance(x, F):
        s = str(x.numerator) if x.denominator == 1 else f"{abs(x.numerator)}/{x.denominator}"
        if x < 0:
            s = MINUS + (s if x.denominator != 1 else str(abs(x.numerator)))
        return s
    if isinstance(x, int):
        return str(x) if x >= 0 else MINUS + str(-x)
    return str(x)


def money(x):
    x = F(x)
    cents = round(x * 100)
    return f"${cents // 100:,}.{cents % 100:02d}"


def dec(x, places=None):
    """Format a Fraction/int as a decimal string (trailing zeros trimmed unless places given)."""
    x = F(x)
    neg = x < 0
    x = abs(x)
    if places is None:
        places = 0
        while (x * 10 ** places).denominator != 1:
            places += 1
    n = round(x * 10 ** places)
    s = f"{n // 10 ** places}" + (f".{n % 10 ** places:0{places}d}" if places else "")
    return (MINUS if neg else "") + s


class Bank:
    DEFAULT_COURSES = {6: ["math6", "math6plus", "compacted67"], 7: ["math7", "math7plus", "compacted67"],
                       8: ["math8", "math7plus", "compacted67"]}

    def __init__(self, std_index, grade=6, courses=None, provisional_courses=None):
        self.items = []
        self.count = {}
        self.grade = grade
        self.courses = courses or self.DEFAULT_COURSES[grade]
        self.provisional_courses = provisional_courses or []   # courses that MAY cover these items (district unit list unknown)
        self.std_index = std_index          # code -> standard record (from math-standards.json)

    def _id(self, std):
        key = std.lower().replace(".", "-")
        self.count[key] = self.count.get(key, 0) + 1
        return f"ms-m{self.grade}-{key}-{self.count[key]:03d}"

    def _base(self, cluster, std, diff, prompt, explanation, typ):
        code = f"NC.{self.grade}." + std
        assert code in self.std_index, f"unknown standard {code}"
        return {
            "id": self._id(std),
            "subject": "math",
            "grade": self.grade,
            "courses": list(self.courses),
            "cluster": cluster,
            "standards": [code],
            "type": typ,
            "difficulty": diff,
            "prompt": prompt,
            "explanation": explanation,
            "visual": None,
            "passageId": None,
            "provisional": False,
            **({"provisionalCourses": list(self.provisional_courses)} if self.provisional_courses else {}),
            "review": {"status": "ai-drafted", "reviewer": "", "date": ""},
        }

    def mc(self, cluster, std, diff, prompt, correct, wrongs, explanation):
        """wrongs: list of (text, misconception). The first three distinct ones are used."""
        item = self._base(cluster, std, diff, prompt, explanation, "mcq")
        seen = {correct}
        picked = []
        for text, why in wrongs:
            if text not in seen:
                seen.add(text)
                picked.append((text, why))
        assert len(picked) >= 3, f"{item['id']}: need 3 distinct wrong answers, got {len(picked)}"
        picked = picked[:3]
        choices = [correct] + [t for t, _ in picked]
        random.Random(item["id"]).shuffle(choices)
        item["choices"] = choices
        item["answer"] = correct
        item["commonErrors"] = [{"answer": t, "why": w} for t, w in picked]
        self.items.append(item)
        return item

    def num(self, cluster, std, diff, prompt, answer, accept, explanation, wrongs=None, unit=None):
        """Typed-answer item. accept lists every equivalent form that should be marked correct."""
        item = self._base(cluster, std, diff, prompt, explanation, "numeric")
        item["choices"] = None
        item["answer"] = answer
        ascii_minus = [a.replace(MINUS, "-") for a in [answer] + list(accept) if MINUS in a]
        item["accept"] = sorted(set([answer] + list(accept) + ascii_minus))
        if unit:
            item["unit"] = unit
        item["commonErrors"] = [{"answer": t, "why": w} for t, w in (wrongs or [])]
        self.items.append(item)
        return item
