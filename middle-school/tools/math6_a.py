"""Math 6 items, part A: ratios (RP) and the Number System (NS)."""
from fractions import Fraction as F
from gen_common import fmt, money, dec, MINUS


def rp(b):
    C = "RP"
    # --- RP.1 ratio concepts and language
    b.mc(C, "RP.1", "core", "A bag has 5 red marbles and 3 blue marbles. What is the ratio of red marbles to blue marbles?",
         "5:3", [("3:5", "reversed the order of the ratio"), ("5:8", "compared red to the total instead of to blue"),
                 ("3:8", "compared blue to the total")],
         "“Red to blue” puts red first: 5 red for every 3 blue, so 5:3.")
    b.mc(C, "RP.1", "core", "A class has 12 girls and 8 boys. Which statement describes the ratio of girls to boys?",
         "For every 3 girls there are 2 boys.",
         [("For every 2 girls there are 3 boys.", "reversed the order of the ratio"),
          ("For every 3 girls there are 5 students.", "mixed a part-to-part ratio with a part-to-whole ratio"),
          ("For every 12 girls there are 8 boys, and that cannot be made simpler.", "did not simplify the ratio")],
         "12:8 simplifies by dividing both by 4 to 3:2: 3 girls for every 2 boys.")
    b.mc(C, "RP.1", "stretch", "A fruit bowl has 4 apples and 6 oranges. What is the ratio of apples to all of the fruit?",
         "2:5", [("2:3", "compared apples to oranges instead of to all the fruit"), ("3:5", "used oranges instead of apples"),
                 ("5:2", "reversed the order of the ratio")],
         "There are 4 + 6 = 10 pieces of fruit. Apples to all fruit is 4:10, which simplifies to 2:5.")
    # --- RP.2 unit rates
    b.mc(C, "RP.2", "core", "Maya reads 90 pages in 3 hours. At this rate, how many pages does she read per hour?",
         "30 pages per hour", [("1/30 pages per hour", "divided hours by pages (inverted the rate)"),
                               ("270 pages per hour", "multiplied instead of dividing"),
                               ("87 pages per hour", "subtracted instead of dividing")],
         "A unit rate for pages per hour is pages ÷ hours: 90 ÷ 3 = 30.")
    b.num(C, "RP.2", "core", "5 pounds of apples cost $12.50. What is the cost of 1 pound of apples?",
          "$2.50", ["2.5", "2.50", "$2.5"], "Divide the cost by the pounds: $12.50 ÷ 5 = $2.50 per pound.",
          wrongs=[("$0.40", "divided pounds by cost (inverted the rate)"), ("$62.50", "multiplied instead of dividing")])
    b.mc(C, "RP.2", "stretch", "A car travels 150 miles on 6 gallons of gas. Which pair gives both unit rates?",
         "25 miles per gallon and 1/25 gallon per mile",
         [("25 miles per gallon and 25 gallons per mile", "used the same number for both unit rates"),
          ("1/25 mile per gallon and 25 gallons per mile", "attached each unit rate to the wrong units"),
          ("900 miles per gallon and 1/900 gallon per mile", "multiplied 150 × 6 instead of dividing")],
         "150 ÷ 6 = 25 miles for each gallon. Going the other way, 6 ÷ 150 = 1/25 gallon for each mile.")
    # --- RP.3 ratio reasoning: tables, unit ratios, conversions, graphs
    b.mc(C, "RP.3", "core", "A recipe uses 3 cups of flour for every 2 cups of sugar. How many cups of flour are needed for 10 cups of sugar?",
         "15", [("11", "added: sugar went up by 8, so added 8 to the flour"), ("30", "multiplied 3 × 10"),
                ("13", "added 3 to 10")],
         "Sugar goes from 2 to 10, which is 5 times as much, so flour is 3 × 5 = 15.")
    b.mc(C, "RP.3", "core", "Which table shows equivalent ratios of x to y?",
         "2:5, 4:10, 6:15", [("2:5, 4:9, 6:13", "added the same amount instead of multiplying"),
                             ("2:5, 3:6, 4:7", "added 1 to both numbers each time"),
                             ("2:5, 4:7, 6:9", "added 2 to y each time x went up by 2")],
         "Equivalent ratios come from multiplying both numbers by the same factor: 2:5 × 2 = 4:10 and × 3 = 6:15.")
    b.mc(C, "RP.3", "stretch", "A store sells 4 notebooks for $10. At this price, how much do 14 notebooks cost?",
         "$35", [("$20", "added: 10 more notebooks, so added $10"), ("$140", "multiplied 14 × 10"),
                 ("$56", "multiplied 14 × 4")],
         "Unit price is $10 ÷ 4 = $2.50 per notebook. Then 14 × $2.50 = $35.")
    b.mc(C, "RP.3", "core", "There are 3 feet in 1 yard. A rope is 7 yards long. How many feet long is the rope?",
         "21 feet", [("7/3 feet", "divided by 3 instead of multiplying"), ("10 feet", "added 3 to 7"),
                     ("4 feet", "subtracted 3 from 7")],
         "Each yard is 3 feet, so 7 yards is 7 × 3 = 21 feet.")
    b.mc(C, "RP.3", "stretch", "The ratio of cups of water to cups of rice is 2:1. Which ordered pair (water, rice) is on the graph of this ratio?",
         "(8, 4)", [("(4, 8)", "swapped water and rice"), ("(6, 9)", "used the ratio 2:3"), ("(5, 3)", "used a ratio that is not 2:1")],
         "Water is twice the rice. In (8, 4) the water, 8, is 2 times the rice, 4.")
    # --- RP.4 percents
    b.mc(C, "RP.4", "core", "What is 25% of 80?", "20",
         [("25", "used the percent as the answer"), ("320", "multiplied by 4 instead of dividing by 4"),
          ("55", "subtracted 25 from 80")],
         "25% is one fourth, so 80 ÷ 4 = 20.")
    b.num(C, "RP.4", "stretch", "What is 15% of 60?", "9", ["9.0"],
          "10% of 60 is 6 and 5% is half of that, 3. So 15% is 6 + 3 = 9.",
          wrongs=[("900", "multiplied 15 × 60"), ("0.9", "moved the decimal one place too far")])
    b.mc(C, "RP.4", "stretch", "Jamal saved 30% of his allowance. He saved $12. What is his allowance?", "$40",
         [("$3.60", "found 30% of 12 instead of the whole"), ("$42", "added 12 and 30"), ("$360", "multiplied 12 × 30")],
         "30% of the allowance is $12, so 10% is $4. The whole, 100%, is 10 × $4 = $40.")
    b.mc(C, "RP.4", "core", "A school has 400 students. 35% ride the bus. How many students ride the bus?", "140",
         [("35", "used the percent as the number of students"), ("14", "moved the decimal one place too far"),
          ("1,400", "multiplied by 35 without dividing by 100")],
         "35% means 35 per 100. 400 has four hundreds, so 4 × 35 = 140.")


