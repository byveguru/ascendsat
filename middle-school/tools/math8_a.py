"""Math 8 items, part A: NS (irrational numbers), EE-A (exponents, radicals, scientific notation),
EE-B (linear equations and inequalities), EE-C (systems of equations)."""
import math
from fractions import Fraction as F
from gen_common import fmt, dec, MINUS

M = MINUS


def ns(b):
    C = "NS"
    # NS.1 irrational numbers
    b.mc(C, "NS.1", "core", "Which of these numbers is irrational?", "√2",
         [("0.25", "a terminating decimal is rational"), ("1/3", "a fraction of integers is rational"), ("√16", "equals 4, which is rational")],
         "√2 = 1.41421… never ends and never repeats, so it is irrational.")
    b.mc(C, "NS.1", "core", "Which decimal is a rational number?", "0.121212… (the 12 repeats forever)",
         [("π", "π never repeats"), ("0.1010010001… (the number of zeros keeps growing)", "this decimal never repeats"), ("√7", "√7 never repeats")],
         "A decimal that repeats can be written as a fraction: 0.1212… = 12/99 = 4/33.")
    b.mc(C, "NS.1", "core", "Which statement describes an irrational number?", "A decimal that never ends and never repeats",
         [("A decimal that ends", "this describes a rational number"), ("A decimal that repeats", "this describes a rational number"), ("Any number that can be written as a fraction", "this describes a rational number")],
         "Irrational numbers have non-terminating, non-repeating decimal expansions.")
    b.mc(C, "NS.1", "stretch", "Is 0.3333… a rational number?", "Yes, because it equals 1/3",
         [("No, because it never ends", "repeating decimals can be rational"), ("No, because it repeats", "repeating decimals are rational"), ("Yes, because it is less than 1", "gave an irrelevant reason")],
         "A repeating decimal is rational. 0.3333… = 1/3.")
    b.mc(C, "NS.1", "stretch", "Which fraction equals 0.7777… (the 7 repeats forever)?", "7/9",
         [("7/10", "treated it as the terminating decimal 0.7"), ("7/99", "used two nines"), ("1/7", "inverted the fraction")],
         "Let x = 0.777… Then 10x = 7.777… and 10x − x = 7, so 9x = 7 and x = 7/9.")
    b.mc(C, "NS.1", "core", "Which of these numbers is rational?", "√25",
         [("√5", "√5 is not a perfect square"), ("√11", "√11 is not a perfect square"), ("π", "π never repeats")],
         "√25 = 5, which is a rational number.")
    b.mc(C, "NS.1", "stretch", "Which describes the decimal expansion of 5/8?", "It terminates: 0.625",
         [("It repeats: 0.625625…", "it ends rather than repeating"), ("It never ends and never repeats", "this describes an irrational number"), ("It repeats: 0.666…", "this is 2/3")],
         "5 ÷ 8 = 0.625 and the division ends with remainder 0.")
    # NS.2 approximating irrational numbers
    b.mc(C, "NS.2", "core", "Between which two consecutive integers is √20?", "4 and 5",
         [("3 and 4", "√9 = 3 and √16 = 4 are too small"), ("5 and 6", "√25 = 5 is already above √20"), ("19 and 21", "used 20 itself, not its square root")],
         "16 < 20 < 25, so 4 < √20 < 5.")
    b.mc(C, "NS.2", "stretch", "To the nearest tenth, what is √50?", "7.1",
         [("7.5", "estimated halfway between 7 and 8"), ("7.0", "stopped at the integer part"), ("25", "divided 50 by 2")],
         "7² = 49 and 7.1² = 50.41, so √50 is about 7.1.")
    b.mc(C, "NS.2", "stretch", "Which is the greatest: √10, 3.2, π or 3.1?", "3.2",
         [("√10", "√10 is about 3.16, less than 3.2"), ("π", "π is about 3.14, less than 3.2"), ("3.1", "3.1 is the least of the four")],
         "√10 ≈ 3.16, π ≈ 3.14, so the order is 3.1 < π < √10 < 3.2.")
    b.mc(C, "NS.2", "stretch", "Which list is in order from least to greatest?", "2, √5, 2.3, √6",
         [("√5, 2, 2.3, √6", "put √5 (about 2.24) before 2"), ("2, 2.3, √5, √6", "put 2.3 before √5 (about 2.24)"), ("√6, 2.3, √5, 2", "listed from greatest to least")],
         "√5 ≈ 2.24 and √6 ≈ 2.45, so 2 < 2.24 < 2.3 < 2.45.")
    b.mc(C, "NS.2", "core", "To the nearest tenth, what is 2π?", "6.3",
         [("6.2", "used 3.1 for π"), ("6.0", "used 3 for π"), ("6.4", "used 3.2 for π")],
         "2 × 3.14159… = 6.283…, which rounds to 6.3.")
    b.mc(C, "NS.2", "stretch", "Between which two consecutive integers is the cube root of 50?", "3 and 4",
         [("2 and 3", "2³ = 8 and 3³ = 27 are too small"), ("4 and 5", "4³ = 64 is already above 50"), ("7 and 8", "used the square root")],
         "3³ = 27 and 4³ = 64, and 27 < 50 < 64.")
    b.mc(C, "NS.2", "stretch", "Which point on the number line is closest to √7?", "2.6",
         [("2.4", "√7 is greater than 2.5"), ("2.8", "2.8² = 7.84 is too large"), ("3.5", "3.5² = 12.25 is far too large")],
         "2.6² = 6.76 and 2.7² = 7.29. √7 ≈ 2.646, closest to 2.6.")
    b.num(C, "NS.2", "stretch", "To the nearest tenth, what is √18?", "4.2", [],
          "4.2² = 17.64 and 4.3² = 18.49. √18 ≈ 4.243, which rounds to 4.2.",
          wrongs=[("9", "divided 18 by 2"), ("4.3", "rounded up instead of to the nearest tenth")])


