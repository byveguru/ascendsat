"""Math 7 items, part A: RP, NS, EE (expressions; equations and inequalities)."""
from fractions import Fraction as F
from gen_common import fmt, money, dec, MINUS

M = MINUS


def rp(b):
    C = "RP"
    # RP.1 unit rates with fractions
    b.mc(C, "RP.1", "core", "A hiker walks 1/2 mile in 1/4 hour. What is her speed in miles per hour?", fmt(F(1, 2) / F(1, 4)),
         [(fmt(F(1, 2) * F(1, 4)), "multiplied the fractions instead of dividing"), (fmt(F(1, 4) / F(1, 2)), "divided time by distance (hours per mile)"),
          (fmt(F(1, 2) + F(1, 4)), "added the fractions")],
         "Miles per hour = distance ÷ time = 1/2 ÷ 1/4 = 2.")
    b.mc(C, "RP.1", "core", "A recipe uses 2/3 cup of sugar for every 1/2 of a batch. How many cups of sugar are needed for one whole batch?", fmt(F(2, 3) / F(1, 2)),
         [(fmt(F(2, 3) * F(1, 2)), "multiplied instead of dividing"), (fmt(F(1, 2) / F(2, 3)), "divided in the wrong order"), (fmt(F(2, 3) + F(1, 2)), "added the fractions")],
         "For 1 whole batch: 2/3 ÷ 1/2 = 2/3 × 2 = 4/3 cups.")
    b.mc(C, "RP.1", "stretch", "A painter paints 3/4 of a wall in 1/2 hour. How much of a wall does the painter paint per hour?", fmt(F(3, 4) / F(1, 2)),
         [(fmt(F(3, 4) * F(1, 2)), "multiplied instead of dividing"), (fmt(F(1, 2) / F(3, 4)), "divided in the wrong order"), (fmt(F(3, 4) + F(1, 2)), "added the fractions")],
         "Walls per hour = 3/4 ÷ 1/2 = 3/4 × 2 = 3/2.")
    b.num(C, "RP.1", "stretch", "A cyclist rides 7/2 miles in 1/4 hour. What is the speed in miles per hour?", fmt(F(7, 2) / F(1, 4)), [],
          "7/2 ÷ 1/4 = 7/2 × 4 = 14 miles per hour.",
          wrongs=[(fmt(F(7, 8)), "multiplied instead of dividing"), (fmt(F(1, 14)), "divided in the wrong order")], unit="miles per hour")
    # RP.2 proportional relationships
    b.mc(C, "RP.2", "core", "Which table shows a proportional relationship between x and y?", "x: 1, 2, 3, 4 and y: 3, 6, 9, 12",
         [("x: 1, 2, 3, 4 and y: 4, 5, 6, 7", "added the same amount instead of multiplying"), ("x: 1, 2, 3, 4 and y: 2, 5, 8, 11", "y = 3x − 1 does not pass through (0, 0)"),
          ("x: 1, 2, 3, 4 and y: 3, 5, 9, 17", "the ratios y/x are not constant")],
         "In a proportional relationship y/x is always the same: 3/1 = 6/2 = 9/3 = 12/4 = 3.")
    b.mc(C, "RP.2", "core", "The graph of a proportional relationship is a line through (0, 0) and (2, 6). What is the constant of proportionality?", "3",
         [("2", "used the x-coordinate"), ("6", "used the y-coordinate"), ("1/3", "divided x by y")],
         "The constant of proportionality is y/x = 6/2 = 3.")
    b.mc(C, "RP.2", "stretch", "The graph of y = 5x passes through the point (1, 5). What does this point mean?", "For every 1 unit of x, y is 5, so 5 is the unit rate.",
         [("When y is 1, x is 5.", "swapped x and y"), ("The line crosses the y-axis at 5.", "confused the unit rate with the y-intercept"), ("x and y are always both equal to 5.", "treated the point as the whole relationship")],
         "The point (1, r) shows the unit rate: when x is 1, y is r = 5.")
    b.mc(C, "RP.2", "stretch", "Why does the graph of a proportional relationship include the point (0, 0)?", "Because 0 of one quantity goes with 0 of the other quantity",
         [("Because every graph starts at the origin", "overgeneralized: graphs of other relationships need not pass through (0, 0)"),
          ("Because the constant of proportionality is 0", "confused the point with the unit rate"), ("Because the line must be horizontal", "confused proportional with constant")],
         "If you buy 0 pounds you pay $0. Zero of one quantity corresponds to zero of the other.")
    b.mc(C, "RP.2", "stretch", "At Store A the cost y (in dollars) of x pounds of grapes is y = 4x. At Store B, 3 pounds cost $15. Which store has the lower price per pound?",
         "Store A, at $4 per pound", [("Store B, at $5 per pound", "treated the higher price as the lower price"), ("Store B, at $3 per pound", "used the number of pounds as the price"),
                                        ("They cost the same", "did not compute Store B's unit rate")],
         "Store A: $4 per pound. Store B: 15 ÷ 3 = $5 per pound. Store A is cheaper.")
    b.mc(C, "RP.2", "core", "Which equation represents a proportional relationship in which y is 2.5 times x?", "y = 2.5x",
         [("y = x + 2.5", "added instead of multiplying"), ("y = 2.5", "dropped the variable x"), ("x = 2.5y", "swapped x and y")],
         "A proportional relationship has the form y = kx. Here k = 2.5.")
    # RP.3 percent and scale problems
    b.mc(C, "RP.3", "core", "A shirt costs $40 and is on sale for 25% off. What is the sale price?", "$30",
         [("$10", "gave the discount instead of the sale price"), ("$65", "added the discount to the price"), ("$25", "used the percent as the price")],
         "25% of $40 is $10. The sale price is $40 − $10 = $30.")
    b.mc(C, "RP.3", "core", "A $50 meal has 8% sales tax. What is the total cost?", "$54",
         [("$4", "gave the tax only"), ("$58", "added 8 dollars instead of 8 percent"), ("$46", "subtracted the tax")],
         "Tax is 0.08 × $50 = $4. Total: $50 + $4 = $54.")
    b.mc(C, "RP.3", "stretch", "A price rises from $20 to $25. What is the percent increase?", "25%",
         [("20%", "divided the change by the new price"), ("5%", "used the dollar change as the percent"), ("125%", "compared the new price to the old price without subtracting")],
         "The increase is $5. Percent increase = 5 ÷ 20 = 0.25 = 25%.")
    b.mc(C, "RP.3", "core", "A photo is 4 inches wide. It is enlarged using a scale factor of 2.5. What is the new width?", "10 inches",
         [("6.5 inches", "added the scale factor"), ("1.6 inches", "divided by the scale factor"), ("8 inches", "multiplied by 2 instead of 2.5")],
         "Multiply by the scale factor: 4 × 2.5 = 10.")
    b.num(C, "RP.3", "stretch", "You leave a 15% tip on a $32 meal. How many dollars is the tip?", "4.80", ["4.8", "$4.80", "$4.8"],
          "10% of $32 is $3.20 and 5% is $1.60, so 15% is $3.20 + $1.60 = $4.80.",
          wrongs=[("$15.00", "used the percent as dollars"), ("$36.80", "gave the total instead of the tip")])


