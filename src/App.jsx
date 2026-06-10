import { useState, useEffect } from "react";

const LIME = "#C8F135";
const FOREST = "#0A3D2E";
const FOREST_MID = "#0F5C42";
const FOREST_LIGHT = "#E4F0EB";
const OFF_WHITE = "#F7F4EF";
const CARD_BG = "#FFFFFF";
const TEXT = "#1A1A1A";
const MUTED = "#666666";
const BORDER = "#E0E0E0";
const AMBER = "#D4870A";
const AMBER_LIGHT = "#FEF3DC";
const CORAL = "#C0441E";
const CORAL_LIGHT = "#FDEEE9";
const BLUE = "#1A5FAA";
const BLUE_LIGHT = "#E8F1FC";
const PURPLE = "#5B4FC4";
const PURPLE_LIGHT = "#EEEDFE";

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const EVENT_DATE = new Date("2026-10-16");

const PHASES = [
  { id: "p1", label: "Foundation", weeks: "Wks 1–6", color: FOREST_MID, light: FOREST_LIGHT, desc: "Build joint resilience, re-establish aerobic base, lock in daily habits" },
  { id: "p2", label: "Build", weeks: "Wks 7–13", color: AMBER, light: AMBER_LIGHT, desc: "Intensify cardio, increase athleticism, begin event-specific prep" },
  { id: "p3", label: "Peak & Taper", weeks: "Wks 14–18", color: CORAL, light: CORAL_LIGHT, desc: "Simulate race demands, sharpen grip & running, taper before event" },
];

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const SCHEDULE = {
  p1: {
    Monday: {
      am: {
        label: "Cardio + Prehab", duration: "30–35 min",
        title: "Treadmill incline + joint prehab",
        items: [
          { t: "Daily non-negotiables", d: "10 min — Spanish squats, TKEs, hip 90/90, deadhang" },
          { t: "Treadmill", d: "20 min @ 12% incline, 3.0–3.5 MPH — conversational pace" },
          { t: "Jump rope", d: "3 × 1 min / 1 min rest — light footwork, not intensity" },
        ]
      },
      pm: null
    },
    Tuesday: {
      am: null,
      pm: {
        label: "Strength A — Lower", duration: "55–65 min",
        title: "Lower body strength + accessory",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Trap bar deadlift", d: "4 × 5 @ 60–70% — move well, not heavy" },
          { t: "Bulgarian split squat", d: "3 × 8 each leg — bodyweight or light DB" },
          { t: "RDL", d: "3 × 10 moderate weight — feel the hamstring" },
          { t: "Lateral band walk", d: "3 × 15 steps each direction with hip circle" },
          { t: "Step ups", d: "3 × 10 each leg onto plyo box" },
        ]
      }
    },
    Wednesday: {
      am: {
        label: "Rowing VO2", duration: "30–35 min",
        title: "Rower VO2 intervals",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Warm-up", d: "3 min easy paddle" },
          { t: "Intervals", d: "6 × 2 min hard (RPE 7–8) / 2 min easy" },
          { t: "Cool down", d: "3 min easy — total row time ~27 min" },
        ]
      },
      pm: null
    },
    Thursday: {
      am: null,
      pm: {
        label: "Strength B — Upper", duration: "55–65 min",
        title: "Upper body strength + grip/power",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Bench press", d: "4 × 5 @ 65–75% — controlled descent" },
          { t: "Powertec rows", d: "4 × 8 — keep shoulder blades working" },
          { t: "Ring rows or pull up negatives", d: "3 × 6–8" },
          { t: "Box jumps", d: "3 × 5 — quality landings, soft knees" },
          { t: "Dips", d: "3 × 8–10" },
          { t: "Shoulder isolation", d: "Lateral raises + face pulls, 2 × 15" },
        ]
      }
    },
    Friday: {
      am: {
        label: "Mobility", duration: "30 min",
        title: "Active recovery / movement quality",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Full body mobility flow", d: "All 10 movements — see Mobility Card" },
          { t: "Punching bag", d: "3 × 2 min rounds — light and loose, rotational movement, footwork" },
          { t: "Note", d: "No intensity today. This session is about moving, not working." },
        ]
      },
      pm: null
    },
    Saturday: {
      am: null,
      pm: {
        label: "Strength C — Full Body", duration: "60–70 min",
        title: "Squat-anchored full body day",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Back squat", d: "4 × 5 @ 65–70% — depth without pain as guide" },
          { t: "KB swings", d: "4 × 15 — hip hinge power, not a squat" },
          { t: "Pull ups / ring pull ups", d: "3 × max — add negatives if needed" },
          { t: "MB rotational throws", d: "3 × 10 against wall or slams" },
          { t: "Farmer carry", d: "3 × 30 yards with trap bar or DBs" },
          { t: "Arms", d: "DB curls + tricep work, 2 × 12 each" },
        ]
      }
    },
    Sunday: { am: null, pm: null, rest: true },
  },
  p2: {
    Monday: {
      am: {
        label: "Running Intervals", duration: "35 min",
        title: "Treadmill run/walk progression",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Wks 7–9", d: "5 min walk warm-up, then 6 × (2 min run / 2 min walk)" },
          { t: "Wks 10–13", d: "Build to 6 × (3 min run / 90 sec walk)" },
          { t: "Incline", d: "2–4% for all running segments — easier on knees than flat" },
          { t: "Goal", d: "Running feels unremarkable, not heroic" },
        ]
      },
      pm: null
    },
    Tuesday: {
      am: null,
      pm: {
        label: "Strength A — Lower + Power", duration: "60–70 min",
        title: "Lower power + unilateral work",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Trap bar deadlift", d: "4 × 4 @ 75–80% — start increasing weight" },
          { t: "Bulgarian split squat", d: "3 × 10 each leg — add DB weight" },
          { t: "RDL", d: "4 × 8 — add load" },
          { t: "Step ups with weight", d: "3 × 12 each leg" },
          { t: "Jump squats or box jumps", d: "4 × 5 — explosive, land soft" },
          { t: "Lateral band work", d: "3 × 20 steps each direction" },
        ]
      }
    },
    Wednesday: {
      am: {
        label: "Rowing + Jump Rope", duration: "35 min",
        title: "Intensified rower session",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Rower", d: "8 × 2 min hard / 90 sec easy" },
          { t: "Jump rope finisher", d: "5 × 1 min with 45 sec rest — introduce doubles if possible" },
        ]
      },
      pm: null
    },
    Thursday: {
      am: null,
      pm: {
        label: "Strength B — Upper + Grip", duration: "60–70 min",
        title: "Upper strength + obstacle-specific grip",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Bench press", d: "4 × 5 @ 75–80%" },
          { t: "Weighted pull ups", d: "4 × max or 5 weighted" },
          { t: "Ring rows + ring push ups", d: "3 × 8–10" },
          { t: "Alternating deadhang", d: "3 × 20–30 sec each arm — progress toward unassisted single arm" },
          { t: "KB overhead press", d: "3 × 10" },
          { t: "Rotational band work", d: "3 × 12 each side" },
        ]
      }
    },
    Friday: {
      am: {
        label: "Mobility + Bag Work", duration: "30 min",
        title: "Active recovery — slightly elevated",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Full body mobility flow", d: "All 10 movements — see Mobility Card" },
          { t: "Punching bag", d: "4 × 3 min rounds — more intent, footwork + combinations" },
          { t: "Speed bag", d: "3 × 2 min — coordination and rhythm" },
        ]
      },
      pm: null
    },
    Saturday: {
      am: null,
      pm: {
        label: "Strength + Conditioning", duration: "65–75 min",
        title: "Full body strength + event simulation circuit",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Back squat", d: "4 × 5 @ 70–75%" },
          { t: "Circuit", d: "3 rounds: 20yd farmer carry → 3 box jumps → 5 pull ups" },
          { t: "KB swings", d: "4 × 20" },
          { t: "Bear crawl", d: "3 × 20 yards" },
          { t: "Rope climb simulation", d: "3 × 5 pulls (towel over pull up bar)" },
        ]
      }
    },
    Sunday: { am: null, pm: null, rest: true },
  },
  p3: {
    Monday: {
      am: {
        label: "Running Progression", duration: "35–40 min",
        title: "Continuous run + walk finisher",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Wks 14–16", d: "2–3 km continuous run @ easy pace, 2 min walk, repeat 2–3 times" },
          { t: "Goal", d: "This is your Tough Mudder simulation — pace doesn't matter, finishing does" },
          { t: "Wks 17–18 (taper)", d: "Cut volume by 40%, keep pace" },
        ]
      },
      pm: null
    },
    Tuesday: {
      am: null,
      pm: {
        label: "Strength — Maintain", duration: "55–65 min",
        title: "Full body strength — lower volume",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Trap bar deadlift", d: "3 × 3 @ 80% — feel strong, stop there" },
          { t: "Back squat", d: "3 × 3 @ 75–80%" },
          { t: "Bench press", d: "3 × 5 @ 75%" },
          { t: "Pull ups", d: "3 × max" },
          { t: "Note", d: "If anything feels off, drop weight immediately. Joints happy > numbers." },
        ]
      }
    },
    Wednesday: {
      am: {
        label: "Rowing — Moderate", duration: "30 min",
        title: "Steady state rower + grip work",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Rower", d: "20 min @ moderate steady effort (RPE 6)" },
          { t: "Deadhang", d: "3 × max, alternating single-arm work" },
          { t: "Jump rope", d: "5 min easy footwork" },
        ]
      },
      pm: null
    },
    Thursday: {
      am: null,
      pm: {
        label: "Obstacle Simulation", duration: "55–65 min",
        title: "Race day simulation — key obstacles",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Burpee to box jump", d: "4 × 8" },
          { t: "Farmer carry + pull up", d: "4 rounds" },
          { t: "Ring traverse / ring rows", d: "3 × max" },
          { t: "Crawling", d: "3 × 10 yards (use stall mats)" },
          { t: "KB swings", d: "3 × 20" },
          { t: "Punching bag", d: "3 × 2 min for mental intensity" },
        ]
      }
    },
    Friday: {
      am: {
        label: "Mobility Only", duration: "25 min",
        title: "Full body mobility — no loading",
        items: [
          { t: "Daily non-negotiables", d: "10 min" },
          { t: "Full body mobility flow", d: "All 10 movements — see Mobility Card" },
          { t: "Note", d: "No loading. Arrive at Saturday feeling fresh." },
        ]
      },
      pm: null
    },
    Saturday: {
      am: null,
      pm: {
        label: "Long Conditioning", duration: "60 min",
        title: "Endurance + strength complex",
        items: [
          { t: "Wks 14–15", d: "3 km run (walk breaks fine), then strength complex: squat, DL, rows, pull ups" },
          { t: "Wk 16", d: "Full mock session — 40–45 min mixed movement, running, carries, obstacles" },
          { t: "Wk 17", d: "Cut to 30 min moderate effort only" },
          { t: "Race week", d: "20 min easy movement Mon, rest Tue–Thu, race day prep Fri" },
        ]
      }
    },
    Sunday: { am: null, pm: null, rest: true },
  }
};

