/**
 * Case study content. One rule: every line here traces to delivered work.
 * Care Rota is cleared for publication. Home identity and staff names are
 * anonymised in the screenshots.
 *
 * Fitosys is our own product, not a client engagement — see its honesty
 * block. The hours/revenue figures shown in its screenshots are Fitosys's
 * own published positioning, not numbers Alchemetryx has independently
 * audited, and the honesty block says so plainly rather than restating
 * them as verified outcomes.
 */
export type CaseStudy = {
  slug: string;
  kind: "client" | "own-build";
  published: boolean;
  eyebrow: string;
  title: string;
  standfirst: string;
  attribution: string;
  before: { heading: string; body: string; points: { label: string; body: string }[] };
  build: { heading: string; body: string; items: { title: string; caption: string; image: string; alt: string }[] };
  honesty: { heading: string; body: string };
  /** One line under the honesty heading on the full case study page. */
  closingLine: string;
  /** Small caption shown under the title inside the lightbox. */
  screenshotLabel: string;
};

export const CARE_ROTA: CaseStudy = {
  slug: "care-rota",
  kind: "own-build",
  published: true,
  eyebrow: "Case study · Care operations",
  title: "A care home’s rota lived in a spreadsheet. We rebuilt it as a system.",
  standfirst:
    "How a fragmented monthly roster for a UK care home became one place to plan shifts, watch cost, and stay compliant.",
  attribution: "Built by Alchemetryx · Real UK care home · Site and staff names anonymised",
  before: {
    heading: "Five tabs, and a lot of trust.",
    body:
      "The home planned every month in one shared Excel file. Five tabs, one per area. Staff were typed into a grid by hand, week after week stretched across ninety columns, and the file was updated whenever someone remembered.",
    points: [
      { label: "No running cost", body: "Nobody could see the wage bill against budget until the month was already spent." },
      { label: "No coverage check", body: "Whether a floor was actually staffed for a shift was worked out by eye, row by row." },
      { label: "Leave lived in heads", body: "Annual leave, maternity and sick sat in side notes and memory, not next to the rota they affected." },
    ],
  },
  build: {
    heading: "One system that understands a care home.",
    body:
      "Not a generic scheduler. A tool shaped around how a care home actually runs: floors, bank staff, statutory leave and a live budget. Built and hosted by Alchemetryx.",
    items: [
      {
        title: "One view, every floor.",
        caption:
          "Live cost against the budget cap, coverage across all three floors, pending leave and compliance alerts. All current, all in one place, instead of scattered across a workbook.",
        image: "/proof/carerota-dashboard.jpg",
        alt: "CareRota dashboard showing active staff, rota status, pending leave, compliance alerts, floor coverage and a cost snapshot against budget.",
      },
      {
        title: "A rota that does the maths.",
        caption:
          "Build and publish the month by role and floor. Cost and scheduled hours update as shifts go in, so the wage bill is in front of the manager while there is still time to change it, not after payroll.",
        image: "/proof/carerota-rota.jpg",
        alt: "CareRota monthly rota grid with running total cost, utilisation, variance and scheduled hours across the month.",
      },
      {
        title: "Leave and cover, tracked.",
        caption:
          "Annual leave, maternity and sick on one timeline, tied to entitlement. What used to live in a side note now sits beside the schedule it changes.",
        image: "/proof/carerota-leave.jpg",
        alt: "CareRota leave timeline showing annual leave, maternity and sick leave against entitlement.",
      },
    ],
  },
  honesty: {
    heading: "A capability build, not a savings headline.",
    body:
      "The system is real and running on our own infrastructure, shaped around the way a UK care home operates. We are not putting a number on hours or pounds saved, because the honest measure of this work is the jump you can see above: a fragile spreadsheet becomes one system that holds cost, coverage and compliance in a single place.",
  },
  closingLine: "If your rota still lives in a spreadsheet, that is a conversation worth having.",
  screenshotLabel: "CareRota Live Screenshot (Real system UI)",
};

