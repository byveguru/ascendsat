"""Math 6 items, part C: Geometry (G) and Statistics (SP). All data sets are written out in the prompt
(text-only; no images), and every statistic is computed from the data in code."""
from fractions import Fraction as F
from statistics import median
from gen_common import fmt, dec, MINUS

M = MINUS


def geometry(b):
    C = "G"
    # G.1 area by decomposing / composing
    b.mc(C, "G.1", "core", "A triangle has a base of 10 cm and a height of 6 cm. What is its area?", "30 cm²",
         [("60 cm²", "forgot to take half"), ("16 cm²", "added the base and the height"), ("15 cm²", "took half twice")],
         "A triangle is half of a rectangle with the same base and height: ½ × 10 × 6 = 30.")
    b.mc(C, "G.1", "core", "A right triangle has legs of 8 m and 5 m. What is its area?", "20 m²",
         [("40 m²", "forgot to take half"), ("13 m²", "added the legs"), ("10 m²", "took half twice")],
         "The legs are the base and the height: ½ × 8 × 5 = 20.")
    b.mc(C, "G.1", "stretch", "A triangle has an area of 24 square inches and a base of 8 inches. What is its height?", "6 inches",
         [("3 inches", "divided the area by the base and forgot the half"), ("12 inches", "halved the area only"), ("192 inches", "multiplied the area by the base")],
         "A = ½bh, so 24 = ½ × 8 × h = 4h, and h = 6.")
    b.mc(C, "G.1", "core", "A parallelogram has a base of 9 ft and a height of 4 ft. What is its area?", "36 ft²",
         [("18 ft²", "took half, like a triangle"), ("13 ft²", "added the base and the height"), ("26 ft²", "found the perimeter-style sum 2(9 + 4)")],
         "A parallelogram can be cut and rearranged into a rectangle: 9 × 4 = 36.")
    b.mc(C, "G.1", "stretch", "An L-shaped figure is made of two rectangles that do not overlap. One is 8 by 3 and the other is 4 by 2. What is the total area?",
         "32 square units", [("16 square units", "subtracted the second area from the first"), ("11 square units", "added the first rectangle's sides"),
                              ("96 square units", "multiplied all the numbers")],
         "Find each area and add: 8 × 3 = 24 and 4 × 2 = 8, so 24 + 8 = 32.")
    b.mc(C, "G.1", "stretch", "A trapezoid is split into a 6-by-4 rectangle and a right triangle with base 3 and height 4. What is the area of the trapezoid?",
         "30 square units", [("36 square units", "forgot to take half of the triangle"), ("27 square units", "added only the triangle's base"),
                              ("17 square units", "added all the side lengths instead of finding areas")],
         "Rectangle: 6 × 4 = 24. Triangle: ½ × 3 × 4 = 6. Total: 24 + 6 = 30.")
    b.mc(C, "G.1", "stretch", "A kite has diagonals of 12 and 8. Cutting it along a diagonal makes two triangles. What is the area of the kite?",
         "48 square units", [("96 square units", "forgot to take half"), ("20 square units", "added the diagonals"), ("24 square units", "took half twice")],
         "The diagonals split the kite into four right triangles that fit in a 12-by-8 rectangle, half of it: ½ × 12 × 8 = 48.")
    # G.2 volume with fractional edge lengths
    b.mc(C, "G.2", "stretch", "A rectangular prism is 3/2 ft long, 1/2 ft wide and 4 ft tall. What is its volume?", "3 cubic feet",
         [("6 cubic feet", "added the three edge lengths instead of multiplying"), ("2 cubic feet", "forgot the length and multiplied only the width and the height"),
          ("3/4 cubic feet", "multiplied only the length and the width")],
         "V = l × w × h = 3/2 × 1/2 × 4 = 12/4 = 3.")
    b.mc(C, "G.2", "stretch", "A fish tank is 3/4 m long, 1/2 m wide and 2/3 m tall. What is its volume?", "1/4 cubic meter",
         [("23/12 cubic meters", "added the edge lengths"), ("1/3 cubic meter", "made an error multiplying the fractions"), ("1/2 cubic meter", "made an error multiplying the fractions")],
         "3/4 × 1/2 = 3/8, and 3/8 × 2/3 = 6/24 = 1/4.")
    b.mc(C, "G.2", "challenge", "A box is 5/2 in long, 2 in wide and 1 in tall. It is filled with cubes that are 1/2 inch on each edge. How many cubes fill it?", "40",
         [("5", "found the volume in cubic inches and stopped"), ("11", "divided each edge by 1/2 and added the results"), ("20", "used only two edges")],
         "Each side of the box holds: 5/2 ÷ 1/2 = 5, 2 ÷ 1/2 = 4, 1 ÷ 1/2 = 2 cubes. 5 × 4 × 2 = 40.")
    # G.3 coordinate plane
    b.mc(C, "G.3", "stretch", "A rectangle has vertices (1, 2), (8, 2), (8, 5) and (1, 5). What is its perimeter?", "20 units",
         [("21 units", "found the area instead of the perimeter"), ("10 units", "added only one length and one width"), ("12 units", "doubled one width and added the length")],
         "The sides are |8 − 1| = 7 and |5 − 2| = 3. Perimeter = 2(7 + 3) = 20.")
    b.mc(C, "G.3", "stretch", "A side of a polygon joins (" + M + "3, 4) and (" + M + "3, " + M + "2). How long is the side?", "6 units",
         [("2 units", "subtracted 4 − 2"), (M + "6 units", "gave a negative length"), ("10 units", "added 4, 2 and 4")],
         "The x-coordinates match, so find the distance between 4 and " + M + "2: 4 + 2 = 6.")
    # G.4 nets and surface area
    b.mc(C, "G.4", "core", "A net of a cube is made of 6 squares, each 4 cm by 4 cm. What is the surface area of the cube?", "96 cm²",
         [("64 cm²", "found the volume instead of the surface area"), ("16 cm²", "found the area of one face"), ("24 cm²", "multiplied 6 × 4")],
         "Each face has area 4 × 4 = 16. There are 6 faces: 6 × 16 = 96.")
    b.mc(C, "G.4", "stretch", "A rectangular prism is 5 cm long, 3 cm wide and 2 cm tall. What is its surface area?", "62 cm²",
         [("30 cm²", "found the volume instead of the surface area"), ("31 cm²", "added each different face once"), ("20 cm²", "added the edges and doubled")],
         "Faces: 2(5 × 3) + 2(5 × 2) + 2(3 × 2) = 30 + 20 + 12 = 62.")
    b.mc(C, "G.4", "challenge", "A square pyramid has a base 6 cm on each side. Each of its 4 triangular faces has a base of 6 cm and a height of 4 cm. What is the surface area?", "84 cm²",
         [("48 cm²", "added only the four triangles"), ("60 cm²", "added the base and only two triangles"), ("132 cm²", "forgot to take half of each triangle")],
         "Base: 6 × 6 = 36. Each triangle: ½ × 6 × 4 = 12, and 4 × 12 = 48. Total: 36 + 48 = 84.")


