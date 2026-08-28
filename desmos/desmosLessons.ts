/** Interactive Desmos SAT lesson plans — based on BWS Education Desmos Tips & Tricks */

import type { DesmosExpression } from "./buildCalculatorHtml";

export type DesmosPracticeQuestionKind = "theory" | "desmos";

export type DesmosPracticeQuestion = {
  kind: DesmosPracticeQuestionKind;
  question: string;
  choices: string[];
  answer: number;
  explanation: string;
  /** Shown above the calculator on desmos practice questions */
  desmosTask?: string;
  desmosHints?: string[];
};

export type DesmosGuideStep = {
  title: string;
  body: string;
};

export type DesmosLesson = {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  whenToUse: string[];
  avoidWhen: string[];
  workflow: string[];
  guideSteps: DesmosGuideStep[];
  tryIt: {
    prompt: string;
    task: string;
    hints: string[];
    starterExpressions?: DesmosExpression[];
  };
  practiceQuestions: DesmosPracticeQuestion[];
};

const theory = (
  question: string,
  choices: string[],
  answer: number,
  explanation: string
): DesmosPracticeQuestion => ({ kind: "theory", question, choices, answer, explanation });

const desmos = (
  question: string,
  choices: string[],
  answer: number,
  explanation: string,
  desmosTask: string,
  desmosHints?: string[]
): DesmosPracticeQuestion => ({
  kind: "desmos",
  question,
  choices,
  answer,
  explanation,
  desmosTask,
  desmosHints,
});

