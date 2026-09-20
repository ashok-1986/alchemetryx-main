// scripts/validate-profiles.ts
// Validation script for the 11 synthetic profiles from matrix v0.2 §16
// Run with: npx tsx scripts/validate-profiles.ts

import { computeResult, Rating } from "../lib/score";

interface Profile {
  name: string;
  answers: Record<string, Rating>;
  expected: {
    leakage: number;
    visibility: number;
    fragmentation: number;
    score: number;
    band: 1 | 2 | 3 | 4 | 5;
    costingMost: "leakage" | "visibility" | "fragmentation";
    aiReturn: number | null;
  };
}

// The 11 synthetic profiles from matrix v0.2 §16
// Each answer is a Rating (1-5) corresponding to the health score mapping
const profiles: Profile[] = [
  {
    name: 'Solo consultant, spreadsheets and email',
    answers: { q1: 1, q2: 5, q3: 2, q4: 1, q5: 1, q6: 3, q7: 1, q8: 5, q9: 2 } as any,
    expected: { leakage: 42, visibility: 42, fragmentation: 17, score: 33, band: 1, costingMost: 'fragmentation', aiReturn: null },
  },
  {
    name: '6-person agency, disconnected',
    answers: { q1: 1, q2: 5, q3: 3, q4: 1, q5: 1, q6: 4, q7: 2, q8: 2, q9: 5, q10: 2, q11: 2 } as any,
    expected: { leakage: 50, visibility: 50, fragmentation: 25, score: 42, band: 2, costingMost: 'fragmentation', aiReturn: 25 },
  },
  {
    name: '20-person care provider, rota in Excel',
    answers: { q1: 1, q2: 2, q3: 2, q4: 1, q5: 1, q6: 2, q7: 1, q8: 1, q9: 4 } as any,
    expected: { leakage: 17, visibility: 25, fragmentation: 8, score: 17, band: 1, costingMost: 'fragmentation', aiReturn: null },
  },
  {
    name: '12-person firm, connected, dashboard',
    answers: { q1: 3, q2: 5, q3: 4, q4: 2, q5: 5, q6: 5, q7: 5, q8: 4, q9: 5, q10: 4, q11: 4 } as any,
    expected: { leakage: 75, visibility: 92, fragmentation: 75, score: 81, band: 4, costingMost: 'leakage', aiReturn: 75 },
  },
  {
    name: '30-person, many tools, no integration',
    answers: { q1: 1, q2: 3, q3: 3, q4: 1, q5: 1, q6: 3, q7: 2, q8: 3, q9: 5, q10: 2, q11: 1 } as any,
    expected: { leakage: 33, visibility: 58, fragmentation: 17, score: 36, band: 2, costingMost: 'fragmentation', aiReturn: 13 },
  },
  {
    name: 'Great visibility, terrible leakage',
    answers: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 3, q6: 5, q7: 5, q8: 5, q9: 5 } as any,
    expected: { leakage: 0, visibility: 100, fragmentation: 50, score: 50, band: 3, costingMost: 'leakage', aiReturn: null },
  },
  {
    name: 'Great integration, no visibility',
    answers: { q1: 3, q2: 5, q3: 3, q4: 5, q5: 5, q6: 5, q7: 1, q8: 1, q9: 1, q10: 3, q11: 2 } as any,
    expected: { leakage: 67, visibility: 0, fragmentation: 100, score: 56, band: 3, costingMost: 'visibility', aiReturn: 38 },
  },
  {
    name: 'Systemised solo consultancy',
    answers: { q1: 4, q2: 5, q3: 5, q4: 2, q5: 5, q6: 5, q7: 5, q8: 4, q9: 4 } as any,
    expected: { leakage: 92, visibility: 83, fragmentation: 75, score: 83, band: 4, costingMost: 'fragmentation', aiReturn: null },
  },
  {
    name: 'Bought AI and it failed',
    answers: { q1: 1, q2: 3, q3: 2, q4: 1, q5: 1, q6: 4, q7: 2, q8: 2, q9: 4, q10: 2, q11: 1 } as any,
    expected: { leakage: 25, visibility: 42, fragmentation: 25, score: 31, band: 1, costingMost: 'leakage', aiReturn: 13 },
  },
  {
    name: '16+ tools, all well integrated',
    answers: { q1: 3, q2: 5, q3: 4, q4: 5, q5: 5, q6: 5, q7: 4, q8: 4, q9: 4, q10: 4, q11: 3 } as any,
    expected: { leakage: 75, visibility: 75, fragmentation: 100, score: 83, band: 4, costingMost: 'leakage', aiReturn: 63 },
  },
  {
    name: 'Fully systemised (Band 5)',
    answers: { q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5 } as any,
    expected: { leakage: 100, visibility: 100, fragmentation: 100, score: 100, band: 5, costingMost: 'leakage', aiReturn: null },
  }
];