def sp_variability(b):
    C = "SP-A"
    # SP.1 statistical questions
    b.mc(C, "SP.1", "core", "Which question is a statistical question?", "How many hours of sleep do students at our school get on a school night?",
         [("How old is our principal?", "has one answer, so no variability"), ("What is the capital of North Carolina?", "has one answer, so no variability"),
          ("How many students are in my class today?", "is a single count, so no variability")],
         "A statistical question expects different answers from different people.")
    b.mc(C, "SP.1", "core", "Which question is NOT a statistical question?", "How tall is the Washington Monument?",
         [("How tall are the students in 6th grade?", "answers will vary from student to student"), ("How long do students take to get to school?", "answers will vary"),
          ("How many pets do the families on my street have?", "answers will vary")],
         "The monument has one height. The other questions expect varying answers.")
    b.mc(C, "SP.1", "core", "Why is “What is the favorite sport of the students in 6th grade?” a statistical question?", "Because the answers will vary from student to student",
         [("Because it has exactly one correct answer", "described a non-statistical question"), ("Because the answer must be a number", "confused statistical questions with numerical data"),
          ("Because it asks about only one person", "described a non-statistical question")],
         "Different students will give different answers, so the data have variability.")
    b.mc(C, "SP.1", "core", "Which question would produce data that vary?", "How many text messages do 6th graders send each day?",
         [("How many days are in a week?", "always the same answer"), ("What is 8 × 7?", "always the same answer"), ("How many sides does a hexagon have?", "always the same answer")],
         "Different 6th graders send different numbers of messages, so the answers vary.")
    # SP.2 distributions
    b.mc(C, "SP.2", "core", "Which three features can describe a distribution of data?", "Center, spread and shape",
         [("Sum, product and quotient", "listed operations, not features"), ("Title, label and scale", "listed parts of a graph"), ("Color, size and position", "listed things unrelated to data")],
         "A distribution is described by where it is centered, how spread out it is, and its overall shape.")
    b.mc(C, "SP.2", "stretch", "A dot plot of test scores has most dots near 80, with a few dots at 60 and a few at 100. Which description fits?",
         "Roughly symmetric and centered near 80",
         [("Skewed right with its center near 100", "put the center at the largest value"), ("Skewed left with its center near 60", "put the center at the smallest value"),
          ("Uniform with no center", "ignored that most dots are near 80")],
         "The dots pile up in the middle and thin out evenly on both sides.")
    b.mc(C, "SP.2", "stretch", "Two classes both have a mean quiz score of 80. Class A scores range from 78 to 82. Class B scores range from 50 to 100. Which is true?",
         "Class B has more spread.",
         [("Class A has more spread.", "reversed which data are more spread out"), ("They have the same spread because the means are equal.", "confused center with spread"),
          ("Class B has a smaller center.", "ignored that both means are 80")],
         "Class B's scores cover a much wider range, so its spread is greater.")
    # SP.3 center and variability, computed from data
    d1 = [3, 6, 6, 9, 11]
    mean1 = F(sum(d1), len(d1))
    b.mc(C, "SP.3", "core", f"What is the mean of the data set {', '.join(map(str, d1))}?", fmt(mean1),
         [(str(int(median(d1))), "gave the median (or mode) instead of the mean"), (str(sum(d1)), "gave the sum without dividing"),
          (str(max(d1) - min(d1)), "gave the range instead of the mean")],
         f"Add the values and divide by how many there are: {sum(d1)} ÷ {len(d1)} = {fmt(mean1)}.")
    d2 = [14, 3, 20, 8, 5]
    s2 = sorted(d2)
    b.mc(C, "SP.3", "core", f"What is the median of the data set {', '.join(map(str, d2))}?", str(int(median(d2))),
         [(str(d2[len(d2) // 2]), "picked the middle value without putting the data in order"), (fmt(F(sum(d2), len(d2))), "gave the mean instead of the median"),
          (str(max(d2) - min(d2)), "gave the range instead of the median")],
         f"Order the data: {', '.join(map(str, s2))}. The middle value is {int(median(d2))}.")
    d3 = [1, 3, 5, 11]
    b.mc(C, "SP.3", "stretch", f"What is the median of the data set {', '.join(map(str, d3))}?", fmt(F(median(d3)).limit_denominator()),
         [(fmt(F(sum(d3), len(d3))), "gave the mean instead of the median"), ("6", "averaged the least and greatest values"),
          ("3", "picked one of the middle values")],
         "With an even number of values, the median is halfway between the two middle values: (3 + 5) ÷ 2 = 4.")
    b.mc(C, "SP.3", "stretch", "For the data 5, 6, 6, 7, 6, 40, which measure of center is affected most by the value 40?", "The mean",
         [("The median", "median depends on position, not size, of extreme values"), ("The mode", "the most common value does not change"),
          ("All three are affected equally", "thought extreme values affect every measure the same")],
         "The mean uses every value's size, so a very large value pulls it up. The median and the mode barely change.")
    d4 = [3, 5, 6, 10]
    b.mc(C, "SP.3", "core", f"Four friends have {', '.join(map(str, d4[:-1]))} and {d4[-1]} stickers. If they share all the stickers equally, how many does each get?", fmt(F(sum(d4), len(d4))),
         [(fmt(F(median(d4)).limit_denominator()), "gave the median instead of the fair share"), (str(sum(d4)), "gave the total"), (str(len(d4)), "gave the number of friends")],
         f"A mean is a fair share: ({' + '.join(map(str, d4))}) ÷ {len(d4)} = {sum(d4)} ÷ {len(d4)} = {fmt(F(sum(d4), len(d4)))}.")
    b.mc(C, "SP.3", "core", "Which statement best describes the mean of a data set?", "A balance point, or the fair share, of the data",
         [("The most common value", "described the mode"), ("The middle value of the ordered data", "described the median"), ("The difference between the greatest and least values", "described the range")],
         "The mean is what each value would be if the total were shared equally.")
    b.mc(C, "SP.3", "core", "Which statement best describes the median of a data set?", "The middle value when the data are in order",
         [("The sum of the values divided by how many there are", "described the mean"), ("The value that appears most often", "described the mode"), ("The difference between the greatest and least values", "described the range")],
         "Put the data in order. The median is the value in the middle.")
    b.mc(C, "SP.3", "stretch", "Two data sets both have a median of 50. Set 1 is 48, 49, 50, 51, 52. Set 2 is 20, 35, 50, 65, 80. Which has greater variability?", "Set 2",
         [("Set 1", "reversed which set is more spread out"), ("Neither, because the medians are equal", "confused center with spread"), ("They have the same spread", "ignored the different ranges of values")],
         "Set 2's values range from 20 to 80, while Set 1's range from 48 to 52. Set 2 is much more spread out.")


def sp_distributions(b):
    C = "SP-B"
    # SP.4 displaying data
    b.mc(C, "SP.4", "core", "Quiz scores are 6, 7, 7, 8, 8, 8, 9, 10. On a dot plot, how many dots are above the number 8?", "3",
         [("8", "used the score instead of the count"), ("2", "counted the 7s"), ("1", "counted only one dot")],
         "Each score gets one dot. The score 8 appears 3 times, so there are 3 dots above 8.")
    b.mc(C, "SP.4", "core", "Which display uses bars to show how many values fall within equal-sized intervals?", "A histogram",
         [("A dot plot", "shows individual values, not intervals"), ("A box plot", "shows a five-number summary, not counts"), ("A table of ordered pairs", "is not a data display of counts in intervals")],
         "A histogram groups data into intervals and shows each count as a bar.")
    d = [2, 4, 5, 7, 9, 11, 12]
    lo, hi = d[:3], d[4:]
    five = (min(d), int(median(lo)), int(median(d)), int(median(hi)), max(d))
    b.mc(C, "SP.4", "stretch", f"What is the five-number summary (minimum, first quartile, median, third quartile, maximum) of {', '.join(map(str, d))}?",
         ", ".join(map(str, five)),
         [("2, 5, 7, 9, 12", "used the 3rd and 5th values as the quartiles"), ("2, 4, 7, 9, 12", "used the wrong third quartile"), ("2, 5, 7, 11, 12", "used the wrong first quartile")],
         f"The median is {five[2]}. The lower half {', '.join(map(str, lo))} has median {five[1]}; the upper half {', '.join(map(str, hi))} has median {five[3]}.")
    b.mc(C, "SP.4", "core", "Which display shows each individual data value?", "A dot plot",
         [("A histogram", "groups values into intervals"), ("A box plot", "shows only a five-number summary"), ("None of these", "overlooked the dot plot")],
         "A dot plot puts one dot for every value, so every value can be seen.")
    b.mc(C, "SP.4", "stretch", "In a box plot, about what fraction of the data lies between the first quartile and the third quartile?", "About one half",
         [("About one fourth", "described the data between the median and one quartile"), ("About three fourths", "described the data below the third quartile"), ("All of the data", "described min to max")],
         "The quartiles split the data into four parts with about the same number of values. The middle two parts, the box, hold about half.")
    counts = [3, 8, 5]
    b.mc(C, "SP.4", "core", "A histogram has bars for 0–4 (3 students), 5–9 (8 students) and 10–14 (5 students). How many students are represented in all?", str(sum(counts)),
         [(str(max(counts)), "gave the tallest bar only"), (str(len(counts) * counts[-1]), "multiplied the number of bars by the last bar"), (str(counts[0]), "gave the first bar only")],
         f"Add the bars: {' + '.join(map(str, counts))} = {sum(counts)}.")
    # SP.5 summarizing in context
    b.mc(C, "SP.5", "core", "A dot plot has 4 dots above 2, 6 dots above 3 and 5 dots above 4. How many observations were collected?", str(4 + 6 + 5),
         [("9", "added the values 2, 3 and 4"), ("3", "counted the different values"), ("20", "multiplied 4 × 5")],
         "Each dot is one observation: 4 + 6 + 5 = 15.")
    b.mc(C, "SP.5", "stretch", "House prices on one street are $120,000, $130,000, $125,000, $135,000 and $1,200,000. Which measure best describes a typical price?",
         "The median, because the one very high price pulls the mean up",
         [("The mean, because it uses every value", "ignored the effect of the extreme value"), ("The mode, because every value appears once", "misused the mode"),
          ("The range, because it shows the biggest gap", "the range is not a measure of center")],
         "The median is $130,000. The mean is pulled far up by $1,200,000, so it is not typical.")
    b.mc(C, "SP.5", "stretch", "A data set is symmetric with no extreme values. Which measure is a good choice for its center?", "Either the mean or the median",
         [("Only the mode", "ruled out the mean and median"), ("Only the range", "the range is not a measure of center"), ("Neither the mean nor the median", "ruled out both")],
         "For a symmetric distribution without extreme values, the mean and the median are about the same.")
    r = [10, 15, 20, 20, 25, 25, 30, 35, 40, 60]
    ctx = "Ten students recorded how many minutes they read last night: " + ", ".join(map(str, r)) + "."
    b.num(C, "SP.5", "core", ctx + " What is the mean number of minutes?", str(sum(r) // len(r)), [str(sum(r) // len(r)) + ".0"],
          f"The total is {sum(r)} minutes. {sum(r)} ÷ {len(r)} = {sum(r) // len(r)}.",
          wrongs=[(str(sum(r)), "gave the total without dividing"), (str(int(median(r))), "gave the median instead of the mean")], unit="minutes")
    b.mc(C, "SP.5", "core", ctx + " What is the median number of minutes?", str(int(median(r))),
         [(str(sum(r) // len(r)), "gave the mean instead of the median"), (str(max(r) - min(r)), "gave the range instead of the median"), (dec(F(r[3] + r[4], 2)), "averaged the wrong pair of values")],
         f"The data are in order. The two middle values are {r[4]} and {r[5]}, and the number halfway between them is {int(median(r))}.")
    b.mc(C, "SP.5", "core", ctx + " What is the range?", str(max(r) - min(r)),
         [(str(max(r)), "gave the greatest value"), (str(int(median(r))), "gave the median instead of the range"), (str(min(r)), "gave the least value")],
         f"Range = greatest − least = {max(r)} − {min(r)} = {max(r) - min(r)}.")
    b.mc(C, "SP.5", "stretch", f"The reading data (in minutes) have a least value of {min(r)}, a greatest value of {max(r)} and a median of {int(median(r))}. Which statement best summarizes them?",
         f"The median reading time was {int(median(r))} minutes, and times ranged from {min(r)} to {max(r)} minutes.",
         [(f"Every student read {int(median(r))} minutes.", "treated the median as the value for every student"), (f"The range of reading times was {int(median(r))} minutes.", "mixed up the range and the median"),
          ("There were 10 observations, so the mean was 10 minutes.", "treated the number of observations as the mean")],
         "A good summary names the center (the median), the spread (the range) and the unit (minutes).")
    b.mc(C, "SP.5", "stretch", "A histogram is skewed right, with a few very large values. Which measure best describes the center?", "The median",
         [("The mean", "ignored the pull of the large values"), ("The range", "the range is not a measure of center"), ("The maximum", "the maximum is not a measure of center")],
         "For a skewed distribution, the median is not pulled by the extreme values the way the mean is.")
    b.mc(C, "SP.5", "stretch", "In the data set 1, 1, 2, 2, 2, 3, 3, 8, which value is a striking deviation (an outlier)?", "8",
         [("1", "chose the least value"), ("2", "chose the most common value"), ("3", "chose a value near the others")],
         "8 is far from all of the other values, which are between 1 and 3.")
