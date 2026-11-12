"""Math 8 items, part C: G-C (Pythagorean Theorem), G-D (volume of cylinders, cones, spheres),
SP (scatter plots, linear models, two-way tables)."""
import math
from fractions import Fraction as F
from gen_common import fmt, dec, MINUS

M = MINUS


def g_pythagorean(b):
    C = "G-C"
    # G.6 explain the theorem and its converse
    b.mc(C, "G.6", "core", "A right triangle has legs a and b and hypotenuse c. Which equation states the Pythagorean Theorem?", "a² + b² = c²",
         [("a + b = c", "added the lengths instead of the squares"), ("a² + b² = c", "forgot to square c"), ("a² − b² = c²", "subtracted instead of adding")],
         "The squares of the legs add up to the square of the hypotenuse.")
    b.mc(C, "G.6", "core", "Is a triangle with sides 5, 12 and 13 a right triangle?", "Yes, because 5² + 12² = 13²",
         [("No, because 5 + 12 is greater than 13", "confused the triangle inequality with the Pythagorean Theorem"), ("No, because 13 is odd", "gave an irrelevant reason"), ("Yes, because 5 + 12 + 13 = 30", "added the sides")],
         "25 + 144 = 169 = 13², so the converse of the theorem says it is a right triangle.")
    b.mc(C, "G.6", "stretch", "Which statement is the converse of the Pythagorean Theorem?", "If a² + b² = c², then the triangle is a right triangle",
         [("If a triangle is a right triangle, then a² + b² = c²", "this is the theorem itself"), ("If a triangle is not a right triangle, then a² + b² = c²", "this is not true"), ("If a triangle has three equal sides, then a² + b² = c²", "this is not true")],
         "The converse reverses the “if” and “then” parts of the theorem.")
    b.mc(C, "G.6", "stretch", "Which set of numbers is a Pythagorean triple?", "6, 8, 10",
         [("4, 5, 6", "16 + 25 = 41, not 36"), ("5, 6, 7", "25 + 36 = 61, not 49"), ("7, 8, 9", "49 + 64 = 113, not 81")],
         "6² + 8² = 36 + 64 = 100 = 10².")
    # G.7 apply the theorem
    b.mc(C, "G.7", "core", "A right triangle has legs of 6 and 8. What is the length of the hypotenuse?", "10",
         [("14", "added the legs"), ("100", "forgot to take the square root"), ("48", "multiplied the legs")],
         "6² + 8² = 36 + 64 = 100, and √100 = 10.")
    b.mc(C, "G.7", "core", "A right triangle has a hypotenuse of 13 and one leg of 5. What is the other leg?", "12",
         [("8", "subtracted 5 from 13"), ("18", "added 5 and 13"), ("√194", "added the squares instead of subtracting")],
         "13² − 5² = 169 − 25 = 144, and √144 = 12.")
    b.mc(C, "G.7", "core", "A 10-foot ladder reaches 8 feet up a wall. How far is the base of the ladder from the wall?", "6 feet",
         [("2 feet", "subtracted 8 from 10"), ("√164 feet", "added the squares instead of subtracting"), ("18 feet", "added the lengths")],
         "10² − 8² = 100 − 64 = 36, and √36 = 6.")
    b.mc(C, "G.7", "stretch", "A right triangle has legs of 5 and 7. To the nearest tenth, what is the hypotenuse?", f"{math.sqrt(74):.1f}",
         [("12", "added the legs"), ("35", "multiplied the legs"), ("74", "forgot to take the square root")],
         "5² + 7² = 25 + 49 = 74, and √74 ≈ 8.6.")
    b.mc(C, "G.7", "stretch", "Is a triangle with sides 7, 24 and 25 a right triangle?", "Yes, because 7² + 24² = 25²",
         [("No, because 7 + 24 is greater than 25", "confused the triangle inequality with the Pythagorean Theorem"), ("No, because the sides are not equal", "thought only equal sides make a right triangle"), ("Yes, because 7 + 24 = 31", "added the legs")],
         "49 + 576 = 625 = 25².")
    b.mc(C, "G.7", "stretch", "Which set of side lengths does NOT form a right triangle?", "11, 12, 16",
         [("8, 15, 17", "64 + 225 = 289 = 17²"), ("9, 40, 41", "81 + 1,600 = 1,681 = 41²"), ("10, 24, 26", "100 + 576 = 676 = 26²")],
         "11² + 12² = 121 + 144 = 265, but 16² = 256.")
    b.mc(C, "G.7", "stretch", "A rectangle is 9 units by 12 units. What is the length of its diagonal?", "15 units",
         [("21 units", "added the sides"), ("108 units", "multiplied the sides"), ("225 units", "forgot to take the square root")],
         "9² + 12² = 81 + 144 = 225, and √225 = 15.")
    # G.8 distance in the coordinate plane
    b.mc(C, "G.8", "core", "What is the distance between (1, 2) and (4, 6)?", "5",
         [("7", "added the differences 3 and 4"), ("25", "forgot to take the square root"), ("3", "used only the horizontal difference")],
         "The horizontal difference is 3 and the vertical difference is 4. √(9 + 16) = 5.")
    b.mc(C, "G.8", "stretch", "What is the distance between (" + M + "2, 3) and (4, " + M + "5)?", "10",
         [("14", "added the differences 6 and 8"), ("2", "subtracted instead of finding the differences"), ("100", "forgot to take the square root")],
         "The differences are 6 and 8. √(36 + 64) = 10.")
    b.mc(C, "G.8", "core", "What is the distance from (0, 0) to (5, 12)?", "13",
         [("17", "added 5 and 12"), ("60", "multiplied 5 and 12"), ("169", "forgot to take the square root")],
         "√(5² + 12²) = √169 = 13.")
    b.num(C, "G.8", "stretch", "What is the distance between (" + M + "3, " + M + "1) and (2, 11)?", "13", [],
          "The differences are 5 and 12. √(25 + 144) = √169 = 13.",
          wrongs=[("17", "added the differences"), ("7", "made a sign error in the differences")])