const MOBILITY = [
  { zone: "Hips & Hip Flexors", zoneColor: FOREST_MID, zoneBg: FOREST_LIGHT, moves: [
    { n: "1", name: "Low lunge with reach", dur: "60 sec / side", cue: "Sink the back knee toward the floor, reach the same-side arm overhead and open the chest. Let gravity do the work — don't force the depth." },
    { n: "2", name: "Hip 90/90 with forward fold", dur: "2–3 min total", cue: "Transition slowly between sides. Add a forward fold over the front shin on each. Take it slower than your non-negotiable version." },
    { n: "3", name: "Hip circles", dur: "15 each direction / leg", cue: "Standing, one hand on wall. Slow, exaggerated circles — feel the hip socket moving freely in all directions." },
  ]},
  { zone: "Thoracic Spine", zoneColor: PURPLE, zoneBg: PURPLE_LIGHT, moves: [
    { n: "4", name: "Thread the needle", dur: "10 reps / side", cue: "On all fours. Slide one arm under your body and rotate through the thoracic spine — not the lower back. Follow the hand with your eyes." },
    { n: "5", name: "Seated thoracic rotations", dur: "10 reps / side", cue: "Sit cross-legged. Hands behind head, elbows wide. Rotate from the mid-back only — hips stay square. Pause at end range." },
  ]},
  { zone: "Ankles & Calves", zoneColor: BLUE, zoneBg: BLUE_LIGHT, moves: [
    { n: "6", name: "Ankle circles", dur: "10 each direction / ankle", cue: "Seated or standing. Slow, controlled full circles. Matters more than people think for knee tracking upstream." },
    { n: "7", name: "Wall calf stretch", dur: "60 sec / side", cue: "Straight leg first (gastrocnemius), then bent knee (soleus). Both matter. One foot close to wall, heel stays down." },
  ]},
  { zone: "Shoulders & Upper Body", zoneColor: AMBER, zoneBg: AMBER_LIGHT, moves: [
    { n: "8", name: "Shoulder CARs", dur: "5 each direction / arm", cue: "Controlled articular rotations — one arm, full-range slow circles. Find where it sticks or catches. That's exactly where you need to be." },
    { n: "9", name: "Leg swings", dur: "15 each direction / leg", cue: "Forward/back then side-to-side. Loose and pendulum-like — not a kick. Primes the hips before the bag work." },
  ]},
  { zone: "Full Body Integration", zoneColor: CORAL, zoneBg: CORAL_LIGHT, moves: [
    { n: "10", name: "World's greatest stretch", dur: "5 reps / side", cue: "Lunge forward, drop same-side elbow to the floor, then rotate and reach to the ceiling. Hips, thoracic, and hamstrings in one movement. The best single mobility drill you can do." },
  ]},
];

