const fs = require('fs');

const replacementJs = `[
  {
    name: "Solo consultant, spreadsheets and email",
    answers: { q1: 1, q2: 5, q3: 2, q4: 1, q5: 1, q6: 3, q7: 1, q8: 5, q9: 2 },
    expected: { leakage: 42, visibility: 42, fragmentation: 17, score: 33, band: 1, costingMost: "fragmentation", aiReturn: null },
  },
  {
    name: "6-person agency, disconnected",
    answers: { q1: 1, q2: 5, q3: 3, q4: 1, q5: 1, q6: 4, q7: 2, q8: 2, q9: 5, q10: 2, q11: 2 },
    expected: { leakage: 50, visibility: 50, fragmentation: 25, score: 42, band: 2, costingMost: "fragmentation", aiReturn: 25 },
  },
  {
    name: "20-person care provider, rota in Excel",
    answers: { q1: 1, q2: 2, q3: 2, q4: 1, q5: 1, q6: 2, q7: 1, q8: 1, q9: 4 },
    expected: { leakage: 17, visibility: 25, fragmentation: 8, score: 17, band: 1, costingMost: "fragmentation", aiReturn: null },
  },
  {
    name: "12-person firm, connected, dashboard",
    answers: { q1: 3, q2: 5, q3: 4, q4: 2, q5: 5, q6: 5, q7: 5, q8: 4, q9: 5, q10: 4, q11: 4 },
    expected: { leakage: 75, visibility: 92, fragmentation: 75, score: 81, band: 4, costingMost: "leakage", aiReturn: 75 },
  },
  {
    name: "30-person, many tools, no integration",
    answers: { q1: 1, q2: 3, q3: 3, q4: 1, q5: 1, q6: 3, q7: 2, q8: 3, q9: 5, q10: 2, q11: 1 },
    expected: { leakage: 33, visibility: 58, fragmentation: 17, score: 36, band: 2, costingMost: "fragmentation", aiReturn: 13 },
  },
  {
    name: "Great visibility, terrible leakage",
    answers: { q1: 1, q2: 1, q3: 1, q4: 1, q5: 3, q6: 5, q7: 5, q8: 5, q9: 5 },
    expected: { leakage: 0, visibility: 100, fragmentation: 50, score: 50, band: 3, costingMost: "leakage", aiReturn: null },
  },
  {
    name: "Great integration, no visibility",
    answers: { q1: 3, q2: 5, q3: 3, q4: 5, q5: 5, q6: 5, q7: 1, q8: 1, q9: 1, q10: 3, q11: 2 },
    expected: { leakage: 67, visibility: 0, fragmentation: 100, score: 56, band: 3, costingMost: "visibility", aiReturn: 38 },
  },
  {
    name: "Systemised solo consultancy",
    answers: { q1: 4, q2: 5, q3: 5, q4: 2, q5: 5, q6: 5, q7: 5, q8: 4, q9: 4 },
    expected: { leakage: 92, visibility: 83, fragmentation: 75, score: 83, band: 4, costingMost: "fragmentation", aiReturn: null },
  },
  {
    name: "Bought AI and it failed",
    answers: { q1: 1, q2: 3, q3: 2, q4: 1, q5: 1, q6: 4, q7: 2, q8: 2, q9: 4, q10: 2, q11: 1 },
    expected: { leakage: 25, visibility: 42, fragmentation: 25, score: 31, band: 1, costingMost: "leakage", aiReturn: 13 },
  },
  {
    name: "16+ tools, all well integrated",
    answers: { q1: 3, q2: 5, q3: 4, q4: 5, q5: 5, q6: 5, q7: 4, q8: 4, q9: 4, q10: 4, q11: 3 },
    expected: { leakage: 75, visibility: 75, fragmentation: 100, score: 83, band: 4, costingMost: "leakage", aiReturn: 63 },
  },
  {
    name: "Fully systemised (Band 5)",
    answers: { q1: 5, q2: 5, q3: 5, q4: 5, q5: 5, q6: 5, q7: 5, q8: 5, q9: 5 },
    expected: { leakage: 100, visibility: 100, fragmentation: 100, score: 100, band: 5, costingMost: "leakage", aiReturn: null },
  }
]`;

const replacementTs = `[
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
]`;

function doReplace(filename, rep) {
  if (!fs.existsSync(filename)) return;
  let content = fs.readFileSync(filename, 'utf-8');
  let newContent = content;
  
  if (filename.endsWith('.ts')) {
      newContent = content.replace(/const profiles: Profile\[\] = \[.*?\];/s, "const profiles: Profile[] = " + rep + ";");
      // Update string "10 synthetic profiles" to "11 synthetic profiles"
      newContent = newContent.replace(/10 synthetic profiles/g, "11 synthetic profiles");
      newContent = newContent.replace(/ALL 10 PROFILES/g, "ALL 11 PROFILES");
  } else {
      newContent = content.replace(/const profiles = \[.*?\];/s, "const profiles = " + rep + ";");
      newContent = newContent.replace(/10 profiles/g, "11 profiles");
      newContent = newContent.replace(/10 synthetic profiles/g, "11 synthetic profiles");
      newContent = newContent.replace(/ALL 10 PROFILES/g, "ALL 11 PROFILES");
  }
  
  if (newContent === content) {
    console.log("Failed to match array in", filename);
  } else {
    fs.writeFileSync(filename, newContent);
    console.log("Updated", filename);
  }
}

doReplace('scripts/quick-validate.js', replacementJs);
doReplace('scripts/validate-profiles.ts', replacementTs);
doReplace('scripts/scripts/validate-profiles.js', replacementJs);
