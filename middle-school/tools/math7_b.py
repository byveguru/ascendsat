"""Math 7 items, part B: Geometry (scale drawings and triangles; angles, circles, area/volume) and sampling."""
from fractions import Fraction as F
from gen_common import fmt, dec, MINUS

M = MINUS


def g_scale_triangles(b):
    C = "G-A"
    # G.1 scale drawings
    b.mc(C, "G.1", "core", "In a scale drawing, 1 cm represents 5 m. A room is 4 cm long in the drawing. How long is the actual room?", "20 m",
         [("0.8 m", "divided 4 by 5"), ("9 m", "added 4 and 5"), ("1.25 m", "divided 5 by 4")],
         "Each centimeter is 5 m, so 4 cm is 4 × 5 = 20 m.")
    b.mc(C, "G.1", "core", "A scale drawing uses 1 inch for every 8 feet. A hallway is 56 feet long. How long is the hallway in the drawing?", "7 inches",
         [("448 inches", "multiplied by 8 instead of dividing"), ("64 inches", "added 8 to 56"), ("48 inches", "subtracted 8 from 56")],
         "56 ÷ 8 = 7, so the hallway is 7 inches long in the drawing.")
    b.mc(C, "G.1", "core", "A 3-by-5 rectangle is enlarged using a scale factor of 4. What are the new dimensions?", "12 by 20",
         [("7 by 9", "added 4 to each side"), ("12 by 5", "scaled only one side"), ("3/4 by 5/4", "divided by the scale factor")],
         "Multiply each side by 4: 3 × 4 = 12 and 5 × 4 = 20.")
    b.mc(C, "G.1", "stretch", "A shape with an area of 10 cm² is enlarged using a scale factor of 3. What is the area of the enlarged shape?", "90 cm²",
         [("30 cm²", "multiplied the area by the scale factor instead of its square"), ("13 cm²", "added 3 to the area"), ("270 cm²", "multiplied the area by the scale factor cubed")],
         "Lengths are multiplied by 3, so area is multiplied by 3² = 9: 10 × 9 = 90.")
    b.mc(C, "G.1", "stretch", "A triangle has angles of 30°, 60° and 90°. It is enlarged using a scale factor of 2. What are the angles of the new triangle?", "30°, 60°, 90°",
         [("60°, 120°, 180°", "multiplied the angles by the scale factor"), ("60°, 90°, 120°", "added 30 to each angle"), ("15°, 30°, 45°", "divided the angles by the scale factor")],
         "In a scale drawing, angle measures stay the same. Only the side lengths change.")
    b.mc(C, "G.1", "stretch", "On a map, 2 cm represents 25 km. Two cities are 7 cm apart on the map. How far apart are they?", "87.5 km",
         [("175 km", "used 25 km per centimeter instead of 12.5"), ("14 km", "multiplied 7 by 2"), ("0.56 km", "inverted the scale")],
         "2 cm is 25 km, so 1 cm is 12.5 km. Then 7 × 12.5 = 87.5.")
    b.mc(C, "G.1", "challenge", "A drawing of a rectangular garden is 6 cm by 4 cm. The scale is 1 cm : 2 m. What is the actual area of the garden?", "96 m²",
         [("24 m²", "used the area of the drawing without converting"), ("48 m²", "multiplied the area by the scale factor instead of its square"), ("192 m²", "multiplied the area by the scale factor cubed")],
         "Actual sides: 6 × 2 = 12 m and 4 × 2 = 8 m. Area: 12 × 8 = 96 m².")
    b.num(C, "G.1", "stretch", "A model car is built at a scale of 1 : 24. The real car is 4.8 m long. How long is the model, in centimeters?", "20", [],
          "4.8 m = 480 cm. Then 480 ÷ 24 = 20 cm.",
          wrongs=[("0.2", "forgot to convert meters to centimeters"), ("115.2", "multiplied by 24 instead of dividing")], unit="cm")
    b.mc(C, "G.1", "core", "Which statement is true about a scale drawing of a figure?", "Angle measures stay the same and side lengths are proportional.",
         [("Angle measures are multiplied by the scale factor.", "applied the scale factor to angles"), ("Side lengths stay the same.", "thought sides do not scale"),
          ("Areas are multiplied by the scale factor.", "forgot that area scales by the square of the scale factor")],
         "A scale drawing keeps angles and multiplies every length by the scale factor.")
    # G.2 triangle conditions
    b.mc(C, "G.2", "core", "Can a triangle have side lengths of 3, 4 and 8?", "No, because 3 + 4 is less than 8",
         [("Yes, because all three lengths are positive numbers", "ignored the triangle inequality"), ("Yes, because 4 + 8 is greater than 3", "checked only one pair of sides"),
          ("No, because the sides are all different lengths", "thought a triangle needs equal sides")],
         "The two shorter sides must add to more than the longest side. 3 + 4 = 7, which is less than 8.")
    b.mc(C, "G.2", "core", "Can a triangle have side lengths of 5, 7 and 11?", "Yes, because every pair of sides adds to more than the third side",
         [("No, because 11 is greater than 7", "thought one long side prevents a triangle"), ("No, because the sides are different lengths", "thought a triangle needs equal sides"),
          ("Yes, because 5 + 11 is greater than 7", "checked only one pair of sides")],
         "5 + 7 = 12 > 11, 5 + 11 = 16 > 7 and 7 + 11 = 18 > 5, so a triangle exists.")
    b.mc(C, "G.2", "stretch", "How many different triangles can be built with angles of 40°, 60° and 80°?", "Infinitely many (all with the same shape, different sizes)",
         [("Exactly one", "thought angles alone fix the size"), ("None", "thought the angles do not add to 180°"), ("Exactly two", "guessed")],
         "The angles add to 180°, so triangles exist. Angles alone give the shape but not the size, so there are many.")
    b.mc(C, "G.2", "stretch", "How many triangles can be built with angles of 90°, 60° and 50°?", "None, because the angles add to 200°",
         [("Exactly one", "ignored the angle sum"), ("Infinitely many", "ignored the angle sum"), ("Exactly two", "guessed")],
         "The angles of a triangle add to 180°. 90 + 60 + 50 = 200, so no triangle is possible.")
    b.mc(C, "G.2", "stretch", "Two sides of a triangle are 6 cm and 8 cm and the angle between them is 90°. How many different triangles fit this description?", "Exactly one",
         [("Exactly two", "thought the order of the sides makes a different triangle"), ("Infinitely many", "thought two sides and an angle do not fix the triangle"), ("None", "thought a right angle makes it impossible")],
         "Two sides and the angle between them fix the triangle completely.")
    b.mc(C, "G.2", "challenge", "Which set of measures does NOT determine a unique triangle?", "Three angles: 50°, 60° and 70°",
         [("Three sides: 5, 6 and 7", "three sides fix the triangle"), ("Two sides 4 and 6 and the angle between them 30°", "two sides and the included angle fix the triangle"),
          ("Two angles 40° and 60° and the side between them 5", "two angles and the included side fix the triangle")],
         "Three angles fix the shape but not the size, so many triangles fit. The other sets fix one triangle.")