export const FITOSYS: CaseStudy = {
  slug: "fitosys",
  kind: "own-build",
  published: true,
  eyebrow: "Own build · Coaching operations, India",
  title: "A fitness coach’s Sundays went to admin. We built a system that runs without them.",
  standfirst:
    "Independent coaches in India were losing evenings to manual check-ins and renewal chasing, and losing margin to commission-based software on top of it. Fitosys automates the admin and takes no cut of what a coach earns.",
  attribution: "Built by Alchemetryx · Own product, live in India · Coach quote anonymised",
  before: {
    heading: "A coach's week, before Fitosys.",
    body:
      "Standard coaching platforms take a percentage of every client payment, so the software gets more expensive as the coach succeeds. On top of that cut, most of the week's admin was still manual: typing out check-ins one client at a time, chasing renewals by hand, and onboarding new clients with no set process.",
    points: [
      { label: "Commission on every payment", body: "Standard SaaS platforms take a percentage of every client payment, so the tool costs more the more a coach earns." },
      { label: "A manual week", body: "Check-ins, renewal reminders and onboarding messages sent one at a time, client by client." },
      { label: "No one to build it for them", body: "Most independent coaches have no technical background and no budget for custom software." },
    ],
  },
  build: {
    heading: "A flat-fee system that runs the admin from WhatsApp.",
    body:
      "Fitosys automates client check-ins, renewal reminders and onboarding natively on WhatsApp, where the client already is. Payments route directly from client to coach over UPI, and Fitosys takes zero commission — a flat monthly fee instead, regardless of how much the coach earns.",
    items: [
      {
        title: "One thread, automated.",
        caption:
          "Weekly check-ins go out to every client automatically on WhatsApp. Replies come back into the same thread, renewal alerts fire on their own, and the coach sees a response-rate summary instead of chasing each conversation by hand.",
        image: "/proof/fitosys-main.jpg",
        alt: "Fitosys product view showing an automated WhatsApp check-in conversation, a renewal alert for three clients, and a weekly response-rate summary.",
      },
      {
        title: "The admin it replaces.",
        caption:
          "Fitosys's own product page breaks down where a coach's Sunday used to go: manual check-ins, payment follow-ups, onboarding messages and renewal reminders. The figures on this screen are Fitosys's own published estimate, not an Alchemetryx-audited number — see the note below.",
        image: "/proof/fitosys-savings.jpg",
        alt: "Fitosys marketing page showing a breakdown of hours lost weekly to manual check-ins, payment follow-ups, onboarding messages and renewal reminders, with a coach quote about losing Sunday evenings to admin.",
      },
      {
        title: "Live in under 30 minutes.",
        caption:
          "Four steps from sign-up to a running system: create a profile, create the first program, share the client link, and Fitosys runs the weekly cycle from there.",
        image: "/proof/fitosys-steps.jpg",
        alt: "Fitosys four-step onboarding flow: sign up and create a profile, create your first program, share your link, Fitosys runs the rest.",
      },
    ],
  },
  honesty: {
    heading: "Our own product, not a client engagement.",
    body:
      "Fitosys is built and run by Alchemetryx, not delivered for an outside client, so it earns a different kind of honesty than CareRota. The hours-lost and revenue figures shown on its own screens are Fitosys's published estimates, not numbers we have independently audited against real client accounts. What we can state plainly: it is a live product, in real use, automating check-ins, renewals and onboarding for coaches over WhatsApp, on a flat fee with no commission taken from a coach's earnings.",
  },
  closingLine: "If admin is eating the evenings you built this business to have back, that's the same problem.",
  screenshotLabel: "Fitosys Live Product Screenshot",
};