def g_volume(b):
    C = "G-D"
    b.mc(C, "G.9", "core", "A cylinder has a radius of 3 cm and a height of 5 cm. What is its volume, in terms of π?", "45π cm³",
         [("15π cm³", "used πrh instead of πr²h"), ("30π cm³", "used 2πrh"), ("180π cm³", "used the diameter in place of the radius")],
         "V = πr²h = π × 3² × 5 = 45π.")
    b.mc(C, "G.9", "core", "A cone has a radius of 3 cm and a height of 5 cm. What is its volume, in terms of π?", "15π cm³",
         [("45π cm³", "forgot the factor of 1/3"), ("5π cm³", "divided by 9 instead of 3"), ("30π cm³", "used 2/3 instead of 1/3")],
         "V = (1/3)πr²h = (1/3) × π × 9 × 5 = 15π.")
    b.mc(C, "G.9", "core", "A sphere has a radius of 3 cm. What is its volume, in terms of π?", "36π cm³",
         [("12π cm³", "squared the radius instead of cubing it"), ("108π cm³", "forgot the factor of 1/3"), ("27π cm³", "forgot the factor of 4/3")],
         "V = (4/3)πr³ = (4/3) × π × 27 = 36π.")
    b.mc(C, "G.9", "core", "A cone and a cylinder have the same base and the same height. The cone's volume is what fraction of the cylinder's volume?", "1/3",
         [("1/2", "used the triangle area fraction"), ("2/3", "used the sphere-to-cylinder fraction"), ("1/4", "guessed")],
         "A cone holds exactly one third as much as a cylinder with the same base and height.")
    b.mc(C, "G.9", "stretch", "A cone has a volume of 12π. A cylinder has the same base and the same height. What is the cylinder's volume?", "36π",
         [("4π", "divided by 3 instead of multiplying"), ("24π", "doubled the cone's volume"), ("12π", "assumed they are equal")],
         "The cone is 1/3 of the cylinder, so the cylinder is 3 × 12π = 36π.")
    b.mc(C, "G.9", "stretch", "A sphere has a radius of 6 units. What is its volume, in terms of π?", "288π",
         [("144π", "used (2/3)πr³"), ("864π", "forgot the factor of 1/3"), ("48π", "squared the radius instead of cubing it")],
         "V = (4/3)π × 6³ = (4/3) × 216 × π = 288π.")
    b.mc(C, "G.9", "stretch", "A cylinder has a diameter of 10 cm and a height of 4 cm. What is its volume, in terms of π?", "100π cm³",
         [("400π cm³", "used the diameter as the radius"), ("40π cm³", "used πdh"), ("200π cm³", "used 2πr²h")],
         "The radius is 5. V = π × 5² × 4 = 100π.")
    b.mc(C, "G.9", "challenge", "A cylinder has a radius r and a height 2r. A sphere has the same radius r. The sphere's volume is what fraction of the cylinder's volume?", "2/3",
         [("1/3", "used the cone fraction"), ("1/2", "guessed"), ("3/4", "guessed")],
         "Cylinder: πr²(2r) = 2πr³. Sphere: (4/3)πr³. The ratio is (4/3) ÷ 2 = 2/3.")
    b.num(C, "G.9", "stretch", "Use 3.14 for π. What is the volume of a cylinder with a radius of 2 and a height of 10?", "125.6", [],
          "V = π × 2² × 10 = 3.14 × 40 = 125.6.",
          wrongs=[("62.8", "halved the volume"), ("251.2", "doubled the volume")])
    b.mc(C, "G.9", "stretch", "A cone has a radius of 6 cm and a height of 4 cm. What is its volume, in terms of π?", "48π cm³",
         [("144π cm³", "forgot the factor of 1/3"), ("24π cm³", "used 1/6 instead of 1/3"), ("72π cm³", "used 1/2 instead of 1/3")],
         "V = (1/3)π × 36 × 4 = 48π.")
    b.mc(C, "G.9", "stretch", "A cone and a sphere both have a radius of 3. The cone's height is 6. Which has the greater volume?", "The sphere",
         [("The cone", "the cone is 18π and the sphere is 36π"), ("They are equal", "the volumes are 18π and 36π"), ("It cannot be determined", "both volumes can be found")],
         "Cone: (1/3)π(9)(6) = 18π. Sphere: (4/3)π(27) = 36π.")
    b.mc(C, "G.9", "core", "A cylindrical can has a radius of 4 inches and a height of 6 inches. How many cubic inches of soup does it hold, in terms of π?", "96π",
         [("48π", "used πrh × 2"), ("24π", "used πrh"), ("192π", "doubled the correct volume")],
         "V = π × 4² × 6 = 96π.")
    b.mc(C, "G.9", "stretch", "A sphere has a volume of 36π. What is its radius?", "3",
         [("6", "used the diameter"), ("9", "divided by 4"), ("27", "gave r³")],
         "(4/3)πr³ = 36π, so r³ = 27 and r = 3.")
    b.mc(C, "G.9", "core", "Which formula gives the volume of a cone?", "V = (1/3)πr²h",
         [("V = πr²h", "that is a cylinder"), ("V = (4/3)πr³", "that is a sphere"), ("V = (1/2)πr²h", "used 1/2 instead of 1/3")],
         "A cone is one third of the cylinder with the same base and height.")
    b.mc(C, "G.9", "stretch", "A cylinder's radius is doubled and its height stays the same. How does its volume change?", "It becomes 4 times as large",
         [("It becomes 2 times as large", "forgot that the radius is squared"), ("It becomes 8 times as large", "cubed the radius"), ("It stays the same", "ignored the radius")],
         "V = πr²h. Doubling r multiplies r² by 4.")