export const DESMOS_LESSONS: DesmosLesson[] = [
  {
    id: "linear-regression",
    title: "Linear Regression",
    subtitle: "Find slope and y-intercept from data points",
    icon: "📈",
    whenToUse: [
      "A problem gives you a table or several coordinate pairs that lie on a line.",
      "You need the slope, y-intercept, or best-fit equation quickly.",
      "The numbers are messy enough that hand arithmetic is annoying.",
    ],
    avoidWhen: [
      "The equation is already given and all you need is one direct read.",
      "The relationship is clearly not linear.",
      "One quick algebra step beats setting up a table.",
    ],
    workflow: [
      "Open a table and enter x-values and y-values.",
      "Type y1 ~ mx1 + b on a new line.",
      "Read m as the slope and b as the y-intercept.",
      "Sanity-check the slope's sign and size before committing.",
    ],
    guideSteps: [
      { title: "Core idea", body: "Regression is your best Desmos move when the SAT gives multiple points and asks for the line they form. Instead of computing slope repeatedly, let Desmos solve for the best-fit line immediately." },
      { title: "What to type", body: "Use a table first, then add y1 ~ mx1 + b. The tilde matters: = graphs a line, while ~ tells Desmos to solve for unknown parameters from the data." },
      { title: "When it saves time", body: "This is strongest on chart, table, and coordinate-set questions where answer choices ask for slope or intercept and the values are awkward decimals or fractions." },
      { title: "BWS example", body: "For points (1, -2.5), (-2, -13), and (7, 18.5), Desmos returns m = 3.5 and b = -6, so the line is y = 3.5x - 6." },
    ],
    tryIt: {
      prompt: "Find the slope and y-intercept for these points",
      task: "This graph is preloaded with the BWS example. In the SAT interface you would enter the points in a table and type y1 ~ mx1 + b. The fitted line should show slope about 3.5 and y-intercept about -6.",
      hints: [
        "Use a tilde, not an equals sign.",
        "The table columns and the regression subscripts must match.",
        "Always ask whether a positive or negative slope makes sense visually.",
      ],
      starterExpressions: [
        { id: "p1", latex: "(1,-2.5)", color: "#f5c518" },
        { id: "p2", latex: "(-2,-13)", color: "#f5c518" },
        { id: "p3", latex: "(7,18.5)", color: "#f5c518" },
        { id: "reg", latex: "y=3.5x-6", color: "#60a5fa" },
      ],
    },
    practiceQuestions: [
      theory(
        "In the expression y1 ~ mx1 + b, what does the tilde (~) tell Desmos to do?",
        ["Graph a fixed line", "Run a regression and solve for m and b from table data", "Make the lines parallel", "Convert decimals to fractions"],
        1,
        "The tilde triggers regression: Desmos fits the line to your table and reports m and b."
      ),
      theory(
        "When is linear regression most valuable on the SAT?",
        ["The equation is already written as y = mx + b", "You have several messy coordinate pairs and need the line", "The problem is about circle radii", "You only need one substitution"],
        1,
        "Regression shines when multiple data points are given and hand slope arithmetic would be slow."
      ),
      desmos(
        "Enter (1, -2.5), (-2, -13), and (7, 18.5) in a table, then type y1 ~ mx1 + b. What slope m does Desmos report?",
        ["-6", "1.2", "3.5", "7"],
        2,
        "Desmos returns m = 3.5 for this BWS example data set.",
        "Add a table with x1: 1, -2, 7 and y1: -2.5, -13, 18.5. On a new line type y1 ~ mx1 + b.",
        ["Use a tilde, not equals.", "Column names in the regression must match the table headers."]
      ),
      desmos(
        "Using the same table and regression, what y-intercept b does Desmos give?",
        ["-6", "3.5", "7", "18.5"],
        0,
        "With m = 3.5, Desmos reports b = -6, so the line is y = 3.5x - 6.",
        "Keep the same table and y1 ~ mx1 + b line from the previous question.",
        ["Read b from the regression output, not from a single point.", "Sanity-check: the line should pass through all three points."]
      ),
    ],
  },
  {
    id: "sliders",
    title: "Sliders for Constants",
    subtitle: "Test unknown constants visually",
    icon: "🎚️",
    whenToUse: [
      "A problem asks which value of a constant makes a graph meet a condition.",
      "You are searching for parallel lines, tangency, or a shifted graph.",
      "The visual condition is clearer than the algebra setup.",
    ],
    avoidWhen: [
      "A fast exact algebra step already gives the answer.",
      "The graph condition is vague and you do not know what to look for.",
      "The prompt wants an exact symbolic expression rather than a value from choices.",
    ],
    workflow: [
      "Type the equation with the unknown constant still as a letter.",
      "Tap add slider when Desmos offers it.",
      "Adjust the slider until the graph matches the condition.",
      "Read the slider value and compare it to answer choices.",
    ],
    guideSteps: [
      { title: "Core idea", body: "Sliders are perfect when the SAT asks what value of a constant makes a graph do something special: become parallel, touch once, hit a point, or shift into place." },
      { title: "Most common SAT use", body: "For no-solution systems, slide until the lines are parallel. For one-solution situations, look for exactly one intersection or one touch point." },
      { title: "BWS example", body: "For 6x - 5y = 8 and y = ax + 3, slide a until the lines become parallel. That occurs at a = 1.2." },
      { title: "Think, then drag", body: "The slider is fast only if you already know the visual goal. Parallel means same slope, tangent means one touch point, and overlap means infinitely many solutions." },
    ],
    tryIt: {
      prompt: "Find when the system has no solution",
      task: "This graph is preloaded at the no-solution case. In the actual SAT interface, you would add a slider for a in y = ax + 3 and drag until the two lines are parallel.",
      hints: [
        "Parallel lines never cross, so the system has no solution.",
        "If the lines overlap exactly, that is infinitely many solutions, not no solution.",
        "A slider is strongest when the condition is visual and the answers are numeric choices.",
      ],
      starterExpressions: [
        { id: "l1", latex: "6x-5y=8", color: "#60a5fa" },
        { id: "l2", latex: "y=1.2x+3", color: "#f5c518" },
      ],
    },
    practiceQuestions: [
      theory(
        "Parallel lines in a system of two linear equations mean:",
        ["Infinitely many solutions", "Exactly one solution", "No solution", "The answer is always 0"],
        2,
        "Parallel lines never intersect, so there is no shared ordered pair."
      ),
      theory(
        "If a slider makes two graphs just touch at one point, what condition are you seeing?",
        ["No solution", "Tangency / one intersection", "Regression", "An asymptote"],
        1,
        "Just touching at one point is the visual cue for tangency or a single shared point."
      ),
      desmos(
        "Graph 6x - 5y = 8 and y = ax + 3. Add a slider for a and drag until the lines are parallel. What value of a works?",
        ["0.8", "1.2", "2.5", "6"],
        1,
        "The lines are parallel when a = 1.2, matching the BWS no-solution example.",
        "Type 6x-5y=8 and y=ax+3. Tap add slider when Desmos offers it for a.",
        ["Parallel means same slope, never crossing.", "If the lines overlap completely, that is infinitely many solutions—not no solution."]
      ),
      desmos(
        "With the same system at a = 1.2, how many solutions does the system have?",
        ["0", "1", "2", "Infinitely many"],
        0,
        "Parallel distinct lines never meet, so the system has no solution.",
        "Keep both equations graphed with a = 1.2 on the slider.",
        ["No intersection on the graph means no algebraic solution pair.", "Overlapping lines would mean infinitely many solutions."]
      ),
    ],
  },
  {
    id: "systems",
    title: "Systems of Equations",
    subtitle: "Graph to find intersections",
    icon: "✖️",
    whenToUse: [
      "Two equations look messy and you mainly need the ordered-pair solution.",
      "Answer choices are approximate decimals.",
      "You want to confirm whether a system has one solution, none, or many.",
    ],
    avoidWhen: [
      "The equations are simple enough that elimination is faster.",
      "The test needs an exact symbolic form beyond the graph's estimate.",
      "The intersection is likely far offscreen and algebra is cleaner.",
    ],
    workflow: [
      "Graph both equations on separate lines.",
      "Locate the intersection point.",
      "Tap it to read the coordinates.",
      "Use algebra afterward only if you need an exact form.",
    ],
    guideSteps: [
      { title: "Core idea", body: "On Desmos, the solution to a system is the point where the graphs meet. This is often the fastest path when coefficients are ugly or the answers are not neat integers." },
      { title: "What to notice", body: "One crossing means one solution. Parallel non-overlapping lines mean no solution. The same line graphed twice means infinitely many solutions." },
      { title: "BWS example", body: "Graph 2x - 5y = 9 and y = 4x + 5. Desmos shows the intersection near (-1.889, -2.556). Tap the point to read the solution." },
      { title: "When not to rely on it alone", body: "If the SAT wants an exact fractional answer and the graph gives only a decimal estimate, use the graph to guide your algebra and finish exactly." },
    ],
    tryIt: {
      prompt: "Solve the system by graphing",
      task: "These equations are already loaded. In the SAT interface, tap the intersection point and read the coordinates as the system's solution.",
      hints: [
        "If you cannot see the crossing, zoom out a little.",
        "A clicked intersection is usually faster than substitution with ugly coefficients.",
        "Always read x and y in the correct order.",
      ],
      starterExpressions: [
        { id: "s1", latex: "2x-5y=9", color: "#60a5fa" },
        { id: "s2", latex: "y=4x+5", color: "#f5c518" },
      ],
    },
    practiceQuestions: [
      theory(
        "What does the intersection of two lines on Desmos represent?",
        ["The slope of one line", "The solution to the system", "Only the y-intercept", "No solution ever"],
        1,
        "The intersection point satisfies both equations at the same time."
      ),
      theory(
        "If both equations graph as the same line, what is the system type?",
        ["No solution", "One solution", "Infinitely many solutions", "Undefined"],
        2,
        "Identical lines mean every point on that line satisfies both equations."
      ),
      desmos(
        "Graph 2x - 5y = 9 and y = 4x + 5. Tap the intersection. What is the approximate x-coordinate?",
        ["-1.89", "0", "2.56", "4"],
        0,
        "Desmos shows the intersection near x ≈ -1.889 for this BWS system.",
        "Type 2x-5y=9 and y=4x+5 on separate lines, then tap the crossing point.",
        ["Zoom out if you cannot see the intersection.", "Read x first, then y."]
      ),
      desmos(
        "Using the same graphs, what is the approximate y-coordinate at the intersection?",
        ["-2.56", "0", "1.89", "5"],
        0,
        "The intersection is near (-1.889, -2.556), so y ≈ -2.56.",
        "Keep both equations from the previous question and read the y-value from the labeled point.",
        ["Order matters: (x, y) not (y, x).", "Use the graph to guide algebra if an exact fraction is needed."]
      ),
    ],
  },
  {
    id: "absolute-value",
    title: "Absolute Value Equations",
    subtitle: "Graph to find all solutions",
    icon: "││",
    whenToUse: [
      "An equation has absolute value and you want to avoid missing one branch.",
      "You need to see where a V-shape hits a line or another graph.",
      "You want to confirm a two-case algebra setup visually.",
    ],
    avoidWhen: [
      "The equation splits instantly into two easy linear cases.",
      "The graph only gives approximations but an exact symbolic answer is required.",
      "The question is really about manipulation, not solving.",
    ],
    workflow: [
      "Graph y = the absolute value expression.",
      "Graph the target value or right-hand side.",
      "Find the intersection x-values.",
      "Check whether there are two, one, or zero solutions.",
    ],
    guideSteps: [
      { title: "Core idea", body: "Absolute value graphs make the hidden two-case structure visible. Graphing helps because many students forget an absolute value equation can produce two solutions." },
      { title: "What to graph", body: "For |x - 4| = 9, graph y = |x - 4| and y = 9. The x-values where they intersect are the solutions." },
      { title: "BWS example", body: "Desmos shows intersections at x = -5 and x = 13, matching the algebraic split x - 4 = 9 and x - 4 = -9." },
      { title: "Why this helps", body: "If you are unsure whether there should be 0, 1, or 2 answers, the graph makes that visible immediately." },
    ],
    tryIt: {
      prompt: "Solve |x - 4| = 9 graphically",
      task: "The V-shape and horizontal line are preloaded. On the SAT, tap both intersections and read the x-values.",
      hints: [
        "The vertex of y = |x - 4| is at (4, 0).",
        "A horizontal line can cut a V-shape twice, once, or not at all.",
        "Use algebra afterward if the prompt asks for an exact form.",
      ],
      starterExpressions: [
        { id: "av", latex: "y=|x-4|", color: "#60a5fa" },
        { id: "h", latex: "y=9", color: "#f5c518" },
      ],
    },
    practiceQuestions: [
      theory(
        "The graph of y = |x - 4| has what shape?",
        ["A parabola opening up", "A V-shape with vertex at (4, 0)", "A straight line through the origin", "A circle"],
        1,
        "Absolute value graphs make a V-shape centered at the expression inside the bars."
      ),
      theory(
        "If |x - 4| = -1 (a negative number), how many real solutions exist?",
        ["2", "1", "0", "Infinitely many"],
        2,
        "An absolute value cannot equal a negative number, so there are no real solutions."
      ),
      desmos(
        "Graph y = |x - 4| and y = 9. Tap both intersections. Which pair of x-values is correct?",
        ["x = 5 and x = 13", "x = -5 and x = 13", "x = -9 and x = 9", "x = 4 only"],
        1,
        "The graph crosses y = 9 at x = -5 and x = 13.",
        "Type y=|x-4| and y=9, then tap each intersection to read the x-values.",
        ["The vertex is at (4, 0).", "A horizontal line can cut a V-shape twice."]
      ),
      desmos(
        "For |x - 4| = 9 graphed above, how many solutions does the equation have?",
        ["0", "1", "2", "Infinitely many"],
        2,
        "Two intersections mean two solutions: x = -5 and x = 13.",
        "Count the intersection points between y = |x - 4| and y = 9.",
        ["Graphing helps you avoid missing the second branch.", "Use algebra afterward if an exact form is required."]
      ),
    ],
  },
  {
    id: "inequalities",
    title: "Visualizing Inequalities",
    subtitle: "Use shading to test regions and points",
    icon: "◧",
    whenToUse: [
      "A question asks whether a point lies in a solution set.",
      "You need the overlap of two or more inequalities.",
      "Seeing the feasible region is faster than symbolic manipulation.",
    ],
    avoidWhen: [
      "A single inequality solves cleanly in one line.",
      "You need interval notation rather than a visual answer.",
      "You are not paying attention to strict vs inclusive boundaries.",
    ],
    workflow: [
      "Type each inequality directly into Desmos.",
      "Identify the darkest overlapping region.",
      "Check whether the candidate point lies inside it.",
      "Watch the boundary style: dashed for < or >, solid for <= or >=.",
    ],
    guideSteps: [
      { title: "Core idea", body: "Desmos shades inequalities automatically, so systems of inequalities become a visual problem instead of a multi-step algebra problem." },
      { title: "Most useful SAT move", body: "If the prompt asks whether a point is in the solution set, graph the inequalities and look for the overlap. This is often faster than plugging into each inequality one by one." },
      { title: "BWS example", body: "For y < 2x - 6 and 3x + y > 5, the darkest overlap is the shared solution region. Point (4, 5) is outside it, so it is not a solution." },
      { title: "Boundary reminder", body: "Strict inequalities use dashed boundaries; inclusive inequalities use solid boundaries. A point on a dashed line is not included." },
    ],
    tryIt: {
      prompt: "Is (4, 5) in the solution set?",
      task: "These inequalities are already loaded. On the SAT, focus on the darkest overlap and check whether (4, 5) lands inside it.",
      hints: [
        "Darkest overlap means all inequalities are satisfied together.",
        "A point on the wrong side of even one line is out.",
        "Dashed boundaries matter when the inequality is strict.",
      ],
      starterExpressions: [
        { id: "i1", latex: "y<2x-6", color: "#60a5fa" },
        { id: "i2", latex: "3x+y>5", color: "#a78bfa" },
        { id: "pt", latex: "(4,5)", color: "#f5c518" },
      ],
    },
    practiceQuestions: [
      theory(
        "In a system of inequalities on Desmos, the darkest shaded region shows:",
        ["Only the first inequality", "Points satisfying all inequalities at once", "The y-intercept", "Parallel lines"],
        1,
        "The overlap is the set of points that satisfy every inequality."
      ),
      theory(
        "What does a dashed boundary line mean on an inequality graph?",
        ["The boundary is always included", "The inequality is strict—points on the line are excluded", "The graph is approximate only", "No solution exists"],
        1,
        "Dashed lines are for < or >, so the boundary itself is not part of the solution."
      ),
      desmos(
        "Graph y < 2x - 6 and 3x + y > 5. Is the point (4, 5) in the darkest overlapping region?",
        ["Yes", "No"],
        1,
        "Point (4, 5) lies outside the shared shaded region, so it is not a solution to the system.",
        "Type y<2x-6 and 3x+y>5. Optionally plot (4,5) to check visually.",
        ["Darkest overlap = all inequalities satisfied.", "A point on the wrong side of even one line fails."]
      ),
      desmos(
        "With the same two inequalities graphed, how should you test whether a candidate point works?",
        ["Solve each inequality for x symbolically", "See whether the point lies in the overlapping shaded region", "Use linear regression", "Add a slider for the point"],
        1,
        "Graph the system and check whether the point lands inside the darkest overlap.",
        "Graph y<2x-6 and 3x+y>5, then compare where (4,5) sits relative to the overlap.",
        ["Visual check is often faster than plugging into each inequality.", "Watch dashed vs solid boundaries."]
      ),
    ],
  },
  {
    id: "parabolas",
    title: "Parabolas",
    subtitle: "Use Desmos for vertices and roots",
    icon: "⌒",
    whenToUse: [
      "You need the vertex or x-intercepts quickly.",
      "The quadratic is awkward and graphing is faster than completing the square.",
      "You want to verify whether a parabola opens up or down.",
    ],
    avoidWhen: [
      "The quadratic factors in one obvious step.",
      "The test asks for an exact symbolic transformation.",
      "A tiny algebra step already gives the feature instantly.",
    ],
    workflow: [
      "Graph the quadratic directly.",
      "Tap the gray labeled point for the vertex.",
      "Tap x-intercepts if the problem asks for zeros.",
      "Use the graph to confirm opening direction and rough shape.",
    ],
    guideSteps: [
      { title: "Core idea", body: "Desmos turns quadratics into instantly readable pictures. Instead of working through the vertex formula or completing the square, you can often just graph and tap the feature you need." },
      { title: "What Desmos labels", body: "When possible, Desmos places gray points at the vertex and x-intercepts. Those are exactly the features many SAT quadratic questions ask about." },
      { title: "BWS example", body: "For y = -2x^2 + 3, Desmos shows the vertex at (0, 3). Since the leading coefficient is negative, the parabola opens downward." },
      { title: "Best use case", body: "Use this when the SAT wants a vertex, max/min point, or roots and the algebra would take longer than simply graphing the function." },
    ],
    tryIt: {
      prompt: "Find the vertex of y = -2x^2 + 3",
      task: "This parabola is loaded already. In the SAT interface, tap the gray point at the top to read the vertex.",
      hints: [
        "The vertex is the highest or lowest point of the parabola.",
        "A negative leading coefficient means the parabola opens downward.",
        "Desmos often labels the roots too if they are visible.",
      ],
      starterExpressions: [{ id: "par", latex: "y=-2x^2+3", color: "#60a5fa" }],
    },
    practiceQuestions: [
      theory(
        "If a parabola opens downward, what does its vertex represent?",
        ["A minimum", "A maximum", "An x-intercept", "A slope"],
        1,
        "A downward-opening parabola has a highest point, so the vertex is a maximum."
      ),
      theory(
        "When is graphing a quadratic on Desmos especially helpful?",
        ["When you need the vertex or roots quickly", "Only for circles", "Only when there is no x-term", "Never on the SAT"],
        0,
        "Desmos is especially strong for feature-finding on quadratics."
      ),
      desmos(
        "Graph y = -2x^2 + 3 and tap the gray vertex label. What are the coordinates?",
        ["(0, -3)", "(0, 3)", "(3, 0)", "(-2, 3)"],
        1,
        "Desmos labels the vertex at (0, 3) for this parabola.",
        "Type y=-2x^2+3 and tap the gray point at the top of the parabola.",
        ["A negative leading coefficient means the parabola opens downward.", "The vertex is the highest or lowest point."]
      ),
      desmos(
        "For the same graph y = -2x^2 + 3, does the parabola open up or down?",
        ["Up", "Down"],
        1,
        "The coefficient -2 is negative, so the parabola opens downward.",
        "Graph y=-2x^2+3 and look at the direction the arms point.",
        ["Opening direction comes from the sign of the x^2 coefficient.", "Downward opening means the vertex is a maximum."]
      ),
    ],
  },
  {
    id: "circles",
    title: "Graphing Circles",
    subtitle: "Read center and radius from standard form",
    icon: "○",
    whenToUse: [
      "A circle equation is given in standard form.",
      "You want to verify center, radius, or whether a point lies on the circle.",
      "A visual check is faster than mentally sketching the graph.",
    ],
    avoidWhen: [
      "The equation is not yet in standard form.",
      "The question only needs a direct symbolic read and no graph.",
      "You can already read the center and radius instantly from the equation.",
    ],
    workflow: [
      "Type the circle equation exactly as given.",
      "Recognize (x - h)^2 + (y - k)^2 = r^2.",
      "Read center from h and k, radius from r.",
      "Use the graph to confirm your interpretation.",
    ],
    guideSteps: [
      { title: "Core idea", body: "Desmos is especially useful for circle questions because it draws the full circle immediately, making center and radius easier to visualize than on many handheld calculators." },
      { title: "Standard form reminder", body: "In (x - h)^2 + (y - k)^2 = r^2, the center is (h, k) and the radius is r. Watch the signs carefully: x - 2 means center x = 2, not -2." },
      { title: "BWS example", body: "For (x - 2)^2 + (y - 5)^2 = 25, the center is (2, 5) and the radius is 5." },
      { title: "When to use it", body: "Use Desmos when the problem is graph-heavy, when you need a quick visual confirmation, or when you want to test whether a point lies on the circle." },
    ],
    tryIt: {
      prompt: "Graph (x - 2)^2 + (y - 5)^2 = 25",
      task: "This circle is preloaded. On the SAT, look for the center and compare the radius to the graph's width and height.",
      hints: [
        "The radius is the square root of the right side.",
        "If the sign inside the parentheses is minus, the center coordinate is positive.",
        "A radius of 5 means 5 units from center to edge in every direction.",
      ],
      starterExpressions: [{ id: "circ", latex: "(x-2)^2+(y-5)^2=25", color: "#60a5fa" }],
    },
    practiceQuestions: [
      theory(
        "In standard form (x - h)^2 + (y - k)^2 = r^2, what common sign mistake should you avoid?",
        ["Forgetting to square the radius", "Reading x - 2 as center x = -2", "Using the % key", "Turning the equation into regression"],
        1,
        "The sign inside the parentheses is opposite the sign of the center coordinate."
      ),
      theory(
        "Why is Desmos useful for circles on the SAT?",
        ["It immediately renders the whole circle for visual confirmation", "It turns every circle into a line", "It avoids all algebra", "It only works with tangent lines"],
        0,
        "The visual makes center and radius easier to verify."
      ),
      desmos(
        "Graph (x - 2)^2 + (y - 5)^2 = 25. What is the center of the circle?",
        ["(-2, -5)", "(2, 5)", "(5, 2)", "(25, 25)"],
        1,
        "From standard form, the center is (2, 5).",
        "Type (x-2)^2+(y-5)^2=25 and identify the center from the equation or graph.",
        ["x - 2 means h = 2, not -2.", "The center is inside the circle, not on the edge."]
      ),
      desmos(
        "Using the same circle equation, what is the radius?",
        ["2", "5", "25", "50"],
        1,
        "Since r^2 = 25, the radius r = 5.",
        "Keep (x-2)^2+(y-5)^2=25 graphed. Radius is the square root of the right-hand side.",
        ["r^2 is on the right side of the equation.", "A radius of 5 means 5 units from center to edge."]
      ),
    ],
  },
  {
    id: "mean-median",
    title: "Mean and Median",
    subtitle: "Use built-in statistics functions",
    icon: "📊",
    whenToUse: [
      "The SAT asks for mean or median of a raw list of numbers.",
      "The list is long enough that manual sorting or arithmetic is annoying.",
      "You want a quick check on a statistics question before submitting.",
    ],
    avoidWhen: [
      "There are only two or three easy numbers and mental math is instant.",
      "The question is about interpretation rather than calculation.",
      "You have not copied the full data set accurately into Desmos.",
    ],
    workflow: [
      "Type mean(...) or median(...) directly.",
      "Separate values with commas.",
      "Read the computed output.",
      "Double-check that every number from the prompt is included.",
    ],
    guideSteps: [
      { title: "Core idea", body: "Desmos has built-in statistics functions, so you do not need to hand-calculate the mean or sort a long list for the median unless the question specifically wants reasoning." },
      { title: "What to type", body: "Use mean(2,5,9,...) or median(2,5,9,...). Desmos handles both the arithmetic and the ordering work for you." },
      { title: "BWS example", body: "For 2, 5, 9, 10, 18, 20, 40, 38, enter both mean(...) and median(...) on separate lines to compare the two measures quickly." },
      { title: "When to be careful", body: "This method is only as accurate as your input. One missed number or typo changes the result." },
    ],
    tryIt: {
      prompt: "Calculate mean and median",
      task: "These functions are already loaded. In the SAT interface, compare the two values and notice whether the larger numbers pull the mean above the median.",
      hints: [
        "Median is the middle value after ordering.",
        "Mean can be pulled by outliers.",
        "Typing the function is usually faster than sorting by hand.",
      ],
      starterExpressions: [
        { id: "mean", latex: "\\operatorname{mean}(2,5,9,10,18,20,40,38)", color: "#60a5fa" },
        { id: "med", latex: "\\operatorname{median}(2,5,9,10,18,20,40,38)", color: "#f5c518" },
      ],
    },
    practiceQuestions: [
      theory(
        "Which measure is usually more affected by very large outliers?",
        ["Median", "Mean", "Mode", "Range"],
        1,
        "The mean is more sensitive to extreme values."
      ),
      theory(
        "What is the biggest risk when using mean() or median() on Desmos?",
        ["Desmos cannot handle commas", "Typing one data value incorrectly", "The answer always rounds badly", "You must graph an axis first"],
        1,
        "Input mistakes are the main risk—one missed number changes the result."
      ),
      desmos(
        "Type mean(2,5,9,10,18,20,40,38) in Desmos. What value do you get?",
        ["15", "16.5", "17.75", "18"],
        2,
        "Desmos computes the mean as 17.75 for this data set.",
        "Type mean(2,5,9,10,18,20,40,38) exactly—commas between every value.",
        ["Double-check you included all eight numbers.", "mean() handles the arithmetic for you."]
      ),
      desmos(
        "Type median(2,5,9,10,18,20,40,38) on a separate line. What median does Desmos return?",
        ["9", "10", "14", "15"],
        2,
        "The median of the sorted list is 14 (average of 10 and 18).",
        "Type median(2,5,9,10,18,20,40,38) and read the computed output.",
        ["median() sorts for you—you do not need to order by hand.", "With an even count, median is the average of the two middle values."]
      ),
    ],
  },
  {
    id: "fractions",
    title: "Fraction Shortcut",
    subtitle: "Convert decimals into simplified fractions",
    icon: "½",
    whenToUse: [
      "You have a decimal result but the SAT answer should be a fraction.",
      "You want to avoid manual decimal-to-fraction conversion errors.",
      "A student-produced response is cleaner in fraction form.",
    ],
    avoidWhen: [
      "The decimal is already the accepted final format.",
      "You have not confirmed the decimal itself is correct.",
      "The problem wants a percent or another interpretation instead.",
    ],
    workflow: [
      "Type or obtain the decimal result in Desmos.",
      "Use the fraction button on the keypad.",
      "Read the simplified fraction.",
      "Make sure the prompt actually wants a fraction form.",
    ],
    guideSteps: [
      { title: "Core idea", body: "Desmos can help after the math is already done: if you get a decimal and want a cleaner fraction answer, use the fraction shortcut instead of converting by hand." },
      { title: "Best time to use it", body: "This is especially helpful on student-produced response problems where a simple fraction is clearer and safer than a repeating or awkward decimal." },
      { title: "Simple example", body: "If your result is 0.75, the fraction shortcut gives 3/4, saving a quick but error-prone hand conversion." },
      { title: "Important reminder", body: "The shortcut does not fix a wrong decimal. Make sure the original calculation is correct first." },
    ],
    tryIt: {
      prompt: "Explore 0.75 on Desmos",
      task: "This lesson loads the decimal directly. In the SAT interface, you would use the keypad's fraction control after entering the decimal result.",
      hints: [
        "Use this after you already have the decimal answer.",
        "The goal is simplification, not re-solving the problem.",
        "Always match the answer format the question wants.",
      ],
      starterExpressions: [{ id: "dec", latex: "0.75", color: "#60a5fa" }],
    },
    practiceQuestions: [
      theory(
        "When is the fraction shortcut most useful?",
        ["Before solving the question", "After you already have the correct decimal result", "Only on inequalities", "Only on reading questions"],
        1,
        "It is a post-calculation shortcut, not a solving method by itself."
      ),
      theory(
        "What should you verify before using the fraction shortcut?",
        ["That the decimal result itself is correct", "That the graph is a circle", "That the y-intercept is positive", "That the mean is an integer"],
        0,
        "A shortcut cannot rescue a wrong underlying answer."
      ),
      desmos(
        "Type 0.75 in Desmos, then use the fraction keypad button. What simplified fraction do you get?",
        ["1/4", "3/4", "75/100", "7/5"],
        1,
        "0.75 converts to the simplified fraction 3/4.",
        "Enter 0.75, then tap the fraction conversion button on the Desmos keypad.",
        ["Use this after you already have the correct decimal.", "Match the answer format the question wants."]
      ),
      desmos(
        "You get 0.125 as a decimal result. After using the fraction shortcut in Desmos, what fraction should you see?",
        ["1/4", "1/8", "125/1000", "2/5"],
        1,
        "0.125 simplifies to 1/8.",
        "Type 0.125 and apply the fraction conversion button.",
        ["The shortcut simplifies automatically.", "Confirm the original decimal was correct first."]
      ),
    ],
  },
  {
    id: "percents",
    title: "Percent Calculations",
    subtitle: "Type percent expressions directly",
    icon: "%",
    whenToUse: [
      "The prompt literally asks for a percent of a number.",
      "You want to avoid an extra decimal-conversion step.",
      "A word problem hides a percent calculation inside a larger setup.",
    ],
    avoidWhen: [
      "The question is about percent increase/decrease reasoning, not just direct computation.",
      "You have not identified the base amount correctly.",
      "The problem asks for the percent rate itself, not the resulting part.",
    ],
    workflow: [
      "Type the percent using the % key.",
      "Apply it to the base amount.",
      "Read the numeric result.",
      "Check whether the prompt wanted the part, the whole, or the rate.",
    ],
    guideSteps: [
      { title: "Core idea", body: "Desmos can evaluate percent notation directly, which saves you from manually converting 20% into 0.20 every time." },
      { title: "Best use case", body: "Use this on direct percent-of-number questions or as a quick arithmetic check inside a larger word problem." },
      { title: "BWS example", body: "For 20% of 700, type the percent directly and Desmos returns 140." },
      { title: "Big caution", body: "This shortcut is great for direct percent arithmetic, but you still need to understand what quantity the percent is being applied to." },
    ],
    tryIt: {
      prompt: "Compute 20% of 700",
      task: "This lesson preloads the percent expression. In the SAT interface, you can type percent notation directly instead of converting to a decimal first.",
      hints: [
        "Be sure you know the base amount before typing.",
        "Percent notation is fast, but only if the setup is right.",
        "Check whether the problem wants the part or the rate.",
      ],
      starterExpressions: [{ id: "pct", latex: "20\\%\\cdot700", color: "#60a5fa" }],
    },
    practiceQuestions: [
      theory(
        "What is the main advantage of percent notation in Desmos?",
        ["It skips the question setup", "It avoids manual percent-to-decimal conversion", "It only works for 50%", "It graphs a parabola"],
        1,
        "Desmos lets you type the percent expression directly."
      ),
      theory(
        "When is percent notation not enough by itself?",
        ["When the problem requires a larger word-problem setup first", "When the answer choices are numbers", "When the question mentions a discount", "Never"],
        0,
        "The shortcut handles arithmetic, but not the setup logic."
      ),
      desmos(
        "Type 20% * 700 in Desmos (use the % key). What result do you get?",
        ["14", "140", "7000", "0.2"],
        1,
        "20% of 700 is 140.",
        "Type 20%·700 or 20%*700 using Desmos percent notation.",
        ["Identify the base amount (700) before typing.", "Percent notation skips converting to 0.20 manually."]
      ),
      desmos(
        "Type 15% * 840 in Desmos. What is the result?",
        ["84", "126", "140", "840"],
        1,
        "15% of 840 equals 126.",
        "Type 15%·840 using the percent key.",
        ["Make sure 840 is the quantity the percent applies to.", "Read the numeric output Desmos displays."]
      ),
    ],
  },
];

export function getDesmosLessonById(id: string): DesmosLesson | undefined {
  return DESMOS_LESSONS.find((l) => l.id === id);
}