def ns_divide_fractions(b):
    C = "NS-A"

    def wr(x, y):
        return [(fmt(x * y), "multiplied instead of dividing"), (fmt(y / x), "divided in the wrong order"),
                (fmt(abs(x - y)), "subtracted the fractions"), (fmt(x + y), "added the fractions")]

    def ctx(diff, prompt, x, y, expl, wrongs=None):
        b.mc(C, "NS.1", diff, prompt, fmt(x / y), wrongs or wr(x, y), expl)

    ctx("core", "How many 1/4-cup scoops fit in 3/4 cup of flour?", F(3, 4), F(1, 4),
        "Ask how many 1/4s are in 3/4: 3/4 ÷ 1/4 = 3.")
    ctx("core", "Lena has 2/3 of a pizza. She puts 1/6 of a pizza on each plate. How many plates can she fill?",
        F(2, 3), F(1, 6), "2/3 = 4/6, and 4/6 ÷ 1/6 = 4 plates.")
    ctx("stretch", "How many 1/3-yard pieces can be cut from 5/6 yard of ribbon? (A leftover part of a piece counts as part of a piece.)",
        F(5, 6), F(1, 3), "5/6 ÷ 1/3 = 5/6 × 3 = 15/6 = 5/2, which is 2 and a half pieces.")
    ctx("core", "A water jug holds 3/4 gallon. How many jugs can be filled from a 6-gallon tank?", F(6), F(3, 4),
        "6 ÷ 3/4 = 6 × 4/3 = 8 jugs.")
    ctx("stretch", "How many 2/3-pound bags can be filled from 8 pounds of rice?", F(8), F(2, 3),
        "8 ÷ 2/3 = 8 × 3/2 = 12 bags.")
    b.mc(C, "NS.1", "core", "What is 7/8 ÷ 1/4?", "7/2", [(fmt(F(7, 32)), "multiplied instead of dividing"),
                                                               ("2/7", "divided in the wrong order"), ("5/8", "subtracted the fractions")],
         "7/8 ÷ 1/4 = 7/8 × 4 = 28/8 = 7/2.")
    b.mc(C, "NS.1", "stretch", "What is 4/5 ÷ 2/3?", "6/5", [("8/15", "multiplied instead of dividing"),
                                                                   ("5/6", "divided in the wrong order"), ("2/3", "divided the numerators and kept the denominator")],
         "4/5 ÷ 2/3 = 4/5 × 3/2 = 12/10 = 6/5.")
    b.mc(C, "NS.1", "stretch", "What is 2/5 ÷ 4/5?", "1/2", [("8/25", "multiplied instead of dividing"),
                                                                   ("2", "divided in the wrong order"), ("6/5", "added the fractions")],
         "The fifths match, so it is 2 ÷ 4 = 1/2. Check: 4/5 × 1/2 = 2/5.")
    b.mc(C, "NS.1", "stretch", "What is 1 ÷ 3/5?", "5/3", [("3/5", "left the fraction as it was"),
                                                               ("8/5", "added instead of dividing"), ("2/5", "subtracted instead of dividing")],
         "1 ÷ 3/5 = 1 × 5/3 = 5/3. There is one and two thirds groups of 3/5 in 1.")
    b.mc(C, "NS.1", "stretch", "What is 9/10 ÷ 3/5?", "3/2", [("27/50", "multiplied instead of dividing"),
                                                                   ("2/3", "divided in the wrong order"), ("3/5", "subtracted the fractions")],
         "Use common denominators: 3/5 = 6/10, so 9/10 ÷ 6/10 = 9 ÷ 6 = 3/2.")
    b.mc(C, "NS.1", "stretch", "Which expression gives the number of 2/3-pound bags that can be filled from 6 pounds of rice?",
         "6 ÷ 2/3", [("6 × 2/3", "multiplied instead of dividing"), ("2/3 ÷ 6", "divided in the wrong order"),
                         ("6 − 2/3", "subtracted instead of dividing")],
         "Finding how many groups of 2/3 are in 6 is division: 6 ÷ 2/3.")
    b.mc(C, "NS.1", "core", "3/4 ÷ 1/8 asks how many eighths are in 3/4. What is the answer?", "6",
         [("3/32", "multiplied instead of dividing"), ("2/3", "divided in the wrong order"), ("3", "counted fourths instead of eighths")],
         "3/4 = 6/8, so there are 6 eighths in 3/4.")
    b.num(C, "NS.1", "core", "What is 5/6 ÷ 5/12?", "2", ["2.0"],
          "5/6 = 10/12, and 10/12 ÷ 5/12 = 10 ÷ 5 = 2.",
          wrongs=[("25/72", "multiplied instead of dividing"), ("1/2", "divided in the wrong order")])
    b.num(C, "NS.1", "stretch", "A batch of muffins uses 3/4 cup of sugar. How many batches can be made with 3 cups of sugar?", "4",
          ["4.0"], "3 ÷ 3/4 = 3 × 4/3 = 4 batches.",
          wrongs=[("9/4", "multiplied instead of dividing"), ("1/4", "divided in the wrong order")], unit="batches")
    b.mc(C, "NS.1", "challenge", "When 3/4 is divided by a certain fraction the answer is 6. What is the fraction?", "1/8",
         [("8", "gave the reciprocal of the answer"), ("9/2", "multiplied 3/4 by 6"), ("1/6", "used the answer's reciprocal")],
         "3/4 ÷ ? = 6 means 6 × ? = 3/4, so ? = 3/4 ÷ 6 = 3/24 = 1/8.")