def ee_exponents(b):
    C = "EE-A"
    # EE.1 integer exponents
    b.mc(C, "EE.1", "core", "Simplify 3⁴ × 3².", "3⁶",
         [("3⁸", "multiplied the exponents"), ("9⁶", "multiplied the bases"), ("3²", "subtracted the exponents")],
         "When multiplying powers with the same base, add the exponents: 4 + 2 = 6.")
    b.mc(C, "EE.1", "core", "Simplify 5⁷ ÷ 5³.", "5⁴",
         [("5¹⁰", "added the exponents"), ("5²¹", "multiplied the exponents"), ("1⁴", "divided the bases")],
         "When dividing powers with the same base, subtract the exponents: 7 − 3 = 4.")
    b.mc(C, "EE.1", "stretch", "Simplify (2³)².", "2⁶",
         [("2⁵", "added the exponents"), ("2⁹", "raised 3 to the 2nd power"), ("2⁸", "raised 2 to the 3rd then added")],
         "A power of a power multiplies the exponents: 3 × 2 = 6.")
    b.mc(C, "EE.1", "stretch", "Which expression is equal to x" + "⁻²" + "?", "1/x²",
         [(M + "x²", "treated a negative exponent as a negative number"), ("x²", "ignored the negative sign in the exponent"), (M + "1/x²", "added a negative sign to the reciprocal")],
         "A negative exponent means the reciprocal: x" + "⁻²" + " = 1/x².")
    b.mc(C, "EE.1", "core", "What is 7⁰?", "1",
         [("0", "thought any power of 0 is 0"), ("7", "thought the exponent does not matter"), ("Undefined", "thought zero exponents are not allowed")],
         "Any nonzero number raised to the power 0 equals 1.")
    # EE.2 square and cube roots
    b.mc(C, "EE.2", "core", "Which values of x solve x² = 49?", "x = 7 or x = " + M + "7",
         [("x = 7 only", "missed the negative solution"), ("x = 24.5", "divided 49 by 2"), ("x = 49²", "squared instead of taking the root")],
         "Both 7² and (" + M + "7)² equal 49.")
    b.mc(C, "EE.2", "core", "Which value of x solves x³ = 27?", "x = 3",
         [("x = 9", "divided 27 by 3"), ("x = ±3", "treated it like a square: a negative cubed is negative"), ("x = 81", "multiplied 27 by 3")],
         "3³ = 27. The only real cube root of 27 is 3.")
    b.mc(C, "EE.2", "core", "What is √144?", "12",
         [("72", "divided 144 by 2"), ("14", "guessed a nearby number"), ("11", "guessed a nearby number")],
         "12 × 12 = 144.")
    b.mc(C, "EE.2", "stretch", "What is the cube root of 64?", "4",
         [("8", "found the square root"), ("32", "divided 64 by 2"), ("16", "divided 64 by 4")],
         "4 × 4 × 4 = 64.")
    # EE.3 scientific notation, estimates and comparisons
    b.mc(C, "EE.3", "core", "Which is 45,000,000 written in scientific notation?", "4.5 × 10⁷",
         [("45 × 10⁶", "the first factor must be between 1 and 10"), ("4.5 × 10⁸", "used one exponent too many"), ("4.5 × 10⁶", "used one exponent too few")],
         "Move the decimal point 7 places: 4.5 × 10⁷.")
    b.mc(C, "EE.3", "core", "Which is 0.000032 written in scientific notation?", "3.2 × 10" + "⁻⁵",
         [("3.2 × 10⁵", "used a positive exponent for a small number"), ("3.2 × 10" + "⁻⁴", "used one exponent too few"), ("32 × 10" + "⁻⁶", "the first factor must be between 1 and 10")],
         "Move the decimal point 5 places to the right: 3.2 × 10" + "⁻⁵" + ".")
    b.mc(C, "EE.3", "stretch", "How many times as much is 6 × 10⁸ as 3 × 10⁵?", "2,000",
         [("20,000", "used 10⁴ instead of 10³"), ("200", "used 10² instead of 10³"), ("3", "divided the numbers in front but not the powers of ten")],
         "6 ÷ 3 = 2 and 10⁸ ÷ 10⁵ = 10³, so the ratio is 2 × 10³ = 2,000.")
    # EE.4 operations with scientific notation
    b.mc(C, "EE.4", "stretch", "What is (3 × 10⁴)(2 × 10³)?", "6 × 10⁷",
         [("6 × 10¹²", "multiplied the exponents"), ("5 × 10⁷", "added the numbers in front"), ("6 × 10⁴", "kept only one exponent")],
         "Multiply 3 × 2 = 6 and add the exponents 4 + 3 = 7.")
    b.mc(C, "EE.4", "stretch", "What is (8 × 10⁹) ÷ (2 × 10⁴)?", "4 × 10⁵",
         [("4 × 10¹³", "added the exponents"), ("4 × 10⁴", "kept only one exponent"), ("6 × 10⁵", "subtracted the numbers in front")],
         "Divide 8 ÷ 2 = 4 and subtract the exponents 9 − 4 = 5.")
    b.num(C, "EE.4", "stretch", "A printer prints 5 × 10² pages per hour. How many pages does it print in 4 × 10³ hours?", "2,000,000", ["2000000", "2 × 10^6", "2x10^6"],
          "(5 × 10²)(4 × 10³) = 20 × 10⁵ = 2 × 10⁶ = 2,000,000.",
          wrongs=[("20,000,000", "gave one power of ten too many"), ("200,000", "gave one power of ten too few")], unit="pages")