const NON_NEGOTIABLES = [
  { icon: "◆", text: "Spanish squats", detail: "3 × 30–45 sec wall holds — knees over toes, controlled" },
  { icon: "◆", text: "TKEs", detail: "3 × 15 each leg with band" },
  { icon: "◆", text: "Hip 90/90 stretch", detail: "2 min per side on floor" },
  { icon: "◆", text: "Deadhang", detail: "3 sets to comfortable failure — build toward 60 sec, then single-arm" },
  { icon: "◆", text: "Light movement", detail: "5–10 min before any morning session" },
  { icon: "◆", text: "Knee cream", detail: "After any workout where knees were loaded" },
];

const DIET = [
  { label: "Protein", detail: "180–200g/day. Every meal anchored by protein first." },
  { label: "Starches", detail: "Swap one dinner starch for veg 4–5 nights a week." },
  { label: "Post-workout", detail: "Protein shake within 30–45 min." },
  { label: "Drinks", detail: "Aim for 2–3 alcohol-free nights/week. Sleep quality is a training variable." },
  { label: "Sweet tooth", detail: "Dark chocolate (70%+) — satisfies without the spike." },
  { label: "Water", detail: "3–4 liters daily. Joints and performance both depend on it." },
];

const STRENGTH = [
  { lift: "Trap bar deadlift", max: "~500 lb", p1: "60–70%", p2: "75–80%", p3: "80% × 3" },
  { lift: "Back squat", max: "~350 lb", p1: "65–70%", p2: "70–75%", p3: "75–80% × 3" },
  { lift: "Bench press", max: "~300 lb", p1: "65–75%", p2: "75–80%", p3: "75% × 5" },
];