def ns_fluency(b):
    C = "NS-B"
    # NS.2 long division
    b.mc(C, "NS.2", "core", "A baker packs 2,345 cookies into boxes of 12. How many full boxes are packed, and how many cookies are left over?",
         "195 boxes with 5 left over",
         [("196 boxes with 0 left over", "rounded up and ignored the remainder"),
          ("195 boxes with 12 left over", "gave a remainder as large as the divisor"),
          ("5 boxes with 195 left over", "swapped the quotient and the remainder")],
         "2,345 ÷ 12 = 195 remainder 5, because 12 × 195 = 2,340 and 2,345 − 2,340 = 5.")
    b.num(C, "NS.2", "core", "What is 4,536 ÷ 18?", "252", [],
          "18 × 252 = 4,536. Long division: 45 ÷ 18 = 2 r 9, bring down 3, 93 ÷ 18 = 5 r 3, bring down 6, 36 ÷ 18 = 2.",
          wrongs=[("25.2", "put the decimal point in the wrong place"), ("2,520", "added a zero")])
    b.mc(C, "NS.2", "stretch", "A trip is 1,150 miles. A bus travels 46 miles each hour. How many hours does the trip take?", "25 hours",
         [("250 hours", "put an extra zero in the quotient"), ("24 hours", "stopped one step early"), ("1,104 hours", "subtracted 46 instead of dividing")],
         "1,150 ÷ 46 = 25, because 46 × 25 = 1,150.")
    # NS.3 decimals
    b.mc(C, "NS.3", "core", "What is 12.4 + 3.75?", dec(F(124, 10) + F(375, 100)),
         [("15.79", "did not line up the decimal points (treated 12.4 as 12.04)"), ("16.5", "rounded 3.75 up before adding"),
          ("161.5", "ignored the decimal point")],
         "Line up the decimal points: 12.40 + 3.75 = 16.15.")
    b.mc(C, "NS.3", "core", "What is 20.5 − 7.84?", dec(F(205, 10) - F(784, 100)),
         [("13.66", "made a regrouping error in the hundredths"), ("12.34", "subtracted the smaller digit from the larger in each column"),
          ("28.34", "added instead of subtracting")],
         "Line up the decimal points: 20.50 − 7.84 = 12.66.")
    b.mc(C, "NS.3", "stretch", "What is 3.2 × 1.5?", dec(F(32, 10) * F(15, 10)),
         [("48", "multiplied and forgot the decimal point"), ("0.48", "put the decimal point in two places too many"),
          ("4.7", "added instead of multiplying")],
         "32 × 15 = 480. There is one decimal place in each factor, so two in the product: 4.80 = 4.8.")
    b.mc(C, "NS.3", "stretch", "What is 7.2 ÷ 0.4?", dec(F(72, 10) / F(4, 10)),
         [("1.8", "moved the decimal point the wrong way"), ("180", "moved the decimal point too far"), ("6.8", "subtracted instead of dividing")],
         "Multiply both numbers by 10: 72 ÷ 4 = 18.")
    b.num(C, "NS.3", "stretch", "Tia buys 3 notebooks that cost $2.35 each and a pen that costs $1.40. How much does she spend in all?",
          money(3 * F(235, 100) + F(140, 100)), ["8.45", "$8.45"],
          "3 × $2.35 = $7.05. Then $7.05 + $1.40 = $8.45.",
          wrongs=[("$3.75", "added the prices without multiplying by 3"), ("$8.35", "made an addition error")])
    # NS.4 factors and multiples
    b.mc(C, "NS.4", "core", "What is the prime factorization of 84?", "2² × 3 × 7",
         [("2 × 6 × 7", "used 6, which is not prime"), ("2 × 3 × 14", "used 14, which is not prime"),
          ("4 × 3 × 7", "used 4, which is not prime")],
         "84 = 2 × 42 = 2 × 2 × 21 = 2 × 2 × 3 × 7 = 2² × 3 × 7.")
    b.mc(C, "NS.4", "core", "What is the prime factorization of 60?", "2² × 3 × 5",
         [("2 × 3 × 10", "used 10, which is not prime"), ("6 × 10", "stopped at composite factors"),
          ("2 × 2 × 15", "used 15, which is not prime")],
         "60 = 2 × 30 = 2 × 2 × 15 = 2 × 2 × 3 × 5.")
    b.mc(C, "NS.4", "core", "What is the greatest common factor (GCF) of 36 and 48?", "12",
         [("6", "found a common factor but not the greatest"), ("144", "found the least common multiple"), ("24", "found a factor of 48 that does not divide 36")],
         "Factors of 36 include 1, 2, 3, 4, 6, 9, 12, 18, 36. Factors of 48 include 12 and 24. The largest in both lists is 12.")
    b.mc(C, "NS.4", "stretch", "What is the greatest common factor (GCF) of 54 and 72?", "18",
         [("9", "found a common factor but not the greatest"), ("216", "found the least common multiple"), ("6", "found a smaller common factor")],
         "54 = 2 × 3³ and 72 = 2³ × 3². Shared: 2 × 3² = 18.")
    b.mc(C, "NS.4", "stretch", "Use the greatest common factor and the distributive property to rewrite 28 + 42.", "14(2 + 3)",
         [("7(4 + 6)", "used a common factor that is not the greatest"), ("14(2 + 4)", "factored 14 out but got a different sum"),
          ("2(14 + 21)", "used a common factor that is not the greatest")],
         "The GCF of 28 and 42 is 14. 28 + 42 = 14 × 2 + 14 × 3 = 14(2 + 3).")
    b.mc(C, "NS.4", "stretch", "What is 1/4 + 1/6? (Use the least common multiple of the denominators.)", "5/12",
         [("2/10", "added the numerators and the denominators"), ("1/5", "added across and simplified"), ("2/24", "used the product of the denominators and added the numerators")],
         "The LCM of 4 and 6 is 12. 1/4 = 3/12 and 1/6 = 2/12, so the sum is 5/12.")
    b.mc(C, "NS.4", "stretch", "What is 2/3 − 1/4? (Use the least common multiple of the denominators.)", "5/12",
         [("1/6", "multiplied the fractions"), (MINUS + "1", "subtracted the numerators and the denominators"), ("11/12", "added instead of subtracting")],
         "The LCM of 3 and 4 is 12. 2/3 = 8/12 and 1/4 = 3/12, so the difference is 5/12.")