def sp_scatter(b):
    C = "SP"
    # SP.1 scatter plots
    b.mc(C, "SP.1", "core", "A scatter plot shows that students who study more hours tend to have higher test scores. What kind of association is this?", "Positive association",
         [("Negative association", "reversed the direction"), ("No association", "the points show a trend"), ("Nonlinear association", "nothing suggests a curve")],
         "As one variable increases the other tends to increase: a positive association.")
    b.mc(C, "SP.1", "core", "In a scatter plot, as x increases the points go down along a roughly straight line. How is the association described?", "A negative linear association",
         [("A positive linear association", "reversed the direction"), ("A nonlinear association", "the points follow a line"), ("No association", "the points show a trend")],
         "Points trending down in a line show a negative linear association.")
    b.mc(C, "SP.1", "core", "On a scatter plot, one point is far away from all the others. What is that point called?", "An outlier",
         [("A cluster", "a cluster is a group of points close together"), ("A trend line", "a trend line is a fitted line"), ("A median", "a median is a measure of center")],
         "A point far from the pattern of the others is an outlier.")
    b.mc(C, "SP.1", "stretch", "The points on a scatter plot form a U-shaped curve. How is the association described?", "A nonlinear association",
         [("A positive linear association", "the points do not follow a line"), ("A negative linear association", "the points do not follow a line"), ("No association", "the points show a clear pattern")],
         "A curved pattern is a nonlinear association.")
    # SP.2 informal lines of fit
    b.mc(C, "SP.2", "stretch", "The points (1, 2), (2, 4), (3, 5) and (4, 8) are plotted. Which line is the best fit?", "y = 2x",
         [("y = x + 5", "this line is far above most points"), ("y = " + M + "2x + 10", "this line has the wrong direction"), ("y = 0.5x", "this line is far below the points")],
         "y = 2x passes through (1, 2), (2, 4) and (4, 8) and is close to (3, 5).")
    b.mc(C, "SP.2", "core", "A line passes very close to almost every point on a scatter plot. How is the model's fit described?", "A good fit",
         [("A poor fit", "close points mean a good fit"), ("An exact fit for every point", "a line of fit does not have to hit every point"), ("No fit", "the line describes the points well")],
         "A line that stays close to the points is a good model.")
    b.mc(C, "SP.2", "stretch", "Which is a sign that a linear model is a poor fit for a scatter plot?", "The points curve away from the line, staying far from it in a pattern",
         [("The points are scattered evenly on both sides of the line and close to it", "this suggests a good fit"), ("The line goes through most of the points", "this suggests a good fit"), ("The line has a positive slope", "slope direction does not decide the fit")],
         "A curved pattern around the line means a straight line does not describe the data well.")
    # SP.3 using a linear model
    b.mc(C, "SP.3", "core", "A model y = 2.5x + 40 predicts a test score y from x hours of study. What score does it predict for 6 hours of study?", "55",
         [("15", "left out the y-intercept"), ("42.5", "added instead of multiplying"), ("100", "made an arithmetic error")],
         "2.5 × 6 + 40 = 15 + 40 = 55.")
    b.mc(C, "SP.3", "stretch", "In the model y = 2.5x + 40 (score y for x hours of study), what does the slope 2.5 mean?", "Each extra hour of study is associated with 2.5 more points",
         [("A student who studies 0 hours scores 2.5", "that describes the y-intercept"), ("The score is always 2.5 times the hours", "ignored the y-intercept"), ("Students study 2.5 hours on average", "confused the slope with a mean")],
         "The slope is the predicted change in y for each 1-unit increase in x.")
    b.mc(C, "SP.3", "stretch", "In the model y = 2.5x + 40 (score y for x hours of study), what does the y-intercept 40 mean?", "The predicted score for a student who studies 0 hours",
         [("The predicted change in score per hour", "that describes the slope"), ("The highest possible score", "the model does not say that"), ("The number of hours a student studies", "confused the intercept with x")],
         "When x = 0, the model predicts y = 40.")
    b.num(C, "SP.3", "stretch", "A model y = " + M + "3x + 90 predicts a phone's battery percent y after x hours of use. What battery percent does it predict after 10 hours?", "60", [],
          M + "3(10) + 90 = " + M + "30 + 90 = 60.",
          wrongs=[(M + "30", "left out the y-intercept"), ("120", "treated " + M + "3(10) as +30")], unit="percent")
    # SP.4 two-way tables
    ctx = "Of 24 students who play a sport, 18 like pizza and 6 do not. Of 16 students who do not play a sport, 8 like pizza and 8 do not."
    b.mc(C, "SP.4", "core", ctx + " Among students who play a sport, what fraction like pizza?", "3/4",
         [("9/20", "divided by all 40 students"), ("9/13", "divided by the total number who like pizza"), ("1/4", "gave the fraction who do not like pizza")],
         "18 of the 24 players like pizza: 18/24 = 3/4.")
    b.mc(C, "SP.4", "core", ctx + " What fraction of all the students play a sport?", "3/5",
         [("3/4", "used the fraction of players who like pizza"), ("1/2", "guessed"), ("2/5", "used the fraction who do not play")],
         "24 of the 40 students play a sport: 24/40 = 3/5.")
    b.mc(C, "SP.4", "stretch", ctx + " Does the table suggest an association between playing a sport and liking pizza?", "Yes: 75% of players like pizza compared with 50% of non-players",
         [("No, because the same number of students like and dislike pizza overall", "compared overall counts instead of row percentages"), ("No, because more students play a sport than do not", "this does not address association"), ("Yes, because 18 is greater than 8", "compared raw counts rather than percentages")],
         "18/24 = 75% of players like pizza and 8/16 = 50% of non-players do, so liking pizza is more common among players.")
    b.mc(C, "SP.4", "core", "What does a two-way table show?", "How often combinations of two categorical variables occur",
         [("A line of best fit for two numerical variables", "that describes a scatter plot"), ("The median of one variable", "a two-way table shows two variables"), ("The slope and y-intercept of a model", "a two-way table does not show a model")],
         "Each cell counts how many subjects fall into one category of each variable.")
