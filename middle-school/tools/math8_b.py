"""Math 8 items, part B: F-A (define, evaluate, compare functions), F-B (model with functions),
G-A (congruence, similarity, transformations), G-B (angle relationships)."""
from fractions import Fraction as F
from gen_common import fmt, dec, MINUS

M = MINUS


def f_define(b):
    C = "F-A"
    # F.1 what a function is
    b.mc(C, "F.1", "core", "Which set of ordered pairs is a function?", "{(1, 2), (2, 3), (3, 4)}",
         [("{(1, 2), (1, 3), (2, 4)}", "the input 1 has two outputs"), ("{(2, 1), (2, 5), (3, 3)}", "the input 2 has two outputs"), ("{(4, 1), (4, 2), (4, 3)}", "the input 4 has three outputs")],
         "In a function each input has exactly one output. Here every input is different.")
    b.mc(C, "F.1", "core", "Which table shows a function (x is the input, y is the output)?", "x: 1, 2, 3, 4 and y: 5, 5, 6, 7",
         [("x: 1, 2, 2, 3 and y: 4, 5, 6, 7", "the input 2 has two outputs, 5 and 6"), ("x: 0, 0, 1, 2 and y: 1, 2, 3, 4", "the input 0 has two outputs, 1 and 2"), ("x: 3, 3, 3, 4 and y: 1, 2, 3, 4", "the input 3 has three outputs")],
         "Two different inputs may share an output, but one input cannot have two outputs.")
    b.mc(C, "F.1", "core", "A graph does not pass the vertical line test. Why is it not the graph of a function?", "Some input has more than one output",
         [("Some output has more than one input", "that is allowed in a function"), ("The graph is a curve", "curves can be functions"), ("The graph has negative values", "negative values are allowed")],
         "A vertical line that hits the graph twice means one input (x-value) has two outputs.")
    b.mc(C, "F.1", "core", "Which statement defines a function?", "A rule that assigns each input exactly one output",
         [("A rule that assigns each output exactly one input", "reversed inputs and outputs"), ("Any equation with two variables", "not every equation with two variables is a function"), ("Any set of ordered pairs", "not every set of ordered pairs is a function")],
         "That is the definition: one output for each input.")
    b.mc(C, "F.1", "stretch", "Consider the relation x = y² with x as the input. Is it a function?", "No, because x = 4 gives both y = 2 and y = " + M + "2",
         [("Yes, because every x has a y", "some x-values have two y-values"), ("Yes, because it has a squared variable", "squares do not guarantee a function"), ("No, because y is squared", "y = x² is a function; the problem is the two outputs")],
         "The input 4 has two outputs, 2 and " + M + "2, so x = y² is not a function of x.")
    b.mc(C, "F.1", "core", "A function rule is “multiply the input by 3, then subtract 2.” What is the output when the input is 5?", "13",
         [("9", "subtracted 2 before multiplying"), ("15", "forgot to subtract 2"), ("8", "added 3 to the input")],
         "3 × 5 = 15, and 15 − 2 = 13.")
    # F.2 compare two linear functions
    b.mc(C, "F.2", "stretch", "Function A is y = 3x + 2. Function B has the table x: 0, 1, 2 and y: 5, 7, 9. Which has the greater rate of change?", "Function A, with a rate of change of 3 compared with 2",
         [("Function B, because its y-values are larger", "compared outputs instead of rates"), ("They have the same rate of change", "did not compute Function B's rate"), ("It cannot be determined", "thought different representations cannot be compared")],
         "Function B changes by 2 each time x increases by 1, so its rate is 2. Function A's rate is 3.")
    b.mc(C, "F.2", "stretch", "Function A has a graph through (0, 4) and (2, 10). Function B is y = 2x + 7. Which has the greater y-intercept?", "Function B, with 7 compared with 4",
         [("Function A, with 4 compared with 7", "reversed the comparison"), ("They have the same y-intercept", "did not compare the intercepts"), ("It cannot be determined", "thought different representations cannot be compared")],
         "A's graph crosses the y-axis at (0, 4). B's y-intercept is 7.")
    b.mc(C, "F.2", "stretch", "Car A travels 60 miles each hour. For Car B, distance d in miles after t hours is d = 55t. Which car is faster?", "Car A, at 60 mph compared with 55 mph",
         [("Car B, because 55t has a variable", "ignored the rates"), ("They are equally fast", "did not compare 60 with 55"), ("It cannot be determined", "thought different representations cannot be compared")],
         "Car B's rate is 55 miles per hour, which is less than 60.")
    b.mc(C, "F.2", "stretch", "Function 1 is y = 2x − 1. Function 2 has the points (0, 3), (1, 5) and (2, 7). Which statement is true?", "They have the same rate of change but different initial values",
         [("Function 1 grows faster", "both have a rate of 2"), ("Function 2 grows faster", "both have a rate of 2"), ("They have the same initial value", "the initial values are " + M + "1 and 3")],
         "Both increase by 2 for each increase of 1 in x. Function 1 starts at " + M + "1 and Function 2 starts at 3.")
    # F.3 identify linear functions
    b.mc(C, "F.3", "core", "Which table shows a linear function?", "x: 0, 1, 2, 3 and y: 2, 5, 8, 11",
         [("x: 0, 1, 2, 3 and y: 1, 2, 4, 8", "y doubles, which is exponential"), ("x: 0, 1, 2, 3 and y: 1, 4, 9, 16", "the differences keep growing"), ("x: 0, 1, 2, 3 and y: 2, 3, 5, 8", "the differences keep growing")],
         "y increases by 3 each time x increases by 1, a constant rate of change.")
    b.mc(C, "F.3", "core", "Which equation is NOT linear?", "y = x² + 1",
         [("y = 3x − 2", "this is in the form y = mx + b"), ("y = x/2", "this is in the form y = mx + b"), ("y = 5", "this is a horizontal line")],
         "An x² term makes the graph a curve, so y = x² + 1 is not linear.")
    b.mc(C, "F.3", "core", "Which describes a linear function?", "It has a constant rate of change",
         [("Its output doubles each time", "that describes exponential growth"), ("Its output is the square of its input", "that describes a quadratic function, not a linear one"), ("Its graph is a curve", "linear functions have straight-line graphs")],
         "A linear function changes by the same amount for each equal step in the input.")
    b.mc(C, "F.3", "stretch", "The points (1, 3), (2, 5), (3, 7) and (4, 9) are on a graph. What do they show?", "A linear function with a rate of change of 2",
         [("A linear function with a rate of change of 3", "used the first y-value as the rate"), ("A nonlinear function", "the differences are constant"), ("A linear function with a rate of change of 1", "used the x-step as the rate")],
         "y goes up 2 each time x goes up 1, so the function is linear with rate 2.")
    b.mc(C, "F.3", "stretch", "Which table does NOT show a linear function?", "x: 1, 2, 3, 4 and y: 3, 6, 12, 24",
         [("x: 1, 2, 3, 4 and y: 5, 7, 9, 11", "y increases by 2 each time"), ("x: 1, 2, 3, 4 and y: 10, 8, 6, 4", "y decreases by 2 each time"), ("x: 1, 2, 3, 4 and y: 2, 2, 2, 2", "y never changes, a horizontal line")],
         "In the first table y doubles, so the change is not constant: 3, 6, 12, 24.")


