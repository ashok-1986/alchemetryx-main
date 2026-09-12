// lib/parseWeekAnswers.ts
// Parses the raw query string from Form A's redirect into Answers + Q8 keys.
import { q8Rating, Rating } from "./score";

const RATING_MAPS: Record<string, Record<string, 1|2|3|4|5>> = {
  q1: {
    "Almost nothing comes to mind. Recurring work is largely automated": 5,
    "There are one or two small recurring tasks": 4,
    "Several recurring tasks still require manual work": 3,
    "Many important recurring tasks are still manual": 2,
    "Significant parts of the business depend on recurring manual work": 1,
  },
  q2: {
    "Almost never": 5, "Occasionally": 4, "Every few weeks": 3,
    "Several times a week": 2, "Almost every day": 1,
  },
  q3: {
    "Important processes are documented and consistently followed": 5,
    "Most important processes are repeatable, with a few exceptions": 4,
    "Some processes are documented, others rely on individual knowledge": 3,
    "Most processes depend on people knowing what to do": 2,
    "Important work largely lives in people's heads": 1,
  },
  q4: {
    "Almost never": 5, "Rarely": 4, "Sometimes": 3, "Often": 2, "Almost always": 1,
  },
  q5: {
    "Never": 5, "Rarely": 4, "Sometimes": 3, "Often": 2, "Very often": 1,
  },
  q6: {
    "Almost always": 5, "Usually": 4, "Sometimes": 3, "Rarely": 2, "Almost never": 1,
  },
  q7: {
    "I can see it immediately": 5, "Within a few minutes": 4, "Within an hour": 3,
    "I would need someone to prepare it": 2, "I would need to wait until month-end": 1,
  },
  q9: {
    "During the month, effectively real time": 5, "Within a few days": 4,
    "Around the middle of the month": 3, "Near month-end": 2, "Mostly after month-end": 1,
  },
  q10: {
    "AI is embedded in important recurring workflows": 5,
    "AI is built into several recurring processes": 4,
    "Several people use AI for individual tasks": 3,
    "Individuals occasionally use ChatGPT or similar": 2,
    "We pay for it but nobody really uses it": 1,
  },
  q11: {
    "Yes, and we measure the business impact": 5,
    "Yes, we can estimate the impact with reasonable confidence": 4,
    "We believe AI helps, but have not measured it": 3,
    "We experiment with AI but have not embedded it meaningfully": 2,
    "No identifiable impact so far": 1,
  },
};

const Q8_KEYS: Record<string, string> = {
  "Revenue": "revenue", "Gross margin": "grossMargin", "Cash position": "cash",
  "Costs": "costs", "Utilisation": "utilisation", "Delivery capacity": "capacity",
  "Customer retention": "retention", "Pipeline": "pipeline", "Conversion": "conversion",
  "Other": "other",
};

export class InvalidSubmission extends Error {}

function lookup(question: string, text: string | null): Rating {
  if (!text) throw new InvalidSubmission(`${question} missing`);
  const rating = RATING_MAPS[question][text];
  if (!rating) throw new InvalidSubmission(`${question} has unrecognised answer: "${text}"`);
  return rating;
}

export function parseWeekAnswers(searchParams: URLSearchParams) {
  const g1 = searchParams.get("g1");
  const q8Text = searchParams.get("q8") ?? "";
  const q8Selected = q8Text.split(",").map(s => s.trim()).filter(Boolean)
    .map(label => Q8_KEYS[label] ?? "other");

  const answers = {
    q1: lookup("q1", searchParams.get("q1")),
    q2: lookup("q2", searchParams.get("q2")),
    q3: lookup("q3", searchParams.get("q3")),
    q4: lookup("q4", searchParams.get("q4")),
    q5: lookup("q5", searchParams.get("q5")),
    q6: lookup("q6", searchParams.get("q6")),
    q7: lookup("q7", searchParams.get("q7")),
    q8: q8Rating(q8Selected),
    q9: lookup("q9", searchParams.get("q9")),
    ...(g1 === "Yes"
      ? { q10: lookup("q10", searchParams.get("q10")), q11: lookup("q11", searchParams.get("q11")) }
      : {}),
  };

  return { g1, answers };
}