def g_angles_circles_volume(b):
    C = "G-B"
    # G.4 circles
    b.mc(C, "G.4", "core", "A circle has a radius of 5 cm. What is its circumference, in terms of π?", "10π cm",
         [("25π cm", "used the area formula"), ("5π cm", "used πr instead of 2πr"), ("10 cm", "left out π")],
         "C = 2πr = 2 × π × 5 = 10π.")
    b.mc(C, "G.4", "core", "A circle has a radius of 5 cm. What is its area, in terms of π?", "25π cm²",
         [("10π cm²", "used the circumference formula"), ("5π cm²", "used πr instead of πr²"), ("100π cm²", "squared the diameter instead of the radius")],
         "A = πr² = π × 5² = 25π.")
    b.mc(C, "G.4", "stretch", "A circle has a diameter of 12 m. What is its area, in terms of π?", "36π m²",
         [("144π m²", "squared the diameter instead of the radius"), ("12π m²", "gave the circumference"), ("6π m²", "used πr instead of πr²")],
         "The radius is 6 m, so A = π × 6² = 36π.")
    b.mc(C, "G.4", "stretch", "A circle has a circumference of 18π cm. What is its radius?", "9 cm",
         [("18 cm", "gave the diameter"), ("36 cm", "doubled the circumference"), ("81 cm", "squared the radius")],
         "C = 2πr, so 18π = 2πr and r = 9.")
    b.num(C, "G.4", "stretch", "Use 3.14 for π. What is the circumference of a circle with a radius of 10 cm?", "62.8", [],
          "C = 2 × 3.14 × 10 = 62.8 cm.",
          wrongs=[("314", "found the area"), ("31.4", "used πr instead of 2πr")], unit="cm")
    # G.5 angle relationships
    b.mc(C, "G.5", "core", "Two angles are complementary. One measures 35°. What does the other measure?", "55°",
         [("145°", "used 180° (supplementary)"), ("35°", "thought the angles are equal"), ("65°", "made a subtraction error")],
         "Complementary angles add to 90°: 90 − 35 = 55.")
    b.mc(C, "G.5", "core", "Two angles are supplementary. One measures 112°. What does the other measure?", "68°",
         [("78°", "used 90° (complementary)"), ("248°", "added instead of subtracting"), ("22°", "made a subtraction error")],
         "Supplementary angles add to 180°: 180 − 112 = 68.")
    b.mc(C, "G.5", "core", "Two lines cross. One of the angles measures 47°. What is the measure of the angle vertical to it?", "47°",
         [("133°", "gave the adjacent (supplementary) angle"), ("43°", "gave the complement"), ("94°", "doubled the angle")],
         "Vertical angles are equal.")
    b.mc(C, "G.5", "stretch", "Two angles are supplementary. One measures 2x° and the other measures (x + 30)°. What is x?", "50",
         [("60", "forgot to subtract the 30 before dividing"), ("30", "used the constant as the answer"), ("75", "divided 150 by 2")],
         "2x + x + 30 = 180, so 3x = 150 and x = 50.")
    b.mc(C, "G.5", "stretch", "Two adjacent angles form a straight line. They measure 3x° and (2x + 20)°. What is x?", "32",
         [("36", "forgot to subtract the 20 before dividing"), ("40", "added 20 instead of subtracting"), ("16", "divided 160 by 10")],
         "3x + 2x + 20 = 180, so 5x = 160 and x = 32.")
    # G.6 area, volume and surface area
    b.mc(C, "G.6", "core", "A figure is a 10-by-6 rectangle with a triangle on top. The triangle has a base of 10 and a height of 4. What is the total area?", "80 square units",
         [("100 square units", "forgot to take half of the triangle"), ("64 square units", "added the rectangle's sides and the triangle's height"), ("60 square units", "left out the triangle")],
         "Rectangle: 10 × 6 = 60. Triangle: ½ × 10 × 4 = 20. Total: 80.")
    b.mc(C, "G.6", "stretch", "A square pyramid has a base 6 cm on each side and a height of 5 cm. What is its volume?", "60 cm³",
         [("180 cm³", "forgot the factor of 1/3"), ("90 cm³", "used 1/2 instead of 1/3"), ("30 cm³", "used 1/6 instead of 1/3")],
         "V = (1/3) × base area × height = (1/3) × 36 × 5 = 60.")
    b.mc(C, "G.6", "stretch", "A triangular prism has a triangle base with a base of 6 cm and a height of 4 cm. The prism is 10 cm long. What is its volume?", "120 cm³",
         [("240 cm³", "forgot to take half of the triangle"), ("60 cm³", "took half twice"), ("20 cm³", "added 6, 4 and 10")],
         "Triangle area: ½ × 6 × 4 = 12. Volume: 12 × 10 = 120.")
    b.mc(C, "G.6", "core", "A cube has an edge of 5 cm. What is its surface area?", "150 cm²",
         [("125 cm²", "found the volume"), ("25 cm²", "found the area of one face"), ("30 cm²", "multiplied 6 × 5")],
         "Each face is 5 × 5 = 25. Six faces: 150.")
    b.mc(C, "G.6", "challenge", "Two cubes, each with an edge of 2 cm, are stacked to make a 2 cm × 2 cm × 4 cm prism. What is the surface area of the prism?", "40 cm²",
         [("48 cm²", "added the surface areas of the two separate cubes"), ("32 cm²", "counted only four of the six faces"), ("16 cm²", "found the area of one end")],
         "Two ends: 2 × (2 × 2) = 8. Four sides: 4 × (2 × 4) = 32. Total: 40.")