def f_model(b):
    C = "F-B"
    # F.4 model linear relationships
    b.mc(C, "F.4", "core", "Which equation has a slope of 3 and a y-intercept of " + M + "2?", "y = 3x − 2",
         [("y = " + M + "2x + 3", "swapped the slope and the y-intercept"), ("y = 3x + 2", "gave the y-intercept the wrong sign"), ("y = 3 − 2x", "swapped the slope and the y-intercept")],
         "In y = mx + b the slope is m = 3 and the y-intercept is b = " + M + "2.")
    b.mc(C, "F.4", "stretch", "A table has the points (0, 5) and (2, 11). Which equation models it?", "y = 3x + 5",
         [("y = 5x + 3", "swapped the slope and the y-intercept"), ("y = 6x + 5", "used the difference in y as the slope"), ("y = 3x + 11", "used the larger y-value as the y-intercept")],
         "Slope = (11 − 5) ÷ (2 − 0) = 3 and the y-intercept is 5.")
    b.mc(C, "F.4", "core", "A plumber charges a $40 fee plus $25 for each hour. Which equation gives the total cost y for x hours?", "y = 25x + 40",
         [("y = 40x + 25", "swapped the fee and the rate"), ("y = 65x", "added the numbers and multiplied by hours"), ("y = 25x − 40", "subtracted the fee")],
         "The rate of change is $25 per hour and the initial value is $40.")
    b.mc(C, "F.4", "core", "The equation y = 4x + 7 gives the total cost in dollars of renting a bike for x hours. What does 7 mean?", "The fixed fee, charged even for 0 hours",
         [("The cost for each hour", "that is the 4"), ("The cost after 4 hours", "confused the 7 with the 4"), ("The number of bikes", "made up a meaning")],
         "7 is the initial value: the cost when x = 0. It is the y-intercept of the graph.")
    b.mc(C, "F.4", "core", "The equation y = 4x + 7 gives the total cost in dollars of renting a bike for x hours. What does 4 mean?", "The cost increases by $4 for each additional hour",
         [("The fixed fee", "that is the 7"), ("The total cost for 4 hours", "confused the 4 with the total"), ("The number of hours rented", "confused the 4 with x")],
         "4 is the rate of change, the slope of the graph.")
    b.mc(C, "F.4", "core", "What is the slope of the line through (1, 2) and (3, 8)?", "3",
         [("6", "used the difference in y only"), ("1/3", "divided x by y"), ("2", "used the first y-value")],
         "Slope = (8 − 2) ÷ (3 − 1) = 6 ÷ 2 = 3.")
    b.mc(C, "F.4", "stretch", "Which point is on the graph of y = " + M + "2x + 1?", "(2, " + M + "3)",
         [("(2, 5)", "made a sign error: " + M + "2(2) + 1 = " + M + "3"), ("(1, 3)", "added instead of multiplying"), ("(" + M + "2, " + M + "3)", "changed the sign of x but not of y")],
         "When x = 2, y = " + M + "2(2) + 1 = " + M + "4 + 1 = " + M + "3.")
    b.mc(C, "F.4", "stretch", "A candle is 20 cm tall and burns down 2 cm every hour. Which equation gives its height h after t hours?", "h = 20 − 2t",
         [("h = 20 + 2t", "added when the candle gets shorter"), ("h = 2t − 20", "reversed the subtraction"), ("h = 18t", "subtracted before multiplying")],
         "The candle starts at 20 cm and loses 2 cm per hour: h = 20 − 2t.")
    b.mc(C, "F.4", "stretch", "A line has a slope of 1/2 and passes through (0, " + M + "4). Which equation is its equation?", "y = (1/2)x − 4",
         [("y = 2x − 4", "inverted the slope"), ("y = (1/2)x + 4", "gave the y-intercept the wrong sign"), ("y = " + M + "4x + 1/2", "swapped the slope and the y-intercept")],
         "Slope m = 1/2 and y-intercept b = " + M + "4, so y = (1/2)x − 4.")
    b.num(C, "F.4", "stretch", "A line has a slope of 2 and passes through (0, 3). What is y when x = 5?", "13", [],
          "The equation is y = 2x + 3. When x = 5, y = 2(5) + 3 = 13.",
          wrongs=[("10", "left out the y-intercept"), ("8", "added 5 and 3")])
    # F.5 qualitative graphs
    b.mc(C, "F.5", "core", "A graph rises, then stays flat, then falls. Which description fits it?", "Increasing, then constant, then decreasing",
         [("Decreasing, then constant, then increasing", "reversed the order"), ("Always increasing", "ignored the flat and falling parts"), ("Always linear", "the graph changes direction, so it is not one line")],
         "Rising means increasing, flat means constant, and falling means decreasing.")
    b.mc(C, "F.5", "core", "Water fills a tank at a steady rate and then the faucet is turned off. Which graph of depth against time fits?", "A line rising steadily and then going flat",
         [("A line falling steadily and then going flat", "depth does not fall while filling"), ("A line that is flat and then rises", "reversed the order"), ("A curve that keeps rising faster and faster", "the rate is steady, not speeding up")],
         "Steady filling is a straight line going up. Once the faucet is off, the depth stays constant.")
    b.mc(C, "F.5", "stretch", "Which situation best matches a graph that is a straight line going down?", "The gas in a car drops steadily as it is driven at a constant speed",
         [("A plant grows quickly and then more slowly", "that is increasing and curved"), ("A population of bacteria doubles every hour", "that is increasing and curved"), ("A ball is thrown up and then comes down", "that rises then falls and is curved")],
         "A constant rate of loss gives a straight line with a negative slope.")
    b.mc(C, "F.5", "stretch", "A ball is thrown straight up and then falls back. The graph of height against time is best described as", "Increasing and then decreasing, and nonlinear",
         [("Always increasing and linear", "the ball comes back down"), ("Decreasing and then increasing, and linear", "reversed the order and ignored the curve"), ("Constant and linear", "the height changes")],
         "The height goes up, peaks, and comes down, in a curved path.")
    b.mc(C, "F.5", "core", "A graph is a straight line sloping upward from left to right. The function is", "Linear and increasing",
         [("Linear and decreasing", "reversed the direction"), ("Nonlinear and increasing", "a straight line is linear"), ("Constant", "constant means flat")],
         "A straight line is linear, and sloping upward means the values increase.")