function runValidation() {
  console.log("🔍 Validating 11 synthetic profiles against matrix v0.2 §16\n");
  console.log("=".repeat(100));
  
  let allPassed = true;
  
  for (const profile of profiles) {
    const result = computeResult(profile.answers as any);
    const exp = profile.expected;
    
    const checks = [
      { key: "leakage", actual: result.leakage, expected: exp.leakage },
      { key: "visibility", actual: result.visibility, expected: exp.visibility },
      { key: "fragmentation", actual: result.fragmentation, expected: exp.fragmentation },
      { key: "score", actual: result.score, expected: exp.score },
      { key: "band", actual: result.band, expected: exp.band },
      { key: "costingMost", actual: result.costingMost, expected: exp.costingMost },
      { key: "aiReturn", actual: result.aiReturn, expected: exp.aiReturn },
    ];
    
    const passed = checks.every(c => c.actual === c.expected);
    allPassed = allPassed && passed;
    
    const status = passed ? "✅ PASS" : "❌ FAIL";
    console.log(`${status}  ${profile.name}`);
    
    if (!passed) {
      for (const c of checks) {
        if (c.actual !== c.expected) {
          console.log(`       ${c.key}: expected ${c.expected}, got ${c.actual}`);
        }
      }
    }
    
    // Show key values even on pass for verification
    if (passed) {
      console.log(`       Score: ${result.score} | Band: ${result.band} | Costing: ${result.costingMost} | AI: ${result.aiReturn ?? "n/a"}`);
    }
    console.log();
  }
  
  console.log("=".repeat(100));
  console.log(allPassed ? "🎉 ALL 11 PROFILES MATCH MATRIX v0.2 §16 EXACTLY" : "⚠️  SOME PROFILES FAIL - CHECK WEIGHTS AND BAND BOUNDARIES");
  console.log("=".repeat(100));
  
  return allPassed;
}

// Also test the direction invariant (Test 1 from build brief)
function testDirectionInvariant() {
  console.log("\n🔬 Testing Direction Invariant (Test 1)...\n");
  
  // Property: improving any single rating must never lower the overall score or its category
  // Test a sample of 10,000 random combinations
  let violations = 0;
  
  for (let i = 0; i < 10000; i++) {
    // Generate random valid answers
    const answers: Record<string, Rating> = {
      q1: Math.floor(Math.random() * 5) + 1,
      q2: Math.floor(Math.random() * 5) + 1,
      q3: Math.floor(Math.random() * 5) + 1,
      q4: Math.floor(Math.random() * 5) + 1,
      q5: Math.floor(Math.random() * 5) + 1,
      q6: Math.floor(Math.random() * 5) + 1,
      q7: Math.floor(Math.random() * 5) + 1,
      q8: Math.floor(Math.random() * 5) + 1,
      q9: Math.floor(Math.random() * 5) + 1,
    } as Record<string, Rating>;
    
    const baseResult = computeResult(answers as any);
    const baseCats = {
      leakage: baseResult.leakage,
      visibility: baseResult.visibility,
      fragmentation: baseResult.fragmentation,
    };
    
    // Try improving each answer one at a time
    for (const key of Object.keys(answers)) {
      if (answers[key] < 5) {
        const improved = { ...answers, [key]: (answers[key] + 1) as Rating };
        const newResult = computeResult(improved as any);
        
        // Check category didn't decrease
        const newCats = {
          leakage: newResult.leakage,
          visibility: newResult.visibility,
          fragmentation: newResult.fragmentation,
        };
        
        for (const cat of ["leakage", "visibility", "fragmentation"] as const) {
          if (newCats[cat] < baseCats[cat]) {
            violations++;
            console.log(`  VIOLATION: ${key} improved but ${cat} decreased: ${baseCats[cat]} → ${newCats[cat]}`);
          }
        }
        
        // Check overall score didn't decrease
        if (newResult.score < baseResult.score) {
          violations++;
          console.log(`  VIOLATION: ${key} improved but overall score decreased: ${baseResult.score} → ${newResult.score}`);
        }
      }
    }
  }
  
  if (violations === 0) {
    console.log("✅ Direction invariant holds across 10,000 random combinations");
  } else {
    console.log(`❌ ${violations} direction invariant violations found`);
  }
  
  return violations === 0;
}

const profilesPass = runValidation();
const invariantPass = testDirectionInvariant();

process.exit(profilesPass && invariantPass ? 0 : 1);