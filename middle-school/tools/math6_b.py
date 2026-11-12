"""Math 6 items, part B: Expressions and Equations (EE)."""
from fractions import Fraction as F
from gen_common import fmt, money, dec, MINUS

M = MINUS


def ee_expressions(b):
    C = "EE-A"
    # EE.1 numerical expressions with exponents
    b.mc(C, "EE.1", "core", "What is the value of 3² + 4 × 2?", str(3 ** 2 + 4 * 2),
         [(str((3 ** 2 + 4) * 2), "added before multiplying (ignored order of operations)"),
          (str(3 * 2 + 4 * 2), "treated 3² as 3 × 2"), (str(3 + 4 * 2), "ignored the exponent")],
         "Exponent first: 3² = 9. Then multiply: 4 × 2 = 8. Then add: 9 + 8 = 17.")
    b.mc(C, "EE.1", "stretch", "What is the value of 2 × (5 + 3)² ÷ 4?", str(2 * (5 + 3) ** 2 // 4),
         [(str(2 * (5 + 3) // 4), "forgot to square the parentheses"), (str((2 * (5 + 3)) ** 2 // 4), "squared the whole product"),
          (str(2 * (5 + 3) ** 2), "forgot to divide by 4")],
         "Parentheses: 5 + 3 = 8. Exponent: 8² = 64. Then 2 × 64 = 128, and 128 ÷ 4 = 32.")
    b.mc(C, "EE.1", "core", "Which shows 5 × 5 × 5 × 5 written with an exponent?", "5⁴",
         [("4⁵", "swapped the base and the exponent"), ("5 × 4", "multiplied the base by the exponent"), ("5⁵", "used the wrong exponent")],
         "The base 5 is used as a factor 4 times, so it is 5⁴.")
    b.mc(C, "EE.1", "core", "What is 2⁵?", str(2 ** 5),
         [(str(2 * 5), "multiplied the base by the exponent"), (str(5 ** 2), "swapped the base and the exponent"), (str(2 + 5), "added the base and the exponent")],
         "2⁵ = 2 × 2 × 2 × 2 × 2 = 32.")
    # EE.2 algebraic expressions
    b.mc(C, "EE.2", "core", "Which expression represents “seven less than twice a number n”?", "2n − 7",
         [("7 − 2n", "subtracted in the wrong order"), ("2(n − 7)", "subtracted 7 before doubling"), ("7n − 2", "swapped the 7 and the 2")],
         "Twice a number is 2n. Seven less than that is 2n − 7.")
    b.mc(C, "EE.2", "core", "What is the value of 4a + 3 when a = 5?", str(4 * 5 + 3),
         [(str(4 * (5 + 3)), "added 3 to a before multiplying"), (str(4 + 3 + 5), "added all the numbers"),
          (str(45 + 3), "wrote 4 and 5 side by side as 45")],
         "4a means 4 × a. So 4 × 5 + 3 = 20 + 3 = 23.")
    b.mc(C, "EE.2", "stretch", "The area of a triangle is A = ½bh. What is A when b = 10 and h = 6?", str(10 * 6 // 2),
         [(str(10 * 6), "forgot the one half"), (str(10 + 6), "added instead of multiplying"), (str(10 * 6 // 4), "took half twice")],
         "A = ½ × 10 × 6 = ½ × 60 = 30.")
    b.mc(C, "EE.2", "core", "In the expression 3x + 8, what is the coefficient of x?", "3",
         [("x", "named the variable instead of the number multiplying it"), ("8", "named the constant term"), ("11", "added the 3 and the 8")],
         "The coefficient is the number multiplied by the variable: 3.")
    b.mc(C, "EE.2", "core", "How many terms are in the expression 5y + 2z − 9?", "3",
         [("2", "did not count the constant term"), ("5", "counted numbers and variables as separate terms"), ("4", "counted the minus sign as a term")],
         "Terms are separated by + and −: 5y, 2z and 9. That is 3 terms.")
    # EE.3 equivalent expressions
    b.mc(C, "EE.3", "core", "Which expression is equivalent to 3(x + 4)?", "3x + 12",
         [("3x + 4", "multiplied only the first term"), ("x + 12", "multiplied only the second term"), ("3x + 7", "added 3 to the 4")],
         "Distribute the 3 to both terms: 3 × x + 3 × 4 = 3x + 12.")
    b.mc(C, "EE.3", "stretch", "Which expression is equivalent to 6a + 9?", "3(2a + 3)",
         [("3(2a + 9)", "divided only the first term by 3"), ("6(a + 3)", "factored 6 out of the second term incorrectly"), ("15a", "combined unlike terms")],
         "The common factor is 3: 6a = 3 × 2a and 9 = 3 × 3, so 6a + 9 = 3(2a + 3).")
    b.mc(C, "EE.3", "core", "Which expression is equivalent to 4x + 2x + 5?", "6x + 5",
         [("11x", "combined the variable terms with the constant"), ("6x² + 5", "added the exponents"), ("8x + 5", "multiplied 4 × 2")],
         "4x and 2x are like terms: 4x + 2x = 6x. The constant 5 stays separate.")
    # EE.4 equivalence
    b.mc(C, "EE.4", "core", "Which expression is equivalent to 2x + 2x + 2x?", "6x",
         [("2x³", "treated repeated addition as an exponent"), ("x⁶", "treated the terms as exponents"), ("6x²", "added an exponent that is not there")],
         "Adding three 2x terms gives 3 × 2x = 6x.")
    b.mc(C, "EE.4", "stretch", "Are 3(x + 2) and 3x + 2 equivalent?",
         "No. 3(x + 2) = 3x + 6, so they give different values (for x = 1: 9 and 5).",
         [("Yes, because both have 3x and 2.", "ignored that the 3 multiplies the 2 as well"),
          ("Yes, because the distributive property always gives 3x + 2.", "misremembered the distributive property"),
          ("No, because 3(x + 2) = 3x + 5.", "added 3 + 2 instead of multiplying")],
         "Distributing gives 3x + 6, not 3x + 2. Trying x = 1: 3(3) = 9 but 3(1) + 2 = 5, so they are not equivalent.")
    b.mc(C, "EE.4", "core", "Which pair of expressions is equivalent?", "4(n + 1) and 4n + 4",
         [("4(n + 1) and 4n + 1", "multiplied only the first term"), ("n + n and n²", "confused adding with squaring"),
          ("5(n − 2) and 5n − 2", "multiplied only the first term")],
         "4(n + 1) = 4n + 4 by the distributive property, so the expressions are equivalent.")


def ee_equations(b):
    C = "EE-B"
    # EE.5 substitution
    b.mc(C, "EE.5", "core", "Which value of x makes x + 7 = 15 true?", "8",
         [("22", "added 7 and 15"), ("7", "used the number already in the equation"), ("2", "subtracted in the wrong order and slipped")],
         "Substitute 8: 8 + 7 = 15, which is true.")
    b.mc(C, "EE.5", "core", "Which number from the set {2, 4, 6, 8} makes 3y − 4 = 14 true?", "6",
         [("8", "3(8) − 4 = 20, not 14"), ("4", "3(4) − 4 = 8, not 14"), ("2", "3(2) − 4 = 2, not 14")],
         "Try each: 3(6) − 4 = 18 − 4 = 14. Only 6 works.")
    b.mc(C, "EE.5", "stretch", "Which value of m makes m ÷ 4 = 3 true?", "12",
         [("7", "added 4 and 3"), ("3/4", "divided 3 by 4"), ("1", "subtracted 3 from 4")],
         "12 ÷ 4 = 3, so m = 12.")
    b.mc(C, "EE.5", "stretch", "Which number from the set {0.5, 1, 1.5, 2} makes 4x = 6 true?", "1.5",
         [("2", "4 × 2 = 8, not 6"), ("1", "4 × 1 = 4, not 6"), ("0.5", "4 × 0.5 = 2, not 6")],
         "4 × 1.5 = 6, so x = 1.5.")
    # EE.6 writing expressions
    b.mc(C, "EE.6", "core", "Sam has n stickers and gives away 5. Which expression shows how many stickers he has left?", "n − 5",
         [("5 − n", "subtracted in the wrong order"), ("n + 5", "added instead of subtracting"), ("5n", "multiplied instead of subtracting")],
         "He starts with n and loses 5, so n − 5.")
    b.mc(C, "EE.6", "core", "Tickets cost $8 each. Which expression gives the cost of t tickets?", "8t",
         [("8 + t", "added instead of multiplying"), ("t ÷ 8", "divided instead of multiplying"), ("8 − t", "subtracted instead of multiplying")],
         "Each ticket costs $8, so t tickets cost 8 × t = 8t.")
    b.mc(C, "EE.6", "core", "A rectangle's length is 3 more than its width w. Which expression represents the length?", "w + 3",
         [("3w", "multiplied instead of adding"), ("w − 3", "subtracted instead of adding"), ("3 − w", "subtracted in the wrong order")],
         "“3 more than” the width means w + 3.")
    # EE.7 x + p = q and px = q
    b.mc(C, "EE.7", "core", "Solve x + 7 = 19.", "12",
         [("26", "added 7 and 19"), (M + "12", "gave the answer the wrong sign"), ("2", "subtracted wrongly")],
         "Subtract 7 from both sides: x = 19 − 7 = 12.")
    b.mc(C, "EE.7", "stretch", "Solve y + 3/4 = 2.", "5/4",
         [("11/4", "added 3/4 and 2"), ("3/2", "multiplied 3/4 by 2"), ("1/2", "subtracted 3/4 from 2 and slipped")],
         "Subtract 3/4 from both sides: y = 2 − 3/4 = 8/4 − 3/4 = 5/4.")
    b.mc(C, "EE.7", "stretch", "Mia earned $6.50 and now has $15. Which amount did she start with? (x + 6.50 = 15)", "$8.50",
         [("$21.50", "added the numbers instead of subtracting"), ("$9.50", "made a subtraction error"), ("$8.15", "made a decimal subtraction error")],
         "x = 15 − 6.50 = 8.50, so she started with $8.50.")
    b.num(C, "EE.7", "stretch", "Solve a + 2.4 = 9.1.", dec(F(91, 10) - F(24, 10)), [],
          "Subtract 2.4 from both sides: a = 9.1 − 2.4 = 6.7.",
          wrongs=[("11.5", "added instead of subtracting"), ("7.7", "made a regrouping error")])
    b.mc(C, "EE.7", "core", "Solve 5x = 40.", "8",
         [("200", "multiplied instead of dividing"), ("35", "subtracted instead of dividing"), ("45", "added instead of dividing")],
         "Divide both sides by 5: x = 40 ÷ 5 = 8.")
    b.mc(C, "EE.7", "stretch", "Solve (1/3)x = 4.", "12",
         [("4/3", "multiplied 4 by 1/3"), ("1/12", "divided 1/3 by 4"), ("7/3", "added 4 and 1/3")],
         "Multiply both sides by 3: x = 4 × 3 = 12.")
    b.mc(C, "EE.7", "stretch", "A box of 6 muffins costs $13.50. Which is the cost of one muffin? (6p = 13.50)", "$2.25",
         [("$81.00", "multiplied instead of dividing"), ("$7.50", "subtracted instead of dividing"), ("$19.50", "added instead of dividing")],
         "Divide both sides by 6: p = 13.50 ÷ 6 = 2.25.")
    b.num(C, "EE.7", "stretch", "Solve 2.5x = 10.", "4", ["4.0"],
          "Divide both sides by 2.5: x = 10 ÷ 2.5 = 4.",
          wrongs=[("25", "multiplied instead of dividing"), ("7.5", "subtracted instead of dividing")])


def ee_inequalities(b):
    C = "EE-C"
    # substitution
    b.mc(C, "EE.8", "core", "Which value of x makes x + 3 > 10 true?", "9",
         [("7", "7 + 3 = 10, which is not greater than 10"), ("5", "5 + 3 = 8"), ("3", "3 + 3 = 6")],
         "9 + 3 = 12, and 12 > 10 is true.")
    b.mc(C, "EE.8", "core", "Which value of n makes 2n ≤ 12 true?", "6",
         [("7", "2 × 7 = 14, which is greater than 12"), ("8", "2 × 8 = 16"), ("13", "2 × 13 = 26")],
         "2 × 6 = 12, and 12 ≤ 12 is true.")
    b.mc(C, "EE.8", "stretch", "Is 4 a solution of y − 1 < 3?", "No, because 4 − 1 = 3, which is not less than 3.",
         [("Yes, because 4 − 1 = 3.", "treated 3 as less than 3"), ("Yes, because 4 > 3.", "compared 4 to 3 instead of substituting"),
          ("No, because 4 is not less than 3.", "compared 4 to 3 instead of substituting")],
         "Substitute: 4 − 1 = 3. The inequality needs a value less than 3, so 4 is not a solution.")
    b.mc(C, "EE.8", "stretch", "Which number is NOT a solution of x ≥ 5?", "4.9",
         [("5", "5 ≥ 5 is true"), ("5.1", "5.1 ≥ 5 is true"), ("100", "100 ≥ 5 is true")],
         "Solutions are 5 and any number greater than 5. 4.9 is less than 5.")
    # writing inequalities
    b.mc(C, "EE.8", "core", "A sign says you must be at least 48 inches tall to ride. Which inequality shows the height h?", "h ≥ 48",
         [("h > 48", "left out 48 itself, but “at least” includes it"), ("h ≤ 48", "reversed the direction"), ("h < 48", "reversed the direction and left out 48")],
         "“At least 48” means 48 or more: h ≥ 48.")
    b.mc(C, "EE.8", "core", "Maria can spend no more than $20. Which inequality shows the amount s she spends?", "s ≤ 20",
         [("s ≥ 20", "reversed the direction"), ("s < 20", "left out 20 itself, but “no more than” includes it"), ("s > 20", "reversed the direction and left out 20")],
         "“No more than $20” means $20 or less: s ≤ 20.")
    b.mc(C, "EE.8", "core", "An elevator can hold fewer than 12 people. Which inequality shows the number of people p?", "p < 12",
         [("p ≤ 12", "included 12, but “fewer than” does not"), ("p > 12", "reversed the direction"), ("p ≥ 12", "reversed the direction")],
         "“Fewer than 12” does not include 12: p < 12.")
    b.mc(C, "EE.8", "core", "A recipe needs more than 3 cups of milk. Which inequality shows the cups c?", "c > 3",
         [("c ≥ 3", "included 3, but “more than” does not"), ("c < 3", "reversed the direction"), ("c ≤ 3", "reversed the direction and included 3")],
         "“More than 3” does not include 3: c > 3.")
    # infinitely many solutions
    b.mc(C, "EE.8", "core", "How many solutions does x > 4 have?", "Infinitely many",
         [("One solution, x = 5", "listed only the first whole number"), ("Four solutions", "counted only whole numbers up to 4"), ("No solutions", "thought an inequality cannot have solutions")],
         "Every number greater than 4, including decimals and fractions, is a solution.")
    b.mc(C, "EE.8", "stretch", "Which statement is true about x < 10?", "Every number less than 10, including decimals and negatives, is a solution.",
         [("Only whole numbers less than 10 are solutions.", "limited the solutions to whole numbers"), ("10 is a solution.", "included the boundary value"),
          ("Only 9 is a solution.", "thought only the closest whole number works")],
         "x < 10 is true for every number to the left of 10 on the number line.")
    b.mc(C, "EE.8", "stretch", "Which number is a solution of x > 7 and is not a whole number?", "7.5",
         [("7", "7 is not greater than 7"), ("6.5", "6.5 is less than 7"), ("8", "8 is a solution but it is a whole number")],
         "7.5 is greater than 7 and is not a whole number.")
    # number line descriptions
    b.mc(C, "EE.8", "core", "A number line has an open circle at 3 with shading to the right. Which inequality does it show?", "x > 3",
         [("x < 3", "shaded the wrong direction"), ("x ≥ 3", "used a closed circle for an open circle"), ("x ≤ 3", "reversed the direction and used the wrong circle")],
         "Open circle means 3 is not included. Shading right means greater than: x > 3.")
    b.mc(C, "EE.8", "stretch", "A number line has a closed circle at " + M + "2 with shading to the left. Which inequality does it show?", "x ≤ " + M + "2",
         [("x < " + M + "2", "used an open circle for a closed circle"), ("x ≥ " + M + "2", "reversed the direction"), ("x > " + M + "2", "reversed the direction and used the wrong circle")],
         "Closed circle means " + M + "2 is included. Shading left means less than: x ≤ " + M + "2.")
    b.mc(C, "EE.8", "stretch", "Which description matches the graph of x < 5 on a number line?", "An open circle at 5 with shading to the left",
         [("A closed circle at 5 with shading to the left", "included 5, but x < 5 does not"),
          ("An open circle at 5 with shading to the right", "shaded the wrong direction"),
          ("A closed circle at 5 with shading to the right", "used the wrong circle and direction")],
         "x < 5 does not include 5 (open circle) and includes numbers to the left.")
    b.mc(C, "EE.8", "stretch", "Which description matches the graph of x ≥ 0 on a number line?", "A closed circle at 0 with shading to the right",
         [("An open circle at 0 with shading to the right", "left out 0 itself"), ("A closed circle at 0 with shading to the left", "shaded the wrong direction"),
          ("An open circle at 0 with shading to the left", "used the wrong circle and direction")],
         "x ≥ 0 includes 0 (closed circle) and numbers greater than 0 (shading right).")


def ee_relationships(b):
    C = "EE-D"
    b.mc(C, "EE.9", "core", "Maya earns $12 each hour. She uses h for hours worked and e for the money she earns. Which is the independent variable?", "h",
         [("e", "named the dependent variable"), ("12", "named the rate, which is a constant"), ("Both h and e", "thought both variables are independent")],
         "Earnings depend on the hours worked, so hours (h) is the independent variable.")
    b.mc(C, "EE.9", "core", "In the equation d = 55t, d is the distance a car travels and t is time. Which is the dependent variable?", "d",
         [("t", "named the independent variable"), ("55", "named the rate, which is a constant"), ("Both t and d", "thought both variables are dependent")],
         "Distance depends on time, so d is the dependent variable.")
    b.mc(C, "EE.9", "core", "A plant's height is measured every day. Which is the independent variable?", "The number of days",
         [("The height of the plant", "named the dependent variable"), ("The color of the plant", "named something unrelated to the relationship"),
          ("The size of the pot", "named something unrelated to the relationship")],
         "Height changes as days pass, so the number of days is the independent variable.")
    b.mc(C, "EE.9", "core", "In the equation c = 4n, c is the cost in dollars of n pencils. What does the 4 represent?", "The cost of one pencil",
         [("The number of pencils", "confused the constant with the variable n"), ("The total cost", "confused the constant with the variable c"),
          ("The number of dollars in the bank", "made up a meaning")],
         "Each pencil costs $4, so the cost c is 4 times the number of pencils n.")
    b.mc(C, "EE.9", "stretch", "In y = x + 5, what happens to y when x increases by 2?", "y increases by 2",
         [("y increases by 5", "used the constant instead of the change in x"), ("y increases by 7", "added 2 and 5"), ("y decreases by 2", "reversed the direction")],
         "Adding 5 does not change how much y changes: if x goes up 2, y goes up 2.")
    b.mc(C, "EE.9", "core", "A table shows x = 1, 2, 3, 4 and y = 4, 8, 12, 16. Which equation matches?", "y = 4x",
         [("y = x + 3", "found a pattern that only works for x = 1"), ("y = 2x + 2", "found a pattern that only works for x = 1"), ("y = x ÷ 4", "divided instead of multiplying")],
         "Each y is 4 times x: 4 × 1 = 4, 4 × 2 = 8, 4 × 3 = 12, 4 × 4 = 16.")
    b.mc(C, "EE.9", "stretch", "A table shows x = 2, 4, 6, 8 and y = 5, 7, 9, 11. Which equation matches?", "y = x + 3",
         [("y = 2x + 1", "found a pattern that only works for x = 2"), ("y = x + 5", "used the first y-value as the constant"), ("y = 3x − 1", "found a pattern that only works for x = 2")],
         "y is always 3 more than x: 2 + 3 = 5, 4 + 3 = 7, 6 + 3 = 9, 8 + 3 = 11.")
    b.mc(C, "EE.9", "core", "What is y when x = 4 in the equation y = 3x − 2?", str(3 * 4 - 2),
         [(str(3 * 4 + 2), "added instead of subtracting"), (str(3 + 4 - 2), "added 3 and 4 instead of multiplying"), (str(3 * (4 - 2)), "subtracted before multiplying")],
         "y = 3(4) − 2 = 12 − 2 = 10.")
    b.mc(C, "EE.9", "stretch", "A table shows x = 0, 1, 2, 3 and y = 10, 8, 6, 4. Which equation matches?", "y = 10 − 2x",
         [("y = 10 + 2x", "used addition when y decreases"), ("y = 2x − 10", "reversed the subtraction"), ("y = 5x", "found a pattern that only works for x = 2")],
         "y starts at 10 and goes down 2 each time x goes up 1: y = 10 − 2x.")
    b.mc(C, "EE.9", "core", "Which ordered pair satisfies y = 6x?", "(3, 18)",
         [("(3, 9)", "added 6 instead of multiplying"), ("(18, 3)", "swapped x and y"), ("(6, 3)", "swapped x and y and used the wrong values")],
         "For x = 3, y = 6 × 3 = 18, so the pair is (3, 18).")
    b.mc(C, "EE.9", "core", "A taxi charges $3 to start plus $2 for each mile. Which equation gives the cost c for m miles?", "c = 2m + 3",
         [("c = 3m + 2", "swapped the starting fee and the rate"), ("c = 5m", "added the numbers and multiplied by miles"), ("c = m + 5", "added all the numbers")],
         "The cost is $2 per mile times m miles, plus the $3 fee: c = 2m + 3.")
    b.mc(C, "EE.9", "stretch", "A gym charges a $20 joining fee plus $15 each month. Which equation gives the total cost t after m months?", "t = 15m + 20",
         [("t = 20m + 15", "swapped the fee and the monthly rate"), ("t = 35m", "added the numbers and multiplied by months"), ("t = 15m − 20", "subtracted the fee")],
         "Monthly charges are 15m, and the joining fee is added once: t = 15m + 20.")
    b.mc(C, "EE.9", "stretch", "A candle is 12 inches tall and burns 2 inches every hour. Which equation gives its height h after t hours?", "h = 12 − 2t",
         [("h = 12 + 2t", "added when the candle gets shorter"), ("h = 2t − 12", "reversed the subtraction"), ("h = 2 − 12t", "swapped the numbers")],
         "The candle starts at 12 inches and loses 2 inches per hour: h = 12 − 2t.")
    b.mc(C, "EE.9", "stretch", "The graph of a relationship is a straight line through (0, 0), (1, 3) and (2, 6). Which equation matches?", "y = 3x",
         [("y = x + 3", "found a pattern that only works for one point"), ("y = 3", "thought y never changes"), ("y = x ÷ 3", "divided instead of multiplying")],
         "Each y is 3 times x: 3 × 1 = 3 and 3 × 2 = 6, and the line passes through (0, 0).")
    b.mc(C, "EE.9", "core", "In a table, y is always 4 more than x. Which statement is true?", "When x = 10, y = 14.",
         [("When x = 10, y = 40.", "multiplied instead of adding"), ("When x = 10, y = 6.", "subtracted instead of adding"), ("When x = 10, y = 10.", "ignored the 4")],
         "4 more than 10 is 14.")