def g_transformations(b):
    C = "G-A"
    # G.2 congruence
    b.mc(C, "G.2", "core", "Which set of transformations always produces a figure congruent to the original?", "Translations, reflections and rotations",
         [("Dilations only", "dilations change the size"), ("Translations and dilations", "dilations change the size"), ("Dilations and reflections", "dilations change the size")],
         "Rigid motions (translations, reflections, rotations) keep size and shape.")
    b.mc(C, "G.2", "core", "Triangle A is moved 4 units to the right and then reflected across the x-axis to form Triangle B. Are A and B congruent?", "Yes, because both transformations are rigid motions",
         [("No, because B is in a different place", "position does not affect congruence"), ("No, because it was reflected", "reflections preserve size and shape"), ("Only if A and B have equal areas", "equal area alone does not make figures congruent")],
         "A translation and a reflection keep every length and angle the same.")
    b.mc(C, "G.2", "core", "Which transformation does NOT always produce a congruent figure?", "A dilation with a scale factor of 3",
         [("A translation 5 units up", "translations preserve size"), ("A reflection across the y-axis", "reflections preserve size"), ("A rotation of 90° about the origin", "rotations preserve size")],
         "A dilation by 3 makes every length 3 times as long, so the figure is not congruent.")
    b.mc(C, "G.2", "stretch", "Figure B is a rotation of Figure A. Which statement is true?", "Figure B has the same side lengths and angle measures as Figure A",
         [("Figure B has longer sides than Figure A", "rotations do not change length"), ("Figure B has different angle measures from Figure A", "rotations do not change angles"), ("Figure B is similar but never congruent to A", "rotated figures are congruent")],
         "A rotation is a rigid motion, so the figure is congruent to the original.")
    # G.3 coordinates
    b.mc(C, "G.3", "core", "A triangle has a vertex at (2, 3). It is reflected across the x-axis. What are the new coordinates of that vertex?", "(2, " + M + "3)",
         [("(" + M + "2, 3)", "reflected across the y-axis"), ("(" + M + "2, " + M + "3)", "reflected across both axes"), ("(3, 2)", "swapped the coordinates")],
         "Reflecting across the x-axis changes the sign of y only.")
    b.mc(C, "G.3", "core", "The point (" + M + "4, 1) is reflected across the y-axis. What are its new coordinates?", "(4, 1)",
         [("(" + M + "4, " + M + "1)", "reflected across the x-axis"), ("(4, " + M + "1)", "reflected across both axes"), ("(1, " + M + "4)", "swapped the coordinates")],
         "Reflecting across the y-axis changes the sign of x only.")
    b.mc(C, "G.3", "stretch", "The point (3, " + M + "2) is rotated 90° counterclockwise about the origin. What are its new coordinates?", "(2, 3)",
         [("(" + M + "2, " + M + "3)", "rotated 90° clockwise"), ("(" + M + "3, 2)", "rotated 180°"), ("(" + M + "2, 3)", "made a sign error")],
         "A 90° counterclockwise rotation sends (x, y) to (" + M + "y, x): (3, " + M + "2) → (2, 3).")
    b.mc(C, "G.3", "core", "The point (1, 5) is dilated by a scale factor of 3 about the origin. What are its new coordinates?", "(3, 15)",
         [("(4, 8)", "added 3 to each coordinate"), ("(3, 5)", "dilated only the x-coordinate"), ("(1/3, 5/3)", "divided by the scale factor")],
         "Multiply both coordinates by 3.")
    b.mc(C, "G.3", "core", "A translation moves every point by (x, y) → (x − 5, y + 2). What is the image of (4, 1)?", "(" + M + "1, 3)",
         [("(9, " + M + "1)", "reversed the directions of the move"), ("(" + M + "1, " + M + "1)", "subtracted 2 instead of adding"), ("(1, 6)", "made arithmetic errors")],
         "4 − 5 = " + M + "1 and 1 + 2 = 3.")
    b.mc(C, "G.3", "stretch", "The point (8, " + M + "6) is dilated by a scale factor of 1/2 about the origin. What are its new coordinates?", "(4, " + M + "3)",
         [("(16, " + M + "12)", "multiplied by 2 instead of 1/2"), ("(4, 3)", "made a sign error"), ("(8, " + M + "3)", "dilated only the y-coordinate")],
         "Multiply both coordinates by 1/2.")
    # G.4 similarity
    b.mc(C, "G.4", "core", "Which statement correctly describes two similar figures?", "One can be obtained from the other by rotations, reflections, translations and dilations",
         [("One can be obtained from the other by rotations and translations only", "that describes congruent figures"), ("One can be obtained from the other by dilations only", "reflections, rotations and translations can also be used"),
          ("They always have the same area", "similar figures can differ in size")],
         "Similarity allows a dilation as well as rigid motions.")
    b.mc(C, "G.4", "core", "Triangle A has sides 3, 4 and 5. Triangle B has sides 6, 8 and 10. How are they related?", "Similar: B is a dilation of A with a scale factor of 2",
         [("Congruent", "the sides are not equal"), ("Not similar", "the sides are proportional"), ("Similar with a scale factor of 3", "used 3, the shortest side of A, as the scale factor")],
         "Each side of B is 2 times the matching side of A.")
    b.mc(C, "G.4", "stretch", "Are a 2-by-3 rectangle and a 4-by-9 rectangle similar?", "No, because 2/4 is not equal to 3/9",
         [("Yes, because both are rectangles", "similar figures need proportional sides"), ("Yes, because 4 is 2 times 2", "the other sides must match the same factor"), ("No, because they are different sizes", "similar figures can be different sizes")],
         "The scale factor would be 2 for one side but 3 for the other, so the sides are not proportional.")
    b.mc(C, "G.4", "stretch", "A figure is dilated by a factor of 3 and then reflected across the y-axis. How is the final figure related to the original?", "Similar",
         [("Congruent", "the dilation changed the size"), ("Neither similar nor congruent", "dilations and reflections preserve shape"), ("Congruent but not similar", "congruent figures are also similar, and this one changed size")],
         "A dilation followed by a rigid motion produces a similar figure.")
    b.mc(C, "G.4", "core", "Two similar triangles have corresponding sides of 5 and 15. What is the scale factor from the smaller to the larger triangle?", "3",
         [("10", "subtracted 5 from 15"), ("1/3", "divided in the wrong order"), ("75", "multiplied 5 by 15")],
         "15 ÷ 5 = 3.")