def ns_rational(b):
    C = "NS-C"
    # NS.5 opposite quantities, absolute value
    b.mc(C, "NS.5", "core", "Which number best represents taking $40 out of a bank account?", MINUS + "40",
         [("40", "used a positive number for a decrease"), ("0", "treated the withdrawal as no change"), (MINUS + "4", "dropped a digit")],
         "A withdrawal decreases the balance, so it is represented by a negative number: " + MINUS + "40.")
    b.mc(C, "NS.5", "core", "A submarine is at " + MINUS + "120 feet. What does |" + MINUS + "120| = 120 tell you?",
         "The submarine is 120 feet away from sea level.",
         [("The submarine is 120 feet above sea level.", "read absolute value as a positive direction"),
          ("The submarine is at " + MINUS + "120 feet away from sea level.", "kept the negative sign on a distance"),
          ("Sea level is at 120 feet.", "confused sea level with the submarine's position")],
         "Absolute value is distance from 0. The submarine is 120 feet from sea level (below it).")
    b.mc(C, "NS.5", "stretch", "Which statement about " + MINUS + "8 and " + MINUS + "3 is true?",
         MINUS + "8 is less than " + MINUS + "3, and " + MINUS + "8 is farther from 0.",
         [(MINUS + "8 is greater than " + MINUS + "3 because 8 is greater than 3.", "ignored the negative signs when ordering"),
          (MINUS + "8 is less than " + MINUS + "3 because it is closer to 0.", "confused order with distance from 0"),
          (MINUS + "8 and " + MINUS + "3 are the same distance from 0.", "ignored the size of the numbers")],
         MINUS + "8 is to the left of " + MINUS + "3, so it is less. Its distance from 0, 8, is greater than 3.")
    # NS.6 number line and coordinate plane
    b.mc(C, "NS.6", "core", "What is the opposite of the opposite of " + MINUS + "6?", MINUS + "6",
         [("6", "stopped after one opposite"), ("0", "thought opposites cancel the number"), (MINUS + "12", "doubled the number")],
         "The opposite of " + MINUS + "6 is 6, and the opposite of 6 is " + MINUS + "6.")
    b.mc(C, "NS.6", "core", "In which quadrant is the point (" + MINUS + "4, 3)?", "Quadrant II",
         [("Quadrant I", "ignored the negative x-coordinate"), ("Quadrant III", "treated both coordinates as negative"),
          ("Quadrant IV", "mixed up which coordinate is negative")],
         "A negative x moves left and a positive y moves up. Up and left is Quadrant II.")
    b.mc(C, "NS.6", "stretch", "Point A is at (5, " + MINUS + "2). Point B is the reflection of A across the y-axis. What are the coordinates of B?",
         "(" + MINUS + "5, " + MINUS + "2)", [("(5, 2)", "reflected across the x-axis"), ("(" + MINUS + "5, 2)", "reflected across both axes"),
                                             ("(" + MINUS + "2, 5)", "swapped the coordinates")],
         "Reflecting across the y-axis changes the sign of x only: (5, " + MINUS + "2) becomes (" + MINUS + "5, " + MINUS + "2).")
    # NS.7 ordering
    b.mc(C, "NS.7", "core", "Which list is in order from least to greatest?", MINUS + "5, " + MINUS + "2, 0, 3",
         [("3, 0, " + MINUS + "2, " + MINUS + "5", "listed from greatest to least"), (MINUS + "2, " + MINUS + "5, 0, 3", "ordered negatives by size ignoring the sign"),
          ("0, " + MINUS + "2, " + MINUS + "5, 3", "placed 0 before the negatives")],
         "On a number line, numbers farther left are less: " + MINUS + "5, " + MINUS + "2, 0, 3.")
    b.mc(C, "NS.7", "stretch", "Which inequality is true?", MINUS + "3.5 < " + MINUS + "3.2",
         [(MINUS + "3.5 > " + MINUS + "3.2", "ordered negatives by absolute value"), (MINUS + "0.8 < " + MINUS + "1.5", "thought the smaller absolute value is less"),
          (MINUS + "7 > " + MINUS + "2", "ordered negatives by absolute value")],
         MINUS + "3.5 is left of " + MINUS + "3.2 on the number line, so " + MINUS + "3.5 < " + MINUS + "3.2.")
    # NS.8 distance on the coordinate plane
    b.mc(C, "NS.8", "stretch", "What is the distance between (3, " + MINUS + "2) and (3, 5)?", "7",
         [("3", "subtracted 5 − 2 instead of adding the distances from 0"), ("10", "added 3 + 2 + 5"), (MINUS + "7", "gave a negative distance")],
         "The x-coordinates match, so find the distance between y-values: |" + MINUS + "2| + |5| = 2 + 5 = 7.")
    b.mc(C, "NS.8", "stretch", "What is the distance between (" + MINUS + "6, 4) and (2, 4)?", "8",
         [("4", "subtracted 6 − 2"), ("12", "added 6 + 2 + 4"), (MINUS + "8", "gave a negative distance")],
         "The y-coordinates match, so find the distance between x-values: |" + MINUS + "6| + |2| = 6 + 2 = 8.")
    # NS.9 integer addition and subtraction
    b.mc(C, "NS.9", "core", "What is " + MINUS + "7 + 12?", "5", [(MINUS + "5", "gave the sum the sign of the first number"), ("19", "added the absolute values"),
                                                                    (MINUS + "19", "added the absolute values and kept a negative sign")],
         "Start at " + MINUS + "7 and move 12 right on the number line: 5.")
    b.mc(C, "NS.9", "core", "What is " + MINUS + "9 + (" + MINUS + "6)?", MINUS + "15",
         [("15", "dropped the negative sign"), (MINUS + "3", "subtracted the absolute values"), ("3", "subtracted and dropped the sign")],
         "Two negatives combine: 9 + 6 = 15, and the sum is negative, " + MINUS + "15.")
    b.mc(C, "NS.9", "stretch", "What is 4 − 11?", MINUS + "7", [("7", "subtracted the smaller from the larger and dropped the sign"),
                                                                 (MINUS + "15", "added the numbers"), ("15", "added and dropped the sign")],
         "4 − 11 = 4 + (" + MINUS + "11) = " + MINUS + "7.")
    b.mc(C, "NS.9", "stretch", "What is " + MINUS + "5 − (" + MINUS + "8)?", "3", [(MINUS + "13", "added the numbers' absolute values with a negative sign"),
                                                                                    ("13", "added the absolute values"), (MINUS + "3", "got the sign wrong")],
         "Subtracting " + MINUS + "8 is the same as adding 8: " + MINUS + "5 + 8 = 3.")
    b.mc(C, "NS.9", "core", "The temperature is " + MINUS + "6° and rises 6°. What is the new temperature?", "0°",
         [(MINUS + "12°", "added the amounts and kept the negative sign"), ("12°", "added the absolute values"), ("6°", "ignored the starting temperature")],
         MINUS + "6 and 6 are opposites that make a zero pair: " + MINUS + "6 + 6 = 0.")