def ns(b):
    C = "NS"
    # NS.1 add and subtract rational numbers
    b.mc(C, "NS.1", "core", "What is " + M + "3/4 + 1/2?", fmt(F(-3, 4) + F(1, 2)),
         [(M + "5/4", "added the absolute values and kept the negative sign"), ("1/4", "gave the sum the wrong sign"), (M + "1/3", "added numerators and denominators")],
         M + "3/4 + 2/4 = " + M + "1/4.")
    b.mc(C, "NS.1", "core", "What is 5.2 − (" + M + "3.8)?", "9",
         [("1.4", "subtracted 3.8 instead of adding it"), (M + "9", "gave the wrong sign"), (M + "1.4", "subtracted and gave the wrong sign")],
         "Subtracting " + M + "3.8 is adding 3.8: 5.2 + 3.8 = 9.")
    b.mc(C, "NS.1", "stretch", "The temperature is " + M + "7°F. It rises 12.5°F and then drops 4°F. What is the temperature now?", "1.5°F",
         [(M + "1.5°F", "gave the wrong sign"), ("8.5°F", "ignored the starting temperature of " + M + "7°F"), (M + "23.5°F", "subtracted every change")],
         M + "7 + 12.5 = 5.5, and 5.5 − 4 = 1.5.")
    b.mc(C, "NS.1", "stretch", "What is " + M + "5/2 − 7/4?", fmt(F(-5, 2) - F(7, 4)),
         [(M + "13/4", "added the mixed parts incorrectly"), (M + "3/4", "subtracted the absolute values"), ("17/4", "dropped the negative sign")],
         M + "5/2 = " + M + "10/4. Then " + M + "10/4 − 7/4 = " + M + "17/4.")
    b.mc(C, "NS.1", "core", "What is the distance between " + M + "3.5 and 2 on a number line?", "5.5",
         [("1.5", "subtracted the absolute values"), (M + "5.5", "gave a negative distance"), ("6.5", "added an extra 1")],
         "Distance = |2 − (" + M + "3.5)| = 5.5.")
    # NS.2 multiply and divide
    b.mc(C, "NS.2", "core", "What is (" + M + "3) × (" + M + "4/5)?", fmt(F(-3) * F(-4, 5)),
         [(M + "12/5", "gave the wrong sign (negative × negative is positive)"), ("3/5", "divided instead of multiplying"), (M + "7/5", "added instead of multiplying")],
         "A negative times a negative is positive: 3 × 4/5 = 12/5.")
    b.mc(C, "NS.2", "stretch", "What is (" + M + "18) ÷ (" + M + "3/2)?", fmt(F(-18) / F(-3, 2)),
         [(M + "12", "gave the wrong sign"), ("27", "multiplied by 3/2 instead of dividing"), ("1/12", "divided in the wrong order")],
         "18 ÷ 3/2 = 18 × 2/3 = 12, and a negative divided by a negative is positive.")
    b.mc(C, "NS.2", "core", "Use long division to write 3/8 as a decimal.", "0.375",
         [("2.67", "divided 8 by 3"), ("0.0375", "put the decimal point one place too far left"), ("3.8", "wrote the digits side by side")],
         "3 ÷ 8 = 0.375, and the division ends because the remainder is 0.")
    b.mc(C, "NS.2", "stretch", "Which fraction has a decimal form that repeats forever?", "2/3",
         [("3/4", "0.75 terminates"), ("7/8", "0.875 terminates"), ("1/5", "0.2 terminates")],
         "2 ÷ 3 = 0.666…, which repeats. The others end.")
    b.num(C, "NS.2", "core", "What is (" + M + "1.2) × 5?", M + "6", [],
          "1.2 × 5 = 6, and a negative times a positive is negative: " + M + "6.",
          wrongs=[("6", "gave the wrong sign"), (M + "0.6", "put the decimal point in the wrong place")])
    # NS.3 multi-step with rational numbers
    b.mc(C, "NS.3", "stretch", "A diver is at " + M + "12.5 m. She rises 3.5 m and then descends 6 m. Where is she now?", M + "15 m",
         [(M + "9 m", "ignored the final descent"), (M + "22 m", "treated the rise as a descent"), ("3 m", "dropped the negative sign on the starting depth")],
         M + "12.5 + 3.5 = " + M + "9, and " + M + "9 − 6 = " + M + "15.")
    b.mc(C, "NS.3", "stretch", "What is the value of " + M + "2(3/4 − 5/4) + 1/2?", "3/2",
         [(M + "1/2", "made a sign error: " + M + "2 × (" + M + "1/2) = " + M + "1"), (M + "9/4", "forgot the parentheses (multiplied only the 3/4)"), ("1", "stopped before adding 1/2")],
         "3/4 − 5/4 = " + M + "1/2. Then " + M + "2 × (" + M + "1/2) = 1, and 1 + 1/2 = 3/2.")
    b.mc(C, "NS.3", "stretch", "A bank balance is $120. Then $35.50 is withdrawn, $18.25 is deposited and $60 is withdrawn. What is the final balance?", "$42.75",
         [("$6.25", "treated the deposit as a withdrawal"), ("$24.50", "ignored the deposit"), ("$233.75", "added every amount")],
         "120 − 35.50 = 84.50. 84.50 + 18.25 = 102.75. 102.75 − 60 = 42.75.")
    b.mc(C, "NS.3", "stretch", "At 2°F the temperature starts to change by " + M + "3/4°F each hour. What is the temperature after 6 hours?", M + "2.5°F",
         [(M + "4.5°F", "ignored the starting temperature"), ("6.5°F", "added the change instead of subtracting"), ("0.5°F", "used 6 ÷ 4 as the total change")],
         "6 × (" + M + "3/4) = " + M + "4.5. Then 2 − 4.5 = " + M + "2.5.")
    b.num(C, "NS.3", "challenge", "What is (" + M + "3.5)(2) + 4.2 ÷ (" + M + "0.6)?", M + "14", [],
          M + "3.5 × 2 = " + M + "7 and 4.2 ÷ (" + M + "0.6) = " + M + "7, so the sum is " + M + "14.",
          wrongs=[("0", "got +7 for 4.2 ÷ (" + M + "0.6)"), (M + "7", "dropped one of the two terms")])