def g_angles(b):
    C = "G-B"
    b.mc(C, "G.5", "core", "Two angles of a triangle measure 50° and 60°. What does the third angle measure?", "70°",
         [("110°", "added the two angles instead of subtracting the sum from 180°"), ("130°", "subtracted only 50 from 180"), ("120°", "subtracted only 60 from 180")],
         "The angles of a triangle add to 180°: 180 − 50 − 60 = 70.")
    b.mc(C, "G.5", "core", "The remote interior angles of a triangle measure 40° and 65°. What does the exterior angle measure?", "105°",
         [("75°", "subtracted instead of adding"), ("25°", "found the difference of the two angles"), ("115°", "added 50 to 65")],
         "An exterior angle equals the sum of the two remote interior angles: 40 + 65 = 105.")
    b.mc(C, "G.5", "core", "Two parallel lines are cut by a transversal. An angle measures 70°. What does its corresponding angle measure?", "70°",
         [("110°", "used the supplementary angle"), ("20°", "used the complementary angle"), ("90°", "assumed a right angle")],
         "Corresponding angles are equal when the lines are parallel.")
    b.mc(C, "G.5", "core", "Two parallel lines are cut by a transversal. One angle measures 110°. What does its alternate interior angle measure?", "110°",
         [("70°", "used the supplementary angle"), ("20°", "used a wrong relationship"), ("180°", "added the angle to 70°")],
         "Alternate interior angles are equal when the lines are parallel.")
    b.mc(C, "G.5", "stretch", "Two parallel lines are cut by a transversal. One angle measures 65°. What does the same-side interior angle measure?", "115°",
         [("65°", "treated it as equal"), ("25°", "used the complement"), ("90°", "assumed a right angle")],
         "Same-side interior angles are supplementary: 180 − 65 = 115.")
    b.mc(C, "G.5", "stretch", "The angles of a triangle measure x°, 2x° and 3x°. What is x?", "30",
         [("60", "divided 180 by 3"), ("36", "divided 180 by 5"), ("45", "divided 180 by 4")],
         "x + 2x + 3x = 6x = 180, so x = 30.")
    b.mc(C, "G.5", "stretch", "An exterior angle of a triangle measures 130° and one remote interior angle measures 50°. What does the other remote interior angle measure?", "80°",
         [("180°", "added 130 and 50"), ("130°", "repeated the exterior angle"), ("50°", "repeated the given angle")],
         "The remote interior angles add to the exterior angle: 130 − 50 = 80.")
    b.mc(C, "G.5", "core", "One triangle has angles of 40° and 70°. Another triangle has angles of 70° and 40°. What can you conclude?", "The triangles are similar, by the angle-angle criterion",
         [("Nothing, because the side lengths are unknown", "AA similarity does not need sides"), ("The triangles are congruent", "congruence needs a side length too"), ("The triangles are not similar", "two pairs of equal angles make triangles similar")],
         "Two pairs of equal angles are enough to show similarity.")
    b.mc(C, "G.5", "stretch", "The angles of a triangle measure (x + 10)°, 2x° and (x + 30)°. What is x?", "35",
         [("45", "ignored the constants and divided 180 by 4"), ("30", "used the constant 30"), ("40", "made an arithmetic error")],
         "4x + 40 = 180, so 4x = 140 and x = 35.")
    b.mc(C, "G.5", "stretch", "Two parallel lines are cut by a transversal. One angle is (3x + 10)° and its corresponding angle is 100°. What is x?", "30",
         [("90", "forgot to divide by 3"), ("110/3", "added 10 instead of subtracting"), ("100/3", "forgot the 10")],
         "3x + 10 = 100, so 3x = 90 and x = 30.")
    b.mc(C, "G.5", "core", "When two parallel lines are cut by a transversal, which pairs of angles are equal?", "Alternate interior angles",
         [("Same-side interior angles", "these are supplementary"), ("Angles in a linear pair", "these are supplementary"), ("Every pair of angles", "some pairs are supplementary")],
         "Alternate interior angles, like corresponding angles, are equal.")
    b.mc(C, "G.5", "core", "A triangle has angles of 90°, 35° and x°. What is x?", "55",
         [("45", "assumed an isosceles right triangle"), ("145", "subtracted only 35 from 180"), ("65", "made an arithmetic error")],
         "90 + 35 + x = 180, so x = 55.")
    b.mc(C, "G.5", "stretch", "An exterior angle of a triangle is 120° and the two remote interior angles are equal. What does each measure?", "60°",
         [("120°", "repeated the exterior angle"), ("30°", "divided by 4"), ("90°", "assumed a right angle")],
         "The two equal angles add to 120°, so each is 60°.")
    b.mc(C, "G.5", "core", "Which set of angles could NOT be the angles of a triangle?", "30°, 60°, 80°",
         [("60°, 60°, 60°", "adds to 180°"), ("90°, 45°, 45°", "adds to 180°"), ("100°, 50°, 30°", "adds to 180°")],
         "30 + 60 + 80 = 170, not 180.")
    b.num(C, "G.5", "challenge", "Two angles are supplementary. One measures (2x + 15)° and the other measures (3x + 5)°. What is x?", "32", [],
          "2x + 15 + 3x + 5 = 180, so 5x + 20 = 180, 5x = 160 and x = 32.",
          wrongs=[("36", "forgot the constants"), ("40", "added 20 instead of subtracting")])