def ee_linear(b):
    C = "EE-B"
    b.mc(C, "EE.7", "core", "Solve 5x + 3 = 2x + 15.", "4",
         [("6", "added 3 instead of subtracting"), ("12/7", "added 2x instead of subtracting"), (M + "4", "made a sign error")],
         "Subtract 2x: 3x + 3 = 15. Subtract 3: 3x = 12. Divide by 3: x = 4.")
    b.mc(C, "EE.7", "stretch", "Solve 3(x − 2) = x + 8.", "7",
         [("5", "did not multiply the 2 by 3"), ("14", "stopped before dividing"), ("1", "made a sign error")],
         "3x − 6 = x + 8, so 2x = 14 and x = 7.")
    b.mc(C, "EE.7", "stretch", "How many solutions does 4x − 7 = 4x + 3 have?", "No solution",
         [("x = 0", "guessed one value"), ("x = 10", "added the constants and got a value"), ("Infinitely many solutions", "confused no solution with all numbers")],
         "Subtracting 4x gives " + M + "7 = 3, which is never true.")
    b.mc(C, "EE.7", "stretch", "How many solutions does 2(x + 3) = 2x + 6 have?", "Infinitely many solutions",
         [("No solution", "confused all numbers with none"), ("One solution", "assumed an equation has one solution"), ("Two solutions", "guessed")],
         "Distributing gives 2x + 6 = 2x + 6, which is true for every x.")
    b.mc(C, "EE.7", "core", "Solve 6x − 4 = 2x + 12.", "4",
         [("2", "divided 8 by 4"), ("8", "subtracted instead of adding"), ("3", "made an arithmetic error")],
         "Subtract 2x: 4x − 4 = 12. Add 4: 4x = 16. Divide by 4: x = 4.")
    b.mc(C, "EE.7", "stretch", "Solve x/2 + 3 = x/4 + 5.", "8",
         [("16", "multiplied by 2 instead of 4"), ("4", "divided instead of multiplying"), ("32", "added instead of subtracting")],
         "Multiply every term by 4: 2x + 12 = x + 20. Then x = 8.")
    b.mc(C, "EE.7", "stretch", "Solve 2.5x + 1 = 0.5x + 9.", "4",
         [("8/3", "added 0.5x instead of subtracting"), ("5", "made an arithmetic error"), ("10", "divided incorrectly")],
         "Subtract 0.5x: 2x + 1 = 9. Subtract 1: 2x = 8. Divide by 2: x = 4.")
    b.mc(C, "EE.7", "core", "Solve 3x + 5 > x + 13.", "x > 4",
         [("x < 4", "reversed the inequality"), ("x > 9", "added instead of subtracting"), ("x > 6", "made an arithmetic error")],
         "Subtract x: 2x + 5 > 13. Subtract 5: 2x > 8. Divide by 2: x > 4.")
    b.mc(C, "EE.7", "challenge", "Solve " + M + "2x + 7 ≤ x − 5.", "x ≥ 4",
         [("x ≤ 4", "did not reverse the inequality when dividing by a negative"), ("x ≥ " + M + "4", "made a sign error"), ("x ≤ " + M + "4", "made a sign error and did not reverse")],
         "Subtract x and 7: " + M + "3x ≤ " + M + "12. Divide by " + M + "3 and reverse: x ≥ 4.")
    b.mc(C, "EE.7", "stretch", "Which equation has exactly one solution?", "3x + 2 = x + 10",
         [("2x + 4 = 2x + 4", "has infinitely many solutions"), ("5x − 1 = 5x + 3", "has no solution"), ("x + 1 = x + 1", "has infinitely many solutions")],
         "3x + 2 = x + 10 simplifies to 2x = 8, so x = 4 is the only solution.")
    b.mc(C, "EE.7", "stretch", "Gym A costs $30 to join plus $10 per month. Gym B costs $50 to join plus $5 per month. After how many months do the two gyms cost the same?", "4 months",
         [("2 months", "divided the difference in fees ($20) by the monthly rate for Gym A"), ("5 months", "used the difference in monthly rates as the number of months"), ("8 months", "doubled the correct answer")],
         "30 + 10m = 50 + 5m, so 5m = 20 and m = 4.")
    b.mc(C, "EE.7", "challenge", "Plan X costs $20 plus $0.10 per text. Plan Y costs $0.20 per text with no fee. For how many texts do the plans cost the same?", "200",
         [("100", "divided $20 by $0.20"), ("400", "divided $20 by $0.05"), ("300", "made an arithmetic error")],
         "20 + 0.10t = 0.20t, so 20 = 0.10t and t = 200.")
    b.mc(C, "EE.7", "stretch", "How many solutions does 3(2x − 1) = 6x − 3 have?", "Infinitely many solutions",
         [("No solution", "confused all numbers with none"), ("One solution", "assumed an equation has one solution"), ("Two solutions", "guessed")],
         "Distributing gives 6x − 3 = 6x − 3, which is true for every x.")
    b.num(C, "EE.7", "core", "Solve 7x − 4 = 3x + 20.", "6", [],
          "Subtract 3x: 4x − 4 = 20. Add 4: 4x = 24. Divide by 4: x = 6.",
          wrongs=[("4", "made an arithmetic error"), ("2.4", "divided 24 by 10")])
    b.mc(C, "EE.7", "challenge", "One taxi charges $4 plus $2 per mile. Another charges $1 plus $3 per mile. For which trips is the second taxi cheaper?", "Trips shorter than 3 miles",
         [("Trips longer than 3 miles", "reversed the comparison"), ("Trips shorter than 5 miles", "made an arithmetic error"), ("Only trips of exactly 3 miles", "found where the prices are equal")],
         "1 + 3m < 4 + 2m gives m < 3. The costs are equal at 3 miles.")


