"""Math 7 items, part C: comparing populations (SP.3-4) and probability (SP.5-8). Statistics are computed from the data."""
from fractions import Fraction as F
from statistics import median
from gen_common import fmt, dec, MINUS

M = MINUS


def mad(d):
    m = F(sum(d), len(d))
    return sum(abs(F(x) - m) for x in d) / len(d)


def sp_compare(b):
    C = "SP-B"
    # SP.3 variability
    d = [4, 6, 8, 10, 12]
    b.num(C, "SP.3", "stretch", f"What is the mean absolute deviation (MAD) of the data set {', '.join(map(str, d))}?", dec(mad(d)), [],
          f"The mean is {sum(d) // len(d)}. The distances from the mean are 4, 2, 0, 2, 4, which add to 12. 12 ÷ 5 = 2.4.",
          wrongs=[("12", "gave the sum of the distances without dividing"), ("0", "added the deviations without taking absolute values"), ("4", "gave the largest distance")])
    d = [2, 5, 8]
    b.mc(C, "SP.3", "core", f"What is the mean absolute deviation of {', '.join(map(str, d))}?", fmt(mad(d)),
         [("3", "gave the largest distance from the mean"), ("5", "gave the mean"), ("6", "gave the sum of the distances without dividing")],
         "The mean is 5. The distances are 3, 0, 3, which add to 6. 6 ÷ 3 = 2.")
    d = [14, 3, 9, 20, 6]
    b.mc(C, "SP.3", "core", f"What is the range of {', '.join(map(str, d))}?", str(max(d) - min(d)),
         [(str(max(d)), "gave the greatest value"), (str(d[0] - d[1]), "subtracted the first two values"), (str(int(median(d))), "gave the median")],
         f"Range = greatest − least = {max(d)} − {min(d)} = {max(d) - min(d)}.")
    d = [3, 5, 7, 9, 11, 13, 15]
    q1, q3 = median(d[:3]), median(d[4:])
    b.mc(C, "SP.3", "stretch", f"What is the interquartile range (IQR) of {', '.join(map(str, d))}?", str(int(q3 - q1)),
         [(str(max(d) - min(d)), "gave the range"), (str(max(d) - int(q1)), "subtracted the first quartile from the maximum"), (str(int(median(d)) - int(q1)), "subtracted the first quartile from the median")],
         f"The median is 9. The lower half is 3, 5, 7 (Q1 = 5) and the upper half is 11, 13, 15 (Q3 = 13). IQR = 13 − 5 = 8.")
    b.mc(C, "SP.3", "core", "What does the interquartile range (IQR) describe?", "The spread of the middle 50% of the data",
         [("The spread of all of the data", "described the range"), ("The average of the data", "described the mean"), ("The middle value of the data", "described the median")],
         "The IQR is Q3 − Q1, which covers the middle half of the data.")
    b.mc(C, "SP.3", "core", "What does the mean absolute deviation (MAD) describe?", "The average distance of the data values from the mean",
         [("The difference between the greatest and least values", "described the range"), ("The middle value of the data", "described the median"), ("The most common value", "described the mode")],
         "MAD is the average of the distances from the mean.")
    a, c = [12, 13, 13, 14], [10, 12, 14, 16]
    b.mc(C, "SP.3", "core", f"The ages on Team A are {', '.join(map(str, a))}. The ages on Team B are {', '.join(map(str, c))}. Which team has the greater variability in age?", "Team B",
         [("Team A", "reversed which team is more spread out"), ("They are equal", "ignored the different ranges"), ("It cannot be determined", "thought more information was needed")],
         f"Team A's range is {max(a) - min(a)} and Team B's range is {max(c) - min(c)}. Team B is more spread out.")
    b.mc(C, "SP.3", "stretch", "Two dot plots show class test scores. Class 1 is centered near 70 and Class 2 is centered near 85, and the two plots hardly overlap. What is the best conclusion?", "Class 2 tends to score higher, because the plots barely overlap",
         [("The classes score about the same", "ignored the separation of the plots"), ("Class 1 tends to score higher", "reversed the comparison"), ("No conclusion is possible", "ignored what the graphs show")],
         "Little overlap with centers 15 points apart suggests a real difference.")
    b.mc(C, "SP.3", "stretch", "Two data sets both have a mean of 20. Set X has a MAD of 1 and Set Y has a MAD of 6. Which statement is true?", "The values in Set Y are more spread out from the mean",
         [("The values in Set X are more spread out", "reversed the comparison"), ("The two sets have the same spread", "confused equal means with equal spread"), ("Set Y has a greater mean", "confused MAD with the mean")],
         "A larger MAD means the values are, on average, farther from the mean.")
    d = [5, 5, 5, 5, 5]
    b.mc(C, "SP.3", "core", f"What is the mean absolute deviation of {', '.join(map(str, d))}?", fmt(mad(d)),
         [("5", "gave the mean"), ("1", "gave the number of different values"), ("25", "multiplied the mean by the count")],
         "Every value equals the mean, so every distance is 0 and the MAD is 0.")
    # SP.4 comparative inferences
    b.mc(C, "SP.4", "stretch", "Random samples from two groups give: Sample A has a mean of 82 and a MAD of 3. Sample B has a mean of 78 and a MAD of 3. Which statement is reasonable?", "Group A probably has a higher mean score, about 4 points higher",
         [("Group B probably has the higher mean", "reversed the comparison"), ("The groups have the same mean", "ignored the different means"), ("Group A's scores are more spread out", "the MADs are equal")],
         "The means differ by 4 and the variability is similar, so Group A seems to be higher.")
    b.mc(C, "SP.4", "stretch", "Group 1 has a median of 15 and an IQR of 4. Group 2 has a median of 22 and an IQR of 4. Which statement is best?", "The groups likely differ: the medians are 7 apart, which is more than the IQR of 4",
         [("The groups are the same, since the IQRs are equal", "confused equal spread with equal centers"), ("The difference is small compared with the spread", "misread 7 as small next to 4"), ("The IQR tells us nothing about the groups", "ignored the role of variability")],
         "A difference of 7 between the centers is larger than the typical spread of 4, so the groups probably differ.")
    b.mc(C, "SP.4", "stretch", "Two samples have means of 50 and 51, but their MADs are 2 and 15. Which statement is true?", "The centers are similar, but the second group varies much more",
         [("The groups are alike in every way", "ignored the different MADs"), ("The first group varies much more", "reversed the comparison"), ("The means are too close to compare", "ignored that spread can still differ")],
         "Similar centers can come with very different variability.")
    b.num(C, "SP.4", "stretch", "Sample means are 45 and 53, and both samples have a MAD of 4. How many MADs apart are the means?", "2", [],
          "The means differ by 8. Divide by the MAD: 8 ÷ 4 = 2.",
          wrongs=[("8", "gave the difference without dividing by the MAD"), ("4", "gave the MAD")])
    b.mc(C, "SP.4", "challenge", "The mean height of one team is 150 cm and of another is 152 cm. Both have a MAD of 12 cm. A student says the second team is taller. What is the best response?", "The 2 cm difference is small compared with the variability of 12 cm, so we cannot conclude a real difference",
         [("The student is right, because 152 is greater than 150", "ignored the variability"), ("The MAD is irrelevant to the comparison", "ignored the role of variability"), ("The means must be equal", "confused a small difference with no difference")],
         "A 2 cm difference is tiny next to a typical spread of 12 cm, so the teams may be the same.")


