// Original instructional content with worked examples; question-bank expansion is a separate phase.
export const STATISTICS_CONTENT = {
  "lessons": [
    {
      "id": "ap-statistics-1-1-lesson",
      "title": "1.1 Describing distributions, resistant summaries, and comparing groups",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Describing distributions, resistant summaries, and comparing groups"
        },
        {
          "type": "subheading",
          "text": "Parameters and Statistics"
        },
        {
          "type": "text",
          "text": "A distribution describes the values of a variable and how frequently they occur. First identify the variable and its units: a person’s commute time is quantitative, while a person’s preferred travel mode is categorical. Use a dotplot or histogram for a quantitative distribution and compare shape, center, spread, and unusual values. A histogram groups numerical values into intervals; a bar chart displays separate categories. Describe skew by the direction of the longer tail, not by where most observations sit. A population parameter summarizes everyone in the target population; a sample statistic summarizes only the observed sample."
        },
        {
          "type": "subheading",
          "text": "Resistant Summaries"
        },
        {
          "type": "text",
          "text": "When describing the center and spread of distributions, choosing the appropriate summary statistic depends heavily on skewness and outliers. The mean and standard deviation are non-resistant measures because their values are heavily influenced by extreme observations. In contrast, the median and the interquartile range ($IQR = Q_3 - Q_1$) are resistant summaries that remain relatively unaffected by extreme values or long tails. For skewed distributions or datasets containing outliers, often prefer the median and IQR to accurately represent typical values and variability without distortion."
        },
        {
          "type": "subheading",
          "text": "Comparing Groups Visually and Numerically"
        },
        {
          "type": "text",
          "text": "Comparing two or more groups requires evaluating center, shape, spread, and unusual features side by side. Using parallel boxplots or back-to-back stemplots allows analysts to quickly spot differences in medians and spreads. For numerical comparisons, calculating the difference in means or medians alongside the ratio of spreads gives a complete picture. When discussing these comparisons, students must avoid merely listing statistics; they need to use comparative language such as higher, lower, more tightly clustered, or heavily skewed to contrast the distributions effectively."
        },
        {
          "type": "subheading",
          "text": "Association Versus Causation"
        },
        {
          "type": "text",
          "text": "A common error in data analysis is leaping from an observed association between two variables to a causal conclusion. An association simply means that knowing the value of one variable provides information about the value of the other. Causation, however, can only be established through a properly designed randomized experiment where confounding variables are controlled or randomized away. Observational studies can reveal strong associations, but due to potential lurking variables, they can never prove cause and effect, regardless of sample size."
        },
        {
          "type": "subheading",
          "text": "Worked comparison: the effect of one extreme value"
        },
        {
          "type": "text",
          "text": "Consider two hypothetical groups with daily commute times in minutes. Group A has 10, 12, 14, 16, 18; Group B has 10, 12, 14, 16, 48. Both medians are 14 minutes. Group A’s mean is 70/5 = 14, while Group B’s mean is 100/5 = 20. One unusually long trip moved the mean by six minutes without changing the median. Group B also has a wider range, 38 rather than 8 minutes. Say that B has a higher mean and more spread, rather than merely listing values. This example explains resistance: the median is less affected by one extreme observation, but it does not reveal every difference between the groups."
        }
      ],
      "practiceQuestions": [
        {
          "question": "Which of the following numerical summaries is most resistant to the influence of extreme outliers?",
          "choices": [
            "Mean",
            "Standard Deviation",
            "Interquartile Range",
            "Variance"
          ],
          "answer": 2,
          "explanation": "The interquartile range (IQR) measures the spread of the middle fifty percent of the data, using quartiles which are based on ranks rather than exact extreme numerical values. Because it ignores the lowest and highest portions of the dataset, it is unaffected by extreme outliers. In contrast, the mean, variance, and standard deviation all incorporate every data point directly, making them non-resistant measures that shift significantly in the presence of extreme skewness or outliers.",
          "id": "ap-statistics-1-1-q1",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A researcher finds a strong positive linear association between ice cream sales and shark attacks in a coastal town over a ten-year period. What is the most appropriate conclusion?",
          "choices": [
            "Eating ice cream causes shark attacks to occur more frequently in coastal waters.",
            "Shark attacks drive people to purchase more ice cream to cope with stress.",
            "There is an association between the two variables, likely explained by a lurking variable such as warmer summer weather.",
            "It is impossible to calculate any meaningful statistical relationship without conducting a census of all coastal towns."
          ],
          "answer": 2,
          "explanation": "Observational data revealing a strong association does not imply causation. In this scenario, a lurking variable like ambient temperature or seasonal tourism volume drives both ice cream consumption and beach attendance, which in turn increases the number of shark attacks. Concluding causation from an observational study ignores potential confounding variables and violates core principles of statistical inference.",
          "id": "ap-statistics-1-1-q2",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "In a study comparing exam scores between two distinct teaching methods, Method A yields a mean score of $82$ with a standard deviation of $4$, while Method B yields a mean score of $80$ with a standard deviation of $12$. Which statement best compares the two distributions?",
          "choices": [
            "Method A has a higher center and greater variability than Method B.",
            "Method B has a higher center and greater variability than Method A.",
            "Method A has a higher center and less variability than Method B.",
            "Both methods have identical centers and identical spreads."
          ],
          "answer": 2,
          "explanation": "Comparing the two summaries shows that Method A has a mean of $82$, which is higher than Method B's mean of $80$. For spread, Method A has a standard deviation of $4$, which is smaller than Method B's standard deviation of $12$. Therefore, Method A exhibits a higher center and less variability, meaning student scores are more tightly clustered around a higher average than those in Method B.",
          "id": "ap-statistics-1-1-q3",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Why is it critical to distinguish between a population parameter and a sample statistic?",
          "choices": [
            "Parameters are calculated directly from data, whereas statistics are always guessed without data.",
            "Statistics are used as point estimates to infer unknown population parameters with a quantifiable degree of uncertainty.",
            "Parameters only apply to categorical variables, whereas statistics only apply to quantitative variables.",
            "There is no mathematical difference; the terms are used interchangeably in advanced statistical inference."
          ],
          "answer": 1,
          "explanation": "Population parameters represent the true, fixed numerical characteristics of an entire population that are almost never known completely. Sample statistics are computed from subset data and serve as estimates for those parameters. Recognizing this distinction allows statisticians to use probability models to account for sampling variability and quantify uncertainty when drawing conclusions about a larger population.",
          "id": "ap-statistics-1-1-q4",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-1-2-lesson",
      "title": "1.2 Sampling methods, bias, and scope of inference",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Sampling methods, bias, and scope of inference"
        },
        {
          "type": "subheading",
          "text": "Core Definitions: Parameter vs. Statistic"
        },
        {
          "type": "text",
          "text": "In statistics, a parameter is a fixed numerical value that describes a population of interest, often unknown. A statistic is a number calculated from sample data, used to estimate the parameter. Understanding the distinction is critical because statistics vary from sample to sample due to random variation. For example, if you survey 100 high school students, the average height you calculate is a statistic. The true average height of all students in the state is a parameter. Many errors in analysis occur when students treat a sample result as an absolute fact about the population, ignoring the inherent uncertainty of sampling."
        },
        {
          "type": "subheading",
          "text": "Random Sampling and Bias"
        },
        {
          "type": "text",
          "text": "Random sampling uses a chance mechanism with known selection probabilities. In a simple random sample of a fixed size, every possible sample of that size is equally likely; other valid probability designs need not give every individual equal inclusion probability. A random sample can still differ from its population by chance, so randomness does not guarantee perfect representation. Voluntary response samples can be biased because people who choose to respond may differ systematically from people who do not. Convenience sampling, such as interviewing friends, suffers from similar selection bias. To minimize bias, researchers use simple random sampling (SRS) or stratified sampling. In stratified sampling, the population is divided into subgroups (strata), and SRS is used within each stratum. This method is superior when key characteristics vary significantly between groups, ensuring representation across all segments."
        },
        {
          "type": "subheading",
          "text": "Worked Example: Stratified Selection"
        },
        {
          "type": "text",
          "text": "Consider a school with 200 sophomores, 250 juniors, and 150 seniors. A researcher needs a stratified random sample of 40 students. First, calculate total enrollment: $200 + 250 + 150 = 600$. The sampling fraction is $40/600 = 1/15$. For sophomores, sample size is $200 \\div 15 \\approx 13.33$, round to 13. For juniors, $250 \\div 15 \\approx 16.67$, round to 17. For seniors, $150 \\div 15 = 10$. The sum is $13+17+10=40$. Using a random number generator, assign numbers 1-200, 1-250, and 1-150 to the students in each grade level. Select 13, 17, and 10 distinct student identifiers respectively, sampling without replacement within each grade. This ensures proportional representation, unlike a simple random sample which might accidentally overweight juniors."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes: Causation vs. Association"
        },
        {
          "type": "text",
          "text": "A major conceptual error is inferring causation from observational data. Correlation indicates association, not cause. For instance, if ice cream sales and drowning incidents correlate, it does not mean ice cream causes drowning. Conversely, a randomized experiment can establish causation because random assignment balances confounding variables. In observational studies, lurking variables may drive both observed variables. Students must explicitly state whether their sample was part of an experiment (random assignment) or observation (no manipulation) before claiming causal relationships. Furthermore, a low $p$-value indicates statistical significance, not practical significance; a tiny difference may be statistically detectable but irrelevant in real-world terms."
        },
        {
          "type": "subheading",
          "text": "Transfer Application: Survey Design"
        },
        {
          "type": "text",
          "text": "Suppose a chain wants the mean satisfaction score of its 10,000 distinct customers who visited during one specified week. A complete customer frame lists 6,000 downtown customers and 4,000 suburban customers. For a proportional stratified sample of 20 customers, select an SRS of 12 distinct customers from the downtown stratum and an SRS of 8 from the suburban stratum. Keep the unit of selection as a customer, not a location or visit. If location groups have different average satisfaction but relatively little variation within each group, stratification may improve precision. A genuine SRS from the complete customer frame is not inherently biased merely because store traffic differs. If using disproportionate stratum sample sizes, use the appropriate population weights rather than an unweighted overall mean."
        }
      ],
      "practiceQuestions": [
        {
          "question": "A researcher claims that students who drink coffee sleep less. This conclusion was drawn from a survey of students who volunteered to participate. What is the primary flaw in this reasoning?",
          "choices": [
            "Voluntary response samples are biased, and association does not prove causation.",
            "The sample size was too small to calculate a reliable standard deviation.",
            "Coffee consumption and sleep are categorical variables, not quantitative.",
            "The researcher should have used convenience sampling instead."
          ],
          "answer": 0,
          "explanation": "The study suffers from two major issues. First, voluntary response samples are inherently biased because self-selected participants often differ from the general population. Second, even if the sample were random, observational data can only establish association, not causation. Lurking variables like stress or study habits could cause both coffee consumption and reduced sleep. Therefore, the claim of causation is invalid.",
          "id": "ap-statistics-1-2-q1",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "In a stratified random sample of 300 students from a school of 3,000, 10% of the population are seniors. How many seniors should be included in the sample?",
          "choices": [
            "30",
            "33",
            "300",
            "10"
          ],
          "answer": 0,
          "explanation": "Stratified random sampling requires the sample composition to mirror the population proportions. Since 10% of the population are seniors, 10% of the sample must also be seniors. Calculating 10% of the total sample size of 300: $0.10 \\times 300 = 30$. Thus, the sample must include exactly 30 seniors to maintain proportional representation and reduce sampling bias regarding this demographic.",
          "id": "ap-statistics-1-2-q2",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A study finds a statistically significant difference in test scores between two groups. However, the difference is only 0.5 points on a 100-point scale. How should this result be interpreted?",
          "choices": [
            "The difference is practically significant but not statistically significant.",
            "The difference is statistically significant but likely not practically significant.",
            "The null hypothesis must be incorrect because the $p$-value is low.",
            "The sample size must have been very small to detect such a small difference."
          ],
          "answer": 1,
          "explanation": "Statistical significance indicates that the observed difference is unlikely to be due to random chance, assuming the null hypothesis is true. However, practical significance depends on the real-world impact. A 0.5-point difference, while detectable with a large sample size, is negligible for educational outcomes. Therefore, the result is statistically significant but lacks practical significance, illustrating the distinction between mathematical detectability and real-world importance.",
          "id": "ap-statistics-1-2-q3",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which of the following designs allows a researcher to claim that a new medication caused an improvement in patient health?",
          "choices": [
            "A stratified random sample of patients who already take the medication.",
            "A randomized experiment where patients are randomly assigned to treatment or control groups.",
            "A voluntary response survey of patients who feel better after taking the medication.",
            "An observational study tracking patients who choose to take the medication."
          ],
          "answer": 1,
          "explanation": "Only a well-designed randomized experiment can establish causation. Random assignment balances both known and unknown lurking variables across treatment and control groups. This isolation of the treatment effect allows researchers to attribute differences in outcomes to the medication. Observational studies, including randomized samples of existing users, cannot rule out confounding variables, thus only supporting association.",
          "id": "ap-statistics-1-2-q4",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-1-3-lesson",
      "title": "1.3 Randomized experiments, blocking, and ethical data collection",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Randomized experiments, blocking, and ethical data collection"
        },
        {
          "type": "subheading",
          "text": "Prerequisites: Parameters vs. Statistics"
        },
        {
          "type": "text",
          "text": "Before designing experiments, distinguish population parameters from sample statistics. A parameter is a fixed numerical characteristic of the entire population (e.g., true mean recovery time). A statistic is a numerical characteristic calculated from a sample or experiment. In experimental design, we collect statistics to estimate parameters or test hypotheses about them. Crucially, while statistics vary from experiment to experiment due to random selection or assignment, the underlying parameter remains constant."
        },
        {
          "type": "subheading",
          "text": "Random Assignment and Causation"
        },
        {
          "type": "text",
          "text": "Random assignment is the process of using a random mechanism to place individuals into treatment groups. Unlike random sampling, which targets population inference, random assignment targets causal inference. Random assignment tends to balance other characteristics across treatment groups and prevents a systematic rule from assigning treatments according to those characteristics. It does not guarantee identical groups in one realized experiment. Analyze the size of the observed treatment difference relative to chance variation under the randomization. A well-designed randomized comparison can support a causal conclusion for the experimental units; broad population generalization additionally depends on how those units were selected."
        },
        {
          "type": "subheading",
          "text": "Blocking to Control Variability"
        },
        {
          "type": "text",
          "text": "Blocking is a technique used to reduce variation within treatment groups by organizing the experiment based on a known source of variation. Similar individuals are grouped into blocks, and treatments are randomized within each block. For example, in a drug trial, patients might be blocked by age or severity. This increases precision because every block contains all treatments, allowing for the removal of block-to-block variation from the error term. If a variable is strongly related to the response, blocking on it improves the sensitivity of the experiment to detect true treatment differences."
        },
        {
          "type": "subheading",
          "text": "Worked Example: Farming Experiment"
        },
        {
          "type": "text",
          "text": "A researcher compares one fertilizer with an unfertilized control using 20 tomato plants. The researcher measures plant height (cm) before treatment. Data shows three distinct size clusters: small (5 plants), medium (8 plants), and large (7 plants). The researcher uses random assignment separately within each size block.\n1. Identify blocks: Small, Medium, Large.\n2. Assign treatments: In the Small block, randomly select 3 plants for Fertilizer A and 2 for Control. In the Medium block, select 4 for A and 4 for Control. In the Large block, select 3 for A and 4 for Control.\n3. Calculate distribution: Total A = $3+4+3 = 10$ plants. Total Control = $2+4+4 = 10$ plants.\n4. Result: This ensures each size group is represented in both treatment groups, preventing confounding between plant size and fertilizer effectiveness."
        },
        {
          "type": "subheading",
          "text": "Ethics and Common Mistakes"
        },
        {
          "type": "text",
          "text": "Ethical data collection requires informed consent and the right to withdraw. Researchers cannot assign harmful treatments to vulnerable populations. A common mistake is confusing random sampling with random assignment; sampling selects who participates, assignment selects who gets the treatment. Another frequent error is pseudorandomness, using non-random methods like alternating assignments, which introduces bias. Finally, failing to blind the experiment can lead to observer bias, where expectations influence recorded outcomes. Always pre-specify blocking variables to avoid post-hoc rationalizations."
        }
      ],
      "practiceQuestions": [
        {
          "question": "In a clinical trial testing a new vaccine, participants are randomly assigned to receive either the vaccine or a placebo. Which of the following statements is most accurate regarding the purpose of random assignment?",
          "choices": [
            "To ensure the sample is representative of the general population.",
            "To create treatment and control groups that are balanced with respect to confounding variables.",
            "To increase the sample size without additional cost.",
            "To eliminate all variability in the response variable."
          ],
          "answer": 1,
          "explanation": "Random assignment ensures that both known and unknown confounding variables are distributed equally between the treatment and control groups on average. This balance allows researchers to infer causality because observed differences in outcomes can be attributed to the treatment rather than pre-existing differences between groups. It does not primarily address population representativeness, which is the role of random sampling, nor does it eliminate variability.",
          "id": "ap-statistics-1-3-q1",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A researcher is testing the effect of a new learning method on student test scores. Students are grouped by their previous semester's GPA (High, Medium, Low) before being randomly assigned to either the new method or the traditional method within each GPA group. What is the primary statistical benefit of this blocking strategy?",
          "choices": [
            "It ensures that the two groups have identical average GPAs.",
            "It reduces the variability within treatment groups by removing the effect of prior academic performance.",
            "It allows for the calculation of a two-sample t-test without assumptions.",
            "It increases the power of the test by increasing the total sample size."
          ],
          "answer": 1,
          "explanation": "Blocking groups similar individuals together based on a variable known to affect the response (GPA) and then randomizing treatments within those groups. This design reduces the unexplained variability in the response because the effect of GPA is accounted for within each block. By minimizing the noise from GPA differences, the experiment becomes more sensitive to detecting the specific effect of the learning method. It does not change the total sample size or guarantee identical group averages globally, only within blocks.",
          "id": "ap-statistics-1-3-q2",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which of the following scenarios best demonstrates a violation of ethical considerations in experimental design?",
          "choices": [
            "A researcher refuses to publish negative results from a completed trial.",
            "A researcher assigns a potentially harmful experimental drug to a control group without informed consent.",
            "A researcher uses a stratified sampling method to recruit participants from multiple hospitals.",
            "A researcher blinding the experimenter to prevent bias in data recording."
          ],
          "answer": 1,
          "explanation": "Assigning a harmful treatment to a control group without informed consent violates the ethical principles of autonomy and non-maleficence. Informed consent requires that participants understand the risks and voluntarily agree to participate. While publication bias is unethical in dissemination, the ethical violation in the design and conduct of the experiment itself is the lack of consent for a harmful assignment. Blinding is actually an ethical and scientific best practice to ensure fair and unbiased treatment of data.",
          "id": "ap-statistics-1-3-q3",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A study finds that students who study for 5 hours a week score higher on exams than those who study 1 hour. If the study did not use random assignment but instead observed existing study habits, what is the major limitation in interpreting this result?",
          "choices": [
            "The study cannot determine if studying causes higher scores due to potential confounding variables.",
            "The study must have used a simple random sample to be considered valid.",
            "The results are statistically insignificant because the sample size is unknown.",
            "The study has high external validity because it reflects real-world conditions."
          ],
          "answer": 0,
          "explanation": "Without random assignment, the study is observational. Students who choose to study more may differ from those who study less in other ways, such as motivation, prior knowledge, or socioeconomic status. These confounding variables could be the true cause of the higher scores, not the study time itself. Therefore, a causal link cannot be established. Simply observing real-world conditions (external validity) does not resolve the internal validity issue of causation versus association.",
          "id": "ap-statistics-1-3-q4",
          "domain": "Stats: Exploring One-Variable Data and Collecting Data",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-2-1-lesson",
      "title": "2.1 Conditional probability, independence, and simulation",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Conditional probability, independence, and simulation"
        },
        {
          "type": "subheading",
          "text": "Conditional Probability Definitions and Prerequisites"
        },
        {
          "type": "text",
          "text": "Conditional probability measures the probability that an event occurs given that another event has already occurred. For any two events $A$ and $B$ with $P(B) > 0$, the conditional probability of $A$ given $B$ is defined mathematically as $P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$. This fundamental relationship adjusts our sample space from the entire set of outcomes to the restricted subspace represented by event $B$. Understanding this reduction in sample space is crucial for interpreting real-world statistical models where prior information continuously updates our uncertainty."
        },
        {
          "type": "subheading",
          "text": "The General Multiplication Rule and Independence"
        },
        {
          "type": "text",
          "text": "Rearranging the conditional probability formula yields the general multiplication rule: $P(A \\cap B) = P(B) \\cdot P(A \\mid B)$. Two events $A$ and $B$ are defined as independent if the occurrence of one does not affect the probability of the other. Formally, events $A$ and $B$ are independent if and only if $P(A \\mid B) = P(A)$ and $P(B \\mid A) = P(B)$. Consequently, for independent events, the intersection probability simplifies to the product of their individual marginal probabilities: $P(A \\cap B) = P(A) \\cdot P(B)$. Distinguishing between disjoint events and independent events is a common conceptual requirement; disjoint events can never be independent unless one of them has a probability of zero."
        },
        {
          "type": "subheading",
          "text": "Multi-Step Worked Example Using Contingency Tables"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical study tracking 500 high school students to evaluate the relationship between participation in academic coaching and passing an advanced placement exam. Suppose 200 students participated in coaching. Out of those 200, 160 passed the exam. Among the 300 students who did not participate in coaching, 150 passed the exam. Let $C$ be coaching and $P$ be passing. We want to find the conditional probability of passing given coaching, $P(P \\mid C)$. First, identify the size of the restricted sample space, which is the total number of students who received coaching, $n(C) = 200$. Next, identify the number of students in the intersection, those who both received coaching and passed, $n(P \\cap C) = 160$. Applying the definition, $P(P \\mid C) = \\frac{160}{200} = 0.80$. To check for independence, compute the marginal probability of passing overall, which is $(160 + 150) / 500 = 310 / 500 = 0.62$. Because $P(P \\mid C) = 0.80$ is substantially different from $P(P) = 0.62$, coaching and passing are associated, not independent."
        },
        {
          "type": "subheading",
          "text": "Common Misconceptions and Simulation Approximations"
        },
        {
          "type": "text",
          "text": "A frequent error in AP Statistics is confusing conditional probability $P(A \\mid B)$ with the joint probability $P(A \\cap B)$ or the inverse conditional probability $P(B \\mid A)$. Another critical mistake is assuming that mutual exclusivity implies independence; in reality, if two events are mutually exclusive and have non-zero probabilities, the occurrence of one completely precludes the other, making them strongly dependent. When analytical probability calculations become intractable due to complex multi-stage processes, statisticians rely on simulation. By using random number generators or hypothetical trial data matching specified probability distributions, we can approximate complex conditional probabilities and test for independence through repeated empirical observation."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application in Practical Decision Making"
        },
        {
          "type": "text",
          "text": "In professional data analytics and biometric screening, conditional probabilities govern diagnostic testing and quality assurance frameworks. For example, evaluating whether a manufacturing defect is conditionally dependent on the shift supervisor requires comparing shift-specific conditional defect rates to the overall marginal defect rate. If the conditional probability of a structural failure during the night shift significantly exceeds the overall baseline probability, management can isolate assignable causes of variation. This transition from basic probability rules to conditional dependency modeling allows statisticians to separate random noise from systematic associations in observational studies and experiments."
        }
      ],
      "practiceQuestions": [
        {
          "question": "In a hypothetical survey of 400 local drivers, 120 admit to texting while driving, 160 drive sports cars, and 48 both text while driving and drive sports cars. What is the conditional probability that a randomly selected driver texts while driving given that they drive a sports car?",
          "choices": [
            "0.30",
            "0.40",
            "0.60",
            "0.75"
          ],
          "answer": 1,
          "explanation": "To find the conditional probability of texting while driving given driving a sports car, we divide the probability of the intersection by the marginal probability of driving a sports car. Alternatively, using counts directly from the scenario, we divide the number of drivers who both text and drive sports cars (48) by the total number of sports car drivers (160). Calculating 48 divided by 160 yields 0.40. the response “0.40” is correct because it correctly identifies the restricted sample space of sports car drivers as the denominator.",
          "id": "ap-statistics-2-1-q1",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Suppose events $X$ and $Y$ are independent with $P(X) = 0.45$ and $P(Y) = 0.60$. What is the probability of the union of $X$ and $Y$, denoted $P(X \\cup Y)$?",
          "choices": [
            "0.27",
            "0.78",
            "1.05",
            "0.65"
          ],
          "answer": 1,
          "explanation": "For any two events, the general addition rule states that $P(X \\cup Y) = P(X) + P(Y) - P(X \\cap Y)$. Because events $X$ and $Y$ are independent, we can find their intersection by multiplying their individual probabilities: $P(X \\cap Y) = 0.45 \\times 0.60 = 0.27$. Substituting these values into the addition rule gives $P(X \\cup Y) = 0.45 + 0.60 - 0.27 = 1.05 - 0.27 = 0.78$. the response “0.78” is correct because it accurately applies both the independence multiplication rule and the general addition rule.",
          "id": "ap-statistics-2-1-q2",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which of the following statements correctly distinguishes between disjoint events and independent events?",
          "choices": [
            "Disjoint events can never be independent if both have probabilities greater than zero, because the occurrence of one prevents the other from occurring.",
            "Independent events are also disjoint because they cannot occur at the same time under any standard probability model.",
            "Disjoint events are always independent because knowing one occurs tells you nothing about the probability of the other occurring.",
            "Two events are independent if their intersection is an empty set, whereas disjoint events must have a positive intersection."
          ],
          "answer": 0,
          "explanation": "Disjoint (mutually exclusive) events share no outcomes in common, meaning $P(A \\cap B) = 0$. If event $A$ occurs and has a positive probability, $P(B \\mid A)$ must be zero. For independence, we require $P(B \\mid A) = P(B)$. If $P(B) > 0$, these two conditions directly contradict each other. Thus, mutually exclusive events with non-zero probabilities are never independent. the response “Disjoint events can never be independent if both have probabilities greater than zero, because the occurrence of one prevents the other from occurring” correctly captures this logical relationship.",
          "id": "ap-statistics-2-1-q3",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A researcher conducts a simulation to estimate a conditional probability by running 1000 trials of a manufacturing process. In 300 trials, machine A is operating. In 90 of those machine A trials, a minor thermal spike occurs. Which value is the best simulation-based approximation for the conditional probability of a thermal spike given that machine A is operating?",
          "choices": [
            "0.09",
            "0.30",
            "0.70",
            "0.90"
          ],
          "answer": 1,
          "explanation": "The simulation data provides empirical counts that mimic theoretical conditional probability. We isolate the trials where the conditioning event occurs, which is machine A operating, totaling 300 trials. Within those specific trials, we count how many times the secondary event occurred, which is 90 thermal spikes. Dividing the intersection count by the condition count gives $90 / 300 = 0.30$. the response “0.30” correctly calculates this empirical conditional probability from the simulation frequency data.",
          "id": "ap-statistics-2-1-q4",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-2-2-lesson",
      "title": "2.2 Discrete random variables and binomial models",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Discrete random variables and binomial models"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Definitions"
        },
        {
          "type": "text",
          "text": "Before modeling binomial scenarios, students must define a discrete random variable $X$ as a numerical variable whose possible values form a countable list. A probability distribution for discrete $X$ assigns a probability $P(X=x)$ to each value such that $0 \\le P(X=x) \\le 1$ and $\\sum P(X=x) = 1$. The binomial model applies when four conditions (BINS) are met. First, Binary: each trial yields one of two outcomes (Success/Failure). Second, Independent: the modeled outcome of one trial does not change the success probability on another. Sampling without replacement creates dependence. When n is no more than 10% of a sufficiently large population, treating that dependence as negligible is a useful approximation; the condition does not make the draws exactly independent. Third, Number: $n$ is the fixed number of trials. Fourth, Same proportion: the probability of success, denoted $p$, remains constant across trials. Distinguish the parameter $p$ (unknown population truth) from the statistic $\\hat{p}$ (sample estimate). Binomial variables are discrete; they cannot take values between integers. This lesson focuses on constructing and interpreting distributions for $X \\sim B(n, p)$, not on deriving from first principles or geometric series."
        },
        {
          "type": "subheading",
          "text": "Constructing the Binomial Distribution"
        },
        {
          "type": "text",
          "text": "The probability mass function for a binomial random variable is given by $P(X=k) = \\binom{n}{k} p^k (1-p)^{n-k}$, where $k$ is the specific number of successes. The combinatorial term $\\binom{n}{k}$ counts the number of ways to arrange $k$ successes in $n$ trials. To construct a full distribution table, calculate $P(X=k)$ for every integer $k$ from $0$ to $n$. The probability of at least $k$ successes is $P(X \\ge k) = 1 - P(X \\le k-1)$, or calculated by summing $P(X=k)$ through $P(X=n)$. The expected value (mean) is $\\mu_X = np$, and the standard deviation is $\\sigma_X = \\sqrt{np(1-p)}$. These formulas allow quick checks: if $n$ increases, the mean increases linearly, while the spread increases with the square root of $n$ scaled by $p(1-p)$. Students must recognize that $P(X=k)$ represents the probability of *exactly* $k$ successes, not $k$ or more. Misinterpreting 'at least' as 'exactly' is a common conceptual error. The distribution is symmetric only when $p=0.5$; otherwise, it is right-skewed if $p<0.5$ and left-skewed if $p>0.5$."
        },
        {
          "type": "subheading",
          "text": "Worked Example: Hypothetical Data Analysis"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical quality control scenario where a factory produces lightbulbs with a defect rate of $p=0.10$. A manager inspects a simple random sample of $n=5$ bulbs. Let $X$ be the number of defective bulbs. First, verify BINS: outcomes are Binary (defective/not), Independent (the batch contains at least 50 bulbs, so this sample of 5 is no more than 10% of the batch; defects are modeled as approximately independent), Number is fixed at 5, and $p$ is constant at 0.1. Calculate $P(X=0) = \\binom{5}{0} (0.1)^0 (0.9)^5 = 0.59049$. Calculate $P(X=1) = \\binom{5}{1} (0.1)^1 (0.9)^4 = 5(0.1)(0.6561) = 0.32805$. To find the probability of *at least* one defect, use the complement rule: $P(X \\ge 1) = 1 - P(X=0) = 1 - 0.59049 = 0.40951$. This means there is a 40.95% chance the inspector finds at least one bad bulb. If the manager saw 0 defects in a sample of 5, is this statistically significant evidence that $p < 0.1$? No, because a 59% probability is common. This illustrates the difference between statistical significance (low probability under null) and practical significance (real-world impact). These finite sums are exact under the stated independent binomial model, and no normal approximation is used. If the bulbs are sampled without replacement from a finite batch, the binomial model itself is an approximation even when the 10% condition is satisfied."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Conditions"
        },
        {
          "type": "text",
          "text": "Students frequently confuse $P(X=k)$ with $P(X \\le k)$. Ensure questions specify 'exactly' versus 'at most'. Another error is ignoring the independence condition when sampling without replacement. When sampling without replacement from a finite population, outcomes are dependent and the exact count model is hypergeometric. If the sample is at most 10% of the population, a binomial approximation may be reasonable; exceeding that guideline means the usual independence approximation needs reconsideration, not that every larger-sample approximation has identical accuracy. Do not use the normal approximation for binomial probabilities unless $np \\ge 10$ and $n(1-p) \\ge 10$; even then, note it is an approximation. A critical conceptual error is treating $p$ as a statistic; $p$ is a parameter describing the population process. In hypothesis testing contexts (future units), a low $P$-value indicates the observed statistic is unlikely under the model, but it does not prove causation or guarantee the parameter is true. Additionally, students must distinguish between the random variable $X$ (the outcome) and the probability distribution (the set of probabilities). When answering questions, always state the random variable clearly: 'Let $X$ be the number of successes...' followed by '$X \\sim B(n, p)$'. Failing to list BINS conditions explicitly can lead to lost points on AP exams."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application"
        },
        {
          "type": "text",
          "text": "Apply binomial reasoning to social science scenarios where outcomes are binary. For example, suppose a survey finds 60% of adults prefer tea ($p=0.6$). If you randomly select 8 people, what is the probability that exactly 5 prefer tea? $P(X=5) = \\binom{8}{5} (0.6)^5 (0.4)^3 = 56(0.07776)(0.064) \\approx 0.2787$. This model assumes random selection and independence between respondents. If the survey uses cluster sampling (e.g., all friends in a group), independence may be violated due to social influence, making the binomial model inappropriate. This highlights the distinction between random sampling (valid for inference) and random assignment (valid for causation). In this context, we are modeling probability, not inferring a causal effect of tea preference. The same mathematical structure applies to genetic inheritance (assuming independent assortment) or coin flips. Understanding these conditions ensures the model matches the real-world mechanism, preventing misapplication of probability tools to dependent or non-binary events."
        }
      ],
      "practiceQuestions": [
        {
          "question": "A bag contains 500 red and 500 blue marbles. Thirty are selected randomly without replacement. Which statement best supports treating the number of red marbles as approximately binomial?",
          "choices": [
            "The sample is 3% of the population, supporting the usual 10% condition for approximate independence.",
            "Physical objects cannot have binary outcomes.",
            "Drawing without replacement makes the trials exactly independent.",
            "The number of trials does not need to be fixed."
          ],
          "answer": 0,
          "explanation": "The sample fraction is 30/1,000 = 0.03, below the usual 10% guideline. Sampling without replacement is not exactly independent, but the small sampling fraction supports the approximation when outcomes are binary, n is fixed, and the population success fraction is stable. An exact count model would account for the finite population.",
          "id": "ap-statistics-2-2-q1",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "In the context of a binomial random variable $X \\sim B(n, p)$, what does the parameter $p$ represent?",
          "choices": [
            "The probability of observing the specific sample statistic $\\hat{p}$.",
            "The mean of the sampling distribution of the sample proportion.",
            "The probability of success on any single trial in the population process.",
            "The standard deviation of the number of successes."
          ],
          "answer": 2,
          "explanation": "In the binomial model, $p$ is the population parameter representing the probability of success for any single trial. It is fixed and unknown in hypothesis testing contexts. The statistic $\\hat{p}$ is the observed proportion in a sample. The mean of the sampling distribution of $\\hat{p}$ is also $p$, but $p$ itself is the fundamental trial probability. the response “The standard deviation of the number of successes” describes $\\sigma_X = \\sqrt{np(1-p)}$, not $p$. the response “The probability of observing the specific sample statistic $\\hat{p}$” refers to the distribution of the statistic, not the parameter definition. Distinguishing parameter from statistic is crucial for AP Statistics inference units.",
          "id": "ap-statistics-2-2-q2",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Calculate the probability that exactly 2 successes occur in 4 trials if the probability of success is $0.5$. Round to four decimal places.",
          "choices": [
            "0.2500",
            "0.3750",
            "0.6250",
            "0.5000"
          ],
          "answer": 1,
          "explanation": "For four independent Bernoulli trials with success probability 0.5, exactly two successes can occur in 4 choose 2 = 6 arrangements. Each arrangement has probability (0.5)²(0.5)² = 0.0625. Multiplying gives 6 × 0.0625 = 0.3750; the combination factor counts all arrangements rather than just one.",
          "id": "ap-statistics-2-2-q3",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A basketball player makes 80% of free throws. She takes 10 shots. What is the probability that she makes ALL 10 shots?",
          "choices": [
            "0.8000",
            "1.0000",
            "0.1074",
            "0.0010"
          ],
          "answer": 2,
          "explanation": "The event is $X=10$ successes in $n=10$ trials with $p=0.8$. The formula is $P(X=10) = \\binom{10}{10} (0.8)^{10} (0.2)^0$. Since $\\binom{10}{10}=1$ and $0.2^0=1$, the calculation simplifies to $(0.8)^{10}$. Computing $0.8^{10}$: $0.8^5 \\approx 0.32768$, and $0.32768^2 \\approx 0.10737$. Rounded to four decimal places, this is 0.1074. that response is the probability of one success. the response “0.8000” implies certainty, which is false since $p < 1$. the response “0.0010” is too small, likely confusing with $0.2^{10}$ or similar. The calculation is exact and assumes independence of each shot.",
          "id": "ap-statistics-2-2-q4",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-2-3-lesson",
      "title": "2.3 Normal distributions and sampling variability",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Normal distributions and sampling variability"
        },
        {
          "type": "subheading",
          "text": "Definitions and Variables"
        },
        {
          "type": "text",
          "text": "The concept of sampling variability explores how a statistic (a number calculated from a **sample**) fluctuates from sample to sample. In contrast, a **parameter** is a fixed value describing an **entire population**. The Central Limit Theorem is the critical principle here: if we repeatedly take large random samples from a population (regardless of the original shape, provided independent conditions are met), the distribution of a sample mean, denoted $\\bar{x}_n$, will approximate a normal distribution. This sampling distribution has a mean equal to the population mean ($\\mu$) and a standard deviation known as the **standard error**, $\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}$. Distinguishing parameters from statistics is essential; $\\sigma$ is a parameter, while $s$ is a statistic."
        },
        {
          "type": "subheading",
          "text": "The Standard Error Method"
        },
        {
          "type": "text",
          "text": "Calculating sampling variability allows us to measure the precision of our estimates. As the sample size $n$ increases, the standard error decreases by a factor of $\\sqrt{n}$. This method is used to create a framework for inference. When evaluating hypotheses, we must ask: is a deviation from the expected mean practically significant, or statistically significant? Statistical significance indicates a result occurring outside the expected range of random variation (usually $p < 0.05$). A numerically small difference might be statistically significant if the sample size is vast, yet lack practical significance in real-world contexts. For independent observations with finite population variance, the sampling-distribution standard deviation of the mean is σ/√n. For sampling without replacement from a finite population, the 10% condition supports using this formula as an approximation without a finite-population correction; it is not a requirement for independent sampling with replacement."
        },
        {
          "type": "subheading",
          "text": "Worked Example Calculation"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical scenario where adult heights in a city are normally distributed with $\\mu = 165$ cm and $\\sigma = 7$ cm. We randomly select $n = 100$ heights. Because the population is stated to be normal, the mean of independent observations is normal. If sampling without replacement, assume the city population is at least ten times the sample size. The standard error is $SE = 7/\\sqrt{100} = 0.7$ cm. We want to find the probability of sampling a mean height $\\bar{x} < 164.5$ cm. We calculate the z-score: $z = \\frac{\\bar{x} - \\mu}{SE} = \\frac{164.5 - 165}{0.7} \\approx -0.71$. Using the unrounded value $z = -0.7142857$ gives an area of approximately $0.2375$ (rounding z to -0.71 in a table gives 0.2389). Therefore, there is about a 23.75% chance of observing a sample mean below 164.5 cm in this hypothetical scenario."
        },
        {
          "type": "subheading",
          "text": "Common Misconceptions and Conditions"
        },
        {
          "type": "text",
          "text": "A frequent error is conflating the standard deviation of the underlying population with the standard deviation of the sample means. The sampling distribution is almost always much narrower (more precise) than the population. Additionally, students often interpret p-values as the probability that a parameter exists in a specific range, but p-values are actually a conditional probability regarding the sample data. We must strictly check the independence condition: if the population is small, the 10% rule requires $n \\le 0.10N$. A p-value is calculated under a specified null model. Sampling distributions can also be studied under other stated population models, and confidence-interval construction does not begin by assuming a particular null hypothesis is true. Always identify which model a probability calculation is conditional on."
        },
        {
          "type": "subheading",
          "text": "Application in Sampling Design"
        },
        {
          "type": "text",
          "text": "In research, minimizing sampling variability increases the reliability of estimates. To reduce variability by half, the sample size must increase by a factor of four ($n \\to 4n$) to maintain a desired margin of error. This understanding drives optimal resource allocation in experimental design. When reading a new study, identifying the sample size $n$ and the sample standard deviation $s$ allows a researcher to compute the standard error and determine if a reported finding is likely to be repeated in a future independent sample, emphasizing the importance of replication in science."
        }
      ],
      "practiceQuestions": [
        {
          "question": "If a population has a standard deviation of $\\sigma = 50$ and a sample of size $n = 25$ is selected, what is the standard deviation of the sampling distribution of the sample mean?",
          "choices": [
            "2500",
            "50",
            "12.5",
            "2"
          ],
          "answer": 2,
          "explanation": "The standard deviation of the sampling distribution is calculated using the standard error formula $\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}$. Substituting the provided parameters gives $SE = 50/\\sqrt{25} = 50/5 = 10$. The standard deviation of the individual observations is 50, not the sample mean. The initial population standard deviation must be divided by the square root of the sample size to reflect the reduction in variability.",
          "id": "ap-statistics-2-3-q1",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Given a population mean of $\\mu = 40$ and a standard error of 2, what is the z-score for an observed sample mean of 43?",
          "choices": [
            "16.5",
            "0.15",
            "6.5",
            "1.5"
          ],
          "answer": 3,
          "explanation": "The z-score measures how many standard errors the sample mean is away from the population mean. The formula is $z = (\\bar{x} - \\mu) / SE$. Plugging in the values, we get $43 - 40 = 3$, which represents the difference. Dividing this difference by the given standard error of 2 gives $3/2 = 1.5$. This signifies the observation is 1.5 standard errors above the mean.",
          "id": "ap-statistics-2-3-q2",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "To reduce the standard error of a sampling distribution by a factor of 3, how must the sample size change from its original value $n$?",
          "choices": [
            "Multiply $n$ by 3",
            "Divide $n$ by 3",
            "Multiply $n$ by 9",
            "Multiply $n$ by $\\sqrt{3}$"
          ],
          "answer": 2,
          "explanation": "The standard error formula is $SE = \\sigma / \\sqrt{n}$. To make the resulting standard error three times smaller, the denominator must be three times larger. Mathematically, $\\sqrt{3n}$ does not work because $\\sqrt{n}$ must multiply by 3. Therefore, $\\sqrt{9n} = 3\\sqrt{n}$. This implies the sample size $n$ must be multiplied by 9. This inverse-square relationship is fundamental to experimental design and precision.",
          "id": "ap-statistics-2-3-q3",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which statement correctly distinguishes a parameter from a statistic in the context of sampling variability?",
          "choices": [
            "A parameter is an estimate based on a random sample, while a statistic describes the entire population.",
            "A statistic is a fixed number describing a population, while a parameter is calculated from sample data.",
            "A parameter is a fixed value describing a population, while a statistic is a number calculated from a sample.",
            "Parameters and statistics are both values calculated solely from sample data collected in an experiment."
          ],
          "answer": 2,
          "explanation": "A parameter is a fixed, often unknown, numerical value that describes an entire population (such as $\\mu$ or $\\sigma$). A statistic is a numerical value calculated from a sample (such as $\\bar{x}$ or $s$). Because samples vary, statistics fluctuate, but parameters remain constant. Confusing these two core statistical concepts leads to fundamental misunderstandings in inferential procedures.",
          "id": "ap-statistics-2-3-q4",
          "domain": "Stats: Probability, Random Variables, and Probability Distributions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-3-1-lesson",
      "title": "3.1 Sampling distributions and confidence intervals for one proportion",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Sampling distributions and confidence intervals for one proportion"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Core Definitions"
        },
        {
          "type": "text",
          "text": "To perform inference for a population proportion, we must clearly distinguish between a population parameter and a sample statistic. A parameter is a fixed, typically unknown numerical value that describes a characteristic of an entire population, denoted as $p$. Conversely, a statistic is a known value calculated from a sample, denoted as $\\hat{p} = \\frac{x}{n}$, which varies from sample to sample. Additionally, students must differentiate between a confidence level and an individual probability. A 95% confidence level means that if we were to take many repeated samples using the same method, about 95% of the resulting intervals would successfully capture the true population parameter $p$. It does not mean there is a 95% probability that the fixed parameter falls inside one specific calculated interval; the parameter is a fixed value, not a random variable."
        },
        {
          "type": "subheading",
          "text": "The Sampling Distribution of a Sample Proportion"
        },
        {
          "type": "text",
          "text": "When taking repeated samples of size $n$ from a population with proportion $p$, the sampling distribution of the sample proportion $\\hat{p}$ has a mean equal to the true population proportion $\\mu_{\\hat{p}} = p$ and a standard deviation given by the formula $\\sigma_{\\hat{p}} = \\sqrt{\\frac{p(1-p)}{n}}$. Because $p$ is typically unknown, we use the standard error $\\text{SE}_{\\hat{p}} = \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}$ for confidence intervals. Before constructing a confidence interval, we must verify three key conditions: Random, Normal, and Independent. A random sampling design supports population inference while leaving sampling variability; it does not ensure that one realized sample perfectly represents the population. The Normal condition requires both $n\\hat{p} \\ge 10$ and $n(1-\\hat{p}) \\ge 10$ (or $np \\ge 10$ and $n(1-p) \\ge 10$ for distributions), ensuring the sampling distribution is approximately normal. The Independent condition requires that the sample size is no more than 10% of the population size ($n \\le 0.10N$) when sampling without replacement."
        },
        {
          "type": "subheading",
          "text": "Multi-Step Worked Example"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical survey where a random sample of $n = 400$ registered voters in a city shows that $x = 240$ support a new municipal transit tax. We wish to construct a 95% confidence interval for the true proportion $p$ of all voters who support the tax. First, calculate the sample statistic: $\\hat{p} = \\frac{240}{400} = 0.60$. Next, verify the conditions: The sample was randomly selected. The Large Counts condition checks out because $400(0.60) = 240 \\ge 10$ and $400(0.40) = 160 \\ge 10$. Assuming a large voter base, the independence condition is satisfied. We calculate the standard error: $\\text{SE} = \\sqrt{\\frac{0.60(0.40)}{400}} = \\sqrt{\\frac{0.24}{400}} = \\sqrt{0.0006} \\approx 0.0245$. For a 95% confidence level, the critical value is $z^* = 1.960$. The margin of error is $ME = 1.960 \\times 0.0245 \\approx 0.0480$. Finally, construct the interval: $0.60 \\pm 0.0480$, yielding $(0.5520, 0.6480)$. We are 95% confident that the true proportion of all registered voters supporting the transit tax is between 0.5520 and 0.6480."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Experimental Conditions"
        },
        {
          "type": "text",
          "text": "A frequent error in statistical inference is confusing random sampling with random assignment. Random sampling allows us to generalize our findings from a sample to a larger population, whereas random assignment allows us to infer cause-and-effect relationships. Observational studies using random sampling cannot establish causation. Another crucial distinction is between statistical significance and practical significance. A result is statistically significant if the confidence interval excludes a null value, meaning the effect is unlikely due to chance alone. However, with very large sample sizes, even a minuscule deviation from a null value can become statistically significant while having zero practical importance in the real world. Always evaluate the context of the interval width and the magnitude of the effect."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application in Research"
        },
        {
          "type": "text",
          "text": "Confidence intervals for a single proportion serve as fundamental tools in quality control, polling, and clinical research. For instance, a pharmaceutical manufacturer testing a new assembly line component might sample $n = 500$ units and find 12 defective parts, yielding $\\hat{p} = 0.024$. By calculating a 99% confidence interval, engineers can determine whether the true defect rate remains below a mandated upper regulatory threshold. If the entire interval lies below the maximum allowable defect rate of 0.05, the manufacturing process can be certified as compliant. This application demonstrates how interval estimation bridges sample-based evidence and rigorous decision-making without relying solely on binary hypothesis testing."
        }
      ],
      "practiceQuestions": [
        {
          "question": "Which of the following conditions must be satisfied to safely use a normal approximation when constructing a confidence interval for a single proportion?",
          "choices": [
            "The sample size must be at least 30 and the population must be normally distributed.",
            "Both $n\\hat{p} \\ge 10$ and $n(1-\\hat{p}) \\ge 10$, along with a random sample.",
            "The population standard deviation must be known.",
            "The sample size must exceed 10% of the population size."
          ],
          "answer": 1,
          "explanation": "To use a normal approximation for a sample proportion, we rely on the large counts condition, which requires the expected number of successes and failures to be at least 10, checked via $n\\hat{p} \\ge 10$ and $n(1-\\hat{p}) \\ge 10$. Randomness is also required.",
          "id": "ap-statistics-3-1-q1",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "What is the correct interpretation of a 90% confidence interval for a population proportion $p$?",
          "choices": [
            "There is a 90% probability that the true population proportion lies within the calculated interval.",
            "If many random samples of the same size are taken, approximately 90% of the resulting confidence intervals will contain the true population proportion.",
            "90% of the data values in the sample fall inside the confidence interval limits.",
            "The true proportion has a 90% chance of changing value within the bounds of the interval over time."
          ],
          "answer": 1,
          "explanation": "A confidence level refers to the long-run success rate of the method. In repeated sampling, 90% of constructed intervals will successfully capture the fixed, unknown population parameter. The parameter itself is not a random variable.",
          "id": "ap-statistics-3-1-q2",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A random sample of 200 high school students yields 110 who prefer online textbooks. What is the standard error used for a one-sample z-interval for proportions?",
          "choices": [
            "$\\sqrt{\\frac{0.55 \\times 0.45}{200}}$",
            "$\\sqrt{\\frac{0.50 \\times 0.50}{200}}$",
            "$\\frac{0.55}{\\sqrt{200}}$",
            "$\\sqrt{\\frac{110 \\times 90}{200}}$"
          ],
          "answer": 0,
          "explanation": "The sample proportion is $\\hat{p} = 110/200 = 0.55$, and $\\hat{q} = 0.45$. The standard error formula for a single proportion is $\\text{SE} = \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}$, which substitutes directly to $\\sqrt{\\frac{0.55 \\times 0.45}{200}}$.",
          "id": "ap-statistics-3-1-q3",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "How does increasing the confidence level from 90% to 99% affect the width of a confidence interval for a proportion, assuming sample size and sample proportion remain constant?",
          "choices": [
            "The width decreases because a higher confidence level requires a smaller critical value.",
            "The width remains unchanged because the sample size and sample proportion dictate the spread.",
            "The width increases because a higher confidence level requires a larger critical value ($z^*$).",
            "The width becomes zero because certainty is absolute at 99%."
          ],
          "answer": 2,
          "explanation": "Increasing the confidence level requires a larger critical value ($z^*$), such as moving from 1.645 to 2.576. Since the margin of error is $z^* \\times \\text{SE}$, a larger critical value directly increases the margin of error, making the interval wider.",
          "id": "ap-statistics-3-1-q4",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-3-2-lesson",
      "title": "3.2 Tests for one proportion, significance, and errors",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Tests for one proportion, significance, and errors"
        },
        {
          "type": "subheading",
          "text": "Prerequisites: Parameter vs. Statistic"
        },
        {
          "type": "text",
          "text": "Before performing a hypothesis test, distinguish the population parameter $p$ (the true proportion) from the sample statistic $\\hat{p}$. The null hypothesis $H_0$ always states a specific value for $p$, while the alternative $H_a$ proposes a direction or difference. For example, if testing a claim about product defect rates, $p$ is the actual defect rate in all produced items, whereas $\\hat{p}$ is the observed rate in our data. Hypotheses must reference the parameter, not the statistic, because inference aims to make conclusions about the broader population based on sample evidence."
        },
        {
          "type": "subheading",
          "text": "Approximation Conditions"
        },
        {
          "type": "text",
          "text": "The one-proportion $z$-test relies on the Normal approximation to the binomial distribution. This approximation is valid only if both the expected number of successes and failures under the null hypothesis are sufficiently large. The standard condition is $np_0 \\geq 10$ and $n(1-p_0) \\geq 10$, where $p_0$ is the hypothesized value. If these conditions fail, the sampling distribution may be too skewed for the $z$-statistic to be accurate. Additionally, the sample must consist of independent observations (random sampling or random assignment) and be less than 10% of the population if sampling without replacement to ensure independence."
        },
        {
          "type": "subheading",
          "text": "The Test Method"
        },
        {
          "type": "text",
          "text": "The test statistic measures how many standard errors the observed proportion $\\hat{p}$ is from the null value $p_0$. The formula is $z = \\frac{\\hat{p} - p_0}{\\sqrt{\\frac{p_0(1-p_0)}{n}}}$. Note that the standard error uses $p_0$, not $\\hat{p}$, because we are calculating the variability expected if the null hypothesis were true. After calculating $z$, we find the $P$-value: the probability of observing a test statistic as extreme as, or more extreme than, the one calculated, assuming $H_0$ is true. For a two-sided test, the $P$-value is $2 \\times P(Z > |z|)$."
        },
        {
          "type": "subheading",
          "text": "Worked Example"
        },
        {
          "type": "text",
          "text": "Suppose a factory claims 95% of batteries last over 10 hours ($p_0=0.95$). A sample of $n=200$ batteries shows 180 lasting over 10 hours, so $\\hat{p}=0.90$. First, check conditions: $200(0.95)=190$ and $200(0.05)=10$, both $\\geq 10$. Calculate $z$: $\\sqrt{\\frac{0.95(0.05)}{200}} = \\sqrt{0.0002375} \\approx 0.0154$. Then $z = \\frac{0.90 - 0.95}{0.0154} \\approx -3.25$. The two-sided $P$-value is $2 \\times P(Z < -3.25) \\approx 2(0.0006) = 0.0012$. Since $0.0012 < 0.05$, we reject $H_0$. There is strong evidence the true proportion is not 0.95."
        },
        {
          "type": "subheading",
          "text": "Errors and Significance"
        },
        {
          "type": "text",
          "text": "Type I error occurs when we reject a true $H_0$; the probability of this is the significance level $\\alpha$. Type II error is failing to reject a false $H_0$. Statistical significance means the $P$-value is small, providing evidence against $H_0$, but it does not prove $H_a$ is true or that the effect is practically important. A tiny difference can be statistically significant with a huge sample but practically irrelevant. Always contextualize the result: does the difference in proportions matter in the real-world context? Also, distinguish association from causation; even if the test is significant, observational data cannot prove cause-and-effect without random assignment."
        }
      ],
      "practiceQuestions": [
        {
          "question": "In a test where $H_0: p=0.5$ and $H_a: p \\neq 0.5$, a researcher obtains a $P$-value of 0.03. Which statement is correct if $\\alpha=0.05$?",
          "choices": [
            "There is a 3% chance the null hypothesis is true.",
            "The probability of a Type I error is 0.03.",
            "We reject $H_0$ because the observed data are unlikely under $H_0$.",
            "We fail to reject $H_0$ because 0.03 is greater than 0.05."
          ],
          "answer": 2,
          "explanation": "The P-value is the probability of observing data this extreme or more extreme assuming H0 is true, not the probability H0 is true. Since 0.03 < 0.05, the result is statistically significant, leading to rejection of H0. The Type I error rate is fixed at alpha (0.05), not the P-value. the response “We fail to reject $H_0$ because 0.03 is greater than 0.05” is incorrect because 0.03 is less than 0.05.",
          "id": "ap-statistics-3-2-q1",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A sample of 50 students yields $\\hat{p}=0.50$. Testing $H_0: p=0.40$. Which condition check is problematic?",
          "choices": [
            "$np_0 = 20$ and $n(1-p_0) = 30$, both $\\geq 10$.",
            "$n\\hat{p} = 25$ and $n(1-\\hat{p}) = 25$, both $\\geq 10$.",
            "$np_0 = 20$ but the sample size is greater than 10% of the population.",
            "The calculation uses $\\hat{p}$ instead of $p_0$ for the standard error."
          ],
          "answer": 3,
          "explanation": "The standard error in a hypothesis test must use the null parameter $p_0$, not the sample statistic $\\hat{p}$. Using $\\hat{p}$ inflates or deflates the standard error incorrectly, leading to a wrong z-score. While the 10% condition is important, the primary methodological error in the test statistic calculation is using the wrong proportion for the denominator. Options 1 and 2 show correct calculations for respective contexts, but 3 identifies the specific formula error.",
          "id": "ap-statistics-3-2-q2",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "If a test has $\\alpha=0.01$, what is the probability of making a Type I error given $H_0$ is true?",
          "choices": [
            "0.01",
            "0.99",
            "The P-value of the specific test",
            "0.05"
          ],
          "answer": 0,
          "explanation": "A Type I error is rejecting a true null hypothesis. The significance level $\\alpha$ is defined as the long-run probability of making this error when $H_0$ is actually true. Therefore, if $\\alpha=0.01$, there is a 1% chance of a Type I error. The P-value varies by dataset, while $\\alpha$ is set before the test. the response “The P-value of the specific test” is the power-related concept, not Type I error. the response “0.05” is the observed significance, not the error rate.",
          "id": "ap-statistics-3-2-q3",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A test rejects $H_0$ at $\\alpha=0.05$. What does this imply about statistical vs. practical significance?",
          "choices": [
            "The result is practically significant because the P-value is small.",
            "The result is statistically significant, but practical significance depends on effect size and context.",
            "The null hypothesis is proven false with 95% confidence.",
            "There is a 5% chance the result is due to chance."
          ],
          "answer": 1,
          "explanation": "Statistical significance (P < alpha) provides evidence against H0 but does not guarantee the difference is large or important in real life. Practical significance requires assessing the magnitude of the difference (effect size) and its relevance to the context. A tiny difference can be statistically significant with large samples. Proof is absolute, while statistics deal in probability. The 5% is the error rate, not the probability of the result being due to chance in this specific case.",
          "id": "ap-statistics-3-2-q4",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-3-3-lesson",
      "title": "3.3 Comparing two proportions with estimates and tests",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Comparing two proportions with estimates and tests"
        },
        {
          "type": "subheading",
          "text": "Parameters and Statistics for Two Proportions"
        },
        {
          "type": "text",
          "text": "When comparing two independent populations or treatment groups, our goal is to evaluate the difference between two population proportions, denoted as $p_1 - p_2$. To estimate this parameter, we use the difference between two sample proportions, $\\hat{p}_1 - \\hat{p}_2$. Distinguishing between these values is critical: $p_1$ and $p_2$ are fixed, unknown population parameters, whereas $\\hat{p}_1$ and $\\hat{p}_2$ are statistics that vary from sample to sample. In an experimental design framework, if researchers use random assignment rather than random sampling, the parameter of interest still represents the difference in underlying treatment response rates, but the scope of inference is limited to the specific subjects studied rather than a broader population."
        },
        {
          "type": "subheading",
          "text": "Conditions for Confidence Intervals and Significance Tests"
        },
        {
          "type": "text",
          "text": "Before constructing a confidence interval or performing a significance test for the difference between two proportions, we must verify three core conditions: randomness, independence, and large counts. The data must come from independent random samples or a completely randomized experiment. To satisfy the independence condition, the sampled populations must be at least ten times as large as the respective samples ($n_1 \\le 0.10 N_1$ and $n_2 \\le 0.10 N_2$). For the large counts condition, we must check success/failure counts. For a confidence interval, we require $n_1\\hat{p}_1 \\ge 10$, $n_1(1-\\hat{p}_1) \\ge 10$, $n_2\\hat{p}_2 \\ge 10$, and $n_2(1-\\hat{p}_2) \\ge 10$. For a significance test, we pool the sample data to calculate a pooled proportion $\\hat{p}_c$ and check that the expected counts of successes and failures are all at least 10."
        },
        {
          "type": "subheading",
          "text": "Worked Example: Two-Sample Z-Test for Proportions"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical study evaluating a new digital learning module. Group 1 consists of 200 students using the module, where 140 passed the final assessment ($\\hat{p}_1 = 140/200 = 0.70$). Group 2 consists of 250 students using traditional instruction, where 150 passed ($\\hat{p}_2 = 150/250 = 0.60$). We wish to test if the pass rate differs significantly at the $\\alpha = 0.05$ level. First, the pooled proportion is $\\hat{p}_c = (140 + 150) / (200 + 250) = 290 / 450 \\approx 0.6444$. The standard error of the difference using the pooled proportion is $SE = \\sqrt{\\hat{p}_c(1-\\hat{p}_c)(1/n_1 + 1/n_2)} = \\sqrt{0.6444(0.3556)(1/200 + 1/250)} \\approx \\sqrt{0.2291(0.005 + 0.004)} = \\sqrt{0.002062} \\approx 0.0454$. The test statistic is $z = (0.70 - 0.60) / 0.0454 = 0.10 / 0.0454 \\approx 2.20$. The two-sided P-value is $2P(Z \\ge 2.20) \\approx 2(0.0139) = 0.0278$. Since $0.0278 < 0.05$, we reject the null hypothesis and conclude there is a statistically significant difference in pass rates."
        },
        {
          "type": "subheading",
          "text": "Common Misconceptions and Statistical vs. Practical Significance"
        },
        {
          "type": "text",
          "text": "A frequent mistake is failing to use the pooled proportion $\\hat{p}_c$ during a significance test for the difference between two proportions. While confidence intervals use separate standard errors based on $\\hat{p}_1$ and $\\hat{p}_2$, hypothesis tests under the null hypothesis $p_1 = p_2$ assume the underlying proportions are identical, requiring the pooled estimate. Another critical distinction is between statistical significance and practical significance. With very large sample sizes, even a minuscule difference like $\\hat{p}_1 - \\hat{p}_2 = 0.02$ can yield a tiny P-value and statistical significance, yet have virtually no real-world importance. Analysts must always examine the confidence interval to assess the plausible magnitude of the effect size rather than relying solely on the P-value."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application in Experimental Research"
        },
        {
          "type": "text",
          "text": "In professional research settings, comparing two proportions allows scientists to evaluate medical treatments, marketing strategies, and educational interventions. For instance, suppose a pharmaceutical company tests a new vaccine on 1,000 volunteers randomly assigned to receive either the vaccine or a placebo. By calculating a two-sample $z$ interval for $p_1 - p_2$, the researchers can state with $95\\%$ confidence the plausible range of reduction in infection rates. Even if the sample proportions show a positive effect, verifying that random assignment was properly executed ensures that confounding variables do not undermine causal claims, bridging the gap between descriptive statistics and valid causal inference."
        }
      ],
      "practiceQuestions": [
        {
          "question": "Which of the following conditions is required for checking the large counts assumption when performing a two-sample z-test for comparing two proportions?",
          "choices": [
            "Both sample sizes must be greater than or equal to 30.",
            "The expected number of successes and failures in both samples must each be at least 10 using the pooled proportion.",
            "The population standard deviations must be known.",
            "The data must be collected using a stratified random sample with equal allocation."
          ],
          "answer": 1,
          "explanation": "When conducting a significance test for comparing two proportions, the null hypothesis assumes the two population proportions are equal. Therefore, we pool the sample data to estimate this common proportion and verify that all expected counts of successes and failures are at least 10, ensuring the sampling distribution of the difference is approximately normal.",
          "id": "ap-statistics-3-3-q1",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Suppose a study finds a statistically significant difference between two teaching methods with a P-value of $0.001$ based on a sample of 10,000 students, showing a $1\\%$ higher pass rate for the new method. Which interpretation is most accurate?",
          "choices": [
            "The new method causes a massive improvement in student comprehension.",
            "The result is statistically significant, but the actual magnitude of the difference may lack practical significance.",
            "The null hypothesis must be retained because a $1\\%$ difference is too small to calculate.",
            "The confidence level for the interval estimate must be decreased to 90%."
          ],
          "answer": 1,
          "explanation": "Very large sample sizes can yield extremely small P-values for trivial effect sizes. While the result is highly statistically significant, a $1\\%$ difference may have very little practical significance in an educational setting, demonstrating why effect size estimation via confidence intervals is vital.",
          "id": "ap-statistics-3-3-q2",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "In a hypothetical study, Group 1 has 50 successes out of 100 trials, and Group 2 has 40 successes out of 100 trials. What is the value of the pooled sample proportion $\\hat{p}_c$ used in a hypothesis test?",
          "choices": [
            "0.45",
            "0.50",
            "0.40",
            "0.90"
          ],
          "answer": 0,
          "explanation": "The pooled sample proportion is calculated by combining the successes from both samples and dividing by the total number of trials across both samples. Here, total successes = $50 + 40 = 90$, and total trials = $100 + 100 = 200$. Thus, $\\hat{p}_c = 90 / 200 = 0.45$.",
          "id": "ap-statistics-3-3-q3",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Why do confidence intervals for the difference between two proportions use separate sample proportions ($\\hat{p}_1$ and $\\hat{p}_2$) rather than a pooled proportion?",
          "choices": [
            "Because confidence intervals estimate an unknown difference without assuming the null hypothesis that $p_1 = p_2$ is true.",
            "Because pooled proportions cannot be calculated for confidence intervals.",
            "Because separate proportions guarantee that the margin of error will always be smaller.",
            "Because pooled proportions are only used when sample sizes are unequal."
          ],
          "answer": 0,
          "explanation": "A confidence interval does not assume that the two population proportions are equal; instead, it estimates their actual difference. The pooled proportion is only appropriate under the assumption of the null hypothesis in a significance test where $p_1 = p_2$.",
          "id": "ap-statistics-3-3-q4",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-3-4-lesson",
      "title": "3.4 Two-way tables and chi-square tests for homogeneity and independence",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Two-way tables and chi-square tests for homogeneity and independence"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Definitions in Categorical Analysis"
        },
        {
          "type": "text",
          "text": "When analyzing categorical data arranged in contingency tables, we must clearly distinguish between a parameter and a statistic. A parameter is a fixed, unknown numerical value that describes a characteristic of an entire population, such as the true population proportion $p$ or a true population distribution across categories. A statistic is a known numerical value calculated from a sample, such as a sample proportion $\\hat{p}$ or sample counts used to populate a two-way table. Furthermore, we must carefully differentiate between random sampling and random assignment: random sampling allows us to generalize our findings from a sample to a broader population, whereas random assignment allows us to infer cause-and-effect relationships between variables by evenly distributing confounding factors across treatment groups. In the context of two-way tables, we evaluate categorical associations rather than linear relationships, meaning an observed association does not automatically imply causation unless proper random assignment was utilized during data collection."
        },
        {
          "type": "subheading",
          "text": "Chi-Square Tests of Homogeneity and Independence"
        },
        {
          "type": "text",
          "text": "Two-way tables allow us to analyze the relationship between two categorical variables using the chi-square statistic $\\chi^2 = \\sum \\frac{(O - E)^2}{E}$, where $O$ represents the observed cell counts and $E$ represents the expected cell counts under the null hypothesis. We must distinguish between two primary tests: the chi-square test of homogeneity, which investigates whether multiple independent populations share the same distribution of a single categorical variable (using separate random samples for each population), and the chi-square test of independence, which investigates whether two categorical variables are associated within a single population (using a single random sample). Both tests use the degrees of freedom formula $df = (r - 1)(c - 1)$, where $r$ is the number of rows and $c$ is the number of columns in the contingency table. It is crucial to note that these procedures differ fundamentally from a chi-square goodness-of-fit test, which evaluates whether a single categorical variable matches a specified population distribution using a one-way table."
        },
        {
          "type": "subheading",
          "text": "Step-by-Step Worked Example of a Chi-Square Test"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical random sample of 200 students. We ask their preferred study format (Visual, Audio, Hands-on) and record their grade level (Freshman or Senior). These labels describe preferences, not evidence that a person learns best in one fixed style. The observed counts are Freshmen: 40, 30, 30; Seniors: 20, 40, 40. Both row totals are 100; column totals are 60, 70, 70. Under independence, expected counts in each row are 30, 35, 35. Every expected count exceeds 5. The statistic is $\\chi^2 = 2(100/30 + 25/35 + 25/35) = 9.5238$. With $df = (2-1)(3-1) = 2$, the upper-tail probability is approximately 0.00855. At $\\alpha = 0.05$, reject independence: the sample provides evidence that grade level and preferred format are associated. Random sampling supports population inference; this observational survey does not establish that grade level causes a preference."
        },
        {
          "type": "subheading",
          "text": "Approximation Conditions and Common Mistakes"
        },
        {
          "type": "text",
          "text": "Before performing any chi-square test, we must verify the technical conditions required for the sampling distribution of the $\\chi^2$ statistic to be well-approximated by the chi-square distribution. The required conditions are: (1) The data must come from a random sample or randomized experiment, (2) Individual observations must be independent, meaning sampling without replacement must satisfy the 10 percent condition ($n \\le 0.10 N$), and (3) All expected cell counts must be at least 5 ($E \\ge 5$). A common mistake is checking observed cell counts instead of expected cell counts against the threshold of 5. Another frequent error is confusing the null hypothesis of independence with a claim of causation, or confusing a statistically significant result with practical significance. Statistical significance simply indicates that an observed departure from independence is unlikely to be due to random chance alone, whereas practical significance evaluates whether the magnitude of the association is large enough to matter in a real-world context."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application in Research"
        },
        {
          "type": "text",
          "text": "In professional research settings, contingency table analysis and chi-square tests are frequently applied to evaluate survey data, clinical trial outcomes, and market research metrics. For instance, a public health researcher might conduct a chi-square test of homogeneity to determine whether the proportion of patients experiencing a specific symptom reduction differs across four different regional hospitals, each providing independent random samples of patients. By ensuring that all expected cell counts meet the minimum requirement of 5 and properly interpreting the resulting $p$-value against a predetermined significance level, the researcher can make rigorous inferences regarding population distributions. Analysts must always remain mindful that failing to reject the null hypothesis does not prove independence; it merely indicates that the sample data do not provide convincing evidence to warrant rejecting the assumption of no association."
        }
      ],
      "practiceQuestions": [
        {
          "question": "Which of the following best describes the fundamental difference between a chi-square test of homogeneity and a chi-square test of independence?",
          "choices": [
            "Homogeneity uses a single population sample to test association between two variables, whereas independence uses multiple independent samples to compare distributions.",
            "Homogeneity compares the distribution of a categorical variable across multiple populations using separate random samples, whereas independence tests for an association between two categorical variables using a single random sample.",
            "Homogeneity evaluates whether a single categorical variable matches a theoretical distribution, whereas independence compares two distinct populations.",
            "Homogeneity requires expected cell counts to be at least 10, whereas independence requires expected cell counts to be at least 5."
          ],
          "answer": 1,
          "explanation": "A chi-square test of homogeneity is used to determine whether different populations (independent samples) share the same distribution of a categorical variable. Conversely, a chi-square test of independence evaluates whether two categorical variables are associated within a single population using one random sample. Therefore, the response “Homogeneity compares the distribution of a categorical variable across multiple populations using separate random samples, whereas independence tests for an association between two categorical variables using a single random sample” is the accurate distinction, while the other choices misstate the definitions or conditions.",
          "id": "ap-statistics-3-4-q1",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "In a study analyzing the relationship between pet ownership (Dog, Cat, None) and housing type (Apartment, House) using a two-way table with 3 rows and 2 columns, what is the correct number of degrees of freedom for the chi-square test statistic?",
          "choices": [
            "1",
            "2",
            "5",
            "6"
          ],
          "answer": 1,
          "explanation": "The degrees of freedom for a chi-square test involving a two-way contingency table is calculated using the formula $df = (r - 1)(c - 1)$, where $r$ is the number of rows and $c$ is the number of columns. Here, we have 3 rows and 2 columns. Substituting these values gives $df = (3 - 1)(2 - 1) = (2)(1) = 2$. Thus, the correct number of degrees of freedom is 2.",
          "id": "ap-statistics-3-4-q2",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "An educational researcher conducts a chi-square test of independence between extracurricular participation and standardized test performance categories, yielding a test statistic of $\\chi^2 = 14.82$ with a corresponding $p$-value of $0.0006$. Which of the following is the most appropriate conclusion?",
          "choices": [
            "Since the $p$-value is very small, we fail to reject the null hypothesis and conclude that extracurricular participation causes higher standardized test scores.",
            "Since the $p$-value is less than standard significance levels, we reject the null hypothesis and conclude there is convincing statistical evidence of an association between extracurricular participation and test performance.",
            "Since the $p$-value is less than 0.05, we accept the null hypothesis that extracurricular participation and test performance are completely independent.",
            "Since the study used observational data, the small $p$-value proves that joining extracurricular activities guarantees improved test scores."
          ],
          "answer": 1,
          "explanation": "A very small $p$-value ($0.0006$) provides strong evidence against the null hypothesis of independence, leading us to reject $H_0$ and conclude that an association exists. the response “Since the $p$-value is less than standard significance levels, we reject the null hypothesis and conclude there is convincing statistical evidence of an association between extracurricular participation and test performance” correctly avoids claiming causation from observational data and correctly interprets the meaning of rejecting the null hypothesis, whereas the other choices misinterpret $p$-values or improperly claim causation.",
          "id": "ap-statistics-3-4-q3",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "When checking the technical conditions for performing a chi-square test for categorical data, which of the following practices is strictly required?",
          "choices": [
            "Verifying that all observed cell counts in the contingency table are greater than or equal to 5.",
            "Verifying that all expected cell counts calculated under the null hypothesis are greater than or equal to 5.",
            "Verifying that the quantitative data follow a normal distribution before calculating the chi-square statistic.",
            "Verifying that the sample size is greater than 30 regardless of the number of cells in the table."
          ],
          "answer": 1,
          "explanation": "The validity of the chi-square approximation relies heavily on the expected cell counts rather than the observed counts. Specifically, all expected cell counts must be at least 5 for the chi-square distribution to accurately model the test statistic. Checking observed counts or requiring a blanket sample size of 30 ignores table dimensions and expected frequencies.",
          "id": "ap-statistics-3-4-q4",
          "domain": "Stats: Inference for Categorical Data: Proportions",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-4-1-lesson",
      "title": "4.1 One-sample t intervals and tests with conditions",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "One-sample t intervals and tests with conditions"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Definitions"
        },
        {
          "type": "text",
          "text": "Before constructing one-sample $t$ intervals or tests, students must distinguish between a population parameter (e.g., $\\mu$, the true mean) and a sample statistic (e.g., $\\bar{x}$, the sample mean). The $t$-statistic is defined as $t = \\frac{\\bar{x} - \\mu_0}{s/\\sqrt{n}}$, where $s$ is the sample standard deviation. Unlike $z$-statistics, which assume a known population standard deviation $\\sigma$, the $t$-statistic accounts for the additional uncertainty introduced by estimating $\\sigma$ with $s$. The degrees of freedom ($df$) for a one-sample $t$ procedure are $n-1$. This distinction is critical because the $t$-distribution has heavier tails than the standard normal distribution, providing a more conservative estimate of uncertainty for small samples."
        },
        {
          "type": "subheading",
          "text": "Conditions for Inference"
        },
        {
          "type": "text",
          "text": "Valid inference using one-sample $t$ procedures requires three conditions. First, the **Random Condition**: Data must be collected via a simple random sample (SRS) or a randomized experiment. If it is a sample, it should be less than 10% of the population to ensure independence. Second, the **Normal Condition**: The population distribution should be approximately normal, or the sample size should be large enough ($n \\ge 30$) for the Central Limit Theorem to apply. For smaller samples ($n < 30$), we inspect the sample data for severe skewness or outliers. If the data show no strong skew or outliers, the $t$-procedures are robust enough to proceed. For paired data, analyze the differences within pairs and check the conditions on those differences, not separately on the before and after variables. Regression residuals are a different object and should not be treated as an independent paired-difference sample."
        },
        {
          "type": "subheading",
          "text": "Step-by-Step Construction of a Confidence Interval"
        },
        {
          "type": "text",
          "text": "To construct a confidence interval for a population mean $\\mu$:\n1. **Identify**: State the parameter $\\mu$ and the confidence level (e.g., 95%).\n2. **Check**: Verify the Random and Normal conditions.\n3. **Calculate**: Compute the sample mean $\\bar{x}$ and standard deviation $s$. Determine critical value $t^*$ using $df = n-1$ and the desired confidence level. Calculate the standard error $SE = s/\\sqrt{n}$.\n4. **Interval**: Compute the margin of error $ME = t^* \\times SE$. The interval is $\\bar{x} \\pm ME$.\n5. **Interpret**: Phrase the result as: \"We are [Confidence Level]% confident that the interval from [Lower Bound] to [Upper Bound] captures the true population mean $\\mu$.\"\nNote: Do not say there is a 95% probability that $\\mu$ is in the interval; $\\mu$ is fixed, but the interval varies from sample to sample."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Misinterpretations"
        },
        {
          "type": "text",
          "text": "A frequent error is treating a P-value as the probability that the null hypothesis is true. Correctly, the P-value is the probability of observing data as extreme as collected, assuming $H_0$ is true. Another mistake is ignoring the conditions; applying $t$-tests to highly skewed small samples leads to inaccurate P-values. Students often confuse statistical significance with practical significance. A result may be statistically significant (low P-value) due to a large sample size, but the effect size might be trivial in real-world contexts. Lastly, ensure the distinction between \"high confidence\" (method reliability) and \"high probability for a specific interval\" (which is either 0 or 1, though unknown). When reporting results, explicitly state whether the conditions for inference were met or violated."
        },
        {
          "type": "subheading",
          "text": "Application to Hypothesis Testing"
        },
        {
          "type": "text",
          "text": "To perform a one-sample $t$-test:\n1. **Hypotheses**: $H_0: \\mu = \\mu_0$ vs. $H_a: \\mu \\neq \\mu_0$ (or $<$ or $>$).\n2. **Assumptions**: Check Random/Normal conditions.\n3. **Calculations**: Compute $t$-statistic and find the P-value using the $t$-distribution with $df = n-1$.\n4. **Decision**: Compare P-value to significance level $\\alpha$. If $P < \\alpha$, reject $H_0$.\n5. **Conclusion**: State in context: \"There is sufficient evidence to suggest the population mean is different from $\\mu_0$.\"\nExample: If testing if average sleep is above 8 hours, and $t = 2.1$ with $df=14$, the P-value is approx 0.03. If $\\alpha=0.05$, we reject $H_0$. This does not prove the mean is exactly 8.5 hours, only that it is significantly greater than 8."
        }
      ],
      "practiceQuestions": [
        {
          "question": "A researcher takes a simple random sample of 24 high school students and finds their average systolic blood pressure is 112 mmHg with a standard deviation of 14 mmHg. The distribution of blood pressures in the population is slightly right-skewed without outliers. Which condition check is most relevant for validating the use of a one-sample t-interval?",
          "choices": [
            "The sample size is greater than 30, so the Central Limit Theorem guarantees normality.",
            "The sample is an SRS, but since n < 30 and there is skewness, the t-procedure may be unreliable.",
            "The population standard deviation is known, so a z-interval should be used instead.",
            "The data must be transformed to make it normal before constructing the interval."
          ],
          "answer": 1,
          "explanation": "The sample size is 24, which is less than 30. While the Random condition is met, the Normal condition is questionable due to the right skew. T-procedures are robust to moderate skew, but with a small n, the slight skew can impact accuracy. the response “The sample size is greater than 30, so the Central Limit Theorem guarantees normality” is false (n<30). the response “The population standard deviation is known, so a z-interval should be used instead” is false (sigma is unknown). the response “The data must be transformed to make it normal before constructing the interval” is not a standard required condition for t-tests.",
          "id": "ap-statistics-4-1-q1",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "In constructing a 95% confidence interval for a mean, if the calculated t-statistic is 1.8 and the degrees of freedom are 19, what is the approximate critical value t* used for the margin of error?",
          "choices": [
            "1.729",
            "1.960",
            "2.093",
            "2.539"
          ],
          "answer": 2,
          "explanation": "The critical value t* depends on the confidence level and degrees of freedom (df), not the sample t-statistic. For a 95% confidence level with df = 19, we look up the t-distribution table. The value corresponding to 0.025 in the upper tail with 19 df is approximately 2.093. the response “1.729” is for df=24, the response “1.960” is the z-value (infinite df), and the response “2.539” is for a 99% confidence level or lower df.",
          "id": "ap-statistics-4-1-q2",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A hypothesis test yields a P-value of 0.02 for a one-sample t-test. A student concludes: \"There is a 2% chance that the null hypothesis is true.\" Which statement correctly identifies the error?",
          "choices": [
            "The P-value calculation is incorrect for a one-sample t-test.",
            "The student confuses the P-value with the conditional probability of H0 being true.",
            "The significance level alpha should be set to 0.05 to make the result valid.",
            "The student should have used a z-test instead of a t-test."
          ],
          "answer": 1,
          "explanation": "The P-value is P(Data | H0 is true), not P(H0 is true | Data). It measures the likelihood of seeing such extreme data if the null were correct. It does not provide the probability that the null hypothesis itself is true. the response “The significance level alpha should be set to 0.05 to make the result valid” accurately identifies this Bayesian vs. frequentist confusion. The other choices address unrelated procedural or calculation issues.",
          "id": "ap-statistics-4-1-q3",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Why do t-intervals have heavier tails than z-intervals, and how does this affect the margin of error for small samples?",
          "choices": [
            "T-intervals account for the variability in estimating sigma with s, leading to larger critical values.",
            "T-intervals assume the population is not normal, which increases the standard error.",
            "Z-intervals are only valid for sample sizes greater than 100, making them narrower.",
            "The t-distribution converges to the normal distribution as n decreases."
          ],
          "answer": 0,
          "explanation": "The t-distribution has heavier tails because replacing the known population standard deviation sigma with the random statistic s adds uncertainty. This extra uncertainty requires larger critical values (t* > z*) to maintain the same confidence level, resulting in wider intervals (larger margins of error) for small samples. As n increases, s becomes a better estimate, and t* approaches z*. the response “The t-distribution converges to the normal distribution as n decreases” is false; t converges to z as n increases.",
          "id": "ap-statistics-4-1-q4",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-4-2-lesson",
      "title": "4.2 Paired designs and inference for a mean difference",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Paired designs and inference for a mean difference"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Parameter Definition"
        },
        {
          "type": "text",
          "text": "In statistics, comparing two sets of measurements requires understanding whether the data come from independent groups or a paired design. A paired design involves dependent samples, such as before-and-after measurements on the same experimental units or matched pairs. Instead of analyzing two separate group means, we focus on a single set of differences computed for each pair. Let $X_1$ and $X_2$ represent the paired observations. We define the difference for each pair as $d_i = X_{1i} - X_{2i}$. The parameter of interest is the true mean difference in the population, denoted as $\\mu_d$. The corresponding sample statistic is the mean of the observed differences, denoted as $\\bar{x}_d$. Distinguishing between the parameter $\\mu_d$ and the statistic $\\bar{x}_d$ is vital because inference procedures aim to estimate or test claims about the population parameter based on the sample evidence."
        },
        {
          "type": "subheading",
          "text": "Methodology and Conditions for Inference"
        },
        {
          "type": "text",
          "text": "To conduct inference for a mean difference $\\mu_d$, we use a one-sample t-procedure applied to the sample differences $d_i$. The conditions for valid inference include checking for random sampling or a randomized paired experiment, which allows generalization or causal inference respectively. We also must verify the Normal/Large Sample condition. This condition is met if the population of differences is normally distributed or if the sample size $n$ of pairs is at least 30. For smaller sample sizes, we examine a graphical display like a boxplot or normal probability plot of the sample differences to ensure there is no extreme skewness or severe outliers that would invalidate the t-distribution approximation."
        },
        {
          "type": "subheading",
          "text": "Multi-Step Worked Example"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical study evaluating a professional development workshop for high-school teachers. A random sample of $n = 10$ teachers took a standardized pedagogy assessment before and after the workshop. Suppose the distribution of differences is approximately normal with no extreme outliers. The sample mean difference in scores (After minus Before) was $\\bar{x}_d = 4.2$ points, with a sample standard deviation of $s_d = 2.5$ points. We wish to test the hypotheses $H_0: \\mu_d = 0$ versus $H_a: \\mu_d > 0$ at the $\\alpha = 0.05$ level. First, calculate the standard error of the mean difference: $SE(\\bar{x}_d) = \\frac{s_d}{\\sqrt{n}} = \\frac{2.5}{\\sqrt{10}} \\approx 0.7906$. Next, compute the t-test statistic: $t = \\frac{\\bar{x}_d - 0}{SE(\\bar{x}_d)} = \\frac{4.2}{0.7906} \\approx 5.31$. With $df = n - 1 = 9$, the corresponding p-value is extremely small, well below 0.001. Therefore, we reject the null hypothesis and conclude there is convincing statistical evidence that mean after-workshop scores exceed mean before-workshop scores in the population sampled. Because there is no randomized comparison group, this before-and-after study alone cannot establish that the workshop caused the increase; practice effects and other changes remain possible."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Critical Distinctions"
        },
        {
          "type": "text",
          "text": "A frequent error in paired inference is treating the data as independent two-sample means rather than paired observations. Treating paired data as two independent samples ignores the dependence created by the pairing and uses the wrong standard-error model. Effective matching often produces positive within-pair association, but pairing alone does not guarantee that the observed correlation is positive. Another critical distinction is the difference between statistical significance and practical significance. With a very large sample size of pairs, a tiny mean difference $\\mu_d$ can yield a statistically significant p-value, even if the actual numerical improvement is trivial in a real-world context. Analysts must evaluate the confidence interval alongside the p-value to determine whether the effect size matters practically."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application to Experimental Design"
        },
        {
          "type": "text",
          "text": "Paired designs are powerful tools in comparative experiments because they naturally control for confounding variables by comparing a subject to itself or a closely matched twin. When matching removes substantial between-unit variation, the differences can have less variability and the design can be more precise than an otherwise comparable independent-groups design. The gain depends on the quality of the pairing; it is not guaranteed for every pair definition. When designing such studies, researchers must ensure proper random assignment of the treatment order within pairs (such as which condition comes first) to prevent confounding due to learning or fatigue effects over time. Once properly collected, the differences are analyzed using standard t-intervals to estimate the precise magnitude of the effect."
        }
      ],
      "practiceQuestions": [
        {
          "question": "In a study comparing fuel efficiency using two different types of motor oil in ten identical test cars, why is a paired t-procedure preferred over a two-sample t-procedure?",
          "choices": [
            "A paired design eliminates between-car variability by comparing both oils within the same car, reducing standard error.",
            "A paired design guarantees that the sample size will always be greater than 30 for both groups combined.",
            "A paired design completely removes the need to check for normality or shape of the sample differences.",
            "A paired design changes the parameter of interest from a mean difference to the difference of two independent population proportions."
          ],
          "answer": 0,
          "explanation": "A paired design is specifically structured to control for confounding subject-to-subject variability by evaluating the two treatments on the exact same experimental unit. This internal comparison reduces the variability of the sample differences, resulting in a smaller standard error and greater power to detect a true average difference between the two treatments compared to independent sampling.",
          "id": "ap-statistics-4-2-q1",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "A researcher conducts a paired t-test on $n = 15$ matched pairs and obtains a test statistic of $t = 2.145$. What is the correct conclusion regarding the null hypothesis $H_0: \\mu_d = 0$ versus a two-sided alternative at the significance level $\\alpha = 0.05$?",
          "choices": [
            "Fail to reject the null hypothesis because the test statistic does not exceed the critical value for 15 degrees of freedom.",
            "Reject the null hypothesis because the absolute value of the test statistic exceeds the critical t-value for 14 degrees of freedom.",
            "Accept the null hypothesis as true because a two-sided test requires a t-value greater than 3.00 for significance.",
            "Conclude that the population mean difference is exactly equal to zero with 95 percent confidence."
          ],
          "answer": 1,
          "explanation": "For a sample of $n = 15$ pairs, the degrees of freedom are $df = 15 - 1 = 14$. The critical t-value for a two-tailed test at $\\alpha = 0.05$ with 14 degrees of freedom is approximately $2.145$. Because the calculated t-statistic equals or exceeds this critical threshold, the p-value is less than 0.05, providing sufficient evidence to reject the null hypothesis in favor of the two-sided alternative.",
          "id": "ap-statistics-4-2-q2",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which of the following conditions must be reasonably satisfied before performing a confidence interval for a population mean difference $\\mu_d$?",
          "choices": [
            "The two independent sample sizes must both be exactly equal to 50 or more.",
            "The sample differences must be obtained using random sampling or a randomized paired experiment, and the normality condition must be checked.",
            "The population standard deviation $\\sigma_d$ must be known precisely prior to collecting any sample data.",
            "The underlying distribution of both individual treatment groups must be heavily skewed to the right."
          ],
          "answer": 1,
          "explanation": "Valid inference for a mean difference requires that the data are collected properly via random sampling or a randomized experiment to ensure independence and lack of bias. Additionally, we must verify the normality condition, either by knowing the population of differences is normal or by having a large enough sample size (typically $n \\ge 30$) or checking for absence of severe skewness and outliers when $n$ is small.",
          "id": "ap-statistics-4-2-q3",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Suppose a hypothesis test for a mean difference yields a p-value of $0.0002$ with a sample of $n = 500$ pairs, showing that a new software tool reduces task completion time by an average of $\\bar{x}_d = 0.4$ seconds. Which statement best interprets these findings?",
          "choices": [
            "The result is statistically significant but may lack practical significance due to the trivial magnitude of the time reduction combined with a large sample size.",
            "The result lacks statistical significance because the time reduction is less than one full second.",
            "The small p-value proves that the software causes a major, highly impactful improvement in workflow efficiency.",
            "The large sample size invalidates the paired t-test because central limit theorem rules do not apply to paired data."
          ],
          "answer": 0,
          "explanation": "Statistical significance depends heavily on sample size. With $n = 500$, even a tiny average difference of $0.4$ seconds can produce a very small p-value, leading to rejection of the null hypothesis. However, an average savings of 0.4 seconds may be entirely unimportant in a practical workplace setting, highlighting the critical distinction between statistical significance and practical importance.",
          "id": "ap-statistics-4-2-q4",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-4-3-lesson",
      "title": "4.3 Independent two-sample means, uncertainty, and interpretation",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Independent two-sample means, uncertainty, and interpretation"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Parameter Definitions"
        },
        {
          "type": "text",
          "text": "Students must distinguish parameters from statistics. The population parameter of interest is the difference between two unknown means, $\\mu_1 - \\mu_2$. The sample statistic is $\\bar{x}_1 - \\bar{x}_2$. Independent samples require that the selection of individuals in Sample 1 does not influence Sample 2. This design is crucial for estimating the net effect of a treatment or comparing two distinct groups. Unlike paired data, where subjects are matched, independent designs treat each group's variance separately. Students should recall that standard error quantifies the variability of the sample statistic, not the population."
        },
        {
          "type": "subheading",
          "text": "Approximation Conditions and Method"
        },
        {
          "type": "text",
          "text": "To construct a confidence interval for an independent two-sample $t$ interval, three conditions must be met. First, Random: Data collected via random sampling with values mutually independent. Second, Normal: If $n < 15$, data should be roughly normal without strong outliers. If $15 \\leq n < 30$, data must not be strongly skewed or have outliers. If $n \\geq 30$, the Central Limit Theorem applies. Third, Independent: If sampling without replacement, each sample size must be less than 10% of its population. The method calculates the standard error as $SE = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}$. The degrees of freedom can be approximated using the smaller of $n_1-1$ and $n_2-1$ for a conservative estimate, or via calculator technology for precision."
        },
        {
          "type": "subheading",
          "text": "Multi-Step Worked Example"
        },
        {
          "type": "text",
          "text": "Consider two hypothetical groups: Group A ($n_1=25, \\bar{x}_1=52, s_1=8$) and Group B ($n_2=30, \\bar{x}_2=48, s_2=9$). We want a 95% confidence interval for $\\mu_1 - \\mu_2$. Step 1: Check conditions. Suppose the groups are independent random samples from populations larger than ten times their sample sizes. Inspect both groups for strong skew or outliers; assume those checks support the t model. Unimodality alone would not rule out severe skew. Step 2: Calculate point estimate. $\\bar{x}_1 - \\bar{x}_2 = 52 - 48 = 4$. Step 3: Calculate Standard Error. $SE = \\sqrt{\\frac{64}{25} + \\frac{81}{30}} = \\sqrt{2.56 + 2.7} = \\sqrt{5.26} \\approx 2.29$. Step 4: Find critical $t^*$. Using $df = 24$ (conservative $df = n_1-1$), $t^* = 2.064$. Step 5: Calculate margin of error. $ME = 2.064 \\times 2.29 \\approx 4.73$. Step 6: Construct interval. $4 \\pm 4.73 = (-0.73, 8.73)$. The interval contains zero, so this conservative interval does not establish a nonzero population mean difference at the 95% confidence level. This is not proof that the means are identical."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Conditions"
        },
        {
          "type": "text",
          "text": "A frequent error is assuming a 95% confidence level means there is a 95% probability that a specific parameter lies within the calculated interval. In reality, the parameter is fixed; the interval varies from sample to sample. We are 95% confident in the *method*. Another mistake is pairing independent data incorrectly, which inflates degrees of freedom and shrinks standard errors artificially. Students must also distinguish statistical significance from practical significance. A small, statistically significant difference may be negligible in real-world context if the effect size is tiny compared to natural variability."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application"
        },
        {
          "type": "text",
          "text": "Consider independent random samples from two stated response-time populations: Layout 1 has n₁=40, x-bar₁=2.1 seconds, and s₁=0.5 seconds; Layout 2 has n₂=45, x-bar₂=2.4 seconds, and s₂=0.6 seconds. Assume independence, suitable sampling fractions, and shape checks supporting a two-sample t procedure. The point estimate is −0.3 seconds. The estimated standard error is √(0.25/40+0.36/45)=√0.01425≈0.11937 seconds. Welch degrees of freedom are approximately 82.675, giving a 95% critical t value near 1.989. The margin is approximately 1.989(0.11937)=0.2374 seconds, so the interval is approximately (−0.5374,−0.0626) seconds. The interval supports a negative population mean difference under the assumptions. Whether a mean difference of 0.3 seconds matters depends on the decision; these summary statistics do not establish that it is practically negligible or that layout itself causes the difference."
        }
      ],
      "practiceQuestions": [
        {
          "question": "In the worked example, why was the conservative degrees of freedom ($df=24$) chosen over the pooled or calculator value?",
          "choices": [
            "To ensure the critical value is larger, making the interval wider and safer for inference",
            "To match the sample size of the larger group for symmetry",
            "To assume the population variances are equal for simplification",
            "To use the standard normal distribution as a baseline"
          ],
          "answer": 0,
          "explanation": "The conservative method uses the smaller $n-1$ to guarantee the $t$-critical value is not underestimated. A larger $t^*$ increases the margin of error, creating a wider interval. This ensures the confidence level is maintained even if variances are unequal, providing a robust lower bound for the true interval width without relying on complex technology.",
          "id": "ap-statistics-4-3-q1",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "For a simple random sample without replacement that is a substantial fraction of a finite population, what generally happens if a standard-error calculation ignores the finite-population correction?",
          "choices": [
            "It overestimates sampling variability, producing an unnecessarily large standard error.",
            "The standard error becomes infinite.",
            "The sample mean automatically becomes zero.",
            "The degrees of freedom automatically remove all dependence."
          ],
          "answer": 0,
          "explanation": "Without-replacement sampling from a finite population reduces sampling variability relative to the independent-draw model. The finite-population correction is below one. Ignoring it therefore gives a larger standard error than the finite-population calculation. The usual 10% guideline identifies when that dependence can often be neglected approximately.",
          "id": "ap-statistics-4-3-q2",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which statement correctly interprets a 95% confidence interval of $(2.1, 4.5)$ for the difference in means?",
          "choices": [
            "There is a 95% probability that the true difference lies between 2.1 and 4.5",
            "We are 95% confident that the method used captures the true difference in this specific interval",
            "95% of all possible samples will produce means within this specific range",
            "The true difference is exactly 3.3, which is the midpoint of the interval"
          ],
          "answer": 1,
          "explanation": "Confidence refers to the reliability of the procedure. Since the parameter is fixed, it cannot have a probability. We say we are 95% confident in the result because if we repeated the sampling process many times, 95% of the constructed intervals would contain the true parameter. This option correctly attributes the confidence to the method's long-run success rate for this specific instance.",
          "id": "ap-statistics-4-3-q3",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "In the marketing application, the interval $(-0.51, -0.09)$ indicates what about the null hypothesis $H_0: \\mu_1 - \\mu_2 = 0$?",
          "choices": [
            "We fail to reject $H_0$ because the intervals overlap visually in other contexts",
            "We reject $H_0$ at the $\\alpha = 0.05$ level because zero is not in the interval",
            "We cannot make a decision because the sample sizes are unequal",
            "We accept $H_0$ because the difference is small in magnitude"
          ],
          "answer": 1,
          "explanation": "A 95% confidence interval is equivalent to a two-sided hypothesis test at $\\alpha = 0.05$. If the value hypothesized in the null (zero in this case) is not contained within the confidence interval, the test statistic falls in the rejection region. Therefore, we reject the null hypothesis, concluding there is a statistically significant difference between the two layout response times.",
          "id": "ap-statistics-4-3-q4",
          "domain": "Stats: Inference for Quantitative Data: Means",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-5-1-lesson",
      "title": "5.1 Scatterplots, correlation, and least-squares predictions",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Scatterplots, correlation, and least-squares predictions"
        },
        {
          "type": "subheading",
          "text": "Prerequisites and Definitions"
        },
        {
          "type": "text",
          "text": "In AP Statistics, analyzing bivariate quantitative data begins with visualizing relationships on a scatterplot. We designate the explanatory variable as $x$ and the response variable as $y$. The sample correlation coefficient, denoted $r$, is a statistic that measures the strength and direction of the linear association between two quantitative variables. It ranges from $-1$ to $1$, where a value near zero indicates no linear relationship. The population correlation parameter is denoted by $\\rho$. Crucially, an observed association between $x$ and $y$ does not imply causation, as confounding variables may be present."
        },
        {
          "type": "subheading",
          "text": "Method of Least-Squares Regression"
        },
        {
          "type": "text",
          "text": "To model the linear relationship between $x$ and $y$, we use the least-squares regression line, given by the equation $\\hat{y} = a + bx$. Here, $\\hat{y}$ represents the predicted value of the response variable, $a$ is the $y$-intercept, and $b$ is the slope. The slope $b$ is calculated using the formula $b = r \\frac{s_y}{s_x}$, where $s_y$ and $s_x$ are the standard deviations of the response and explanatory variables, respectively. The least-squares criterion minimizes the sum of the squared residuals, which are the vertical distances between the observed data points and the regression line: $y - \\hat{y}$."
        },
        {
          "type": "subheading",
          "text": "Multi-Step Worked Example"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical study examining the relationship between study hours ($x$) and exam scores ($y$) for a sample of students. Suppose the summary statistics are given as follows: mean of $x$ is $\\bar{x} = 5$, standard deviation of $x$ is $s_x = 2$, mean of $y$ is $\\bar{y} = 75$, standard deviation of $y$ is $s_y = 10$, and the correlation coefficient is $r = 0.8$. First, we calculate the slope $b$: $b = 0.8 \\times (10 / 2) = 0.8 \\times 5 = 4$. Next, we find the $y$-intercept $a$ using the point-slope form with means: $a = \\bar{y} - b\\bar{x} = 75 - (4 \\times 5) = 55$. Thus, the least-squares regression equation is $\\hat{y} = 55 + 4x$. To predict the exam score for a student who studies for 3 hours, we substitute $x = 3$: $\\hat{y} = 55 + 4(3) = 67$."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Conditions"
        },
        {
          "type": "text",
          "text": "A frequent error in regression analysis is misinterpreting the slope and intercept. The slope $b$ represents the estimated average change in the response variable for a one-unit increase in the explanatory variable, not a deterministic rule. Another major pitfall is extrapolation: using the regression model to make predictions for $x$-values far outside the range of the original dataset. Conditions for utilizing a linear model include checking the scatterplot for approximate linearity and ensuring there are no extreme outliers that unduly influence the fit. Finally, remember that statistical significance of a correlation does not automatically guarantee practical significance."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application"
        },
        {
          "type": "text",
          "text": "In real-world applications, researchers utilize least-squares regression across diverse fields such as economics, medicine, and environmental science to forecast trends. For instance, an environmental scientist might model the relationship between carbon emissions and global temperature anomalies. By calculating the regression equation, the scientist can estimate future temperature increases based on projected emission levels. However, analysts must always evaluate residual plots to check model assumptions and remain cautious about lurking variables that could invalidate causal claims."
        }
      ],
      "practiceQuestions": [
        {
          "question": "What does the value of the correlation coefficient $r$ explicitly measure?",
          "choices": [
            "The exact cause-and-effect relationship between two categorical variables",
            "The strength and direction of the linear association between two quantitative variables",
            "The exact slope of the least-squares regression line regardless of variable scaling",
            "The proportion of total variation in the response variable explained by the model"
          ],
          "answer": 1,
          "explanation": "The correlation coefficient $r$ is a standardized statistic specifically designed to quantify the strength and direction of a linear relationship between two quantitative variables. It does not measure non-linear relationships, nor does it establish causation or equate to the slope of the regression line without scaling factors.",
          "id": "ap-statistics-5-1-q1",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "In a hypothetical regression analysis, the mean of $x$ is 10, the mean of $y$ is 50, the standard deviation of $x$ is 4, the standard deviation of $y$ is 12, and $r = 0.5$. What is the slope $b$ of the least-squares regression line?",
          "choices": [
            "0.17",
            "1.5",
            "4.0",
            "6.0"
          ],
          "answer": 1,
          "explanation": "The formula for the slope of the least-squares regression line is $b = r (s_y / s_x)$. Substituting the given values yields $b = 0.5 \\times (12 / 4) = 0.5 \\times 3 = 1.5$. Therefore, the correct slope is 1.5, representing the average increase in $y$ per unit increase in $x$.",
          "id": "ap-statistics-5-1-q2",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which of the following describes a major danger when using a least-squares regression model for prediction?",
          "choices": [
            "Calculating the intercept when the explanatory variable equals zero",
            "Extrapolating by predicting values far outside the observed range of the explanatory variable",
            "Minimizing the sum of the squared vertical residuals instead of absolute residuals",
            "Using the sample means of $x$ and $y$ to determine the placement of the regression line"
          ],
          "answer": 1,
          "explanation": "Extrapolation occurs when a model is used to predict values for explanatory variables that fall well outside the range of data used to create the model. This is dangerous because the linear pattern observed locally may not hold true in other regions.",
          "id": "ap-statistics-5-1-q3",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "How is the $y$-intercept ($a$) of the least-squares regression line typically calculated once the slope ($b$) is known?",
          "choices": [
            "By setting $x$ equal to zero and solving for the maximum residual value",
            "By using the equation $a = \\bar{y} - b\\bar{x}$ based on the means of both variables",
            "By taking the product of the standard deviations multiplied by the correlation coefficient",
            "By averaging all the observed response variable values in the sample dataset"
          ],
          "answer": 1,
          "explanation": "The least-squares regression line always passes through the point of averages $(\\bar{x}, \\bar{y})$. Using this property, substituting the means into the linear equation gives $\\bar{y} = a + b\\bar{x}$, which algebraically rearranges to $a = \\bar{y} - b\\bar{x}$.",
          "id": "ap-statistics-5-1-q4",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    },
    {
      "id": "ap-statistics-5-2-lesson",
      "title": "5.2 Residuals, influential points, and model limitations",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Residuals, influential points, and model limitations"
        },
        {
          "type": "subheading",
          "text": "Foundational Definitions of Residuals"
        },
        {
          "type": "text",
          "text": "In regression analysis, a residual represents the vertical distance between an observed data point and the value predicted by the least-squares regression line. Mathematically, the residual for a given observation is calculated as $e_i = y_i - \\hat{y}_i$, where $y_i$ is the actual observed response value and $\\hat{y}_i$ is the predicted response value from the model. A positive residual indicates that the model underestimated the actual value, while a negative residual indicates an overestimate. Examining these prediction errors allows statisticians to evaluate how well a linear model captures the underlying pattern in the data, distinguishing between random noise and systematic departures from linearity. Furthermore, the sum of the residuals in a least-squares linear regression model with an intercept is always zero, which anchors the average prediction error at the center of the dataset."
        },
        {
          "type": "subheading",
          "text": "Methodology for Residual Analysis"
        },
        {
          "type": "text",
          "text": "To rigorously assess the appropriateness of a linear model, analysts construct a residual plot by graphing the residuals $e_i$ on the vertical axis against the explanatory variable $x_i$ (or the predicted values $\\hat{y}_i$) on the horizontal axis. A successful linear model yields a residual plot characterized by a completely random scatter of points centered tightly around the horizontal residual-equals-zero line, with roughly constant vertical spread across all values of the predictor. Conversely, distinct structural patterns in a residual plot, such as a clear curved arc or a funnel shape displaying changing variability, indicate fundamental violations of linearity or homoscedasticity conditions. Identifying these diagnostic signatures prevents misleading predictions and signals when standard linear techniques are inadequate for describing the observed association between variables."
        },
        {
          "type": "subheading",
          "text": "Multi-Step Worked Example of Diagnostic Evaluation"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical study tracking study hours ($x$) and exam scores ($y$) for a sample of students, modeled by the least-squares equation $\\hat{y} = 55 + 4.2x$. Suppose a student studied for $10$ hours and scored an actual grade of $92$. First, compute the predicted score by substituting $x = 10$ into the model: $\\hat{y} = 55 + 4.2(10) = 97$. Second, calculate the residual by subtracting the predicted score from the actual score: $e = 92 - 97 = -5$. Third, interpret this value in context: the student scored $5$ points lower than what the linear model predicted based on their study hours. If this negative residual is part of a systematic downward curve for higher study hours, it warns that the linear assumption may break down at extreme values."
        },
        {
          "type": "subheading",
          "text": "Common Mistakes and Model Limitations"
        },
        {
          "type": "text",
          "text": "A frequent error in regression analysis is confusing outliers in the $y$ direction with points that have high leverage or high influence on the regression line. A high-leverage observation has an x-value far from the center of the observed x-values, so it has the potential to strongly affect a fitted line. Influence is assessed by how much a fit or prediction changes when an observation is removed. A high-leverage point can pull the fitted line toward itself and consequently have a small residual in the full fit while still being highly influential. Compare the fits with and without the point rather than classifying influence solely from leverage and residual size. Students often mistakenly assume that a strong linear correlation guarantees a safe basis for extrapolation, ignoring model limitations. Predicting response values far outside the range of observed $x$-data is statistically hazardous because the linear relationship may not hold beyond the collected evidence."
        },
        {
          "type": "subheading",
          "text": "Transfer and Application in Practical Settings"
        },
        {
          "type": "text",
          "text": "Applied statisticians across fields like economics, environmental science, and medicine rely on residual diagnostics to validate predictive models before deploying them for decision-making. For instance, in real estate modeling where home size predicts market price, failing to check for non-constant variance can lead to severe underestimation of prediction errors for luxury estates. By analyzing residual plots and screening for influential points driven by unique data anomalies, researchers ensure that practical conclusions derived from regression slopes are robust and not driven by a handful of atypical observations. This disciplined workflow bridges theoretical model fitting with responsible, real-world forecasting."
        }
      ],
      "practiceQuestions": [
        {
          "question": "Based on the passage, what is the predicted weekly stress level for an office worker who takes $5$ public transit trips per week?",
          "choices": [
            "$12.5$ units",
            "$19.0$ units",
            "$21.5$ units",
            "$26.1$ units"
          ],
          "answer": 2,
          "explanation": "To find the predicted weekly stress level, substitute the given transit frequency $x = 5$ into the provided least-squares regression equation $\\hat{y} = 12.5 + 1.8x$. Calculating this gives $\\hat{y} = 12.5 + 1.8(5) = 12.5 + 9.0 = 21.5$ units. Therefore, the correct choice is $21.5$ units, which accurately utilizes the model coefficients.",
          "id": "ap-statistics-5-2-q1",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "passage": "Original instructional passage; described studies and figures are hypothetical.\n\nRecent hypothetical investigations into urban commuter habits analyzed the relationship between weekly public transit usage (measured in trips per week, denoted as $x$) and self-reported weekly stress levels (measured on a standardized scale from $0$ to $50$, denoted as $y$) among $200$ downtown office workers. A least-squares regression line was fitted to the sample data, yielding the equation $\\hat{y} = 12.5 + 1.8x$. A residual analysis of the fitted model revealed a symmetric random scatter around the horizontal zero line for transit frequencies between $1$ and $10$ trips per week, with a residual standard deviation of approximately $s = 4.1$ units. However, for a small subset of commuters reporting $15$ or more transit trips per week, the residuals exhibited a distinct downward curvature, and two extreme data points with high leverage showed large negative residuals. These high-leverage points belonged to workers who experienced unique scheduling flexibilities that decoupled long transit times from traditional stress markers. Consequently, researchers concluded that while the linear model performs adequately for moderate commuting frequencies, it fails to capture the flattening of stress accumulation at extreme transit volumes."
        },
        {
          "question": "A hypothetical model predicts weekly stress score from weekly transit trips x as ŷ = 12.5 + 1.8x. A worker has x = 10 and residual e = −2.3, defined as observed minus predicted. What is the observed stress score?",
          "choices": [
            "28.2 units",
            "30.6 units",
            "32.9 units",
            "35.2 units"
          ],
          "answer": 0,
          "explanation": "The predicted score is 12.5 + 1.8(10) = 30.5. Since residual = observed − predicted, observed = predicted + residual = 30.5 − 2.3 = 28.2. A negative residual means the actual observation lies below the prediction, not above it.",
          "id": "ap-statistics-5-2-q2",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "passage": "Original instructional passage; described studies and figures are hypothetical.\n\nRecent hypothetical investigations into urban commuter habits analyzed the relationship between weekly public transit usage (measured in trips per week, denoted as $x$) and self-reported weekly stress levels (measured on a standardized scale from $0$ to $50$, denoted as $y$) among $200$ downtown office workers. A least-squares regression line was fitted to the sample data, yielding the equation $\\hat{y} = 12.5 + 1.8x$. A residual analysis of the fitted model revealed a symmetric random scatter around the horizontal zero line for transit frequencies between $1$ and $10$ trips per week, with a residual standard deviation of approximately $s = 4.1$ units. However, for a small subset of commuters reporting $15$ or more transit trips per week, the residuals exhibited a distinct downward curvature, and two extreme data points with high leverage showed large negative residuals. These high-leverage points belonged to workers who experienced unique scheduling flexibilities that decoupled long transit times from traditional stress markers. Consequently, researchers concluded that while the linear model performs adequately for moderate commuting frequencies, it fails to capture the flattening of stress accumulation at extreme transit volumes."
        },
        {
          "question": "According to the passage, what specific diagnostic pattern was observed for commuters reporting $15$ or more transit trips per week?",
          "choices": [
            "A funnel shape indicating increasing variance",
            "A distinct downward curvature",
            "A horizontal linear cluster with zero residuals",
            "A complete absence of data points in that range"
          ],
          "answer": 1,
          "explanation": "The passage explicitly states that for a small subset of commuters reporting $15$ or more transit trips per week, the residuals exhibited a distinct downward curvature. This indicates that the linear model fails to capture the true underlying relationship at extreme values, demonstrating a systematic departure from linearity.",
          "id": "ap-statistics-5-2-q3",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "passage": "Original instructional passage; described studies and figures are hypothetical.\n\nRecent hypothetical investigations into urban commuter habits analyzed the relationship between weekly public transit usage (measured in trips per week, denoted as $x$) and self-reported weekly stress levels (measured on a standardized scale from $0$ to $50$, denoted as $y$) among $200$ downtown office workers. A least-squares regression line was fitted to the sample data, yielding the equation $\\hat{y} = 12.5 + 1.8x$. A residual analysis of the fitted model revealed a symmetric random scatter around the horizontal zero line for transit frequencies between $1$ and $10$ trips per week, with a residual standard deviation of approximately $s = 4.1$ units. However, for a small subset of commuters reporting $15$ or more transit trips per week, the residuals exhibited a distinct downward curvature, and two extreme data points with high leverage showed large negative residuals. These high-leverage points belonged to workers who experienced unique scheduling flexibilities that decoupled long transit times from traditional stress markers. Consequently, researchers concluded that while the linear model performs adequately for moderate commuting frequencies, it fails to capture the flattening of stress accumulation at extreme transit volumes."
        },
        {
          "question": "Why did the researchers caution against relying on the linear model for extreme transit volumes based on the high-leverage points described in the passage?",
          "choices": [
            "The high-leverage points had positive residuals that inflated the overall slope",
            "The high-leverage points belonged to workers with unique scheduling flexibilities that distorted stress markers",
            "The points lacked any associated $y$-values",
            "The sample size was reduced below the minimum threshold for calculation"
          ],
          "answer": 1,
          "explanation": "The passage explicitly notes that the two extreme data points with high leverage belonged to workers who experienced unique scheduling flexibilities that decoupled long transit times from traditional stress markers, meaning these points represented special conditions rather than standard population behavior.",
          "id": "ap-statistics-5-2-q4",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application",
          "passage": "Original instructional passage; described studies and figures are hypothetical.\n\nRecent hypothetical investigations into urban commuter habits analyzed the relationship between weekly public transit usage (measured in trips per week, denoted as $x$) and self-reported weekly stress levels (measured on a standardized scale from $0$ to $50$, denoted as $y$) among $200$ downtown office workers. A least-squares regression line was fitted to the sample data, yielding the equation $\\hat{y} = 12.5 + 1.8x$. A residual analysis of the fitted model revealed a symmetric random scatter around the horizontal zero line for transit frequencies between $1$ and $10$ trips per week, with a residual standard deviation of approximately $s = 4.1$ units. However, for a small subset of commuters reporting $15$ or more transit trips per week, the residuals exhibited a distinct downward curvature, and two extreme data points with high leverage showed large negative residuals. These high-leverage points belonged to workers who experienced unique scheduling flexibilities that decoupled long transit times from traditional stress markers. Consequently, researchers concluded that while the linear model performs adequately for moderate commuting frequencies, it fails to capture the flattening of stress accumulation at extreme transit volumes."
        }
      ]
    },
    {
      "id": "ap-statistics-5-3-lesson",
      "title": "5.3 Explained variation, residual standard deviation, and responsible prediction",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "videoUrl": "",
      "content": [
        {
          "type": "heading",
          "text": "Explained variation, residual standard deviation, and responsible prediction"
        },
        {
          "type": "subheading",
          "text": "Defining Residual Standard Deviation ($s$)"
        },
        {
          "type": "text",
          "text": "In least-squares regression, the residual standard deviation, denoted $s$, measures the typical distance between observed data points and the regression line. It quantifies the spread of residuals, in the response variable’s units. A smaller $s$ indicates that observations cluster closely around the fitted line, implying higher predictive precision. To calculate $s$, we use the formula $s = \\sqrt{\\frac{\\sum(y_i - \\hat{y}_i)^2}{n - 2}}$. The denominator $n - 2$ adjusts for the two parameters (intercept and slope) estimated from the data, making $s^2$ an unbiased estimator of error variance when the linear-model assumptions hold. The square root $s$ is not itself generally unbiased. This statistic is distinct from the residual sum of squares (SSE), which is merely the sum of squared errors without the averaging and degrees-of-freedom adjustment."
        },
        {
          "type": "subheading",
          "text": "Understanding Coefficient of Determination ($R^2$)"
        },
        {
          "type": "text",
          "text": "The coefficient of determination, $R^2$, represents the proportion of variability in the response variable $y$ that is explained by the linear relationship with the explanatory variable $x$. It is calculated as $R^2 = \\frac{SSR}{SST}$, where $SSR$ is the regression sum of squares and $SST$ is the total sum of squares. Unlike $s$, which measures unexplained variation, $R^2$ measures explained variation. For instance, an $R^2$ of 0.85 means 85% of the variation in $y$ is accounted for by $x$ in the model. It is crucial to interpret $R^2$ as a descriptive measure of fit within the sample, not as a probability that a new point will fall near the line. High $R^2$ values indicate strong linear association, but they do not guarantee causation or applicable prediction outside the data range."
        },
        {
          "type": "subheading",
          "text": "Worked Example: Calculating $s$ and $R^2$"
        },
        {
          "type": "text",
          "text": "Consider a hypothetical dataset of 5 plants where $x$ is fertilizer amount and $y$ is height. Given $SST = 100$ and $SSR = 80$, the unexplained variation $SSE = SST - SSR = 20$. The residual standard deviation is $s = \\sqrt{\\frac{20}{5 - 2}} = \\sqrt{\\frac{20}{3}} \\approx 2.58$. The coefficient of determination is $R^2 = \\frac{80}{100} = 0.80$. This means the model explains 80% of the variability in plant height. The remaining 20% is unexplained variation, represented by residuals. If height is measured in centimeters, residuals have a typical size of about 2.58 cm. This is a descriptive measure of prediction error, not a guaranteed bound for the next plant. A high percentage of explained variation does not eliminate residual error."
        },
        {
          "type": "subheading",
          "text": "Common Misinterpretations and Limitations"
        },
        {
          "type": "text",
          "text": "Students often confuse $R^2$ with correlation $r$. While $R^2 = r^2$ for simple linear regression, $R^2$ is always non-negative, whereas $r$ indicates direction. A high $R^2$ does not imply causation; for example, ice cream sales and sunburns may have high $R^2$ due to a lurking variable (temperature). Additionally, $R^2$ can be misleading if the relationship is non-linear; a high value might result from a curved pattern being forced into a linear model. Responsible prediction requires checking residual plots for patterns. If residuals show a curve, the linear model is inadequate, and predictions may be systematically biased. Always ensure predictions fall within the range of observed $x$ values to avoid extrapolation errors."
        },
        {
          "type": "subheading",
          "text": "Application: Evaluating Model Utility"
        },
        {
          "type": "text",
          "text": "Evaluate a regression using the original scatterplot, the residual plot, the response units, and the range of observed explanatory values. A residual standard deviation of 2.58 cm may be useful for one gardening decision and too imprecise for another. An $R^2$ of 0.80 says that 80% of sample response variation is accounted for by the fitted linear relationship; it does not mean that 80% of predictions are correct. A pattern in residuals can make a high-$R^2$ model unsuitable. Report a point prediction together with a description of typical residual error and model limitations. Do not label $\\hat y \\pm 2s$ an automatic 95% prediction or confidence interval: formal intervals require additional information and are outside this lesson’s scope."
        }
      ],
      "practiceQuestions": [
        {
          "question": "If a regression model has an $R^2$ of 0.90, which statement is statistically accurate?",
          "choices": [
            "The slope of the regression line is 0.90.",
            "90% of the variability in the response variable is explained by the linear relationship.",
            "The correlation coefficient $r$ must be positive 0.90.",
            "90% of new data points will fall exactly on the regression line."
          ],
          "answer": 1,
          "explanation": "The coefficient of determination $R^2$ is defined as the proportion of the total variation in the response variable $y$ that is explained by the least-squares regression on $x$. An $R^2$ of 0.90 means 90% of the variability in $y$ is accounted for by the model. It does not equal the slope, nor does it guarantee the sign of $r$ (which could be -0.95). It certainly does not mean predictions are exact; residuals still exist for the remaining 10% of variation.",
          "id": "ap-statistics-5-3-q1",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "In a hypothetical simple linear regression, n = 10, total sum of squares SST = 500, and explained regression sum of squares SSR = 450. What is the residual standard deviation s?",
          "choices": [
            "2.50",
            "7.07",
            "10.00",
            "12.25"
          ],
          "answer": 0,
          "explanation": "The unexplained sum of squares is SSE = SST − SSR = 500 − 450 = 50. Divide by the residual degrees of freedom n − 2 = 8, then take the square root: s = √(50/8) = √6.25 = 2.50. Taking √50 without the degrees-of-freedom adjustment gives the wrong scale.",
          "id": "ap-statistics-5-3-q2",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "Which condition is necessary for the residual standard deviation $s$ to be a valid estimate of prediction error?",
          "choices": [
            "The relationship between $x$ and $y$ must be causal.",
            "The residuals must be approximately normally distributed with constant variance.",
            "The correlation coefficient $r$ must be greater than 0.9.",
            "The sample size $n$ must be greater than 30."
          ],
          "answer": 1,
          "explanation": "For the residual standard deviation $s$ to serve as a reliable estimate of the standard error of prediction, and for inference (like prediction intervals) to be valid, the model assumptions must hold. These include linearity, independence, normality of residuals, and constant variance (homoscedasticity). Causation is not required for prediction accuracy, only for causal claims. A high $r$ is not strictly necessary for $s$ to be calculated, though it affects the magnitude of $s$. Sample size affects precision but is not a condition for the definition of $s$ itself.",
          "id": "ap-statistics-5-3-q3",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        },
        {
          "question": "If $R^2 = 0.64$ and the correlation is negative, what is the value of $r$?",
          "choices": [
            "0.64",
            "-0.64",
            "0.80",
            "-0.80"
          ],
          "answer": 3,
          "explanation": "The coefficient of determination $R^2$ is the square of the correlation coefficient $r$. Therefore, $|r| = \\sqrt{R^2} = \\sqrt{0.64} = 0.80$. The sign of $r$ is determined by the direction of the association. Since the problem states the correlation is negative, $r$ must be $-0.80$. This distinguishes $R^2$, which is always positive and indicates strength, from $r$, which indicates both strength and direction of the linear relationship.",
          "id": "ap-statistics-5-3-q4",
          "domain": "Stats: Regression Analysis",
          "difficulty": "Medium",
          "format": "mcq",
          "questionType": "Course application"
        }
      ]
    }
  ],
  "mcq": [
    {
      "question": "Which of the following numerical summaries is most resistant to the influence of extreme outliers?",
      "choices": [
        "Mean",
        "Standard Deviation",
        "Interquartile Range",
        "Variance"
      ],
      "answer": 2,
      "explanation": "The interquartile range (IQR) measures the spread of the middle fifty percent of the data, using quartiles which are based on ranks rather than exact extreme numerical values. Because it ignores the lowest and highest portions of the dataset, it is unaffected by extreme outliers. In contrast, the mean, variance, and standard deviation all incorporate every data point directly, making them non-resistant measures that shift significantly in the presence of extreme skewness or outliers.",
      "id": "ap-statistics-1-1-q1",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A researcher finds a strong positive linear association between ice cream sales and shark attacks in a coastal town over a ten-year period. What is the most appropriate conclusion?",
      "choices": [
        "Eating ice cream causes shark attacks to occur more frequently in coastal waters.",
        "Shark attacks drive people to purchase more ice cream to cope with stress.",
        "There is an association between the two variables, likely explained by a lurking variable such as warmer summer weather.",
        "It is impossible to calculate any meaningful statistical relationship without conducting a census of all coastal towns."
      ],
      "answer": 2,
      "explanation": "Observational data revealing a strong association does not imply causation. In this scenario, a lurking variable like ambient temperature or seasonal tourism volume drives both ice cream consumption and beach attendance, which in turn increases the number of shark attacks. Concluding causation from an observational study ignores potential confounding variables and violates core principles of statistical inference.",
      "id": "ap-statistics-1-1-q2",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In a study comparing exam scores between two distinct teaching methods, Method A yields a mean score of $82$ with a standard deviation of $4$, while Method B yields a mean score of $80$ with a standard deviation of $12$. Which statement best compares the two distributions?",
      "choices": [
        "Method A has a higher center and greater variability than Method B.",
        "Method B has a higher center and greater variability than Method A.",
        "Method A has a higher center and less variability than Method B.",
        "Both methods have identical centers and identical spreads."
      ],
      "answer": 2,
      "explanation": "Comparing the two summaries shows that Method A has a mean of $82$, which is higher than Method B's mean of $80$. For spread, Method A has a standard deviation of $4$, which is smaller than Method B's standard deviation of $12$. Therefore, Method A exhibits a higher center and less variability, meaning student scores are more tightly clustered around a higher average than those in Method B.",
      "id": "ap-statistics-1-1-q3",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Why is it critical to distinguish between a population parameter and a sample statistic?",
      "choices": [
        "Parameters are calculated directly from data, whereas statistics are always guessed without data.",
        "Statistics are used as point estimates to infer unknown population parameters with a quantifiable degree of uncertainty.",
        "Parameters only apply to categorical variables, whereas statistics only apply to quantitative variables.",
        "There is no mathematical difference; the terms are used interchangeably in advanced statistical inference."
      ],
      "answer": 1,
      "explanation": "Population parameters represent the true, fixed numerical characteristics of an entire population that are almost never known completely. Sample statistics are computed from subset data and serve as estimates for those parameters. Recognizing this distinction allows statisticians to use probability models to account for sampling variability and quantify uncertainty when drawing conclusions about a larger population.",
      "id": "ap-statistics-1-1-q4",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A researcher claims that students who drink coffee sleep less. This conclusion was drawn from a survey of students who volunteered to participate. What is the primary flaw in this reasoning?",
      "choices": [
        "Voluntary response samples are biased, and association does not prove causation.",
        "The sample size was too small to calculate a reliable standard deviation.",
        "Coffee consumption and sleep are categorical variables, not quantitative.",
        "The researcher should have used convenience sampling instead."
      ],
      "answer": 0,
      "explanation": "The study suffers from two major issues. First, voluntary response samples are inherently biased because self-selected participants often differ from the general population. Second, even if the sample were random, observational data can only establish association, not causation. Lurking variables like stress or study habits could cause both coffee consumption and reduced sleep. Therefore, the claim of causation is invalid.",
      "id": "ap-statistics-1-2-q1",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In a stratified random sample of 300 students from a school of 3,000, 10% of the population are seniors. How many seniors should be included in the sample?",
      "choices": [
        "30",
        "33",
        "300",
        "10"
      ],
      "answer": 0,
      "explanation": "Stratified random sampling requires the sample composition to mirror the population proportions. Since 10% of the population are seniors, 10% of the sample must also be seniors. Calculating 10% of the total sample size of 300: $0.10 \\times 300 = 30$. Thus, the sample must include exactly 30 seniors to maintain proportional representation and reduce sampling bias regarding this demographic.",
      "id": "ap-statistics-1-2-q2",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A study finds a statistically significant difference in test scores between two groups. However, the difference is only 0.5 points on a 100-point scale. How should this result be interpreted?",
      "choices": [
        "The difference is practically significant but not statistically significant.",
        "The difference is statistically significant but likely not practically significant.",
        "The null hypothesis must be incorrect because the $p$-value is low.",
        "The sample size must have been very small to detect such a small difference."
      ],
      "answer": 1,
      "explanation": "Statistical significance indicates that the observed difference is unlikely to be due to random chance, assuming the null hypothesis is true. However, practical significance depends on the real-world impact. A 0.5-point difference, while detectable with a large sample size, is negligible for educational outcomes. Therefore, the result is statistically significant but lacks practical significance, illustrating the distinction between mathematical detectability and real-world importance.",
      "id": "ap-statistics-1-2-q3",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which of the following designs allows a researcher to claim that a new medication caused an improvement in patient health?",
      "choices": [
        "A stratified random sample of patients who already take the medication.",
        "A randomized experiment where patients are randomly assigned to treatment or control groups.",
        "A voluntary response survey of patients who feel better after taking the medication.",
        "An observational study tracking patients who choose to take the medication."
      ],
      "answer": 1,
      "explanation": "Only a well-designed randomized experiment can establish causation. Random assignment balances both known and unknown lurking variables across treatment and control groups. This isolation of the treatment effect allows researchers to attribute differences in outcomes to the medication. Observational studies, including randomized samples of existing users, cannot rule out confounding variables, thus only supporting association.",
      "id": "ap-statistics-1-2-q4",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In a clinical trial testing a new vaccine, participants are randomly assigned to receive either the vaccine or a placebo. Which of the following statements is most accurate regarding the purpose of random assignment?",
      "choices": [
        "To ensure the sample is representative of the general population.",
        "To create treatment and control groups that are balanced with respect to confounding variables.",
        "To increase the sample size without additional cost.",
        "To eliminate all variability in the response variable."
      ],
      "answer": 1,
      "explanation": "Random assignment ensures that both known and unknown confounding variables are distributed equally between the treatment and control groups on average. This balance allows researchers to infer causality because observed differences in outcomes can be attributed to the treatment rather than pre-existing differences between groups. It does not primarily address population representativeness, which is the role of random sampling, nor does it eliminate variability.",
      "id": "ap-statistics-1-3-q1",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A researcher is testing the effect of a new learning method on student test scores. Students are grouped by their previous semester's GPA (High, Medium, Low) before being randomly assigned to either the new method or the traditional method within each GPA group. What is the primary statistical benefit of this blocking strategy?",
      "choices": [
        "It ensures that the two groups have identical average GPAs.",
        "It reduces the variability within treatment groups by removing the effect of prior academic performance.",
        "It allows for the calculation of a two-sample t-test without assumptions.",
        "It increases the power of the test by increasing the total sample size."
      ],
      "answer": 1,
      "explanation": "Blocking groups similar individuals together based on a variable known to affect the response (GPA) and then randomizing treatments within those groups. This design reduces the unexplained variability in the response because the effect of GPA is accounted for within each block. By minimizing the noise from GPA differences, the experiment becomes more sensitive to detecting the specific effect of the learning method. It does not change the total sample size or guarantee identical group averages globally, only within blocks.",
      "id": "ap-statistics-1-3-q2",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which of the following scenarios best demonstrates a violation of ethical considerations in experimental design?",
      "choices": [
        "A researcher refuses to publish negative results from a completed trial.",
        "A researcher assigns a potentially harmful experimental drug to a control group without informed consent.",
        "A researcher uses a stratified sampling method to recruit participants from multiple hospitals.",
        "A researcher blinding the experimenter to prevent bias in data recording."
      ],
      "answer": 1,
      "explanation": "Assigning a harmful treatment to a control group without informed consent violates the ethical principles of autonomy and non-maleficence. Informed consent requires that participants understand the risks and voluntarily agree to participate. While publication bias is unethical in dissemination, the ethical violation in the design and conduct of the experiment itself is the lack of consent for a harmful assignment. Blinding is actually an ethical and scientific best practice to ensure fair and unbiased treatment of data.",
      "id": "ap-statistics-1-3-q3",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A study finds that students who study for 5 hours a week score higher on exams than those who study 1 hour. If the study did not use random assignment but instead observed existing study habits, what is the major limitation in interpreting this result?",
      "choices": [
        "The study cannot determine if studying causes higher scores due to potential confounding variables.",
        "The study must have used a simple random sample to be considered valid.",
        "The results are statistically insignificant because the sample size is unknown.",
        "The study has high external validity because it reflects real-world conditions."
      ],
      "answer": 0,
      "explanation": "Without random assignment, the study is observational. Students who choose to study more may differ from those who study less in other ways, such as motivation, prior knowledge, or socioeconomic status. These confounding variables could be the true cause of the higher scores, not the study time itself. Therefore, a causal link cannot be established. Simply observing real-world conditions (external validity) does not resolve the internal validity issue of causation versus association.",
      "id": "ap-statistics-1-3-q4",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In a hypothetical survey of 400 local drivers, 120 admit to texting while driving, 160 drive sports cars, and 48 both text while driving and drive sports cars. What is the conditional probability that a randomly selected driver texts while driving given that they drive a sports car?",
      "choices": [
        "0.30",
        "0.40",
        "0.60",
        "0.75"
      ],
      "answer": 1,
      "explanation": "To find the conditional probability of texting while driving given driving a sports car, we divide the probability of the intersection by the marginal probability of driving a sports car. Alternatively, using counts directly from the scenario, we divide the number of drivers who both text and drive sports cars (48) by the total number of sports car drivers (160). Calculating 48 divided by 160 yields 0.40. the response “0.40” is correct because it correctly identifies the restricted sample space of sports car drivers as the denominator.",
      "id": "ap-statistics-2-1-q1",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Suppose events $X$ and $Y$ are independent with $P(X) = 0.45$ and $P(Y) = 0.60$. What is the probability of the union of $X$ and $Y$, denoted $P(X \\cup Y)$?",
      "choices": [
        "0.27",
        "0.78",
        "1.05",
        "0.65"
      ],
      "answer": 1,
      "explanation": "For any two events, the general addition rule states that $P(X \\cup Y) = P(X) + P(Y) - P(X \\cap Y)$. Because events $X$ and $Y$ are independent, we can find their intersection by multiplying their individual probabilities: $P(X \\cap Y) = 0.45 \\times 0.60 = 0.27$. Substituting these values into the addition rule gives $P(X \\cup Y) = 0.45 + 0.60 - 0.27 = 1.05 - 0.27 = 0.78$. the response “0.78” is correct because it accurately applies both the independence multiplication rule and the general addition rule.",
      "id": "ap-statistics-2-1-q2",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which of the following statements correctly distinguishes between disjoint events and independent events?",
      "choices": [
        "Disjoint events can never be independent if both have probabilities greater than zero, because the occurrence of one prevents the other from occurring.",
        "Independent events are also disjoint because they cannot occur at the same time under any standard probability model.",
        "Disjoint events are always independent because knowing one occurs tells you nothing about the probability of the other occurring.",
        "Two events are independent if their intersection is an empty set, whereas disjoint events must have a positive intersection."
      ],
      "answer": 0,
      "explanation": "Disjoint (mutually exclusive) events share no outcomes in common, meaning $P(A \\cap B) = 0$. If event $A$ occurs and has a positive probability, $P(B \\mid A)$ must be zero. For independence, we require $P(B \\mid A) = P(B)$. If $P(B) > 0$, these two conditions directly contradict each other. Thus, mutually exclusive events with non-zero probabilities are never independent. the response “Disjoint events can never be independent if both have probabilities greater than zero, because the occurrence of one prevents the other from occurring” correctly captures this logical relationship.",
      "id": "ap-statistics-2-1-q3",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A researcher conducts a simulation to estimate a conditional probability by running 1000 trials of a manufacturing process. In 300 trials, machine A is operating. In 90 of those machine A trials, a minor thermal spike occurs. Which value is the best simulation-based approximation for the conditional probability of a thermal spike given that machine A is operating?",
      "choices": [
        "0.09",
        "0.30",
        "0.70",
        "0.90"
      ],
      "answer": 1,
      "explanation": "The simulation data provides empirical counts that mimic theoretical conditional probability. We isolate the trials where the conditioning event occurs, which is machine A operating, totaling 300 trials. Within those specific trials, we count how many times the secondary event occurred, which is 90 thermal spikes. Dividing the intersection count by the condition count gives $90 / 300 = 0.30$. the response “0.30” correctly calculates this empirical conditional probability from the simulation frequency data.",
      "id": "ap-statistics-2-1-q4",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A bag contains 500 red and 500 blue marbles. Thirty are selected randomly without replacement. Which statement best supports treating the number of red marbles as approximately binomial?",
      "choices": [
        "The sample is 3% of the population, supporting the usual 10% condition for approximate independence.",
        "Physical objects cannot have binary outcomes.",
        "Drawing without replacement makes the trials exactly independent.",
        "The number of trials does not need to be fixed."
      ],
      "answer": 0,
      "explanation": "The sample fraction is 30/1,000 = 0.03, below the usual 10% guideline. Sampling without replacement is not exactly independent, but the small sampling fraction supports the approximation when outcomes are binary, n is fixed, and the population success fraction is stable. An exact count model would account for the finite population.",
      "id": "ap-statistics-2-2-q1",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In the context of a binomial random variable $X \\sim B(n, p)$, what does the parameter $p$ represent?",
      "choices": [
        "The probability of observing the specific sample statistic $\\hat{p}$.",
        "The mean of the sampling distribution of the sample proportion.",
        "The probability of success on any single trial in the population process.",
        "The standard deviation of the number of successes."
      ],
      "answer": 2,
      "explanation": "In the binomial model, $p$ is the population parameter representing the probability of success for any single trial. It is fixed and unknown in hypothesis testing contexts. The statistic $\\hat{p}$ is the observed proportion in a sample. The mean of the sampling distribution of $\\hat{p}$ is also $p$, but $p$ itself is the fundamental trial probability. the response “The standard deviation of the number of successes” describes $\\sigma_X = \\sqrt{np(1-p)}$, not $p$. the response “The probability of observing the specific sample statistic $\\hat{p}$” refers to the distribution of the statistic, not the parameter definition. Distinguishing parameter from statistic is crucial for AP Statistics inference units.",
      "id": "ap-statistics-2-2-q2",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Calculate the probability that exactly 2 successes occur in 4 trials if the probability of success is $0.5$. Round to four decimal places.",
      "choices": [
        "0.2500",
        "0.3750",
        "0.6250",
        "0.5000"
      ],
      "answer": 1,
      "explanation": "For four independent Bernoulli trials with success probability 0.5, exactly two successes can occur in 4 choose 2 = 6 arrangements. Each arrangement has probability (0.5)²(0.5)² = 0.0625. Multiplying gives 6 × 0.0625 = 0.3750; the combination factor counts all arrangements rather than just one.",
      "id": "ap-statistics-2-2-q3",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A basketball player makes 80% of free throws. She takes 10 shots. What is the probability that she makes ALL 10 shots?",
      "choices": [
        "0.8000",
        "1.0000",
        "0.1074",
        "0.0010"
      ],
      "answer": 2,
      "explanation": "The event is $X=10$ successes in $n=10$ trials with $p=0.8$. The formula is $P(X=10) = \\binom{10}{10} (0.8)^{10} (0.2)^0$. Since $\\binom{10}{10}=1$ and $0.2^0=1$, the calculation simplifies to $(0.8)^{10}$. Computing $0.8^{10}$: $0.8^5 \\approx 0.32768$, and $0.32768^2 \\approx 0.10737$. Rounded to four decimal places, this is 0.1074. that response is the probability of one success. the response “0.8000” implies certainty, which is false since $p < 1$. the response “0.0010” is too small, likely confusing with $0.2^{10}$ or similar. The calculation is exact and assumes independence of each shot.",
      "id": "ap-statistics-2-2-q4",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "If a population has a standard deviation of $\\sigma = 50$ and a sample of size $n = 25$ is selected, what is the standard deviation of the sampling distribution of the sample mean?",
      "choices": [
        "2500",
        "50",
        "12.5",
        "2"
      ],
      "answer": 2,
      "explanation": "The standard deviation of the sampling distribution is calculated using the standard error formula $\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}$. Substituting the provided parameters gives $SE = 50/\\sqrt{25} = 50/5 = 10$. The standard deviation of the individual observations is 50, not the sample mean. The initial population standard deviation must be divided by the square root of the sample size to reflect the reduction in variability.",
      "id": "ap-statistics-2-3-q1",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Given a population mean of $\\mu = 40$ and a standard error of 2, what is the z-score for an observed sample mean of 43?",
      "choices": [
        "16.5",
        "0.15",
        "6.5",
        "1.5"
      ],
      "answer": 3,
      "explanation": "The z-score measures how many standard errors the sample mean is away from the population mean. The formula is $z = (\\bar{x} - \\mu) / SE$. Plugging in the values, we get $43 - 40 = 3$, which represents the difference. Dividing this difference by the given standard error of 2 gives $3/2 = 1.5$. This signifies the observation is 1.5 standard errors above the mean.",
      "id": "ap-statistics-2-3-q2",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "To reduce the standard error of a sampling distribution by a factor of 3, how must the sample size change from its original value $n$?",
      "choices": [
        "Multiply $n$ by 3",
        "Divide $n$ by 3",
        "Multiply $n$ by 9",
        "Multiply $n$ by $\\sqrt{3}$"
      ],
      "answer": 2,
      "explanation": "The standard error formula is $SE = \\sigma / \\sqrt{n}$. To make the resulting standard error three times smaller, the denominator must be three times larger. Mathematically, $\\sqrt{3n}$ does not work because $\\sqrt{n}$ must multiply by 3. Therefore, $\\sqrt{9n} = 3\\sqrt{n}$. This implies the sample size $n$ must be multiplied by 9. This inverse-square relationship is fundamental to experimental design and precision.",
      "id": "ap-statistics-2-3-q3",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which statement correctly distinguishes a parameter from a statistic in the context of sampling variability?",
      "choices": [
        "A parameter is an estimate based on a random sample, while a statistic describes the entire population.",
        "A statistic is a fixed number describing a population, while a parameter is calculated from sample data.",
        "A parameter is a fixed value describing a population, while a statistic is a number calculated from a sample.",
        "Parameters and statistics are both values calculated solely from sample data collected in an experiment."
      ],
      "answer": 2,
      "explanation": "A parameter is a fixed, often unknown, numerical value that describes an entire population (such as $\\mu$ or $\\sigma$). A statistic is a numerical value calculated from a sample (such as $\\bar{x}$ or $s$). Because samples vary, statistics fluctuate, but parameters remain constant. Confusing these two core statistical concepts leads to fundamental misunderstandings in inferential procedures.",
      "id": "ap-statistics-2-3-q4",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which of the following conditions must be satisfied to safely use a normal approximation when constructing a confidence interval for a single proportion?",
      "choices": [
        "The sample size must be at least 30 and the population must be normally distributed.",
        "Both $n\\hat{p} \\ge 10$ and $n(1-\\hat{p}) \\ge 10$, along with a random sample.",
        "The population standard deviation must be known.",
        "The sample size must exceed 10% of the population size."
      ],
      "answer": 1,
      "explanation": "To use a normal approximation for a sample proportion, we rely on the large counts condition, which requires the expected number of successes and failures to be at least 10, checked via $n\\hat{p} \\ge 10$ and $n(1-\\hat{p}) \\ge 10$. Randomness is also required.",
      "id": "ap-statistics-3-1-q1",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "What is the correct interpretation of a 90% confidence interval for a population proportion $p$?",
      "choices": [
        "There is a 90% probability that the true population proportion lies within the calculated interval.",
        "If many random samples of the same size are taken, approximately 90% of the resulting confidence intervals will contain the true population proportion.",
        "90% of the data values in the sample fall inside the confidence interval limits.",
        "The true proportion has a 90% chance of changing value within the bounds of the interval over time."
      ],
      "answer": 1,
      "explanation": "A confidence level refers to the long-run success rate of the method. In repeated sampling, 90% of constructed intervals will successfully capture the fixed, unknown population parameter. The parameter itself is not a random variable.",
      "id": "ap-statistics-3-1-q2",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A random sample of 200 high school students yields 110 who prefer online textbooks. What is the standard error used for a one-sample z-interval for proportions?",
      "choices": [
        "$\\sqrt{\\frac{0.55 \\times 0.45}{200}}$",
        "$\\sqrt{\\frac{0.50 \\times 0.50}{200}}$",
        "$\\frac{0.55}{\\sqrt{200}}$",
        "$\\sqrt{\\frac{110 \\times 90}{200}}$"
      ],
      "answer": 0,
      "explanation": "The sample proportion is $\\hat{p} = 110/200 = 0.55$, and $\\hat{q} = 0.45$. The standard error formula for a single proportion is $\\text{SE} = \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}$, which substitutes directly to $\\sqrt{\\frac{0.55 \\times 0.45}{200}}$.",
      "id": "ap-statistics-3-1-q3",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "How does increasing the confidence level from 90% to 99% affect the width of a confidence interval for a proportion, assuming sample size and sample proportion remain constant?",
      "choices": [
        "The width decreases because a higher confidence level requires a smaller critical value.",
        "The width remains unchanged because the sample size and sample proportion dictate the spread.",
        "The width increases because a higher confidence level requires a larger critical value ($z^*$).",
        "The width becomes zero because certainty is absolute at 99%."
      ],
      "answer": 2,
      "explanation": "Increasing the confidence level requires a larger critical value ($z^*$), such as moving from 1.645 to 2.576. Since the margin of error is $z^* \\times \\text{SE}$, a larger critical value directly increases the margin of error, making the interval wider.",
      "id": "ap-statistics-3-1-q4",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In a test where $H_0: p=0.5$ and $H_a: p \\neq 0.5$, a researcher obtains a $P$-value of 0.03. Which statement is correct if $\\alpha=0.05$?",
      "choices": [
        "There is a 3% chance the null hypothesis is true.",
        "The probability of a Type I error is 0.03.",
        "We reject $H_0$ because the observed data are unlikely under $H_0$.",
        "We fail to reject $H_0$ because 0.03 is greater than 0.05."
      ],
      "answer": 2,
      "explanation": "The P-value is the probability of observing data this extreme or more extreme assuming H0 is true, not the probability H0 is true. Since 0.03 < 0.05, the result is statistically significant, leading to rejection of H0. The Type I error rate is fixed at alpha (0.05), not the P-value. the response “We fail to reject $H_0$ because 0.03 is greater than 0.05” is incorrect because 0.03 is less than 0.05.",
      "id": "ap-statistics-3-2-q1",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A sample of 50 students yields $\\hat{p}=0.50$. Testing $H_0: p=0.40$. Which condition check is problematic?",
      "choices": [
        "$np_0 = 20$ and $n(1-p_0) = 30$, both $\\geq 10$.",
        "$n\\hat{p} = 25$ and $n(1-\\hat{p}) = 25$, both $\\geq 10$.",
        "$np_0 = 20$ but the sample size is greater than 10% of the population.",
        "The calculation uses $\\hat{p}$ instead of $p_0$ for the standard error."
      ],
      "answer": 3,
      "explanation": "The standard error in a hypothesis test must use the null parameter $p_0$, not the sample statistic $\\hat{p}$. Using $\\hat{p}$ inflates or deflates the standard error incorrectly, leading to a wrong z-score. While the 10% condition is important, the primary methodological error in the test statistic calculation is using the wrong proportion for the denominator. Options 1 and 2 show correct calculations for respective contexts, but 3 identifies the specific formula error.",
      "id": "ap-statistics-3-2-q2",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "If a test has $\\alpha=0.01$, what is the probability of making a Type I error given $H_0$ is true?",
      "choices": [
        "0.01",
        "0.99",
        "The P-value of the specific test",
        "0.05"
      ],
      "answer": 0,
      "explanation": "A Type I error is rejecting a true null hypothesis. The significance level $\\alpha$ is defined as the long-run probability of making this error when $H_0$ is actually true. Therefore, if $\\alpha=0.01$, there is a 1% chance of a Type I error. The P-value varies by dataset, while $\\alpha$ is set before the test. the response “The P-value of the specific test” is the power-related concept, not Type I error. the response “0.05” is the observed significance, not the error rate.",
      "id": "ap-statistics-3-2-q3",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A test rejects $H_0$ at $\\alpha=0.05$. What does this imply about statistical vs. practical significance?",
      "choices": [
        "The result is practically significant because the P-value is small.",
        "The result is statistically significant, but practical significance depends on effect size and context.",
        "The null hypothesis is proven false with 95% confidence.",
        "There is a 5% chance the result is due to chance."
      ],
      "answer": 1,
      "explanation": "Statistical significance (P < alpha) provides evidence against H0 but does not guarantee the difference is large or important in real life. Practical significance requires assessing the magnitude of the difference (effect size) and its relevance to the context. A tiny difference can be statistically significant with large samples. Proof is absolute, while statistics deal in probability. The 5% is the error rate, not the probability of the result being due to chance in this specific case.",
      "id": "ap-statistics-3-2-q4",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which of the following conditions is required for checking the large counts assumption when performing a two-sample z-test for comparing two proportions?",
      "choices": [
        "Both sample sizes must be greater than or equal to 30.",
        "The expected number of successes and failures in both samples must each be at least 10 using the pooled proportion.",
        "The population standard deviations must be known.",
        "The data must be collected using a stratified random sample with equal allocation."
      ],
      "answer": 1,
      "explanation": "When conducting a significance test for comparing two proportions, the null hypothesis assumes the two population proportions are equal. Therefore, we pool the sample data to estimate this common proportion and verify that all expected counts of successes and failures are at least 10, ensuring the sampling distribution of the difference is approximately normal.",
      "id": "ap-statistics-3-3-q1",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Suppose a study finds a statistically significant difference between two teaching methods with a P-value of $0.001$ based on a sample of 10,000 students, showing a $1\\%$ higher pass rate for the new method. Which interpretation is most accurate?",
      "choices": [
        "The new method causes a massive improvement in student comprehension.",
        "The result is statistically significant, but the actual magnitude of the difference may lack practical significance.",
        "The null hypothesis must be retained because a $1\\%$ difference is too small to calculate.",
        "The confidence level for the interval estimate must be decreased to 90%."
      ],
      "answer": 1,
      "explanation": "Very large sample sizes can yield extremely small P-values for trivial effect sizes. While the result is highly statistically significant, a $1\\%$ difference may have very little practical significance in an educational setting, demonstrating why effect size estimation via confidence intervals is vital.",
      "id": "ap-statistics-3-3-q2",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In a hypothetical study, Group 1 has 50 successes out of 100 trials, and Group 2 has 40 successes out of 100 trials. What is the value of the pooled sample proportion $\\hat{p}_c$ used in a hypothesis test?",
      "choices": [
        "0.45",
        "0.50",
        "0.40",
        "0.90"
      ],
      "answer": 0,
      "explanation": "The pooled sample proportion is calculated by combining the successes from both samples and dividing by the total number of trials across both samples. Here, total successes = $50 + 40 = 90$, and total trials = $100 + 100 = 200$. Thus, $\\hat{p}_c = 90 / 200 = 0.45$.",
      "id": "ap-statistics-3-3-q3",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Why do confidence intervals for the difference between two proportions use separate sample proportions ($\\hat{p}_1$ and $\\hat{p}_2$) rather than a pooled proportion?",
      "choices": [
        "Because confidence intervals estimate an unknown difference without assuming the null hypothesis that $p_1 = p_2$ is true.",
        "Because pooled proportions cannot be calculated for confidence intervals.",
        "Because separate proportions guarantee that the margin of error will always be smaller.",
        "Because pooled proportions are only used when sample sizes are unequal."
      ],
      "answer": 0,
      "explanation": "A confidence interval does not assume that the two population proportions are equal; instead, it estimates their actual difference. The pooled proportion is only appropriate under the assumption of the null hypothesis in a significance test where $p_1 = p_2$.",
      "id": "ap-statistics-3-3-q4",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which of the following best describes the fundamental difference between a chi-square test of homogeneity and a chi-square test of independence?",
      "choices": [
        "Homogeneity uses a single population sample to test association between two variables, whereas independence uses multiple independent samples to compare distributions.",
        "Homogeneity compares the distribution of a categorical variable across multiple populations using separate random samples, whereas independence tests for an association between two categorical variables using a single random sample.",
        "Homogeneity evaluates whether a single categorical variable matches a theoretical distribution, whereas independence compares two distinct populations.",
        "Homogeneity requires expected cell counts to be at least 10, whereas independence requires expected cell counts to be at least 5."
      ],
      "answer": 1,
      "explanation": "A chi-square test of homogeneity is used to determine whether different populations (independent samples) share the same distribution of a categorical variable. Conversely, a chi-square test of independence evaluates whether two categorical variables are associated within a single population using one random sample. Therefore, the response “Homogeneity compares the distribution of a categorical variable across multiple populations using separate random samples, whereas independence tests for an association between two categorical variables using a single random sample” is the accurate distinction, while the other choices misstate the definitions or conditions.",
      "id": "ap-statistics-3-4-q1",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In a study analyzing the relationship between pet ownership (Dog, Cat, None) and housing type (Apartment, House) using a two-way table with 3 rows and 2 columns, what is the correct number of degrees of freedom for the chi-square test statistic?",
      "choices": [
        "1",
        "2",
        "5",
        "6"
      ],
      "answer": 1,
      "explanation": "The degrees of freedom for a chi-square test involving a two-way contingency table is calculated using the formula $df = (r - 1)(c - 1)$, where $r$ is the number of rows and $c$ is the number of columns. Here, we have 3 rows and 2 columns. Substituting these values gives $df = (3 - 1)(2 - 1) = (2)(1) = 2$. Thus, the correct number of degrees of freedom is 2.",
      "id": "ap-statistics-3-4-q2",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "An educational researcher conducts a chi-square test of independence between extracurricular participation and standardized test performance categories, yielding a test statistic of $\\chi^2 = 14.82$ with a corresponding $p$-value of $0.0006$. Which of the following is the most appropriate conclusion?",
      "choices": [
        "Since the $p$-value is very small, we fail to reject the null hypothesis and conclude that extracurricular participation causes higher standardized test scores.",
        "Since the $p$-value is less than standard significance levels, we reject the null hypothesis and conclude there is convincing statistical evidence of an association between extracurricular participation and test performance.",
        "Since the $p$-value is less than 0.05, we accept the null hypothesis that extracurricular participation and test performance are completely independent.",
        "Since the study used observational data, the small $p$-value proves that joining extracurricular activities guarantees improved test scores."
      ],
      "answer": 1,
      "explanation": "A very small $p$-value ($0.0006$) provides strong evidence against the null hypothesis of independence, leading us to reject $H_0$ and conclude that an association exists. the response “Since the $p$-value is less than standard significance levels, we reject the null hypothesis and conclude there is convincing statistical evidence of an association between extracurricular participation and test performance” correctly avoids claiming causation from observational data and correctly interprets the meaning of rejecting the null hypothesis, whereas the other choices misinterpret $p$-values or improperly claim causation.",
      "id": "ap-statistics-3-4-q3",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "When checking the technical conditions for performing a chi-square test for categorical data, which of the following practices is strictly required?",
      "choices": [
        "Verifying that all observed cell counts in the contingency table are greater than or equal to 5.",
        "Verifying that all expected cell counts calculated under the null hypothesis are greater than or equal to 5.",
        "Verifying that the quantitative data follow a normal distribution before calculating the chi-square statistic.",
        "Verifying that the sample size is greater than 30 regardless of the number of cells in the table."
      ],
      "answer": 1,
      "explanation": "The validity of the chi-square approximation relies heavily on the expected cell counts rather than the observed counts. Specifically, all expected cell counts must be at least 5 for the chi-square distribution to accurately model the test statistic. Checking observed counts or requiring a blanket sample size of 30 ignores table dimensions and expected frequencies.",
      "id": "ap-statistics-3-4-q4",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A researcher takes a simple random sample of 24 high school students and finds their average systolic blood pressure is 112 mmHg with a standard deviation of 14 mmHg. The distribution of blood pressures in the population is slightly right-skewed without outliers. Which condition check is most relevant for validating the use of a one-sample t-interval?",
      "choices": [
        "The sample size is greater than 30, so the Central Limit Theorem guarantees normality.",
        "The sample is an SRS, but since n < 30 and there is skewness, the t-procedure may be unreliable.",
        "The population standard deviation is known, so a z-interval should be used instead.",
        "The data must be transformed to make it normal before constructing the interval."
      ],
      "answer": 1,
      "explanation": "The sample size is 24, which is less than 30. While the Random condition is met, the Normal condition is questionable due to the right skew. T-procedures are robust to moderate skew, but with a small n, the slight skew can impact accuracy. the response “The sample size is greater than 30, so the Central Limit Theorem guarantees normality” is false (n<30). the response “The population standard deviation is known, so a z-interval should be used instead” is false (sigma is unknown). the response “The data must be transformed to make it normal before constructing the interval” is not a standard required condition for t-tests.",
      "id": "ap-statistics-4-1-q1",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In constructing a 95% confidence interval for a mean, if the calculated t-statistic is 1.8 and the degrees of freedom are 19, what is the approximate critical value t* used for the margin of error?",
      "choices": [
        "1.729",
        "1.960",
        "2.093",
        "2.539"
      ],
      "answer": 2,
      "explanation": "The critical value t* depends on the confidence level and degrees of freedom (df), not the sample t-statistic. For a 95% confidence level with df = 19, we look up the t-distribution table. The value corresponding to 0.025 in the upper tail with 19 df is approximately 2.093. the response “1.729” is for df=24, the response “1.960” is the z-value (infinite df), and the response “2.539” is for a 99% confidence level or lower df.",
      "id": "ap-statistics-4-1-q2",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A hypothesis test yields a P-value of 0.02 for a one-sample t-test. A student concludes: \"There is a 2% chance that the null hypothesis is true.\" Which statement correctly identifies the error?",
      "choices": [
        "The P-value calculation is incorrect for a one-sample t-test.",
        "The student confuses the P-value with the conditional probability of H0 being true.",
        "The significance level alpha should be set to 0.05 to make the result valid.",
        "The student should have used a z-test instead of a t-test."
      ],
      "answer": 1,
      "explanation": "The P-value is P(Data | H0 is true), not P(H0 is true | Data). It measures the likelihood of seeing such extreme data if the null were correct. It does not provide the probability that the null hypothesis itself is true. the response “The significance level alpha should be set to 0.05 to make the result valid” accurately identifies this Bayesian vs. frequentist confusion. The other choices address unrelated procedural or calculation issues.",
      "id": "ap-statistics-4-1-q3",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Why do t-intervals have heavier tails than z-intervals, and how does this affect the margin of error for small samples?",
      "choices": [
        "T-intervals account for the variability in estimating sigma with s, leading to larger critical values.",
        "T-intervals assume the population is not normal, which increases the standard error.",
        "Z-intervals are only valid for sample sizes greater than 100, making them narrower.",
        "The t-distribution converges to the normal distribution as n decreases."
      ],
      "answer": 0,
      "explanation": "The t-distribution has heavier tails because replacing the known population standard deviation sigma with the random statistic s adds uncertainty. This extra uncertainty requires larger critical values (t* > z*) to maintain the same confidence level, resulting in wider intervals (larger margins of error) for small samples. As n increases, s becomes a better estimate, and t* approaches z*. the response “The t-distribution converges to the normal distribution as n decreases” is false; t converges to z as n increases.",
      "id": "ap-statistics-4-1-q4",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In a study comparing fuel efficiency using two different types of motor oil in ten identical test cars, why is a paired t-procedure preferred over a two-sample t-procedure?",
      "choices": [
        "A paired design eliminates between-car variability by comparing both oils within the same car, reducing standard error.",
        "A paired design guarantees that the sample size will always be greater than 30 for both groups combined.",
        "A paired design completely removes the need to check for normality or shape of the sample differences.",
        "A paired design changes the parameter of interest from a mean difference to the difference of two independent population proportions."
      ],
      "answer": 0,
      "explanation": "A paired design is specifically structured to control for confounding subject-to-subject variability by evaluating the two treatments on the exact same experimental unit. This internal comparison reduces the variability of the sample differences, resulting in a smaller standard error and greater power to detect a true average difference between the two treatments compared to independent sampling.",
      "id": "ap-statistics-4-2-q1",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "A researcher conducts a paired t-test on $n = 15$ matched pairs and obtains a test statistic of $t = 2.145$. What is the correct conclusion regarding the null hypothesis $H_0: \\mu_d = 0$ versus a two-sided alternative at the significance level $\\alpha = 0.05$?",
      "choices": [
        "Fail to reject the null hypothesis because the test statistic does not exceed the critical value for 15 degrees of freedom.",
        "Reject the null hypothesis because the absolute value of the test statistic exceeds the critical t-value for 14 degrees of freedom.",
        "Accept the null hypothesis as true because a two-sided test requires a t-value greater than 3.00 for significance.",
        "Conclude that the population mean difference is exactly equal to zero with 95 percent confidence."
      ],
      "answer": 1,
      "explanation": "For a sample of $n = 15$ pairs, the degrees of freedom are $df = 15 - 1 = 14$. The critical t-value for a two-tailed test at $\\alpha = 0.05$ with 14 degrees of freedom is approximately $2.145$. Because the calculated t-statistic equals or exceeds this critical threshold, the p-value is less than 0.05, providing sufficient evidence to reject the null hypothesis in favor of the two-sided alternative.",
      "id": "ap-statistics-4-2-q2",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which of the following conditions must be reasonably satisfied before performing a confidence interval for a population mean difference $\\mu_d$?",
      "choices": [
        "The two independent sample sizes must both be exactly equal to 50 or more.",
        "The sample differences must be obtained using random sampling or a randomized paired experiment, and the normality condition must be checked.",
        "The population standard deviation $\\sigma_d$ must be known precisely prior to collecting any sample data.",
        "The underlying distribution of both individual treatment groups must be heavily skewed to the right."
      ],
      "answer": 1,
      "explanation": "Valid inference for a mean difference requires that the data are collected properly via random sampling or a randomized experiment to ensure independence and lack of bias. Additionally, we must verify the normality condition, either by knowing the population of differences is normal or by having a large enough sample size (typically $n \\ge 30$) or checking for absence of severe skewness and outliers when $n$ is small.",
      "id": "ap-statistics-4-2-q3",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Suppose a hypothesis test for a mean difference yields a p-value of $0.0002$ with a sample of $n = 500$ pairs, showing that a new software tool reduces task completion time by an average of $\\bar{x}_d = 0.4$ seconds. Which statement best interprets these findings?",
      "choices": [
        "The result is statistically significant but may lack practical significance due to the trivial magnitude of the time reduction combined with a large sample size.",
        "The result lacks statistical significance because the time reduction is less than one full second.",
        "The small p-value proves that the software causes a major, highly impactful improvement in workflow efficiency.",
        "The large sample size invalidates the paired t-test because central limit theorem rules do not apply to paired data."
      ],
      "answer": 0,
      "explanation": "Statistical significance depends heavily on sample size. With $n = 500$, even a tiny average difference of $0.4$ seconds can produce a very small p-value, leading to rejection of the null hypothesis. However, an average savings of 0.4 seconds may be entirely unimportant in a practical workplace setting, highlighting the critical distinction between statistical significance and practical importance.",
      "id": "ap-statistics-4-2-q4",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In the worked example, why was the conservative degrees of freedom ($df=24$) chosen over the pooled or calculator value?",
      "choices": [
        "To ensure the critical value is larger, making the interval wider and safer for inference",
        "To match the sample size of the larger group for symmetry",
        "To assume the population variances are equal for simplification",
        "To use the standard normal distribution as a baseline"
      ],
      "answer": 0,
      "explanation": "The conservative method uses the smaller $n-1$ to guarantee the $t$-critical value is not underestimated. A larger $t^*$ increases the margin of error, creating a wider interval. This ensures the confidence level is maintained even if variances are unequal, providing a robust lower bound for the true interval width without relying on complex technology.",
      "id": "ap-statistics-4-3-q1",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "For a simple random sample without replacement that is a substantial fraction of a finite population, what generally happens if a standard-error calculation ignores the finite-population correction?",
      "choices": [
        "It overestimates sampling variability, producing an unnecessarily large standard error.",
        "The standard error becomes infinite.",
        "The sample mean automatically becomes zero.",
        "The degrees of freedom automatically remove all dependence."
      ],
      "answer": 0,
      "explanation": "Without-replacement sampling from a finite population reduces sampling variability relative to the independent-draw model. The finite-population correction is below one. Ignoring it therefore gives a larger standard error than the finite-population calculation. The usual 10% guideline identifies when that dependence can often be neglected approximately.",
      "id": "ap-statistics-4-3-q2",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which statement correctly interprets a 95% confidence interval of $(2.1, 4.5)$ for the difference in means?",
      "choices": [
        "There is a 95% probability that the true difference lies between 2.1 and 4.5",
        "We are 95% confident that the method used captures the true difference in this specific interval",
        "95% of all possible samples will produce means within this specific range",
        "The true difference is exactly 3.3, which is the midpoint of the interval"
      ],
      "answer": 1,
      "explanation": "Confidence refers to the reliability of the procedure. Since the parameter is fixed, it cannot have a probability. We say we are 95% confident in the result because if we repeated the sampling process many times, 95% of the constructed intervals would contain the true parameter. This option correctly attributes the confidence to the method's long-run success rate for this specific instance.",
      "id": "ap-statistics-4-3-q3",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In the marketing application, the interval $(-0.51, -0.09)$ indicates what about the null hypothesis $H_0: \\mu_1 - \\mu_2 = 0$?",
      "choices": [
        "We fail to reject $H_0$ because the intervals overlap visually in other contexts",
        "We reject $H_0$ at the $\\alpha = 0.05$ level because zero is not in the interval",
        "We cannot make a decision because the sample sizes are unequal",
        "We accept $H_0$ because the difference is small in magnitude"
      ],
      "answer": 1,
      "explanation": "A 95% confidence interval is equivalent to a two-sided hypothesis test at $\\alpha = 0.05$. If the value hypothesized in the null (zero in this case) is not contained within the confidence interval, the test statistic falls in the rejection region. Therefore, we reject the null hypothesis, concluding there is a statistically significant difference between the two layout response times.",
      "id": "ap-statistics-4-3-q4",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "What does the value of the correlation coefficient $r$ explicitly measure?",
      "choices": [
        "The exact cause-and-effect relationship between two categorical variables",
        "The strength and direction of the linear association between two quantitative variables",
        "The exact slope of the least-squares regression line regardless of variable scaling",
        "The proportion of total variation in the response variable explained by the model"
      ],
      "answer": 1,
      "explanation": "The correlation coefficient $r$ is a standardized statistic specifically designed to quantify the strength and direction of a linear relationship between two quantitative variables. It does not measure non-linear relationships, nor does it establish causation or equate to the slope of the regression line without scaling factors.",
      "id": "ap-statistics-5-1-q1",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In a hypothetical regression analysis, the mean of $x$ is 10, the mean of $y$ is 50, the standard deviation of $x$ is 4, the standard deviation of $y$ is 12, and $r = 0.5$. What is the slope $b$ of the least-squares regression line?",
      "choices": [
        "0.17",
        "1.5",
        "4.0",
        "6.0"
      ],
      "answer": 1,
      "explanation": "The formula for the slope of the least-squares regression line is $b = r (s_y / s_x)$. Substituting the given values yields $b = 0.5 \\times (12 / 4) = 0.5 \\times 3 = 1.5$. Therefore, the correct slope is 1.5, representing the average increase in $y$ per unit increase in $x$.",
      "id": "ap-statistics-5-1-q2",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which of the following describes a major danger when using a least-squares regression model for prediction?",
      "choices": [
        "Calculating the intercept when the explanatory variable equals zero",
        "Extrapolating by predicting values far outside the observed range of the explanatory variable",
        "Minimizing the sum of the squared vertical residuals instead of absolute residuals",
        "Using the sample means of $x$ and $y$ to determine the placement of the regression line"
      ],
      "answer": 1,
      "explanation": "Extrapolation occurs when a model is used to predict values for explanatory variables that fall well outside the range of data used to create the model. This is dangerous because the linear pattern observed locally may not hold true in other regions.",
      "id": "ap-statistics-5-1-q3",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "How is the $y$-intercept ($a$) of the least-squares regression line typically calculated once the slope ($b$) is known?",
      "choices": [
        "By setting $x$ equal to zero and solving for the maximum residual value",
        "By using the equation $a = \\bar{y} - b\\bar{x}$ based on the means of both variables",
        "By taking the product of the standard deviations multiplied by the correlation coefficient",
        "By averaging all the observed response variable values in the sample dataset"
      ],
      "answer": 1,
      "explanation": "The least-squares regression line always passes through the point of averages $(\\bar{x}, \\bar{y})$. Using this property, substituting the means into the linear equation gives $\\bar{y} = a + b\\bar{x}$, which algebraically rearranges to $a = \\bar{y} - b\\bar{x}$.",
      "id": "ap-statistics-5-1-q4",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Based on the passage, what is the predicted weekly stress level for an office worker who takes $5$ public transit trips per week?",
      "choices": [
        "$12.5$ units",
        "$19.0$ units",
        "$21.5$ units",
        "$26.1$ units"
      ],
      "answer": 2,
      "explanation": "To find the predicted weekly stress level, substitute the given transit frequency $x = 5$ into the provided least-squares regression equation $\\hat{y} = 12.5 + 1.8x$. Calculating this gives $\\hat{y} = 12.5 + 1.8(5) = 12.5 + 9.0 = 21.5$ units. Therefore, the correct choice is $21.5$ units, which accurately utilizes the model coefficients.",
      "id": "ap-statistics-5-2-q1",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "passage": "Original instructional passage; described studies and figures are hypothetical.\n\nRecent hypothetical investigations into urban commuter habits analyzed the relationship between weekly public transit usage (measured in trips per week, denoted as $x$) and self-reported weekly stress levels (measured on a standardized scale from $0$ to $50$, denoted as $y$) among $200$ downtown office workers. A least-squares regression line was fitted to the sample data, yielding the equation $\\hat{y} = 12.5 + 1.8x$. A residual analysis of the fitted model revealed a symmetric random scatter around the horizontal zero line for transit frequencies between $1$ and $10$ trips per week, with a residual standard deviation of approximately $s = 4.1$ units. However, for a small subset of commuters reporting $15$ or more transit trips per week, the residuals exhibited a distinct downward curvature, and two extreme data points with high leverage showed large negative residuals. These high-leverage points belonged to workers who experienced unique scheduling flexibilities that decoupled long transit times from traditional stress markers. Consequently, researchers concluded that while the linear model performs adequately for moderate commuting frequencies, it fails to capture the flattening of stress accumulation at extreme transit volumes."
    },
    {
      "question": "A hypothetical model predicts weekly stress score from weekly transit trips x as ŷ = 12.5 + 1.8x. A worker has x = 10 and residual e = −2.3, defined as observed minus predicted. What is the observed stress score?",
      "choices": [
        "28.2 units",
        "30.6 units",
        "32.9 units",
        "35.2 units"
      ],
      "answer": 0,
      "explanation": "The predicted score is 12.5 + 1.8(10) = 30.5. Since residual = observed − predicted, observed = predicted + residual = 30.5 − 2.3 = 28.2. A negative residual means the actual observation lies below the prediction, not above it.",
      "id": "ap-statistics-5-2-q2",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "passage": "Original instructional passage; described studies and figures are hypothetical.\n\nRecent hypothetical investigations into urban commuter habits analyzed the relationship between weekly public transit usage (measured in trips per week, denoted as $x$) and self-reported weekly stress levels (measured on a standardized scale from $0$ to $50$, denoted as $y$) among $200$ downtown office workers. A least-squares regression line was fitted to the sample data, yielding the equation $\\hat{y} = 12.5 + 1.8x$. A residual analysis of the fitted model revealed a symmetric random scatter around the horizontal zero line for transit frequencies between $1$ and $10$ trips per week, with a residual standard deviation of approximately $s = 4.1$ units. However, for a small subset of commuters reporting $15$ or more transit trips per week, the residuals exhibited a distinct downward curvature, and two extreme data points with high leverage showed large negative residuals. These high-leverage points belonged to workers who experienced unique scheduling flexibilities that decoupled long transit times from traditional stress markers. Consequently, researchers concluded that while the linear model performs adequately for moderate commuting frequencies, it fails to capture the flattening of stress accumulation at extreme transit volumes."
    },
    {
      "question": "According to the passage, what specific diagnostic pattern was observed for commuters reporting $15$ or more transit trips per week?",
      "choices": [
        "A funnel shape indicating increasing variance",
        "A distinct downward curvature",
        "A horizontal linear cluster with zero residuals",
        "A complete absence of data points in that range"
      ],
      "answer": 1,
      "explanation": "The passage explicitly states that for a small subset of commuters reporting $15$ or more transit trips per week, the residuals exhibited a distinct downward curvature. This indicates that the linear model fails to capture the true underlying relationship at extreme values, demonstrating a systematic departure from linearity.",
      "id": "ap-statistics-5-2-q3",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "passage": "Original instructional passage; described studies and figures are hypothetical.\n\nRecent hypothetical investigations into urban commuter habits analyzed the relationship between weekly public transit usage (measured in trips per week, denoted as $x$) and self-reported weekly stress levels (measured on a standardized scale from $0$ to $50$, denoted as $y$) among $200$ downtown office workers. A least-squares regression line was fitted to the sample data, yielding the equation $\\hat{y} = 12.5 + 1.8x$. A residual analysis of the fitted model revealed a symmetric random scatter around the horizontal zero line for transit frequencies between $1$ and $10$ trips per week, with a residual standard deviation of approximately $s = 4.1$ units. However, for a small subset of commuters reporting $15$ or more transit trips per week, the residuals exhibited a distinct downward curvature, and two extreme data points with high leverage showed large negative residuals. These high-leverage points belonged to workers who experienced unique scheduling flexibilities that decoupled long transit times from traditional stress markers. Consequently, researchers concluded that while the linear model performs adequately for moderate commuting frequencies, it fails to capture the flattening of stress accumulation at extreme transit volumes."
    },
    {
      "question": "Why did the researchers caution against relying on the linear model for extreme transit volumes based on the high-leverage points described in the passage?",
      "choices": [
        "The high-leverage points had positive residuals that inflated the overall slope",
        "The high-leverage points belonged to workers with unique scheduling flexibilities that distorted stress markers",
        "The points lacked any associated $y$-values",
        "The sample size was reduced below the minimum threshold for calculation"
      ],
      "answer": 1,
      "explanation": "The passage explicitly notes that the two extreme data points with high leverage belonged to workers who experienced unique scheduling flexibilities that decoupled long transit times from traditional stress markers, meaning these points represented special conditions rather than standard population behavior.",
      "id": "ap-statistics-5-2-q4",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application",
      "passage": "Original instructional passage; described studies and figures are hypothetical.\n\nRecent hypothetical investigations into urban commuter habits analyzed the relationship between weekly public transit usage (measured in trips per week, denoted as $x$) and self-reported weekly stress levels (measured on a standardized scale from $0$ to $50$, denoted as $y$) among $200$ downtown office workers. A least-squares regression line was fitted to the sample data, yielding the equation $\\hat{y} = 12.5 + 1.8x$. A residual analysis of the fitted model revealed a symmetric random scatter around the horizontal zero line for transit frequencies between $1$ and $10$ trips per week, with a residual standard deviation of approximately $s = 4.1$ units. However, for a small subset of commuters reporting $15$ or more transit trips per week, the residuals exhibited a distinct downward curvature, and two extreme data points with high leverage showed large negative residuals. These high-leverage points belonged to workers who experienced unique scheduling flexibilities that decoupled long transit times from traditional stress markers. Consequently, researchers concluded that while the linear model performs adequately for moderate commuting frequencies, it fails to capture the flattening of stress accumulation at extreme transit volumes."
    },
    {
      "question": "If a regression model has an $R^2$ of 0.90, which statement is statistically accurate?",
      "choices": [
        "The slope of the regression line is 0.90.",
        "90% of the variability in the response variable is explained by the linear relationship.",
        "The correlation coefficient $r$ must be positive 0.90.",
        "90% of new data points will fall exactly on the regression line."
      ],
      "answer": 1,
      "explanation": "The coefficient of determination $R^2$ is defined as the proportion of the total variation in the response variable $y$ that is explained by the least-squares regression on $x$. An $R^2$ of 0.90 means 90% of the variability in $y$ is accounted for by the model. It does not equal the slope, nor does it guarantee the sign of $r$ (which could be -0.95). It certainly does not mean predictions are exact; residuals still exist for the remaining 10% of variation.",
      "id": "ap-statistics-5-3-q1",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "In a hypothetical simple linear regression, n = 10, total sum of squares SST = 500, and explained regression sum of squares SSR = 450. What is the residual standard deviation s?",
      "choices": [
        "2.50",
        "7.07",
        "10.00",
        "12.25"
      ],
      "answer": 0,
      "explanation": "The unexplained sum of squares is SSE = SST − SSR = 500 − 450 = 50. Divide by the residual degrees of freedom n − 2 = 8, then take the square root: s = √(50/8) = √6.25 = 2.50. Taking √50 without the degrees-of-freedom adjustment gives the wrong scale.",
      "id": "ap-statistics-5-3-q2",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "Which condition is necessary for the residual standard deviation $s$ to be a valid estimate of prediction error?",
      "choices": [
        "The relationship between $x$ and $y$ must be causal.",
        "The residuals must be approximately normally distributed with constant variance.",
        "The correlation coefficient $r$ must be greater than 0.9.",
        "The sample size $n$ must be greater than 30."
      ],
      "answer": 1,
      "explanation": "For the residual standard deviation $s$ to serve as a reliable estimate of the standard error of prediction, and for inference (like prediction intervals) to be valid, the model assumptions must hold. These include linearity, independence, normality of residuals, and constant variance (homoscedasticity). Causation is not required for prediction accuracy, only for causal claims. A high $r$ is not strictly necessary for $s$ to be calculated, though it affects the magnitude of $s$. Sample size affects precision but is not a condition for the definition of $s$ itself.",
      "id": "ap-statistics-5-3-q3",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    },
    {
      "question": "If $R^2 = 0.64$ and the correlation is negative, what is the value of $r$?",
      "choices": [
        "0.64",
        "-0.64",
        "0.80",
        "-0.80"
      ],
      "answer": 3,
      "explanation": "The coefficient of determination $R^2$ is the square of the correlation coefficient $r$. Therefore, $|r| = \\sqrt{R^2} = \\sqrt{0.64} = 0.80$. The sign of $r$ is determined by the direction of the association. Since the problem states the correlation is negative, $r$ must be $-0.80$. This distinguishes $R^2$, which is always positive and indicates strength, from $r$, which indicates both strength and direction of the linear relationship.",
      "id": "ap-statistics-5-3-q4",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Medium",
      "format": "mcq",
      "questionType": "Course application"
    }
  ],
  "frq": [
    {
      "question": "A local school district wants to evaluate whether a new homework policy improves student test scores. District researchers collect final exam scores from two high schools: High School X, which implemented the new policy, and High School Y, which kept the traditional policy. Describe how the district should compare the two distributions of scores using both graphical and numerical summaries, explain why they must consider resistant summaries, and clarify the limitations of concluding that the new policy caused any observed difference in scores.",
      "responseMode": "math",
      "criteria": [
        {
          "key": "summaries",
          "label": "Graphical and Numerical Summaries",
          "prompt": "Explain how parallel boxplots and resistant summaries should be used to compare the two school distributions.",
          "points": 3,
          "guidance": "Student should mention comparing centers and spreads using medians and IQRs alongside visual displays like boxplots."
        },
        {
          "key": "resistance",
          "label": "Need for Resistant Summaries",
          "prompt": "Explain why resistant measures are preferred over non-resistant ones for this educational dataset.",
          "points": 4,
          "guidance": "Student must note that test score distributions often feature skewed tails or outliers, making the median and IQR safer than means and standard deviations."
        },
        {
          "key": "causation",
          "label": "Limitations on Causation",
          "prompt": "Explain why the district cannot definitively claim the new policy caused score differences.",
          "points": 3,
          "guidance": "Student should identify that this is an observational comparison rather than a randomized experiment, leaving room for confounding variables like student demographics or teacher quality."
        }
      ],
      "id": "ap-statistics-1-1-writing",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Hard",
      "format": "frq",
      "set": 1,
      "maxPoints": 10,
      "questionType": "Targeted written practice",
      "rubric": "Graphical and Numerical Summaries (3 points): Student should mention comparing centers and spreads using medians and IQRs alongside visual displays like boxplots.\nNeed for Resistant Summaries (4 points): Student must note that test score distributions often feature skewed tails or outliers, making the median and IQR safer than means and standard deviations.\nLimitations on Causation (3 points): Student should identify that this is an observational comparison rather than a randomized experiment, leaving room for confounding variables like student demographics or teacher quality.",
      "explanation": "Student should mention comparing centers and spreads using medians and IQRs alongside visual displays like boxplots.\nStudent must note that test score distributions often feature skewed tails or outliers, making the median and IQR safer than means and standard deviations.\nStudent should identify that this is an observational comparison rather than a randomized experiment, leaving room for confounding variables like student demographics or teacher quality."
    },
    {
      "question": "A local newspaper wants to survey residents about a proposed tax increase. They decide to distribute questionnaires only to people attending a farmer's market on Saturday. Critique this sampling method. Identify the specific type of bias present, explain how it affects the scope of inference, and propose a better method using at least one specific sampling technique learned in this unit.",
      "criteria": [
        {
          "key": "bias_identification",
          "label": "Bias Identification",
          "prompt": "Identify the specific bias.",
          "points": 3,
          "guidance": "Must name 'convenience sampling' or 'selection bias.' Must explain that market attendees are not representative of all residents (e.g., excludes night workers, disabled individuals, non-local visitors)."
        },
        {
          "key": "scope_inference",
          "label": "Scope of Inference",
          "prompt": "Explain impact on inference.",
          "points": 4,
          "guidance": "Must state that results cannot be generalized to the entire population. Must link the bias to the parameter (true resident opinion) and statistic (market response), noting the statistic is a poor estimator."
        },
        {
          "key": "better_method",
          "label": "Method Proposal",
          "prompt": "Propose a better method.",
          "points": 3,
          "guidance": "Must suggest a valid method like SRS, random digit dialing, or stratified sampling by district. Must specify how random selection would ensure representativeness."
        }
      ],
      "responseMode": "math",
      "id": "ap-statistics-1-2-writing",
      "domain": "Stats: Exploring One-Variable Data and Collecting Data",
      "difficulty": "Hard",
      "format": "frq",
      "set": 2,
      "maxPoints": 10,
      "questionType": "Targeted written practice",
      "rubric": "Bias Identification (3 points): Must name 'convenience sampling' or 'selection bias.' Must explain that market attendees are not representative of all residents (e.g., excludes night workers, disabled individuals, non-local visitors).\nScope of Inference (4 points): Must state that results cannot be generalized to the entire population. Must link the bias to the parameter (true resident opinion) and statistic (market response), noting the statistic is a poor estimator.\nMethod Proposal (3 points): Must suggest a valid method like SRS, random digit dialing, or stratified sampling by district. Must specify how random selection would ensure representativeness.",
      "explanation": "Must name 'convenience sampling' or 'selection bias.' Must explain that market attendees are not representative of all residents (e.g., excludes night workers, disabled individuals, non-local visitors).\nMust state that results cannot be generalized to the entire population. Must link the bias to the parameter (true resident opinion) and statistic (market response), noting the statistic is a poor estimator.\nMust suggest a valid method like SRS, random digit dialing, or stratified sampling by district. Must specify how random selection would ensure representativeness."
    },
    {
      "question": "A local school district evaluates whether student participation in an after-school tutoring program is independent of whether they improve their standardized math score by the end of the year. In a hypothetical study of 600 students, 250 participated in tutoring. Out of the 250 participants, 175 improved their scores. Out of the 350 non-participants, 140 improved their scores. State hypotheses or analytical definitions to test for independence, compute the necessary conditional probabilities, and interpret your findings in context.",
      "responseMode": "math",
      "criteria": [
        {
          "key": "calculation",
          "label": "Conditional Probability Calculations",
          "prompt": "Calculate the conditional probability of score improvement given tutoring and the conditional probability of score improvement given no tutoring.",
          "points": 3,
          "guidance": "Student must compute $P(\\text{Improve} \\mid \\text{Tutoring}) = 175/250 = 0.70$ and $P(\\text{Improve} \\mid \\text{No Tutoring}) = 140/350 = 0.40$."
        },
        {
          "key": "definition",
          "label": "Independence Definition Application",
          "prompt": "Explain what these numerical values indicate regarding the independence of tutoring and score improvement.",
          "points": 4,
          "guidance": "Student must state that because $0.70 \\neq 0.40$, the events are not independent, meaning tutoring and score improvement are associated."
        },
        {
          "key": "context",
          "label": "Contextual Interpretation",
          "prompt": "Interpret the practical meaning of the association within the school district setting.",
          "points": 3,
          "guidance": "Student must explain that students who participate in tutoring have a higher proportion of score improvements compared to non-participants, suggesting a positive association between the program and academic progress."
        }
      ],
      "id": "ap-statistics-2-1-writing",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Hard",
      "format": "frq",
      "set": 1,
      "maxPoints": 10,
      "questionType": "Targeted written practice",
      "rubric": "Conditional Probability Calculations (3 points): Student must compute $P(\\text{Improve} \\mid \\text{Tutoring}) = 175/250 = 0.70$ and $P(\\text{Improve} \\mid \\text{No Tutoring}) = 140/350 = 0.40$.\nIndependence Definition Application (4 points): Student must state that because $0.70 \\neq 0.40$, the events are not independent, meaning tutoring and score improvement are associated.\nContextual Interpretation (3 points): Student must explain that students who participate in tutoring have a higher proportion of score improvements compared to non-participants, suggesting a positive association between the program and academic progress.",
      "explanation": "Student must compute $P(\\text{Improve} \\mid \\text{Tutoring}) = 175/250 = 0.70$ and $P(\\text{Improve} \\mid \\text{No Tutoring}) = 140/350 = 0.40$.\nStudent must state that because $0.70 \\neq 0.40$, the events are not independent, meaning tutoring and score improvement are associated.\nStudent must explain that students who participate in tutoring have a higher proportion of score improvements compared to non-participants, suggesting a positive association between the program and academic progress."
    },
    {
      "question": "A pharmaceutical company claims that a new drug eliminates symptoms in 90% of users. A researcher treats a random sample of 15 patients. Define a discrete random variable $X$ for this scenario. State the four BINS conditions explicitly, verifying each. Calculate the probability that exactly 14 patients report total symptom elimination. Finally, explain in one sentence why this probability does not prove the drug is ineffective if observed, referring to the difference between a single event's probability and statistical significance.",
      "criteria": [
        {
          "key": "rv_def",
          "label": "Variable Definition",
          "prompt": "Clearly define X and state the binomial notation.",
          "points": 3,
          "guidance": "Expected answer: 'Let X be the number of patients who report symptom elimination in the sample of 15. X ~ B(15, 0.90).' 3 points for clear definition and correct notation. 1-2 points for missing notation or imprecise wording."
        },
        {
          "key": "bins_check",
          "label": "BINS Verification",
          "prompt": "Verify Binary, Independent, Number, and Same conditions.",
          "points": 4,
          "guidance": "Expected answer: Binary (symptoms eliminated/not), Independent (random sample <10% of all users, or assume random assignment, state assumption), Number (fixed n=15), Same (p=0.9 constant). 4 points for all four correctly identified and justified. Deduct 1 point per missing or unjustified condition."
        },
        {
          "key": "interp",
          "label": "Calculation and Interpretation",
          "prompt": "Calculate P(X=14) and interpret regarding effectiveness.",
          "points": 3,
          "guidance": "Expected calculation: P(X=14) = C(15,14)(0.9)^14(0.1)^1 \\approx 0.2842. Interpretation: This probability is not extremely low (it is ~28%), so observing 14 successes is a fairly likely event under the claim; thus, it does not provide strong statistical evidence against the claim. 1 point for correct calc, 2 points for correct conceptual interpretation distinguishing probability from proof of ineffectiveness."
        }
      ],
      "responseMode": "math",
      "id": "ap-statistics-2-2-writing",
      "domain": "Stats: Probability, Random Variables, and Probability Distributions",
      "difficulty": "Hard",
      "format": "frq",
      "set": 2,
      "maxPoints": 10,
      "questionType": "Targeted written practice",
      "rubric": "Variable Definition (3 points): Expected answer: 'Let X be the number of patients who report symptom elimination in the sample of 15. X ~ B(15, 0.90).' 3 points for clear definition and correct notation. 1-2 points for missing notation or imprecise wording.\nBINS Verification (4 points): Expected answer: Binary (symptoms eliminated/not), Independent (random sample <10% of all users, or assume random assignment, state assumption), Number (fixed n=15), Same (p=0.9 constant). 4 points for all four correctly identified and justified. Deduct 1 point per missing or unjustified condition.\nCalculation and Interpretation (3 points): Expected calculation: P(X=14) = C(15,14)(0.9)^14(0.1)^1 \\approx 0.2842. Interpretation: This probability is not extremely low (it is ~28%), so observing 14 successes is a fairly likely event under the claim; thus, it does not provide strong statistical evidence against the claim. 1 point for correct calc, 2 points for correct conceptual interpretation distinguishing probability from proof of ineffectiveness.",
      "explanation": "Expected answer: 'Let X be the number of patients who report symptom elimination in the sample of 15. X ~ B(15, 0.90).' 3 points for clear definition and correct notation. 1-2 points for missing notation or imprecise wording.\nExpected answer: Binary (symptoms eliminated/not), Independent (random sample <10% of all users, or assume random assignment, state assumption), Number (fixed n=15), Same (p=0.9 constant). 4 points for all four correctly identified and justified. Deduct 1 point per missing or unjustified condition.\nExpected calculation: P(X=14) = C(15,14)(0.9)^14(0.1)^1 \\approx 0.2842. Interpretation: This probability is not extremely low (it is ~28%), so observing 14 successes is a fairly likely event under the claim; thus, it does not provide strong statistical evidence against the claim. 1 point for correct calc, 2 points for correct conceptual interpretation distinguishing probability from proof of ineffectiveness."
    },
    {
      "question": "A consumer advocacy group suspects that more than 64% of smartphones sold in a certain region contain a minor pre-installed software defect. They collect a random sample of 500 smartphones and find that 335 have the defect. (a) State the point estimate for the population proportion and verify the conditions for constructing a confidence interval. (b) Calculate the standard error of the sample proportion. (c) Construct and interpret a 95% confidence interval for the true proportion of smartphones with the defect.",
      "criteria": [
        {
          "key": "criteria_a",
          "label": "Point Estimate and Conditions",
          "prompt": "Calculate the sample proportion $\\hat{p}$ and explicitly verify the Random, Normal (Large Counts), and Independent conditions.",
          "points": 3,
          "guidance": "Expected: $\\hat{p} = 335/500 = 0.67$. Verify random sample is given, check $500(0.67) = 335 \\ge 10$ and $500(0.33) = 165 \\ge 10$, and assume total population of smartphones exceeds $10(500) = 5000$."
        },
        {
          "key": "criteria_b",
          "label": "Standard Error Calculation",
          "prompt": "Show the substitution into the standard error formula and compute the numerical value.",
          "points": 4,
          "guidance": "Expected: $\\text{SE} = \\sqrt{\\frac{0.67(0.33)}{500}} = \\sqrt{\\frac{0.2211}{500}} = \\sqrt{0.0004422} \\approx 0.0210$."
        },
        {
          "key": "criteria_c",
          "label": "Interval Construction and Interpretation",
          "prompt": "Compute the 95% confidence interval using $z^* = 1.960$ and provide an appropriate context-based interpretation.",
          "points": 3,
          "guidance": "Expected: $ME = 1.960 \\times 0.0210 \\approx 0.0412$. Interval: $0.67 \\pm 0.0412 = (0.6288, 0.7112)$. Interpretation: We are 95% confident that the true proportion of all smartphones in the region with the defect is between 0.6288 and 0.7112."
        }
      ],
      "responseMode": "math",
      "id": "ap-statistics-3-1-writing",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Hard",
      "format": "frq",
      "set": 1,
      "maxPoints": 10,
      "questionType": "Targeted written practice",
      "rubric": "Point Estimate and Conditions (3 points): Expected: $\\hat{p} = 335/500 = 0.67$. Verify random sample is given, check $500(0.67) = 335 \\ge 10$ and $500(0.33) = 165 \\ge 10$, and assume total population of smartphones exceeds $10(500) = 5000$.\nStandard Error Calculation (4 points): Expected: $\\text{SE} = \\sqrt{\\frac{0.67(0.33)}{500}} = \\sqrt{\\frac{0.2211}{500}} = \\sqrt{0.0004422} \\approx 0.0210$.\nInterval Construction and Interpretation (3 points): Expected: $ME = 1.960 \\times 0.0210 \\approx 0.0412$. Interval: $0.67 \\pm 0.0412 = (0.6288, 0.7112)$. Interpretation: We are 95% confident that the true proportion of all smartphones in the region with the defect is between 0.6288 and 0.7112.",
      "explanation": "Expected: $\\hat{p} = 335/500 = 0.67$. Verify random sample is given, check $500(0.67) = 335 \\ge 10$ and $500(0.33) = 165 \\ge 10$, and assume total population of smartphones exceeds $10(500) = 5000$.\nExpected: $\\text{SE} = \\sqrt{\\frac{0.67(0.33)}{500}} = \\sqrt{\\frac{0.2211}{500}} = \\sqrt{0.0004422} \\approx 0.0210$.\nExpected: $ME = 1.960 \\times 0.0210 \\approx 0.0412$. Interval: $0.67 \\pm 0.0412 = (0.6288, 0.7112)$. Interpretation: We are 95% confident that the true proportion of all smartphones in the region with the defect is between 0.6288 and 0.7112."
    },
    {
      "question": "A tech company claims 98% of their new servers are defect-free. A quality control team tests a random sample of 150 servers and finds 145 are defect-free. Write a paragraph interpreting the test results, distinguishing between statistical and practical significance.",
      "criteria": [
        {
          "key": "calculation_interpretation",
          "label": "Correct Test Calculation and Decision",
          "prompt": "State H0/Ha, check conditions, calculate z/P-value, and make a correct decision at alpha=0.05.",
          "points": 3,
          "guidance": "Must show z approx -1.73 or similar, P approx 0.08, leading to fail to reject H0. Accurate arithmetic and condition checking (np0=147, n(1-p0)=3 fails) are required."
        },
        {
          "key": "stat_practical",
          "label": "Statistical vs Practical Significance",
          "prompt": "Explain what statistical significance would mean here and why the result might be practically significant despite the test outcome.",
          "points": 4,
          "guidance": "Must note that failing to reject H0 means no strong evidence the rate is below 98%. However, the observed 96.7% is close to 98%, so even if significant, the difference is small. Must distinguish 'evidence against claim' from 'claim is false'."
        },
        {
          "key": "contextualization",
          "label": "Contextual Relevance",
          "prompt": "Discuss the implications for the company based on the sample data and the test result.",
          "points": 3,
          "guidance": "Should mention that the data does not provide strong evidence to reject the 98% claim, so the company's claim remains plausible. Must avoid claiming the claim is proven true."
        }
      ],
      "responseMode": "math",
      "id": "ap-statistics-3-2-writing",
      "domain": "Stats: Inference for Categorical Data: Proportions",
      "difficulty": "Hard",
      "format": "frq",
      "set": 2,
      "maxPoints": 10,
      "questionType": "Targeted written practice",
      "rubric": "Correct Test Calculation and Decision (3 points): Must show z approx -1.73 or similar, P approx 0.08, leading to fail to reject H0. Accurate arithmetic and condition checking (np0=147, n(1-p0)=3 fails) are required.\nStatistical vs Practical Significance (4 points): Must note that failing to reject H0 means no strong evidence the rate is below 98%. However, the observed 96.7% is close to 98%, so even if significant, the difference is small. Must distinguish 'evidence against claim' from 'claim is false'.\nContextual Relevance (3 points): Should mention that the data does not provide strong evidence to reject the 98% claim, so the company's claim remains plausible. Must avoid claiming the claim is proven true.",
      "explanation": "Must show z approx -1.73 or similar, P approx 0.08, leading to fail to reject H0. Accurate arithmetic and condition checking (np0=147, n(1-p0)=3 fails) are required.\nMust note that failing to reject H0 means no strong evidence the rate is below 98%. However, the observed 96.7% is close to 98%, so even if significant, the difference is small. Must distinguish 'evidence against claim' from 'claim is false'.\nShould mention that the data does not provide strong evidence to reject the 98% claim, so the company's claim remains plausible. Must avoid claiming the claim is proven true."
    },
    {
      "question": "A pharmaceutical company tests a new drug on a random sample of 40 patients. The sample mean reduction in blood pressure is 10 mmHg with a standard deviation of 8 mmHg. The company claims the drug is effective if the mean reduction exceeds 5 mmHg. A simple calculation shows t = 3.95 and P < 0.001. Write a brief report evaluating the statistical significance, the conditions for inference, and the practical significance of this finding.",
      "criteria": [
        {
          "key": "stat_sig",
          "label": "Statistical Significance",
          "prompt": "Interpret the P-value and conclusion regarding H0.",
          "points": 3,
          "guidance": "Must state that with P < 0.001 (assuming alpha = 0.05), we reject H0. There is strong evidence the mean reduction is > 5 mmHg. Do not claim proof of 10 mmHg."
        },
        {
          "key": "conditions",
          "label": "Condition Check",
          "prompt": "Verify the Random and Normal conditions.",
          "points": 4,
          "guidance": "Random: Explicitly stated as a random sample. Normal: n=40 is >= 30, so CLT applies even if population distribution is unknown/heavily skewed. No need to inspect data plot for large n."
        },
        {
          "key": "pract_sig",
          "label": "Practical Significance",
          "prompt": "Discuss if the result is practically important.",
          "points": 3,
          "guidance": "Mention that a 10 mmHg reduction is often considered clinically meaningful in hypertension treatment. Connect the statistical finding to the real-world context of blood pressure management."
        }
      ],
      "responseMode": "math",
      "id": "ap-statistics-4-1-writing",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Hard",
      "format": "frq",
      "set": 1,
      "maxPoints": 10,
      "questionType": "Targeted written practice",
      "rubric": "Statistical Significance (3 points): Must state that with P < 0.001 (assuming alpha = 0.05), we reject H0. There is strong evidence the mean reduction is > 5 mmHg. Do not claim proof of 10 mmHg.\nCondition Check (4 points): Random: Explicitly stated as a random sample. Normal: n=40 is >= 30, so CLT applies even if population distribution is unknown/heavily skewed. No need to inspect data plot for large n.\nPractical Significance (3 points): Mention that a 10 mmHg reduction is often considered clinically meaningful in hypertension treatment. Connect the statistical finding to the real-world context of blood pressure management.",
      "explanation": "Must state that with P < 0.001 (assuming alpha = 0.05), we reject H0. There is strong evidence the mean reduction is > 5 mmHg. Do not claim proof of 10 mmHg.\nRandom: Explicitly stated as a random sample. Normal: n=40 is >= 30, so CLT applies even if population distribution is unknown/heavily skewed. No need to inspect data plot for large n.\nMention that a 10 mmHg reduction is often considered clinically meaningful in hypertension treatment. Connect the statistical finding to the real-world context of blood pressure management."
    },
    {
      "question": "A local school district wants to evaluate whether an intensive reading intervention program improves student comprehension scores. Researchers select a random sample of $n = 12$ students. Each student takes a standardized reading comprehension test before starting the program and a second equivalent test after completing the program. The sample mean difference in scores (Post-test minus Pre-test) is $\\bar{x}_d = 6.5$ points, with a sample standard deviation of $s_d = 4.0$ points. Construct a complete significance test at the $\\alpha = 0.01$ level to determine if there is convincing evidence that the reading program increases comprehension scores on average. Address hypotheses, conditions, test statistic, p-value, and conclusion in context.",
      "responseMode": "math",
      "criteria": [
        {
          "key": "hypotheses_and_conditions",
          "label": "Hypotheses and Conditions",
          "prompt": "State the correct hypotheses in terms of the parameter $\\mu_d$ and verify the required conditions for inference.",
          "points": 3,
          "guidance": "Student must state $H_0: \\mu_d = 0$ and $H_a: \\mu_d > 0$. Must note random sampling and address the normality condition or sample size check for $n = 12$."
        },
        {
          "key": "test_statistic_and_pvalue",
          "label": "Test Statistic and P-value",
          "prompt": "Calculate the standard error, the t-test statistic, degrees of freedom, and state the resulting p-value range.",
          "points": 4,
          "guidance": "Student must compute $SE = 4.0 / \\sqrt{12} \\approx 1.155$, $t = 6.5 / 1.155 \\approx 5.63$, $df = 11$, and note that the p-value is extremely small (p < 0.001)."
        },
        {
          "key": "conclusion_in_context",
          "label": "Conclusion in Context",
          "prompt": "Make a statistical decision comparing the p-value to $\\alpha$ and provide a clear conclusion in the context of the reading program.",
          "points": 3,
          "guidance": "Student must reject $H_0$ because p < 0.01 and conclude there is convincing evidence that the reading program increases average reading comprehension scores."
        }
      ],
      "id": "ap-statistics-4-2-writing",
      "domain": "Stats: Inference for Quantitative Data: Means",
      "difficulty": "Hard",
      "format": "frq",
      "set": 2,
      "maxPoints": 10,
      "questionType": "Targeted written practice",
      "rubric": "Hypotheses and Conditions (3 points): Student must state $H_0: \\mu_d = 0$ and $H_a: \\mu_d > 0$. Must note random sampling and address the normality condition or sample size check for $n = 12$.\nTest Statistic and P-value (4 points): Student must compute $SE = 4.0 / \\sqrt{12} \\approx 1.155$, $t = 6.5 / 1.155 \\approx 5.63$, $df = 11$, and note that the p-value is extremely small (p < 0.001).\nConclusion in Context (3 points): Student must reject $H_0$ because p < 0.01 and conclude there is convincing evidence that the reading program increases average reading comprehension scores.",
      "explanation": "Student must state $H_0: \\mu_d = 0$ and $H_a: \\mu_d > 0$. Must note random sampling and address the normality condition or sample size check for $n = 12$.\nStudent must compute $SE = 4.0 / \\sqrt{12} \\approx 1.155$, $t = 6.5 / 1.155 \\approx 5.63$, $df = 11$, and note that the p-value is extremely small (p < 0.001).\nStudent must reject $H_0$ because p < 0.01 and conclude there is convincing evidence that the reading program increases average reading comprehension scores."
    },
    {
      "question": "A researcher collects data on the number of hours employees spend training per month ($x$) and their corresponding monthly productivity score ($y$). The summary statistics are $\\bar{x} = 10$, $s_x = 3$, $\\bar{y} = 80$, $s_y = 12$, and $r = 0.75$. Calculate the least-squares regression equation for this scenario and interpret the slope in context.",
      "responseMode": "math",
      "criteria": [
        {
          "key": "slope",
          "label": "Slope Calculation",
          "prompt": "Calculate the numerical value of the slope $b$ using the given formula.",
          "points": 3,
          "guidance": "Multiply the correlation $0.75$ by the ratio of standard deviations $(12 / 3)$, resulting in $b = 3.0$."
        },
        {
          "key": "intercept",
          "label": "Intercept Calculation",
          "prompt": "Calculate the numerical value of the $y$-intercept $a$.",
          "points": 4,
          "guidance": "Use $a = \\bar{y} - b\\bar{x}$, which is $80 - (3.0 \\times 10) = 50$."
        },
        {
          "key": "interpretation",
          "label": "Slope Interpretation",
          "prompt": "Interpret the meaning of the slope in the context of training hours and productivity score.",
          "points": 3,
          "guidance": "State that for every additional hour of training per month, the predicted monthly productivity score increases by an average of 3.0 points."
        }
      ],
      "id": "ap-statistics-5-1-writing",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Hard",
      "format": "frq",
      "set": 1,
      "maxPoints": 10,
      "questionType": "Targeted written practice",
      "rubric": "Slope Calculation (3 points): Multiply the correlation $0.75$ by the ratio of standard deviations $(12 / 3)$, resulting in $b = 3.0$.\nIntercept Calculation (4 points): Use $a = \\bar{y} - b\\bar{x}$, which is $80 - (3.0 \\times 10) = 50$.\nSlope Interpretation (3 points): State that for every additional hour of training per month, the predicted monthly productivity score increases by an average of 3.0 points.",
      "explanation": "Multiply the correlation $0.75$ by the ratio of standard deviations $(12 / 3)$, resulting in $b = 3.0$.\nUse $a = \\bar{y} - b\\bar{x}$, which is $80 - (3.0 \\times 10) = 50$.\nState that for every additional hour of training per month, the predicted monthly productivity score increases by an average of 3.0 points."
    },
    {
      "question": "A researcher fits a least-squares regression model to study the relationship between weekly exercise hours ($x$) and resting heart rate ($y$) among $100$ adults. The resulting equation is $\\hat{y} = 75 - 1.5x$, with a residual standard deviation of $s = 3.2$ units. A residual plot shows a clear U-shaped curve where residuals are positive for low and high exercise hours, and negative for moderate exercise hours. Furthermore, one participant who exercises $15$ hours per week has a resting heart rate of $68$ bpm and a large positive residual relative to the curved trend. Explain how the researcher should interpret the U-shaped residual plot, calculate the predicted resting heart rate and residual for the participant who exercises $15$ hours per week, and evaluate the potential impact of this participant's data point on the linear model.",
      "responseMode": "math",
      "criteria": [
        {
          "key": "residual_plot",
          "label": "Residual Plot Interpretation",
          "prompt": "Explain what the U-shaped residual plot indicates about the appropriateness of the linear model.",
          "points": 3,
          "guidance": "Student must state that a U-shaped pattern in the residual plot indicates a violation of the linearity condition, meaning a straight line is not the proper model for the data."
        },
        {
          "key": "calculation",
          "label": "Calculation of Prediction and Residual",
          "prompt": "Calculate the predicted resting heart rate and the residual for the participant who exercises $15$ hours per week.",
          "points": 4,
          "guidance": "Student must compute $\\hat{y} = 75 - 1.5(15) = 52.5$, and then calculate the residual $e = 68 - 52.5 = 15.5$ bpm."
        },
        {
          "key": "influence",
          "label": "Evaluation of Model Impact",
          "prompt": "Evaluate whether the participant's data point is influential and discuss the consequences for the regression line.",
          "points": 3,
          "guidance": "Student must recognize that $x = 15$ is at the extreme end (high leverage) and has a large positive residual, making it an influential point that likely pulls the regression line upward at high exercise values."
        }
      ],
      "id": "ap-statistics-5-2-writing",
      "domain": "Stats: Regression Analysis",
      "difficulty": "Hard",
      "format": "frq",
      "set": 2,
      "maxPoints": 10,
      "questionType": "Targeted written practice",
      "rubric": "Residual Plot Interpretation (3 points): Student must state that a U-shaped pattern in the residual plot indicates a violation of the linearity condition, meaning a straight line is not the proper model for the data.\nCalculation of Prediction and Residual (4 points): Student must compute $\\hat{y} = 75 - 1.5(15) = 52.5$, and then calculate the residual $e = 68 - 52.5 = 15.5$ bpm.\nEvaluation of Model Impact (3 points): Student must recognize that $x = 15$ is at the extreme end (high leverage) and has a large positive residual, making it an influential point that likely pulls the regression line upward at high exercise values.",
      "explanation": "Student must state that a U-shaped pattern in the residual plot indicates a violation of the linearity condition, meaning a straight line is not the proper model for the data.\nStudent must compute $\\hat{y} = 75 - 1.5(15) = 52.5$, and then calculate the residual $e = 68 - 52.5 = 15.5$ bpm.\nStudent must recognize that $x = 15$ is at the extreme end (high leverage) and has a large positive residual, making it an influential point that likely pulls the regression line upward at high exercise values.",
      "passage": "Original instructional passage; described studies and figures are hypothetical.\n\nRecent hypothetical investigations into urban commuter habits analyzed the relationship between weekly public transit usage (measured in trips per week, denoted as $x$) and self-reported weekly stress levels (measured on a standardized scale from $0$ to $50$, denoted as $y$) among $200$ downtown office workers. A least-squares regression line was fitted to the sample data, yielding the equation $\\hat{y} = 12.5 + 1.8x$. A residual analysis of the fitted model revealed a symmetric random scatter around the horizontal zero line for transit frequencies between $1$ and $10$ trips per week, with a residual standard deviation of approximately $s = 4.1$ units. However, for a small subset of commuters reporting $15$ or more transit trips per week, the residuals exhibited a distinct downward curvature, and two extreme data points with high leverage showed large negative residuals. These high-leverage points belonged to workers who experienced unique scheduling flexibilities that decoupled long transit times from traditional stress markers. Consequently, researchers concluded that while the linear model performs adequately for moderate commuting frequencies, it fails to capture the flattening of stress accumulation at extreme transit volumes."
    }
  ],
  "flashcards": [
    {
      "term": "Parameter",
      "answer": "A numerical characteristic describing a population, typically unknown and denoted by Greek letters.",
      "id": "ap-statistics-1-1-card1",
      "unit": "Stats: Exploring One-Variable Data and Collecting Data"
    },
    {
      "term": "Statistic",
      "answer": "A numerical characteristic calculated from sample data, used to estimate population parameters.",
      "id": "ap-statistics-1-1-card2",
      "unit": "Stats: Exploring One-Variable Data and Collecting Data"
    },
    {
      "term": "Resistant Summary",
      "answer": "A summary statistic, such as the median or IQR, that is relatively unaffected by extreme values or outliers.",
      "id": "ap-statistics-1-1-card3",
      "unit": "Stats: Exploring One-Variable Data and Collecting Data"
    },
    {
      "term": "Parameter",
      "answer": "A numerical summary of a population; fixed but usually unknown.",
      "id": "ap-statistics-1-2-card1",
      "unit": "Stats: Exploring One-Variable Data and Collecting Data"
    },
    {
      "term": "Voluntary Response Bias",
      "answer": "Bias occurring when self-selected participants overrepresent strong opinions or characteristics.",
      "id": "ap-statistics-1-2-card2",
      "unit": "Stats: Exploring One-Variable Data and Collecting Data"
    },
    {
      "term": "Causation vs. Association",
      "answer": "Association is a statistical link; causation establishes one variable change causes another, requiring randomized experiments.",
      "id": "ap-statistics-1-2-card3",
      "unit": "Stats: Exploring One-Variable Data and Collecting Data"
    },
    {
      "term": "Random Assignment",
      "answer": "The process of using a random mechanism to place individuals into treatment groups, enabling causal inference by balancing confounding variables across groups.",
      "id": "ap-statistics-1-3-card1",
      "unit": "Stats: Exploring One-Variable Data and Collecting Data"
    },
    {
      "term": "Blocking",
      "answer": "Partitioning the experimental units into homogeneous groups (blocks) based on a variable known to affect the response, then randomizing treatments within each block to reduce variability.",
      "id": "ap-statistics-1-3-card2",
      "unit": "Stats: Exploring One-Variable Data and Collecting Data"
    },
    {
      "term": "Confounding Variable",
      "answer": "An extraneous variable that correlates with both the independent variable and the dependent variable, potentially distorting the apparent relationship between them in an observational study or poorly designed experiment.",
      "id": "ap-statistics-1-3-card3",
      "unit": "Stats: Exploring One-Variable Data and Collecting Data"
    },
    {
      "term": "Conditional Probability Formula",
      "answer": "$P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}$, valid when $P(B) > 0$.",
      "id": "ap-statistics-2-1-card1",
      "unit": "Stats: Probability, Random Variables, and Probability Distributions"
    },
    {
      "term": "Multiplication Rule for Independent Events",
      "answer": "If $A$ and $B$ are independent, $P(A \\cap B) = P(A) \\cdot P(B)$.",
      "id": "ap-statistics-2-1-card2",
      "unit": "Stats: Probability, Random Variables, and Probability Distributions"
    },
    {
      "term": "Independence Condition",
      "answer": "Events $A$ and $B$ are independent if $P(A \\mid B) = P(A)$.",
      "id": "ap-statistics-2-1-card3",
      "unit": "Stats: Probability, Random Variables, and Probability Distributions"
    },
    {
      "term": "BINS Conditions",
      "answer": "Binary, Independent, Number, Same proportion. The independence condition requires $n < 10\\%$ of population when sampling without replacement.",
      "id": "ap-statistics-2-2-card1",
      "unit": "Stats: Probability, Random Variables, and Probability Distributions"
    },
    {
      "term": "Binomial Mean Formula",
      "answer": "$\\mu_X = np$, where $n$ is the number of trials and $p$ is the probability of success.",
      "id": "ap-statistics-2-2-card2",
      "unit": "Stats: Probability, Random Variables, and Probability Distributions"
    },
    {
      "term": "Parameter vs. Statistic",
      "answer": "A parameter (e.g., $p$) describes a population and is fixed. A statistic (e.g., $\\hat{p}$) describes a sample and varies from sample to sample.",
      "id": "ap-statistics-2-2-card3",
      "unit": "Stats: Probability, Random Variables, and Probability Distributions"
    },
    {
      "term": "Standard Error",
      "answer": "The standard deviation of the sampling distribution of a statistic; typically calculated as $\\sigma_{\\bar{x}} = \\frac{\\sigma}{\\sqrt{n}}$ for a sample mean.",
      "id": "ap-statistics-2-3-card1",
      "unit": "Stats: Probability, Random Variables, and Probability Distributions"
    },
    {
      "term": "Central Limit Theorem",
      "answer": "The rule stating that the sampling distribution of a mean from a large enough sample ($n \\ge 30$) will approach a normal distribution regardless of the underlying population shape.",
      "id": "ap-statistics-2-3-card2",
      "unit": "Stats: Probability, Random Variables, and Probability Distributions"
    },
    {
      "term": "10% Condition",
      "answer": "A sampling condition requiring $n \\le 0.10N$ to ensure independence when sampling without replacement from a finite population.",
      "id": "ap-statistics-2-3-card3",
      "unit": "Stats: Probability, Random Variables, and Probability Distributions"
    },
    {
      "term": "Parameter vs. Statistic",
      "answer": "A parameter is a fixed, unknown numerical value describing a population (e.g., $p$), whereas a statistic is a known value calculated from a sample (e.g., $\\hat{p}$).",
      "id": "ap-statistics-3-1-card1",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Large Counts Condition",
      "answer": "The requirement $n\\hat{p} \\ge 10$ and $n(1-\\hat{p}) \\ge 10$ ensuring that the sampling distribution of $\\hat{p}$ is approximately normal.",
      "id": "ap-statistics-3-1-card2",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Standard Error of a Proportion",
      "answer": "The estimated standard deviation of the sample proportion, calculated as $\\text{SE} = \\sqrt{\\frac{\\hat{p}(1-\\hat{p})}{n}}$.",
      "id": "ap-statistics-3-1-card3",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Standard Error in $z$-test",
      "answer": "$\\sqrt{\\frac{p_0(1-p_0)}{n}}$ – uses null parameter $p_0$, not $\\hat{p}$.",
      "id": "ap-statistics-3-2-card1",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Type I Error",
      "answer": "Rejecting a true null hypothesis ($H_0$). Probability is $\\alpha$.",
      "id": "ap-statistics-3-2-card2",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Approximation Condition",
      "answer": "$np_0 \\geq 10$ and $n(1-p_0) \\geq 10$ for Normal approximation validity.",
      "id": "ap-statistics-3-2-card3",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Pooled Proportion ($\\hat{p}_c$)",
      "answer": "The combined proportion of successes from two samples, calculated as $(x_1 + x_2)/(n_1 + n_2)$, used specifically in hypothesis tests for two proportions under the assumption that $p_1 = p_2$.",
      "id": "ap-statistics-3-3-card1",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Standard Error of $\\hat{p}_1 - \\hat{p}_2$",
      "answer": "The estimated standard deviation of the sampling distribution of the difference between two sample proportions, calculated using either separate proportions for intervals or the pooled proportion for tests.",
      "id": "ap-statistics-3-3-card2",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Statistical vs. Practical Significance",
      "answer": "Statistical significance means a result is unlikely to be due to chance alone, whereas practical significance refers to whether the observed difference is large enough to be meaningful in the real world.",
      "id": "ap-statistics-3-3-card3",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Chi-Square Test of Homogeneity",
      "answer": "A statistical test used to determine whether multiple populations share the same distribution of a categorical variable, utilizing separate random samples for each population.",
      "id": "ap-statistics-3-4-card1",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Chi-Square Test of Independence",
      "answer": "A statistical test used to determine whether two categorical variables are associated within a single population, utilizing a single random sample and calculated via $df = (r-1)(c-1)$.",
      "id": "ap-statistics-3-4-card2",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Expected Cell Count Condition",
      "answer": "The technical requirement that all expected cell counts in a contingency table must be at least 5 ($E \\ge 5$) to ensure the chi-square approximation is valid.",
      "id": "ap-statistics-3-4-card3",
      "unit": "Stats: Inference for Categorical Data: Proportions"
    },
    {
      "term": "Degrees of Freedom (1-sample t)",
      "answer": "df = n - 1, where n is the sample size. It represents the number of independent pieces of information used to estimate the parameter.",
      "id": "ap-statistics-4-1-card1",
      "unit": "Stats: Inference for Quantitative Data: Means"
    },
    {
      "term": "Standard Error of the Mean (SEM)",
      "answer": "SE = s / sqrt(n). It estimates the standard deviation of the sampling distribution of the sample mean.",
      "id": "ap-statistics-4-1-card2",
      "unit": "Stats: Inference for Quantitative Data: Means"
    },
    {
      "term": "Practical Significance",
      "answer": "The real-world importance of a result. A statistically significant result (small P-value) may have trivial practical significance if the effect size is negligible.",
      "id": "ap-statistics-4-1-card3",
      "unit": "Stats: Inference for Quantitative Data: Means"
    },
    {
      "term": "Paired Design",
      "answer": "An experimental or observational design where observations come in natural pairs, such as before-and-after measurements on the same individual.",
      "id": "ap-statistics-4-2-card1",
      "unit": "Stats: Inference for Quantitative Data: Means"
    },
    {
      "term": "Mean Difference ($\\mu_d$)",
      "answer": "The population parameter representing the true average difference between paired observations across all units in the population.",
      "id": "ap-statistics-4-2-card2",
      "unit": "Stats: Inference for Quantitative Data: Means"
    },
    {
      "term": "Standard Error of Mean Differences",
      "answer": "Calculated as $SE(\\bar{x}_d) = \\frac{s_d}{\\sqrt{n}}$, measuring the variability of sample mean differences around the true population mean difference.",
      "id": "ap-statistics-4-2-card3",
      "unit": "Stats: Inference for Quantitative Data: Means"
    },
    {
      "term": "Standard Error for Two Independent Means",
      "answer": "$SE = \\sqrt{\\frac{s_1^2}{n_1} + \\frac{s_2^2}{n_2}}$",
      "id": "ap-statistics-4-3-card1",
      "unit": "Stats: Inference for Quantitative Data: Means"
    },
    {
      "term": "Conservative Degrees of Freedom",
      "answer": "The smaller of $n_1 - 1$ and $n_2 - 1$",
      "id": "ap-statistics-4-3-card2",
      "unit": "Stats: Inference for Quantitative Data: Means"
    },
    {
      "term": "Practical vs. Statistical Significance",
      "answer": "Statistical significance indicates a real difference exists; practical significance judges if the magnitude of that difference matters in context.",
      "id": "ap-statistics-4-3-card3",
      "unit": "Stats: Inference for Quantitative Data: Means"
    },
    {
      "term": "Correlation Coefficient ($r$)",
      "answer": "A statistic measuring the strength and direction of the linear association between two quantitative variables, ranging from -1 to 1.",
      "id": "ap-statistics-5-1-card1",
      "unit": "Stats: Regression Analysis"
    },
    {
      "term": "Least-Squares Regression Line",
      "answer": "A model of the form $\\hat{y} = a + bx$ that minimizes the sum of the squared vertical residuals between observed and predicted values.",
      "id": "ap-statistics-5-1-card2",
      "unit": "Stats: Regression Analysis"
    },
    {
      "term": "Extrapolation",
      "answer": "The risky practice of using a regression model to predict values of the response variable for explanatory values far outside the observed data range.",
      "id": "ap-statistics-5-1-card3",
      "unit": "Stats: Regression Analysis"
    },
    {
      "term": "Residual",
      "answer": "The vertical distance between an observed response value and the value predicted by the regression line, calculated as $e = y - \\hat{y}$.",
      "id": "ap-statistics-5-2-card1",
      "unit": "Stats: Regression Analysis"
    },
    {
      "term": "Influential Point",
      "answer": "An observation with high leverage and a large residual that substantially alters the slope and intercept of a least-squares regression line if removed.",
      "id": "ap-statistics-5-2-card2",
      "unit": "Stats: Regression Analysis"
    },
    {
      "term": "Residual Plot",
      "answer": "A scatterplot of residuals versus the explanatory variable or predicted values, used to evaluate whether linear model conditions are satisfied.",
      "id": "ap-statistics-5-2-card3",
      "unit": "Stats: Regression Analysis"
    },
    {
      "term": "Residual Standard Deviation ($s$)",
      "answer": "The square root of the mean squared error, calculated as $\\sqrt{\\frac{SSE}{n-2}}$. It estimates the typical distance of data points from the regression line.",
      "id": "ap-statistics-5-3-card1",
      "unit": "Stats: Regression Analysis"
    },
    {
      "term": "Coefficient of Determination ($R^2$)",
      "answer": "The proportion of the variance in the dependent variable that is predictable from the independent variable. $R^2 = \\frac{SSR}{SST} = 1 - \\frac{SSE}{SST}$.",
      "id": "ap-statistics-5-3-card2",
      "unit": "Stats: Regression Analysis"
    },
    {
      "term": "Extrapolation",
      "answer": "Making predictions for $x$ values outside the range of the observed data. This is generally unsafe because the linear relationship may not hold beyond the data range.",
      "id": "ap-statistics-5-3-card3",
      "unit": "Stats: Regression Analysis"
    }
  ],
  "references": [
    {
      "title": "College Board course framework and current guidance",
      "url": "https://apcentral.collegeboard.org/courses/ap-statistics",
      "description": "Official course reference. AscendSAT lessons and questions are original instructional practice."
    },
    {
      "title": "Official exam and response-format information",
      "url": "https://apcentral.collegeboard.org/courses/ap-statistics/exam",
      "description": "Confirm current exam structure and calculator rules with the official guidance."
    }
  ],
  "exam": {
    "date": "2027-05-11",
    "note": "Original instructional practice, not a complete timed exam form or a calibrated AP score conversion."
  }
};