def ee_expressions(b):
    C = "EE-A"
    # EE.1 operations on linear expressions
    b.mc(C, "EE.1", "core", "Simplify (3x + 5) + (2x − 8).", "5x − 3",
         [("5x − 13", "added 5 and 8 instead of 5 and (" + M + "8)"), ("5x² − 3", "turned adding like terms into an exponent"), ("5x + 3", "gave the constant the wrong sign")],
         "Combine like terms: 3x + 2x = 5x and 5 + (" + M + "8) = " + M + "3.")
    b.mc(C, "EE.1", "stretch", "Simplify (7x − 4) − (3x − 9).", "4x + 5",
         [("4x − 13", "did not subtract the second constant: " + M + "4 − 9"), ("10x − 13", "added the expressions instead of subtracting"), ("4x − 5", "made a sign error on the constants")],
         "Distribute the minus: 7x − 4 − 3x + 9 = 4x + 5.")
    b.mc(C, "EE.1", "core", "Which expression is equivalent to 3(2x − 5)?", "6x − 15",
         [("6x − 5", "multiplied only the first term"), ("5x − 8", "added 3 to each term"), ("6x + 15", "gave the second term the wrong sign")],
         "Distribute 3 to both terms: 6x − 15.")
    b.mc(C, "EE.1", "stretch", "Which expression is equivalent to " + M + "2(4x − 3)?", M + "8x + 6",
         [(M + "8x − 6", "did not change the sign of the second term"), (M + "8x + 3", "multiplied only the first term"), ("8x − 6", "dropped the negative on the first term")],
         M + "2 × 4x = " + M + "8x and " + M + "2 × (" + M + "3) = 6.")
    b.mc(C, "EE.1", "core", "Which expression is equivalent to (1/2)(6x + 10)?", "3x + 5",
         [("3x + 10", "halved only the first term"), ("6x + 5", "halved only the second term"), ("12x + 20", "doubled instead of halving")],
         "Half of 6x is 3x and half of 10 is 5.")
    b.mc(C, "EE.1", "core", "Factor 12x + 18 using the greatest common factor.", "6(2x + 3)",
         [("6(2x + 18)", "factored 6 out of the first term only"), ("2(6x + 3)", "did not factor out the full common factor: 2(6x + 3) = 12x + 6"), ("3(4x + 18)", "factored 3 out of the first term only")],
         "The GCF of 12 and 18 is 6: 12x + 18 = 6(2x + 3).")
    b.mc(C, "EE.1", "stretch", "Factor 15a − 25 using the greatest common factor.", "5(3a − 5)",
         [("5(3a − 25)", "factored 5 out of the first term only"), ("15(a − 10)", "used a factor that does not divide 25"), ("3(5a − 25)", "factored 3 out of the first term only")],
         "The GCF of 15 and 25 is 5: 15a − 25 = 5(3a − 5).")
    b.mc(C, "EE.1", "stretch", "Simplify 0.5(4x + 3) − 1.5x.", "0.5x + 1.5",
         [("2x + 1.5", "did not combine 2x and " + M + "1.5x"), ("0.5x + 3", "did not halve the 3"), ("2.5x + 1.5", "added 2x and 1.5x instead of subtracting")],
         "0.5(4x + 3) = 2x + 1.5, and 2x − 1.5x = 0.5x.")
    b.mc(C, "EE.1", "core", "Simplify 3.5x + 1.5 − 2x + 0.5.", "1.5x + 2",
         [("5.5x + 2", "added 3.5x and 2x instead of subtracting"), ("1.5x + 1", "subtracted 0.5 instead of adding"), ("3.5x", "combined unlike terms")],
         "3.5x − 2x = 1.5x and 1.5 + 0.5 = 2.")
    # EE.2 meaning of equivalent expressions
    b.mc(C, "EE.2", "core", "A jacket's price p drops by 20%. Which expression is equivalent to p − 0.2p and shows the sale price directly?", "0.8p",
         [("1.2p", "added the percent instead of subtracting"), ("0.2p", "gave the discount instead of the sale price"), ("p − 2", "subtracted 2 dollars instead of 20%")],
         "p − 0.2p = 1p − 0.2p = 0.8p. The jacket now costs 80% of the original price.")
    b.mc(C, "EE.2", "stretch", "A rectangle has width w and length w + 4. Its perimeter is w + (w + 4) + w + (w + 4) = 4w + 8. Where does the 8 come from?", "The two sides that are each 4 units longer than w",
         [("The number of sides", "confused the constant with the count of sides"), ("The width of the rectangle", "confused the constant with the variable"), ("The area of the rectangle", "confused perimeter with area")],
         "Each of the two long sides has an extra 4, so there is 4 + 4 = 8 extra in all.")
    b.mc(C, "EE.2", "stretch", "A phone plan costs $20 plus $0.05 per text. Adding a $5 fee gives 20 + 0.05t + 5 = 25 + 0.05t. What does 25 represent?", "The fixed amount charged no matter how many texts are sent",
         [("The cost of each text", "confused the constant with the rate"), ("The number of texts", "confused the constant with the variable"), ("The cost of 5 texts", "made up a meaning")],
         "25 does not change with t, so it is the fixed charge: $20 + $5.")
    b.mc(C, "EE.2", "core", "A price p increases by 5% sales tax, giving 1.05p. Which expression is equivalent and shows the original price plus the tax?", "p + 0.05p",
         [("p + 5", "added 5 dollars instead of 5 percent"), ("0.05p", "gave only the tax"), ("p − 0.05p", "subtracted the tax")],
         "1.05p = 1p + 0.05p: the price plus 5% of the price.")
    b.mc(C, "EE.2", "stretch", "A rectangle has length 2x + 3 and width 4. Which expression is equivalent to its area, 4(2x + 3)?", "8x + 12",
         [("8x + 3", "multiplied only the first term"), ("6x + 7", "added 4 to each term"), ("2x + 12", "multiplied only the second term")],
         "Distribute the 4: 4 × 2x + 4 × 3 = 8x + 12.")
    b.mc(C, "EE.2", "stretch", "In 4(2x + 3), the 4 is the number of identical boxes and 2x + 3 is the cost of one box. What does the 3 represent?", "The fixed part of each box's cost",
         [("The number of boxes", "confused the 3 with the 4"), ("The total cost of all the boxes", "confused one box with all the boxes"), ("The number of items in each box", "made up a meaning")],
         "Inside the parentheses, the 3 is the part of one box's cost that does not depend on x.")