export const MEET_PRERNA: CaseStudy = {
  slug: "meet-prerna",
  kind: "client",
  published: true,
  eyebrow: "Case study · Independent artist booking",
  title: "A tattoo artist had no way to book a client online. We built her first one.",
  standfirst:
    "Meet Prerna ran her tattoo and fine-art practice through Instagram and word of mouth. We built her first dedicated site, with a consultation flow that takes a client from browsing the work to starting a booking.",
  attribution: "Built by Alchemetryx · Live client site · meetprerna.com",
  before: {
    heading: "Every enquiry, a manual reply.",
    body:
      "There was no site to send a prospective client to. Someone found Prerna's work through Instagram or word of mouth, and every consultation request meant a personal back-and-forth before a booking could even begin.",
    points: [
      { label: "No digital front door", body: "Nothing to point a new client to beyond a social profile." },
      { label: "Manual scheduling", body: "Every consultation was arranged by hand, one message at a time." },
      { label: "A first system", body: "This is Prerna's first dedicated site and booking flow, not a replacement for an older one." },
    ],
  },
  build: {
    heading: "A portfolio site with a real consultation pipeline.",
    body:
      "Built around the work itself: portfolio, about, and a consultation flow that moves a client from browsing to booked without Prerna typing out the same reply twice.",
    items: [
      {
        title: "The work, first.",
        caption:
          "A portfolio-led homepage that puts the tattoo and fine-art work in front of a visitor immediately, with a direct route into a consultation.",
        image: "/proof/meetprerna-hero.jpg",
        alt: "Meet Prerna website homepage showing a portrait and the heading Visual Artist and Tattooist, with a Start a Conversation button.",
      },
      {
        title: "A booking flow, not just a contact form.",
        caption:
          "Portfolio, About, Consultation and Connect as one sequence, so a client moves from seeing the work to starting a booking in the same visit.",
        image: "/proof/meetprerna-menu.jpg",
        alt: "Meet Prerna site navigation menu listing Portfolio, About, Consultation and Connect, with the About section highlighted.",
      },
    ],
  },
  honesty: {
    heading: "A first system, so the honest measure is that it exists.",
    body:
      "This replaced nothing, because there was nothing before it to replace. What we can state plainly: Prerna went from no booking system to one live, dedicated site with a working consultation flow. We are not putting a before/after number on it, since there was no prior system to measure against.",
  },
  closingLine: "If your booking still runs through your DMs, that's the same starting point Prerna was at.",
  screenshotLabel: "Meet Prerna Live Site Screenshot",
};

export const PRIMERASKIN: CaseStudy = {
  slug: "primeraskin",
  kind: "client",
  published: true,
  eyebrow: "Case study · Clinic consultation booking",
  title: "A skin clinic's consultations ran on manual back-and-forth. We built a booking pipeline instead.",
  standfirst:
    "PrimeraSkin needed a new client to book a consultation without a phone call or a message chain. We built a site where the booking flow itself moves a visitor toward a scheduled consultation.",
  attribution: "Built by Alchemetryx · Live client site",
  before: {
    heading: "A consultation took a conversation to arrange.",
    body:
      "Every new client meant a manual conversation before a consultation was even on the calendar. No structured flow existed to move someone from finding the clinic to actually booking a slot.",
    points: [
      { label: "Manual appointment setting", body: "Consultations were arranged case by case, with no set process for a new enquiry." },
      { label: "Administrative load on the founder", body: "Every booking-related task landed on the founder, on top of running the clinic itself." },
      { label: "No structured intake", body: "Nothing captured what a client needed before the first conversation happened." },
    ],
  },
  build: {
    heading: "A site built around getting a consultation booked.",
    body:
      "Treatment pages, a personalised-regimen section, and a consultation flow that runs on its own, so a visitor can move from reading about a treatment to booking a consultation without a phone call.",
    items: [
      {
        title: "Built to convert a visit into a booking.",
        caption:
          "The homepage leads with one action: secure a consultation. Treatments, expertise and social proof sit around that single path, not competing with it.",
        image: "/proof/primeraskin-hero.jpg",
        alt: "PrimeraSkin website homepage with the heading Reveal Your Clear, Radiant Skin Today and a Secure Your Consultation Today button.",
      },
      {
        title: "The consultation flow itself.",
        caption:
          "A personalised-regimen section structures what a client needs before the first conversation happens, instead of that intake being worked out over a phone call.",
        image: "/proof/primeraskin-consult.jpg",
        alt: "PrimeraSkin website section on personalised skin regimens, showing treatment categories and a video consultation in progress.",
      },
    ],
  },
  honesty: {
    heading: "Zero-touch scheduling, not a measured savings figure.",
    body:
      "This replaced a manual process with a structured one, but there is no baseline number for hours or bookings before this site existed, so we are not stating one. What changed, plainly: appointment setting now runs as a scheduling flow the site handles on its own, not a task that lands on the founder for every enquiry.",
  },
  closingLine: "If every new client still means a phone call before a booking exists, that's the gap this closes.",
  screenshotLabel: "PrimeraSkin Live Site Screenshot",
};

export const PUBLISHED_CASE_STUDIES: CaseStudy[] = [CARE_ROTA, FITOSYS, MEET_PRERNA, PRIMERASKIN].filter((c) => c.published);
