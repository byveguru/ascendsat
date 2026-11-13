// Original instructional calculus content. Chapter checks are also practice-bank items.
export const CALCULUS_BC_CONTENT = {
  "lessons": [
    {
      "id": "calc-bc-lesson-1",
      "title": "1.1 Limits from expressions and tables",
      "domain": "Calc BC: Limits & Continuity",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Limits from expressions and tables"
        },
        {
          "type": "text",
          "text": "A limit describes nearby behavior rather than requiring the function to be defined at the target. A two-sided limit exists only when the left and right limits agree. Evaluate a continuous expression by substitution; when substitution gives 0/0, rewrite the expression on a punctured neighborhood before taking the limit. Factoring and rationalizing preserve nearby values even though the original expression may remain undefined at the target. A table supplies evidence, not a proof that an oscillating or irregular function has a limit."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For x ≠ 3, (x² − 9)/(x − 3) = x + 3. Hence the limit as x approaches 3 is 6. Assigning a different value to the function at 3 does not alter this limit. For a piecewise function, compute both one-sided limits separately before comparing them."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Do not interpret 0/0 as zero or as a final answer. It signals that direct substitution has not resolved the limit. A function value and a nearby limiting value answer different questions."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider evaluating the limit as x approaches 4 of the expression (x² - 5x + 4) / (x - 4) for x ≠ 4. Direct substitution yields 0/0, which indicates that the function is undefined at x = 4 and requires algebraic simplification. Factor the numerator into (x - 4)(x - 1). For all x in the punctured neighborhood where x ≠ 4, the expression simplifies to (x - 1)(x - 4) / (x - 4) = x - 1. Taking the limit of this simplified continuous expression as x approaches 4 gives 4 - 1 = 3. Thus, the two-sided limit exists and equals 3, regardless of whether the function is defined at x = 4 or assigned a different value there."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common misconception is treating 0/0 as a numerical value like 0 or 1, or concluding that a limit does not exist simply because the function is undefined at the target value. The 0/0 indeterminate form only reveals that the algebraic form must be manipulated using techniques like factoring or rationalizing to uncover the behavior on the punctured neighborhood surrounding the target value."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-1-1",
          "domain": "Calc BC: Limits & Continuity",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Find lim as x→3 of (x²−9)/(x−3).",
          "choices": [
            "0",
            "3",
            "6",
            "Does not exist"
          ],
          "answer": 2,
          "explanation": "Factor x²−9=(x−3)(x+3). Nearby values equal x+3, which approaches6.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-1-2",
          "domain": "Calc BC: Limits & Continuity",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "The left limit of f at2 is4 and the right limit is5. What is the two-sided limit?",
          "choices": [
            "4",
            "5",
            "4.5",
            "Does not exist"
          ],
          "answer": 3,
          "explanation": "The unequal one-sided limits cannot define one two-sided limit.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-2",
      "title": "1.2 Continuity and the Intermediate Value Theorem",
      "domain": "Calc BC: Limits & Continuity",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Continuity and the Intermediate Value Theorem"
        },
        {
          "type": "text",
          "text": "Continuity at c requires f(c) to exist, the limit at c to exist, and those values to agree. A removable discontinuity can be repaired by changing a point value. A jump cannot be repaired by changing only that point. The Intermediate Value Theorem requires continuity on the entire closed interval; if a target lies between the endpoint values, the theorem guarantees at least one location attaining the target. It does not establish uniqueness or locate the point exactly."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "Let f(x)=x³+x−1 on [0,1]. The polynomial is continuous, f(0)=−1 and f(1)=1. Since0 lies between −1 and1, IVT guarantees a root in(0,1). The conclusion comes from continuity plus the endpoint comparison, not merely from drawing a plausible curve."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "A sign change without continuity is insufficient:1/x changes sign across0 but never equals0. State the hypothesis before invoking the theorem."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider the function g(x) = 2x^3 - x^2 - 2 on the closed interval [1, 2]. The function g is a polynomial, which guarantees it is continuous everywhere, including on [1, 2]. Evaluating the function at the endpoints yields g(1) = 2(1)^3 - (1)^2 - 2 = -1 and g(2) = 2(2)^3 - (2)^2 - 2 = 10. We wish to determine if there is a value c in the interval (1, 2) such that g(c) = 4. Since g is continuous on [1, 2] and the target value 4 lies strictly between the endpoint values -1 and 10 (that is, -1 < 4 < 10), the Intermediate Value Theorem guarantees the existence of at least one number c in (1, 2) such that g(c) = 4. Setting 2c^3 - c^2 - 2 = 4 gives 2c^3 - c^2 - 6 = 0. While an exact radical root may be cumbersome, confirming the hypotheses of continuity and the functional value bracket is the core calculus requirement."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A frequent misconception is assuming that the Intermediate Value Theorem guarantees a unique solution, or that finding a value where the function bounds a target implies no other roots exist. IVT only guarantees existence, not uniqueness. Furthermore, students often forget to explicitly state that the function is continuous on the closed interval before checking the endpoint values. Without establishing continuity first, any sign change or intermediate value observation cannot validly invoke the theorem."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-2-1",
          "domain": "Calc BC: Limits & Continuity",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "A function equals (x²−4)/(x−2) for x≠2. Which f(2) makes it continuous?",
          "choices": [
            "0",
            "2",
            "4",
            "No such value"
          ],
          "answer": 2,
          "explanation": "The nearby expression equals x+2, whose limit at2 is4.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-2-2",
          "domain": "Calc BC: Limits & Continuity",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Which condition is needed to apply IVT on [a,b]?",
          "choices": [
            "Differentiability only at a",
            "Continuity on [a,b]",
            "A positive derivative everywhere",
            "Equal endpoint values"
          ],
          "answer": 1,
          "explanation": "IVT requires continuity throughout the interval; differentiability is stronger and unnecessary.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-3",
      "title": "2.1 Derivative as a limit and a rate",
      "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Derivative as a limit and a rate"
        },
        {
          "type": "text",
          "text": "The derivative f′(a) is the limit of the difference quotient [f(a+h)−f(a)]/h as h approaches0, when that finite limit exists. It is the tangent slope and instantaneous rate of change. Its units are output units per input unit. Differentiability implies continuity, but continuity does not imply differentiability: a corner can join continuously while its one-sided slopes disagree. Distinguish the derivative at a point from the derivative function."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For f(x)=x², [f(a+h)−f(a)]/h=2a+h when h≠0, so f′(a)=2a. At a=3, the tangent slope is6. If x is seconds and f is meters, this derivative is6meters per second. For |x| at0, the slopes from opposite sides are−1 and1, so no derivative exists."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Cancel h only after expanding the numerator. The derivative is a limiting slope, not the quotient f(a)/a."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider the position function s(t) = t^3 in meters, where t is measured in seconds. To find the instantaneous velocity at t = 2 seconds, we compute the derivative using the limit definition: s'(2) = limit as h approaches 0 of [(2+h)^3 - 2^3]/h. Expanding the numerator gives [8 + 12h + 6h^2 + h^3 - 8]/h = [12h + 6h^2 + h^3]/h. Factoring out h for h not equal to 0 yields 12 + 6h + h^2. Taking the limit as h approaches 0, we find s'(2) = 12 meters per second. This represents the exact rate at which position is changing at that specific instant."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common error is confusing the instantaneous rate of change at a specific point with the average rate of change over an interval. The average velocity over [2, 2+h] is the secant slope given by the difference quotient itself, whereas the instantaneous velocity is the limit of that quotient as the interval length h shrinks to zero. Additionally, remember to explicitly cancel h only after factoring it completely from the numerator to avoid division by zero."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-3-1",
          "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "What limit defines f′(2)?",
          "choices": [
            "lim h→0 [f(2+h)−f(2)]/h",
            "lim h→0 f(2+h)/h",
            "lim h→0 [f(2+h)−f(h)]/2",
            "f(2)/2"
          ],
          "answer": 0,
          "explanation": "The difference quotient compares f near2 with f(2), then divides by the change h.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-3-2",
          "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Which statement is always true?",
          "choices": [
            "Continuity implies differentiability",
            "Differentiability implies continuity",
            "A corner implies discontinuity",
            "Every continuous function has a tangent slope"
          ],
          "answer": 1,
          "explanation": "A differentiable function must be continuous, but |x| is continuous and not differentiable at0.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-4",
      "title": "2.2 Power, product and quotient rules",
      "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Power, product and quotient rules"
        },
        {
          "type": "text",
          "text": "The power rule gives d(xⁿ)/dx=nxⁿ⁻¹ wherever the expression is differentiable. Derivatives are linear: constants factor out, sums differentiate term by term, and constants alone have derivative0. Products require f′g+fg′; a quotient requires (f′g−fg′)/g² where g≠0. The basic rules describe local changes, so all domain restrictions still matter. An algebraically simplified form can make a derivative easier to verify."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For y=(x²+1)eˣ, product rule gives y′=2xeˣ+(x²+1)eˣ=eˣ(x²+2x+1). For y=x/(x+1), quotient rule gives [(x+1)−x]/(x+1)²=1/(x+1)², valid only when x≠−1."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "The derivative of a product is not the product of derivatives. Keep the order in the quotient numerator consistent before simplifying."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider finding the derivative of y = (x³ - 2x) / sin(x) at x = pi/2. Let f(x) = x³ - 2x and g(x) = sin(x). The quotient rule states that y' = (f'g - fg') / g². First, compute the individual derivatives: f'(x) = 3x² - 2 and g'(x) = cos(x). At x = pi/2, f(pi/2) = (pi³/8) - pi, f'(pi/2) = 3(pi²/4) - 2, g(pi/2) = 1, and g'(pi/2) = 0. Substituting these values into the quotient formula gives y'(pi/2) = [ (3pi²/4 - 2)(1) - ((pi³/8 - pi)(0) ] / (1)² = 3pi²/4 - 2. The domain restriction requires sin(x) not equal to 0, which holds at x = pi/2."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common error when applying the quotient rule is reversing the subtraction order in the numerator, writing fg' - f'g instead of the correct f'g - fg'. Because subtraction is not commutative, this sign error inverts the final derivative. Always verify that the derivative of the numerator multiplied by the denominator comes first, preserving the correct sign for rates of change."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-4-1",
          "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Differentiate x³−4x+7.",
          "choices": [
            "3x²−4",
            "3x²+7",
            "x²−4",
            "3x²−4x"
          ],
          "answer": 0,
          "explanation": "Differentiate each term:3x²,−4,0.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-4-2",
          "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "If f(x)=x²sin x, what is f′(x)?",
          "choices": [
            "2xcos x",
            "2xsin x+x²cos x",
            "x²cos x",
            "2xsin x−x²cos x"
          ],
          "answer": 1,
          "explanation": "Use product rule, differentiating each factor once and adding the two products.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-5",
      "title": "3.1 Chain rule and inverse functions",
      "domain": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Chain rule and inverse functions"
        },
        {
          "type": "text",
          "text": "The chain rule differentiates a composition by multiplying the outer derivative evaluated at the inner function by the inner derivative. For an invertible differentiable function with f′(a)≠0, the inverse derivative at f(a) is1/f′(a). Logs and inverse trig functions require attention to domains. Write the nested structure before differentiating so a missing inner derivative is easy to detect."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For y=sin(x²), the outer derivative is cos(x²) and the inner derivative is2x, giving2xcos(x²). If f(2)=5 and f′(2)=3, then (f⁻¹)′(5)=1/3. The inverse derivative is evaluated at the output5, not at the original input2."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Reciprocal function1/f and inverse function f⁻¹ are different. Chain rule factors multiply; they are not added."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider the function f(x) = x³ + 2x - 1. We want to find the derivative of its inverse function at the point x = 2. First, we find the input a such that f(a) = 2. Testing small integers, f(1) = 1 + 2 - 1 = 2, so a = 1. Next, we compute the derivative of f: f'(x) = 3x² + 2. Evaluating at a = 1 gives f'(1) = 3(1)² + 2 = 5. By the inverse function derivative formula, (f⁻¹)′(2) = 1 / f'(1) = 1/5. We assume f is differentiable and strictly increasing, confirmed by f'(x) > 0 for all real x."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A frequent error is evaluating the derivative of the original function at the target output value instead of finding the corresponding input a. Remember that if f(a) = b, then (f⁻¹)′(b) = 1 / f'(a). Always solve f(a) = b for a first before applying the reciprocal derivative formula."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-5-1",
          "domain": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Differentiate (3x+1)⁴.",
          "choices": [
            "4(3x+1)³",
            "12(3x+1)³",
            "(3x+1)³",
            "12(3x+1)⁴"
          ],
          "answer": 1,
          "explanation": "Multiply the outer derivative4(3x+1)³ by inner derivative3.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-5-2",
          "domain": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "If f(1)=4 and f′(1)=−2, what is (f⁻¹)′(4)?",
          "choices": [
            "−2",
            "2",
            "−1/2",
            "1/2"
          ],
          "answer": 2,
          "explanation": "At the corresponding output4, the inverse slope is the reciprocal of−2.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-6",
      "title": "3.2 Implicit differentiation",
      "domain": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Implicit differentiation"
        },
        {
          "type": "text",
          "text": "When x and y are related implicitly, differentiate both sides with respect to x while treating y as a function of x. Every differentiated y-expression needs the chain rule factor y′. Collect terms containing y′ and solve algebraically. A resulting quotient describes a tangent slope only where its denominator is nonzero and the point actually belongs to the original curve. Implicit relations can contain vertical tangents or multiple branches."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For x²+y²=25, differentiating yields2x+2yy′=0, so y′=−x/y when y≠0. At(3,4), the slope is−3/4. At(5,0), this quotient is undefined; the circle has a vertical tangent there rather than a finite slope. Verify a proposed point by substitution before calculating."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Do not differentiate y² as2y without y′. A zero denominator alone is not a complete classification of every implicit curve."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Start with the implicit equation x^3 + x y + y^3 = 5. Differentiate both sides with respect to x, treating y as a function of x. The derivatives are:\n- d/dx of x^3 is 3 x^2\n- d/dx of x y is y + x y′ (product rule, chain rule for y)\n- d/dx of y^3 is 3 y^2 y′\nSet the sum to zero because the right side is constant:\n3 x^2 + y + x y′ + 3 y^2 y′ = 0.\nCollect the y′ terms: (x + 3 y^2) y′ = -(3 x^2 + y). Hence y′ = -(3 x^2 + y)/(x + 3 y^2).\nVerify that the chosen point (2, -1) lies on the curve: 2^3 + 2·(-1) + (-1)^3 = 8 - 2 - 1 = 5, so it is valid.\nCompute the derivative at that point: numerator = -(3·4 + (-1)) = -(12 - 1) = -11. Denominator = 2 + 3·(1) = 5. Therefore y′ = -11/5, a negative slope of -2.2.\nThis calculation illustrates the need for the chain rule in the term x y and shows how the derivative depends on both x and y values."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common misconception is to substitute x and y into the differentiated formula before checking that the point satisfies the original relation. The slope y′ is meaningful only at points on the curve. In this example, testing (2, -1) confirms membership; otherwise, the result would describe an extraneous slope. Always solve for y′ in terms of x and y, then substitute a point that satisfies the implicit equation. This practice avoids errors that arise from ignoring the implicit dependence of y on x, which would lead to omitting the y′ factor in the product xy or misapplying the chain rule. For the derivative formula, also check its denominator. A zero denominator with nonzero numerator at a regular point can indicate a vertical tangent; if both vanish, further analysis is needed. Membership in the curve alone does not resolve a singular point."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-6-1",
          "domain": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "On x²+y²=25, find dy/dx at(3,4).",
          "choices": [
            "3/4",
            "−3/4",
            "−4/3",
            "4/3"
          ],
          "answer": 1,
          "explanation": "Implicit differentiation gives y′=−x/y; substitute3 and4.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-6-2",
          "domain": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Differentiate xy=6 implicitly.",
          "choices": [
            "y′=−y/x",
            "y′=6/x",
            "y′=−x/y",
            "y′=0"
          ],
          "answer": 0,
          "explanation": "Product rule gives y+xy′=0, so y′=−y/x for x≠0.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-7",
      "title": "4.1 Motion: position, velocity and acceleration",
      "domain": "Calc BC: Contextual Applications of Differentiation",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Motion: position, velocity and acceleration"
        },
        {
          "type": "text",
          "text": "Velocity is the derivative of position and acceleration is the derivative of velocity. Speed is the nonnegative magnitude |v|. A particle moves right when v>0 and left when v<0. It speeds up when velocity and acceleration have the same sign and slows down when their signs differ. A zero velocity is only a candidate for a direction change; inspect the sign on each side. Interpret a derivative using the units and quantity in the question."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "Suppose v(t)=t−2 and a(t)=1. At t=1, velocity is−1, so motion is leftward; acceleration is positive, so speed is decreasing. At t=3, both are positive and speed increases. At t=2, velocity changes from negative to positive, so the particle reverses direction."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Positive acceleration does not automatically mean speeding up. Signed velocity and nonnegative speed are different quantities."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider a particle moving along a horizontal axis with position function s(t) = t^3 - 6t^2 + 9t meters for t >= 0 seconds. The velocity is v(t) = s'(t) = 3t^2 - 12t + 9 = 3(t - 1)(t - 3) m/s, and the acceleration is a(t) = v'(t) = 6t - 12 = 6(t - 2) m/s^2. At t = 4 seconds, v(4) = 3(3)(1) = 9 m/s and a(4) = 6(2) = 12 m/s^2. Since both v(4) and a(4) are positive, the particle is moving to the right and speeding up. At t = 1.5 seconds, v(1.5) = 3(0.5)(-1.5) = -2.25 m/s and a(1.5) = 6(-0.5) = -3 m/s^2. Here, velocity is negative (moving left) while acceleration is also negative, meaning velocity and acceleration share the same sign, so the particle is again speeding up despite the negative acceleration."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common mistake is assuming that a positive acceleration means a particle is speeding up and negative acceleration means it is slowing down. Acceleration only tells you the rate of change of velocity. A particle speeds up whenever velocity and acceleration have the same sign (both positive or both negative) and slows down when their signs differ, regardless of whether the acceleration itself is positive or negative."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-7-1",
          "domain": "Calc BC: Contextual Applications of Differentiation",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "A particle has v=−3m/s and a=2m/s². It is:",
          "choices": [
            "Moving right and speeding up",
            "Moving left and slowing down",
            "Moving left and speeding up",
            "At rest"
          ],
          "answer": 1,
          "explanation": "Opposite signs of velocity and acceleration imply decreasing speed; negative velocity means leftward motion.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-7-2",
          "domain": "Calc BC: Contextual Applications of Differentiation",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "If s(t)=t³−3t², what is a(t)?",
          "choices": [
            "3t²−6t",
            "6t−6",
            "6t",
            "t²−6t"
          ],
          "answer": 1,
          "explanation": "Differentiate position twice: v=3t²−6t, a=6t−6.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-8",
      "title": "4.2 Related rates and linear approximation",
      "domain": "Calc BC: Contextual Applications of Differentiation",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Related rates and linear approximation"
        },
        {
          "type": "text",
          "text": "Related-rate problems connect quantities through an equation and then differentiate with respect to time. Substitute instant-specific values after differentiation, because the quantities change over time. A linear approximation L(x)=f(a)+f′(a)(x−a) uses a nearby known point to estimate a function. A tangent approximation is local, and concavity determines whether it lies above or below the curve."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For a circle A=πr², dA/dt=2πr dr/dt. If r=3cm and dr/dt=2cm/s, the area increases at12πcm²/s. Separately, linearizing √x at x=4 gives L(x)=2+(x−4)/4, so √4.1≈2.025. Since √x is concave down for positive x, the tangent estimate is an overestimate."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Do not set a changing radius equal to its current number before differentiating. Include squared units for area rates."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider a spherical balloon being inflated such that its radius increases at a constant rate of 0.5 cm/s. Find the rate of change of its volume when the radius is 4 cm. The volume of a sphere is V = (4/3)pi r cubed. Differentiating implicitly with respect to time t yields dV/dt = 4 pi r squared (dr/dt). Substituting r = 4 cm and dr/dt = 0.5 cm/s gives dV/dt = 4 pi (16) (0.5) = 32 pi cm cubed per second. For linear approximation, let f(x) = x cubed - 2x. To estimate f(2.1), use the tangent line at a = 2. Since f(2) = 8 - 4 = 4 and f'(x) = 3x squared - 2, we find f'(2) = 3(4) - 2 = 10. The linearization is L(x) = 4 + 10(x - 2). Thus, f(2.1) is approximately L(2.1) = 4 + 10(0.1) = 5.0."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A critical misconception in related rates is substituting instant-specific values for variables before taking the derivative with respect to time. Quantities that vary dynamically, such as radius r, must remain variable during differentiation; plugging in r = 4 beforehand incorrectly treats the radius as a static constant, yielding a derivative of zero. For linear approximations, remember that the tangent line reflects local behavior only. Because the second derivative f''(x) = 6x is positive for x > 0, the graph is concave up, meaning the linear approximation 5.0 is an underestimate of the true value f(2.1) = 5.061. Always state units clearly, such as cubic centimeters per second for volume rates, and verify concavity to determine whether local linear estimates overapproximate or underapproximate the function."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-8-1",
          "domain": "Calc BC: Contextual Applications of Differentiation",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "A circle radius is3cm and increasing at2cm/s. Find dA/dt.",
          "choices": [
            "6πcm²/s",
            "9πcm²/s",
            "12πcm²/s",
            "18πcm²/s"
          ],
          "answer": 2,
          "explanation": "Differentiate A=πr²: A′=2πrr′=2π(3)(2)=12π.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-8-2",
          "domain": "Calc BC: Contextual Applications of Differentiation",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Using the tangent at4, estimate √4.1.",
          "choices": [
            "2.1",
            "2.05",
            "2.025",
            "2.0025"
          ],
          "answer": 2,
          "explanation": "f(4)=2 and f′(4)=1/4, so L(4.1)=2+0.1/4=2.025.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-9",
      "title": "5.1 Mean Value Theorem and extrema",
      "domain": "Calc BC: Analytical Applications of Differentiation",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Mean Value Theorem and extrema"
        },
        {
          "type": "text",
          "text": "The Mean Value Theorem requires continuity on[a,b] and differentiability on(a,b). It guarantees a point where the derivative equals the average rate over the interval. Critical numbers occur where the derivative is zero or undefined while the function is defined. To find absolute extrema on a closed interval for a continuous function, compare the function values at all critical numbers in the interval and both endpoints. An equation alone does not supply the required theorem hypotheses."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For f(x)=x² on[1,3], the average slope is(9−1)/2=4. Since f′(x)=2x, the MVT point is c=2. For f(x)=x²−4x on[0,5], the critical point is x=2. Compare f(0)=0,f(2)=−4,f(5)=5: the absolute minimum is−4 and maximum5."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "A local extremum need not be absolute. Endpoints are essential in a closed-interval comparison even when their derivatives are not zero."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider the function f(x) = x^3 - 3x on the closed interval [0, 2]. First, verify the hypotheses of the Mean Value Theorem: f(x) is a polynomial, so it is continuous on [0, 2] and differentiable on (0, 2). The average rate of change over [0, 2] is (f(2) - f(0)) / (2 - 0) = (2 - 0) / 2 = 1. Taking the derivative, f'(x) = 3x^2 - 3. Setting f'(c) = 1 yields 3c^2 - 3 = 1, so 3c^2 = 4, giving c = 2/sqrt(3) (approximately 1.155), which lies within (0, 2). To find absolute extrema on [0, 2], find critical numbers by setting f'(x) = 0, giving 3x^2 - 3 = 0, so x = 1 (since x = -1 is outside the interval). Evaluate f at the critical number and endpoints: f(0) = 0, f(1) = -2, and f(2) = 2. Comparing these values, the absolute maximum is 2 at x = 2, and the absolute minimum is -2 at x = 1."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common misconception is checking only the critical numbers for absolute extrema while ignoring interval endpoints, or assuming the MVT applies when a function fails differentiability at a single point inside the interval. Always verify both continuity on the closed interval and differentiability on the open interval before applying the MVT."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-9-1",
          "domain": "Calc BC: Analytical Applications of Differentiation",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "For f(x)=x² on[1,3], which c satisfies the MVT conclusion?",
          "choices": [
            "1",
            "2",
            "3",
            "4"
          ],
          "answer": 1,
          "explanation": "The secant slope is4 and f′(c)=2c=4 at c=2.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-9-2",
          "domain": "Calc BC: Analytical Applications of Differentiation",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Find the absolute minimum of x²−4x on[0,5].",
          "choices": [
            "0",
            "−4",
            "5",
            "−2"
          ],
          "answer": 1,
          "explanation": "Evaluate at endpoints and critical point x=2; the smallest value is−4.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-10",
      "title": "5.2 Derivative signs, concavity and optimization",
      "domain": "Calc BC: Analytical Applications of Differentiation",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Derivative signs, concavity and optimization"
        },
        {
          "type": "text",
          "text": "A positive derivative makes a differentiable function increase on an interval, while a negative derivative makes it decrease. A derivative changing from positive to negative supports a local maximum; the reverse supports a minimum. Concavity depends on the second derivative: positive means concave up and negative means concave down. An inflection point requires a concavity change, not merely a zero second derivative. In optimization, define the objective, use the constraint to reduce variables, and compare relevant candidates within the feasible domain."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For f(x)=x³−3x, f′=3(x−1)(x+1). Its signs are positive, negative, positive across−1 and1, so f has a local maximum at−1 and a local minimum at1. Also f″=6x changes sign at0, giving an inflection point. A rectangle with fixed perimeter20 has area x(10−x), maximized at x=5."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Do not use f″=0 alone as proof of inflection; x⁴ has f″(0)=0 but no concavity change. A physical constraint can exclude algebraic candidates."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider the function g(x) = 2x^3 - 9x^2 + 12x on the interval [0, 3]. First, find the first derivative: g'(x) = 6x^2 - 18x + 12 = 6(x - 1)(x - 2). Setting g'(x) = 0 yields critical points at x = 1 and x = 2. Testing the intervals, g'(x) > 0 for x in [0, 1), g'(x) < 0 for x in (1, 2), and g'(x) > 0 for x in (2, 3]. Thus, g has a local maximum at x = 1 with value g(1) = 5 and a local minimum at x = 2 with value g(2) = 4. To find the absolute extrema on the closed interval [0, 3], evaluate g at the critical points and endpoints: g(0) = 0, g(1) = 5, g(2) = 4, and g(3) = 9. Comparing these values, the absolute maximum is 9 at x = 3, and the absolute minimum is 0 at x = 0, with units assumed to be standard dimensionless quantities."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common student error is evaluating the derivative equal to zero and stopping, assuming critical points automatically yield global extrema or inflection points without checking boundaries or sign changes. For closed interval optimization, evaluating endpoints is mandatory because global extrema can occur at boundaries where the derivative is non-zero or undefined. Additionally, a zero second derivative does not guarantee an inflection point; the concavity must strictly change sign across the point, as seen with g''(x) = 12x - 18 changing sign at x = 1.5."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-10-1",
          "domain": "Calc BC: Analytical Applications of Differentiation",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "For f′(x)=(x−1)(x−3), where is f decreasing?",
          "choices": [
            "x<1",
            "1<x<3",
            "x>3",
            "Everywhere"
          ],
          "answer": 1,
          "explanation": "The factors have opposite signs between1 and3, making the derivative negative.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-10-2",
          "domain": "Calc BC: Analytical Applications of Differentiation",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "A rectangle has perimeter20. What side lengths maximize area?",
          "choices": [
            "1 and9",
            "2 and8",
            "4 and6",
            "5 and5"
          ],
          "answer": 3,
          "explanation": "A=x(10−x) has maximum at x=5, giving a square.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-11",
      "title": "6.1 Riemann sums and numerical accumulation",
      "domain": "Calc BC: Integration & Accumulation of Change",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Riemann sums and numerical accumulation"
        },
        {
          "type": "text",
          "text": "A definite integral is the limit of Riemann sums for an integrable function. Each rectangle contributes a height times an interval width. Left, right and midpoint sums differ in their sample points; the trapezoidal rule averages endpoint heights on each subinterval. Units multiply: a rate in liters per minute integrated over minutes gives liters. Overestimate or underestimate conclusions depend on monotonicity for left/right sums and concavity for midpoint/trapezoid rules."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "At times 0, 2, 4, a rate has values 1, 3, 5. Two width-2 left rectangles give 2(1+3)=8, while right rectangles give 2(3+5)=16. The trapezoidal estimate is 2[(1+3)/2+(3+5)/2]=12. These are estimates unless additional information, such as linearity on each interval, makes a rule exact."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Do not add heights without multiplying widths. Unevenly spaced tables require each subinterval’s own width."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider a vehicle's velocity in meters per second recorded at times t = 1, 3, and 6 seconds, with values v(1) = 4, v(3) = 10, and v(6) = 16. Because the subinterval widths are uneven (delta t1 = 3 - 1 = 2 seconds and delta t2 = 6 - 3 = 3 seconds), we compute a trapezoidal approximation by summing the areas of individual trapezoids: (1/2)(4 + 10)(2) + (1/2)(10 + 16)(3) = 14 + 39 = 53 meters. This estimates displacement in meters: multiply velocity in meters per second by time in seconds. If velocity remains nonnegative throughout the interval, it also estimates distance. Positive recorded samples alone do not prove the sign between observations."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common student error is assuming uniform interval widths when calculating Riemann sums or trapezoidal approximations from a data table. Always inspect the time values to determine each individual delta t separately. Additionally, remember that a trapezoidal rule overestimates a definite integral when the function is concave up (positive second derivative) and underestimates it when concave down, regardless of whether the function is increasing or decreasing."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-11-1",
          "domain": "Calc BC: Integration & Accumulation of Change",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "At x=0,1,2 the values of f are2,4,8. What is the left sum on[0,2] with two intervals?",
          "choices": [
            "6",
            "12",
            "14",
            "10"
          ],
          "answer": 0,
          "explanation": "Width1 times the left heights2+4 gives6.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-11-2",
          "domain": "Calc BC: Integration & Accumulation of Change",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "For the same table, what is the trapezoidal estimate?",
          "choices": [
            "6",
            "9",
            "12",
            "14"
          ],
          "answer": 1,
          "explanation": "The two trapezoid areas are(2+4)/2=3 and(4+8)/2=6, totaling9.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-12",
      "title": "6.2 Fundamental Theorem and substitution",
      "domain": "Calc BC: Integration & Accumulation of Change",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Fundamental Theorem and substitution"
        },
        {
          "type": "text",
          "text": "The Fundamental Theorem connects accumulation to differentiation: if f is continuous, the derivative of F(x)=∫ from a to x f(t)dt is f(x). A variable upper bound adds a chain-rule factor. Definite integrals can be evaluated by antiderivatives as F(b)−F(a). Substitution reverses chain rule; change the bounds to the new variable or convert the antiderivative back before using the original bounds. An indefinite integral needs a constant of integration."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "If G(x)=∫ from 1 to x² cos t dt, then G′(x)=2x cos(x²). For ∫ from 0 to 1 of 2x cos(x²) dx, substitute u=x²,du = 2x dx, and new bounds 0 and 1. The result is sin1. Radians are understood in trigonometric differentiation and integration."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Do not drop the inner derivative for a variable bound. Do not apply original x-bounds to an antiderivative expressed in u."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Evaluate the definite integral ∫₁ᵉ 1/[x(1 + ln x)] dx. The integrand is continuous on [1, e]: x is positive and 1 + ln x ranges from 1 to 2, so no denominator vanishes. Set u = 1 + ln x; then du = dx/x. Convert both bounds: x = 1 gives u = 1, and x = e gives u = 2. The integral becomes ∫₁² (1/u) du = [ln u]₁² = ln 2 − ln 1 = ln 2. The changed bounds and differential describe the same original interval. This also illustrates the Fundamental Theorem: the antiderivative ln(1 + ln x) has derivative 1/[x(1 + ln x)] on this interval. Contrast a lower bound x = e⁻¹, where the denominator vanishes; that would require an improper-limit analysis rather than ordinary endpoint substitution."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common student error during u-substitution with definite integrals is forgetting to change the limits of integration to match the new variable u. If you integrate with respect to u, your limits of integration must be expressed in terms of u, not the original variable x. Alternatively, if you keep the original x-bounds, you must substitute the expression in terms of x back into your antiderivative before evaluating. Failing to adjust limits leads to incorrect numerical values. Always verify that the integrand and the differential match your variable of integration."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-12-1",
          "domain": "Calc BC: Integration & Accumulation of Change",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Differentiate ∫ from0 to x² eᵗdt.",
          "choices": [
            "e^(x²)",
            "2xe^(x²)",
            "2xeˣ",
            "eˣ"
          ],
          "answer": 1,
          "explanation": "FTC gives e^(x²) and chain rule multiplies by2x.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-12-2",
          "domain": "Calc BC: Integration & Accumulation of Change",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Evaluate ∫ from0 to1 2x(x²+1)³dx.",
          "choices": [
            "15/4",
            "4",
            "1/4",
            "15"
          ],
          "answer": 0,
          "explanation": "Let u=x²+1; bounds1to2 give[u⁴/4]₁²=(16−1)/4=15/4.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-13",
      "title": "7.1 Slope fields and separable equations",
      "domain": "Calc BC: Differential Equations",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Slope fields and separable equations"
        },
        {
          "type": "text",
          "text": "A differential equation specifies a derivative relation rather than a single function. A slope field records local slopes at points and helps compare possible solution curves. A separable equation can be rearranged so each side contains one variable and then integrated. Division can lose equilibrium solutions, so check constant solutions in the original equation. An initial condition selects a particular solution on an interval where it is defined."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For y′=2xy with y(0)=3, divide by y on a nonzero solution:dy/y=2xdx. Integrating gives ln|y|=x²+C, hence y=Ce^(x²). The initial condition gives C=3. The original equation also has equilibrium y=0, which would be lost by careless division by y."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "An initial value chooses a solution, not a new differential equation. Verify both derivative relation and initial condition."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider the differential equation dy/dx = -3y/x with the initial condition y(1) = 4 for x > 0. Separate variables to get (1/y)dy = (-3/x)dx. Integrating both sides yields ln|y| = -3ln|x| + C, which simplifies to ln|y| = ln(x^(-3)) + C. Exponentiating gives y = Ax^(-3), where A = e^C or A = -e^C. Applying the initial condition y(1) = 4, we find 4 = A(1)^(-3), so A = 4. The particular solution is y = 4x^(-3). Dividing by y initially assumes y != 0, but checking the constant function y = 0 shows it is an equilibrium solution of the original differential equation, though it does not satisfy the given initial condition."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common mistake is forgetting to check the domain restriction imposed by the independent variable in the original differential equation. Here, x appears in the denominator, so the domain is restricted to x > 0, which safely includes our initial condition x = 1. Always inspect the original equation for domain boundaries before integrating."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-13-1",
          "domain": "Calc BC: Differential Equations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Solve y′=2xy with y(0)=3.",
          "choices": [
            "3e^(x²)",
            "3e^(2x)",
            "e^(x²)+3",
            "3x²"
          ],
          "answer": 0,
          "explanation": "Separate and integrate to get y=Ce^(x²); y(0)=3 fixes C=3.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-13-2",
          "domain": "Calc BC: Differential Equations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "For y′=y(2−y), which are equilibrium solutions?",
          "choices": [
            "y=0 only",
            "y=2 only",
            "y=0 and y=2",
            "y=1 and y=2"
          ],
          "answer": 2,
          "explanation": "Constant solutions require0=y(2−y), so y=0 or2.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-14",
      "title": "7.2 Exponential models and Euler approximation",
      "domain": "Calc BC: Differential Equations",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Exponential models and Euler approximation"
        },
        {
          "type": "text",
          "text": "A quantity with growth rate proportional to its amount satisfies y′=ky and has solution y=Ce^(kt). Positive k gives growth and negative k gives decay. Euler’s method approximates a solution by repeatedly using the current point’s tangent slope: y_next=y_current+step·f(x_current,y_current). Recompute the slope after every step. It is a numerical approximation, not an exact solution, and its error depends on the equation, step size and interval."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For y′=y with y(0)=1 and step 0.5, the first Euler step gives 1+0.5(1)=1.5 at x=0.5. The next slope is 1.5, giving 1.5+0.5(1.5)=2.25 at x=1. The exact value e is larger. A half-life model satisfies e^(kH)=1/2, so k=−ln2/H."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Do not reuse the original slope in every Euler step. A decay constant written in y′=ky must be negative."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider a cooling object modeled by the differential equation dT/dt = -0.2(T - 70) with initial temperature T(0) = 110 degrees Fahrenheit. We wish to approximate the temperature at t = 1 using a step size of delta t = 0.5. For the first step at t = 0, the slope is f(0, 110) = -0.2(110 - 70) = -0.2(40) = -8 degrees per minute. The first Euler approximation is T(0.5) approx 110 + 0.5(-8) = 106 degrees. For the second step, the new slope at t = 0.5 is f(0.5, 106) = -0.2(106 - 70) = -0.2(36) = -7.2 degrees per minute. The second Euler approximation is T(1.0) approx 106 + 0.5(-7.2) = 102.4 degrees Fahrenheit. The exact value is T(1) = 70 + 40e^(−0.2) ≈ 102.75°F, slightly higher than the Euler value 102.4°F. The solution is decreasing and concave up, so the forward tangent steps lie below it. The magnitude of the cooling rate decreases as the object approaches 70°F."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A frequent student error in Euler's method is using the initial slope for every step instead of recomputing the derivative at each new point. In linear approximations like tangent lines, keeping a fixed slope creates a straight line, but Euler's method requires updating both coordinates (t, T) and recalculating the rate of change at each step to track curved trajectories accurately."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-14-1",
          "domain": "Calc BC: Differential Equations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Euler’s method for y′=y,y(0)=1 with step 0.5 gives y(1)≈?",
          "choices": [
            "2",
            "2.25",
            "2.5",
            "e"
          ],
          "answer": 1,
          "explanation": "Two tangent steps give1.5 then2.25.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-14-2",
          "domain": "Calc BC: Differential Equations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "A model y′=ky has half-life H>0. Find k.",
          "choices": [
            "ln2/H",
            "−ln2/H",
            "H/ln2",
            "−Hln2"
          ],
          "answer": 1,
          "explanation": "From e^(kH)=1/2, take logs: kH=−ln2.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-15",
      "title": "8.1 Area and average value",
      "domain": "Calc BC: Applications of Integration",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Area and average value"
        },
        {
          "type": "text",
          "text": "The integral of a signed function gives net signed area. Geometric area requires nonnegative heights, so split at sign changes or integrate an absolute value. Area between curves integrates top minus bottom with respect to x, or right minus left with respect to y. The average value of an integrable function on[a,b] is (1/(b−a))∫ f; it is not generally the average of endpoint values. Sketch or use a sign analysis to identify the correct bounds and ordering."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "Between y=x and y=x² on[0,1], the line lies above the parabola. The area is∫₀¹(x−x²)dx=1/2−1/3=1/6. For f(x)=x² on[0,3], average value is(1/3)[x³/3]₀³=3. An average rate integrated across a time interval reproduces the total change."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "If curves cross inside an interval, one unsplit top-minus-bottom expression can cancel areas. Average value has the same units as f."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider finding the area between the curves y = 2x and y = x^2 - 3x on the interval [0, 4]. First, find the intersection points by setting 2x = x^2 - 3x, which gives x^2 - 5x = 0, so x = 0 and x = 5. On the interval [0, 4], the curve y = 2x lies above y = x^2 - 3x because 2x - (x^2 - 3x) = 5x - x^2 >= 0 for all x in [0, 4]. The area is the integral from 0 to 4 of (5x - x^2) dx. Antidifferentiating gives [5/2 x^2 - 1/3 x^3] from 0 to 4. Evaluating this at 4 yields 5/2(16) - 1/3(64) = 40 - 64/3 = 120/3 - 64/3 = 56/3 square units. To find the average value of f(x) = 3x^2 on [1, 3], compute (1 / (3 - 1)) integral from 1 to 3 of 3x^2 dx. The antiderivative is x^3, evaluated from 1 to 3 to get 27 - 1 = 26. Multiplying by 1/2 gives an average value of 13."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common misconception is forgetting to check whether curves intersect within the given interval of integration. If curves cross, the designation of top and bottom functions switches, and integrating without splitting at the intersection point leads to subtraction of areas rather than accumulation. Always determine intersection points first and verify the relative positions of the functions using a test value or sign analysis."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-15-1",
          "domain": "Calc BC: Applications of Integration",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Find the area between y=x and y=x² on[0,1].",
          "choices": [
            "1/2",
            "1/3",
            "1/6",
            "−1/6"
          ],
          "answer": 2,
          "explanation": "Integrate top−bottom:x−x²; the result is1/6.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-15-2",
          "domain": "Calc BC: Applications of Integration",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "What is the average value of x² on[0,3]?",
          "choices": [
            "3",
            "4.5",
            "9",
            "1"
          ],
          "answer": 0,
          "explanation": "The integral is9; divide by interval length3 to obtain3.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-16",
      "title": "8.2 Volume, displacement and distance",
      "domain": "Calc BC: Applications of Integration",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Volume, displacement and distance"
        },
        {
          "type": "text",
          "text": "Volume by cross sections integrates cross-sectional area along an axis. A disk area isπR²; a washer area isπ(R²−r²). Radii are distances from the axis of rotation and can require subtracting a shifted axis. A velocity integral gives displacement, while integrating |velocity| gives total distance traveled. Position requires adding initial position to accumulated velocity. These distinctions apply even when the same graph supplies all the information."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "Revolving the region under y=x on[0,2] about the x-axis gives volumeπ∫₀²x²dx=8π/3. If v(t)=t−1 on[0,2], displacement is0, but total distance is the sum of two triangle areas,1. Opposite directions cancel in displacement but cannot cancel in distance."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Squaring the difference of radii is not the washer formula. Distance is never negative."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider the region bounded by y = x and y = x² on the interval [0, 1]. Find the volume generated when this region is revolved about the horizontal line y = -1. First, identify the outer and inner radii relative to the axis of rotation y = -1. The outer curve is y = x, so the outer radius is R(x) = x - (-1) = x + 1. The inner curve is y = x², so the inner radius is r(x) = x² - (-1) = x² + 1. Using the washer volume formula V = pi times the integral from a to b of (R(x)² - r(x)²) dx, we set up the integral from 0 to 1. Expand the squares: R(x)² = x² + 2x + 1 and r(x)² = x⁴ + 2x² + 1. Subtracting these gives R(x)² - r(x)² = 2x - x⁴ - x². Integrating this expression from 0 to 1 yields [x² - (x⁵/5) - (x³/3)] evaluated from 0 to 1, which equals 1 - (1/5) - (1/3) = 7/15. Multiplying by pi gives the exact volume of (7pi)/15 cubic units."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A frequent error in washer volumes with shifted axes is writing the integrand as (R - r)² instead of the correct R² - r². The washer area represents the area of the outer circle minus the area of the inner circle, requiring individual squaring of each radius before subtraction. Additionally, when revolving around a line below the region like y = -1, failing to account for the negative coordinate properly leads to sign errors. Adding the distance (subtracting a negative) correctly enlarges the radius. Always sketch the axis of rotation relative to your functions to confirm that radii remain positive over the entire interval of integration."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-16-1",
          "domain": "Calc BC: Applications of Integration",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Revolve the region under y=x,0≤x≤2, about the x-axis. Find volume.",
          "choices": [
            "4π",
            "8π/3",
            "2π",
            "16π/3"
          ],
          "answer": 1,
          "explanation": "Disk radius is x, so V=π∫₀²x²dx=8π/3.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-16-2",
          "domain": "Calc BC: Applications of Integration",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "If v(t)=t−1 on[0,2], what is total distance?",
          "choices": [
            "0",
            "1",
            "2",
            "−1"
          ],
          "answer": 1,
          "explanation": "Integrate |t−1| by splitting at1; each half contributes1/2.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-17",
      "title": "6.3 Integration by parts and partial fractions",
      "domain": "Calc BC: Integration & Accumulation of Change",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Integration by parts and partial fractions"
        },
        {
          "type": "text",
          "text": "Integration by parts reverses product rule:∫u dv=uv−∫v du. Choose u so differentiation simplifies it and dv so integration is feasible. For rational functions, polynomial division and partial fraction decomposition can turn an integral into basic pieces. The numerator coefficients must satisfy an algebraic identity, and logarithmic antiderivatives need absolute values on appropriate real domains."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For∫xeˣdx, choose u=x,dv=eˣdx. Then du=dx,v=eˣ, giving xeˣ−eˣ+C. Also1/[x(x+1)]=1/x−1/(x+1), so an antiderivative is ln|x|−ln|x+1|+C on intervals excluding0 and−1."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Do not change a definite integration bound without changing its variable consistently. Verify a decomposition by recombining fractions."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Use integration by parts. Let u=x, dv=eˣ dx. Then du=dx, v=eˣ. The integral I=∫₀² x eˣ dx = [x eˣ]₀² – ∫₀² eˣ dx. Evaluate the first term: at x=2, 2 e²; at x=0, 0. So it is 2 e². The remaining integral is ∫₀² eˣ dx = [eˣ]₀² = e² – 1. Thus I = 2 e² – (e² – 1) = 2 e² – e² + 1 = e² + 1. Numerically e≈2.71828, so e²≈7.38906, giving I≈8.38906. This example shows that integration by parts turns the product into a difference of simpler integrals, making the evaluation straightforward."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common misconception is to choose u as the function whose derivative is more complicated or dv as the function that is harder to integrate. In this example, picking u=x simplifies du to 1 and v=eˣ remains easy to integrate. Swapping them would leave us with ∫ eˣ d(x²⁄2) which yields the same result but obscures the product‑rule reversal. Integration by parts remains mathematically valid even when du is not simpler than u, but a strategic choice should simplify the remaining integral or create a useful recurrence. Always check the boundary terms after parts, as they can change the sign or value in a definite integral. Students often overlook the importance of evaluating the boundary term [x eˣ]₀²; neglecting it leads to incorrect answers. The final numeric answer relies on accurate evaluation of e²; small rounding errors can propagate, so keep extra decimal places during intermediate steps before rounding to the desired precision."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-17-1",
          "domain": "Calc BC: Integration & Accumulation of Change",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Find∫xeˣdx.",
          "choices": [
            "xeˣ+C",
            "eˣ(x−1)+C",
            "eˣ(x+1)+C",
            "x²eˣ/2+C"
          ],
          "answer": 1,
          "explanation": "Integration by parts gives xeˣ−∫eˣdx=eˣ(x−1)+C.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-17-2",
          "domain": "Calc BC: Integration & Accumulation of Change",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Which equals1/[x(x+1)]?",
          "choices": [
            "1/x+1/(x+1)",
            "1/x−1/(x+1)",
            "−1/x+1/(x+1)",
            "1/(2x+1)"
          ],
          "answer": 1,
          "explanation": "Recombining yields[(x+1)−x]/[x(x+1)]=1/[x(x+1)].",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-18",
      "title": "7.3 Logistic growth",
      "domain": "Calc BC: Differential Equations",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Logistic growth"
        },
        {
          "type": "text",
          "text": "Logistic growth models limited growth through y′=ky(1−y/L) with k>0 and carrying capacity L>0. Equilibrium solutions are0 and L. For0<y<L, growth is positive and largest at y=L/2 because the rate as a function of y is a downward-opening quadratic. A non-equilibrium solution can be written L/(1+Ae^(−kx)); an initial condition determines A. Interpret an equilibrium as a mathematical model prediction rather than a universal biological law."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "With y′=0.2y(1−y/100), the carrying capacity is100. At y=50, the rate is0.2·50·0.5=5. At y=20 it is3.2, so being farther from capacity does not automatically mean a larger absolute growth rate."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "The coefficient k is not the carrying capacity. Exponential growth is a useful early approximation, not the complete logistic model."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider the logistic model y′=0.5y(1−y/200). The carrying capacity is L=200 and the growth rate constant is k=0.5. With an initial population y(0)=30, the solution is y(t)=200/(1+Ae^{−0.5t}). To find A, set t=0: 30=200/(1+A) gives 1+A=200/30≈6.6667, so A≈5.6667. Thus y(t)=200/(1+5.6667e^{−0.5t}). To determine when the population reaches 120, solve 120=200/(1+5.6667e^{−0.5t}). This gives 1+5.6667e^{−0.5t}=200/120≈1.6667, so 5.6667e^{−0.5t}=0.6667. Hence e^{−0.5t}=0.6667/5.6667≈0.1176, and −0.5t=ln(0.1176)≈−2.141. Therefore t≈4.28 time units. The instantaneous growth rate at any y is y′=0.5y(1−y/200). The quadratic achieves its maximum when y=L/2=100, yielding y′_{max}=0.5·100·0.5=25 individuals per unit time. This maximum is kL/4 and occurs at half the carrying capacity, not at L."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common misconception is that the population grows fastest near the carrying capacity L. In fact, the rate function is a downward‐opening parabola with vertex at y=L/2. The maximum rate is kL/4, so for k=0.5 and L=200 the peak is 25, not 0. This misconception arises when one overlooks the (1−y/L) factor and assumes exponential growth persists until L. Understanding that the growth term becomes zero at y=L and negative beyond L prevents overestimation of population size and clarifies why logistic models enforce a natural limit. The key condition is that the derivative’s quadratic form guarantees a unique interior maximum at L/2, as a function of population state for 0<y<L. If the initial population already exceeds L/2 and grows toward L, its future trajectory never passes through L/2; its largest future growth rate then occurs initially."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-18-1",
          "domain": "Calc BC: Differential Equations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "In y′=0.2y(1−y/100), growth rate is greatest at y=?",
          "choices": [
            "0",
            "20",
            "50",
            "100"
          ],
          "answer": 2,
          "explanation": "The quadratic rate is maximized halfway between the equilibria0 and100.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-18-2",
          "domain": "Calc BC: Differential Equations",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "For y=100/(1+Ae^(−0.2t)) and y(0)=20, find A.",
          "choices": [
            "1",
            "4",
            "5",
            "20"
          ],
          "answer": 1,
          "explanation": "20=100/(1+A), so1+A=5 and A=4.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-19",
      "title": "8.3 Improper integrals and arc length",
      "domain": "Calc BC: Applications of Integration",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Improper integrals and arc length"
        },
        {
          "type": "text",
          "text": "An improper integral has an unbounded interval or an unbounded integrand and must be defined by limits. Compute the relevant proper integrals first, then determine whether the limiting value is finite. A visually shrinking integrand need not have finite total area. For a smooth graph y=f(x), arc length on[a,b] is∫√(1+[f′(x)]²)dx. This measures length along the curve, not signed area below it."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "The integral∫₁∞1/x²dx equals lim b→∞(1−1/b)=1, while∫₁∞1/x dx diverges because ln b grows without bound. For the line y=3x on[0,2], arc length is∫₀²√10 dx=2√10, matching the distance formula."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "The symbol infinity is not a number to substitute into an antiderivative. If a singularity lies inside an interval, both one-sided improper integrals must converge."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "We first evaluate ∫₀¹x^(−½)dx.  The antiderivative of x^(−½) is 2√x, so\n∫₀¹x^(−½)dx=lim_{ε→0⁺}[2√x]_{ε}^{1}=2(1−√ε)=2.  Since the limit exists and is finite, the improper integral converges.\n\nNext compute the length of the curve y=√x on [0,1].  The derivative is y′=½x^(−½)=1/(2√x).  The integrand for arc length is\n√(1+(y′)²)=√(1+1/(4x))=√(4x+1)/(2√x).\nTransform the integral by setting x=t² (t≥0).  Then dx=2t dt and √x=t, giving\nL=∫₀¹√(4x+1)/(2√x) dx=∫₀¹√(4t²+1) dt.\nUse the standard antiderivative\n∫√(4t²+1)dt=(t/2)√(4t²+1)+¼ln(2t+√(4t²+1))\nevaluated from 0 to 1.  At t=1 we get (½)√5+¼ln(2+√5); at t=0 the expression equals 0.  Hence\nL=(½)√5+¼ln(2+√5)≈1.4789 units.\n\nKey condition: the improper integral converges only when the limit of the antiderivative exists as the variable approaches the singular endpoint.  For arc length the original x-integrand is unbounded at x = 0, but its improper integral converges. The substitution gives an equivalent continuous integrand in t on [0, 1]. It does not make the original singularity removable.\n"
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "Both problems hinge on whether a limit exists as the variable approaches a problematic point.  In the integral of 1/√x the singularity at x=0 produces a finite area because the area under the curve shrinks rapidly; the limit of the antiderivative remains bounded.  For arc length, the integrand’s potential singularity at x=0 is tempered by the square‐root form, so the integral of the length element stays finite.  Recognizing that limits, not direct substitution, determine convergence is the common misconception to avoid.  When the limit diverges, as in ∫₁^∞1/x dx, the improper integral is considered infinite."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-19-1",
          "domain": "Calc BC: Applications of Integration",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Evaluate∫₁∞x⁻²dx.",
          "choices": [
            "0",
            "1",
            "2",
            "Diverges"
          ],
          "answer": 1,
          "explanation": "The antiderivative is−1/x and the limit is 1.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-19-2",
          "domain": "Calc BC: Applications of Integration",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Find arc length of y=3x on[0,2].",
          "choices": [
            "6",
            "√10",
            "2√10",
            "10"
          ],
          "answer": 2,
          "explanation": "Arc length is∫₀²√(1+9)dx=2√10.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-20",
      "title": "9.1 Parametric derivatives",
      "domain": "Calc BC: Parametric, Polar & Vector Functions",
      "difficulty": "Hard",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Parametric derivatives"
        },
        {
          "type": "text",
          "text": "A parameter can describe both coordinates of a curve. Where dx/dt≠0, dy/dx=(dy/dt)/(dx/dt). The second derivative with respect to x is the t-derivative of this quotient divided again by dx/dt. A zero numerator can indicate a horizontal tangent only if the denominator is nonzero. A zero denominator can indicate a vertical tangent when the numerator is nonzero. Check special points separately rather than cancelling away all restrictions."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For x=t²,y=t³ and t≠0, dy/dx=3t/2. Differentiate that with respect to t and divide by2t to get d²y/dx²=3/(4t). At t=1, the first derivative is3/2 and the second3/4. The derivative with respect to t is not itself the second derivative with respect to x."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Use the same parameter value in both coordinate derivatives. Squaring a slope is not a second derivative."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider the parametric curve defined by x = e^t and y = t*e^t for all real numbers t. To find the first derivative, compute dx/dt = e^t and dy/dt = e^t + t*e^t = e^t(1 + t). Then dy/dx = (dy/dt)/(dx/dt) = [e^t(1 + t)] / e^t = 1 + t. For the second derivative, differentiate dy/dx with respect to t, yielding d/dt(1 + t) = 1, and divide by dx/dt = e^t. Thus, d^2y/dx^2 = 1/e^t = e^(-t). At t = 0, we find x = 1 and y = 0. The slope dy/dx equals 1 + 0 = 1, and the second derivative d^2y/dx^2 equals e^0 = 1, indicating the curve is concave up at this point since the second derivative is positive."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A frequent misconception is stopping after taking the derivative of dy/dx with respect to t. Students often forget that the second derivative requires dividing by dx/dt a second time. Because dy/dx is a function of t, applying the operator d/dx means computing d/dt(dy/dx) * (dt/dx). Since dt/dx is the reciprocal of dx/dt, this division is mathematically mandatory. Always verify that your resulting second derivative has the correct behavior with respect to x, remembering that the parameter t acts as an intermediary, not the independent variable x itself."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-20-1",
          "domain": "Calc BC: Parametric, Polar & Vector Functions",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "For x=t²,y=t³ at t=2, find dy/dx.",
          "choices": [
            "3",
            "4/3",
            "6",
            "12"
          ],
          "answer": 0,
          "explanation": "The ratio3t²/(2t)=3t/2 equals3 at2.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-20-2",
          "domain": "Calc BC: Parametric, Polar & Vector Functions",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "For the same curve at t=1, find d²y/dx².",
          "choices": [
            "3/2",
            "3/4",
            "3",
            "1/2"
          ],
          "answer": 1,
          "explanation": "Differentiate3t/2 with respect to t, then divide by2t, yielding3/(4t).",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-21",
      "title": "9.2 Vector motion and distance",
      "domain": "Calc BC: Parametric, Polar & Vector Functions",
      "difficulty": "Hard",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Vector motion and distance"
        },
        {
          "type": "text",
          "text": "A planar position vector r(t)=〈x(t),y(t)〉 has velocity〈x′,y′〉 and acceleration〈x″,y″〉. Speed is the magnitude√((x′)²+(y′)²). Total distance is the integral of speed; displacement is the vector difference of positions. Direction and distance require both coordinate components. A component can be negative without making speed negative. Vector initial conditions are applied separately to each coordinate."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For r(t)=〈3t,4t〉, velocity is〈3,4〉 and speed is5. Over0≤t≤2, distance is10 and displacement is〈6,8〉. Their magnitudes happen to agree for this straight motion, but they need not agree when a path changes direction."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Do not add component velocities to calculate speed. Net displacement can be zero even after nonzero travel."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Let a particle's position be r(t) = 〈t², 2t〉 for 0 ≤ t ≤ 3. Find the velocity, the speed at t = 2, and the total distance traveled. Velocity is r'(t) = 〈2t, 2〉. At t = 2, velocity is 〈4, 2〉, and speed is √((4)² + (2)²) = √20 = 2√5 units per time. Total distance is the integral from t = 0 to t = 3 of speed, ∫₀³ √((2t)² + 2²) dt = 2 ∫₀³ √(t² + 1) dt. Using integration rules, the antiderivative of √(t² + 1) is (1/2)(t√(t² + 1) + ln(t + √(t² + 1))). Evaluating this definite integral from 0 to 3 yields 3√10 + ln(3 + √10) units."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A frequent misconception is equating total distance with the magnitude of net displacement. Total distance integrates speed, accumulating every unit of path length along the curve. Conversely, displacement is the vector difference r(3) - r(0) = 〈9, 6〉, whose magnitude is √117 ≈ 10.82. These values differ because the particle moves along a parabola rather than a straight line. Never integrate component velocities separately before taking the square root; distance strictly requires the integral of the combined speed magnitude."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-21-1",
          "domain": "Calc BC: Parametric, Polar & Vector Functions",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "A velocity vector is〈−3,4〉. What is speed?",
          "choices": [
            "1",
            "7",
            "5",
            "−5"
          ],
          "answer": 2,
          "explanation": "The magnitude is√(9+16)=5.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-21-2",
          "domain": "Calc BC: Parametric, Polar & Vector Functions",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "If r(t)=〈t²,t³〉, what is acceleration?",
          "choices": [
            "〈2t,3t²〉",
            "〈2,6t〉",
            "〈1,3t〉",
            "〈2t,6t〉"
          ],
          "answer": 1,
          "explanation": "Differentiate each component twice.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-22",
      "title": "9.3 Polar area and slope",
      "domain": "Calc BC: Parametric, Polar & Vector Functions",
      "difficulty": "Hard",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Polar area and slope"
        },
        {
          "type": "text",
          "text": "Polar coordinates describe a point by radius and angle: x=r cosθ,y=r sinθ. Area swept from α to β is(1/2)∫r²dθ when the interval traces the intended region once. For two polar curves, subtract squared radii only after identifying which radius is outer on each interval. A polar tangent slope is (r′sinθ+r cosθ)/(r′cosθ−r sinθ), where the denominator is nonzero."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For r=2 on0≤θ≤π/2, area is(1/2)·4·π/2=π. It is one quarter of a radius2 circle. A full trace of r=2 takes an angular interval of length2π. Counting a retraced interval again would double-count area."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "The polar area formula contains r² and1/2. Do not integrate r alone or assume every named interval traces a loop exactly once."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Find the total area enclosed by the cardioid r = 1 + cos(theta). A complete single trace of the curve occurs over the interval from theta = 0 to theta = 2*pi. Using the polar area formula, Area = (1/2) times the integral from 0 to 2*pi of (1 + cos(theta))^2 d(theta). Expanding the integrand yields 1 + 2cos(theta) + cos^2(theta). Applying the half-angle identity cos^2(theta) = (1 + cos(2*theta))/2, we integrate term-by-term to get (1/2) * [theta + 2sin(theta) + theta/2 + sin(2*theta)/4] evaluated from 0 to 2*pi. Evaluating the definite integral gives (1/2) * [2*pi + 0 + pi + 0] = (3*pi)/2 square units. Integrating only from 0 to pi would capture strictly the upper half of the symmetric shape."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A frequent misconception in polar calculus is misidentifying the angular domain required to trace a region exactly once. For symmetric curves like cardioids, blindly integrating from 0 to 2*pi works, but for rose curves or inner loops, improper intervals lead to double-counting or missing areas. Always determine the exact interval where the radius equals zero to set up proper loop boundaries. Furthermore, when finding polar tangent slopes via (r'sin(theta) + r cos(theta))/(r'cos(theta) - r sin(theta)), students often forget to verify that the denominator is nonzero; if both numerator and denominator equal zero simultaneously, the ratio is indeterminate and tangent behavior may require a limit or other local analysis."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-22-1",
          "domain": "Calc BC: Parametric, Polar & Vector Functions",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Find area inside r=2 for0≤θ≤π/2.",
          "choices": [
            "π/2",
            "π",
            "2π",
            "4π"
          ],
          "answer": 1,
          "explanation": "One half times the integral of4 over an interval of lengthπ/2 isπ.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-22-2",
          "domain": "Calc BC: Parametric, Polar & Vector Functions",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "For constant r=2 at θ=π/4, what is dy/dx?",
          "choices": [
            "1",
            "−1",
            "0",
            "Undefined"
          ],
          "answer": 1,
          "explanation": "The slope is(2cosθ)/(−2sinθ)=−cotθ=−1.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-23",
      "title": "10.1 Sequences, series and convergence tests",
      "domain": "Calc BC: Infinite Sequences & Series",
      "difficulty": "Hard",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Sequences, series and convergence tests"
        },
        {
          "type": "text",
          "text": "A sequence is a list of terms; a series is a sum studied through its partial sums. If terms of a series do not approach0, the series diverges. Terms approaching0 are necessary but insufficient for convergence. A geometric series∑arⁿ from n=0 converges to a/(1−r) when |r|<1. A p-series∑1/nᵖ converges exactly when p>1. Comparison tests require appropriate nonnegative terms and valid inequalities."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "The harmonic series∑1/n diverges even though1/n→0. By contrast∑1/n² converges as a p-series with p=2. The geometric series3+3/2+3/4+⋯ has first term3 and ratio1/2, hence sum6. State the test and check its conditions rather than naming a conclusion alone."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "The nth-term test cannot prove convergence when its limit is0. An alternating sign alone does not establish absolute convergence."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider the geometric series sum from n=1 to infinity of 5(1/3)^(n-1). This is a geometric series with first term a = 5 and common ratio r = 1/3. Because |r| = 1/3 < 1, the series converges. Using the formula S = a / (1 - r), we substitute a = 5 and r = 1/3 to get S = 5 / (1 - 1/3) = 5 / (2/3) = 15/2. State the convergence condition |r| < 1 explicitly before applying the sum formula."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common error is confusing the index starting point when identifying the first term. If a geometric series begins at n = 0 versus n = 1, the first term a is evaluated at the lower limit of the index. Additionally, students often incorrectly assume that if the limit of the terms approaches zero, the series must converge, forgetting that terms approaching zero is only a necessary condition, not a sufficient one, as demonstrated by the divergent harmonic series."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-23-1",
          "domain": "Calc BC: Infinite Sequences & Series",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "What is3+3/2+3/4+⋯?",
          "choices": [
            "3",
            "4.5",
            "6",
            "Diverges"
          ],
          "answer": 2,
          "explanation": "The ratio is1/2, so the sum is3/(1−1/2)=6.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-23-2",
          "domain": "Calc BC: Infinite Sequences & Series",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Which series converges?",
          "choices": [
            "∑1/n",
            "∑1/√n",
            "∑1/n²",
            "∑1"
          ],
          "answer": 2,
          "explanation": "The p-series exponent2 exceeds1; the other three diverge.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-24",
      "title": "10.2 Ratio test, endpoints and alternating error",
      "domain": "Calc BC: Infinite Sequences & Series",
      "difficulty": "Hard",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Ratio test, endpoints and alternating error"
        },
        {
          "type": "text",
          "text": "The ratio test uses L=lim|aₙ₊₁/aₙ|. If L<1 there is absolute convergence, if L>1 divergence, and if L=1 the test is inconclusive. For a power series it typically identifies an open interval; test endpoints independently. An alternating series with decreasing positive term magnitudes tending to0 converges, and the truncation error is at most the next omitted magnitude. Conditional convergence means convergence without absolute convergence."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For∑xⁿ/n from n=1, ratio test gives |x|<1. At x=1 the harmonic series diverges; at x=−1 the alternating harmonic series converges. Thus the interval is[−1,1). For an alternating partial sum with next omitted magnitude1/101, the error bound is1/101 when the alternating-test conditions hold."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "A radius of convergence does not decide either endpoint. The ratio-test value1 does not mean divergence."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider the power series sum from n equals 1 to infinity of ((-1)^n x^n) / (3^n n^2). Applying the Ratio Test, we evaluate L = lim (n->infinity) |a_(n+1) / a_n| = lim |((-1)^(n+1) x^(n+1)) / (3^(n+1) (n+1)^2) * (3^n n^2) / ((-1)^n x^n)| = |x|/3 lim (n/(n+1))^2 = |x|/3. Setting L < 1 gives |x|/3 < 1, so the radius of convergence is R = 3, yielding the open interval (-3, 3). Now test the endpoints. At x = 3, the series becomes sum (-1)^n / n^2, which is an absolutely convergent alternating p-series (p=2). At x = -3, the series becomes sum 1 / n^2, which is a convergent p-series (p=2). Thus, the interval of convergence is [-3, 3]. For the alternating series at x = 3, if we approximate the sum using the first 3 terms, the error magnitude is bounded by the magnitude of the fourth term, |a_4| = 3^4 / (3^4 * 4^2) = 1/16."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common misconception is that the Ratio Test determines convergence at the endpoints when L equals 1. The Ratio Test always fails when the limit is 1, necessitating independent convergence tests (such as the p-series or Alternating Series Test) for each endpoint. Additionally, ensure that alternating series terms are strictly decreasing in magnitude and limit to zero before applying the alternating series error bound."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-24-1",
          "domain": "Calc BC: Infinite Sequences & Series",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "What is the convergence interval for∑xⁿ/n,n≥1?",
          "choices": [
            "(−1,1)",
            "[−1,1]",
            "[−1,1)",
            "(−1,1]"
          ],
          "answer": 2,
          "explanation": "The negative endpoint is alternating harmonic and converges; the positive endpoint is harmonic and diverges.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-24-2",
          "domain": "Calc BC: Infinite Sequences & Series",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "If a valid alternating-series estimate has next omitted term magnitude0.003, the error is:",
          "choices": [
            "Exactly0.003",
            "At most0.003",
            "At least0.003",
            "Always0"
          ],
          "answer": 1,
          "explanation": "The alternating-series error theorem bounds the absolute error by the next omitted magnitude.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-25",
      "title": "10.3 Taylor polynomials and error bounds",
      "domain": "Calc BC: Infinite Sequences & Series",
      "difficulty": "Hard",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Taylor polynomials and error bounds"
        },
        {
          "type": "text",
          "text": "The Taylor polynomial about a uses coefficients f⁽ⁿ⁾(a)/n! multiplying(x−a)ⁿ. A Maclaurin polynomial is centered at 0. Familiar series can be differentiated, integrated or substituted within their convergence intervals. A Taylor approximation must be accompanied by an error argument when accuracy is requested. Lagrange error uses an upper bound M for the next derivative between the center and evaluation point: |Rₙ(x)|≤M|x−a|ⁿ⁺¹/(n+1)!."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "The quadratic Maclaurin polynomial for eˣ is 1+x+x²/2. At x=0.1 it gives 1.105. On [0,0.1], the third derivative eˣ is at most e^0.1, so the error is at most e^0.1(0.1)³/6. The small x factor helps, but a numerical polynomial value alone does not certify an error bound."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Do not omit factorials. The derivative bound must hold over the entire segment, not only at the center."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Consider approximating sin(0.2) using the third-order Maclaurin polynomial. The third-degree Maclaurin polynomial for sin(x) is x - x^3/6; the full infinite series contains further terms. Evaluating at x = 0.2 gives P_3(0.2) = 0.2 - (0.2)^3/6 = 0.2 - 0.008/6 = 0.2 - 0.0013333 = 0.1986667. To bound the error, use the Lagrange error formula |R_3(x)| <= M |x|^4 / 4!, where M is the maximum value of the fourth derivative of sin(x), which is sin(x), on the interval [0, 0.2]. Since |sin(x)| <= 1 for all x, we choose M = 1. The error bound is |R_3(0.2)| <= (1)(0.2)^4 / 24 = 0.0016 / 24 = 0.0000667. Thus, the magnitude of the error is guaranteed to be no greater than 0.0000667."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A common misconception is evaluating the derivative bound M only at the specific evaluation point rather than finding its maximum over the entire closed interval between the center zero and the evaluation point 0.2. Always ensure M bounds the derivative everywhere on that interval. Additionally, remember that the power in the error formula corresponds to n+1, so for a degree-3 polynomial, the denominator contains 4! and the numerator uses x^4."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-25-1",
          "domain": "Calc BC: Infinite Sequences & Series",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "What is the degree2 Maclaurin polynomial for eˣ?",
          "choices": [
            "1+x+x²",
            "1+x+x²/2",
            "x+x²/2",
            "1+x/2+x²/6"
          ],
          "answer": 1,
          "explanation": "All derivatives at0 equal1 and the quadratic coefficient is1/2!.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-25-2",
          "domain": "Calc BC: Infinite Sequences & Series",
          "difficulty": "Hard",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "If |f‴(t)|≤6 between0 and0.2, what bound applies to a degree2 Maclaurin error at0.2?",
          "choices": [
            "0.008",
            "0.024",
            "0.04",
            "0.2"
          ],
          "answer": 0,
          "explanation": "Lagrange error is at most6(0.2)³/3!=0.008.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-26",
      "title": "2.3 Trigonometric, exponential and logarithmic derivatives",
      "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Trigonometric, exponential and logarithmic derivatives"
        },
        {
          "type": "text",
          "text": "The basic trigonometric derivatives use radians: the derivative of sin x is cos x and the derivative of cos x is −sin x. The derivative of eˣ is itself, while the derivative of ln x is 1/x for x>0. For a positive base b≠1, the derivative of bˣ is bˣln b. These formulas combine with product, quotient and chain rules; memorizing a base derivative does not remove an inner derivative. Check the real domain before using a logarithmic expression."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For y=ln(x²+1), chain rule gives y′=2x/(x²+1), defined for every real x because x²+1 is positive. For y=e^(3x)cos x, product and chain rules give y′=3e^(3x)cos x−e^(3x)sin x. Factoring e^(3x) makes both contributions visible."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "Do not use degree-mode trig values in calculus formulas derived for radians. The derivative of ln x is not ln x itself, and a logarithmic derivative still needs a chain-rule factor."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Let f(x) = 5^(2x) * sin(3x). Find the exact derivative f'(x) and evaluate it at x = 0. Using the product rule, f'(x) = [d/dx(5^(2x))] * sin(3x) + 5^(2x) * [d/dx(sin(3x))]. Applying the exponential rule with base b=5 and the chain rule, d/dx(5^(2x)) = 5^(2x) * ln(5) * 2. For the trigonometric term, the chain rule yields d/dx(sin(3x)) = 3 * cos(3x). Combining these results produces f'(x) = 2 * ln(5) * 5^(2x) * sin(3x) + 3 * 5^(2x) * cos(3x). Factoring yields f'(x) = 5^(2x) * [2 ln(5) sin(3x) + 3 cos(3x)]. Evaluating at x = 0 gives f'(0) = 5^0 * [2 ln(5) sin(0) + 3 cos(0)] = 1 * [0 + 3(1)] = 3. Assumptions include radian measure."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A critical misconception when differentiating exponential functions with non-e bases is omitting the ln(b) factor, erroneously treating b^x like e^x. Another frequent error is dropping inner derivatives generated by the chain rule on composite exponents or trig arguments. Always ensure that trigonometric evaluations use radians, because calculus formulas for sine and cosine derivatives assume real numbers representing radian arcs. Furthermore, when executing the product rule, students incorrectly multiply derivatives together instead of summing the cross-products. Carefully isolate each component before combining terms."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-26-1",
          "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Differentiate ln(x²+1).",
          "choices": [
            "1/(x²+1)",
            "2x/(x²+1)",
            "2xln(x²+1)",
            "ln(2x)"
          ],
          "answer": 1,
          "explanation": "Use1/u times u′ with u=x²+1, giving2x/(x²+1).",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-26-2",
          "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Differentiate e^(3x)cos x.",
          "choices": [
            "3e^(3x)sin x",
            "e^(3x)(3cos x−sin x)",
            "e^(3x)(cos x+sin x)",
            "3e^(3x)cos x"
          ],
          "answer": 1,
          "explanation": "Product rule supplies both terms, and chain rule supplies the factor3.",
          "testType": "ap"
        }
      ]
    },
    {
      "id": "calc-bc-lesson-27",
      "title": "4.3 L’Hôpital’s Rule and indeterminate forms",
      "domain": "Calc BC: Contextual Applications of Differentiation",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "L’Hôpital’s Rule and indeterminate forms"
        },
        {
          "type": "text",
          "text": "L’Hôpital’s Rule can evaluate certain quotient limits with indeterminate form 0/0 or ∞/∞ by taking the limit of the quotient of derivatives, provided the theorem’s hypotheses hold. Differentiate numerator and denominator separately; this is not the quotient rule for differentiating the entire expression. A form such as 0·∞ or ∞−∞ must first be rewritten as a suitable quotient. Recheck the form if another application is considered. A nonzero number divided by zero is not an indeterminate form that automatically permits the rule."
        },
        {
          "type": "subheading",
          "text": "Worked reasoning"
        },
        {
          "type": "text",
          "text": "For lim as x→0 of(eˣ−1)/x, substitution gives 0/0. The derivative quotient is eˣ/1, whose limit is 1. For lim as x→0 of sin x/x, the derivative quotient is cos x/1, also approaching 1. In contrast, lim as x→0 from the right of 1/x is unbounded; differentiating numerator and denominator to get 0 would be an invalid use of the rule."
        },
        {
          "type": "subheading",
          "text": "Check the conditions"
        },
        {
          "type": "text",
          "text": "A quotient must meet the appropriate limiting form and differentiability conditions. State why the rule applies before replacing the original quotient with a derivative quotient."
        },
        {
          "type": "text",
          "text": "Before checking your answer, identify what the question asks for, choose the relevant relationship, and show the intermediate step that connects your expression to the conclusion. Keep exact values when possible. Check the original domain and explain any sign, endpoint, or unit interpretation rather than relying on a calculator display."
        },
        {
          "type": "subheading",
          "text": "Practice and reflect"
        },
        {
          "type": "text",
          "text": "Try both chapter checks without looking at the explanation. Afterward, explain why the distractors fail and identify the condition or computation that distinguishes the correct answer. These original instructional checks are included in the practice bank; repeating a chapter check is review, not independent evidence of exam readiness."
        },
        {
          "type": "subheading",
          "text": "Another worked example"
        },
        {
          "type": "text",
          "text": "Evaluate the limit as x approaches infinity of ln(x) divided by x squared. Direct substitution yields the indeterminate form infinity over infinity, a form for which L’Hôpital’s Rule can be considered. Here both functions are differentiable for x > 0, the denominator derivative 2x is nonzero there, and the limit of the derivative quotient exists, so the rule applies. Differentiating the numerator yields 1/x, and differentiating the denominator yields 2x. Applying the rule gives the limit as x approaches infinity of (1/x) / (2x), which simplifies algebraically to the limit as x approaches infinity of 1 over (2x squared). As x grows unboundedly, the denominator increases without bound while the numerator remains 1, so the limit evaluates to 0. State clearly that the initial quotient met the infinity over infinity form before taking derivatives."
        },
        {
          "type": "subheading",
          "text": "Why this approach works"
        },
        {
          "type": "text",
          "text": "A critical misconception is applying L'Hopital's Rule blindly without verifying that the limit yields a valid indeterminate form like 0/0 or infinity over infinity at each stage. For instance, consider the limit as x approaches 0 of (cos x) divided by x. Direct substitution gives cos(0)/0, which simplifies to 1/0. This is a nonzero number divided by zero, not an indeterminate form. L'Hopital's Rule does not apply here; the one-sided limits diverge to positive and negative infinity rather than approaching a finite value or indeterminate quotient. Always explicitly test the expression's form before performing separate derivatives on the numerator and denominator."
        }
      ],
      "practiceQuestions": [
        {
          "id": "calc-bc-mcq-27-1",
          "domain": "Calc BC: Contextual Applications of Differentiation",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Evaluate lim as x→0 of(eˣ−1)/x.",
          "choices": [
            "0",
            "1",
            "e",
            "Does not exist"
          ],
          "answer": 1,
          "explanation": "It is0/0; L’Hôpital gives lim eˣ=1.",
          "testType": "ap"
        },
        {
          "id": "calc-bc-mcq-27-2",
          "domain": "Calc BC: Contextual Applications of Differentiation",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Concept and application",
          "question": "Which initial form is eligible for L’Hôpital’s Rule when its other hypotheses hold?",
          "choices": [
            "1/0",
            "0/0",
            "0/1",
            "1/1"
          ],
          "answer": 1,
          "explanation": "The rule handles the indeterminate quotient forms0/0 and∞/∞;1/0 alone is not such a form.",
          "testType": "ap"
        }
      ]
    }
  ],
  "mcq": [
    {
      "id": "calc-bc-mcq-1-1",
      "domain": "Calc BC: Limits & Continuity",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Find lim as x→3 of (x²−9)/(x−3).",
      "choices": [
        "0",
        "3",
        "6",
        "Does not exist"
      ],
      "answer": 2,
      "explanation": "Factor x²−9=(x−3)(x+3). Nearby values equal x+3, which approaches6.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-1-2",
      "domain": "Calc BC: Limits & Continuity",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "The left limit of f at2 is4 and the right limit is5. What is the two-sided limit?",
      "choices": [
        "4",
        "5",
        "4.5",
        "Does not exist"
      ],
      "answer": 3,
      "explanation": "The unequal one-sided limits cannot define one two-sided limit.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-2-1",
      "domain": "Calc BC: Limits & Continuity",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "A function equals (x²−4)/(x−2) for x≠2. Which f(2) makes it continuous?",
      "choices": [
        "0",
        "2",
        "4",
        "No such value"
      ],
      "answer": 2,
      "explanation": "The nearby expression equals x+2, whose limit at2 is4.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-2-2",
      "domain": "Calc BC: Limits & Continuity",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Which condition is needed to apply IVT on [a,b]?",
      "choices": [
        "Differentiability only at a",
        "Continuity on [a,b]",
        "A positive derivative everywhere",
        "Equal endpoint values"
      ],
      "answer": 1,
      "explanation": "IVT requires continuity throughout the interval; differentiability is stronger and unnecessary.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-3-1",
      "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "What limit defines f′(2)?",
      "choices": [
        "lim h→0 [f(2+h)−f(2)]/h",
        "lim h→0 f(2+h)/h",
        "lim h→0 [f(2+h)−f(h)]/2",
        "f(2)/2"
      ],
      "answer": 0,
      "explanation": "The difference quotient compares f near2 with f(2), then divides by the change h.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-3-2",
      "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Which statement is always true?",
      "choices": [
        "Continuity implies differentiability",
        "Differentiability implies continuity",
        "A corner implies discontinuity",
        "Every continuous function has a tangent slope"
      ],
      "answer": 1,
      "explanation": "A differentiable function must be continuous, but |x| is continuous and not differentiable at0.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-4-1",
      "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Differentiate x³−4x+7.",
      "choices": [
        "3x²−4",
        "3x²+7",
        "x²−4",
        "3x²−4x"
      ],
      "answer": 0,
      "explanation": "Differentiate each term:3x²,−4,0.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-4-2",
      "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "If f(x)=x²sin x, what is f′(x)?",
      "choices": [
        "2xcos x",
        "2xsin x+x²cos x",
        "x²cos x",
        "2xsin x−x²cos x"
      ],
      "answer": 1,
      "explanation": "Use product rule, differentiating each factor once and adding the two products.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-5-1",
      "domain": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Differentiate (3x+1)⁴.",
      "choices": [
        "4(3x+1)³",
        "12(3x+1)³",
        "(3x+1)³",
        "12(3x+1)⁴"
      ],
      "answer": 1,
      "explanation": "Multiply the outer derivative4(3x+1)³ by inner derivative3.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-5-2",
      "domain": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "If f(1)=4 and f′(1)=−2, what is (f⁻¹)′(4)?",
      "choices": [
        "−2",
        "2",
        "−1/2",
        "1/2"
      ],
      "answer": 2,
      "explanation": "At the corresponding output4, the inverse slope is the reciprocal of−2.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-6-1",
      "domain": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "On x²+y²=25, find dy/dx at(3,4).",
      "choices": [
        "3/4",
        "−3/4",
        "−4/3",
        "4/3"
      ],
      "answer": 1,
      "explanation": "Implicit differentiation gives y′=−x/y; substitute3 and4.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-6-2",
      "domain": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Differentiate xy=6 implicitly.",
      "choices": [
        "y′=−y/x",
        "y′=6/x",
        "y′=−x/y",
        "y′=0"
      ],
      "answer": 0,
      "explanation": "Product rule gives y+xy′=0, so y′=−y/x for x≠0.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-7-1",
      "domain": "Calc BC: Contextual Applications of Differentiation",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "A particle has v=−3m/s and a=2m/s². It is:",
      "choices": [
        "Moving right and speeding up",
        "Moving left and slowing down",
        "Moving left and speeding up",
        "At rest"
      ],
      "answer": 1,
      "explanation": "Opposite signs of velocity and acceleration imply decreasing speed; negative velocity means leftward motion.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-7-2",
      "domain": "Calc BC: Contextual Applications of Differentiation",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "If s(t)=t³−3t², what is a(t)?",
      "choices": [
        "3t²−6t",
        "6t−6",
        "6t",
        "t²−6t"
      ],
      "answer": 1,
      "explanation": "Differentiate position twice: v=3t²−6t, a=6t−6.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-8-1",
      "domain": "Calc BC: Contextual Applications of Differentiation",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "A circle radius is3cm and increasing at2cm/s. Find dA/dt.",
      "choices": [
        "6πcm²/s",
        "9πcm²/s",
        "12πcm²/s",
        "18πcm²/s"
      ],
      "answer": 2,
      "explanation": "Differentiate A=πr²: A′=2πrr′=2π(3)(2)=12π.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-8-2",
      "domain": "Calc BC: Contextual Applications of Differentiation",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Using the tangent at4, estimate √4.1.",
      "choices": [
        "2.1",
        "2.05",
        "2.025",
        "2.0025"
      ],
      "answer": 2,
      "explanation": "f(4)=2 and f′(4)=1/4, so L(4.1)=2+0.1/4=2.025.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-9-1",
      "domain": "Calc BC: Analytical Applications of Differentiation",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "For f(x)=x² on[1,3], which c satisfies the MVT conclusion?",
      "choices": [
        "1",
        "2",
        "3",
        "4"
      ],
      "answer": 1,
      "explanation": "The secant slope is4 and f′(c)=2c=4 at c=2.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-9-2",
      "domain": "Calc BC: Analytical Applications of Differentiation",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Find the absolute minimum of x²−4x on[0,5].",
      "choices": [
        "0",
        "−4",
        "5",
        "−2"
      ],
      "answer": 1,
      "explanation": "Evaluate at endpoints and critical point x=2; the smallest value is−4.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-10-1",
      "domain": "Calc BC: Analytical Applications of Differentiation",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "For f′(x)=(x−1)(x−3), where is f decreasing?",
      "choices": [
        "x<1",
        "1<x<3",
        "x>3",
        "Everywhere"
      ],
      "answer": 1,
      "explanation": "The factors have opposite signs between1 and3, making the derivative negative.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-10-2",
      "domain": "Calc BC: Analytical Applications of Differentiation",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "A rectangle has perimeter20. What side lengths maximize area?",
      "choices": [
        "1 and9",
        "2 and8",
        "4 and6",
        "5 and5"
      ],
      "answer": 3,
      "explanation": "A=x(10−x) has maximum at x=5, giving a square.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-11-1",
      "domain": "Calc BC: Integration & Accumulation of Change",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "At x=0,1,2 the values of f are2,4,8. What is the left sum on[0,2] with two intervals?",
      "choices": [
        "6",
        "12",
        "14",
        "10"
      ],
      "answer": 0,
      "explanation": "Width1 times the left heights2+4 gives6.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-11-2",
      "domain": "Calc BC: Integration & Accumulation of Change",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "For the same table, what is the trapezoidal estimate?",
      "choices": [
        "6",
        "9",
        "12",
        "14"
      ],
      "answer": 1,
      "explanation": "The two trapezoid areas are(2+4)/2=3 and(4+8)/2=6, totaling9.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-12-1",
      "domain": "Calc BC: Integration & Accumulation of Change",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Differentiate ∫ from0 to x² eᵗdt.",
      "choices": [
        "e^(x²)",
        "2xe^(x²)",
        "2xeˣ",
        "eˣ"
      ],
      "answer": 1,
      "explanation": "FTC gives e^(x²) and chain rule multiplies by2x.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-12-2",
      "domain": "Calc BC: Integration & Accumulation of Change",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Evaluate ∫ from0 to1 2x(x²+1)³dx.",
      "choices": [
        "15/4",
        "4",
        "1/4",
        "15"
      ],
      "answer": 0,
      "explanation": "Let u=x²+1; bounds1to2 give[u⁴/4]₁²=(16−1)/4=15/4.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-13-1",
      "domain": "Calc BC: Differential Equations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Solve y′=2xy with y(0)=3.",
      "choices": [
        "3e^(x²)",
        "3e^(2x)",
        "e^(x²)+3",
        "3x²"
      ],
      "answer": 0,
      "explanation": "Separate and integrate to get y=Ce^(x²); y(0)=3 fixes C=3.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-13-2",
      "domain": "Calc BC: Differential Equations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "For y′=y(2−y), which are equilibrium solutions?",
      "choices": [
        "y=0 only",
        "y=2 only",
        "y=0 and y=2",
        "y=1 and y=2"
      ],
      "answer": 2,
      "explanation": "Constant solutions require0=y(2−y), so y=0 or2.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-14-1",
      "domain": "Calc BC: Differential Equations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Euler’s method for y′=y,y(0)=1 with step 0.5 gives y(1)≈?",
      "choices": [
        "2",
        "2.25",
        "2.5",
        "e"
      ],
      "answer": 1,
      "explanation": "Two tangent steps give1.5 then2.25.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-14-2",
      "domain": "Calc BC: Differential Equations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "A model y′=ky has half-life H>0. Find k.",
      "choices": [
        "ln2/H",
        "−ln2/H",
        "H/ln2",
        "−Hln2"
      ],
      "answer": 1,
      "explanation": "From e^(kH)=1/2, take logs: kH=−ln2.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-15-1",
      "domain": "Calc BC: Applications of Integration",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Find the area between y=x and y=x² on[0,1].",
      "choices": [
        "1/2",
        "1/3",
        "1/6",
        "−1/6"
      ],
      "answer": 2,
      "explanation": "Integrate top−bottom:x−x²; the result is1/6.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-15-2",
      "domain": "Calc BC: Applications of Integration",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "What is the average value of x² on[0,3]?",
      "choices": [
        "3",
        "4.5",
        "9",
        "1"
      ],
      "answer": 0,
      "explanation": "The integral is9; divide by interval length3 to obtain3.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-16-1",
      "domain": "Calc BC: Applications of Integration",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Revolve the region under y=x,0≤x≤2, about the x-axis. Find volume.",
      "choices": [
        "4π",
        "8π/3",
        "2π",
        "16π/3"
      ],
      "answer": 1,
      "explanation": "Disk radius is x, so V=π∫₀²x²dx=8π/3.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-16-2",
      "domain": "Calc BC: Applications of Integration",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "If v(t)=t−1 on[0,2], what is total distance?",
      "choices": [
        "0",
        "1",
        "2",
        "−1"
      ],
      "answer": 1,
      "explanation": "Integrate |t−1| by splitting at1; each half contributes1/2.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-17-1",
      "domain": "Calc BC: Integration & Accumulation of Change",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Find∫xeˣdx.",
      "choices": [
        "xeˣ+C",
        "eˣ(x−1)+C",
        "eˣ(x+1)+C",
        "x²eˣ/2+C"
      ],
      "answer": 1,
      "explanation": "Integration by parts gives xeˣ−∫eˣdx=eˣ(x−1)+C.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-17-2",
      "domain": "Calc BC: Integration & Accumulation of Change",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Which equals1/[x(x+1)]?",
      "choices": [
        "1/x+1/(x+1)",
        "1/x−1/(x+1)",
        "−1/x+1/(x+1)",
        "1/(2x+1)"
      ],
      "answer": 1,
      "explanation": "Recombining yields[(x+1)−x]/[x(x+1)]=1/[x(x+1)].",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-18-1",
      "domain": "Calc BC: Differential Equations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "In y′=0.2y(1−y/100), growth rate is greatest at y=?",
      "choices": [
        "0",
        "20",
        "50",
        "100"
      ],
      "answer": 2,
      "explanation": "The quadratic rate is maximized halfway between the equilibria0 and100.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-18-2",
      "domain": "Calc BC: Differential Equations",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "For y=100/(1+Ae^(−0.2t)) and y(0)=20, find A.",
      "choices": [
        "1",
        "4",
        "5",
        "20"
      ],
      "answer": 1,
      "explanation": "20=100/(1+A), so1+A=5 and A=4.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-19-1",
      "domain": "Calc BC: Applications of Integration",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Evaluate∫₁∞x⁻²dx.",
      "choices": [
        "0",
        "1",
        "2",
        "Diverges"
      ],
      "answer": 1,
      "explanation": "The antiderivative is−1/x and the limit is 1.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-19-2",
      "domain": "Calc BC: Applications of Integration",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Find arc length of y=3x on[0,2].",
      "choices": [
        "6",
        "√10",
        "2√10",
        "10"
      ],
      "answer": 2,
      "explanation": "Arc length is∫₀²√(1+9)dx=2√10.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-20-1",
      "domain": "Calc BC: Parametric, Polar & Vector Functions",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "For x=t²,y=t³ at t=2, find dy/dx.",
      "choices": [
        "3",
        "4/3",
        "6",
        "12"
      ],
      "answer": 0,
      "explanation": "The ratio3t²/(2t)=3t/2 equals3 at2.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-20-2",
      "domain": "Calc BC: Parametric, Polar & Vector Functions",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "For the same curve at t=1, find d²y/dx².",
      "choices": [
        "3/2",
        "3/4",
        "3",
        "1/2"
      ],
      "answer": 1,
      "explanation": "Differentiate3t/2 with respect to t, then divide by2t, yielding3/(4t).",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-21-1",
      "domain": "Calc BC: Parametric, Polar & Vector Functions",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "A velocity vector is〈−3,4〉. What is speed?",
      "choices": [
        "1",
        "7",
        "5",
        "−5"
      ],
      "answer": 2,
      "explanation": "The magnitude is√(9+16)=5.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-21-2",
      "domain": "Calc BC: Parametric, Polar & Vector Functions",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "If r(t)=〈t²,t³〉, what is acceleration?",
      "choices": [
        "〈2t,3t²〉",
        "〈2,6t〉",
        "〈1,3t〉",
        "〈2t,6t〉"
      ],
      "answer": 1,
      "explanation": "Differentiate each component twice.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-22-1",
      "domain": "Calc BC: Parametric, Polar & Vector Functions",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Find area inside r=2 for0≤θ≤π/2.",
      "choices": [
        "π/2",
        "π",
        "2π",
        "4π"
      ],
      "answer": 1,
      "explanation": "One half times the integral of4 over an interval of lengthπ/2 isπ.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-22-2",
      "domain": "Calc BC: Parametric, Polar & Vector Functions",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "For constant r=2 at θ=π/4, what is dy/dx?",
      "choices": [
        "1",
        "−1",
        "0",
        "Undefined"
      ],
      "answer": 1,
      "explanation": "The slope is(2cosθ)/(−2sinθ)=−cotθ=−1.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-23-1",
      "domain": "Calc BC: Infinite Sequences & Series",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "What is3+3/2+3/4+⋯?",
      "choices": [
        "3",
        "4.5",
        "6",
        "Diverges"
      ],
      "answer": 2,
      "explanation": "The ratio is1/2, so the sum is3/(1−1/2)=6.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-23-2",
      "domain": "Calc BC: Infinite Sequences & Series",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Which series converges?",
      "choices": [
        "∑1/n",
        "∑1/√n",
        "∑1/n²",
        "∑1"
      ],
      "answer": 2,
      "explanation": "The p-series exponent2 exceeds1; the other three diverge.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-24-1",
      "domain": "Calc BC: Infinite Sequences & Series",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "What is the convergence interval for∑xⁿ/n,n≥1?",
      "choices": [
        "(−1,1)",
        "[−1,1]",
        "[−1,1)",
        "(−1,1]"
      ],
      "answer": 2,
      "explanation": "The negative endpoint is alternating harmonic and converges; the positive endpoint is harmonic and diverges.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-24-2",
      "domain": "Calc BC: Infinite Sequences & Series",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "If a valid alternating-series estimate has next omitted term magnitude0.003, the error is:",
      "choices": [
        "Exactly0.003",
        "At most0.003",
        "At least0.003",
        "Always0"
      ],
      "answer": 1,
      "explanation": "The alternating-series error theorem bounds the absolute error by the next omitted magnitude.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-25-1",
      "domain": "Calc BC: Infinite Sequences & Series",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "What is the degree2 Maclaurin polynomial for eˣ?",
      "choices": [
        "1+x+x²",
        "1+x+x²/2",
        "x+x²/2",
        "1+x/2+x²/6"
      ],
      "answer": 1,
      "explanation": "All derivatives at0 equal1 and the quadratic coefficient is1/2!.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-25-2",
      "domain": "Calc BC: Infinite Sequences & Series",
      "difficulty": "Hard",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "If |f‴(t)|≤6 between0 and0.2, what bound applies to a degree2 Maclaurin error at0.2?",
      "choices": [
        "0.008",
        "0.024",
        "0.04",
        "0.2"
      ],
      "answer": 0,
      "explanation": "Lagrange error is at most6(0.2)³/3!=0.008.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-26-1",
      "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Differentiate ln(x²+1).",
      "choices": [
        "1/(x²+1)",
        "2x/(x²+1)",
        "2xln(x²+1)",
        "ln(2x)"
      ],
      "answer": 1,
      "explanation": "Use1/u times u′ with u=x²+1, giving2x/(x²+1).",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-26-2",
      "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Differentiate e^(3x)cos x.",
      "choices": [
        "3e^(3x)sin x",
        "e^(3x)(3cos x−sin x)",
        "e^(3x)(cos x+sin x)",
        "3e^(3x)cos x"
      ],
      "answer": 1,
      "explanation": "Product rule supplies both terms, and chain rule supplies the factor3.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-27-1",
      "domain": "Calc BC: Contextual Applications of Differentiation",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Evaluate lim as x→0 of(eˣ−1)/x.",
      "choices": [
        "0",
        "1",
        "e",
        "Does not exist"
      ],
      "answer": 1,
      "explanation": "It is0/0; L’Hôpital gives lim eˣ=1.",
      "testType": "ap"
    },
    {
      "id": "calc-bc-mcq-27-2",
      "domain": "Calc BC: Contextual Applications of Differentiation",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Concept and application",
      "question": "Which initial form is eligible for L’Hôpital’s Rule when its other hypotheses hold?",
      "choices": [
        "1/0",
        "0/0",
        "0/1",
        "1/1"
      ],
      "answer": 1,
      "explanation": "The rule handles the indeterminate quotient forms0/0 and∞/∞;1/0 alone is not such a form.",
      "testType": "ap"
    }
  ],
  "frq": [
    {
      "id": "calc-bc-frq-1",
      "domain": "Calc BC: Limits & Continuity",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "title": "Limits, continuity and a repaired function",
      "question": "Original targeted practice; this is not a full official exam section. Let f(x)=(x²−1)/(x−1) for x≠1 and f(1)=k. No calculator is needed.\n\nA. Find lim as x→1 of f(x). Show the simplification.\nB. Choose k so f is continuous at1 and justify.\nC. For this k, find f′(1) using a limit or an equivalent differentiable expression.",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 3,
          "prompt": "Find lim as x→1 of f(x). Show the simplification.",
          "guidance": "Factor x²−1=(x−1)(x+1) (1); cancel only for x≠1 (1); conclude limit2 (1)."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 3,
          "prompt": "Choose k so f is continuous at1 and justify.",
          "guidance": "State that continuity requires f(1) to equal the limit (1); identify the limit as2 (1); choose k=2 (1)."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 3,
          "prompt": "For this k, find f′(1) using a limit or an equivalent differentiable expression.",
          "guidance": "Recognize the repaired function equals x+1 including at1 (1); use a derivative or difference quotient correctly (1); conclude f′(1)=1 (1)."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional rubric, not an official College Board scoring guide. Award each listed point independently for correct mathematics; accept algebraically equivalent forms and valid alternative methods. Do not require model wording. A: Factor x²−1=(x−1)(x+1) (1); cancel only for x≠1 (1); conclude limit2 (1). B: State that continuity requires f(1) to equal the limit (1); identify the limit as2 (1); choose k=2 (1). C: Recognize the repaired function equals x+1 including at1 (1); use a derivative or difference quotient correctly (1); conclude f′(1)=1 (1).",
      "explanation": "Show a justified setup and enough work to connect it to the answer. Follow the point-by-point criteria; do not interpret an AI feedback score as an official AP score."
    },
    {
      "id": "calc-bc-frq-2",
      "domain": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "title": "Differentiation and a tangent",
      "question": "Original targeted practice; this is not a full official exam section. Let f(x)=x³−3x²+2 on[−1,3]. No calculator is needed.\n\nA. Find f′ and all critical numbers in the interval.\nB. Write the tangent line at x=1.\nC. Find the absolute minimum value on the interval. Show the candidate values.",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 3,
          "prompt": "Find f′ and all critical numbers in the interval.",
          "guidance": "Differentiate to3x²−6x (1); factor3x(x−2) (1); identify0 and2 (1)."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 3,
          "prompt": "Write the tangent line at x=1.",
          "guidance": "Compute f(1)=0 (1); compute f′(1)=−3 (1); write y=−3(x−1) (1)."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 3,
          "prompt": "Find the absolute minimum value on the interval. Show the candidate values.",
          "guidance": "Evaluate endpoints f(−1)=−2 and f(3)=2 (1); evaluate f(0)=2 and f(2)=−2 (1); conclude minimum−2, attained at−1 and2 (1)."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional rubric, not an official College Board scoring guide. Award each listed point independently for correct mathematics; accept algebraically equivalent forms and valid alternative methods. Do not require model wording. A: Differentiate to3x²−6x (1); factor3x(x−2) (1); identify0 and2 (1). B: Compute f(1)=0 (1); compute f′(1)=−3 (1); write y=−3(x−1) (1). C: Evaluate endpoints f(−1)=−2 and f(3)=2 (1); evaluate f(0)=2 and f(2)=−2 (1); conclude minimum−2, attained at−1 and2 (1).",
      "explanation": "Show a justified setup and enough work to connect it to the answer. Follow the point-by-point criteria; do not interpret an AI feedback score as an official AP score."
    },
    {
      "id": "calc-bc-frq-3",
      "domain": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "title": "Implicit differentiation on a circle",
      "question": "Original targeted practice; this is not a full official exam section. The curve is x²+y²=25. Work on its upper branch near(3,4). No calculator is needed.\n\nA. Find dy/dx and evaluate it at(3,4).\nB. Write the tangent line at(3,4).\nC. Find d²y/dx² at(3,4), showing your reasoning.",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 3,
          "prompt": "Find dy/dx and evaluate it at(3,4).",
          "guidance": "Differentiate2x+2yy′=0 (1); solve y′=−x/y (1); evaluate−3/4 (1)."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 3,
          "prompt": "Write the tangent line at(3,4).",
          "guidance": "Use the point(3,4) (1); use slope−3/4 (1); write y−4=−3(x−3)/4 or equivalent (1)."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 3,
          "prompt": "Find d²y/dx² at(3,4), showing your reasoning.",
          "guidance": "Differentiate y′=−x/y to y″=−1/y+xy′/y² (1); substitute y′=−x/y giving−(x²+y²)/y³ (1); obtain−25/64 (1)."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional rubric, not an official College Board scoring guide. Award each listed point independently for correct mathematics; accept algebraically equivalent forms and valid alternative methods. Do not require model wording. A: Differentiate2x+2yy′=0 (1); solve y′=−x/y (1); evaluate−3/4 (1). B: Use the point(3,4) (1); use slope−3/4 (1); write y−4=−3(x−3)/4 or equivalent (1). C: Differentiate y′=−x/y to y″=−1/y+xy′/y² (1); substitute y′=−x/y giving−(x²+y²)/y³ (1); obtain−25/64 (1).",
      "explanation": "Show a justified setup and enough work to connect it to the answer. Follow the point-by-point criteria; do not interpret an AI feedback score as an official AP score."
    },
    {
      "id": "calc-bc-frq-4",
      "domain": "Calc BC: Contextual Applications of Differentiation",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "title": "Motion along a line",
      "question": "Original targeted practice; this is not a full official exam section. A particle has position s(t)=t³−6t²+9t meters for0≤t≤4 seconds. No calculator is needed.\n\nA. Find velocity and acceleration.\nB. Determine when the particle moves left.\nC. Find total distance traveled on[0,4].",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 3,
          "prompt": "Find velocity and acceleration.",
          "guidance": "Compute v(t)=3t²−12t+9 (1); compute a(t)=6t−12 (1); include correct velocity/acceleration units (1)."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 3,
          "prompt": "Determine when the particle moves left.",
          "guidance": "Factor v=3(t−1)(t−3) (1); establish negative velocity between1 and3 (1); report1<t<3 seconds (1)."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 3,
          "prompt": "Find total distance traveled on[0,4].",
          "guidance": "Split at t=1 and3 (1); compute s(0)=0,s(1)=4,s(3)=0,s(4)=4 (1); add absolute changes4+4+4=12meters (1)."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional rubric, not an official College Board scoring guide. Award each listed point independently for correct mathematics; accept algebraically equivalent forms and valid alternative methods. Do not require model wording. A: Compute v(t)=3t²−12t+9 (1); compute a(t)=6t−12 (1); include correct velocity/acceleration units (1). B: Factor v=3(t−1)(t−3) (1); establish negative velocity between1 and3 (1); report1<t<3 seconds (1). C: Split at t=1 and3 (1); compute s(0)=0,s(1)=4,s(3)=0,s(4)=4 (1); add absolute changes4+4+4=12meters (1).",
      "explanation": "Show a justified setup and enough work to connect it to the answer. Follow the point-by-point criteria; do not interpret an AI feedback score as an official AP score."
    },
    {
      "id": "calc-bc-frq-5",
      "domain": "Calc BC: Analytical Applications of Differentiation",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 1,
      "title": "A constrained maximum",
      "question": "Original targeted practice; this is not a full official exam section. A rectangle has perimeter24cm and positive side lengths x and y. No calculator is needed.\n\nA. Express area as a function of x and give its feasible domain.\nB. Find the dimensions giving maximum area and justify the maximum.\nC. Find the greatest area and interpret the units.",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 3,
          "prompt": "Express area as a function of x and give its feasible domain.",
          "guidance": "Use2x+2y=24 giving y=12−x (1); write A=x(12−x) (1); state0<x<12 (1)."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 3,
          "prompt": "Find the dimensions giving maximum area and justify the maximum.",
          "guidance": "Differentiate A′=12−2x (1); solve x=6,y=6 (1); justify with A″=−2 or derivative signs (1)."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 3,
          "prompt": "Find the greatest area and interpret the units.",
          "guidance": "Substitute the dimensions into xy (1); give36 (1); identify square centimeters (1)."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional rubric, not an official College Board scoring guide. Award each listed point independently for correct mathematics; accept algebraically equivalent forms and valid alternative methods. Do not require model wording. A: Use2x+2y=24 giving y=12−x (1); write A=x(12−x) (1); state0<x<12 (1). B: Differentiate A′=12−2x (1); solve x=6,y=6 (1); justify with A″=−2 or derivative signs (1). C: Substitute the dimensions into xy (1); give36 (1); identify square centimeters (1).",
      "explanation": "Show a justified setup and enough work to connect it to the answer. Follow the point-by-point criteria; do not interpret an AI feedback score as an official AP score."
    },
    {
      "id": "calc-bc-frq-6",
      "domain": "Calc BC: Integration & Accumulation of Change",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "title": "Accumulation from a rate",
      "question": "Original targeted practice; this is not a full official exam section. Water flows into an initially5-liter tank at rate r(t)=2t+1 liters/minute for0≤t≤3. No water leaves. No calculator is needed.\n\nA. Find the amount of water added during[0,3].\nB. Write V(t), the water volume at time t, and find V(3).\nC. Find the average inflow rate on[0,3] and explain its units.",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 3,
          "prompt": "Find the amount of water added during[0,3].",
          "guidance": "Set up∫₀³(2t+1)dt (1); find antiderivative t²+t (1); evaluate12liters (1)."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 3,
          "prompt": "Write V(t), the water volume at time t, and find V(3).",
          "guidance": "Include initial volume5 (1); write V(t)=5+t²+t (1); obtain V(3)=17liters (1)."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 3,
          "prompt": "Find the average inflow rate on[0,3] and explain its units.",
          "guidance": "Divide accumulated inflow12 by interval length3 (1); obtain4 (1); use liters/minute, representing a constant rate with the same added volume (1)."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional rubric, not an official College Board scoring guide. Award each listed point independently for correct mathematics; accept algebraically equivalent forms and valid alternative methods. Do not require model wording. A: Set up∫₀³(2t+1)dt (1); find antiderivative t²+t (1); evaluate12liters (1). B: Include initial volume5 (1); write V(t)=5+t²+t (1); obtain V(3)=17liters (1). C: Divide accumulated inflow12 by interval length3 (1); obtain4 (1); use liters/minute, representing a constant rate with the same added volume (1).",
      "explanation": "Show a justified setup and enough work to connect it to the answer. Follow the point-by-point criteria; do not interpret an AI feedback score as an official AP score."
    },
    {
      "id": "calc-bc-frq-7",
      "domain": "Calc BC: Differential Equations",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "title": "A differential equation and approximation",
      "question": "Original targeted practice; this is not a full official exam section. Let y′=2xy and y(0)=2. No calculator is needed.\n\nA. Find the particular solution.\nB. Use two Euler steps of size0.5 to approximate y(1).\nC. Verify the particular solution satisfies the equation and initial condition.",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 3,
          "prompt": "Find the particular solution.",
          "guidance": "Separate dy/y=2xdx on the nonzero solution (1); integrate ln|y|=x²+C and solve y=Ce^(x²) (1); use y(0)=2 to get2e^(x²) (1)."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 3,
          "prompt": "Use two Euler steps of size0.5 to approximate y(1).",
          "guidance": "First slope at(0,2) is0 and y(0.5)≈2 (1); next slope at(0.5,2) is2 (1); obtain y(1)≈3 (1)."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 3,
          "prompt": "Verify the particular solution satisfies the equation and initial condition.",
          "guidance": "Differentiate2e^(x²) to4xe^(x²) (1); show it equals2x times2e^(x²) (1); show y(0)=2 (1)."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional rubric, not an official College Board scoring guide. Award each listed point independently for correct mathematics; accept algebraically equivalent forms and valid alternative methods. Do not require model wording. A: Separate dy/y=2xdx on the nonzero solution (1); integrate ln|y|=x²+C and solve y=Ce^(x²) (1); use y(0)=2 to get2e^(x²) (1). B: First slope at(0,2) is0 and y(0.5)≈2 (1); next slope at(0.5,2) is2 (1); obtain y(1)≈3 (1). C: Differentiate2e^(x²) to4xe^(x²) (1); show it equals2x times2e^(x²) (1); show y(0)=2 (1).",
      "explanation": "Show a justified setup and enough work to connect it to the answer. Follow the point-by-point criteria; do not interpret an AI feedback score as an official AP score."
    },
    {
      "id": "calc-bc-frq-8",
      "domain": "Calc BC: Applications of Integration",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "title": "Area and volume between curves",
      "question": "Original targeted practice; this is not a full official exam section. The region R is bounded by y=x and y=x² for0≤x≤1. No calculator is needed.\n\nA. Find the area of R.\nB. Find the volume when R is revolved about the x-axis.\nC. Find the average value of h(x)=x−x² on[0,1].",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 3,
          "prompt": "Find the area of R.",
          "guidance": "Identify top curve x over x² on(0,1) (1); set up∫₀¹(x−x²)dx (1); evaluate1/6 (1)."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 3,
          "prompt": "Find the volume when R is revolved about the x-axis.",
          "guidance": "Identify radii R=x,r=x² (1); set upπ∫₀¹(x²−x⁴)dx (1); obtain2π/15 (1)."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 3,
          "prompt": "Find the average value of h(x)=x−x² on[0,1].",
          "guidance": "Use(1/(1−0))∫₀¹h(x)dx (1); evaluate the integral1/6 (1); report average value1/6 (1)."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional rubric, not an official College Board scoring guide. Award each listed point independently for correct mathematics; accept algebraically equivalent forms and valid alternative methods. Do not require model wording. A: Identify top curve x over x² on(0,1) (1); set up∫₀¹(x−x²)dx (1); evaluate1/6 (1). B: Identify radii R=x,r=x² (1); set upπ∫₀¹(x²−x⁴)dx (1); obtain2π/15 (1). C: Use(1/(1−0))∫₀¹h(x)dx (1); evaluate the integral1/6 (1); report average value1/6 (1).",
      "explanation": "Show a justified setup and enough work to connect it to the answer. Follow the point-by-point criteria; do not interpret an AI feedback score as an official AP score."
    },
    {
      "id": "calc-bc-frq-9",
      "domain": "Calc BC: Parametric, Polar & Vector Functions",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "title": "Polar area and a tangent",
      "question": "Original targeted practice; this is not a full official exam section. A polar curve is r=2cosθ, with0≤θ≤π/2. No calculator is needed.\n\nA. Set up an integral for the area swept over the stated interval.\nB. Evaluate that area.\nC. Find dy/dx at θ=π/4.",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 3,
          "prompt": "Set up an integral for the area swept over the stated interval.",
          "guidance": "Use the polar area factor1/2 (1); square the radius to4cos²θ (1); use bounds0 andπ/2 (1)."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 3,
          "prompt": "Evaluate that area.",
          "guidance": "Use cos²θ=(1+cos2θ)/2 (1); integrate1+cos2θ over0toπ/2 (1); obtainπ/2 (1)."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 3,
          "prompt": "Find dy/dx at θ=π/4.",
          "guidance": "Use x=2cos²θ,y=2sinθcosθ (1); obtain dx/dθ=−4cosθsinθ and dy/dθ=2cos2θ (1); ratio is0/(−2)=0 (1)."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional rubric, not an official College Board scoring guide. Award each listed point independently for correct mathematics; accept algebraically equivalent forms and valid alternative methods. Do not require model wording. A: Use the polar area factor1/2 (1); square the radius to4cos²θ (1); use bounds0 andπ/2 (1). B: Use cos²θ=(1+cos2θ)/2 (1); integrate1+cos2θ over0toπ/2 (1); obtainπ/2 (1). C: Use x=2cos²θ,y=2sinθcosθ (1); obtain dx/dθ=−4cosθsinθ and dy/dθ=2cos2θ (1); ratio is0/(−2)=0 (1).",
      "explanation": "Show a justified setup and enough work to connect it to the answer. Follow the point-by-point criteria; do not interpret an AI feedback score as an official AP score."
    },
    {
      "id": "calc-bc-frq-10",
      "domain": "Calc BC: Infinite Sequences & Series",
      "difficulty": "Hard",
      "format": "frq",
      "frqType": "free_response",
      "set": 2,
      "title": "A power series and its endpoints",
      "question": "Original targeted practice; this is not a full official exam section. Consider S(x)=∑ from n=1 to∞ of xⁿ/n. No calculator is needed.\n\nA. Find the radius of convergence using a valid test.\nB. Determine the complete interval of convergence.\nC. Bound the error when approximating S(−1) by its first10terms.",
      "criteria": [
        {
          "key": "A",
          "label": "Part A",
          "points": 3,
          "prompt": "Find the radius of convergence using a valid test.",
          "guidance": "Use ratio magnitude |x|·n/(n+1) (1); take limit |x| (1); infer R=1 from |x|<1 (1)."
        },
        {
          "key": "B",
          "label": "Part B",
          "points": 3,
          "prompt": "Determine the complete interval of convergence.",
          "guidance": "At x=1 identify divergent harmonic series (1); at x=−1 apply alternating test with decreasing1/n→0 (1); conclude[−1,1) (1)."
        },
        {
          "key": "C",
          "label": "Part C",
          "points": 3,
          "prompt": "Bound the error when approximating S(−1) by its first10terms.",
          "guidance": "Recognize alternating-series remainder theorem applies (1); next magnitude is1/11 (1); state absolute error≤1/11 (1)."
        }
      ],
      "maxPoints": 9,
      "rubric": "Original instructional rubric, not an official College Board scoring guide. Award each listed point independently for correct mathematics; accept algebraically equivalent forms and valid alternative methods. Do not require model wording. A: Use ratio magnitude |x|·n/(n+1) (1); take limit |x| (1); infer R=1 from |x|<1 (1). B: At x=1 identify divergent harmonic series (1); at x=−1 apply alternating test with decreasing1/n→0 (1); conclude[−1,1) (1). C: Recognize alternating-series remainder theorem applies (1); next magnitude is1/11 (1); state absolute error≤1/11 (1).",
      "explanation": "Show a justified setup and enough work to connect it to the answer. Follow the point-by-point criteria; do not interpret an AI feedback score as an official AP score."
    }
  ],
  "flashcards": [
    {
      "id": "calc-bc-card-1-1",
      "unit": "Calc BC: Limits & Continuity",
      "term": "Limits from expressions and tables — central idea",
      "answer": "A limit describes nearby behavior rather than requiring the function to be defined at the target. A two-sided limit exists only when the left and right limits agree. Evaluate a continuous expression by substitution; when substitution gives 0/0, rewrite the expression on a punctured neighborhood before taking the limit. Factoring and rationalizing preserve nearby values even though the original expression may remain undefined at the target. A table supplies evidence, not a proof that an oscillating or irregular function has a limit."
    },
    {
      "id": "calc-bc-card-1-2",
      "unit": "Calc BC: Limits & Continuity",
      "term": "Limits from expressions and tables — worked method",
      "answer": "For x ≠ 3, (x² − 9)/(x − 3) = x + 3. Hence the limit as x approaches 3 is 6. Assigning a different value to the function at 3 does not alter this limit. For a piecewise function, compute both one-sided limits separately before comparing them."
    },
    {
      "id": "calc-bc-card-1-3",
      "unit": "Calc BC: Limits & Continuity",
      "term": "Limits from expressions and tables — common error",
      "answer": "Do not interpret 0/0 as zero or as a final answer. It signals that direct substitution has not resolved the limit. A function value and a nearby limiting value answer different questions."
    },
    {
      "id": "calc-bc-card-1-4",
      "unit": "Calc BC: Limits & Continuity",
      "term": "Limits from expressions and tables — check",
      "answer": "Factor x²−9=(x−3)(x+3). Nearby values equal x+3, which approaches6."
    },
    {
      "id": "calc-bc-card-2-1",
      "unit": "Calc BC: Limits & Continuity",
      "term": "Continuity and the Intermediate Value Theorem — central idea",
      "answer": "Continuity at c requires f(c) to exist, the limit at c to exist, and those values to agree. A removable discontinuity can be repaired by changing a point value. A jump cannot be repaired by changing only that point. The Intermediate Value Theorem requires continuity on the entire closed interval; if a target lies between the endpoint values, the theorem guarantees at least one location attaining the target. It does not establish uniqueness or locate the point exactly."
    },
    {
      "id": "calc-bc-card-2-2",
      "unit": "Calc BC: Limits & Continuity",
      "term": "Continuity and the Intermediate Value Theorem — worked method",
      "answer": "Let f(x)=x³+x−1 on [0,1]. The polynomial is continuous, f(0)=−1 and f(1)=1. Since0 lies between −1 and1, IVT guarantees a root in(0,1). The conclusion comes from continuity plus the endpoint comparison, not merely from drawing a plausible curve."
    },
    {
      "id": "calc-bc-card-2-3",
      "unit": "Calc BC: Limits & Continuity",
      "term": "Continuity and the Intermediate Value Theorem — common error",
      "answer": "A sign change without continuity is insufficient:1/x changes sign across0 but never equals0. State the hypothesis before invoking the theorem."
    },
    {
      "id": "calc-bc-card-2-4",
      "unit": "Calc BC: Limits & Continuity",
      "term": "Continuity and the Intermediate Value Theorem — check",
      "answer": "The nearby expression equals x+2, whose limit at2 is4."
    },
    {
      "id": "calc-bc-card-3-1",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Derivative as a limit and a rate — central idea",
      "answer": "The derivative f′(a) is the limit of the difference quotient [f(a+h)−f(a)]/h as h approaches0, when that finite limit exists. It is the tangent slope and instantaneous rate of change. Its units are output units per input unit. Differentiability implies continuity, but continuity does not imply differentiability: a corner can join continuously while its one-sided slopes disagree. Distinguish the derivative at a point from the derivative function."
    },
    {
      "id": "calc-bc-card-3-2",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Derivative as a limit and a rate — worked method",
      "answer": "For f(x)=x², [f(a+h)−f(a)]/h=2a+h when h≠0, so f′(a)=2a. At a=3, the tangent slope is6. If x is seconds and f is meters, this derivative is6meters per second. For |x| at0, the slopes from opposite sides are−1 and1, so no derivative exists."
    },
    {
      "id": "calc-bc-card-3-3",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Derivative as a limit and a rate — common error",
      "answer": "Cancel h only after expanding the numerator. The derivative is a limiting slope, not the quotient f(a)/a."
    },
    {
      "id": "calc-bc-card-3-4",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Derivative as a limit and a rate — check",
      "answer": "The difference quotient compares f near2 with f(2), then divides by the change h."
    },
    {
      "id": "calc-bc-card-4-1",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Power, product and quotient rules — central idea",
      "answer": "The power rule gives d(xⁿ)/dx=nxⁿ⁻¹ wherever the expression is differentiable. Derivatives are linear: constants factor out, sums differentiate term by term, and constants alone have derivative0. Products require f′g+fg′; a quotient requires (f′g−fg′)/g² where g≠0. The basic rules describe local changes, so all domain restrictions still matter. An algebraically simplified form can make a derivative easier to verify."
    },
    {
      "id": "calc-bc-card-4-2",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Power, product and quotient rules — worked method",
      "answer": "For y=(x²+1)eˣ, product rule gives y′=2xeˣ+(x²+1)eˣ=eˣ(x²+2x+1). For y=x/(x+1), quotient rule gives [(x+1)−x]/(x+1)²=1/(x+1)², valid only when x≠−1."
    },
    {
      "id": "calc-bc-card-4-3",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Power, product and quotient rules — common error",
      "answer": "The derivative of a product is not the product of derivatives. Keep the order in the quotient numerator consistent before simplifying."
    },
    {
      "id": "calc-bc-card-4-4",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Power, product and quotient rules — check",
      "answer": "Differentiate each term:3x²,−4,0."
    },
    {
      "id": "calc-bc-card-5-1",
      "unit": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "term": "Chain rule and inverse functions — central idea",
      "answer": "The chain rule differentiates a composition by multiplying the outer derivative evaluated at the inner function by the inner derivative. For an invertible differentiable function with f′(a)≠0, the inverse derivative at f(a) is1/f′(a). Logs and inverse trig functions require attention to domains. Write the nested structure before differentiating so a missing inner derivative is easy to detect."
    },
    {
      "id": "calc-bc-card-5-2",
      "unit": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "term": "Chain rule and inverse functions — worked method",
      "answer": "For y=sin(x²), the outer derivative is cos(x²) and the inner derivative is2x, giving2xcos(x²). If f(2)=5 and f′(2)=3, then (f⁻¹)′(5)=1/3. The inverse derivative is evaluated at the output5, not at the original input2."
    },
    {
      "id": "calc-bc-card-5-3",
      "unit": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "term": "Chain rule and inverse functions — common error",
      "answer": "Reciprocal function1/f and inverse function f⁻¹ are different. Chain rule factors multiply; they are not added."
    },
    {
      "id": "calc-bc-card-5-4",
      "unit": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "term": "Chain rule and inverse functions — check",
      "answer": "Multiply the outer derivative4(3x+1)³ by inner derivative3."
    },
    {
      "id": "calc-bc-card-6-1",
      "unit": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "term": "Implicit differentiation — central idea",
      "answer": "When x and y are related implicitly, differentiate both sides with respect to x while treating y as a function of x. Every differentiated y-expression needs the chain rule factor y′. Collect terms containing y′ and solve algebraically. A resulting quotient describes a tangent slope only where its denominator is nonzero and the point actually belongs to the original curve. Implicit relations can contain vertical tangents or multiple branches."
    },
    {
      "id": "calc-bc-card-6-2",
      "unit": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "term": "Implicit differentiation — worked method",
      "answer": "For x²+y²=25, differentiating yields2x+2yy′=0, so y′=−x/y when y≠0. At(3,4), the slope is−3/4. At(5,0), this quotient is undefined; the circle has a vertical tangent there rather than a finite slope. Verify a proposed point by substitution before calculating."
    },
    {
      "id": "calc-bc-card-6-3",
      "unit": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "term": "Implicit differentiation — common error",
      "answer": "Do not differentiate y² as2y without y′. A zero denominator alone is not a complete classification of every implicit curve."
    },
    {
      "id": "calc-bc-card-6-4",
      "unit": "Calc BC: Differentiation: Composite, Implicit & Inverse Functions",
      "term": "Implicit differentiation — check",
      "answer": "Implicit differentiation gives y′=−x/y; substitute3 and4."
    },
    {
      "id": "calc-bc-card-7-1",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "Motion: position, velocity and acceleration — central idea",
      "answer": "Velocity is the derivative of position and acceleration is the derivative of velocity. Speed is the nonnegative magnitude |v|. A particle moves right when v>0 and left when v<0. It speeds up when velocity and acceleration have the same sign and slows down when their signs differ. A zero velocity is only a candidate for a direction change; inspect the sign on each side. Interpret a derivative using the units and quantity in the question."
    },
    {
      "id": "calc-bc-card-7-2",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "Motion: position, velocity and acceleration — worked method",
      "answer": "Suppose v(t)=t−2 and a(t)=1. At t=1, velocity is−1, so motion is leftward; acceleration is positive, so speed is decreasing. At t=3, both are positive and speed increases. At t=2, velocity changes from negative to positive, so the particle reverses direction."
    },
    {
      "id": "calc-bc-card-7-3",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "Motion: position, velocity and acceleration — common error",
      "answer": "Positive acceleration does not automatically mean speeding up. Signed velocity and nonnegative speed are different quantities."
    },
    {
      "id": "calc-bc-card-7-4",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "Motion: position, velocity and acceleration — check",
      "answer": "Opposite signs of velocity and acceleration imply decreasing speed; negative velocity means leftward motion."
    },
    {
      "id": "calc-bc-card-8-1",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "Related rates and linear approximation — central idea",
      "answer": "Related-rate problems connect quantities through an equation and then differentiate with respect to time. Substitute instant-specific values after differentiation, because the quantities change over time. A linear approximation L(x)=f(a)+f′(a)(x−a) uses a nearby known point to estimate a function. A tangent approximation is local, and concavity determines whether it lies above or below the curve."
    },
    {
      "id": "calc-bc-card-8-2",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "Related rates and linear approximation — worked method",
      "answer": "For a circle A=πr², dA/dt=2πr dr/dt. If r=3cm and dr/dt=2cm/s, the area increases at12πcm²/s. Separately, linearizing √x at x=4 gives L(x)=2+(x−4)/4, so √4.1≈2.025. Since √x is concave down for positive x, the tangent estimate is an overestimate."
    },
    {
      "id": "calc-bc-card-8-3",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "Related rates and linear approximation — common error",
      "answer": "Do not set a changing radius equal to its current number before differentiating. Include squared units for area rates."
    },
    {
      "id": "calc-bc-card-8-4",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "Related rates and linear approximation — check",
      "answer": "Differentiate A=πr²: A′=2πrr′=2π(3)(2)=12π."
    },
    {
      "id": "calc-bc-card-9-1",
      "unit": "Calc BC: Analytical Applications of Differentiation",
      "term": "Mean Value Theorem and extrema — central idea",
      "answer": "The Mean Value Theorem requires continuity on[a,b] and differentiability on(a,b). It guarantees a point where the derivative equals the average rate over the interval. Critical numbers occur where the derivative is zero or undefined while the function is defined. To find absolute extrema on a closed interval for a continuous function, compare the function values at all critical numbers in the interval and both endpoints. An equation alone does not supply the required theorem hypotheses."
    },
    {
      "id": "calc-bc-card-9-2",
      "unit": "Calc BC: Analytical Applications of Differentiation",
      "term": "Mean Value Theorem and extrema — worked method",
      "answer": "For f(x)=x² on[1,3], the average slope is(9−1)/2=4. Since f′(x)=2x, the MVT point is c=2. For f(x)=x²−4x on[0,5], the critical point is x=2. Compare f(0)=0,f(2)=−4,f(5)=5: the absolute minimum is−4 and maximum5."
    },
    {
      "id": "calc-bc-card-9-3",
      "unit": "Calc BC: Analytical Applications of Differentiation",
      "term": "Mean Value Theorem and extrema — common error",
      "answer": "A local extremum need not be absolute. Endpoints are essential in a closed-interval comparison even when their derivatives are not zero."
    },
    {
      "id": "calc-bc-card-9-4",
      "unit": "Calc BC: Analytical Applications of Differentiation",
      "term": "Mean Value Theorem and extrema — check",
      "answer": "The secant slope is4 and f′(c)=2c=4 at c=2."
    },
    {
      "id": "calc-bc-card-10-1",
      "unit": "Calc BC: Analytical Applications of Differentiation",
      "term": "Derivative signs, concavity and optimization — central idea",
      "answer": "A positive derivative makes a differentiable function increase on an interval, while a negative derivative makes it decrease. A derivative changing from positive to negative supports a local maximum; the reverse supports a minimum. Concavity depends on the second derivative: positive means concave up and negative means concave down. An inflection point requires a concavity change, not merely a zero second derivative. In optimization, define the objective, use the constraint to reduce variables, and compare relevant candidates within the feasible domain."
    },
    {
      "id": "calc-bc-card-10-2",
      "unit": "Calc BC: Analytical Applications of Differentiation",
      "term": "Derivative signs, concavity and optimization — worked method",
      "answer": "For f(x)=x³−3x, f′=3(x−1)(x+1). Its signs are positive, negative, positive across−1 and1, so f has a local maximum at−1 and a local minimum at1. Also f″=6x changes sign at0, giving an inflection point. A rectangle with fixed perimeter20 has area x(10−x), maximized at x=5."
    },
    {
      "id": "calc-bc-card-10-3",
      "unit": "Calc BC: Analytical Applications of Differentiation",
      "term": "Derivative signs, concavity and optimization — common error",
      "answer": "Do not use f″=0 alone as proof of inflection; x⁴ has f″(0)=0 but no concavity change. A physical constraint can exclude algebraic candidates."
    },
    {
      "id": "calc-bc-card-10-4",
      "unit": "Calc BC: Analytical Applications of Differentiation",
      "term": "Derivative signs, concavity and optimization — check",
      "answer": "The factors have opposite signs between1 and3, making the derivative negative."
    },
    {
      "id": "calc-bc-card-11-1",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Riemann sums and numerical accumulation — central idea",
      "answer": "A definite integral is the limit of Riemann sums for an integrable function. Each rectangle contributes a height times an interval width. Left, right and midpoint sums differ in their sample points; the trapezoidal rule averages endpoint heights on each subinterval. Units multiply: a rate in liters per minute integrated over minutes gives liters. Overestimate or underestimate conclusions depend on monotonicity for left/right sums and concavity for midpoint/trapezoid rules."
    },
    {
      "id": "calc-bc-card-11-2",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Riemann sums and numerical accumulation — worked method",
      "answer": "At times 0, 2, 4, a rate has values 1, 3, 5. Two width-2 left rectangles give 2(1+3)=8, while right rectangles give 2(3+5)=16. The trapezoidal estimate is 2[(1+3)/2+(3+5)/2]=12. These are estimates unless additional information, such as linearity on each interval, makes a rule exact."
    },
    {
      "id": "calc-bc-card-11-3",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Riemann sums and numerical accumulation — common error",
      "answer": "Do not add heights without multiplying widths. Unevenly spaced tables require each subinterval’s own width."
    },
    {
      "id": "calc-bc-card-11-4",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Riemann sums and numerical accumulation — check",
      "answer": "Width1 times the left heights2+4 gives6."
    },
    {
      "id": "calc-bc-card-12-1",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Fundamental Theorem and substitution — central idea",
      "answer": "The Fundamental Theorem connects accumulation to differentiation: if f is continuous, the derivative of F(x)=∫ from a to x f(t)dt is f(x). A variable upper bound adds a chain-rule factor. Definite integrals can be evaluated by antiderivatives as F(b)−F(a). Substitution reverses chain rule; change the bounds to the new variable or convert the antiderivative back before using the original bounds. An indefinite integral needs a constant of integration."
    },
    {
      "id": "calc-bc-card-12-2",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Fundamental Theorem and substitution — worked method",
      "answer": "If G(x)=∫ from 1 to x² cos t dt, then G′(x)=2x cos(x²). For ∫ from 0 to 1 of 2x cos(x²) dx, substitute u=x²,du = 2x dx, and new bounds 0 and 1. The result is sin1. Radians are understood in trigonometric differentiation and integration."
    },
    {
      "id": "calc-bc-card-12-3",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Fundamental Theorem and substitution — common error",
      "answer": "Do not drop the inner derivative for a variable bound. Do not apply original x-bounds to an antiderivative expressed in u."
    },
    {
      "id": "calc-bc-card-12-4",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Fundamental Theorem and substitution — check",
      "answer": "FTC gives e^(x²) and chain rule multiplies by2x."
    },
    {
      "id": "calc-bc-card-13-1",
      "unit": "Calc BC: Differential Equations",
      "term": "Slope fields and separable equations — central idea",
      "answer": "A differential equation specifies a derivative relation rather than a single function. A slope field records local slopes at points and helps compare possible solution curves. A separable equation can be rearranged so each side contains one variable and then integrated. Division can lose equilibrium solutions, so check constant solutions in the original equation. An initial condition selects a particular solution on an interval where it is defined."
    },
    {
      "id": "calc-bc-card-13-2",
      "unit": "Calc BC: Differential Equations",
      "term": "Slope fields and separable equations — worked method",
      "answer": "For y′=2xy with y(0)=3, divide by y on a nonzero solution:dy/y=2xdx. Integrating gives ln|y|=x²+C, hence y=Ce^(x²). The initial condition gives C=3. The original equation also has equilibrium y=0, which would be lost by careless division by y."
    },
    {
      "id": "calc-bc-card-13-3",
      "unit": "Calc BC: Differential Equations",
      "term": "Slope fields and separable equations — common error",
      "answer": "An initial value chooses a solution, not a new differential equation. Verify both derivative relation and initial condition."
    },
    {
      "id": "calc-bc-card-13-4",
      "unit": "Calc BC: Differential Equations",
      "term": "Slope fields and separable equations — check",
      "answer": "Separate and integrate to get y=Ce^(x²); y(0)=3 fixes C=3."
    },
    {
      "id": "calc-bc-card-14-1",
      "unit": "Calc BC: Differential Equations",
      "term": "Exponential models and Euler approximation — central idea",
      "answer": "A quantity with growth rate proportional to its amount satisfies y′=ky and has solution y=Ce^(kt). Positive k gives growth and negative k gives decay. Euler’s method approximates a solution by repeatedly using the current point’s tangent slope: y_next=y_current+step·f(x_current,y_current). Recompute the slope after every step. It is a numerical approximation, not an exact solution, and its error depends on the equation, step size and interval."
    },
    {
      "id": "calc-bc-card-14-2",
      "unit": "Calc BC: Differential Equations",
      "term": "Exponential models and Euler approximation — worked method",
      "answer": "For y′=y with y(0)=1 and step 0.5, the first Euler step gives 1+0.5(1)=1.5 at x=0.5. The next slope is 1.5, giving 1.5+0.5(1.5)=2.25 at x=1. The exact value e is larger. A half-life model satisfies e^(kH)=1/2, so k=−ln2/H."
    },
    {
      "id": "calc-bc-card-14-3",
      "unit": "Calc BC: Differential Equations",
      "term": "Exponential models and Euler approximation — common error",
      "answer": "Do not reuse the original slope in every Euler step. A decay constant written in y′=ky must be negative."
    },
    {
      "id": "calc-bc-card-14-4",
      "unit": "Calc BC: Differential Equations",
      "term": "Exponential models and Euler approximation — check",
      "answer": "Two tangent steps give1.5 then2.25."
    },
    {
      "id": "calc-bc-card-15-1",
      "unit": "Calc BC: Applications of Integration",
      "term": "Area and average value — central idea",
      "answer": "The integral of a signed function gives net signed area. Geometric area requires nonnegative heights, so split at sign changes or integrate an absolute value. Area between curves integrates top minus bottom with respect to x, or right minus left with respect to y. The average value of an integrable function on[a,b] is (1/(b−a))∫ f; it is not generally the average of endpoint values. Sketch or use a sign analysis to identify the correct bounds and ordering."
    },
    {
      "id": "calc-bc-card-15-2",
      "unit": "Calc BC: Applications of Integration",
      "term": "Area and average value — worked method",
      "answer": "Between y=x and y=x² on[0,1], the line lies above the parabola. The area is∫₀¹(x−x²)dx=1/2−1/3=1/6. For f(x)=x² on[0,3], average value is(1/3)[x³/3]₀³=3. An average rate integrated across a time interval reproduces the total change."
    },
    {
      "id": "calc-bc-card-15-3",
      "unit": "Calc BC: Applications of Integration",
      "term": "Area and average value — common error",
      "answer": "If curves cross inside an interval, one unsplit top-minus-bottom expression can cancel areas. Average value has the same units as f."
    },
    {
      "id": "calc-bc-card-15-4",
      "unit": "Calc BC: Applications of Integration",
      "term": "Area and average value — check",
      "answer": "Integrate top−bottom:x−x²; the result is1/6."
    },
    {
      "id": "calc-bc-card-16-1",
      "unit": "Calc BC: Applications of Integration",
      "term": "Volume, displacement and distance — central idea",
      "answer": "Volume by cross sections integrates cross-sectional area along an axis. A disk area isπR²; a washer area isπ(R²−r²). Radii are distances from the axis of rotation and can require subtracting a shifted axis. A velocity integral gives displacement, while integrating |velocity| gives total distance traveled. Position requires adding initial position to accumulated velocity. These distinctions apply even when the same graph supplies all the information."
    },
    {
      "id": "calc-bc-card-16-2",
      "unit": "Calc BC: Applications of Integration",
      "term": "Volume, displacement and distance — worked method",
      "answer": "Revolving the region under y=x on[0,2] about the x-axis gives volumeπ∫₀²x²dx=8π/3. If v(t)=t−1 on[0,2], displacement is0, but total distance is the sum of two triangle areas,1. Opposite directions cancel in displacement but cannot cancel in distance."
    },
    {
      "id": "calc-bc-card-16-3",
      "unit": "Calc BC: Applications of Integration",
      "term": "Volume, displacement and distance — common error",
      "answer": "Squaring the difference of radii is not the washer formula. Distance is never negative."
    },
    {
      "id": "calc-bc-card-16-4",
      "unit": "Calc BC: Applications of Integration",
      "term": "Volume, displacement and distance — check",
      "answer": "Disk radius is x, so V=π∫₀²x²dx=8π/3."
    },
    {
      "id": "calc-bc-card-17-1",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Integration by parts and partial fractions — central idea",
      "answer": "Integration by parts reverses product rule:∫u dv=uv−∫v du. Choose u so differentiation simplifies it and dv so integration is feasible. For rational functions, polynomial division and partial fraction decomposition can turn an integral into basic pieces. The numerator coefficients must satisfy an algebraic identity, and logarithmic antiderivatives need absolute values on appropriate real domains."
    },
    {
      "id": "calc-bc-card-17-2",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Integration by parts and partial fractions — worked method",
      "answer": "For∫xeˣdx, choose u=x,dv=eˣdx. Then du=dx,v=eˣ, giving xeˣ−eˣ+C. Also1/[x(x+1)]=1/x−1/(x+1), so an antiderivative is ln|x|−ln|x+1|+C on intervals excluding0 and−1."
    },
    {
      "id": "calc-bc-card-17-3",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Integration by parts and partial fractions — common error",
      "answer": "Do not change a definite integration bound without changing its variable consistently. Verify a decomposition by recombining fractions."
    },
    {
      "id": "calc-bc-card-17-4",
      "unit": "Calc BC: Integration & Accumulation of Change",
      "term": "Integration by parts and partial fractions — check",
      "answer": "Integration by parts gives xeˣ−∫eˣdx=eˣ(x−1)+C."
    },
    {
      "id": "calc-bc-card-18-1",
      "unit": "Calc BC: Differential Equations",
      "term": "Logistic growth — central idea",
      "answer": "Logistic growth models limited growth through y′=ky(1−y/L) with k>0 and carrying capacity L>0. Equilibrium solutions are0 and L. For0<y<L, growth is positive and largest at y=L/2 because the rate as a function of y is a downward-opening quadratic. A non-equilibrium solution can be written L/(1+Ae^(−kx)); an initial condition determines A. Interpret an equilibrium as a mathematical model prediction rather than a universal biological law."
    },
    {
      "id": "calc-bc-card-18-2",
      "unit": "Calc BC: Differential Equations",
      "term": "Logistic growth — worked method",
      "answer": "With y′=0.2y(1−y/100), the carrying capacity is100. At y=50, the rate is0.2·50·0.5=5. At y=20 it is3.2, so being farther from capacity does not automatically mean a larger absolute growth rate."
    },
    {
      "id": "calc-bc-card-18-3",
      "unit": "Calc BC: Differential Equations",
      "term": "Logistic growth — common error",
      "answer": "The coefficient k is not the carrying capacity. Exponential growth is a useful early approximation, not the complete logistic model."
    },
    {
      "id": "calc-bc-card-18-4",
      "unit": "Calc BC: Differential Equations",
      "term": "Logistic growth — check",
      "answer": "The quadratic rate is maximized halfway between the equilibria0 and100."
    },
    {
      "id": "calc-bc-card-19-1",
      "unit": "Calc BC: Applications of Integration",
      "term": "Improper integrals and arc length — central idea",
      "answer": "An improper integral has an unbounded interval or an unbounded integrand and must be defined by limits. Compute the relevant proper integrals first, then determine whether the limiting value is finite. A visually shrinking integrand need not have finite total area. For a smooth graph y=f(x), arc length on[a,b] is∫√(1+[f′(x)]²)dx. This measures length along the curve, not signed area below it."
    },
    {
      "id": "calc-bc-card-19-2",
      "unit": "Calc BC: Applications of Integration",
      "term": "Improper integrals and arc length — worked method",
      "answer": "The integral∫₁∞1/x²dx equals lim b→∞(1−1/b)=1, while∫₁∞1/x dx diverges because ln b grows without bound. For the line y=3x on[0,2], arc length is∫₀²√10 dx=2√10, matching the distance formula."
    },
    {
      "id": "calc-bc-card-19-3",
      "unit": "Calc BC: Applications of Integration",
      "term": "Improper integrals and arc length — common error",
      "answer": "The symbol infinity is not a number to substitute into an antiderivative. If a singularity lies inside an interval, both one-sided improper integrals must converge."
    },
    {
      "id": "calc-bc-card-19-4",
      "unit": "Calc BC: Applications of Integration",
      "term": "Improper integrals and arc length — check",
      "answer": "The antiderivative is−1/x and the limit is 1."
    },
    {
      "id": "calc-bc-card-20-1",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Parametric derivatives — central idea",
      "answer": "A parameter can describe both coordinates of a curve. Where dx/dt≠0, dy/dx=(dy/dt)/(dx/dt). The second derivative with respect to x is the t-derivative of this quotient divided again by dx/dt. A zero numerator can indicate a horizontal tangent only if the denominator is nonzero. A zero denominator can indicate a vertical tangent when the numerator is nonzero. Check special points separately rather than cancelling away all restrictions."
    },
    {
      "id": "calc-bc-card-20-2",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Parametric derivatives — worked method",
      "answer": "For x=t²,y=t³ and t≠0, dy/dx=3t/2. Differentiate that with respect to t and divide by2t to get d²y/dx²=3/(4t). At t=1, the first derivative is3/2 and the second3/4. The derivative with respect to t is not itself the second derivative with respect to x."
    },
    {
      "id": "calc-bc-card-20-3",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Parametric derivatives — common error",
      "answer": "Use the same parameter value in both coordinate derivatives. Squaring a slope is not a second derivative."
    },
    {
      "id": "calc-bc-card-20-4",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Parametric derivatives — check",
      "answer": "The ratio3t²/(2t)=3t/2 equals3 at2."
    },
    {
      "id": "calc-bc-card-21-1",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Vector motion and distance — central idea",
      "answer": "A planar position vector r(t)=〈x(t),y(t)〉 has velocity〈x′,y′〉 and acceleration〈x″,y″〉. Speed is the magnitude√((x′)²+(y′)²). Total distance is the integral of speed; displacement is the vector difference of positions. Direction and distance require both coordinate components. A component can be negative without making speed negative. Vector initial conditions are applied separately to each coordinate."
    },
    {
      "id": "calc-bc-card-21-2",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Vector motion and distance — worked method",
      "answer": "For r(t)=〈3t,4t〉, velocity is〈3,4〉 and speed is5. Over0≤t≤2, distance is10 and displacement is〈6,8〉. Their magnitudes happen to agree for this straight motion, but they need not agree when a path changes direction."
    },
    {
      "id": "calc-bc-card-21-3",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Vector motion and distance — common error",
      "answer": "Do not add component velocities to calculate speed. Net displacement can be zero even after nonzero travel."
    },
    {
      "id": "calc-bc-card-21-4",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Vector motion and distance — check",
      "answer": "The magnitude is√(9+16)=5."
    },
    {
      "id": "calc-bc-card-22-1",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Polar area and slope — central idea",
      "answer": "Polar coordinates describe a point by radius and angle: x=r cosθ,y=r sinθ. Area swept from α to β is(1/2)∫r²dθ when the interval traces the intended region once. For two polar curves, subtract squared radii only after identifying which radius is outer on each interval. A polar tangent slope is (r′sinθ+r cosθ)/(r′cosθ−r sinθ), where the denominator is nonzero."
    },
    {
      "id": "calc-bc-card-22-2",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Polar area and slope — worked method",
      "answer": "For r=2 on0≤θ≤π/2, area is(1/2)·4·π/2=π. It is one quarter of a radius2 circle. A full trace of r=2 takes an angular interval of length2π. Counting a retraced interval again would double-count area."
    },
    {
      "id": "calc-bc-card-22-3",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Polar area and slope — common error",
      "answer": "The polar area formula contains r² and1/2. Do not integrate r alone or assume every named interval traces a loop exactly once."
    },
    {
      "id": "calc-bc-card-22-4",
      "unit": "Calc BC: Parametric, Polar & Vector Functions",
      "term": "Polar area and slope — check",
      "answer": "One half times the integral of4 over an interval of lengthπ/2 isπ."
    },
    {
      "id": "calc-bc-card-23-1",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Sequences, series and convergence tests — central idea",
      "answer": "A sequence is a list of terms; a series is a sum studied through its partial sums. If terms of a series do not approach0, the series diverges. Terms approaching0 are necessary but insufficient for convergence. A geometric series∑arⁿ from n=0 converges to a/(1−r) when |r|<1. A p-series∑1/nᵖ converges exactly when p>1. Comparison tests require appropriate nonnegative terms and valid inequalities."
    },
    {
      "id": "calc-bc-card-23-2",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Sequences, series and convergence tests — worked method",
      "answer": "The harmonic series∑1/n diverges even though1/n→0. By contrast∑1/n² converges as a p-series with p=2. The geometric series3+3/2+3/4+⋯ has first term3 and ratio1/2, hence sum6. State the test and check its conditions rather than naming a conclusion alone."
    },
    {
      "id": "calc-bc-card-23-3",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Sequences, series and convergence tests — common error",
      "answer": "The nth-term test cannot prove convergence when its limit is0. An alternating sign alone does not establish absolute convergence."
    },
    {
      "id": "calc-bc-card-23-4",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Sequences, series and convergence tests — check",
      "answer": "The ratio is1/2, so the sum is3/(1−1/2)=6."
    },
    {
      "id": "calc-bc-card-24-1",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Ratio test, endpoints and alternating error — central idea",
      "answer": "The ratio test uses L=lim|aₙ₊₁/aₙ|. If L<1 there is absolute convergence, if L>1 divergence, and if L=1 the test is inconclusive. For a power series it typically identifies an open interval; test endpoints independently. An alternating series with decreasing positive term magnitudes tending to0 converges, and the truncation error is at most the next omitted magnitude. Conditional convergence means convergence without absolute convergence."
    },
    {
      "id": "calc-bc-card-24-2",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Ratio test, endpoints and alternating error — worked method",
      "answer": "For∑xⁿ/n from n=1, ratio test gives |x|<1. At x=1 the harmonic series diverges; at x=−1 the alternating harmonic series converges. Thus the interval is[−1,1). For an alternating partial sum with next omitted magnitude1/101, the error bound is1/101 when the alternating-test conditions hold."
    },
    {
      "id": "calc-bc-card-24-3",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Ratio test, endpoints and alternating error — common error",
      "answer": "A radius of convergence does not decide either endpoint. The ratio-test value1 does not mean divergence."
    },
    {
      "id": "calc-bc-card-24-4",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Ratio test, endpoints and alternating error — check",
      "answer": "The negative endpoint is alternating harmonic and converges; the positive endpoint is harmonic and diverges."
    },
    {
      "id": "calc-bc-card-25-1",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Taylor polynomials and error bounds — central idea",
      "answer": "The Taylor polynomial about a uses coefficients f⁽ⁿ⁾(a)/n! multiplying(x−a)ⁿ. A Maclaurin polynomial is centered at 0. Familiar series can be differentiated, integrated or substituted within their convergence intervals. A Taylor approximation must be accompanied by an error argument when accuracy is requested. Lagrange error uses an upper bound M for the next derivative between the center and evaluation point: |Rₙ(x)|≤M|x−a|ⁿ⁺¹/(n+1)!."
    },
    {
      "id": "calc-bc-card-25-2",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Taylor polynomials and error bounds — worked method",
      "answer": "The quadratic Maclaurin polynomial for eˣ is 1+x+x²/2. At x=0.1 it gives 1.105. On [0,0.1], the third derivative eˣ is at most e^0.1, so the error is at most e^0.1(0.1)³/6. The small x factor helps, but a numerical polynomial value alone does not certify an error bound."
    },
    {
      "id": "calc-bc-card-25-3",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Taylor polynomials and error bounds — common error",
      "answer": "Do not omit factorials. The derivative bound must hold over the entire segment, not only at the center."
    },
    {
      "id": "calc-bc-card-25-4",
      "unit": "Calc BC: Infinite Sequences & Series",
      "term": "Taylor polynomials and error bounds — check",
      "answer": "All derivatives at0 equal1 and the quadratic coefficient is1/2!."
    },
    {
      "id": "calc-bc-card-26-1",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Trigonometric, exponential and logarithmic derivatives — central idea",
      "answer": "The basic trigonometric derivatives use radians: the derivative of sin x is cos x and the derivative of cos x is −sin x. The derivative of eˣ is itself, while the derivative of ln x is 1/x for x>0. For a positive base b≠1, the derivative of bˣ is bˣln b. These formulas combine with product, quotient and chain rules; memorizing a base derivative does not remove an inner derivative. Check the real domain before using a logarithmic expression."
    },
    {
      "id": "calc-bc-card-26-2",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Trigonometric, exponential and logarithmic derivatives — worked method",
      "answer": "For y=ln(x²+1), chain rule gives y′=2x/(x²+1), defined for every real x because x²+1 is positive. For y=e^(3x)cos x, product and chain rules give y′=3e^(3x)cos x−e^(3x)sin x. Factoring e^(3x) makes both contributions visible."
    },
    {
      "id": "calc-bc-card-26-3",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Trigonometric, exponential and logarithmic derivatives — common error",
      "answer": "Do not use degree-mode trig values in calculus formulas derived for radians. The derivative of ln x is not ln x itself, and a logarithmic derivative still needs a chain-rule factor."
    },
    {
      "id": "calc-bc-card-26-4",
      "unit": "Calc BC: Differentiation: Definition & Fundamental Properties",
      "term": "Trigonometric, exponential and logarithmic derivatives — check",
      "answer": "Use1/u times u′ with u=x²+1, giving2x/(x²+1)."
    },
    {
      "id": "calc-bc-card-27-1",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "L’Hôpital’s Rule and indeterminate forms — central idea",
      "answer": "L’Hôpital’s Rule can evaluate certain quotient limits with indeterminate form 0/0 or ∞/∞ by taking the limit of the quotient of derivatives, provided the theorem’s hypotheses hold. Differentiate numerator and denominator separately; this is not the quotient rule for differentiating the entire expression. A form such as 0·∞ or ∞−∞ must first be rewritten as a suitable quotient. Recheck the form if another application is considered. A nonzero number divided by zero is not an indeterminate form that automatically permits the rule."
    },
    {
      "id": "calc-bc-card-27-2",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "L’Hôpital’s Rule and indeterminate forms — worked method",
      "answer": "For lim as x→0 of(eˣ−1)/x, substitution gives 0/0. The derivative quotient is eˣ/1, whose limit is 1. For lim as x→0 of sin x/x, the derivative quotient is cos x/1, also approaching 1. In contrast, lim as x→0 from the right of 1/x is unbounded; differentiating numerator and denominator to get 0 would be an invalid use of the rule."
    },
    {
      "id": "calc-bc-card-27-3",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "L’Hôpital’s Rule and indeterminate forms — common error",
      "answer": "A quotient must meet the appropriate limiting form and differentiability conditions. State why the rule applies before replacing the original quotient with a derivative quotient."
    },
    {
      "id": "calc-bc-card-27-4",
      "unit": "Calc BC: Contextual Applications of Differentiation",
      "term": "L’Hôpital’s Rule and indeterminate forms — check",
      "answer": "It is0/0; L’Hôpital gives lim eˣ=1."
    }
  ],
  "references": [
    {
      "title": "College Board course framework and units",
      "url": "https://apcentral.collegeboard.org/courses/ap-calculus-bc"
    },
    {
      "title": "Current exam format (May2027)",
      "url": "https://apcentral.collegeboard.org/courses/ap-calculus-bc/exam"
    }
  ],
  "examFormat": {
    "effective": "May2027",
    "mcq": {
      "count": 42,
      "minutes": 100,
      "weight": 0.5,
      "parts": [
        {
          "count": 29,
          "minutes": 62,
          "calculator": false
        },
        {
          "count": 13,
          "minutes": 38,
          "calculator": true
        }
      ]
    },
    "frq": {
      "count": 6,
      "minutes": 90,
      "weight": 0.5,
      "parts": [
        {
          "count": 2,
          "minutes": 30,
          "calculator": true
        },
        {
          "count": 4,
          "minutes": 60,
          "calculator": false
        }
      ]
    },
    "note": "Practice banks are instructional, not a complete timed exam form or calibrated AP score conversion."
  }
};