def ee_equations(b):
    C = "EE-B"
    # EE.3 multi-step with rational numbers
    b.mc(C, "EE.3", "core", "Tom buys 3 shirts that cost $14.50 each and uses a $10 coupon on the total. How much does he pay?", "$33.50",
         [("$53.50", "added the coupon instead of subtracting"), ("$4.50", "applied the coupon to one shirt only"), ("$43.50", "ignored the coupon")],
         "3 × $14.50 = $43.50. Then $43.50 − $10 = $33.50.")
    b.mc(C, "EE.3", "stretch", "What is the value of (1/2)x − 3 when x = " + M + "8?", M + "7",
         [("1", "made a sign error: " + M + "4 − 3 = 1"), (M + "1", "divided the 3 by 2 as well"), (M + "11", "subtracted 3 from " + M + "8 before halving")],
         "(1/2)(" + M + "8) = " + M + "4, and " + M + "4 − 3 = " + M + "7.")
    b.mc(C, "EE.3", "stretch", "A submarine is at " + M + "300 ft. It rises 25 ft each minute for 8 minutes. Where is it now?", M + "100 ft",
         [(M + "500 ft", "descended instead of rising"), (M + "275 ft", "used only one minute"), ("100 ft", "dropped the negative sign")],
         "It rises 25 × 8 = 200 ft. Then " + M + "300 + 200 = " + M + "100.")
    b.num(C, "EE.3", "stretch", "What is the value of 3(x − 2.5) when x = 4?", "4.5", [],
          "x − 2.5 = 1.5, and 3 × 1.5 = 4.5.",
          wrongs=[("9.5", "multiplied only the x by 3"), ("1.5", "forgot to multiply by 3")])
    # EE.4 equations and inequalities
    b.mc(C, "EE.4", "core", "Solve 3x + 5 = 20.", "5",
         [("15", "stopped after subtracting 5"), ("25/3", "added 5 instead of subtracting"), (M + "5", "gave the answer the wrong sign")],
         "Subtract 5: 3x = 15. Divide by 3: x = 5.")
    b.mc(C, "EE.4", "core", "Solve 2x − 7 = 9.", "8",
         [("1", "subtracted 7 instead of adding"), ("16", "stopped after adding 7"), ("11", "added instead of dividing")],
         "Add 7: 2x = 16. Divide by 2: x = 8.")
    b.mc(C, "EE.4", "stretch", "Solve x/4 + 3 = 8.", "20",
         [("5", "stopped after subtracting 3"), ("44", "added 3 instead of subtracting"), ("32", "ignored the +3")],
         "Subtract 3: x/4 = 5. Multiply by 4: x = 20.")
    b.mc(C, "EE.4", "stretch", "Solve 0.5x − 2 = 3.", "10",
         [("5", "stopped after adding 2"), ("2.5", "multiplied by 0.5 instead of dividing"), ("12", "made a decimal error")],
         "Add 2: 0.5x = 5. Divide by 0.5: x = 10.")
    b.mc(C, "EE.4", "core", "A plumber charges a $45 visit fee plus $30 for each hour. The bill is $135. How many hours did the plumber work?", "3",
         [("4.5", "ignored the visit fee"), ("6", "added the fee instead of subtracting"), ("90", "stopped after subtracting the fee")],
         "45 + 30h = 135, so 30h = 90 and h = 3.")
    b.mc(C, "EE.4", "stretch", "Ava has $40 and saves $15 each week. She wants to have at least $130. Which inequality shows this, where w is the number of weeks?", "15w + 40 ≥ 130",
         [("15w + 40 ≤ 130", "reversed the inequality: “at least” means ≥"), ("15w ≥ 130", "ignored the $40 she already has"), ("40w + 15 ≥ 130", "swapped the $40 and the $15")],
         "Total money is 15w + 40, and it must be at least 130.")
    b.mc(C, "EE.4", "stretch", "Solve " + M + "2x + 3 > 11.", "x < " + M + "4",
         [("x > " + M + "4", "did not reverse the inequality when dividing by a negative"), ("x < 4", "made a sign error"), ("x > 4", "made a sign error and did not reverse")],
         "Subtract 3: " + M + "2x > 8. Divide by " + M + "2 and reverse the inequality: x < " + M + "4.")
    b.mc(C, "EE.4", "stretch", "Solve 4x − 6 ≤ 10.", "x ≤ 4",
         [("x ≥ 4", "reversed the inequality when dividing by a positive"), ("x ≤ 1", "subtracted 6 instead of adding"), ("x ≤ 40", "multiplied instead of dividing")],
         "Add 6: 4x ≤ 16. Divide by 4: x ≤ 4.")
    b.mc(C, "EE.4", "stretch", "Which description matches the graph of the solution to 2x + 1 < 7 on a number line?", "An open circle at 3 with shading to the left",
         [("A closed circle at 3 with shading to the left", "included 3, but the inequality is strict"), ("An open circle at 3 with shading to the right", "shaded the wrong direction"),
          ("An open circle at 6 with shading to the left", "did not finish solving")],
         "2x < 6, so x < 3. The circle at 3 is open and the shading goes left.")
    b.mc(C, "EE.4", "core", "A number multiplied by 3 and then increased by 5 is 20. In solving 3x + 5 = 20 you undo the operations. Which order undoes them?", "Subtract 5, then divide by 3",
         [("Divide by 3, then subtract 5", "undid the operations in the same order they were done"), ("Add 5, then multiply by 3", "used the inverse of the wrong operations"), ("Subtract 3, then divide by 5", "swapped the numbers")],
         "To undo “multiply by 3, then add 5”, undo in reverse order: subtract 5, then divide by 3.")
    b.mc(C, "EE.4", "core", "Jo earns $12 plus $3 for each hour of babysitting. She earned $33 in all. In 12 + 3h = 33, the solution is h = 7. What does 7 mean?", "Jo babysat for 7 hours.",
         [("Jo earns $7 each hour.", "confused the solution with the rate"), ("Jo earned $7 in all.", "confused the solution with the total"), ("Jo started with $7.", "confused the solution with the fixed amount")],
         "h is the number of hours, so h = 7 means 7 hours. Check: 12 + 3 × 7 = 33.")
