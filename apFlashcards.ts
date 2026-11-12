// @ts-nocheck
import { AP_EXPANDED_CONTENT } from "./apContent";
// Course-scoped term decks. Expanded courses override their thin seed decks.

import { AP_GOV_VOCAB } from "./apGovVocab";

export const AP_FLASHCARDS = {
  "ap-world-history-modern": [
    { unit: "World Hist: The Global Tapestry", term: "Tribute system", answer: "A political and economic arrangement where subordinate states pay tribute to a dominant state in exchange for protection and trade access" },
    { unit: "World Hist: Networks of Exchange", term: "Silk Roads", answer: "Overland trade routes connecting East Asia to the Mediterranean, exchanging goods, religions, and technology" },
    { unit: "World Hist: Land-Based Empires", term: "Janissaries", answer: "Elite Ottoman infantry units originally composed of enslaved Christian boys converted to Islam" },
    { unit: "World Hist: Transoceanic Interconnections", term: "Columbian Exchange", answer: "The transfer of plants, animals, diseases, and people between the Americas and the rest of the world after 1492" },
    { unit: "World Hist: Revolutions", term: "Enlightenment", answer: "An intellectual movement emphasizing reason, individual rights, and questioning traditional authority" },
    { unit: "World Hist: Consequences of Industrialization", term: "Social Darwinism", answer: "The application of survival of the fittest to human societies, often used to justify imperialism" },
    { unit: "World Hist: Global Conflict", term: "Total war", answer: "Warfare that mobilizes all of a society's resources, blurring the line between soldiers and civilians" },
    { unit: "World Hist: Cold War & Decolonization", term: "Non-Aligned Movement", answer: "A group of states that formally allied with neither the US nor the Soviet Union during the Cold War" },
    { unit: "World Hist: Globalization", term: "Neoliberalism", answer: "An economic philosophy favoring free markets, deregulation, and reduced government intervention" },
  ],
  "ap-us-gov": AP_GOV_VOCAB,
  "ap-psychology": [
    { unit: "Psych: Biological Bases of Behavior", term: "Neuroplasticity", answer: "The brain's ability to reorganize itself by forming new neural connections throughout life" },
    { unit: "Psych: Cognition", term: "Availability heuristic", answer: "Estimating the likelihood of an event based on how easily examples come to mind" },
    { unit: "Psych: Development & Learning", term: "Operant conditioning", answer: "A learning process where behavior is strengthened or weakened by its consequences, such as reinforcement or punishment" },
    { unit: "Psych: Social Psychology & Personality", term: "Fundamental attribution error", answer: "The tendency to overemphasize personality-based explanations for others' behavior while underemphasizing situational factors" },
    { unit: "Psych: Mental & Physical Health", term: "Diathesis-stress model", answer: "The theory that psychological disorders result from a predisposition combined with stress from life experiences" },
  ],
  "ap-precalculus": [
    { unit: "Precalc: Polynomial & Rational Functions", term: "End behavior of a polynomial (leading term)", answer: "As x approaches infinity, the function behaves like its leading term a_n x^n" },
    { unit: "Precalc: Exponential & Logarithmic Functions", term: "Change of base formula", answer: "log_b(x) = ln(x) / ln(b)" },
    { unit: "Precalc: Trigonometric & Polar Functions", term: "Pythagorean identity", answer: "sin^2(theta) + cos^2(theta) = 1" },
    { unit: "Precalc: Functions Involving Parameters, Vectors & Matrices", term: "Determinant of a 2x2 matrix", answer: "For [[a,b],[c,d]], the determinant is ad - bc" },
  ],
  "ap-us-history": [
    { unit: "APUSH: 1491–1607", term: "Columbian Exchange", answer: "The widespread transfer of plants, animals, diseases, and people between the Old World and New World" },
    { unit: "APUSH: 1607–1754", term: "Triangular trade", answer: "The transatlantic trade network exchanging goods, enslaved people, and raw materials among Europe, Africa, and the Americas" },
    { unit: "APUSH: 1754–1800", term: "Federalism", answer: "A system dividing power between a national government and state governments, established by the Constitution" },
    { unit: "APUSH: 1800–1848", term: "Manifest Destiny", answer: "The belief that American expansion across the continent was justified and inevitable" },
    { unit: "APUSH: 1844–1877", term: "Reconstruction", answer: "The post-Civil War period focused on rebuilding the South and integrating formerly enslaved people into society" },
    { unit: "APUSH: 1865–1898", term: "Gilded Age", answer: "A late-19th-century era of rapid industrial growth alongside significant social and economic inequality" },
    { unit: "APUSH: 1890–1945", term: "New Deal", answer: "Franklin Roosevelt's set of programs and reforms responding to the Great Depression" },
    { unit: "APUSH: 1945–1980", term: "Containment", answer: "The US Cold War strategy of preventing the spread of communism to new countries" },
    { unit: "APUSH: 1980–Present", term: "Globalization", answer: "The increasing economic, cultural, and political interconnection of countries around the world" },
  ],
  "ap-environmental-science": [
    { unit: "APES: The Living World: Ecosystems", term: "Trophic level", answer: "A position in a food chain, such as producer, primary consumer, or secondary consumer" },
    { unit: "APES: The Living World: Biodiversity", term: "Keystone species", answer: "A species that has a disproportionately large effect on its ecosystem relative to its abundance" },
    { unit: "APES: Populations", term: "Carrying capacity", answer: "The maximum population size an environment can sustain indefinitely given its resources" },
    { unit: "APES: Earth Systems & Resources", term: "Biogeochemical cycle", answer: "The pathway by which a chemical element or compound moves through Earth's biotic and abiotic components" },
    { unit: "APES: Land & Water Use", term: "Sustainable yield", answer: "The amount of a renewable resource that can be harvested without reducing its future availability" },
    { unit: "APES: Energy Resources & Consumption", term: "Levelized cost of energy", answer: "The average total cost of building and operating an energy-producing asset over its lifetime, per unit of electricity" },
    { unit: "APES: Atmospheric Pollution", term: "Photochemical smog", answer: "Air pollution formed when sunlight reacts with pollutants like nitrogen oxides and volatile organic compounds" },
    { unit: "APES: Aquatic & Terrestrial Pollution", term: "Eutrophication", answer: "Excessive nutrient enrichment of a body of water causing algal blooms and oxygen depletion" },
    { unit: "APES: Global Change", term: "Albedo", answer: "The measure of how much sunlight a surface reflects rather than absorbs" },
  ],
  "ap-english-lang": [
    { unit: "AP Lang: Rhetorical Situation: Reading", term: "Rhetorical situation", answer: "The context of a communication, including the speaker, audience, purpose, and occasion" },
    { unit: "AP Lang: Rhetorical Situation: Writing", term: "Exigence", answer: "The issue or problem that motivates a writer to create a piece of communication" },
    { unit: "AP Lang: Claims & Evidence: Reading", term: "Logos", answer: "An appeal to logic and reason using facts, evidence, and structured argument" },
    { unit: "AP Lang: Claims & Evidence: Writing", term: "Counterargument", answer: "An opposing viewpoint that a writer acknowledges and addresses to strengthen their own argument" },
    { unit: "AP Lang: Reasoning & Organization", term: "Syllogism", answer: "A form of logical reasoning where a conclusion is drawn from two given or assumed premises" },
    { unit: "AP Lang: Style", term: "Syntax", answer: "The arrangement of words and phrases to create well-formed sentences, used deliberately for rhetorical effect" },
  ],
  "ap-calculus-ab": [
    { unit: "Calc AB: Limits & Continuity", term: "Definition of continuity at a point", answer: "f is continuous at x=a if the limit of f(x) as x approaches a equals f(a)" },
    { unit: "Calc AB: Differentiation: Definition & Basic Rules", term: "Power Rule", answer: "d/dx[x^n] = n x^(n-1)" },
    { unit: "Calc AB: Differentiation: Composite, Implicit & Inverse", term: "Chain Rule", answer: "d/dx[f(g(x))] = f'(g(x)) g'(x)" },
    { unit: "Calc AB: Contextual Applications of Differentiation", term: "Related rates setup", answer: "Differentiate an equation relating two or more quantities with respect to time to relate their rates of change" },
    { unit: "Calc AB: Analytical Applications of Differentiation", term: "First Derivative Test", answer: "If f' changes from positive to negative at a critical point, f has a local maximum there; negative to positive means a local minimum" },
    { unit: "Calc AB: Integration & Accumulation of Change", term: "Fundamental Theorem of Calculus (Part 2)", answer: "The definite integral of f from a to b equals F(b) - F(a), where F is an antiderivative of f" },
    { unit: "Calc AB: Differential Equations", term: "Separation of variables", answer: "A method for solving dy/dx = g(x)h(y) by rewriting as dy/h(y) = g(x)dx and integrating both sides" },
    { unit: "Calc AB: Applications of Integration", term: "Area between two curves", answer: "The definite integral of (top function minus bottom function) with respect to x, over the interval where they bound a region" },
  ],
  "ap-calculus-bc": [
    { unit: "Calc BC: Limits & Continuity", term: "L'Hopital's Rule", answer: "If a limit gives 0/0 or infinity/infinity, it equals the limit of the ratio of derivatives of the numerator and denominator" },
    { unit: "Calc BC: Differentiation", term: "Quotient Rule", answer: "d/dx[f(x)/g(x)] = (f'(x)g(x) - f(x)g'(x)) / g(x)^2" },
    { unit: "Calc BC: Applications of Differentiation", term: "L'Hopital's Rule for indeterminate forms", answer: "Take the derivative of the numerator and denominator separately, then evaluate the limit again" },
    { unit: "Calc BC: Integration & Accumulation of Change", term: "Integration by parts", answer: "The integral of u dv equals uv minus the integral of v du" },
    { unit: "Calc BC: Differential Equations", term: "Logistic growth equation", answer: "dP/dt = kP(1 - P/K), where K is the carrying capacity" },
    { unit: "Calc BC: Applications of Integration", term: "Arc length formula", answer: "The integral from a to b of the square root of 1 plus (dy/dx)^2, with respect to x" },
    { unit: "Calc BC: Parametric, Polar & Vector Functions", term: "Area enclosed by a polar curve", answer: "One half times the integral of r^2 with respect to theta, over the interval" },
    { unit: "Calc BC: Infinite Sequences & Series", term: "Ratio Test", answer: "A series converges absolutely if the limit of the absolute value of a(n+1)/a(n) is less than 1" },
  ],
};

Object.entries(AP_EXPANDED_CONTENT).forEach(([id,c])=>{AP_FLASHCARDS[id]=c.flashcards;});

export const getApFlashcards = (courseId) => AP_FLASHCARDS[courseId] || [];