def sp_sampling(b):
    C = "SP-A"
    # SP.1 populations, samples and representativeness
    b.mc(C, "SP.1", "core", "A school wants to know the favorite lunch of its students. Which sample is most likely to be representative?", "50 students chosen at random from the school roster",
         [("The first 50 students in the lunch line", "a convenient sample that may favor certain students"), ("50 students from the soccer team", "a sample from one group only"),
          ("50 students from the principal's class", "a sample from one class only")],
         "A random sample gives every student the same chance of being picked.")
    b.mc(C, "SP.1", "core", "Why is surveying only people at a basketball game a poor way to estimate a town's favorite sport?", "The sample is likely biased toward basketball fans",
         [("The sample is too random", "random samples are good, but this one is not random"), ("Games are held at night", "gave an irrelevant reason"),
          ("The town is too big", "thought size of the town is the problem")],
         "People at a basketball game are more likely to like basketball, so the sample does not represent the town.")
    b.mc(C, "SP.1", "core", "Which method gives a random sample of 20 students from a class of 30?", "Put all 30 names in a hat and draw 20",
         [("Choose the 20 students who sit in front", "chose a convenient group"), ("Choose 20 of your friends", "chose a biased group"), ("Choose the 20 tallest students", "chose by a characteristic related to the data")],
         "Drawing names gives each student the same chance of being chosen.")
    b.mc(C, "SP.1", "stretch", "In a random sample of 40 students, 28 prefer pizza. About how many of the school's 600 students would you predict prefer pizza?", "420",
         [("28", "used the sample count as the prediction"), ("168", "used 28% instead of 70%"), ("560", "multiplied 28 by 20 using the wrong scale factor")],
         "28 ÷ 40 = 0.7, or 70%. 70% of 600 is 420.")
    b.mc(C, "SP.1", "stretch", "A survey of 100 randomly chosen voters finds that 55 support a proposal. Which statement is best?", "About 55% of all voters probably support it, but the true value may differ somewhat",
         [("Exactly 55% of all voters support it", "treated the sample as exact"), ("Only 55 voters in the whole town support it", "confused the sample count with the population"), ("The survey tells us nothing about all voters", "ignored the value of a random sample")],
         "A random sample gives a reasonable estimate, with some natural variation.")
    b.mc(C, "SP.1", "stretch", "Why do larger random samples generally give better estimates?", "Their estimates tend to vary less from the true population value",
         [("They are guaranteed to be exactly right", "overstated what a sample can do"), ("They remove all bias", "confused size with bias"), ("They cost less to collect", "gave an irrelevant reason")],
         "With more data, estimates cluster more tightly around the true value, though they are never guaranteed.")
    b.mc(C, "SP.1", "core", "A school wants to learn how students get to school. Which sample is biased?", "Only students who ride the bus",
         [("60 students chosen at random from the roster", "this is random"), ("Every 10th name on the roster", "this is systematic and not biased by the topic"), ("Names drawn from a bin", "this is random")],
         "Asking only bus riders leaves out students who walk, bike or get a ride.")
    b.mc(C, "SP.1", "core", "To estimate the average height of 7th graders in a district, a researcher measures 100 of them. What is the population?", "All 7th graders in the district",
         [("The 100 students measured", "named the sample"), ("The average height", "named the statistic"), ("The district's teachers", "named an unrelated group")],
         "The population is the whole group you want to learn about.")
    b.mc(C, "SP.1", "core", "A random sample of students has a mean height of 150 cm. What does this number estimate?", "The mean height of the whole population",
         [("The tallest student in the population", "confused the mean with the maximum"), ("The range of heights in the population", "confused the mean with the range"), ("The size of the sample", "confused the mean with the sample size")],
         "A sample statistic is used to estimate the matching value for the population.")
    # SP.2 repeated random samples
    props = [F(4, 10), F(5, 10), F(6, 10), F(5, 10), F(5, 10)]
    b.mc(C, "SP.2", "stretch", "Five random samples of 10 students each had these proportions who like soccer: 0.4, 0.5, 0.6, 0.5, 0.5. What is the best estimate of the proportion in the whole population?", dec(sum(props) / len(props)),
         [("0.6", "used the largest sample proportion"), ("0.4", "used the smallest sample proportion"), ("2.5", "added the proportions without dividing")],
         "Average the sample proportions: (0.4 + 0.5 + 0.6 + 0.5 + 0.5) ÷ 5 = 0.5.")
    b.mc(C, "SP.2", "stretch", "Three sets of sample means: A is 48, 50, 52. B is 40, 50, 60. C is 49, 50, 51. Which set shows the greatest variation in the estimates?", "B",
         [("A", "chose a set with less spread"), ("C", "chose the set with the least spread"), ("All have the same variation", "ignored the different ranges")],
         "B's values range from 40 to 60, which is the widest.")
    b.mc(C, "SP.2", "core", "Why take several random samples of the same size?", "To see how much the estimates vary and make a better inference",
         [("To make the population smaller", "confused samples with the population"), ("To avoid needing a random method", "thought repeating replaces randomness"), ("To make sure every sample gives the same result", "thought samples should be identical")],
         "Repeated samples show how much estimates change from sample to sample.")
    b.mc(C, "SP.2", "stretch", "A bag has an unknown number of red marbles. Four samples of 10 marbles each had 3, 4, 2 and 3 red. What fraction of the marbles in the bag is probably red?", "0.3 (30%)",
         [("0.4 (40%)", "used the largest sample"), ("0.2 (20%)", "used the smallest sample"), ("12 (all the red marbles)", "gave the total number of red marbles drawn")],
         "Add: 3 + 4 + 2 + 3 = 12 red out of 40 drawn. 12 ÷ 40 = 0.3.")
    b.mc(C, "SP.2", "core", "One random sample says 60% of 7th graders like math. A second random sample of the same size says 40%. What does this show?", "Random samples vary, so a single estimate may be off",
         [("One of the surveys must have cheated", "assumed variation means error"), ("The population changed between the surveys", "assumed variation means change"), ("Neither sample is useful", "ignored the value of sampling")],
         "Different random samples give different results, which is why we look at the variation.")
    b.num(C, "SP.2", "stretch", "Three random samples of 20 students had 9, 11 and 10 students who walk to school. Use these samples to estimate how many of the school's 300 students walk.", "150", [],
          "Average 10 per 20, which is 1/2. Half of 300 is 150.",
          wrongs=[("10", "gave the average sample count"), ("30", "multiplied 10 by 3")], unit="students")