const TARGETS = [
  { label: "Weight", value: "265 → 235", sub: "~1.5–2 lb / week" },
  { label: "Running", value: "2–3 km", sub: "Easy, repeatable" },
  { label: "Pull ups", value: "10+ clean", sub: "Bar or rings" },
  { label: "Deadhang", value: "60 sec", sub: "→ single arm" },
  { label: "Knees", value: "Pain down", sub: "Prehab daily" },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function daysUntilEvent() {
  const now = new Date();
  const diff = Math.ceil((EVENT_DATE - now) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

function todayDayName() {
  return DAYS[new Date().getDay()];
}

// ─────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────

function WorkoutItem({ item }) {
  return (
    <div style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: `1px solid ${BORDER}` }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: LIME, background: FOREST, padding: "2px 6px", borderRadius: 3, whiteSpace: "nowrap", marginTop: 2, flexShrink: 0 }}>
        {item.t}
      </span>
      <span style={{ fontSize: 14, color: MUTED, lineHeight: 1.5 }}>{item.d}</span>
    </div>
  );
}

function SessionCard({ session, tag, tagColor, tagBg }) {
  const [open, setOpen] = useState(false);
  if (!session) return (
    <div style={{ background: "#FAFAFA", borderRadius: 10, padding: "14px 16px", border: `1px dashed ${BORDER}` }}>
      <span style={{ fontSize: 13, color: "#BBBBBB", fontStyle: "italic" }}>Rest — non-negotiables only</span>
    </div>
  );
  return (
    <div style={{ background: CARD_BG, borderRadius: 10, border: `1px solid ${BORDER}`, overflow: "hidden" }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", cursor: "pointer", userSelect: "none" }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 8px", borderRadius: 4, background: tagBg, color: tagColor, whiteSpace: "nowrap" }}>{tag}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: TEXT }}>{session.label}</div>
          <div style={{ fontSize: 12, color: MUTED }}>{session.duration}</div>
        </div>
        <span style={{ fontSize: 18, color: MUTED, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>
      </div>
      {open && (
        <div style={{ padding: "0 16px 14px" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: FOREST_MID, marginBottom: 10 }}>{session.title}</div>
          {session.items.map((item, i) => <WorkoutItem key={i} item={item} />)}
        </div>
      )}
    </div>
  );
}

