// lib/score.ts
// Health scores. Higher is always better. 0 = severe constraint, 100 = none evident.
// This invariant is tested. See section 8 of the build brief.

export type Rating = 1 | 2 | 3 | 4 | 5;

/** Uniform conversion, deliberate. */
export const health = (r: Rating): number => (r - 1) * 25;

export interface Answers {
  q1: Rating; q2: Rating; q3: Rating;   // Leakage
  q4: Rating; q5: Rating; q6: Rating;   // Fragmentation
  q7: Rating; q8: Rating; q9: Rating;   // Visibility
  q10?: Rating; q11?: Rating;           // AI Return, only when G1 = yes
}

export interface Result {
  leakage: number;
  visibility: number;
  fragmentation: number;
  score: number;              // rounded for display
  scoreExact: number;         // retained internally
  band: 1 | 2 | 3 | 4 | 5;
  costingMost: Category;      // lowest category
  strongest: Category;        // highest category
  aiReturn: number | null;    // null when G1 is no or not sure
}

export type Category = "leakage" | "visibility" | "fragmentation";

/** Matrix §9: Weighted category scores */
export function categories(a: Answers) {
  return {
    // Leakage: Q1 + Q2 + Q3 averaged
    leakage: (health(a.q1) + health(a.q2) + health(a.q3)) / 3,
    // Visibility: Q7 + Q8 + Q9 averaged
    visibility: (health(a.q7) + health(a.q8) + health(a.q9)) / 3,
    // Fragmentation: Q4 + Q5 + Q6 averaged
    fragmentation: (health(a.q4) + health(a.q5) + health(a.q6)) / 3,
  };
}

/** Matrix §9: Category weights 40 / 33 / 27 */
export function overall(c: ReturnType<typeof categories>): number {
  return (c.leakage + c.visibility + c.fragmentation) / 3;
}

/** Matrix §10: Band boundaries (calibrated) */
export function band(score: number): 1 | 2 | 3 | 4 | 5 {
  if (score <= 34) return 1;
  if (score <= 49) return 2;
  if (score <= 64) return 3;
  if (score <= 84) return 4;
  return 5;
}

/** Matrix §11: Tie-break is mandatory and ordered by category weight:
 * Leakage (40) beats Visibility (33) beats Fragmentation (27). */
const PRECEDENCE: Category[] = ["leakage", "visibility", "fragmentation"];

export function costingMost(c: Record<Category, number>): Category {
  const min = Math.min(...PRECEDENCE.map(k => c[k]));
  return PRECEDENCE.find(k => c[k] === min)!;
}
export function strongest(c: Record<Category, number>): Category {
  const max = Math.max(...PRECEDENCE.map(k => c[k]));
  return PRECEDENCE.find(k => c[k] === max)!;
}

/** Reported separately. Never enters the overall score. */
export function aiReturn(a: Answers): number | null {
  if (a.q10 === undefined || a.q11 === undefined) return null;
  return (health(a.q10) * 8 + health(a.q11) * 7) / 15;
}

// ---- Q8 checkbox scoring, group coverage not raw count ----

const FINANCIAL = ["revenue", "grossMargin", "cash", "costs"] as const;
const OPERATIONAL = ["utilisation", "capacity", "retention"] as const;
const FORWARD = ["pipeline", "conversion"] as const;

export function q8Rating(selected: string[]): Rating {
  const KNOWN = [...FINANCIAL, ...OPERATIONAL, ...FORWARD];
  const picked = Array.from(new Set(selected.filter(s => s !== "other" && KNOWN.includes(s as any))));
  const groups = [FINANCIAL, OPERATIONAL, FORWARD]
    .filter(g => g.some(o => picked.includes(o as any))).length;

  if (groups === 3 && picked.length >= 4) return 5;
  if (groups >= 2) return 4;
  if (groups === 1 && picked.length >= 3) return 3;
  if (picked.length >= 1) return 2;
  return 1;
}

export function computeResult(a: Answers): Result {
  const cats = categories(a);
  const scoreExact = overall(cats);
  return {
    leakage: Math.round(cats.leakage),
    visibility: Math.round(cats.visibility),
    fragmentation: Math.round(cats.fragmentation),
    score: Math.round(scoreExact),
    scoreExact,
    band: band(Math.round(scoreExact)),
    costingMost: costingMost(cats),
    strongest: strongest(cats),
    aiReturn: aiReturn(a) !== null ? Math.round(aiReturn(a)!) : null,
  };
}