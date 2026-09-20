// Smoke test: fetch the /week/result page and validate the rendered output.
// Fails with a nonzero exit code if any required string is missing, any
// prohibited string is present, or the fetch itself fails.
//
// Fixture is a verified band-3 profile (score 53): the band label should be
// "Coming together, still hands-on" (NOT "you do not need us"), the weak
// area badge "Start here" is present, and the rendered score is rendered.

const params = new URLSearchParams({
  g1: 'Yes',
  q1: 'There are one or two small recurring tasks',          // rating 4
  q2: 'Occasionally',                                        // rating 4
  q3: 'Most important processes are repeatable, with a few exceptions', // rating 4
  q4: 'Sometimes',                                           // rating 3
  q5: 'Sometimes',                                           // rating 3
  q6: 'Usually',                                             // rating 4
  q7: 'I would need someone to prepare it',                  // rating 2
  q8: 'Revenue, Gross margin',                               // rating 2 (1 financial group)
  q9: 'Near month-end',                                      // rating 2
  q10: 'Several people use AI for individual tasks',         // rating 3
  q11: 'We believe AI helps, but have not measured it'       // rating 3
});

const REQUIRED = [
  '53 /100',                         // rendered overall score
  'Coming together, still hands-on', // band-3 label
  'Start here'                       // weak-area badge
];

const PROHIBITED = [
  'Runs without you. You likely do not need us.'               // band-5 label — must NOT appear at band 4
];

const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 10000);

fetch('http://localhost:3000/week/result?' + params.toString(), { signal: controller.signal })
  .then((res) => {
    if (!res.ok) {
      throw new Error('Request failed with status ' + res.status + ' ' + res.statusText);
    }
    return res.text();
  })
  .then((html) => {
    const failures = [];

    for (const text of REQUIRED) {
      if (!html.includes(text)) {
        failures.push('Missing required text: ' + text);
      }
    }
    for (const text of PROHIBITED) {
      if (html.includes(text)) {
        failures.push('Unexpected present text: ' + text);
      }
    }

    if (failures.length > 0) {
      failures.forEach((f) => console.error(f));
      process.exitCode = 1;
      return;
    }

    console.log('smoke test passed');
  })
  .catch((err) => {
    console.error('smoke test failed:', err);
    process.exitCode = 1;
  })
  .finally(() => clearTimeout(timeout));