function DayCard({ dayName, data, isToday, phaseColor }) {
  const [open, setOpen] = useState(isToday);
  if (!data) return null;

  const isRest = data.rest;

  return (
    <div style={{
      borderRadius: 12,
      border: isToday ? `2px solid ${LIME}` : `1px solid ${BORDER}`,
      background: isToday ? "#FAFFF4" : CARD_BG,
      overflow: "hidden",
      boxShadow: isToday ? `0 0 0 3px ${LIME}22` : "none"
    }}>
      <div
        onClick={() => !isRest && setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", cursor: isRest ? "default" : "pointer", userSelect: "none" }}
      >
        <div style={{ width: 40, textAlign: "center", flexShrink: 0 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            {dayName.slice(0, 3)}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: TEXT }}>{dayName}</span>
            {isToday && <span style={{ fontSize: 11, fontWeight: 600, background: LIME, color: FOREST, padding: "2px 8px", borderRadius: 20 }}>TODAY</span>}
            {isRest && <span style={{ fontSize: 12, color: MUTED, fontStyle: "italic" }}>Rest day</span>}
            {!isRest && data.am && <span style={{ fontSize: 11, color: BLUE, background: BLUE_LIGHT, padding: "2px 7px", borderRadius: 4 }}>AM</span>}
            {!isRest && data.pm && <span style={{ fontSize: 11, color: PURPLE, background: PURPLE_LIGHT, padding: "2px 7px", borderRadius: 4 }}>PM</span>}
          </div>
          {!isRest && !open && (
            <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>
              {[data.am?.label, data.pm?.label].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>
        {!isRest && <span style={{ fontSize: 20, color: MUTED, transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>›</span>}
      </div>
      {!isRest && open && (
        <div style={{ padding: "0 18px 18px", display: "flex", flexDirection: "column", gap: 10 }}>
          {data.am && <SessionCard session={data.am} tag="AM" tagColor={BLUE} tagBg={BLUE_LIGHT} />}
          {data.pm && <SessionCard session={data.pm} tag="PM" tagColor={PURPLE} tagBg={PURPLE_LIGHT} />}
          {!data.am && !data.pm && (
            <div style={{ fontSize: 13, color: MUTED, fontStyle: "italic" }}>Non-negotiables only. No structured session.</div>
          )}
        </div>
      )}
      {isRest && (
        <div style={{ padding: "0 18px 14px 70px" }}>
          <div style={{ fontSize: 13, color: MUTED }}>Non-negotiables still happen. Light walk optional. Good day for meal prep.</div>
        </div>
      )}
    </div>
  );
}

function ScheduleView({ phase }) {
  const today = todayDayName();
  const schedule = SCHEDULE[phase.id];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].map(day => (
        <DayCard key={day} dayName={day} data={schedule[day]} isToday={day === today} phaseColor={phase.color} />
      ))}
    </div>
  );
}

function MobilityView() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: TEXT, marginBottom: 4 }}>Friday Mobility Flow</h2>
        <p style={{ fontSize: 14, color: MUTED }}>15–20 min · Full body movement quality · No intensity — move, don't work · Precedes punching bag rounds</p>
      </div>
      {MOBILITY.map((zone, zi) => (
        <div key={zi} style={{ marginBottom: 20 }}>
          <div style={{
            display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: zone.zoneColor, background: zone.zoneBg,
            padding: "4px 12px", borderRadius: 4, marginBottom: 10
          }}>
            {zone.zone}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {zone.moves.map((move, mi) => (
              <div key={mi} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "14px 16px", display: "flex", gap: 14 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%", background: zone.zoneBg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Mono', monospace", fontWeight: 700, fontSize: 14,
                  color: zone.zoneColor, flexShrink: 0
                }}>
                  {move.n}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                    <span style={{ fontSize: 15, fontWeight: 600, color: TEXT }}>{move.name}</span>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: zone.zoneColor, background: zone.zoneBg, padding: "1px 8px", borderRadius: 3 }}>{move.dur}</span>
                  </div>
                  <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, margin: 0 }}>{move.cue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ background: FOREST, borderRadius: 12, padding: "16px 20px", marginTop: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: LIME, marginBottom: 10, letterSpacing: "0.05em" }}>PUNCHING BAG FINISHER</div>
        <div style={{ fontSize: 14, color: "#CCEEDD", marginBottom: 6 }}>3 × 2 min rounds · 1 min rest between · Light and loose</div>
        <div style={{ fontSize: 13, color: "#99CCBB" }}>Focus on footwork, rotation, and rhythm — not power. Your hips are warm from the flow, so let the punches come from there. This is coordination work, not conditioning.</div>
      </div>
    </div>
  );
}

