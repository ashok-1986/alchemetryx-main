// Find fixture answers that produce matrix v0.2 §16 expected outputs

const { computeResult } = require('../lib/score.js');

// Matrix v0.2 §16 expected outputs
const targets = [
  { name: "Solo consultant", leak: 42, vis: 42, frag: 17, score: 33, band: 1, costing: "fragmentation", ai: null },
  { name: "6-person agency", leak: 50, vis: 50, frag: 25, score: 42, band: 2, costing: "fragmentation", ai: 25 },
  { name: "20-person care", leak: 17, vis: 25, frag: 8, score: 17, band: 1, costing: "fragmentation", ai: null },
  { name: "12-person firm", leak: 75, vis: 92, frag: 75, score: 81, band: 4, costing: "leakage", ai: 75 },
  { name: "30-person many tools", leak: 33, vis: 58, frag: 17, score: 36, band: 2, costing: "fragmentation", ai: 13 },
  { name: "Great vis terrible leak", leak: 0, vis: 100, frag: 50, score: 50, band: 3, costing: "leakage", ai: null },
  { name: "Great int no vis", leak: 67, vis: 0, frag: 100, score: 56, band: 3, costing: "visibility", ai: 38 },
  { name: "Systemised solo", leak: 92, vis: 83, frag: 75, score: 83, band: 4, costing: "fragmentation", ai: null },
  { name: "Bought AI failed", leak: 25, vis: 42, frag: 25, score: 31, band: 1, costing: "leakage", ai: 13 },
  { name: "16+ tools integrated", leak: 75, vis: 75, frag: 100, score: 83, band: 4, costing: "leakage", ai: 63 },
];

console.log("Searching for fixture answers that match matrix v0.2 §16...\n");

let anyUnfound = false;
for (const t of targets) {
  console.log(`\n=== ${t.name} ===`);
  let found = false;
  
  for (let q1 = 1; q1 <= 5 && !found; q1++) {
    for (let q2 = 1; q2 <= 5 && !found; q2++) {
      for (let q3 = 1; q3 <= 5 && !found; q3++) {
        for (let q7 = 1; q7 <= 5 && !found; q7++) {
          for (let q8 = 1; q8 <= 5 && !found; q8++) {
            for (let q9 = 1; q9 <= 5 && !found; q9++) {
              for (let q4 = 1; q4 <= 5 && !found; q4++) {
                for (let q5 = 1; q5 <= 5 && !found; q5++) {
                  for (let q6 = 1; q6 <= 5 && !found; q6++) {
                    // Try to guess AI ratings if target AI is present
                    let candidateAnswers = { q1, q2, q3, q4, q5, q6, q7, q8, q9 };
                    if (t.ai !== null) {
                      // Attempt to search q10 and q11
                      for (let q10 = 1; q10 <= 5 && !found; q10++) {
                        for (let q11 = 1; q11 <= 5 && !found; q11++) {
                          const withAi = { ...candidateAnswers, q10, q11 };
                          const r = computeResult(withAi);
                          if (
                            r.leakage === t.leak && r.visibility === t.vis && r.fragmentation === t.frag &&
                            r.score === t.score && r.band === t.band && r.costingMost === t.costing && r.aiReturn === t.ai
                          ) {
                            console.log(`  FOUND:`, withAi);
                            found = true;
                          }
                        }
                      }
                    } else {
                      const r = computeResult(candidateAnswers);
                      if (
                        r.leakage === t.leak && r.visibility === t.vis && r.fragmentation === t.frag &&
                        r.score === t.score && r.band === t.band && r.costingMost === t.costing && r.aiReturn === t.ai
                      ) {
                        console.log(`  FOUND:`, candidateAnswers);
                        found = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  if (!found) {
    console.log(`  NOT FOUND for ${t.name}`);
    anyUnfound = true;
  }
}

if (anyUnfound) {
  process.exitCode = 1;
}