def sp_probability(b):
    C = "SP-C"
    # SP.5 probability as a number from 0 to 1
    b.mc(C, "SP.5", "core", "Which number CANNOT be a probability?", "1.2",
         [("0", "an impossible event has probability 0"), ("1/2", "an event that is equally likely either way"), ("1", "a certain event has probability 1")],
         "Probabilities are between 0 and 1, so 1.2 is too large.")
    b.mc(C, "SP.5", "core", "An event is very unlikely but possible. Its probability is closest to which number?", "0.05",
         [("0.5", "that is a toss-up"), ("0.95", "that is very likely"), ("1", "that is certain")],
         "Very unlikely events have a probability close to 0.")
    b.mc(C, "SP.5", "core", "What is the probability of an event that is certain to happen?", "1",
         [("0", "that is impossible"), ("1/2", "that is a toss-up"), ("100", "probabilities cannot be greater than 1")],
         "A certain event has probability 1.")
    # SP.6 experimental probability
    b.mc(C, "SP.6", "core", "A coin is flipped 50 times and lands heads 32 times. What is the experimental probability of heads?", "0.64",
         [("0.5", "gave the theoretical probability"), ("32", "gave the count"), ("0.36", "gave the experimental probability of tails")],
         "32 ÷ 50 = 0.64.")
    b.mc(C, "SP.6", "stretch", "A spinner landed on red 18 times in 60 spins. Based on this, about how many times would it land on red in 200 spins?", "60",
         [("18", "used the number of reds from the first 60 spins"), ("3,600", "multiplied 18 by 200 without dividing by 60"), ("100", "used 1/2 instead of 3/10")],
         "18 ÷ 60 = 0.3. Then 0.3 × 200 = 60.")
    # SP.7 probability models
    b.mc(C, "SP.7", "core", "A bag has 3 red marbles, 5 blue marbles and 2 green marbles. One marble is picked at random. What is the probability that it is blue?", "1/2",
         [("5/3", "compared blue to red"), ("5/7", "compared blue to the other colors"), ("1/3", "treated the three colors as equally likely")],
         "There are 10 marbles and 5 are blue: 5/10 = 1/2.")
    b.mc(C, "SP.7", "core", "A fair six-sided die is rolled. What is the probability of rolling a prime number?", "1/2",
         [("1/3", "counted only 2 and 3"), ("2/3", "counted 1 as a prime number"), ("1/6", "counted a single outcome")],
         "The primes on a die are 2, 3 and 5, which is 3 out of 6 outcomes: 1/2.")
    b.mc(C, "SP.7", "stretch", "A fair coin is flipped 20 times and lands heads 14 times. Which statement best explains the difference from 10 heads?", "Chance variation: with more flips, the results tend to get closer to 1/2",
         [("The coin must be unfair", "assumed one result proves bias"), ("The theoretical probability is wrong", "doubted the model because of one result"), ("Experimental results always match theoretical probability exactly", "ignored chance variation")],
         "Short runs vary. More flips tend to bring the relative frequency near the theoretical probability.")
    b.mc(C, "SP.7", "core", "A number cube is rolled 100 times and lands on 6 fifteen times. What is the experimental probability of rolling a 6?", "0.15",
         [("1/6", "gave the theoretical probability for a fair die"), ("15", "gave the count"), ("0.85", "gave the probability of not rolling a 6")],
         "15 ÷ 100 = 0.15.")
    # SP.8 compound events
    b.mc(C, "SP.8", "core", "A coin is tossed twice. How many outcomes are in the sample space?", "4",
         [("2", "counted the outcomes of one toss"), ("3", "left out one ordered outcome"), ("8", "counted outcomes for three tosses")],
         "The outcomes are HH, HT, TH and TT.")
    b.mc(C, "SP.8", "core", "A coin is tossed twice. What is the probability of getting exactly one head?", "1/2",
         [("1/4", "counted only one of the two ways"), ("1/3", "treated 0, 1, 2 heads as equally likely"), ("3/4", "counted at least one head")],
         "HT and TH are 2 of the 4 outcomes: 2/4 = 1/2.")
    b.mc(C, "SP.8", "stretch", "Two fair dice are rolled. What is the probability that the sum is 7?", "1/6",
         [("1/12", "counted only half of the ways"), ("7/36", "used the sum as the count"), ("1/36", "counted a single outcome")],
         "There are 36 outcomes, and 6 of them add to 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). 6/36 = 1/6.")
    b.mc(C, "SP.8", "stretch", "Spinner A has two equal sections (red, blue). Spinner B has three equal sections (1, 2, 3). Both are spun. What is the probability of red and 3?", "1/6",
         [("1/2", "used only spinner A"), ("1/3", "used only spinner B"), ("5/6", "added 1/2 and 1/3")],
         "There are 2 × 3 = 6 equally likely outcomes, and one is (red, 3): 1/6.")
    b.num(C, "SP.8", "core", "A menu has 3 sandwiches and 4 drinks. A meal is one sandwich and one drink. How many different meals are possible?", "12", [],
          "Pair each of the 3 sandwiches with each of the 4 drinks: 3 × 4 = 12.",
          wrongs=[("7", "added instead of multiplying"), ("24", "multiplied by 2 as well")], unit="meals")
    b.mc(C, "SP.8", "challenge", "A bag has 2 red marbles and 1 blue marble. A marble is drawn, put back, and a second marble is drawn. What is the probability that both are red?", "4/9",
         [("2/3", "used only the first draw"), ("1/9", "counted a single outcome of the 9"), ("1/3", "used the probability of blue")],
         "Each draw is red with probability 2/3. Both red: 2/3 × 2/3 = 4/9.")
