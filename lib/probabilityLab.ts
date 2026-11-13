export function binomialTail(n: number, p: number, threshold: number) {
  let sum = 0, coefficient = 1;
  for (let k = 0; k <= n; k++) {
    if (k >= threshold) sum += coefficient * p ** k * (1 - p) ** (n - k);
    coefficient = coefficient * (n - k) / (k + 1);
  }
  return sum;
}
export function simulateRepetitions(n: number, p: number, repetitions: number, random = Math.random) {
  const counts = Array(n + 1).fill(0) as number[], samples: { outcomes: number[]; successes: number }[] = [];
  for (let repetition = 0; repetition < repetitions; repetition++) {
    const outcomes: number[] = Array.from({ length: n }, () => random() < p ? 1 : 0);
    const successes = outcomes.reduce((sum, bit) => sum + bit, 0);
    counts[successes]++;
    if (repetition >= repetitions - 3) samples.push({ outcomes, successes });
  }
  return { counts, samples };
}
