// Original instructional content with worked examples; question-bank expansion is a separate phase.
export const PRECALCULUS_CONTENT = {
  "lessons": [
    {
      "id": "ap-precalculus-1-1-lesson",
      "title": "1.1 Rates of change, covariation, and polynomial models",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Rates of change, covariation, and polynomial models"
        },
        {
          "type": "subheading",
          "text": "Unit Context and Prerequisites"
        },
        {
          "type": "text",
          "text": "This lesson belongs to Unit 1, Polynomial and Rational Functions, which is assessed on the AP Precalculus exam. We review rate of change without using calculus, relying on algebraic properties. Prerequisites include solving linear equations and understanding function notation. The average rate of change of a function $f(x)$ on an interval $[a, b]$ is defined as the slope of the secant line: $\\frac{f(b) - f(a)}{b - a}$. This measures covariation, or how $y$ changes relative to $x$. For polynomial models, recognizing the degree helps predict long-run behavior and the number of turning points. We assume students can evaluate functions and find intercepts using standard algebraic methods."
        },
        {
          "type": "subheading",
          "text": "Method for Calculating Average Rate of Change"
        },
        {
          "type": "text",
          "text": "To calculate the average rate of change, identify two distinct $x$-values, $a$ and $b$. Evaluate the function at $x=a$ to find $f(a)$ and at $x=b$ to find $f(b)$. Subtract $f(a)$ from $f(b)$ and divide the result by $b - a$. This formula works for any polynomial function over any interval where $a \\neq b$. When analyzing covariation, compare rates of change over adjacent intervals. If the magnitude of the rate increases, the function is accelerating in change. If the signs alternate, the function is oscillating in direction. Always verify the domain to ensure both $x$-values are valid inputs. For a piecewise definition, use the appropriate rule at each endpoint. The secant-slope formula only requires two defined endpoint values and distinct inputs; a contextual interpretation may need additional restrictions."
        },
        {
          "type": "subheading",
          "text": "Worked Example with Polynomial Model"
        },
        {
          "type": "text",
          "text": "Consider the polynomial model height $h(t) = -16t^2 + 64t$, where $t$ represents time in seconds and $h$ is height in feet. First, find the average rate of change from $t=1$ to $t=3$. Evaluate $h(1) = -16(1)^2 + 64(1) = 48$. Evaluate $h(3) = -16(3)^2 + 64(3) = -144 + 192 = 48$. The change in height is $48 - 48 = 0$. The change in time is $3 - 1 = 2$. The average rate of change is $0/2 = 0$ ft/s. Next, find the average rate of change from $t=2$ to $t=4$. $h(2) = -16(4) + 128 = 64$. $h(4) = -16(16) + 256 = 0$. The change in height is $0 - 64 = -64$. The change in time is $4 - 2 = 2$. The rate is $-64/2 = -32$ ft/s. The first interval has zero net height change even though the object rises and falls. The second has an average downward velocity of 32 ft/s. Average rates describe whole intervals; zero average does not mean the object was stationary throughout."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Domain Constraints"
        },
        {
          "type": "text",
          "text": "A frequent error is swapping the order of subtraction in the numerator or denominator, leading to a sign error. Always compute $f(b) - f(a)$ and $b - a$ consistently. Another mistake is assuming the average rate of change equals the instantaneous rate, which is invalid without calculus. For rational functions examined in this unit, ensure the denominator is non-zero for both endpoints. A vertical asymptote between the endpoints does not by itself make the endpoint secant slope undefined: the formula uses only f(a), f(b), and b − a. Continuity throughout the interval is needed for some later theorems, not for this arithmetic definition. Students often forget to check if $b - a = 0$, which would make the slope undefined and indicate a vertical line, not a function interval."
        },
        {
          "type": "subheading",
          "text": "Transfer Application to Rational Models"
        },
        {
          "type": "text",
          "text": "Apply this method to the rational function $R(x) = \\frac{x}{x-2}$, which models cost per unit. Find the average rate of change from $x=3$ to $x=5$. Note the domain excludes $x=2$. Evaluate $R(3) = 3/1 = 3$. Evaluate $R(5) = 5/3 \\approx 1.67$. The change in $y$ is $5/3 - 3 = -4/3$. The change in $x$ is $5 - 3 = 2$. The average rate is $(-4/3)/2 = -2/3$. This negative value indicates cost per unit decreases as production increases. Compare this to a polynomial model where rates may change sign. In transfer tasks, verify that both endpoints are in the domain and that b ≠ a. Then separately check whether the entire interval is physically meaningful for the contextual model."
        }
      ],
      "practiceQuestions": [
        {
          "question": "For the function $f(x) = x^2 - 4x + 3$, what is the average rate of change on the interval $[0, 4]$?",
          "choices": [
            "-2",
            "2",
            "0",
            "4"
          ],
          "answer": 2,
          "explanation": "Calculate $f(0) = 0 - 0 + 3 = 3$. Calculate $f(4) = 16 - 16 + 3 = 3$. The difference in $f$ is $3 - 3 = 0$. The difference in $x$ is $4 - 0 = 4$. The rate is $0/4 = 0$.",
          "id": "ap-precalculus-1-1-q1",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "If a ratio function $g(x) = \\frac{1}{x}$ is evaluated from $x=1$ to $x=2$, what is the average rate of change?",
          "choices": [
            "-0.5",
            "0.5",
            "-1",
            "1"
          ],
          "answer": 0,
          "explanation": "Calculate $g(1) = 1$. Calculate $g(2) = 0.5$. The difference in $y$ is $0.5 - 1 = -0.5$. The difference in $x$ is $2 - 1 = 1$. The rate is $-0.5/1 = -0.5$ which is $-1/2$.",
          "id": "ap-precalculus-1-1-q2",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "For the polynomial $p(x) = x^3$, on which interval is the average rate of change equal to $7$?",
          "choices": [
            "[0, 1]",
            "[1, 2]",
            "[2, 3]",
            "[0, 2]"
          ],
          "answer": 1,
          "explanation": "Test [1, 2]: $p(2)=8, p(1)=1$. Rate is $(8-1)/(2-1) = 7/1 = 7$. Test [0,1]: $(1-0)/1 = 1$. Test [2,3]: $(27-8)/1 = 19$. The correct interval is [1, 2].",
          "id": "ap-precalculus-1-1-q3",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "For f(x) = (x+1)/(x−3), what is the average rate of change determined by the endpoint values at x=2 and x=4?",
          "choices": [
            "4",
            "Undefined solely because x=3 is between the endpoints",
            "−4",
            "0"
          ],
          "answer": 0,
          "explanation": "f(2)=−3 and f(4)=5, so the endpoint secant slope is [5−(−3)]/(4−2)=4. The function is undefined at x=3, but continuity between the two inputs is not required for this endpoint calculation. That discontinuity would matter for a theorem requiring continuity or for a physical model spanning the whole interval.",
          "id": "ap-precalculus-1-1-q4",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-precalculus-1-2-lesson",
      "title": "1.2 Zeros, multiplicity, transformations, and equivalent forms",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Zeros, multiplicity, transformations, and equivalent forms"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Core Definitions"
        },
        {
          "type": "text",
          "text": "To analyze polynomial structure, students must first master the Factor Theorem: if $P(c)=0$, then $(x-c)$ is a factor of $P(x)$. Multiplicity defines the exponent $k$ in a factor $(x-c)^k$. Odd multiplicities imply the graph crosses the x-axis at $c$, while even multiplicities imply the graph touches the axis and continues in the same direction (turning point). Understanding these behaviors allows for root location without graphing."
        },
        {
          "type": "subheading",
          "text": "Method: Analyzing Equivalent Forms"
        },
        {
          "type": "text",
          "text": "Polynomials exist in Standard Form ($a_n x^n + \\dots$) and Factored Form ($a(x-r_1)\\dots(x-r_n)$). Converting between these forms exploits the properties of functions. For instance, evaluating a polynomial at a specific $x$-value in factored form is computationally efficient. Additionally, geometric transformations apply to any function $f(x)$. A transformation $y = a\\cdot f(b(x-h)) + k$ shifts the parent graph $f(x)$ right by $h$, scales vertically by $a$, and shifts up by $k$. These rules are invariant regardless of whether $f$ is linear or polynomial, providing a unified approach to sketching complex graphs. The factor b scales horizontal distances by 1/|b| when b ≠ 0; a negative b also reverses horizontal orientation about the shifted reference."
        },
        {
          "type": "subheading",
          "text": "Worked Example: Transformations and Zeros"
        },
        {
          "type": "text",
          "text": "Consider the mathematical function $f(x) = -2x^2 + 4x + 6$, written as $y = -2x^2 + 4x + 6$. We must identify its x-intercepts and compare it to a transformed version $g(x)$. First, convert $y$ to factored form by factoring out -2: $y = -2(x^2 - 2x - 3) = -2(x-3)(x+1)$. The zeros are at $x=3$ and $x=-1$. Now, consider $g(x) = 2 + f(x-1)$ where $f(x)$ is the original parabola. This transformation shifts the graph right by 1 and up by 2. The new y-intercept is found by setting $x=0$: $g(0) = 2 + f(-1)$. Since $f(-1)=0$, $g(0)=2$. This demonstrates how algebraic manipulation predicts geometric behavior without plotting points."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Conditions"
        },
        {
          "type": "text",
          "text": "Students frequently confuse horizontal and vertical shifts. For a function $f(x)$, a shift right by $h$ is written as $f(x-h)$, not $f(x+h)$. Another error is assuming all cubic polynomials have three distinct real roots; a cubic like $x^3$ has only one real root with multiplicity 3. Precision is critical when using calculators; in 'Approximate' mode, small decimals near a zero may obscure the integer value. A calculator can suggest a nearby zero, but a rounded result does not prove an exact root. Substitute the candidate into the original polynomial or verify a factor algebraically."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application"
        },
        {
          "type": "text",
          "text": "For a mathematical model, let P(x) = −x³ + 12x² − 47x + 60 and define q(x) = P(x − 1) − 2. This shifts the graph of P right by one and down by two. The horizontal shift alone moves each zero one unit right, but the additional vertical shift changes where the new graph crosses zero; do not simply shift the old zeros and stop. To locate a new zero without expanding the cubic, evaluate q(3) = P(2) − 2 = 6 − 2 = 4 and q(4) = P(3) − 2 = 0 − 2 = −2. Since this polynomial graph is continuous, at least one zero lies between 3 and 4. A graph or numerical solver can refine the estimate, while substitution checks any proposed exact value. A contextual profit interpretation would additionally require meaningful units and a feasible input domain."
        }
      ],
      "practiceQuestions": [
        {
          "question": "Given the polynomial $f(x) = (x-2)^3 (x+1)$, which of the following correctly describes the behavior of the graph at the x-axis?",
          "choices": [
            "The graph crosses the axis at $x=2$ and touches the axis at $x=-1$. ",
            "The graph touches the axis at $x=2$ and crosses the axis at $x=-1$. ",
            "The graph crosses the axis at both $x=2$ and $x=-1$. ",
            "The graph touches the axis at both $x=2$ and $x=-1$."
          ],
          "answer": 2,
          "explanation": "At x = 2 the factor (x − 2)³ has multiplicity three, which is odd, so the graph crosses the axis. At x = −1 the factor (x + 1) has multiplicity one, also odd, so the graph crosses there too. Even multiplicity would produce touching without crossing.",
          "id": "ap-precalculus-1-2-q1",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "If $f(x) = x^2 - 4$, what is the equation of the function $g(x)$ obtained by shifting $f(x)$ right by 3 units and down by 2 units?",
          "choices": [
            "$g(x) = (x+3)^2 - 4 - 2$",
            "$g(x) = (x-3)^2 - 4 + 2$",
            "$g(x) = (x-3)^2 - 4 - 2$",
            "$g(x) = (x+3)^2 - 4 + 2$"
          ],
          "answer": 2,
          "explanation": "A horizontal shift to the right by $h$ units replaces $x$ with $(x-h)$. Therefore, shifting right by 3 changes $x^2$ to $(x-3)^2$. A vertical shift down by $k$ units subtracts $k$ from the function. Shifting down by 2 subtracts 2 from the constant term. Combining these, the new function is $g(x) = (x-3)^2 - 4 - 2$.",
          "id": "ap-precalculus-1-2-q2",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A hypothetical plant's height $h(x)$ is modeled by a cubic polynomial with one real zero at $x=5$ with multiplicity 1. Which statement must be true about the graph?",
          "choices": [
            "The graph touches the x-axis at $x=5$ and turns around. ",
            "The graph crosses the x-axis at $x=5$. ",
            "The graph has no real zeros other than $x=5$. ",
            "The graph is tangent to the x-axis at $x=5$."
          ],
          "answer": 1,
          "explanation": "Multiplicities determine the interaction between a polynomial graph and the x-axis. An odd multiplicity (such as 1) indicates that the polynomial changes sign at the zero. Consequently, the graph crosses the x-axis at that point. Even multiplicities (like 2) do not change sign; the graph touches the axis and turns back, staying on the same side.",
          "id": "ap-precalculus-1-2-q3",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "If $f(x) = 2x^3$ and $g(x) = f(x+1) - 3$, what is the y-intercept of the graph of $g(x)$?",
          "choices": [
            "−1",
            "0",
            "1",
            "6"
          ],
          "answer": 0,
          "explanation": "The y-intercept is g(0). Substitute into the composition first: g(0) = f(1) − 3. Since f(1) = 2(1)³ = 2, the result is 2 − 3 = −1. Horizontal and vertical shifts must both be included.",
          "id": "ap-precalculus-1-2-q4",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-precalculus-1-3-lesson",
      "title": "1.3 Rational functions, restrictions, asymptotes, and inverses",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Rational functions, restrictions, asymptotes, and inverses"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Domain Restrictions"
        },
        {
          "type": "text",
          "text": "A rational function is defined as the quotient of two polynomial functions, written as $f(x) = \\frac{P(x)}{Q(x)}$. Because division by zero is undefined, the domain of a rational function consists of all real numbers except those where the denominator $Q(x) = 0$. These excluded values establish vertical domain restrictions. At an excluded input, cancel all common factors and inspect the remaining denominator. If that denominator is nonzero there, the restriction is a removable discontinuity, or hole. If the remaining denominator still vanishes there, the input can give a vertical asymptote despite the presence of a common factor. Identifying exact domain restrictions requires factoring both numerator and denominator completely before simplification, as canceling factors algebraically can mask the original domain restriction. Graphing calculators can help visualize these behaviors, but analysts must rely on algebraic limits and exact factorization to verify whether a restriction produces a hole or an infinite vertical asymptote."
        },
        {
          "type": "subheading",
          "text": "Asymptotic Behavior and End Behavior"
        },
        {
          "type": "text",
          "text": "After completely canceling common factors, real zeros of the remaining denominator give vertical asymptotes of the reduced rational expression. At least one one-sided magnitude becomes unbounded; track the signs on each side separately, and retain every original domain exclusion. Horizontal asymptotes describe the end behavior of the rational function as $x \\to \\pm\\infty$ and are determined by comparing the leading degrees of $P(x)$ and $Q(x)$. If the degree of the numerator is less than the degree of the denominator, the horizontal asymptote is $y = 0$. If the degrees are equal, the horizontal asymptote is the ratio of the leading coefficients, $y = \\frac{a_n}{b_m}$. If the degree of the numerator exceeds the degree of the denominator by exactly one, the function exhibits an oblique, or slant, asymptote found via polynomial long division. Calculators are useful for observing global trends, but exact algebraic division is required to find the exact equation of any slant asymptote."
        },
        {
          "type": "subheading",
          "text": "Method for Finding Inverses"
        },
        {
          "type": "text",
          "text": "Finding the inverse of a rational function $f(x)$ requires swapping the input and output variables and solving the resulting equation for the new dependent variable. Given $y = \\frac{ax + b}{cx + d}$, the procedural steps begin by replacing $f(x)$ with $y$. Next, interchange every $x$ and $y$ to yield $x = \\frac{ay + b}{cy + d}$. Multiply both sides by the denominator $(cy + d)$ to clear fractions, distribute, and collect all terms containing $y$ on one side of the equation. Factor out $y$ as a common monomial factor, and divide by its binomial coefficient to isolate $y$. Finally, state the inverse function $f^{-1}(x)$ along with its restricted domain, which corresponds to the range of the original function. Exact algebraic manipulation is essential to ensure no sign errors occur during the transposition of terms."
        },
        {
          "type": "subheading",
          "text": "Multi-Step Worked Example"
        },
        {
          "type": "text",
          "text": "Consider the rational function $f(x) = \\frac{2x - 4}{x + 3}$. First, determine the domain by setting the denominator equal to zero: $x + 3 = 0$, which yields $x = -3$. Thus, the domain is $x \\neq -3$. The vertical asymptote is the line $x = -3$. To find the horizontal asymptote, compare the degrees of numerator and denominator, both of which are $1$. The ratio of leading coefficients gives $y = \\frac{2}{1} = 2$, so the horizontal asymptote is $y = 2$. Next, find the inverse function by setting $y = \\frac{2x - 4}{x + 3}$. Swap variables to get $x = \\frac{2y - 4}{y + 3}$. Multiply by $(y + 3)$ to obtain $x(y + 3) = 2y - 4$, which expands to $xy + 3x = 2y - 4$. Rearrange terms to group $y$ on one side: $xy - 2y = -3x - 4$. Factor out $y$: $y(x - 2) = -3x - 4$. Divide by $(x - 2)$ to yield the inverse $f^{-1}(x) = \\frac{-3x - 4}{x - 2}$. The domain of $f^{-1}(x)$ is $x \\neq 2$, matching the range of $f(x)$."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Applications"
        },
        {
          "type": "text",
          "text": "A frequent student error is canceling common factors between the numerator and denominator before identifying vertical domain restrictions, which leads to missing holes or incorrectly assuming an asymptote exists where only a point discontinuity belongs. Another common pitfall is misinterpreting calculator table outputs near vertical asymptotes, where rounding errors can display massive finite numbers instead of showing an undefined error. In applied contexts, rational functions model average cost curves in economics, where $C(x) = \\frac{Fixed + Variable \\cdot x}{x}$. As production volume $x$ increases, the horizontal asymptote represents the limiting average variable cost. Analysts use exact inverse functions to determine the required production volume needed to achieve a specific target average cost, relying on precise domain restrictions to ensure operational feasibility."
        }
      ],
      "practiceQuestions": [
        {
          "question": "What is the exact vertical asymptote of the rational function $f(x) = \\frac{3x + 6}{x^2 - 4}$?",
          "choices": [
            "x = 2",
            "x = -2",
            "x = -3",
            "There are no vertical asymptotes"
          ],
          "answer": 0,
          "explanation": "To find vertical asymptotes, factor the numerator and denominator completely: $f(x) = \\frac{3(x + 2)}{(x - 2)(x + 2)}$. The factor $(x + 2)$ cancels out, leaving a removable discontinuity (hole) at $x = -2$. The remaining factor in the denominator is $(x - 2)$, which equals zero at $x = 2$. Since this factor does not cancel, $x = 2$ is the exact equation of the vertical asymptote.",
          "id": "ap-precalculus-1-3-q1",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "What is the horizontal asymptote of the rational function $g(x) = \\frac{5x^2 - 3x + 1}{2x^2 + 7}$?",
          "choices": [
            "y = 0",
            "y = 5/2",
            "y = 2/5",
            "No horizontal asymptote"
          ],
          "answer": 1,
          "explanation": "The horizontal asymptote of a rational function is determined by comparing the leading degrees of the numerator and denominator polynomials. Here, both the numerator and denominator are quadratic polynomials of degree 2. Therefore, the horizontal asymptote is the ratio of their leading coefficients, which is $\\frac{5}{2}$. Graphing calculators confirm this end behavior as $x$ approaches positive and negative infinity.",
          "id": "ap-precalculus-1-3-q2",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "What is the inverse function $f^{-1}(x)$ for the rational function $f(x) = \\frac{x}{x - 4}$?",
          "choices": [
            "f^{-1}(x) = \\frac{x - 4}{x}",
            "f^{-1}(x) = \\frac{4x}{x - 1}",
            "f^{-1}(x) = \\frac{x}{x + 4}",
            "f^{-1}(x) = \\frac{-4x}{x - 1}"
          ],
          "answer": 1,
          "explanation": "To find the inverse, replace $f(x)$ with $y$, giving $y = \\frac{x}{x - 4}$. Swap variables: $x = \\frac{y}{y - 4}$. Multiply by $(y - 4)$ to get $x(y - 4) = y$, which expands to $xy - 4x = y$. Rearrange to group $y$ terms: $xy - y = 4x$. Factor out $y$: $y(x - 1) = 4x$. Divide by $(x - 1)$ to obtain $f^{-1}(x) = \\frac{4x}{x - 1}$. Algebraic verification confirms this matches the derived formula.",
          "id": "ap-precalculus-1-3-q3",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Why must domain restrictions be identified before simplifying a rational expression?",
          "choices": [
            "To ensure the calculator displays the graph correctly without scaling errors",
            "To prevent removable discontinuities (holes) from being incorrectly treated as valid domain points",
            "To calculate the exact y-intercept of the original function",
            "To determine the slope of any oblique asymptotes present"
          ],
          "answer": 1,
          "explanation": "Simplifying a rational expression by canceling common factors removes algebraic traces of certain domain restrictions, turning them into removable discontinuities (holes). If analysts do not identify these restrictions from the unsimplified denominator, they will mistakenly include those input values in the domain, violating the fundamental definition that division by zero is undefined.",
          "id": "ap-precalculus-1-3-q4",
          "domain": "Precalc: Polynomial and Rational Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-precalculus-2-1-lesson",
      "title": "2.1 Multiplicative change, growth, decay, and model interpretation",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Multiplicative change, growth, decay, and model interpretation"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Enrichment Context"
        },
        {
          "type": "text",
          "text": "This lesson belongs to Unit 2, Exponential and Logarithmic Functions, which is assessed on the AP Precalculus exam. Before studying exponential and logarithmic models, you must understand foundational concepts of functions, domains, and exponents. A transformed exponential function has the form $f(x) = a \\cdot b^x + c$, with a ≠ 0, b > 0, and b ≠ 1. Its initial value is f(0) = a + c, and its horizontal asymptote is y = c. The unshifted quantity f(x) − c has a constant multiplicative factor: increasing x by h multiplies this quantity by b^h. Raw output ratios f(x+h)/f(x) are constant only in the unshifted case c = 0 (where the ratio is defined). For a standard positive population model a > 0 and c = 0, b > 1 represents growth and 0 < b < 1 represents decay."
        },
        {
          "type": "subheading",
          "text": "Method for Analyzing Multiplicative Change, Growth, and Decay"
        },
        {
          "type": "text",
          "text": "To identify and construct exponential models from data or verbal descriptions, a systematic method is required. For an unshifted model A b^x, first compare ratios of nonzero outputs at equally spaced inputs. A one-unit ratio is b; an h-unit ratio is b^h. For a known vertical shift c, compare f(x) − c instead of raw outputs. If $b > 1$, the function models exponential growth, meaning quantities increase at an accelerating rate. If $0 < b < 1$, the function models exponential decay, meaning quantities decrease toward a horizontal asymptote. For a discrete per-unit percent change, write b = 1 + r using a signed decimal r; a decay of d percent has b = 1 − d/100. For the equivalent continuous form Ae^(kx), the rate constant is k = ln(b), not b − 1. When analyzing models, always justify the domain based on the physical or mathematical context; for instance, time $t$ often requires $t \\ge 0$, and logarithmic or complex root transformations require strict inequalities to avoid non-real numbers."
        },
        {
          "type": "subheading",
          "text": "Multi-step Worked Example"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical biological culture where the initial population of bacteria, measured in thousands, is modeled by the function $P(t) = 4.2 \\cdot (1.28)^t$, where $t$ represents time in hours. We wish to determine the multiplicative change over a 3-hour interval, find the hourly percent growth rate, and calculate the time required for the population to reach $20$ thousand units. First, the multiplicative change over any 3-hour interval is given by $b^3 = (1.28)^3 \\approx 2.097$, meaning the population more than doubles every 3 hours. Second, the hourly growth rate $r$ is extracted from the base: $1.28 = 1 + r$, yielding $r = 0.28$, or a $28\\%$ hourly growth rate. Third, to find when $P(t) = 20$, we set $20 = 4.2 \\cdot (1.28)^t$. Dividing both sides by $4.2$ gives $\\frac{20}{4.2} = (1.28)^t$. Applying logarithms to solve for $t$, we obtain $t = \\frac{\\ln(20/4.2)}{\\ln(1.28)} \\approx 6.322$ hours. We justify our calculator choice by utilizing natural logarithms, which provide exact analytical setup before rounding to appropriate decimal places."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Domain Conditions"
        },
        {
          "type": "text",
          "text": "Students frequently confuse additive change with multiplicative change, attempting to use linear slopes for exponential scenarios. Another common error is misinterpreting the base $b$. For instance, if a problem states that a quantity decreases by $15\\%$, the base is $b = 1 - 0.15 = 0.85$, not $-0.15$. Additionally, domain restrictions must be carefully justified. If an exponential model is derived from a physical scenario like radioactive decay or finance, the domain is often restricted to non-negative real numbers ($t \\ge 0$). Failing to check boundary conditions can lead to extraneous or physically impossible negative values. Furthermore, when using graphing calculators to find intersection points for exponential equations, ensure that the viewing window explicitly captures both the horizontal asymptote and the relevant intersection, avoiding misleading visual approximations."
        },
        {
          "type": "subheading",
          "text": "Transfer and Real-World Application"
        },
        {
          "type": "text",
          "text": "The principles of multiplicative change extend directly to financial mathematics, epidemiology, and environmental science. Consider a hypothetical environmental study tracking the concentration of a synthetic tracer in a freshwater lake. Initial measurements at $t = 0$ show a tracer concentration of $C(0) = 50$ milligrams per liter. Due to natural filtration, the concentration decays by $6.5\\%$ each day. The model is expressed as $C(t) = 50 \\cdot (0.935)^t$. Analysts use this model to predict when the concentration will drop below a safe regulatory threshold of $10$ milligrams per liter. By setting $10 = 50 \\cdot (0.935)^t$, students apply logarithmic inverses to isolate $t$, finding a modeled threshold-crossing time of approximately 23.947 days. The model predicts a concentration below 10 mg/L only after that crossing; with measurements at whole days, day 24 is the first whole day below the threshold. This application highlights how exponential decay models dictate real-world safety compliance and ecological management strategies without requiring calculus."
        }
      ],
      "practiceQuestions": [
        {
          "question": "A hypothetical investment grows according to the model $V(t) = 3500 \\cdot (1.045)^t$, where $t$ is measured in years. What is the exact multiplicative change in the investment value over a 4-year period?",
          "choices": [
            "$(1.045)^4$",
            "$3500 \\cdot (1.045)^4$",
            "$4.18$",
            "$1.045$."
          ],
          "answer": 0,
          "explanation": "The multiplicative change over a specific interval of length $\\Delta t$ for an exponential function $b^t$ is given by $b^{\\Delta t}$. Here, the base is $1.045$ and the interval length is $4$ years, yielding a multiplicative change of $(1.045)^4$. the response “$3500 \\cdot (1.045)^4$” incorrectly includes the initial value, the response “$4.18$” is a linear miscalculation, and the response “$1.045$” represents only a single year.",
          "id": "ap-precalculus-2-1-q1",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A hypothetical radioactive substance decays such that its mass decreases by $18\\%$ every hour. If the initial mass is $250$ grams, which of the following functions models the mass $M(t)$ after $t$ hours?",
          "choices": [
            "$M(t) = 250 \\cdot (0.18)^t$",
            "$M(t) = 250 - 0.18t$",
            "$M(t) = 250 \\cdot (0.82)^t$",
            "$M(t) = 250 \\cdot (1.18)^t$"
          ],
          "answer": 2,
          "explanation": "For exponential decay, the base $b$ is calculated as $1 - r$, where $r$ is the decimal rate of decrease. Since the decrease is $18\\%$ ($0.18$), the base is $1 - 0.18 = 0.82$. Thus, the model is $M(t) = 250 \\cdot (0.82)^t$. the response “$M(t) = 250 \\cdot (0.18)^t$” uses the decay rate as the base, the response “$M(t) = 250 - 0.18t$” incorrectly models linear change, and the response “$M(t) = 250 \\cdot (1.18)^t$” represents exponential growth.",
          "id": "ap-precalculus-2-1-q2",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which of the following statements correctly contrasts linear change and exponential change?",
          "choices": [
            "Linear change has a constant multiplicative factor, while exponential change has a constant additive rate of change.",
            "Linear change has a constant additive rate of change, while exponential change has a constant multiplicative factor.",
            "Both linear and exponential changes rely on constant multiplicative factors over equal input intervals.",
            "Linear change accelerates faster than exponential change for all positive real inputs."
          ],
          "answer": 1,
          "explanation": "Linear functions are characterized by constant additive changes (a constant slope), meaning equal increments in the input yield equal additions to the output. Exponential functions are characterized by constant multiplicative changes, meaning equal increments in the input yield equal proportional multiplications of the output. Therefore, the second option provides the correct contrast.",
          "id": "ap-precalculus-2-1-q3",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A hypothetical population of insects is modeled by $P(t) = 120 \\cdot (1.12)^t$, where $t$ is in days. Approximately how many days will it take for the population to double?",
          "choices": [
            "$6.12$ days",
            "$5.85$ days",
            "$8.31$ days",
            "$9.24$ days"
          ],
          "answer": 0,
          "explanation": "To find the doubling time, we set the population to twice the initial value: $240 = 120 \\cdot (1.12)^t$, which simplifies to $2 = (1.12)^t$. Taking the natural logarithm of both sides gives $t = \\frac{\\ln(2)}{\\ln(1.12)} \\approx \\frac{0.6931}{0.1133} \\approx 6.12$ days. Proper calculator use and logarithmic properties yield this exact decimal approximation.",
          "id": "ap-precalculus-2-1-q4",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-precalculus-2-2-lesson",
      "title": "2.2 Logarithms as inverses, equations, and domain conditions",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Logarithms as inverses, equations, and domain conditions"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Domain Conditions"
        },
        {
          "type": "text",
          "text": "Logarithms serve as the inverse operations of exponential functions. For any base $b > 0$ and $b \\neq 1$, the logarithmic function $f(x) = \\log_b(x)$ is defined exclusively for $x > 0$. This strict inequality arises because an exponential expression $b^y$ always yields a positive real output for any real input $y$. Consequently, when solving logarithmic equations or determining the domain of a logarithmic function, you must set the argument of the logarithm strictly greater than zero and solve the resulting inequality. Ignoring this domain condition often introduces extraneous solutions that must be discarded."
        },
        {
          "type": "subheading",
          "text": "Method for Solving Logarithmic Equations"
        },
        {
          "type": "text",
          "text": "To solve equations involving logarithms, first isolate the logarithmic term or combine multiple logarithms using the properties of logarithms (such as the product, quotient, and power rules) into a single logarithmic expression. Once the equation is in the form $\\log_b(expr) = c$, convert it to its exponential form: $expr = b^c$. For equations where logarithms appear on both sides with the same base, use the one-to-one property: if $\\log_b(A) = \\log_b(B)$, then $A = B$, provided $A > 0$ and $B > 0$. After finding potential algebraic solutions, always substitute them back into the original logarithmic arguments to verify that no argument is zero or negative."
        },
        {
          "type": "subheading",
          "text": "Worked Example: Solving a Logarithmic Equation"
        },
        {
          "type": "text",
          "text": "Consider the equation $\\log_2(x - 3) + \\log_2(x + 1) = 5$. First, determine the domain restrictions: $x - 3 > 0 \\implies x > 3$, and $x + 1 > 0 \\implies x > -1$. The stricter condition is $x > 3$. Next, apply the product property of logarithms to combine the left side: $\\log_2((x - 3)(x + 1)) = 5$. Expand the argument: $\\log_2(x^2 - 2x - 3) = 5$. Convert this logarithmic equation into its exponential form: $x^2 - 2x - 3 = 2^5$. Since $2^5 = 32$, we write $x^2 - 2x - 3 = 32$. Subtract 32 from both sides to form a quadratic equation: $x^2 - 2x - 35 = 0$. Factor the quadratic expression: $(x - 7)(x + 5) = 0$. This yields potential solutions $x = 7$ and $x = -5$. Checking these against our domain condition $x > 3$, we see that $x = 7$ is valid, but $x = -5$ is extraneous because it results in a negative argument in the original equation. Thus, the only solution is $x = 7$."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Calculator Choices"
        },
        {
          "type": "text",
          "text": "A frequent error is failing to check domain restrictions at the very beginning of a problem, leading to accepting invalid extraneous solutions. Another common mistake is misapplying logarithmic properties, such as writing $\\log_b(A + B)$ as $\\log_b(A) + \\log_b(B)$, which is mathematically incorrect. When evaluating logarithms with bases other than 10 or $e$ on a calculator, use the change of base formula: $\\log_b(x) = \\frac{\\ln(x)}{\\ln(b)}$ or $\\frac{\\log(x)}{\\log(b)}$. Change of base works whether or not a calculator provides a direct arbitrary-base logarithm entry. Use the available approved tool accurately and retain exact logarithmic expressions until the final approximation."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application"
        },
        {
          "type": "text",
          "text": "The principles of logarithmic inverses and domain constraints apply directly to solving exponential equations where variables appear in exponents with different bases. By taking the logarithm of both sides—often natural logarithm—and using the power property $\\ln(b^x) = x \\ln(b)$, exponential equations become linear equations that can be solved analytically. Furthermore, domain conditions ensure that mathematical models describing physical phenomena, such as pH levels in chemistry or decibel sound intensity in physics, remain within realistic, physically possible parameters where logarithmic arguments are strictly positive."
        }
      ],
      "practiceQuestions": [
        {
          "question": "What is the complete domain of the function $f(x) = \\log_3(5 - 2x)$?",
          "choices": [
            "$x < \\frac{5}{2}$",
            "$x > \\frac{5}{2}$",
            "$x \\leq \\frac{5}{2}$",
            "$x \\neq \\frac{5}{2}$"
          ],
          "answer": 0,
          "explanation": "To find the domain of a logarithmic function, the argument must be strictly greater than zero. Therefore, set $5 - 2x > 0$. Subtracting 5 from both sides gives $-2x > -5$. Dividing by $-2$ and reversing the inequality sign yields $x < \\frac{5}{2}$, making this the correct domain.",
          "id": "ap-precalculus-2-2-q1",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Solve for $x$: $\\log_4(x) + \\log_4(x - 6) = 2$.",
          "choices": [
            "$x = 8$ only",
            "$x = -2$ and $x = 8$",
            "$x = -2$ only",
            "$x = 2$ and $x = 4$"
          ],
          "answer": 0,
          "explanation": "Combining the logarithms using the product property gives $\\log_4(x(x - 6)) = 2$. Converting to exponential form yields $x^2 - 6x = 4^2$, which simplifies to $x^2 - 6x - 16 = 0$. Factoring gives $(x - 8)(x + 2) = 0$, resulting in $x = 8$ and $x = -2$. Testing these in the original equation, $x = -2$ creates a negative argument ($\\log_4(-2)$), so it is extraneous. Thus, only $x = 8$ is valid.",
          "id": "ap-precalculus-2-2-q2",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which of the following represents the correct evaluation of $\\log_5(12)$ using standard calculator functions?",
          "choices": [
            "$\\frac{\\ln(12)}{\\ln(5)}$",
            "$\\frac{\\ln(5)}{\\ln(12)}$",
            "$\\ln(12) - \\ln(5)$",
            "$12 \\cdot \\log(5)$"
          ],
          "answer": 0,
          "explanation": "By the change of base formula, $\\log_b(x) = \\frac{\\ln(x)}{\\ln(b)}$ or $\\frac{\\log(x)}{\\log(b)}$. Substituting $b = 5$ and $x = 12$ into this formula gives $\\frac{\\ln(12)}{\\ln(5)}$. This allows evaluation on standard calculators that only feature base 10 and base $e$ logarithm buttons.",
          "id": "ap-precalculus-2-2-q3",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Why must potential solutions derived from combined logarithmic equations be checked in the original equation?",
          "choices": [
            "Algebraic manipulations like combining logs can expand the domain, inadvertently introducing extraneous solutions that yield non-positive arguments.",
            "Calculators always round intermediate decimal values, requiring manual verification of exact integer answers.",
            "The base of a logarithm can change during the conversion from logarithmic form to exponential form.",
            "Exponents and logarithms are not true inverse functions when dealing with negative coefficients."
          ],
          "answer": 0,
          "explanation": "When logarithmic terms are combined using properties like $\\log(A) + \\log(B) = \\log(AB)$, the domain of the resulting single expression can be wider than the domains of the individual original logarithmic terms. This can introduce extraneous solutions that produce zero or negative arguments in the original equation, which are undefined.",
          "id": "ap-precalculus-2-2-q4",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-precalculus-2-3-lesson",
      "title": "2.3 Exponential and logarithmic modeling from data and semi-log plots",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Exponential and logarithmic modeling from data and semi-log plots"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Definitions"
        },
        {
          "type": "text",
          "text": "Exponential modeling relies on the function form $f(t) = A \\cdot b^t$, where $A$ is the initial value and $b$ is the constant growth or decay factor. A value of $b > 1$ indicates exponential growth, while $0 < b < 1$ represents exponential decay. This Unit 2 modeling content is assessed on the AP Precalculus exam. To analyze non-linear data, we utilize logarithmic properties, specifically $\\log_b(xy) = \\log_b(x) + \\log_b(y)$ and $\\log_b(x^n) = n\\log_b(x)$. These identities allow us to transform multiplicative relationships into additive ones, which is the foundation for linearizing exponential data for graphical analysis."
        },
        {
          "type": "subheading",
          "text": "Method of Semi-Log Plots"
        },
        {
          "type": "text",
          "text": "A semi-log plot is a visual tool used to test whether a dataset follows an exponential pattern. We take the logarithm (common or natural) of the dependent variable $y$ while keeping the independent variable $x$ on a linear scale. If the original data is exponential, the transformed data $\\ln(y) = \\ln(A) + t\\ln(b)$ becomes linear with slope $\\ln(b)$ and intercept $\\ln(A)$. By plotting points as $(t, \\ln(y))$, we can assess how well a straight line fits the data. If the points align closely to a line, the exponential model is appropriate. The regression line calculated on these transformed coordinates provides the parameters necessary to reconstruct the original exponential model."
        },
        {
          "type": "subheading",
          "text": "Worked Example"
        },
        {
          "type": "text",
          "text": "Consider the hypothetical data: $(0, 100), (1, 150), (2, 225)$. First, compute $\\ln(y)$ for each point: $\\ln(100) \\approx 4.605$, $\\ln(150) \\approx 5.011$, and $\\ln(225) \\approx 5.416$. Plot these three points on a $t$ vs $\\ln(y)$ graph. The slope between $(0, 4.605)$ and $(1, 5.011)$ is $0.406$. The slope between $(1, 5.011)$ and $(2, 5.416)$ is also $0.405$. The equal original ratios, 150/100 = 225/150 = 1.5, show that an exponential model fits these three points exactly. A nearly straight logged plot supports this model but does not prove that future observations must follow it. The slope $m = 0.406$ equals $\\ln(b)$, so $b = e^{0.406} \\approx 1.501$. The y-intercept is $4.605$, so $A = e^{4.605} = 100$. Using the exact ratios gives $y = 100(1.5)^t$ for these points; 1.501 arose only from rounding the logged values. Note that $A$ must be positive for the logarithm to be defined in the transformation step."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Conditions"
        },
        {
          "type": "text",
          "text": "A frequent error is confusing linear regression on raw data with regression on semi-log data. If you perform linear regression on raw exponential data, the resulting $R^2$ value may be high, but the coefficients will not represent true growth rates. Always verify that $A > 0$ and $b > 0$ for the model to have a real-valued logarithm. Different fitting procedures can optimize different errors: nonlinear least squares can minimize squared errors in y, while least squares on ln(y) minimizes squared errors on the logged scale. Do not infer the procedure from the label “ExpReg” alone; some calculators implement exponential regression by linearizing logarithms. State which method and error scale were used."
        },
        {
          "type": "subheading",
          "text": "Transfer Application"
        },
        {
          "type": "text",
          "text": "In biological applications, such as modeling bacterial growth, we often lack initial count data. If given only two points $(t_1, y_1)$ and $(t_2, y_2)$, we can solve for $b$ using $\\frac{\\ln(y_2) - \\ln(y_1)}{t_2 - t_1} = \\ln(b)$. This application extends to pharmacokinetics, where drug concentration halves over time. By taking the natural log of concentration, we can calculate the elimination rate constant $k$ from the slope. This method is robust for noisy data when the underlying process is strictly multiplicative, providing a linear trend to analyze residuals."
        }
      ],
      "practiceQuestions": [
        {
          "question": "A dataset has values $(0, 20), (1, 40), (2, 80)$. After taking the natural log of the y-values, what is the slope of the linear regression line?",
          "choices": [
            "2.000",
            "1.386",
            "0.693",
            "13.863"
          ],
          "answer": 2,
          "explanation": "The growth factor $b$ is $40/20 = 2$. The slope of the semi-log plot is $\\ln(b)$. Calculating $\\ln(2)$ gives approximately $0.693$. This represents the constant rate of increase in the logarithmic domain, which corresponds to exponential growth in the original domain.",
          "id": "ap-precalculus-2-3-q1",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "If a semi-log plot of data results in a curve with an increasing slope, what can be inferred about the original data's growth rate?",
          "choices": [
            "The data is exponential with $b < 1$.",
            "The data is exponential with $b > 1$.",
            "The data is growing faster than exponentially.",
            "The data is linear."
          ],
          "answer": 2,
          "explanation": "If the semi-log plot is linear, the original data is exponential. If the slope is increasing, the value of $\\ln(y)$ is growing faster than a constant rate implies. This indicates that the multiplicative factor is increasing over time, meaning the growth rate accelerates faster than a simple exponential function would predict.",
          "id": "ap-precalculus-2-3-q2",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Why must the dependent variable $y$ be strictly positive to use the natural logarithm transformation?",
          "choices": [
            "The natural logarithm is undefined for zero and negative real numbers.",
            "Exponential functions only exist for $y > 0$.",
            "Linear regression requires positive y-intercepts.",
            "The slope must be positive for accuracy."
          ],
          "answer": 0,
          "explanation": "The domain of the function $f(x) = \\ln(x)$ is restricted to $x > 0$. If the original data contains zero or negative values, the logarithmic transformation is mathematically invalid. Consequently, semi-log plots can only be applied to datasets consisting entirely of strictly positive dependent variable values.",
          "id": "ap-precalculus-2-3-q3",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A model $y = 50 \\cdot (0.5)^t$ represents decay. What is the y-intercept of its semi-log plot using $\\ln(y)$?",
          "choices": [
            "0.500",
            "50.000",
            "3.912",
            "-0.693"
          ],
          "answer": 2,
          "explanation": "The y-intercept of the semi-log plot corresponds to $\\ln(A)$, where $A$ is the initial value of the exponential model. Here $A = 50$. Calculating $\\ln(50)$ yields approximately $3.912$. This value represents the logarithmic magnitude of the starting concentration or amount before decay begins.",
          "id": "ap-precalculus-2-3-q4",
          "domain": "Precalc: Exponential and Logarithmic Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-precalculus-3-1-lesson",
      "title": "3.1 Radians, the unit circle, and periodic function graphs",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Radians, the unit circle, and periodic function graphs"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Unit Context"
        },
        {
          "type": "text",
          "text": "Trigonometric and polar functions belong to Unit 3 and are assessed on the AP Precalculus exam. Unit 4 is a separate enrichment unit covering parameters, vectors, and matrices. We begin with radians, a dimensionless unit of angular measure defined by the ratio of the arc length intercepted to the radius of the circle, $\\theta = \\frac{s}{r}$. A full rotation is $2\\pi$ radians. The unit circle, centered at the origin with a radius of $1$, allows us to define the trigonometric functions sine and cosine as the $y$- and $x$-coordinates, respectively, of a point corresponding to an angle $\\theta$. No calculus prerequisites are required, but a strong foundation in functions, transformations, and coordinate geometry is essential."
        },
        {
          "type": "subheading",
          "text": "Method for Evaluating Exact Values and Graphing"
        },
        {
          "type": "text",
          "text": "To evaluate trigonometric functions for any real number input without a calculator, rely on reference angles and the coordinates of special points on the unit circle corresponding to multiples of $\\frac{\\pi}{6}$, $\\frac{\\pi}{4}$, and $\\frac{\\pi}{3}$. The domain of the parent sine and cosine functions is all real numbers, $(-\\infty, \\infty)$, because an angle can rotate indefinitely in either direction. When modeling periodic phenomena, we analyze the general sinusoidal equation $f(x) = a \\sin(b(x - c)) + d$. Here, the amplitude is $|a|$, the period is $\\frac{2\\pi}{|b|}$, the phase shift is $c$, and the vertical shift is $d$. When deciding whether to use a calculator, exact analytical values using radicals and fractions are preferred for theoretical work, whereas decimal approximations are reserved for contextual applications involving messy empirical data."
        },
        {
          "type": "subheading",
          "text": "Multi-Step Worked Example"
        },
        {
          "type": "text",
          "text": "Consider the function $f(x) = -3 \\cos\\left(\\frac{\\pi}{4}x\\right) + 1$. Let us determine its amplitude, period, range, and sketch two full cycles. First, identify the parameters from the standard form: $a = -3$, $b = \\frac{\\pi}{4}$, $c = 0$, and $d = 1$. The amplitude is $|-3| = 3$. Because $a$ is negative, the graph is reflected across its midline. Second, calculate the period using the formula $T = \\frac{2\\pi}{|b|} = \\frac{2\\pi}{\\pi/4} = 2\\pi \\cdot \\frac{4}{\\pi} = 8$. Third, determine the vertical shift $d = 1$, which places the sinusoidal midline at $y = 1$. The maximum value is $d + |a| = 1 + 3 = 4$, and the minimum value is $d - |a| = 1 - 3 = -2$, establishing a range of $[-2, 4]$. Fourth, plot key points along one period of length $8$: starting at $x = 0$ with the minimum value $-2$ (due to the reflection of cosine), moving to the midline at $x = 2$, reaching the maximum value $4$ at $x = 4$, returning to the midline at $x = 6$, and completing the cycle at the minimum $-2$ when $x = 8$. Repeat this pattern for the second cycle up to $x = 16$."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Domain Conditions"
        },
        {
          "type": "text",
          "text": "A frequent error when working with periodic functions is miscalculating the period when factoring out the frequency coefficient $b$. Always ensure the function is written in the form $b(x - c)$ before identifying the phase shift; failing to factor $b$ out of a binomial expression leads to an incorrect horizontal shift. Another common mistake is confusing the domains of tangent and secant functions with those of sine and cosine. While sine and cosine have unrestricted domains of all real numbers, tangent and secant involve division by cosine and therefore possess restricted domains where $\\cos(x) = 0$, occurring at odd multiples of $\\frac{\\pi}{2}$. When evaluating inverse trigonometric functions, strict domain and range restrictions must be applied to ensure the resulting outputs satisfy the definition of a function."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application"
        },
        {
          "type": "text",
          "text": "The principles of radians, unit circles, and periodic graphs transfer directly to modeling real-world cyclical phenomena such as alternating current (AC) circuits, seasonal temperature fluctuations, and acoustic sound waves. For instance, an electrical engineer analyzing a household alternating voltage signal that oscillates between $-170$ volts and $+170$ volts at a frequency of $60$ hertz can construct a sine model. By defining the amplitude as $170$, calculating $b = 2\\pi f = 120\\pi$ radians per second, and setting vertical shifts to zero, the engineer can precisely predict voltage output at any millisecond without empirical trial and error, demonstrating the immense practical power of exact trigonometric analysis."
        }
      ],
      "practiceQuestions": [
        {
          "question": "What is the exact period of the trigonometric function $f(x) = 5 \\sin\\left(\\frac{3\\pi}{2} x - \\pi\\right)$?",
          "choices": [
            "\\frac{4}{3}",
            "\\frac{3\\pi}{2}",
            "\\frac{2\\pi}{3}",
            "\\frac{4\\pi}{3}"
          ],
          "answer": 0,
          "explanation": "To find the period of a sinusoidal function, use the formula $T = \\frac{2\\pi}{|b|}$. In this function, the coefficient of $x$ inside the argument is $b = \\frac{3\\pi}{2}$. Dividing $2\\pi$ by $\\frac{3\\pi}{2}$ yields $2\\pi \\cdot \\frac{2}{3\\pi} = \\frac{4}{3}$. Note that the phase shift $-\\pi$ inside does not affect the period length.",
          "id": "ap-precalculus-3-1-q1",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which of the following represents the correct range of the function $g(x) = -4 \\cos(x) + 3$?",
          "choices": [
            "[-4, 4]",
            "[-1, 7]",
            "[-7, 1]",
            "[3, 7]"
          ],
          "answer": 1,
          "explanation": "The range of a basic cosine function is $[-1, 1]$. Multiplying by $-4$ stretches the amplitude to $4$ and reflects the graph, changing the bounds to $[-4, 4]$. Adding a vertical shift of $+3$ shifts every $y$-value up by $3$, resulting in a new range of $[-4+3, 4+3]$, which simplifies to $[-1, 7]$.",
          "id": "ap-precalculus-3-1-q2",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "What is the exact value of $\\sin\\left(\\frac{5\\pi}{3}\\right)$?",
          "choices": [
            "-\\frac{1}{2}",
            "-\\frac{\\sqrt{3}}{2}",
            "\\frac{1}{2}",
            "\\frac{\\sqrt{3}}{2}"
          ],
          "answer": 1,
          "explanation": "The angle $\\frac{5\\pi}{3}$ is located in the fourth quadrant. Its reference angle is $2\\pi - \\frac{5\\pi}{3} = \\frac{\\pi}{3}$. In the fourth quadrant, the sine function is negative. The sine of the reference angle $\\frac{\\pi}{3}$ is $\\frac{\\sqrt{3}}{2}$, so incorporating the negative sign yields $-\\frac{\\sqrt{3}}{2}$.",
          "id": "ap-precalculus-3-1-q3",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Why are exact values preferred over decimal approximations in theoretical trigonometric analysis?",
          "choices": [
            "Calculators are incapable of computing trigonometric ratios for radian measures.",
            "Exact values preserve mathematical precision by avoiding rounding errors inherent in irrational numbers.",
            "Exact values eliminate the need to determine the domain restrictions of periodic functions.",
            "Decimals can only be used when an angle is measured in degrees rather than radians."
          ],
          "answer": 1,
          "explanation": "Exact values utilizing fractions, radicals, and constants like $\\pi$ maintain absolute mathematical precision. Decimal approximations of irrational numbers (such as $\\sqrt{2}$ or $\\pi$) introduce rounding errors that compound across multi-step calculations, making exact forms superior for rigorous proofs and theoretical work.",
          "id": "ap-precalculus-3-1-q4",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-precalculus-3-2-lesson",
      "title": "3.2 Trigonometric equations, identities, and inverse restrictions",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Trigonometric equations, identities, and inverse restrictions"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Domain Restrictions"
        },
        {
          "type": "text",
          "text": "Before solving trigonometric equations and manipulating identities, students must master unit circle exact values and the restricted domains of inverse trigonometric functions. This lesson is part of assessed Unit 3. The separate Unit 4 enrichment distinction does not remove trigonometric equations or inverse trigonometric functions from the exam. Because periodic functions are many-to-one, inverse functions like $\\arcsin(x)$, $\\arccos(x)$, and $\\arctan(x)$ require restricted ranges to remain functions. Specifically, $\\arcsin(x)$ is restricted to $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$, $\\arccos(x)$ to $[0, \\pi]$, and $\\arctan(x)$ to $(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$. Understanding these domains ensures that when solving equations, we do not discard valid branches or introduce extraneous solutions."
        },
        {
          "type": "subheading",
          "text": "Method for Solving Trigonometric Equations"
        },
        {
          "type": "text",
          "text": "To solve a trigonometric equation algebraically, isolate the trigonometric expression using standard algebraic techniques such as factoring, substitution, or applying Pythagorean identities like $\\sin^2(\\theta) + \\cos^2(\\theta) = 1$. Once a basic equation like $\\sin(\\theta) = c$ is established, find the reference angle within the restricted domain. Use the periodicity of the function to generate all general solutions over the real numbers, typically by adding integer multiples of the period $2\\pi$ or $\\pi$. When equations involve multiple trigonometric functions, convert everything to a single function type before factoring. Calculator choices must be justified by checking whether the problem requires exact radian answers or decimal approximations, ensuring the device is in the correct mode."
        },
        {
          "type": "subheading",
          "text": "Multi-Step Worked Example"
        },
        {
          "type": "text",
          "text": "Consider solving the equation $2\\cos^2(x) - \\sin(x) - 1 = 0$ for all real values of $x$. First, use the Pythagorean identity $\\cos^2(x) = 1 - \\sin^2(x)$ to express the entire equation in terms of $\\sin(x)$. Substituting this yields $2(1 - \\sin^2(x)) - \\sin(x) - 1 = 0$. Distributing and simplifying results in $-2\\sin^2(x) - \\sin(x) + 1 = 0$, or multiplying by $-1$, $2\\sin^2(x) + \\sin(x) - 1 = 0$. Next, factor the quadratic expression as $(2\\sin(x) - 1)(\\sin(x) + 1) = 0$. This gives two independent cases: $2\\sin(x) - 1 = 0$ or $\\sin(x) + 1 = 0$. For the first case, $\\sin(x) = \\frac{1}{2}$, which yields reference angles $x = \\frac{\\pi}{6}$ and $x = \\frac{5\\pi}{6}$ in the interval $[0, 2\\pi)$. For the second case, $\\sin(x) = -1$, yielding $x = \\frac{3\\pi}{2}$. Accounting for the periodic nature of sine, the complete general solutions are $x = \\frac{\\pi}{6} + 2\\pi k$, $x = \\frac{5\\pi}{6} + 2\\pi k$, and $x = \\frac{3\\pi}{2} + 2\\pi k$ for any integer $k$."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Conditional Errors"
        },
        {
          "type": "text",
          "text": "A frequent error when solving trigonometric equations is dividing both sides by a common trigonometric expression, such as $\\cos(x)$. This eliminates potential solutions where $\\cos(x) = 0$; instead, terms should be moved to one side and factored out. Another critical error is ignoring the specified domain interval, such as dropping general solution notation when solving on the entire real line, or conversely, listing infinite solutions when a problem explicitly restricts the domain to $[0, 2\\pi)$. Additionally, students often misapply inverse function ranges, yielding angles outside the restricted output sets of arcsin, arccos, or arctan. Always verify candidate solutions in the original equation to catch extraneous results introduced by squaring operations or identity substitutions."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application"
        },
        {
          "type": "text",
          "text": "The ability to manipulate trigonometric identities and solve equations transfers directly to modeling harmonic motion, analyzing alternating current circuits in physics, and evaluating complex limits in advanced mathematics. For instance, when determining the exact times an oscillating spring reaches a specific displacement, setting up a trigonometric model requires solving equations identical to our quadratic example. By mastering exact value manipulation and domain restrictions, students build the rigorous analytical framework necessary for higher-level mathematical modeling, ensuring precise calculations whether working with theoretical proofs or applied physical systems."
        }
      ],
      "practiceQuestions": [
        {
          "question": "What is the restricted range of the inverse cosine function, $\\arccos(x)$?",
          "choices": [
            "$[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$",
            "$[0, \\pi]$",
            "$(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$",
            "$[0, 2\\pi]$"
          ],
          "answer": 1,
          "explanation": "The inverse cosine function must be restricted to a domain where it is one-to-one and covers all possible output values of the cosine function. By convention, the range of $y = \\arccos(x)$ is restricted to the interval $[0, \\pi]$, which ensures every value in $[-1, 1]$ maps to a unique angle in Quadrants I and II.",
          "id": "ap-precalculus-3-2-q1",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Find all solutions to the equation $\\tan(x) \\sin(x) = \\tan(x)$ on the interval $[0, 2\\pi)$.",
          "choices": [
            "$x = 0, \\pi$",
            "$x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}$",
            "$x = 0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}$",
            "$x = \\frac{\\pi}{4}, \\frac{5\\pi}{4}$"
          ],
          "answer": 0,
          "explanation": "To solve $\\tan(x)\\sin(x) = \\tan(x)$, subtract $\\tan(x)$ from both sides to get $\\tan(x)(\\sin(x) - 1) = 0$. This gives $\\tan(x) = 0$ or $\\sin(x) = 1$. The solutions for $\\tan(x) = 0$ on $[0, 2\\pi)$ are $x = 0$ and $x = \\pi$. The solution for $\\sin(x) = 1$ is $x = \\frac{\\pi}{2}$. However, at $x = \\frac{\\pi}{2}$, $\\tan(x)$ is undefined, making it an extraneous solution. Thus, only $0$ and $\\pi$ are valid.",
          "id": "ap-precalculus-3-2-q2",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which identity should be used to transform the equation $1 - \\cos^2(x) + \\sin(x) = 1$ into a quadratic equation in terms of sine?",
          "choices": [
            "$\\sin^2(x) + \\cos^2(x) = 1$",
            "$1 + \\tan^2(x) = \\sec^2(x)$",
            "$\\sin(2x) = 2\\sin(x)\\cos(x)$",
            "$\\cos(2x) = 1 - 2\\sin^2(x)$"
          ],
          "answer": 0,
          "explanation": "The fundamental Pythagorean identity $\\sin^2(x) + \\cos^2(x) = 1$ can be rearranged as $\\sin^2(x) = 1 - \\cos^2(x)$. Substituting $\\sin^2(x)$ directly replaces the $1 - \\cos^2(x)$ term in the original equation, yielding $\\sin^2(x) + \\sin(x) = 1$, which is a solvable quadratic equation.",
          "id": "ap-precalculus-3-2-q3",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "What is the exact value of $\\arcsin\\left(-\\frac{\\sqrt{3}}{2}\\right)$?",
          "choices": [
            "$\\frac{2\\pi}{3}$",
            "$-\\frac{\\pi}{3}$",
            "$\\frac{5\\pi}{3}$",
            "$-\\frac{\\pi}{6}$"
          ],
          "answer": 1,
          "explanation": "The function $\\arcsin(x)$ outputs values restricted to $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$. We seek an angle in this interval whose sine is $-\\frac{\\sqrt{3}}{2}$. Since the sine is negative, the angle must be in the fourth quadrant within our restricted domain, which is $-\\frac{\\pi}{3}$. Note that $\\frac{5\\pi}{3}$ has the correct sine value but lies outside the restricted range.",
          "id": "ap-precalculus-3-2-q4",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-precalculus-3-3-lesson",
      "title": "3.3 Sinusoidal models, polar coordinates, and equivalent representations",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Sinusoidal models, polar coordinates, and equivalent representations"
        },
        {
          "type": "subheading",
          "text": "Context and Unit Status"
        },
        {
          "type": "text",
          "text": "Sinusoidal models and polar functions belong to Unit 3, an assessed part of AP Precalculus. This lesson connects a function’s parameters to periodic behavior and relates polar coordinates to Cartesian coordinates. First identify the quantities, units, and meaningful input interval in a periodic model. Then use the model to make a prediction and check it against the given maximum, minimum, and period. Polar work adds a second representation of points and curves; it does not require calculus-based area formulas. Unit 4 is the separate, unassessed enrichment unit on parameters, vectors, and matrices."
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Definitions"
        },
        {
          "type": "text",
          "text": "Before exploring sinusoidal models and polar coordinates, students must recall that a sinusoidal function is any function of the form $f(x) = a + b\\sin(c(x-d))$ or its cosine equivalent. The amplitude $|b|$ represents the maximum deviation from the midline $y=a$. The period is calculated as $\\frac{2\\pi}{|c|}$. In polar coordinates, a point is defined by $(r, \\theta)$, where $r$ is the directed distance from the pole and $\\theta$ is the angle from the polar axis. Unlike Cartesian coordinates $(x,y)$, polar coordinates are not unique. For any integer $k$, the point $(r, \\theta)$ is equivalent to $(r, \\theta + 2\\pi k)$ and $(-r, \\theta + (2k+1)\\pi)$. Converting between systems requires the formulas $x = r \\cos \\theta$ and $y = r \\sin \\theta$. These definitions form the basis for modeling real-world phenomena like tides and planetary orbits."
        },
        {
          "type": "subheading",
          "text": "Method for Modeling and Conversion"
        },
        {
          "type": "text",
          "text": "To model data with a sinusoidal function, identify the midline by averaging the maximum and minimum values: $a = \\frac{\\max + \\min}{2}$. The amplitude is half the difference: $b = \\frac{\\max - \\min}{2}$. Determine the period from the time between consecutive peaks or troughs. For polar conversion, if given rectangular coordinates $(x,y)$, calculate $r = \\sqrt{x^2 + y^2}$ and $\\theta = \\tan^{-1}(\\frac{y}{x})$, adjusting the angle to the correct quadrant. Conversely, to convert polar to rectangular, use direct substitution. When finding equivalent polar representations, consider negative $r$ values. A point $(r, \\theta)$ can be represented as $(-r, \\theta + \\pi)$. This dual representation is crucial for graphing rose curves and spirals correctly."
        },
        {
          "type": "subheading",
          "text": "Worked Example"
        },
        {
          "type": "text",
          "text": "Consider a point with polar coordinates $(5, \\frac{\\pi}{3})$. First, convert to rectangular form: $x = 5 \\cos(\\frac{\\pi}{3}) = 5(\\frac{1}{2}) = 2.5$ and $y = 5 \\sin(\\frac{\\pi}{3}) = 5(\\frac{\\sqrt{3}}{2}) = \\frac{5\\sqrt{3}}{2}$. Next, find an equivalent polar representation using a negative radius. Set $r' = -5$. To point to the same location, the angle must be rotated by $\\pi$ radians. Thus, $\\theta' = \\frac{\\pi}{3} + \\pi = \\frac{4\\pi}{3}$. The equivalent point is $(-5, \\frac{4\\pi}{3})$. Verify this by converting back: $x = -5 \\cos(\\frac{4\\pi}{3}) = -5(-\\frac{1}{2}) = 2.5$ and $y = -5 \\sin(\\frac{4\\pi}{3}) = -5(-\\frac{\\sqrt{3}}{2}) = \\frac{5\\sqrt{3}}{2}$. The coordinates match, confirming the equivalence. This demonstrates how sign changes in $r$ require angular shifts of odd multiples of $\\pi$."
        },
        {
          "type": "subheading",
          "text": "Mistakes and Application"
        },
        {
          "type": "text",
          "text": "A common mistake is assuming polar coordinates are unique or ignoring quadrant adjustments when calculating $\\theta$ from arctangent. Another error is misidentifying the period in sinusoidal models, leading to incorrect scaling factors $c$. Always check if the period is derived from peak-to-peak or peak-to-trough distances. In application, polar coordinates are essential in navigation and radar systems where distance and bearing are natural measures. For instance, a ship's position is often given as distance from a buoy and a compass heading. Understanding equivalent representations allows engineers to plot boundaries correctly in radar screens. The ability to switch between coordinate systems flexibly is a key skill in advanced geometry and physics problem-solving."
        }
      ],
      "practiceQuestions": [
        {
          "question": "A point is given in polar coordinates as $(4, \\frac{\\pi}{6})$. Which of the following is an equivalent representation of this point using a negative radius?",
          "choices": [
            "$(-4, \\frac{\\pi}{6})$",
            "$(-4, \\frac{7\\pi}{6})$",
            "$(-4, \\frac{\\pi}{3})$",
            "$(-4, \\frac{5\\pi}{6})$"
          ],
          "answer": 1,
          "explanation": "To represent the same point with a negative radius $-r$, the angle must shift by $\\pi$ radians. The original angle is $\\frac{\\pi}{6}$. Adding $\\pi$ gives $\\frac{\\pi}{6} + \\frac{6\\pi}{6} = \\frac{7\\pi}{6}$. Therefore, the equivalent point is $(-4, \\frac{7\\pi}{6})$. Other options do not result in the same rectangular coordinates $(2, 2\\sqrt{3})$, making them incorrect representations of the original location in the plane.",
          "id": "ap-precalculus-3-3-q1",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Convert the polar point $(3, \\frac{3\\pi}{4})$ to rectangular coordinates. What is the exact value of the $y$-coordinate?",
          "choices": [
            "$-\\frac{3\\sqrt{2}}{2}$",
            "$\\frac{3\\sqrt{2}}{2}$",
            "$\\frac{3}{2}$",
            "$3\\sqrt{2}$"
          ],
          "answer": 1,
          "explanation": "The $y$-coordinate in rectangular form is calculated using $y = r \\sin \\theta$. Substituting the given values, $y = 3 \\sin(\\frac{3\\pi}{4})$. The sine of $\\frac{3\\pi}{4}$ is positive in the second quadrant and equals $\\frac{\\sqrt{2}}{2}$. Multiplying this by $3$ yields $\\frac{3\\sqrt{2}}{2}$. The $x$-coordinate would be negative, but the question specifically asks for the $y$-value. This result reflects the vertical distance from the polar axis.",
          "id": "ap-precalculus-3-3-q2",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A sinusoidal function has a maximum value of 10 and a minimum value of -2. What is the equation of the midline for this function?",
          "choices": [
            "$y = 4$",
            "$y = 6$",
            "$y = 1$",
            "$y = 8$"
          ],
          "answer": 0,
          "explanation": "The midline of a sinusoidal function is the horizontal line that runs through the center of the oscillation. It is calculated as the average of the maximum and minimum values. Using the formula $y = \\frac{\\max + \\min}{2}$, we substitute the given values: $y = \\frac{10 + (-2)}{2} = \\frac{8}{2} = 4$. Thus, the midline is the line $y = 4$. This value represents the $a$ parameter in the general sinusoidal equation form.",
          "id": "ap-precalculus-3-3-q3",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which polar coordinate point represents the same location as $(2, \\frac{\\pi}{2})$ with a negative radius?",
          "choices": [
            "$(-2, \\frac{3\\pi}{2})$",
            "$(-2, \\frac{\\pi}{2})$",
            "$(2, \\frac{5\\pi}{2})$",
            "$(-2, \\frac{\\pi}{6})$"
          ],
          "answer": 0,
          "explanation": "A negative radius reverses the direction of the ray, so add π to the original angle: π/2 + π = 3π/2. Thus (−2, 3π/2) gives the same Cartesian coordinates (0, 2). A positive radius with angle 5π/2 is also equivalent geometrically, but it does not satisfy the question’s negative-radius condition.",
          "id": "ap-precalculus-3-3-q4",
          "domain": "Precalc: Trigonometric and Polar Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-precalculus-4-1-lesson",
      "title": "4.1 Parametric functions and interpreting motion",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Parametric functions and interpreting motion"
        },
        {
          "type": "tip",
          "text": "Enrichment: Unit 4 is part of the course framework but is not assessed on the AP Precalculus exam."
        },
        {
          "type": "subheading",
          "text": "Context and Assessment Note"
        },
        {
          "type": "text",
          "text": "Unit 4, Functions Involving Parameters, Vectors, and Matrices, is designated as enrichment material for AP Precalculus. It is NOT assessed on the college-board AP Precalculus Examination. Students should study this unit to deepen their conceptual understanding of motion and geometry but must focus their exam preparation on Units 1 through 3. This lesson introduces parametric equations as a method to describe curves using a single parameter, typically representing time. Unlike standard Cartesian functions $y=f(x)$, parametric forms $x(t)$ and $y(t)$ allow for paths that loop or retrace, capturing dynamic motion rather than just static relationships. No calculus knowledge is required to interpret these graphs; all analysis relies on algebraic manipulation and trigonometric identities."
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Core Definitions"
        },
        {
          "type": "text",
          "text": "To master parametric functions, students must recall trigonometric identities, specifically the Pythagorean identity $\\cos^2(\\theta) + \\sin^2(\\theta) = 1$. A parametric function maps an input parameter $t$ to ordered pairs $(x,y)$. The domain of $t$ often restricts the portion of the graph traced. For example, if $x(t) = \\cos(t)$ and $y(t) = \\sin(t)$ with $0 \\le t \\le 2\\pi$, the domain covers a full period. It is crucial to distinguish between the parameter $t$ and the coordinates $x$ and $y$. While $x$ and $y$ represent spatial position, $t$ represents the independent variable that drives the change. In many applications, $t$ corresponds to time in seconds, making parametric equations essential for modeling projectile motion or circular motion where direction matters."
        },
        {
          "type": "subheading",
          "text": "Method for Interpreting Motion"
        },
        {
          "type": "text",
          "text": "To interpret the motion described by parametric equations, first identify the parameter range. Next, evaluate key points at $t = 0$, $t = \\pi/2$, $t = \\pi$, and $t = 2\\pi$ if the functions are sinusoidal. Plot these points to determine the shape and orientation. To find the direction of motion, compare the values of $x(t)$ and $y(t)$ for small increments of $t$. For instance, if $t$ increases from $0.1$ to $0.2$, observe whether $x$ increases or decreases. This determines if the object moves clockwise or counter-clockwise. Eliminating the parameter $t$ to find the Cartesian equation helps identify the geometric shape (e.g., circle, ellipse, line) but loses the temporal information. Always verify that the Cartesian equation's domain matches the restrictions imposed by the original parametric parameter range. Use exact values to avoid rounding errors during this qualitative analysis."
        },
        {
          "type": "subheading",
          "text": "Worked Example: Parametric Path"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical particle moving along the path defined by $x(t) = 2\\cos(t)$ and $y(t) = 3\\sin(t)$ for $0 \\le t \\le 2\\pi$. First, eliminate $t$. We know $\\cos(t) = x/2$ and $\\sin(t) = y/3$. Substituting into the identity $\\cos^2(t) + \\sin^2(t) = 1$ yields $(x/2)^2 + (y/3)^2 = 1$, which simplifies to $x^2/4 + y^2/9 = 1$. This describes an ellipse centered at the origin with horizontal semi-axis 2 and vertical semi-axis 3. To determine motion, test $t=0$: $(2,0)$. Test $t=\\pi/2$: $(0,3)$. As $t$ increases from 0 to $\\pi/2$, $x$ decreases from 2 to 0 and $y$ increases from 0 to 3. The path moves counter-clockwise. If the range were $0 \\le t \\le \\pi$, only the upper half of the ellipse would be traced. A common calculator error is setting the window too small, clipping the ellipse. Set $x$-min to -3 and $y$-min to -4 for clarity."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Transfer Application"
        },
        {
          "type": "text",
          "text": "A frequent error is assuming that any pair of continuous functions generates a closed loop. If the period of $x(t)$ and $y(t)$ are not commensurate, the graph may never close. Another mistake is ignoring the parameter bounds; failing to restrict $t$ can imply an infinite line when only a segment is intended. For transfer, consider the circular-motion model x(t) = L sin(at), y(t) = −L cos(at), with L > 0. The identity x(t)² + y(t)² = L² holds for every real a, so changing the common nonzero frequency a changes traversal speed and direction, not the circular path. If a = 0, the point remains fixed. Using genuinely different horizontal and vertical frequencies can produce Lissajous curves; whether a path closes also depends on their frequency ratio. This concept applies to computer graphics, where parametric equations render complex surfaces like car bodies or terrain. Understanding that time is embedded in the parameters allows designers to animate these shapes. Always check if the motion is one-to-one in time or if the particle retraces its path, which happens if the period repeats exactly."
        }
      ],
      "practiceQuestions": [
        {
          "question": "A particle follows x(t) = cos(t), y(t) = sin(2t) for 0 ≤ t ≤ π, with angles in radians. When does it first reach the origin?",
          "choices": [
            "0",
            "π/2",
            "π",
            "It never reaches the origin"
          ],
          "answer": 1,
          "explanation": "Both coordinates must be zero simultaneously. On this interval, cos(t) = 0 only at t = π/2. At that time, sin(2t) = sin(π) = 0, so the particle is at the origin. Checking y = 0 alone would also include times when x is nonzero.",
          "id": "ap-precalculus-4-1-q1",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        },
        {
          "question": "Given x(t) = 3t - 1 and y(t) = t^2 + 2 for t \\ge 0, which segment of the parabola y = (x+1)^2/9 + 2 is traced?",
          "choices": [
            "x \\ge -1",
            "x \\le -1",
            "x > -1",
            "x \\neq -1"
          ],
          "answer": 0,
          "explanation": "Solve for t in terms of x: x + 1 = 3t, so t = (x+1)/3. Substitute into y: y = ((x+1)/3)^2 + 2 = (x+1)^2/9 + 2. This confirms the Cartesian equation. The param domain is t \\ge 0. Since t = (x+1)/3 and t \\ge 0, then (x+1)/3 \\ge 0, which implies x+1 \\ge 0, or x \\ge -1. Therefore, only the part of the parabola with x-values greater than or equal to -1 is traced.",
          "id": "ap-precalculus-4-1-q2",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        },
        {
          "question": "A particle is defined by x(t) = 2 + \\cos(t) and y(t) = 1 + \\sin(t) for 0 \\le t \\le 2\\pi. What is the center and radius of the resulting shape?",
          "choices": [
            "Center (2,1), Radius 1",
            "Center (1,1), Radius 2",
            "Center (0,0), Radius 1",
            "Center (2,1), Radius 2"
          ],
          "answer": 0,
          "explanation": "Recall the standard parametric equation for a circle: x = h + r\\cos(t), y = k + r\\sin(t). Comparing this to x(t) = 2 + \\cos(t) and y(t) = 1 + \\sin(t), we identify h=2, k=1, and r=1. The period is 2\\pi, and the range covers exactly one full cycle. Thus, the shape is a circle centered at (2,1) with radius 1. The coefficients of the trig functions are 1, confirming the radius.",
          "id": "ap-precalculus-4-1-q3",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        },
        {
          "question": "Which statement correctly differentiates a parametric equation from a standard Cartesian function y = f(x) regarding the direction of motion?",
          "choices": [
            "Parametric equations cannot define loops; Cartesian functions can.",
            "Cartesian functions inherently include time; parametric equations do not.",
            "Parametric equations define distinct points for distinct t, allowing direction tracing, while y=f(x) only defines a set of points.",
            "The slope of a parametric curve is always constant if it is a line."
          ],
          "answer": 2,
          "explanation": "A standard function y=f(x) defines a static relationship between x and y without inherent temporal order. While a line y=x+1 is a set of points, it does not specify if a point moves from left to right or right to left. Parametric equations introduce a parameter t (often time) that orders the points. By seeing how x and y change as t increases, we determine the direction of motion (e.g., clockwise vs counter-clockwise). This dynamic aspect is the key distinction. the response “Parametric equations cannot define loops; Cartesian functions can” is false because parametric equations easily define loops. the response “Cartesian functions inherently include time; parametric equations do not” is false because Cartesian functions do not intrinsically encode time.",
          "id": "ap-precalculus-4-1-q4",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        }
      ]
    },
    {
      "id": "ap-precalculus-4-2-lesson",
      "title": "4.2 Vectors, components, magnitude, and dot products",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Vectors, components, magnitude, and dot products"
        },
        {
          "type": "tip",
          "text": "Enrichment: Unit 4 is part of the course framework but is not assessed on the AP Precalculus exam."
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Unit Context"
        },
        {
          "type": "text",
          "text": "Before exploring vectors, recall that while foundational AP Precalculus concludes with Unit 3, this enrichment material covers vector quantities possessing both magnitude and direction. Note explicitly that Unit 4 is enrichment and is NOT assessed on the AP exam. Unlike scalar quantities, vectors require tracking horizontal and vertical influences independently. We define a two-dimensional vector in component form as $\\vec{v} = \\langle v_1, v_2 \\rangle$, where $v_1$ and $v_2$ represent the horizontal and vertical scalar components, respectively. No calculus prerequisites are needed; standard algebraic manipulation and trigonometric functions suffice for all vector operations."
        },
        {
          "type": "subheading",
          "text": "Methodology: Components, Magnitude, and Dot Products"
        },
        {
          "type": "text",
          "text": "To analyze vectors algebraically, we use specific formulas. Given points $A(x_1, y_1)$ and $B(x_2, y_2)$, the position vector for $\\vec{AB}$ is $\\langle x_2 - x_1, y_2 - y_1 \\rangle$. The magnitude (or length) of a vector $\\vec{v} = \\langle v_1, v_2 \\rangle$ is calculated using the Pythagorean theorem: $|\\vec{v}| = \\sqrt{v_1^2 + v_2^2}$. The dot product of two vectors $\\vec{u} = \\langle u_1, u_2 \\rangle$ and $\\vec{v} = \\langle v_1, v_2 \\rangle$ yields a scalar value: $\\vec{u} \\cdot \\vec{v} = u_1v_1 + u_2v_2$. Furthermore, the angle $\\theta$ between two non-zero vectors is found using the exact formula $\\cos \\theta = \\frac{\\vec{u} \\cdot \\vec{v}}{|\\vec{u}||\\vec{v}|}$. When using technology, justify calculator choices by ensuring degree or radian mode matches the contextual requirements of the geometric application."
        },
        {
          "type": "subheading",
          "text": "Multi-Step Worked Example"
        },
        {
          "type": "text",
          "text": "Consider two vectors: $\\vec{u} = \\langle 3, -4 \\rangle$ and $\\vec{v} = \\langle 1, 7 \\rangle$. First, compute the magnitude of $\\vec{u}$: $|\\vec{u}| = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$. Second, compute the dot product $\\vec{u} \\cdot \\vec{v}$: $\\vec{u} \\cdot \\vec{v} = (3)(1) + (-4)(7) = 3 - 28 = -25$. Third, find the magnitude of $\\vec{v}$: $|\\vec{v}| = \\sqrt{1^2 + 7^2} = \\sqrt{1 + 49} = \\sqrt{50} = 5\\sqrt{2}$. Finally, determine the angle $\\theta$ between $\\vec{u}$ and $\\vec{v}$. Substitute the exact values into the angle formula: $\\cos \\theta = \\frac{-25}{5 \\cdot 5\\sqrt{2}} = \\frac{-25}{25\\sqrt{2}} = \\frac{-1}{\\sqrt{2}} = -\\frac{\\sqrt{2}}{2}$. Since $\\cos \\theta = -\\frac{\\sqrt{2}}{2}$ and $0^{\\circ} \\le \\theta \\le 180^{\\circ}$, the exact angle is $\\theta = 135^{\\circ}$ (or $\\frac{3\\pi}{4}$ radians)."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Conditions"
        },
        {
          "type": "text",
          "text": "A frequent error is treating the dot product as a vector rather than a scalar; the dot product of two vectors always results in a single real number. Another common mistake involves magnitude calculations where negative components are not squared properly, leading to sign errors (e.g., writing $-4^2$ instead of $(-4)^2$). Additionally, students must remember that Unit 4 is enrichment and is NOT assessed on the AP exam, meaning internal assessments may test these exact algebraic steps without AP-mandated constraints. Always justify domains when evaluating inverse trigonometric functions for vector angles, restricting outputs to the appropriate interval $[0, \\pi]$ or $[0^{\\circ}, 180^{\\circ}]$."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application"
        },
        {
          "type": "text",
          "text": "Vector components and dot products are essential in physics and navigation for determining work, force resultants, and relative velocities. For instance, if a constant force vector $\\vec{F} = \\langle 10, 25 \\rangle$ Newtons acts on an object moving along a displacement vector $\\vec{d} = \\langle 4, -2 \\rangle$ meters, the total work done is the scalar dot product $W = \\vec{F} \\cdot \\vec{d} = (10)(4) + (25)(-2) = 40 - 50 = -10$ Joules. This exact computation demonstrates how abstract algebraic vector operations model physical constraints in multi-dimensional real-world scenarios."
        }
      ],
      "practiceQuestions": [
        {
          "question": "What is the exact magnitude of the vector $\\vec{w} = \\langle -5, 12 \\rangle$?",
          "choices": [
            "7",
            "13",
            "17",
            "$\\sqrt{119}$"
          ],
          "answer": 1,
          "explanation": "To find the magnitude of a vector $\\vec{w} = \\langle v_1, v_2 \\rangle$, use the formula $|\\vec{w}| = \\sqrt{v_1^2 + v_2^2}$. Substituting the given components yields $\\sqrt{(-5)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$. Thus, the exact magnitude is 13, making the second choice correct while dismissing the others as arithmetic errors.",
          "id": "ap-precalculus-4-2-q1",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        },
        {
          "question": "Given vectors $\\vec{a} = \\langle 2, -3 \\rangle$ and $\\vec{b} = \\langle 4, 5 \\rangle$, what is their dot product $\\vec{a} \\cdot \\vec{b}$?",
          "choices": [
            "$\\langle 8, -15 \\rangle$",
            "-7",
            "23",
            "$\\sqrt{65}$"
          ],
          "answer": 1,
          "explanation": "The dot product of two vectors $\\vec{a} = \\langle a_1, a_2 \\rangle$ and $\\vec{b} = \\langle b_1, b_2 \\rangle$ is calculated as $a_1b_1 + a_2b_2$. Substituting the values gives $(2)(4) + (-3)(5) = 8 - 15 = -7$. The result is a scalar, making the second choice correct and eliminating vector-form or magnitude distractors.",
          "id": "ap-precalculus-4-2-q2",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        },
        {
          "question": "Which of the following statements regarding the structural curriculum context is explicitly true?",
          "choices": [
            "Vectors and matrices are heavily tested on the official AP Precalculus exam.",
            "Unit 4 is enrichment and is NOT assessed on the AP exam.",
            "Calculus prerequisites are strictly required to compute dot products.",
            "Dot products always yield a resultant vector quantity."
          ],
          "answer": 1,
          "explanation": "The text explicitly states that Unit 4 functions as enrichment and is NOT assessed on the AP exam. It also notes that no calculus prerequisites are required and that dot products yield scalars rather than vectors. Therefore, the second choice is the only accurate statement.",
          "id": "ap-precalculus-4-2-q3",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        },
        {
          "question": "If vector $\\vec{u} = \\langle 6, 8 \\rangle$, what is the exact unit vector pointing in the same direction as $\\vec{u}$?",
          "choices": [
            "$\\langle 3, 4 \\rangle$",
            "$\\langle \\frac{3}{5}, \\frac{4}{5} \\rangle$",
            "$\\langle \\frac{6}{10}, \\frac{8}{10} \\rangle$",
            "$\\langle 6, 8 \\rangle$"
          ],
          "answer": 1,
          "explanation": "A unit vector in the direction of $\\vec{u}$ is found by dividing $\\vec{u}$ by its magnitude. The magnitude of $\\langle 6, 8 \\rangle$ is $\\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$. Dividing each component by 10 yields $\\langle \\frac{6}{10}, \\frac{8}{10} \\rangle$, which simplifies to the exact reduced components $\\langle \\frac{3}{5}, \\frac{4}{5} \\rangle$.",
          "id": "ap-precalculus-4-2-q4",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        }
      ]
    },
    {
      "id": "ap-precalculus-4-3-lesson",
      "title": "4.3 Matrix transformations, composition, and inverse systems",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Matrix transformations, composition, and inverse systems"
        },
        {
          "type": "tip",
          "text": "Enrichment: Unit 4 is part of the course framework but is not assessed on the AP Precalculus exam."
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Unit Context"
        },
        {
          "type": "text",
          "text": "Note that Unit 4 is enrichment material and is NOT assessed on the AP Precalculus exam. This lesson explores matrix transformations in the Cartesian plane, focusing on how $2 \\times 2$ matrices map input vectors $\\vec{v} = \\begin{bmatrix} x \\\\ y \\end{bmatrix}$ to output vectors $\\vec{u} = \\begin{bmatrix} x' \\\\ y' \\end{bmatrix}$ via matrix-vector multiplication. A fundamental prerequisite is understanding basic matrix arithmetic, specifically the product of a $2 \\times 2$ matrix and a $2 \\times 1$ column vector: $\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}\\begin{bmatrix} x \\\\ y \\end{bmatrix} = \\begin{bmatrix} ax + by \\\\ cx + dy \\end{bmatrix}$. We examine linear transformations, which preserve vector addition and scalar multiplication, meaning straight lines map to straight lines or points, and the origin is always mapped to the origin."
        },
        {
          "type": "subheading",
          "text": "Method of Matrix Composition and Inverses"
        },
        {
          "type": "text",
          "text": "To apply multiple sequential transformations, we use matrix composition. If transformation $T_1$ is represented by matrix $A$ and subsequent transformation $T_2$ is represented by matrix $B$, the combined transformation is given by the matrix product $BA$ acting on vector $\\vec{v}$, applying $A$ first then $B$. The domain for these transformations is all of $\\mathbb{R}^2$, justified by the fact that any real numbers $x$ and $y$ can be multiplied by the matrix entries. An inverse system reverses this process. For a transformation matrix $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$, the inverse matrix $A^{-1}$ exists if and only if the determinant $\\det(A) = ad - bc \\neq 0$. When $\\det(A) \\neq 0$, the exact inverse is given by $A^{-1} = \\frac{1}{ad - bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$. Use exact integer or fractional entries when possible. If a calculator returns decimals, check the result by multiplication and keep sufficient precision; do not assume every approved tool has an exact-matrix mode."
        },
        {
          "type": "subheading",
          "text": "Multi-Step Worked Example"
        },
        {
          "type": "text",
          "text": "Consider the transformation matrix $A = \\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix}$ and a second transformation matrix $B = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix}$, which represents a $90^\\circ$ counterclockwise rotation. We want to find the composite transformation matrix that applies $A$ first, then $B$, and then determine the inverse of this composite system. First, compute the composite matrix $C = BA$: $C = \\begin{bmatrix} 0 & -1 \\\\ 1 & 0 \\end{bmatrix} \\begin{bmatrix} 2 & 1 \\\\ 0 & 3 \\end{bmatrix} = \\begin{bmatrix} (0)(2)+(-1)(0) & (0)(1)+(-1)(3) \\\\ (1)(2)+(0)(0) & (1)(1)+(0)(3) \\end{bmatrix} = \\begin{bmatrix} 0 & -3 \\\\ 2 & 1 \\end{bmatrix}$. Next, we find the inverse of $C$. Calculate the determinant: $\\det(C) = (0)(1) - (-3)(2) = 0 - (-6) = 6$. Since $\\det(C) = 6 \\neq 0$, the inverse exists. Using the inverse formula: $C^{-1} = \\frac{1}{6}\\begin{bmatrix} 1 & 3 \\\\ -2 & 0 \\end{bmatrix} = \\begin{bmatrix} \\frac{1}{6} & \\frac{1}{2} \\\\ -\\frac{1}{3} & 0 \\end{bmatrix}$. This resulting matrix will reverse the combined operations of $A$ and $B$."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Conditions"
        },
        {
          "type": "text",
          "text": "A frequent error in matrix composition is reversing the order of multiplication. Because matrix multiplication is not commutative, $BA$ is generally not equal to $AB$; remember that the matrix closest to the vector acts first. Another critical error is attempting to invert a singular matrix where the determinant equals zero. For example, if a transformation collapses the entire 2D plane onto a single line or the origin, its determinant is zero, meaning information is permanently lost and no inverse system exists to reconstruct the original input vector uniquely. Students must always verify that $\\det(A) \\neq 0$ before attempting to compute or apply an inverse matrix system in applied problems."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application"
        },
        {
          "type": "text",
          "text": "Matrix transformations and inverse systems are widely utilized in computer graphics, robotics, and cryptography. In computer animation, complex movements like scaling, shearing, and rotating 2D and 3D wireframe models are chained together as a sequence of matrix multiplications to efficiently render frames on a screen. By storing positions as column vectors and multiplying them by a single pre-computed composite matrix, rendering engines reduce millions of individual coordinate calculations into a single matrix product. Furthermore, if an encrypted coordinate system is transformed using an invertible matrix key, the recipient applies the exact inverse matrix system to decode the original spatial data securely."
        }
      ],
      "practiceQuestions": [
        {
          "question": "Which of the following correctly describes the condition required for a $2 \\times 2$ transformation matrix $A$ to possess an inverse system?",
          "choices": [
            "The determinant of $A$ must be strictly equal to zero.",
            "The determinant of $A$ must be non-zero, allowing the use of the reciprocal determinant scalar.",
            "The matrix $A$ must be symmetric with equal off-diagonal elements.",
            "The trace of $A$ must equal the determinant of $A$."
          ],
          "answer": 1,
          "explanation": "An inverse matrix exists if and only if the determinant of the matrix is non-zero. If the determinant is zero, the matrix is singular, meaning it collapses dimensions and cannot be reversed. Therefore, the non-zero determinant condition is required to scale the adjugate matrix properly.",
          "id": "ap-precalculus-4-3-q1",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        },
        {
          "question": "If transformation matrix $A$ is applied first, followed by transformation matrix $B$, how is the composite transformation expressed mathematically for a vector $\\vec{v}$?",
          "choices": [
            "$AB\\vec{v}$",
            "$BA\\vec{v}$",
            "$A^{-1}B\\vec{v}$",
            "$B^{-1}A\\vec{v}$"
          ],
          "answer": 1,
          "explanation": "Matrix-vector multiplication associates from right to left. When vector $\\vec{v}$ undergoes transformation $A$ first, we write $A\\vec{v}$. Applying $B$ to that result yields $B(A\\vec{v}) = BA\\vec{v}$. Thus, the composite matrix is $BA$, where the rightmost matrix acts on the vector first.",
          "id": "ap-precalculus-4-3-q2",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        },
        {
          "question": "Let $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$. What is the exact inverse matrix $A^{-1}$?",
          "choices": [
            "$\\begin{bmatrix} -2 & 1 \\\\ 1.5 & -0.5 \\end{bmatrix}$",
            "$\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$",
            "$\\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix}$",
            "$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$"
          ],
          "answer": 2,
          "explanation": "First, compute the determinant of $A$: $\\det(A) = (1)(4) - (2)(3) = 4 - 6 = -2$. The inverse formula is $\\frac{1}{\\det(A)}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$, which gives $-\\frac{1}{2}\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix} = \\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix}$. This matches the response “$\\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix}$” perfectly.",
          "id": "ap-precalculus-4-3-q3",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        },
        {
          "question": "Why is Unit 4 treated differently regarding the AP Precalculus exam?",
          "choices": [
            "It contains calculus prerequisites that are tested on the AP exam.",
            "It is classified as enrichment material and is NOT assessed on the AP Precalculus exam.",
            "It replaces all vector topics tested in Unit 3.",
            "It requires graphing calculators with specialized CAS software."
          ],
          "answer": 1,
          "explanation": "Unit 4 is explicitly designated as enrichment content within the course framework and is NOT assessed on the AP Precalculus exam. Instructors cover it for advanced preparation, but it falls outside the official exam scope.",
          "id": "ap-precalculus-4-3-q4",
          "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "enrichment": true
        }
      ]
    }
  ],
  "mcq": [
    {
      "question": "For the function $f(x) = x^2 - 4x + 3$, what is the average rate of change on the interval $[0, 4]$?",
      "choices": [
        "-2",
        "2",
        "0",
        "4"
      ],
      "answer": 2,
      "explanation": "Calculate $f(0) = 0 - 0 + 3 = 3$. Calculate $f(4) = 16 - 16 + 3 = 3$. The difference in $f$ is $3 - 3 = 0$. The difference in $x$ is $4 - 0 = 4$. The rate is $0/4 = 0$.",
      "id": "ap-precalculus-1-1-q1",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "If a ratio function $g(x) = \\frac{1}{x}$ is evaluated from $x=1$ to $x=2$, what is the average rate of change?",
      "choices": [
        "-0.5",
        "0.5",
        "-1",
        "1"
      ],
      "answer": 0,
      "explanation": "Calculate $g(1) = 1$. Calculate $g(2) = 0.5$. The difference in $y$ is $0.5 - 1 = -0.5$. The difference in $x$ is $2 - 1 = 1$. The rate is $-0.5/1 = -0.5$ which is $-1/2$.",
      "id": "ap-precalculus-1-1-q2",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "For the polynomial $p(x) = x^3$, on which interval is the average rate of change equal to $7$?",
      "choices": [
        "[0, 1]",
        "[1, 2]",
        "[2, 3]",
        "[0, 2]"
      ],
      "answer": 1,
      "explanation": "Test [1, 2]: $p(2)=8, p(1)=1$. Rate is $(8-1)/(2-1) = 7/1 = 7$. Test [0,1]: $(1-0)/1 = 1$. Test [2,3]: $(27-8)/1 = 19$. The correct interval is [1, 2].",
      "id": "ap-precalculus-1-1-q3",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "For f(x) = (x+1)/(x−3), what is the average rate of change determined by the endpoint values at x=2 and x=4?",
      "choices": [
        "4",
        "Undefined solely because x=3 is between the endpoints",
        "−4",
        "0"
      ],
      "answer": 0,
      "explanation": "f(2)=−3 and f(4)=5, so the endpoint secant slope is [5−(−3)]/(4−2)=4. The function is undefined at x=3, but continuity between the two inputs is not required for this endpoint calculation. That discontinuity would matter for a theorem requiring continuity or for a physical model spanning the whole interval.",
      "id": "ap-precalculus-1-1-q4",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Given the polynomial $f(x) = (x-2)^3 (x+1)$, which of the following correctly describes the behavior of the graph at the x-axis?",
      "choices": [
        "The graph crosses the axis at $x=2$ and touches the axis at $x=-1$. ",
        "The graph touches the axis at $x=2$ and crosses the axis at $x=-1$. ",
        "The graph crosses the axis at both $x=2$ and $x=-1$. ",
        "The graph touches the axis at both $x=2$ and $x=-1$."
      ],
      "answer": 2,
      "explanation": "At x = 2 the factor (x − 2)³ has multiplicity three, which is odd, so the graph crosses the axis. At x = −1 the factor (x + 1) has multiplicity one, also odd, so the graph crosses there too. Even multiplicity would produce touching without crossing.",
      "id": "ap-precalculus-1-2-q1",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "If $f(x) = x^2 - 4$, what is the equation of the function $g(x)$ obtained by shifting $f(x)$ right by 3 units and down by 2 units?",
      "choices": [
        "$g(x) = (x+3)^2 - 4 - 2$",
        "$g(x) = (x-3)^2 - 4 + 2$",
        "$g(x) = (x-3)^2 - 4 - 2$",
        "$g(x) = (x+3)^2 - 4 + 2$"
      ],
      "answer": 2,
      "explanation": "A horizontal shift to the right by $h$ units replaces $x$ with $(x-h)$. Therefore, shifting right by 3 changes $x^2$ to $(x-3)^2$. A vertical shift down by $k$ units subtracts $k$ from the function. Shifting down by 2 subtracts 2 from the constant term. Combining these, the new function is $g(x) = (x-3)^2 - 4 - 2$.",
      "id": "ap-precalculus-1-2-q2",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A hypothetical plant's height $h(x)$ is modeled by a cubic polynomial with one real zero at $x=5$ with multiplicity 1. Which statement must be true about the graph?",
      "choices": [
        "The graph touches the x-axis at $x=5$ and turns around. ",
        "The graph crosses the x-axis at $x=5$. ",
        "The graph has no real zeros other than $x=5$. ",
        "The graph is tangent to the x-axis at $x=5$."
      ],
      "answer": 1,
      "explanation": "Multiplicities determine the interaction between a polynomial graph and the x-axis. An odd multiplicity (such as 1) indicates that the polynomial changes sign at the zero. Consequently, the graph crosses the x-axis at that point. Even multiplicities (like 2) do not change sign; the graph touches the axis and turns back, staying on the same side.",
      "id": "ap-precalculus-1-2-q3",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "If $f(x) = 2x^3$ and $g(x) = f(x+1) - 3$, what is the y-intercept of the graph of $g(x)$?",
      "choices": [
        "−1",
        "0",
        "1",
        "6"
      ],
      "answer": 0,
      "explanation": "The y-intercept is g(0). Substitute into the composition first: g(0) = f(1) − 3. Since f(1) = 2(1)³ = 2, the result is 2 − 3 = −1. Horizontal and vertical shifts must both be included.",
      "id": "ap-precalculus-1-2-q4",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "What is the exact vertical asymptote of the rational function $f(x) = \\frac{3x + 6}{x^2 - 4}$?",
      "choices": [
        "x = 2",
        "x = -2",
        "x = -3",
        "There are no vertical asymptotes"
      ],
      "answer": 0,
      "explanation": "To find vertical asymptotes, factor the numerator and denominator completely: $f(x) = \\frac{3(x + 2)}{(x - 2)(x + 2)}$. The factor $(x + 2)$ cancels out, leaving a removable discontinuity (hole) at $x = -2$. The remaining factor in the denominator is $(x - 2)$, which equals zero at $x = 2$. Since this factor does not cancel, $x = 2$ is the exact equation of the vertical asymptote.",
      "id": "ap-precalculus-1-3-q1",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "What is the horizontal asymptote of the rational function $g(x) = \\frac{5x^2 - 3x + 1}{2x^2 + 7}$?",
      "choices": [
        "y = 0",
        "y = 5/2",
        "y = 2/5",
        "No horizontal asymptote"
      ],
      "answer": 1,
      "explanation": "The horizontal asymptote of a rational function is determined by comparing the leading degrees of the numerator and denominator polynomials. Here, both the numerator and denominator are quadratic polynomials of degree 2. Therefore, the horizontal asymptote is the ratio of their leading coefficients, which is $\\frac{5}{2}$. Graphing calculators confirm this end behavior as $x$ approaches positive and negative infinity.",
      "id": "ap-precalculus-1-3-q2",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "What is the inverse function $f^{-1}(x)$ for the rational function $f(x) = \\frac{x}{x - 4}$?",
      "choices": [
        "f^{-1}(x) = \\frac{x - 4}{x}",
        "f^{-1}(x) = \\frac{4x}{x - 1}",
        "f^{-1}(x) = \\frac{x}{x + 4}",
        "f^{-1}(x) = \\frac{-4x}{x - 1}"
      ],
      "answer": 1,
      "explanation": "To find the inverse, replace $f(x)$ with $y$, giving $y = \\frac{x}{x - 4}$. Swap variables: $x = \\frac{y}{y - 4}$. Multiply by $(y - 4)$ to get $x(y - 4) = y$, which expands to $xy - 4x = y$. Rearrange to group $y$ terms: $xy - y = 4x$. Factor out $y$: $y(x - 1) = 4x$. Divide by $(x - 1)$ to obtain $f^{-1}(x) = \\frac{4x}{x - 1}$. Algebraic verification confirms this matches the derived formula.",
      "id": "ap-precalculus-1-3-q3",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Why must domain restrictions be identified before simplifying a rational expression?",
      "choices": [
        "To ensure the calculator displays the graph correctly without scaling errors",
        "To prevent removable discontinuities (holes) from being incorrectly treated as valid domain points",
        "To calculate the exact y-intercept of the original function",
        "To determine the slope of any oblique asymptotes present"
      ],
      "answer": 1,
      "explanation": "Simplifying a rational expression by canceling common factors removes algebraic traces of certain domain restrictions, turning them into removable discontinuities (holes). If analysts do not identify these restrictions from the unsimplified denominator, they will mistakenly include those input values in the domain, violating the fundamental definition that division by zero is undefined.",
      "id": "ap-precalculus-1-3-q4",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A hypothetical investment grows according to the model $V(t) = 3500 \\cdot (1.045)^t$, where $t$ is measured in years. What is the exact multiplicative change in the investment value over a 4-year period?",
      "choices": [
        "$(1.045)^4$",
        "$3500 \\cdot (1.045)^4$",
        "$4.18$",
        "$1.045$."
      ],
      "answer": 0,
      "explanation": "The multiplicative change over a specific interval of length $\\Delta t$ for an exponential function $b^t$ is given by $b^{\\Delta t}$. Here, the base is $1.045$ and the interval length is $4$ years, yielding a multiplicative change of $(1.045)^4$. the response “$3500 \\cdot (1.045)^4$” incorrectly includes the initial value, the response “$4.18$” is a linear miscalculation, and the response “$1.045$” represents only a single year.",
      "id": "ap-precalculus-2-1-q1",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A hypothetical radioactive substance decays such that its mass decreases by $18\\%$ every hour. If the initial mass is $250$ grams, which of the following functions models the mass $M(t)$ after $t$ hours?",
      "choices": [
        "$M(t) = 250 \\cdot (0.18)^t$",
        "$M(t) = 250 - 0.18t$",
        "$M(t) = 250 \\cdot (0.82)^t$",
        "$M(t) = 250 \\cdot (1.18)^t$"
      ],
      "answer": 2,
      "explanation": "For exponential decay, the base $b$ is calculated as $1 - r$, where $r$ is the decimal rate of decrease. Since the decrease is $18\\%$ ($0.18$), the base is $1 - 0.18 = 0.82$. Thus, the model is $M(t) = 250 \\cdot (0.82)^t$. the response “$M(t) = 250 \\cdot (0.18)^t$” uses the decay rate as the base, the response “$M(t) = 250 - 0.18t$” incorrectly models linear change, and the response “$M(t) = 250 \\cdot (1.18)^t$” represents exponential growth.",
      "id": "ap-precalculus-2-1-q2",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which of the following statements correctly contrasts linear change and exponential change?",
      "choices": [
        "Linear change has a constant multiplicative factor, while exponential change has a constant additive rate of change.",
        "Linear change has a constant additive rate of change, while exponential change has a constant multiplicative factor.",
        "Both linear and exponential changes rely on constant multiplicative factors over equal input intervals.",
        "Linear change accelerates faster than exponential change for all positive real inputs."
      ],
      "answer": 1,
      "explanation": "Linear functions are characterized by constant additive changes (a constant slope), meaning equal increments in the input yield equal additions to the output. Exponential functions are characterized by constant multiplicative changes, meaning equal increments in the input yield equal proportional multiplications of the output. Therefore, the second option provides the correct contrast.",
      "id": "ap-precalculus-2-1-q3",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A hypothetical population of insects is modeled by $P(t) = 120 \\cdot (1.12)^t$, where $t$ is in days. Approximately how many days will it take for the population to double?",
      "choices": [
        "$6.12$ days",
        "$5.85$ days",
        "$8.31$ days",
        "$9.24$ days"
      ],
      "answer": 0,
      "explanation": "To find the doubling time, we set the population to twice the initial value: $240 = 120 \\cdot (1.12)^t$, which simplifies to $2 = (1.12)^t$. Taking the natural logarithm of both sides gives $t = \\frac{\\ln(2)}{\\ln(1.12)} \\approx \\frac{0.6931}{0.1133} \\approx 6.12$ days. Proper calculator use and logarithmic properties yield this exact decimal approximation.",
      "id": "ap-precalculus-2-1-q4",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "What is the complete domain of the function $f(x) = \\log_3(5 - 2x)$?",
      "choices": [
        "$x < \\frac{5}{2}$",
        "$x > \\frac{5}{2}$",
        "$x \\leq \\frac{5}{2}$",
        "$x \\neq \\frac{5}{2}$"
      ],
      "answer": 0,
      "explanation": "To find the domain of a logarithmic function, the argument must be strictly greater than zero. Therefore, set $5 - 2x > 0$. Subtracting 5 from both sides gives $-2x > -5$. Dividing by $-2$ and reversing the inequality sign yields $x < \\frac{5}{2}$, making this the correct domain.",
      "id": "ap-precalculus-2-2-q1",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Solve for $x$: $\\log_4(x) + \\log_4(x - 6) = 2$.",
      "choices": [
        "$x = 8$ only",
        "$x = -2$ and $x = 8$",
        "$x = -2$ only",
        "$x = 2$ and $x = 4$"
      ],
      "answer": 0,
      "explanation": "Combining the logarithms using the product property gives $\\log_4(x(x - 6)) = 2$. Converting to exponential form yields $x^2 - 6x = 4^2$, which simplifies to $x^2 - 6x - 16 = 0$. Factoring gives $(x - 8)(x + 2) = 0$, resulting in $x = 8$ and $x = -2$. Testing these in the original equation, $x = -2$ creates a negative argument ($\\log_4(-2)$), so it is extraneous. Thus, only $x = 8$ is valid.",
      "id": "ap-precalculus-2-2-q2",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which of the following represents the correct evaluation of $\\log_5(12)$ using standard calculator functions?",
      "choices": [
        "$\\frac{\\ln(12)}{\\ln(5)}$",
        "$\\frac{\\ln(5)}{\\ln(12)}$",
        "$\\ln(12) - \\ln(5)$",
        "$12 \\cdot \\log(5)$"
      ],
      "answer": 0,
      "explanation": "By the change of base formula, $\\log_b(x) = \\frac{\\ln(x)}{\\ln(b)}$ or $\\frac{\\log(x)}{\\log(b)}$. Substituting $b = 5$ and $x = 12$ into this formula gives $\\frac{\\ln(12)}{\\ln(5)}$. This allows evaluation on standard calculators that only feature base 10 and base $e$ logarithm buttons.",
      "id": "ap-precalculus-2-2-q3",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Why must potential solutions derived from combined logarithmic equations be checked in the original equation?",
      "choices": [
        "Algebraic manipulations like combining logs can expand the domain, inadvertently introducing extraneous solutions that yield non-positive arguments.",
        "Calculators always round intermediate decimal values, requiring manual verification of exact integer answers.",
        "The base of a logarithm can change during the conversion from logarithmic form to exponential form.",
        "Exponents and logarithms are not true inverse functions when dealing with negative coefficients."
      ],
      "answer": 0,
      "explanation": "When logarithmic terms are combined using properties like $\\log(A) + \\log(B) = \\log(AB)$, the domain of the resulting single expression can be wider than the domains of the individual original logarithmic terms. This can introduce extraneous solutions that produce zero or negative arguments in the original equation, which are undefined.",
      "id": "ap-precalculus-2-2-q4",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A dataset has values $(0, 20), (1, 40), (2, 80)$. After taking the natural log of the y-values, what is the slope of the linear regression line?",
      "choices": [
        "2.000",
        "1.386",
        "0.693",
        "13.863"
      ],
      "answer": 2,
      "explanation": "The growth factor $b$ is $40/20 = 2$. The slope of the semi-log plot is $\\ln(b)$. Calculating $\\ln(2)$ gives approximately $0.693$. This represents the constant rate of increase in the logarithmic domain, which corresponds to exponential growth in the original domain.",
      "id": "ap-precalculus-2-3-q1",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "If a semi-log plot of data results in a curve with an increasing slope, what can be inferred about the original data's growth rate?",
      "choices": [
        "The data is exponential with $b < 1$.",
        "The data is exponential with $b > 1$.",
        "The data is growing faster than exponentially.",
        "The data is linear."
      ],
      "answer": 2,
      "explanation": "If the semi-log plot is linear, the original data is exponential. If the slope is increasing, the value of $\\ln(y)$ is growing faster than a constant rate implies. This indicates that the multiplicative factor is increasing over time, meaning the growth rate accelerates faster than a simple exponential function would predict.",
      "id": "ap-precalculus-2-3-q2",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Why must the dependent variable $y$ be strictly positive to use the natural logarithm transformation?",
      "choices": [
        "The natural logarithm is undefined for zero and negative real numbers.",
        "Exponential functions only exist for $y > 0$.",
        "Linear regression requires positive y-intercepts.",
        "The slope must be positive for accuracy."
      ],
      "answer": 0,
      "explanation": "The domain of the function $f(x) = \\ln(x)$ is restricted to $x > 0$. If the original data contains zero or negative values, the logarithmic transformation is mathematically invalid. Consequently, semi-log plots can only be applied to datasets consisting entirely of strictly positive dependent variable values.",
      "id": "ap-precalculus-2-3-q3",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A model $y = 50 \\cdot (0.5)^t$ represents decay. What is the y-intercept of its semi-log plot using $\\ln(y)$?",
      "choices": [
        "0.500",
        "50.000",
        "3.912",
        "-0.693"
      ],
      "answer": 2,
      "explanation": "The y-intercept of the semi-log plot corresponds to $\\ln(A)$, where $A$ is the initial value of the exponential model. Here $A = 50$. Calculating $\\ln(50)$ yields approximately $3.912$. This value represents the logarithmic magnitude of the starting concentration or amount before decay begins.",
      "id": "ap-precalculus-2-3-q4",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "What is the exact period of the trigonometric function $f(x) = 5 \\sin\\left(\\frac{3\\pi}{2} x - \\pi\\right)$?",
      "choices": [
        "\\frac{4}{3}",
        "\\frac{3\\pi}{2}",
        "\\frac{2\\pi}{3}",
        "\\frac{4\\pi}{3}"
      ],
      "answer": 0,
      "explanation": "To find the period of a sinusoidal function, use the formula $T = \\frac{2\\pi}{|b|}$. In this function, the coefficient of $x$ inside the argument is $b = \\frac{3\\pi}{2}$. Dividing $2\\pi$ by $\\frac{3\\pi}{2}$ yields $2\\pi \\cdot \\frac{2}{3\\pi} = \\frac{4}{3}$. Note that the phase shift $-\\pi$ inside does not affect the period length.",
      "id": "ap-precalculus-3-1-q1",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which of the following represents the correct range of the function $g(x) = -4 \\cos(x) + 3$?",
      "choices": [
        "[-4, 4]",
        "[-1, 7]",
        "[-7, 1]",
        "[3, 7]"
      ],
      "answer": 1,
      "explanation": "The range of a basic cosine function is $[-1, 1]$. Multiplying by $-4$ stretches the amplitude to $4$ and reflects the graph, changing the bounds to $[-4, 4]$. Adding a vertical shift of $+3$ shifts every $y$-value up by $3$, resulting in a new range of $[-4+3, 4+3]$, which simplifies to $[-1, 7]$.",
      "id": "ap-precalculus-3-1-q2",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "What is the exact value of $\\sin\\left(\\frac{5\\pi}{3}\\right)$?",
      "choices": [
        "-\\frac{1}{2}",
        "-\\frac{\\sqrt{3}}{2}",
        "\\frac{1}{2}",
        "\\frac{\\sqrt{3}}{2}"
      ],
      "answer": 1,
      "explanation": "The angle $\\frac{5\\pi}{3}$ is located in the fourth quadrant. Its reference angle is $2\\pi - \\frac{5\\pi}{3} = \\frac{\\pi}{3}$. In the fourth quadrant, the sine function is negative. The sine of the reference angle $\\frac{\\pi}{3}$ is $\\frac{\\sqrt{3}}{2}$, so incorporating the negative sign yields $-\\frac{\\sqrt{3}}{2}$.",
      "id": "ap-precalculus-3-1-q3",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Why are exact values preferred over decimal approximations in theoretical trigonometric analysis?",
      "choices": [
        "Calculators are incapable of computing trigonometric ratios for radian measures.",
        "Exact values preserve mathematical precision by avoiding rounding errors inherent in irrational numbers.",
        "Exact values eliminate the need to determine the domain restrictions of periodic functions.",
        "Decimals can only be used when an angle is measured in degrees rather than radians."
      ],
      "answer": 1,
      "explanation": "Exact values utilizing fractions, radicals, and constants like $\\pi$ maintain absolute mathematical precision. Decimal approximations of irrational numbers (such as $\\sqrt{2}$ or $\\pi$) introduce rounding errors that compound across multi-step calculations, making exact forms superior for rigorous proofs and theoretical work.",
      "id": "ap-precalculus-3-1-q4",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "What is the restricted range of the inverse cosine function, $\\arccos(x)$?",
      "choices": [
        "$[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$",
        "$[0, \\pi]$",
        "$(-\\frac{\\pi}{2}, \\frac{\\pi}{2})$",
        "$[0, 2\\pi]$"
      ],
      "answer": 1,
      "explanation": "The inverse cosine function must be restricted to a domain where it is one-to-one and covers all possible output values of the cosine function. By convention, the range of $y = \\arccos(x)$ is restricted to the interval $[0, \\pi]$, which ensures every value in $[-1, 1]$ maps to a unique angle in Quadrants I and II.",
      "id": "ap-precalculus-3-2-q1",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Find all solutions to the equation $\\tan(x) \\sin(x) = \\tan(x)$ on the interval $[0, 2\\pi)$.",
      "choices": [
        "$x = 0, \\pi$",
        "$x = \\frac{\\pi}{2}, \\frac{3\\pi}{2}$",
        "$x = 0, \\frac{\\pi}{2}, \\pi, \\frac{3\\pi}{2}$",
        "$x = \\frac{\\pi}{4}, \\frac{5\\pi}{4}$"
      ],
      "answer": 0,
      "explanation": "To solve $\\tan(x)\\sin(x) = \\tan(x)$, subtract $\\tan(x)$ from both sides to get $\\tan(x)(\\sin(x) - 1) = 0$. This gives $\\tan(x) = 0$ or $\\sin(x) = 1$. The solutions for $\\tan(x) = 0$ on $[0, 2\\pi)$ are $x = 0$ and $x = \\pi$. The solution for $\\sin(x) = 1$ is $x = \\frac{\\pi}{2}$. However, at $x = \\frac{\\pi}{2}$, $\\tan(x)$ is undefined, making it an extraneous solution. Thus, only $0$ and $\\pi$ are valid.",
      "id": "ap-precalculus-3-2-q2",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which identity should be used to transform the equation $1 - \\cos^2(x) + \\sin(x) = 1$ into a quadratic equation in terms of sine?",
      "choices": [
        "$\\sin^2(x) + \\cos^2(x) = 1$",
        "$1 + \\tan^2(x) = \\sec^2(x)$",
        "$\\sin(2x) = 2\\sin(x)\\cos(x)$",
        "$\\cos(2x) = 1 - 2\\sin^2(x)$"
      ],
      "answer": 0,
      "explanation": "The fundamental Pythagorean identity $\\sin^2(x) + \\cos^2(x) = 1$ can be rearranged as $\\sin^2(x) = 1 - \\cos^2(x)$. Substituting $\\sin^2(x)$ directly replaces the $1 - \\cos^2(x)$ term in the original equation, yielding $\\sin^2(x) + \\sin(x) = 1$, which is a solvable quadratic equation.",
      "id": "ap-precalculus-3-2-q3",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "What is the exact value of $\\arcsin\\left(-\\frac{\\sqrt{3}}{2}\\right)$?",
      "choices": [
        "$\\frac{2\\pi}{3}$",
        "$-\\frac{\\pi}{3}$",
        "$\\frac{5\\pi}{3}$",
        "$-\\frac{\\pi}{6}$"
      ],
      "answer": 1,
      "explanation": "The function $\\arcsin(x)$ outputs values restricted to $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$. We seek an angle in this interval whose sine is $-\\frac{\\sqrt{3}}{2}$. Since the sine is negative, the angle must be in the fourth quadrant within our restricted domain, which is $-\\frac{\\pi}{3}$. Note that $\\frac{5\\pi}{3}$ has the correct sine value but lies outside the restricted range.",
      "id": "ap-precalculus-3-2-q4",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A point is given in polar coordinates as $(4, \\frac{\\pi}{6})$. Which of the following is an equivalent representation of this point using a negative radius?",
      "choices": [
        "$(-4, \\frac{\\pi}{6})$",
        "$(-4, \\frac{7\\pi}{6})$",
        "$(-4, \\frac{\\pi}{3})$",
        "$(-4, \\frac{5\\pi}{6})$"
      ],
      "answer": 1,
      "explanation": "To represent the same point with a negative radius $-r$, the angle must shift by $\\pi$ radians. The original angle is $\\frac{\\pi}{6}$. Adding $\\pi$ gives $\\frac{\\pi}{6} + \\frac{6\\pi}{6} = \\frac{7\\pi}{6}$. Therefore, the equivalent point is $(-4, \\frac{7\\pi}{6})$. Other options do not result in the same rectangular coordinates $(2, 2\\sqrt{3})$, making them incorrect representations of the original location in the plane.",
      "id": "ap-precalculus-3-3-q1",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Convert the polar point $(3, \\frac{3\\pi}{4})$ to rectangular coordinates. What is the exact value of the $y$-coordinate?",
      "choices": [
        "$-\\frac{3\\sqrt{2}}{2}$",
        "$\\frac{3\\sqrt{2}}{2}$",
        "$\\frac{3}{2}$",
        "$3\\sqrt{2}$"
      ],
      "answer": 1,
      "explanation": "The $y$-coordinate in rectangular form is calculated using $y = r \\sin \\theta$. Substituting the given values, $y = 3 \\sin(\\frac{3\\pi}{4})$. The sine of $\\frac{3\\pi}{4}$ is positive in the second quadrant and equals $\\frac{\\sqrt{2}}{2}$. Multiplying this by $3$ yields $\\frac{3\\sqrt{2}}{2}$. The $x$-coordinate would be negative, but the question specifically asks for the $y$-value. This result reflects the vertical distance from the polar axis.",
      "id": "ap-precalculus-3-3-q2",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A sinusoidal function has a maximum value of 10 and a minimum value of -2. What is the equation of the midline for this function?",
      "choices": [
        "$y = 4$",
        "$y = 6$",
        "$y = 1$",
        "$y = 8$"
      ],
      "answer": 0,
      "explanation": "The midline of a sinusoidal function is the horizontal line that runs through the center of the oscillation. It is calculated as the average of the maximum and minimum values. Using the formula $y = \\frac{\\max + \\min}{2}$, we substitute the given values: $y = \\frac{10 + (-2)}{2} = \\frac{8}{2} = 4$. Thus, the midline is the line $y = 4$. This value represents the $a$ parameter in the general sinusoidal equation form.",
      "id": "ap-precalculus-3-3-q3",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which polar coordinate point represents the same location as $(2, \\frac{\\pi}{2})$ with a negative radius?",
      "choices": [
        "$(-2, \\frac{3\\pi}{2})$",
        "$(-2, \\frac{\\pi}{2})$",
        "$(2, \\frac{5\\pi}{2})$",
        "$(-2, \\frac{\\pi}{6})$"
      ],
      "answer": 0,
      "explanation": "A negative radius reverses the direction of the ray, so add π to the original angle: π/2 + π = 3π/2. Thus (−2, 3π/2) gives the same Cartesian coordinates (0, 2). A positive radius with angle 5π/2 is also equivalent geometrically, but it does not satisfy the question’s negative-radius condition.",
      "id": "ap-precalculus-3-3-q4",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A particle follows x(t) = cos(t), y(t) = sin(2t) for 0 ≤ t ≤ π, with angles in radians. When does it first reach the origin?",
      "choices": [
        "0",
        "π/2",
        "π",
        "It never reaches the origin"
      ],
      "answer": 1,
      "explanation": "Both coordinates must be zero simultaneously. On this interval, cos(t) = 0 only at t = π/2. At that time, sin(2t) = sin(π) = 0, so the particle is at the origin. Checking y = 0 alone would also include times when x is nonzero.",
      "id": "ap-precalculus-4-1-q1",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    },
    {
      "question": "Given x(t) = 3t - 1 and y(t) = t^2 + 2 for t \\ge 0, which segment of the parabola y = (x+1)^2/9 + 2 is traced?",
      "choices": [
        "x \\ge -1",
        "x \\le -1",
        "x > -1",
        "x \\neq -1"
      ],
      "answer": 0,
      "explanation": "Solve for t in terms of x: x + 1 = 3t, so t = (x+1)/3. Substitute into y: y = ((x+1)/3)^2 + 2 = (x+1)^2/9 + 2. This confirms the Cartesian equation. The param domain is t \\ge 0. Since t = (x+1)/3 and t \\ge 0, then (x+1)/3 \\ge 0, which implies x+1 \\ge 0, or x \\ge -1. Therefore, only the part of the parabola with x-values greater than or equal to -1 is traced.",
      "id": "ap-precalculus-4-1-q2",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    },
    {
      "question": "A particle is defined by x(t) = 2 + \\cos(t) and y(t) = 1 + \\sin(t) for 0 \\le t \\le 2\\pi. What is the center and radius of the resulting shape?",
      "choices": [
        "Center (2,1), Radius 1",
        "Center (1,1), Radius 2",
        "Center (0,0), Radius 1",
        "Center (2,1), Radius 2"
      ],
      "answer": 0,
      "explanation": "Recall the standard parametric equation for a circle: x = h + r\\cos(t), y = k + r\\sin(t). Comparing this to x(t) = 2 + \\cos(t) and y(t) = 1 + \\sin(t), we identify h=2, k=1, and r=1. The period is 2\\pi, and the range covers exactly one full cycle. Thus, the shape is a circle centered at (2,1) with radius 1. The coefficients of the trig functions are 1, confirming the radius.",
      "id": "ap-precalculus-4-1-q3",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    },
    {
      "question": "Which statement correctly differentiates a parametric equation from a standard Cartesian function y = f(x) regarding the direction of motion?",
      "choices": [
        "Parametric equations cannot define loops; Cartesian functions can.",
        "Cartesian functions inherently include time; parametric equations do not.",
        "Parametric equations define distinct points for distinct t, allowing direction tracing, while y=f(x) only defines a set of points.",
        "The slope of a parametric curve is always constant if it is a line."
      ],
      "answer": 2,
      "explanation": "A standard function y=f(x) defines a static relationship between x and y without inherent temporal order. While a line y=x+1 is a set of points, it does not specify if a point moves from left to right or right to left. Parametric equations introduce a parameter t (often time) that orders the points. By seeing how x and y change as t increases, we determine the direction of motion (e.g., clockwise vs counter-clockwise). This dynamic aspect is the key distinction. the response “Parametric equations cannot define loops; Cartesian functions can” is false because parametric equations easily define loops. the response “Cartesian functions inherently include time; parametric equations do not” is false because Cartesian functions do not intrinsically encode time.",
      "id": "ap-precalculus-4-1-q4",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    },
    {
      "question": "What is the exact magnitude of the vector $\\vec{w} = \\langle -5, 12 \\rangle$?",
      "choices": [
        "7",
        "13",
        "17",
        "$\\sqrt{119}$"
      ],
      "answer": 1,
      "explanation": "To find the magnitude of a vector $\\vec{w} = \\langle v_1, v_2 \\rangle$, use the formula $|\\vec{w}| = \\sqrt{v_1^2 + v_2^2}$. Substituting the given components yields $\\sqrt{(-5)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$. Thus, the exact magnitude is 13, making the second choice correct while dismissing the others as arithmetic errors.",
      "id": "ap-precalculus-4-2-q1",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    },
    {
      "question": "Given vectors $\\vec{a} = \\langle 2, -3 \\rangle$ and $\\vec{b} = \\langle 4, 5 \\rangle$, what is their dot product $\\vec{a} \\cdot \\vec{b}$?",
      "choices": [
        "$\\langle 8, -15 \\rangle$",
        "-7",
        "23",
        "$\\sqrt{65}$"
      ],
      "answer": 1,
      "explanation": "The dot product of two vectors $\\vec{a} = \\langle a_1, a_2 \\rangle$ and $\\vec{b} = \\langle b_1, b_2 \\rangle$ is calculated as $a_1b_1 + a_2b_2$. Substituting the values gives $(2)(4) + (-3)(5) = 8 - 15 = -7$. The result is a scalar, making the second choice correct and eliminating vector-form or magnitude distractors.",
      "id": "ap-precalculus-4-2-q2",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    },
    {
      "question": "Which of the following statements regarding the structural curriculum context is explicitly true?",
      "choices": [
        "Vectors and matrices are heavily tested on the official AP Precalculus exam.",
        "Unit 4 is enrichment and is NOT assessed on the AP exam.",
        "Calculus prerequisites are strictly required to compute dot products.",
        "Dot products always yield a resultant vector quantity."
      ],
      "answer": 1,
      "explanation": "The text explicitly states that Unit 4 functions as enrichment and is NOT assessed on the AP exam. It also notes that no calculus prerequisites are required and that dot products yield scalars rather than vectors. Therefore, the second choice is the only accurate statement.",
      "id": "ap-precalculus-4-2-q3",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    },
    {
      "question": "If vector $\\vec{u} = \\langle 6, 8 \\rangle$, what is the exact unit vector pointing in the same direction as $\\vec{u}$?",
      "choices": [
        "$\\langle 3, 4 \\rangle$",
        "$\\langle \\frac{3}{5}, \\frac{4}{5} \\rangle$",
        "$\\langle \\frac{6}{10}, \\frac{8}{10} \\rangle$",
        "$\\langle 6, 8 \\rangle$"
      ],
      "answer": 1,
      "explanation": "A unit vector in the direction of $\\vec{u}$ is found by dividing $\\vec{u}$ by its magnitude. The magnitude of $\\langle 6, 8 \\rangle$ is $\\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10$. Dividing each component by 10 yields $\\langle \\frac{6}{10}, \\frac{8}{10} \\rangle$, which simplifies to the exact reduced components $\\langle \\frac{3}{5}, \\frac{4}{5} \\rangle$.",
      "id": "ap-precalculus-4-2-q4",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    },
    {
      "question": "Which of the following correctly describes the condition required for a $2 \\times 2$ transformation matrix $A$ to possess an inverse system?",
      "choices": [
        "The determinant of $A$ must be strictly equal to zero.",
        "The determinant of $A$ must be non-zero, allowing the use of the reciprocal determinant scalar.",
        "The matrix $A$ must be symmetric with equal off-diagonal elements.",
        "The trace of $A$ must equal the determinant of $A$."
      ],
      "answer": 1,
      "explanation": "An inverse matrix exists if and only if the determinant of the matrix is non-zero. If the determinant is zero, the matrix is singular, meaning it collapses dimensions and cannot be reversed. Therefore, the non-zero determinant condition is required to scale the adjugate matrix properly.",
      "id": "ap-precalculus-4-3-q1",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    },
    {
      "question": "If transformation matrix $A$ is applied first, followed by transformation matrix $B$, how is the composite transformation expressed mathematically for a vector $\\vec{v}$?",
      "choices": [
        "$AB\\vec{v}$",
        "$BA\\vec{v}$",
        "$A^{-1}B\\vec{v}$",
        "$B^{-1}A\\vec{v}$"
      ],
      "answer": 1,
      "explanation": "Matrix-vector multiplication associates from right to left. When vector $\\vec{v}$ undergoes transformation $A$ first, we write $A\\vec{v}$. Applying $B$ to that result yields $B(A\\vec{v}) = BA\\vec{v}$. Thus, the composite matrix is $BA$, where the rightmost matrix acts on the vector first.",
      "id": "ap-precalculus-4-3-q2",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    },
    {
      "question": "Let $A = \\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$. What is the exact inverse matrix $A^{-1}$?",
      "choices": [
        "$\\begin{bmatrix} -2 & 1 \\\\ 1.5 & -0.5 \\end{bmatrix}$",
        "$\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix}$",
        "$\\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix}$",
        "$\\begin{bmatrix} 1 & 2 \\\\ 3 & 4 \\end{bmatrix}$"
      ],
      "answer": 2,
      "explanation": "First, compute the determinant of $A$: $\\det(A) = (1)(4) - (2)(3) = 4 - 6 = -2$. The inverse formula is $\\frac{1}{\\det(A)}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$, which gives $-\\frac{1}{2}\\begin{bmatrix} 4 & -2 \\\\ -3 & 1 \\end{bmatrix} = \\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix}$. This matches the response “$\\begin{bmatrix} -2 & 1 \\\\ 3/2 & -1/2 \\end{bmatrix}$” perfectly.",
      "id": "ap-precalculus-4-3-q3",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    },
    {
      "question": "Why is Unit 4 treated differently regarding the AP Precalculus exam?",
      "choices": [
        "It contains calculus prerequisites that are tested on the AP exam.",
        "It is classified as enrichment material and is NOT assessed on the AP Precalculus exam.",
        "It replaces all vector topics tested in Unit 3.",
        "It requires graphing calculators with specialized CAS software."
      ],
      "answer": 1,
      "explanation": "Unit 4 is explicitly designated as enrichment content within the course framework and is NOT assessed on the AP Precalculus exam. Instructors cover it for advanced preparation, but it falls outside the official exam scope.",
      "id": "ap-precalculus-4-3-q4",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "enrichment": true
    }
  ],
  "frq": [
    {
      "question": "Suppose a hypothetical polling model $P(t) = -0.05t^2 + 0.5t + 10$ estimates approval rating (in percentage points) $t$ weeks after launching a campaign. Calculate the average rate of change from $t=2$ to $t=6$. Interpret this value in the context of the campaign's performance, specifically addressing whether the approval is increasing or decreasing and at what average speed.",
      "criteria": [
        {
          "key": "calculation",
          "label": "Calculation Accuracy",
          "prompt": "Correctly evaluate $P(2)$ and $P(6)$ and compute the slope.",
          "points": 3,
          "guidance": "Ensure $P(2) = -0.2 + 1 + 10 = 10.8$ and $P(6) = -1.8 + 3 + 10 = 11.2$. Rate is $(11.2 - 10.8) / 4 = 0.1$."
        },
        {
          "key": "interpretation",
          "label": "Contextual Interpretation",
          "prompt": "Explain the meaning of the sign and magnitude in the real-world scenario.",
          "points": 3,
          "guidance": "State that the positive sign indicates approval is rising. The magnitude 0.1 means approval increases by 0.1 percentage points per week on average."
        },
        {
          "key": "precision",
          "label": "Mathematical Precision",
          "prompt": "Use appropriate units and reference the specific interval.",
          "points": 3,
          "guidance": "Explicitly mention the interval [2, 6] and use units of percentage points per week. Avoid vague language like 'goes up' without quantifying the rate."
        }
      ],
      "responseMode": "math",
      "id": "ap-precalculus-1-1-writing",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Hard",
      "format": "frq",
      "set": 1,
      "maxPoints": 9,
      "questionType": "Targeted written practice",
      "rubric": "Calculation Accuracy (3 points): Ensure $P(2) = -0.2 + 1 + 10 = 10.8$ and $P(6) = -1.8 + 3 + 10 = 11.2$. Rate is $(11.2 - 10.8) / 4 = 0.1$.\nContextual Interpretation (3 points): State that the positive sign indicates approval is rising. The magnitude 0.1 means approval increases by 0.1 percentage points per week on average.\nMathematical Precision (3 points): Explicitly mention the interval [2, 6] and use units of percentage points per week. Avoid vague language like 'goes up' without quantifying the rate.",
      "explanation": "Ensure $P(2) = -0.2 + 1 + 10 = 10.8$ and $P(6) = -1.8 + 3 + 10 = 11.2$. Rate is $(11.2 - 10.8) / 4 = 0.1$.\nState that the positive sign indicates approval is rising. The magnitude 0.1 means approval increases by 0.1 percentage points per week on average.\nExplicitly mention the interval [2, 6] and use units of percentage points per week. Avoid vague language like 'goes up' without quantifying the rate."
    },
    {
      "question": "Unit 4 is enrichment material. Imagine you are teaching a peer why the graph of $y = (x-1)(x-3)^2$ crosses the x-axis at $x=1$ but touches and turns at $x=3$. Write a short explanation (3-5 sentences) that justifies this behavior using the concept of sign changes and the exponent's parity.",
      "criteria": [
        {
          "key": "multiplicity",
          "label": "Multiplication and Simplicity",
          "prompt": "Does the response identify the specific multplicity for each root?",
          "points": 3,
          "guidance": "Must state that $x=1$ has multiplicity 1 and $x=3$ has multiplicity 2."
        },
        {
          "key": "sign_change",
          "label": "Sign Change Logic",
          "prompt": "Does the response explain how the sign of the output changes (or doesn't) across the roots?",
          "points": 3,
          "guidance": "Must link odd multiplicity to sign changes (crossing) and even multiplicity to no sign change (touching)."
        },
        {
          "key": "parity",
          "label": "Parity and Behavior",
          "prompt": "Does the response explicitly connect the concept of 'odd' vs 'even' powers to the visual behavior?",
          "points": 3,
          "guidance": "Must use terms like 'odd power' implies crossing and 'even power' implies a bounce or turn."
        }
      ],
      "responseMode": "math",
      "id": "ap-precalculus-1-2-writing",
      "domain": "Precalc: Polynomial and Rational Functions",
      "difficulty": "Hard",
      "format": "frq",
      "set": 2,
      "maxPoints": 9,
      "questionType": "Targeted written practice",
      "rubric": "Multiplication and Simplicity (3 points): Must state that $x=1$ has multiplicity 1 and $x=3$ has multiplicity 2.\nSign Change Logic (3 points): Must link odd multiplicity to sign changes (crossing) and even multiplicity to no sign change (touching).\nParity and Behavior (3 points): Must use terms like 'odd power' implies crossing and 'even power' implies a bounce or turn.",
      "explanation": "Must state that $x=1$ has multiplicity 1 and $x=3$ has multiplicity 2.\nMust link odd multiplicity to sign changes (crossing) and even multiplicity to no sign change (touching).\nMust use terms like 'odd power' implies crossing and 'even power' implies a bounce or turn."
    },
    {
      "question": "A hypothetical tech startup tracks its monthly user sign-ups. In month $0$, the startup has $500$ users. Due to marketing campaigns, the user base grows by $15\\%$ each month. Model this scenario with an exponential function, explain how to determine the time required to reach $5000$ users, and state the exact logarithmic expression.",
      "criteria": [
        {
          "key": "model",
          "label": "Exponential Model Construction",
          "prompt": "Write the correct exponential function $U(t)$ representing the user count after $t$ months, clearly defining parameters.",
          "points": 3,
          "guidance": "Expected answer: $U(t) = 500 \\cdot (1.15)^t$, where $500$ is the initial user count and $1.15$ is the growth base derived from $1 + 0.15$."
        },
        {
          "key": "equation",
          "label": "Equation Setup and Justification",
          "prompt": "Set up the equation to find when users reach $5000$ and justify the domain restrictions for $t$.",
          "points": 3,
          "guidance": "Expected answer: Set $5000 = 500 \\cdot (1.15)^t$, simplify to $10 = (1.15)^t$. Domain is $t \\ge 0$ because negative time has no physical meaning in this startup tracking context."
        },
        {
          "key": "solution",
          "label": "Logarithmic Solution Expression",
          "prompt": "Provide the exact analytical expression for $t$ using logarithms and explain the calculator choice.",
          "points": 3,
          "guidance": "Expected answer: $t = \\frac{\\ln(10)}{\\ln(1.15)}$ (or using $\\log_{1.15}(10)$). Natural logarithms are chosen for standard calculator evaluation yielding approximately $16.4$ months."
        }
      ],
      "responseMode": "math",
      "id": "ap-precalculus-2-1-writing",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Hard",
      "format": "frq",
      "set": 1,
      "maxPoints": 9,
      "questionType": "Targeted written practice",
      "rubric": "Exponential Model Construction (3 points): Expected answer: $U(t) = 500 \\cdot (1.15)^t$, where $500$ is the initial user count and $1.15$ is the growth base derived from $1 + 0.15$.\nEquation Setup and Justification (3 points): Expected answer: Set $5000 = 500 \\cdot (1.15)^t$, simplify to $10 = (1.15)^t$. Domain is $t \\ge 0$ because negative time has no physical meaning in this startup tracking context.\nLogarithmic Solution Expression (3 points): Expected answer: $t = \\frac{\\ln(10)}{\\ln(1.15)}$ (or using $\\log_{1.15}(10)$). Natural logarithms are chosen for standard calculator evaluation yielding approximately $16.4$ months.",
      "explanation": "Expected answer: $U(t) = 500 \\cdot (1.15)^t$, where $500$ is the initial user count and $1.15$ is the growth base derived from $1 + 0.15$.\nExpected answer: Set $5000 = 500 \\cdot (1.15)^t$, simplify to $10 = (1.15)^t$. Domain is $t \\ge 0$ because negative time has no physical meaning in this startup tracking context.\nExpected answer: $t = \\frac{\\ln(10)}{\\ln(1.15)}$ (or using $\\log_{1.15}(10)$). Natural logarithms are chosen for standard calculator evaluation yielding approximately $16.4$ months."
    },
    {
      "question": "A student attempts to solve the equation $\\log_3(x) + \\log_3(x - 8) = 2$. They combine the terms to get $\\log_3(x^2 - 8x) = 2$, convert it to $x^2 - 8x = 9$, factor it into $(x - 9)(x + 1) = 0$, and state the solutions are $x = 9$ and $x = -1$. Explain the mathematical error in the student's conclusion and provide the correct final answer with justification.",
      "criteria": [
        {
          "key": "error",
          "label": "Identification of Error",
          "prompt": "Identify and explain why $x = -1$ is an invalid solution.",
          "points": 3,
          "guidance": "Must mention domain restrictions or the requirement for positive arguments in logarithms."
        },
        {
          "key": "solution",
          "label": "Correct Solution",
          "prompt": "State the correct valid solution to the equation.",
          "points": 3,
          "guidance": "Must clearly state $x = 9$ as the sole valid solution."
        },
        {
          "key": "justification",
          "label": "Justification",
          "prompt": "Provide mathematical justification for why the solution is valid and why the other is discarded.",
          "points": 3,
          "guidance": "Must show substitution or reference original domain $x > 8$."
        }
      ],
      "responseMode": "math",
      "id": "ap-precalculus-2-2-writing",
      "domain": "Precalc: Exponential and Logarithmic Functions",
      "difficulty": "Hard",
      "format": "frq",
      "set": 2,
      "maxPoints": 9,
      "questionType": "Targeted written practice",
      "rubric": "Identification of Error (3 points): Must mention domain restrictions or the requirement for positive arguments in logarithms.\nCorrect Solution (3 points): Must clearly state $x = 9$ as the sole valid solution.\nJustification (3 points): Must show substitution or reference original domain $x > 8$.",
      "explanation": "Must mention domain restrictions or the requirement for positive arguments in logarithms.\nMust clearly state $x = 9$ as the sole valid solution.\nMust show substitution or reference original domain $x > 8$."
    },
    {
      "question": "A tidal monitoring station records that the depth of water, $d$, in meters, at a harbor can be modeled by a sinusoidal function of time, $t$, in hours past midnight. The maximum water depth is $12$ meters, the minimum depth is $4$ meters, and exactly $6$ hours elapse between consecutive high and low tides. Write an equation for $d(t)$ assuming a high tide occurs at $t = 0$, and explain how you determined each parameter.",
      "criteria": [
        {
          "key": "amplitude",
          "label": "Amplitude Calculation",
          "prompt": "Determine and justify the amplitude value.",
          "points": 3,
          "guidance": "Expected answer: Amplitude is $4$. Calculated as $(\\text{max} - \\text{min})/2 = (12 - 4)/2 = 8/2 = 4$."
        },
        {
          "key": "vertical_shift",
          "label": "Vertical Shift Calculation",
          "prompt": "Determine and justify the vertical shift ($d$) value.",
          "points": 3,
          "guidance": "Expected answer: Vertical shift is $8$. Calculated as $(\\text{max} + \\text{min})/2 = (12 + 4)/2 = 16/2 = 8$."
        },
        {
          "key": "period_coefficient",
          "label": "Period and Frequency Coefficient",
          "prompt": "Determine the period and the resulting coefficient $b$.",
          "points": 3,
          "guidance": "Expected answer: The time between high and low tide is $6$ hours, meaning a full cycle (high to low and back to high) takes $12$ hours. Thus $T = 12$, and $b = \\frac{2\\pi}{12} = \\frac{\\pi}{6}$. Equation: $d(t) = 4 \\cos\\left(\\frac{\\pi}{6}t\\right) + 8$."
        }
      ],
      "responseMode": "math",
      "id": "ap-precalculus-3-1-writing",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Hard",
      "format": "frq",
      "set": 1,
      "maxPoints": 9,
      "questionType": "Targeted written practice",
      "rubric": "Amplitude Calculation (3 points): Expected answer: Amplitude is $4$. Calculated as $(\\text{max} - \\text{min})/2 = (12 - 4)/2 = 8/2 = 4$.\nVertical Shift Calculation (3 points): Expected answer: Vertical shift is $8$. Calculated as $(\\text{max} + \\text{min})/2 = (12 + 4)/2 = 16/2 = 8$.\nPeriod and Frequency Coefficient (3 points): Expected answer: The time between high and low tide is $6$ hours, meaning a full cycle (high to low and back to high) takes $12$ hours. Thus $T = 12$, and $b = \\frac{2\\pi}{12} = \\frac{\\pi}{6}$. Equation: $d(t) = 4 \\cos\\left(\\frac{\\pi}{6}t\\right) + 8$.",
      "explanation": "Expected answer: Amplitude is $4$. Calculated as $(\\text{max} - \\text{min})/2 = (12 - 4)/2 = 8/2 = 4$.\nExpected answer: Vertical shift is $8$. Calculated as $(\\text{max} + \\text{min})/2 = (12 + 4)/2 = 16/2 = 8$.\nExpected answer: The time between high and low tide is $6$ hours, meaning a full cycle (high to low and back to high) takes $12$ hours. Thus $T = 12$, and $b = \\frac{2\\pi}{12} = \\frac{\\pi}{6}$. Equation: $d(t) = 4 \\cos\\left(\\frac{\\pi}{6}t\\right) + 8$."
    },
    {
      "question": "Consider the trigonometric equation $2\\cos^2(x) - 5\\cos(x) + 2 = 0$. Outline the step-by-step algebraic process to find all solutions on the interval $[0, 2\\pi)$, clearly state the substitution used, solve the resulting equation, and list the final exact angle values.",
      "criteria": [
        {
          "key": "substitution",
          "label": "Algebraic Substitution",
          "prompt": "Identify and state the appropriate variable substitution to transform the equation into a quadratic form.",
          "points": 3,
          "guidance": "Student should define a variable like $u = \\cos(x)$ and rewrite the equation as $2u^2 - 5u + 2 = 0$."
        },
        {
          "key": "factoring",
          "label": "Quadratic Solving",
          "prompt": "Show the factoring or application of the quadratic formula to find the values of the substituted variable.",
          "points": 3,
          "guidance": "Student should factor the quadratic into $(2u - 1)(u - 2) = 0$ and correctly identify $u = \\frac{1}{2}$ and $u = 2$."
        },
        {
          "key": "solutions",
          "label": "Exact Angle Values",
          "prompt": "Back-substitute and solve for $x$ on the given interval $[0, 2\\pi)$, discarding any invalid values.",
          "points": 3,
          "guidance": "Student should recognize $\\cos(x) = 2$ has no real solutions, and solve $\\cos(x) = \\frac{1}{2}$ to yield exact angles $x = \\frac{\\pi}{3}$ and $x = \\frac{5\\pi}{3}$."
        }
      ],
      "responseMode": "math",
      "id": "ap-precalculus-3-2-writing",
      "domain": "Precalc: Trigonometric and Polar Functions",
      "difficulty": "Hard",
      "format": "frq",
      "set": 2,
      "maxPoints": 9,
      "questionType": "Targeted written practice",
      "rubric": "Algebraic Substitution (3 points): Student should define a variable like $u = \\cos(x)$ and rewrite the equation as $2u^2 - 5u + 2 = 0$.\nQuadratic Solving (3 points): Student should factor the quadratic into $(2u - 1)(u - 2) = 0$ and correctly identify $u = \\frac{1}{2}$ and $u = 2$.\nExact Angle Values (3 points): Student should recognize $\\cos(x) = 2$ has no real solutions, and solve $\\cos(x) = \\frac{1}{2}$ to yield exact angles $x = \\frac{\\pi}{3}$ and $x = \\frac{5\\pi}{3}$.",
      "explanation": "Student should define a variable like $u = \\cos(x)$ and rewrite the equation as $2u^2 - 5u + 2 = 0$.\nStudent should factor the quadratic into $(2u - 1)(u - 2) = 0$ and correctly identify $u = \\frac{1}{2}$ and $u = 2$.\nStudent should recognize $\\cos(x) = 2$ has no real solutions, and solve $\\cos(x) = \\frac{1}{2}$ to yield exact angles $x = \\frac{\\pi}{3}$ and $x = \\frac{5\\pi}{3}$."
    },
    {
      "question": "A fictional robotics team models a drone's path using the parametric equations x(t) = 5t and y(t) = t^2 - 10t + 25 for t \\ge 0. Draft a 3-4 sentence technical note for the team explaining the initial launch point, the shape of the trajectory, and one specific physical constraint (like altitude) that might limit the usable range of t in a real-world simulation.",
      "criteria": [
        {
          "key": "InitialPoint",
          "label": "Initial Launch Point",
          "prompt": "Clearly state the (x, y) coordinate of the drone at t = 0, showing the substitution.",
          "points": 3,
          "guidance": "Substitute t=0 into both equations. x(0) = 5(0) = 0. y(0) = 0 - 0 + 25 = 25. The point is (0, 25). Explanation must be explicit."
        },
        {
          "key": "TrajectoryShape",
          "label": "Shape Identification",
          "prompt": "Identify the geometric shape by eliminating t or recognizing the form of y(t), describing its orientation.",
          "points": 3,
          "guidance": "From x=5t, t=x/5. Substitute into y: y = (x/5)^2 - 10(x/5) + 25 = x^2/25 - 2x + 25. This is a parabola opening upward. Since x=5t and t>=0, x>=0, so it is the right half of the parabola."
        },
        {
          "key": "PhysicalConstraint",
          "label": "Real-World Constraint",
          "prompt": "Propose a realistic physical limitation (e.g., max altitude, battery life, or obstacle) and explain how it restricts the domain of t.",
          "points": 3,
          "guidance": "Must connect a physical limit to a mathematical bound. Example: If max altitude is y=50, solve 50 = t^2 - 10t + 25 to find the max t. Or, if battery lasts 10 mins, t <= 10. The explanation must link the physical reality to the parameter limit."
        }
      ],
      "responseMode": "math",
      "id": "ap-precalculus-4-1-writing",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Hard",
      "format": "frq",
      "set": 1,
      "maxPoints": 9,
      "questionType": "Targeted written practice",
      "rubric": "Initial Launch Point (3 points): Substitute t=0 into both equations. x(0) = 5(0) = 0. y(0) = 0 - 0 + 25 = 25. The point is (0, 25). Explanation must be explicit.\nShape Identification (3 points): From x=5t, t=x/5. Substitute into y: y = (x/5)^2 - 10(x/5) + 25 = x^2/25 - 2x + 25. This is a parabola opening upward. Since x=5t and t>=0, x>=0, so it is the right half of the parabola.\nReal-World Constraint (3 points): Must connect a physical limit to a mathematical bound. Example: If max altitude is y=50, solve 50 = t^2 - 10t + 25 to find the max t. Or, if battery lasts 10 mins, t <= 10. The explanation must link the physical reality to the parameter limit.",
      "explanation": "Substitute t=0 into both equations. x(0) = 5(0) = 0. y(0) = 0 - 0 + 25 = 25. The point is (0, 25). Explanation must be explicit.\nFrom x=5t, t=x/5. Substitute into y: y = (x/5)^2 - 10(x/5) + 25 = x^2/25 - 2x + 25. This is a parabola opening upward. Since x=5t and t>=0, x>=0, so it is the right half of the parabola.\nMust connect a physical limit to a mathematical bound. Example: If max altitude is y=50, solve 50 = t^2 - 10t + 25 to find the max t. Or, if battery lasts 10 mins, t <= 10. The explanation must link the physical reality to the parameter limit."
    },
    {
      "question": "A navigational scout tracks a drone moving along a displacement vector $\\vec{d} = \\langle 12, 5 \\rangle$ meters while a constant wind applies a force vector $\\vec{F} = \\langle -3, 4 \\rangle$ Newtons. Calculate the exact magnitude of the displacement vector, compute the work done by the force using the dot product, and explain whether the wind aids or hinders the drone's motion based on your findings.",
      "criteria": [
        {
          "key": "magnitude",
          "label": "Displacement Magnitude",
          "prompt": "Calculate the exact magnitude of vector $\\vec{d}$.",
          "points": 3,
          "guidance": "Student must apply the magnitude formula to $\\langle 12, 5 \\rangle$ to arrive at the exact value of 13 meters."
        },
        {
          "key": "dotProduct",
          "label": "Work Calculation",
          "prompt": "Compute the dot product $\\vec{F} \\cdot \\vec{d}$ to find the work done.",
          "points": 3,
          "guidance": "Student must multiply corresponding components $(-3)(12) + (4)(5)$ to get $-16$ Joules."
        },
        {
          "key": "interpretation",
          "label": "Motion Interpretation",
          "prompt": "Explain what the sign of the dot product indicates about the wind's effect on the motion.",
          "points": 3,
          "guidance": "Student must state that a negative dot product indicates the force acts in a direction opposing the displacement, thus hindering the motion."
        }
      ],
      "responseMode": "math",
      "id": "ap-precalculus-4-2-writing",
      "domain": "Precalc: Functions Involving Parameters, Vectors, and Matrices",
      "difficulty": "Hard",
      "format": "frq",
      "set": 2,
      "maxPoints": 9,
      "questionType": "Targeted written practice",
      "rubric": "Displacement Magnitude (3 points): Student must apply the magnitude formula to $\\langle 12, 5 \\rangle$ to arrive at the exact value of 13 meters.\nWork Calculation (3 points): Student must multiply corresponding components $(-3)(12) + (4)(5)$ to get $-16$ Joules.\nMotion Interpretation (3 points): Student must state that a negative dot product indicates the force acts in a direction opposing the displacement, thus hindering the motion.",
      "explanation": "Student must apply the magnitude formula to $\\langle 12, 5 \\rangle$ to arrive at the exact value of 13 meters.\nStudent must multiply corresponding components $(-3)(12) + (4)(5)$ to get $-16$ Joules.\nStudent must state that a negative dot product indicates the force acts in a direction opposing the displacement, thus hindering the motion."
    }
  ],
  "flashcards": [
    {
      "term": "Average Rate of Change Formula",
      "answer": "$\\frac{f(b) - f(a)}{b - a}$",
      "id": "ap-precalculus-1-1-card1",
      "unit": "Precalc: Polynomial and Rational Functions"
    },
    {
      "term": "Covariation Definition",
      "answer": "The study of how one quantity changes in relation to another, often measured by slope.",
      "id": "ap-precalculus-1-1-card2",
      "unit": "Precalc: Polynomial and Rational Functions"
    },
    {
      "term": "Domain Restriction Impact",
      "answer": "If a discontinuity lies within [a, b], the average rate of change is undefined.",
      "id": "ap-precalculus-1-1-card3",
      "unit": "Precalc: Polynomial and Rational Functions"
    },
    {
      "term": "The Factor Theorem",
      "answer": "If $f(c) = 0$, then $(x-c)$ is a factor of the polynomial $f(x)$.",
      "id": "ap-precalculus-1-2-card1",
      "unit": "Precalc: Polynomial and Rational Functions"
    },
    {
      "term": "Odd Multiplicity Behavior",
      "answer": "The graph crosses the x-axis at the zero and changes sign.",
      "id": "ap-precalculus-1-2-card2",
      "unit": "Precalc: Polynomial and Rational Functions"
    },
    {
      "term": "Horizontal Shift Rule",
      "answer": "To shift a function $f(x)$ right by $h$ units, use $f(x-h)$.",
      "id": "ap-precalculus-1-2-card3",
      "unit": "Precalc: Polynomial and Rational Functions"
    },
    {
      "term": "Rational Function",
      "answer": "A function expressed as the quotient of two polynomials, $f(x) = \\frac{P(x)}{Q(x)}$, where the denominator polynomial $Q(x) \\neq 0$.",
      "id": "ap-precalculus-1-3-card1",
      "unit": "Precalc: Polynomial and Rational Functions"
    },
    {
      "term": "Removable Discontinuity",
      "answer": "A hole in the graph of a rational function that occurs at an $x$-value where both the numerator and denominator evaluate to zero due to a shared factor.",
      "id": "ap-precalculus-1-3-card2",
      "unit": "Precalc: Polynomial and Rational Functions"
    },
    {
      "term": "Horizontal Asymptote",
      "answer": "A horizontal line $y = L$ that describes the end behavior of a rational function as $x$ approaches positive or negative infinity, determined by comparing polynomial degrees.",
      "id": "ap-precalculus-1-3-card3",
      "unit": "Precalc: Polynomial and Rational Functions"
    },
    {
      "term": "Exponential Growth Base",
      "answer": "A base $b > 1$ in an exponential function $f(x) = a \\cdot b^x$, indicating that outputs increase by a constant multiplicative factor for equal input increments.",
      "id": "ap-precalculus-2-1-card1",
      "unit": "Precalc: Exponential and Logarithmic Functions"
    },
    {
      "term": "Exponential Decay Base",
      "answer": "A base $0 < b < 1$ in an exponential function, calculated as $b = 1 - r$ for a decay rate $r$, representing constant proportional decrease.",
      "id": "ap-precalculus-2-1-card2",
      "unit": "Precalc: Exponential and Logarithmic Functions"
    },
    {
      "term": "Enrichment Unit Status (Unit 4)",
      "answer": "Unit 4 is an enrichment unit in AP Precalculus that is explicitly NOT assessed on the official AP exam, though vital for advanced mathematical modeling.",
      "id": "ap-precalculus-2-1-card3",
      "unit": "Precalc: Exponential and Logarithmic Functions"
    },
    {
      "term": "Logarithmic Domain Condition",
      "answer": "For $\\log_b(expr)$, the argument must satisfy $expr > 0$ because the range of exponential functions is strictly positive.",
      "id": "ap-precalculus-2-2-card1",
      "unit": "Precalc: Exponential and Logarithmic Functions"
    },
    {
      "term": "Change of Base Formula",
      "answer": "$\\log_b(x) = \\frac{\\ln(x)}{\\ln(b)} = \\frac{\\log(x)}{\\log(b)}$, used to evaluate logarithms with non-standard bases on a calculator.",
      "id": "ap-precalculus-2-2-card2",
      "unit": "Precalc: Exponential and Logarithmic Functions"
    },
    {
      "term": "Extraneous Solutions in Log Equations",
      "answer": "Solutions that emerge from algebraic manipulation but violate the original domain restriction ($x > 0$) when substituted back.",
      "id": "ap-precalculus-2-2-card3",
      "unit": "Precalc: Exponential and Logarithmic Functions"
    },
    {
      "term": "Semi-log plot",
      "answer": "A graph where one axis is on a logarithmic scale and the other is linear, used to visualize exponential data as a straight line.",
      "id": "ap-precalculus-2-3-card1",
      "unit": "Precalc: Exponential and Logarithmic Functions"
    },
    {
      "term": "Slope of semi-log line",
      "answer": "The value $\\ln(b)$, where $b$ is the base of the exponential function. It represents the continuous growth or decay rate.",
      "id": "ap-precalculus-2-3-card2",
      "unit": "Precalc: Exponential and Logarithmic Functions"
    },
    {
      "term": "Exponential transformation",
      "answer": "Applying the logarithm to an exponential function $y = Ab^x$ results in the linear equation $\\ln(y) = \\ln(A) + x\\ln(b)$.",
      "id": "ap-precalculus-2-3-card3",
      "unit": "Precalc: Exponential and Logarithmic Functions"
    },
    {
      "term": "Radian Measure Formula",
      "answer": "The measure of an angle in radians is given by $\\theta = \\frac{s}{r}$, where $s$ is the arc length intercepted and $r$ is the radius of the circle.",
      "id": "ap-precalculus-3-1-card1",
      "unit": "Precalc: Trigonometric and Polar Functions"
    },
    {
      "term": "Period of a Sinusoidal Function",
      "answer": "For a function of the form $f(x) = a \\sin(b(x - c)) + d$, the period is calculated as $T = \\frac{2\\pi}{|b|}$.",
      "id": "ap-precalculus-3-1-card2",
      "unit": "Precalc: Trigonometric and Polar Functions"
    },
    {
      "term": "Unit Circle Coordinates",
      "answer": "For any point on the unit circle corresponding to an angle $\\theta$, the $x$-coordinate represents $\\cos(\\theta)$ and the $y$-coordinate represents $\\sin(\\theta)$.",
      "id": "ap-precalculus-3-1-card3",
      "unit": "Precalc: Trigonometric and Polar Functions"
    },
    {
      "term": "Restricted Domain of Arcsin",
      "answer": "The interval $[-\\frac{\\pi}{2}, \\frac{\\pi}{2}]$ used to define the inverse sine function.",
      "id": "ap-precalculus-3-2-card1",
      "unit": "Precalc: Trigonometric and Polar Functions"
    },
    {
      "term": "Extraneous Solution in Trig Equations",
      "answer": "A solution introduced during algebraic manipulation (such as dividing by a variable expression or squaring) that does not satisfy the original equation.",
      "id": "ap-precalculus-3-2-card2",
      "unit": "Precalc: Trigonometric and Polar Functions"
    },
    {
      "term": "General Solution Form",
      "answer": "Expressing all infinite solutions of a periodic trigonometric equation by adding integer multiples of the function's period (e.g., $+ 2\\pi k$) to the primary domain solutions.",
      "id": "ap-precalculus-3-2-card3",
      "unit": "Precalc: Trigonometric and Polar Functions"
    },
    {
      "term": "Amplitude Formula",
      "answer": "The amplitude $a$ of a sinusoidal function is half the difference between the maximum and minimum values: $a = \\frac{\\max - \\min}{2}$.",
      "id": "ap-precalculus-3-3-card1",
      "unit": "Precalc: Trigonometric and Polar Functions"
    },
    {
      "term": "Polar to Rectangular x",
      "answer": "The rectangular $x$-coordinate is found using the formula $x = r \\cos \\theta$, where $r$ is the radius and $\\theta$ is the angle in radians.",
      "id": "ap-precalculus-3-3-card2",
      "unit": "Precalc: Trigonometric and Polar Functions"
    },
    {
      "term": "Equivalent Polar Point",
      "answer": "A point $(r, \\theta)$ is equivalent to $(-r, \\theta + \\pi)$ because a negative radius points in the opposite direction, requiring a $180^\\circ$ ($\\pi$ rad) rotation to land on the same spot.",
      "id": "ap-precalculus-3-3-card3",
      "unit": "Precalc: Trigonometric and Polar Functions"
    },
    {
      "term": "Parameter in Parametric Equations",
      "answer": "The independent variable (often t) that determines the values of x and y; it typically represents time or a geometric angle, allowing the tracking of motion direction and speed along a curve.",
      "id": "ap-precalculus-4-1-card1",
      "unit": "Precalc: Functions Involving Parameters, Vectors, and Matrices"
    },
    {
      "term": "Eliminating the Parameter",
      "answer": "The algebraic process of removing the variable t from equations x(t) and y(t) to find a Cartesian equation y(x). This is often done by solving one equation for t and substituting it into the other, though it can also use identities like sin^2 + cos^2 = 1.",
      "id": "ap-precalculus-4-1-card2",
      "unit": "Precalc: Functions Involving Parameters, Vectors, and Matrices"
    },
    {
      "term": "Lissajous Curve",
      "answer": "A specific type of parametric curve formed by x = A sin(at + \\delta) and y = B sin(bt). The ratio a/b determines the shape's complexity; non-integer ratios create open, intricate patterns often seen in oscilloscope displays.",
      "id": "ap-precalculus-4-1-card3",
      "unit": "Precalc: Functions Involving Parameters, Vectors, and Matrices"
    },
    {
      "term": "Vector Magnitude Formula",
      "answer": "$|\\vec{v}| = \\sqrt{v_1^2 + v_2^2}$ for any vector $\\vec{v} = \\langle v_1, v_2 \\rangle$.",
      "id": "ap-precalculus-4-2-card1",
      "unit": "Precalc: Functions Involving Parameters, Vectors, and Matrices"
    },
    {
      "term": "Dot Product Formula",
      "answer": "$\\vec{u} \\cdot \\vec{v} = u_1v_1 + u_2v_2$, resulting in a scalar quantity.",
      "id": "ap-precalculus-4-2-card2",
      "unit": "Precalc: Functions Involving Parameters, Vectors, and Matrices"
    },
    {
      "term": "AP Exam Status of Unit 4",
      "answer": "Unit 4 is enrichment and is NOT assessed on the AP exam.",
      "id": "ap-precalculus-4-2-card3",
      "unit": "Precalc: Functions Involving Parameters, Vectors, and Matrices"
    },
    {
      "term": "Matrix Determinant Condition for Invertibility",
      "answer": "A $2 \\times 2$ matrix $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ is invertible if and only if its determinant $\\det(A) = ad - bc \\neq 0$.",
      "id": "ap-precalculus-4-3-card1",
      "unit": "Precalc: Functions Involving Parameters, Vectors, and Matrices"
    },
    {
      "term": "Composite Transformation Order",
      "answer": "When applying transformation $A$ followed by transformation $B$ to a vector $\\vec{v}$, the composite operation is written as $BA\\vec{v}$, because matrix multiplication acts from right to left.",
      "id": "ap-precalculus-4-3-card2",
      "unit": "Precalc: Functions Involving Parameters, Vectors, and Matrices"
    },
    {
      "term": "Inverse of a $2 \\times 2$ Matrix",
      "answer": "Given $A = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}$ with $\\det(A) \\neq 0$, its inverse is $A^{-1} = \\frac{1}{ad - bc}\\begin{bmatrix} d & -b \\\\ -c & a \\end{bmatrix}$.",
      "id": "ap-precalculus-4-3-card3",
      "unit": "Precalc: Functions Involving Parameters, Vectors, and Matrices"
    }
  ],
  "references": [
    {
      "title": "College Board course framework and current guidance",
      "url": "https://apcentral.collegeboard.org/courses/ap-precalculus",
      "description": "Official course reference. AscendSAT lessons and questions are original instructional practice."
    },
    {
      "title": "Official exam and response-format information",
      "url": "https://apcentral.collegeboard.org/courses/ap-precalculus/exam",
      "description": "Confirm current exam structure and calculator rules with the official guidance."
    }
  ],
  "exam": {
    "date": "2027-05-11",
    "note": "Original instructional practice, not a complete timed exam form or a calibrated AP score conversion."
  }
};
