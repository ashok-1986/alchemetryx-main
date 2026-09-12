import { describe, it, expect } from "vitest";
import { computeResult, categories, costingMost, q8Rating, Rating, Answers, Category } from "../lib/score";
import { parseWeekAnswers, InvalidSubmission } from "../lib/parseWeekAnswers";

describe("Scoring Engine", () => {
  describe("Test 1: Direction Invariant", () => {
    it("never lowers a category or overall score when any single rating is raised", () => {
      const samples = 100000;
      const randomRating = () => Math.floor(Math.random() * 5) + 1 as Rating;

      for (let i = 0; i < samples; i++) {
        const answers: Answers = {
          q1: randomRating(), q2: randomRating(), q3: randomRating(),
          q4: randomRating(), q5: randomRating(), q6: randomRating(),
          q7: randomRating(), q8: randomRating(), q9: randomRating(),
        };

        const baseResult = computeResult(answers);
        expect(baseResult.score).toBeGreaterThanOrEqual(0);
        expect(baseResult.score).toBeLessThanOrEqual(100);
        expect(baseResult.leakage).toBeGreaterThanOrEqual(0);
        const cats = categories(answers);
        const expectedCostingMost = costingMost(cats);
        expect(baseResult.costingMost).toBe(expectedCostingMost);

        const keys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9"] as (keyof Answers)[];
        const targetKey = keys[Math.floor(Math.random() * keys.length)];

        if (answers[targetKey]! < 5) {
          const improvedAnswers = { ...answers, [targetKey]: (answers[targetKey]! + 1) as Rating };
          const improvedResult = computeResult(improvedAnswers);

          expect(improvedResult.scoreExact).toBeGreaterThanOrEqual(baseResult.scoreExact);
          expect(improvedResult.leakage).toBeGreaterThanOrEqual(baseResult.leakage);
          expect(improvedResult.visibility).toBeGreaterThanOrEqual(baseResult.visibility);
          expect(improvedResult.fragmentation).toBeGreaterThanOrEqual(baseResult.fragmentation);
        }
      }
    });
  });

  describe("Test 2: Ten Synthetic Profiles", () => {
    const profiles = [
      { name: "Solo consultant", target: { Leak: 43, Vis: 35, Frag: 17, Score: 33, Band: 1, CostingMost: "fragmentation", AI: null }, fixture: { q1: 1, q2: 5, q3: 2, q4: 1, q5: 1, q6: 3, q7: 1, q8: 5, q9: 2 } as Answers },
      { name: "6-person agency", target: { Leak: 50, Vis: 50, Frag: 25, Score: 43, Band: 3, CostingMost: "fragmentation", AI: 25 }, fixture: { q1: 1, q2: 5, q3: 3, q4: 1, q5: 1, q6: 4, q7: 2, q8: 2, q9: 5, q10: 2, q11: 2 } as Answers },
      { name: "20-person care provider", target: { Leak: 16, Vis: 25, Frag: 8, Score: 17, Band: 1, CostingMost: "fragmentation", AI: null }, fixture: { q1: 1, q2: 2, q3: 2, q4: 1, q5: 1, q6: 2, q7: 1, q8: 1, q9: 4 } as Answers },
      { name: "12-person firm", target: { Leak: 75, Vis: 93, Frag: 75, Score: 81, Band: 5, CostingMost: "leakage", AI: 75 }, fixture: { q1: 3, q2: 5, q3: 4, q4: 2, q5: 5, q6: 5, q7: 5, q8: 4, q9: 5, q10: 4, q11: 4 } as Answers },
      { name: "30-person business", target: { Leak: 32, Vis: 57, Frag: 17, Score: 36, Band: 2, CostingMost: "fragmentation", AI: 27 }, fixture: { q1: 1, q2: 3, q3: 3, q4: 1, q5: 1, q6: 3, q7: 2, q8: 3, q9: 5, q10: 3, q11: 1 } as Answers },
      { name: "Great vis, terrible leak", target: { Leak: 0, Vis: 100, Frag: 50, Score: 47, Band: 3, CostingMost: "leakage", AI: null }, fixture: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 3, q6: 5, q7: 5, q8: 5, q9: 5 } as Answers },
      { name: "Great int, no vis", target: { Leak: 68, Vis: 0, Frag: 100, Score: 54, Band: 4, CostingMost: "visibility", AI: 38 }, fixture: { q1: 3, q2: 5, q3: 3, q4: 5, q5: 5, q6: 5, q7: 1, q8: 1, q9: 1, q10: 3, q11: 2 } as Answers },
      { name: "Systemised solo", target: { Leak: 91, Vis: 85, Frag: 75, Score: 85, Band: 5, CostingMost: "fragmentation", AI: null }, fixture: { q1: 4, q2: 5, q3: 5, q4: 2, q5: 5, q6: 5, q7: 5, q8: 4, q9: 4 } as Answers },
      { name: "Bought AI failed", target: { Leak: 25, Vis: 42, Frag: 25, Score: 31, Band: 1, CostingMost: "leakage", AI: 13 }, fixture: { q1: 1, q2: 3, q3: 2, q4: 1, q5: 1, q6: 4, q7: 2, q8: 2, q9: 4, q10: 2, q11: 1 } as Answers },
      { name: "16+ tools integrated", target: { Leak: 75, Vis: 75, Frag: 100, Score: 82, Band: 5, CostingMost: "leakage", AI: 63 }, fixture: { q1: 3, q2: 5, q3: 4, q4: 5, q5: 5, q6: 5, q7: 4, q8: 4, q9: 4, q10: 4, q11: 3 } as Answers },
    ];

    it("verifies all 10 profiles", () => {
      for (const p of profiles) {
        const r = computeResult(p.fixture);
        expect(r.leakage, `Leakage mismatch for ${p.name}`).toBe(p.target.Leak);
        expect(r.visibility, `Visibility mismatch for ${p.name}`).toBe(p.target.Vis);
        expect(r.fragmentation, `Fragmentation mismatch for ${p.name}`).toBe(p.target.Frag);
        expect(r.score, `Score mismatch for ${p.name}`).toBe(p.target.Score);
        expect(r.band, `Band mismatch for ${p.name}`).toBe(p.target.Band);
        expect(r.costingMost, `CostingMost mismatch for ${p.name}`).toBe(p.target.CostingMost);
        expect(r.aiReturn, `AI Return mismatch for ${p.name}`).toBe(p.target.AI);
      }
    });
  });

  describe("Test 3: G1 Isolation", () => {
    it("does not affect Systems Efficiency Score, aiReturn is null when G1 is No/Not sure", () => {
      const pYes = new URLSearchParams({
        g1: "Yes",
        q1: "Several recurring tasks still require manual work",
        q2: "Every few weeks",
        q3: "Some processes are documented, others rely on individual knowledge",
        q4: "Sometimes",
        q5: "Sometimes",
        q6: "Sometimes",
        q7: "Within an hour",
        q8: "Revenue, Gross margin",
        q9: "Around the middle of the month",
        q10: "Several people use AI for individual tasks",
        q11: "We believe AI helps, but have not measured it"
      });
      const resYes = computeResult(parseWeekAnswers(pYes).answers);
      
      const pNo = new URLSearchParams({
        g1: "No",
        q1: "Several recurring tasks still require manual work",
        q2: "Every few weeks",
        q3: "Some processes are documented, others rely on individual knowledge",
        q4: "Sometimes",
        q5: "Sometimes",
        q6: "Sometimes",
        q7: "Within an hour",
        q8: "Revenue, Gross margin",
        q9: "Around the middle of the month"
      });
      const resNo = computeResult(parseWeekAnswers(pNo).answers);

      expect(resYes.score).toBe(resNo.score);
      expect(resYes.aiReturn).toBe(50);
      expect(resNo.aiReturn).toBeNull();
    });
  });

  describe("Test 4: Tie-break Precedence", () => {
    it("resolves a three-way tie to Leakage", () => {
      // 50 across all categories
      const ans: Answers = {
        q1: 3, q2: 3, q3: 3, // Leakage = 50
        q4: 3, q5: 3, q6: 3, // Fragmentation = 50
        q7: 3, q8: 3, q9: 3, // Visibility = 50
      };
      const res = computeResult(ans);
      expect(res.leakage).toBe(50);
      expect(res.visibility).toBe(50);
      expect(res.fragmentation).toBe(50);
      expect(res.costingMost).toBe("leakage");
    });
  });

  describe("Test 5: Q8 Checkbox Scoring", () => {
    it("Other selected alongside one real box must not inflate group count or item count", () => {
      expect(q8Rating(["revenue", "other"])).toBe(2);
    });

    it("Q8 with 4 financial boxes and nothing else scores 3, not 5", () => {
      expect(q8Rating(["revenue", "grossMargin", "cash", "costs"])).toBe(3);
    });
    it("Q8 with exactly 3 items across all 3 groups scores 2, per the catch-all rule", () => {
      expect(q8Rating(["revenue", "utilisation", "pipeline"])).toBe(2);
    });
  });
});