def ee_systems(b):
    C = "EE-C"
    b.mc(C, "EE.8", "core", "Which ordered pair is the solution of y = x + 1 and y = 2x − 2?", "(3, 4)",
         [("(4, 3)", "swapped x and y"), ("(1, 2)", "satisfies only the first equation"), ("(0, 1)", "satisfies only the first equation")],
         "Set x + 1 = 2x − 2, so x = 3 and y = 4.")
    b.mc(C, "EE.8", "core", "The graphs of two lines cross at the point (2, 5). What does this tell you?", "x = 2 and y = 5 make both equations true",
         [("Only the first equation is true at (2, 5)", "ignored that the point is on both lines"), ("The lines are parallel", "parallel lines never cross"), ("The system has no solution", "a crossing point is a solution")],
         "The point where the graphs meet lies on both lines, so it satisfies both equations.")
    b.mc(C, "EE.8", "core", "How many solutions does the system y = 3x + 1 and y = 3x − 4 have?", "None",
         [("One", "assumed lines always cross"), ("Two", "guessed"), ("Infinitely many", "confused parallel with the same line")],
         "Both lines have slope 3 but different y-intercepts, so they are parallel and never meet.")
    b.mc(C, "EE.8", "stretch", "How many solutions does the system y = 2x + 3 and 2y = 4x + 6 have?", "Infinitely many",
         [("None", "confused the same line with parallel lines"), ("One", "assumed lines cross once"), ("Two", "guessed")],
         "Dividing the second equation by 2 gives y = 2x + 3, the same line.")
    b.mc(C, "EE.8", "core", "Solve by inspection: y = 5 and y = x + 2.", "(3, 5)",
         [("(5, 3)", "swapped x and y"), ("(2, 5)", "used the constant as x"), ("(5, 7)", "added 2 to 5")],
         "y = 5, so 5 = x + 2 and x = 3.")
    b.mc(C, "EE.8", "stretch", "Which system has the solution (1, 3)?", "y = x + 2 and y = 3x",
         [("y = x + 2 and y = 2x", "(1, 3) does not satisfy y = 2x"), ("y = 2x + 1 and y = 3x + 1", "(1, 3) does not satisfy y = 3x + 1"), ("y = x + 3 and y = 3x", "(1, 3) does not satisfy y = x + 3")],
         "Check (1, 3): 3 = 1 + 2 is true and 3 = 3(1) is true.")
    b.mc(C, "EE.8", "stretch", "Plan A costs y = 20 + 5x. Plan B costs y = 35 + 2x, where x is the number of months. When do the plans cost the same, and how much?", "At 5 months, $45",
         [("At 15 months, $95", "used the difference in the starting fees (15) as the number of months"), ("At 3 months, $35", "used the difference in rates (3) as the number of months"), ("At 5 months, $25", "found the right month but the wrong cost")],
         "20 + 5x = 35 + 2x gives x = 5. Then y = 20 + 25 = 45.")
    b.mc(C, "EE.8", "stretch", "The lines y = x + 4 and y = " + M + "x + 6 cross. Where?", "(1, 5)",
         [("(5, 1)", "swapped x and y"), ("(2, 6)", "made an arithmetic error"), ("(1, 4)", "found only the first equation's value")],
         "x + 4 = " + M + "x + 6 gives x = 1. Then y = 1 + 4 = 5.")
    b.mc(C, "EE.8", "stretch", "Which equation, paired with y = 2x + 1, makes a system with no solution?", "y = 2x − 3",
         [("y = " + M + "2x + 1", "has a different slope, so the lines cross"), ("y = x + 1", "has a different slope, so the lines cross"), ("y = 2x + 1", "is the same line, with infinitely many solutions")],
         "No solution means parallel lines: the same slope and a different y-intercept.")
    b.mc(C, "EE.8", "stretch", "Which equation, paired with y = 3x − 2, makes a system with exactly one solution?", "y = " + M + "x + 6",
         [("y = 3x + 4", "has the same slope, so the lines are parallel"), ("y = 3x − 2", "is the same line"), ("y = 3x", "has the same slope, so the lines are parallel")],
         "A different slope means the lines cross exactly once.")
    b.mc(C, "EE.8", "challenge", "Sam has $50 and saves $10 each week. Ana has $20 and saves $15 each week. When do they have the same amount, and how much is it?", "After 6 weeks, $110 each",
         [("After 3 weeks, $80 each", "made an arithmetic error"), ("After 6 weeks, $80 each", "found the right week but the wrong amount"), ("After 5 weeks, $100 each", "made an arithmetic error")],
         "50 + 10w = 20 + 15w gives w = 6. Then 50 + 60 = 110.")
    b.mc(C, "EE.8", "core", "What is the solution of y = x + 3 and y = 2x − 1?", "(4, 7)",
         [("(7, 4)", "swapped x and y"), ("(3, " + M + "1)", "used the constants as the solution"), ("(2, 5)", "made an arithmetic error")],
         "x + 3 = 2x − 1 gives x = 4. Then y = 7.")
    b.num(C, "EE.8", "stretch", "The lines y = 4x and y = x + 9 meet at one point. What is the x-coordinate of that point?", "3", [],
          "4x = x + 9, so 3x = 9 and x = 3.",
          wrongs=[("12", "gave the y-coordinate"), ("9", "used the constant")])
    b.mc(C, "EE.8", "stretch", "Two lines model two people's savings. What does the point where the lines cross show?", "The week when both have the same total and what that total is",
         [("The week when the first person starts saving", "confused the crossing with the y-intercept"), ("The difference between their savings", "the crossing point has no difference"), ("The slope of each line", "the crossing point is not a slope")],
         "The crossing point is on both lines, so both savings amounts are equal there.")
    b.mc(C, "EE.8", "stretch", "What is the solution of y = " + M + "x + 5 and y = x − 1?", "(3, 2)",
         [("(2, 3)", "swapped x and y"), ("(5, " + M + "1)", "used the constants as the solution"), ("(1, 4)", "made an arithmetic error")],
         M + "x + 5 = x − 1 gives 2x = 6, so x = 3 and y = 2.")