function NonNegotiablesView() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: TEXT, marginBottom: 4 }}>Daily Non-Negotiables</h2>
        <p style={{ fontSize: 14, color: MUTED }}>Every single day — no exceptions. These take 10 min and are the foundation everything else depends on.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
        {NON_NEGOTIABLES.map((item, i) => (
          <div key={i} style={{ background: FOREST_LIGHT, borderLeft: `4px solid ${FOREST_MID}`, borderRadius: "0 10px 10px 0", padding: "14px 16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: FOREST_MID, fontWeight: 700, marginTop: 1 }}>0{i+1}</span>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: FOREST, marginBottom: 3 }}>{item.text}</div>
              <div style={{ fontSize: 13, color: MUTED }}>{item.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: TEXT, marginBottom: 4 }}>Diet Framework</h2>
      <p style={{ fontSize: 14, color: MUTED, marginBottom: 16 }}>Not a strict diet — a set of reliable anchors that work with the semaglutide.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 32 }}>
        {DIET.map((item, i) => (
          <div key={i} style={{ background: AMBER_LIGHT, borderLeft: `4px solid ${AMBER}`, borderRadius: "0 10px 10px 0", padding: "12px 16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: AMBER, minWidth: 80, flexShrink: 0 }}>{item.label}</span>
            <span style={{ fontSize: 13, color: MUTED }}>{item.detail}</span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 22, fontWeight: 700, color: TEXT, marginBottom: 4 }}>Sleep</h2>
      <p style={{ fontSize: 14, color: MUTED, marginBottom: 16 }}>The single non-workout intervention with the highest ROI at 47.</p>
      <div style={{ background: BLUE_LIGHT, borderLeft: `4px solid ${BLUE}`, borderRadius: "0 12px 12px 0", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          "Target: in bed by 10:30pm, up by 6:30am. Work toward this in weeks 1–2.",
          "No screens 30 min before bed. This one actually works.",
          "Keep alcohol to earlier in the evening when you do drink.",
          "Sleep affects GH, testosterone, cortisol, and joint inflammation. It's a training variable, not a lifestyle preference."
        ].map((item, i) => (
          <div key={i} style={{ fontSize: 13, color: BLUE, display: "flex", gap: 8 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>→</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StrengthView() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: TEXT, marginBottom: 4 }}>Strength Guidelines</h2>
        <p style={{ fontSize: 14, color: MUTED }}>Goal is maintenance — not maxing. Leave reps in the tank every session. Arrive at October 16th healthy and strong.</p>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: FOREST }}>
              {["Lift","Est. Max","Foundation","Build","Peak"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: LIME, fontFamily: "'DM Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STRENGTH.map((row, i) => (
              <tr key={i} style={{ background: i % 2 === 0 ? CARD_BG : OFF_WHITE }}>
                <td style={{ padding: "12px 14px", fontWeight: 600, color: TEXT }}>{row.lift}</td>
                <td style={{ padding: "12px 14px", fontFamily: "'DM Mono', monospace", color: MUTED }}>{row.max}</td>
                <td style={{ padding: "12px 14px", fontFamily: "'DM Mono', monospace", color: FOREST_MID, background: FOREST_LIGHT }}>{row.p1}</td>
                <td style={{ padding: "12px 14px", fontFamily: "'DM Mono', monospace", color: AMBER }}>{row.p2}</td>
                <td style={{ padding: "12px 14px", fontFamily: "'DM Mono', monospace", color: CORAL }}>{row.p3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: 20, background: FOREST_LIGHT, borderRadius: 10, padding: "14px 18px" }}>
        <div style={{ fontSize: 13, color: FOREST, lineHeight: 1.7 }}>
          <strong>No testing maxes during this 18 weeks.</strong> The strength work exists to preserve your base while cardio, joint health, and athleticism develop. Trust the percentages. The conditioning work is the hard part.
        </div>
      </div>

      <div style={{ marginTop: 28 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: TEXT, marginBottom: 16 }}>Progress Targets</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: 10 }}>
          {TARGETS.map((t, i) => (
            <div key={i} style={{ background: CARD_BG, border: `1px solid ${BORDER}`, borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{t.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{t.value}</div>
              <div style={{ fontSize: 12, color: MUTED }}>{t.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "schedule", label: "Schedule" },
  { id: "mobility", label: "Mobility" },
  { id: "dailies", label: "Dailies & Diet" },
  { id: "strength", label: "Strength" },
];

export default function App() {
  const [activePhase, setActivePhase] = useState("p1");
  const [activeNav, setActiveNav] = useState("schedule");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const daysLeft = daysUntilEvent();
  const phase = PHASES.find(p => p.id === activePhase);

  return (
    <div style={{ minHeight: "100vh", background: OFF_WHITE, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${OFF_WHITE}; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #CCC; border-radius: 3px; }
      `}</style>

      {/* Header */}
      <div style={{ background: FOREST, padding: "0 20px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", alignItems: "center", gap: 16, height: 56 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: LIME, letterSpacing: "0.12em", textTransform: "uppercase" }}>Tough Mudder</div>
            <div style={{ fontSize: 11, color: "#88BBAA" }}>Oct 16 · <span style={{ fontFamily: "'DM Mono', monospace", color: daysLeft < 30 ? LIME : "#88BBAA" }}>{daysLeft} days out</span></div>
          </div>
          {/* Desktop nav */}
          <div style={{ display: "flex", gap: 2 }} className="desktop-nav">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => setActiveNav(item.id)} style={{
                background: activeNav === item.id ? LIME : "transparent",
                color: activeNav === item.id ? FOREST : "#88BBAA",
                border: "none", cursor: "pointer", padding: "6px 14px", borderRadius: 6,
                fontSize: 13, fontWeight: 600, transition: "all 0.15s"
              }}>{item.label}</button>
            ))}
          </div>
          <button onClick={() => setMobileMenuOpen(o => !o)} style={{ display: "none", background: "transparent", border: "none", color: "#AADDCC", fontSize: 22, cursor: "pointer" }} className="mobile-menu-btn">☰</button>
        </div>
        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div style={{ paddingBottom: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => { setActiveNav(item.id); setMobileMenuOpen(false); }} style={{
                background: activeNav === item.id ? LIME : "rgba(255,255,255,0.1)",
                color: activeNav === item.id ? FOREST : "#AADDCC",
                border: "none", cursor: "pointer", padding: "8px 16px", borderRadius: 6,
                fontSize: 13, fontWeight: 600
              }}>{item.label}</button>
            ))}
          </div>
        )}
      </div>

      {/* Main */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px" }}>

        {/* Hero */}
        {activeNav === "schedule" && (
          <>
            <div style={{ background: FOREST, borderRadius: 16, padding: "24px 28px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 180, height: 180, borderRadius: "50%", background: LIME, opacity: 0.06 }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: LIME, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 6 }}>18-Week Program</div>
              <div style={{ fontSize: 26, fontWeight: 700, color: "#FFFFFF", marginBottom: 4 }}>Your Training Plan</div>
              <div style={{ fontSize: 14, color: "#88BBAA", marginBottom: 20, lineHeight: 1.5 }}>Joint health → cardio engine → strength maintenance → athleticism → body composition</div>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 28, fontWeight: 500, color: LIME }}>{daysLeft}</div>
                  <div style={{ fontSize: 11, color: "#88BBAA" }}>days to race</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 28, fontWeight: 500, color: "#FFFFFF" }}>265→235</div>
                  <div style={{ fontSize: 11, color: "#88BBAA" }}>weight target</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 28, fontWeight: 500, color: "#FFFFFF" }}>5</div>
                  <div style={{ fontSize: 11, color: "#88BBAA" }}>pillars</div>
                </div>
              </div>
            </div>

            {/* Phase selector */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, overflowX: "auto", paddingBottom: 4 }}>
              {PHASES.map(p => (
                <button key={p.id} onClick={() => setActivePhase(p.id)} style={{
                  flexShrink: 0,
                  background: activePhase === p.id ? p.color : CARD_BG,
                  color: activePhase === p.id ? "#FFFFFF" : TEXT,
                  border: activePhase === p.id ? `2px solid ${p.color}` : `2px solid ${BORDER}`,
                  borderRadius: 10, cursor: "pointer", padding: "10px 16px", textAlign: "left",
                  transition: "all 0.15s", minWidth: 140
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{p.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.8, marginTop: 1 }}>{p.weeks}</div>
                </button>
              ))}
            </div>

            <div style={{ background: phase.light, borderRadius: 10, padding: "10px 16px", marginBottom: 20, borderLeft: `3px solid ${phase.color}` }}>
              <div style={{ fontSize: 13, color: phase.color, fontWeight: 600 }}>Phase goal</div>
              <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>{phase.desc}</div>
            </div>

            <ScheduleView phase={phase} />
          </>
        )}

        {activeNav === "mobility" && <MobilityView />}
        {activeNav === "dailies" && <NonNegotiablesView />}
        {activeNav === "strength" && <StrengthView />}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
}
