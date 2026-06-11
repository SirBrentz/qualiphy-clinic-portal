// 100% fabricated demo data — fake clinic "Radiant Wellness" (Scottsdale / Tempe / Mesa).
// Never put real patient data in this repo.

export const EXAMS = [
  { id: 'EX-20617', patient: 'Maya Reynolds', exam: 'Anti-Nausea Rx', full: 'Ondansetron 4mg ODT — Adult Telehealth Consult & Rx', loc: 'Scottsdale', status: 'Deferred', test: false, submitted: '2h ago', date: 'Jun 11', review: '11 min', provider: 'Dr. Patel', reason: 'Q4 — current medication interaction' },
  { id: 'EX-20616', patient: 'Jordan Pike', exam: 'GLP-1 Weight Loss', full: 'Semaglutide / Tirzepatide Weight Management Program', loc: 'Tempe', status: 'Deferred', test: false, submitted: '3h ago', date: 'Jun 11', review: '7 min', provider: 'Dr. Chen', reason: 'BMI below program threshold' },
  { id: 'EX-20615', patient: 'Alana Ortiz', exam: 'GFE · IV Therapy', full: 'Good Faith Exam — IV Hydration & Vitamin Therapy Clearance', loc: 'Scottsdale', status: 'Completed', test: false, submitted: '5h ago', date: 'Jun 11', review: '6 min', provider: 'Dr. Chen', reason: null },
  { id: 'EX-20611', patient: 'Marcus Webb', exam: 'GLP-1 Weight Loss', full: 'Semaglutide / Tirzepatide Weight Management Program', loc: 'Mesa', status: 'Completed', test: false, submitted: 'Yesterday', date: 'Jun 10', review: '9 min', provider: 'Dr. Chen', reason: null },
  { id: 'EX-20609', patient: 'Priya Nair', exam: 'Hair Restoration Rx', full: 'Finasteride / Minoxidil Combination Therapy Consult', loc: 'Tempe', status: 'Pending', test: false, submitted: 'Yesterday', date: 'Jun 10', review: null, provider: null, reason: null },
  { id: 'EX-20608', patient: 'Devon Marsh', exam: 'GFE · Injectables', full: 'Good Faith Exam — Neurotoxin & Dermal Filler Clearance', loc: 'Mesa', status: 'Pending', test: false, submitted: 'Yesterday', date: 'Jun 10', review: null, provider: null, reason: null },
  { id: 'EX-20604', patient: 'Sam Castillo', exam: 'GFE · Injectables', full: 'Good Faith Exam — Neurotoxin & Dermal Filler Clearance', loc: 'Scottsdale', status: 'Completed', test: false, submitted: 'Jun 9', date: 'Jun 9', review: '7 min', provider: 'Dr. Morales', reason: null },
  { id: 'EX-20603', patient: 'Erin Doyle', exam: 'Anti-Nausea Rx', full: 'Ondansetron 4mg ODT — Adult Telehealth Consult & Rx', loc: 'Mesa', status: 'Deferred', test: false, submitted: 'Jun 9', date: 'Jun 9', review: '14 min', provider: 'Dr. Patel', reason: 'Q4 — current medication interaction' },
  { id: 'EX-20601', patient: 'Tom Alvarez', exam: 'Peptide Therapy', full: 'Peptide Wellness Protocol — Telehealth Consult', loc: 'Tempe', status: 'Completed', test: true, submitted: 'Jun 8', date: 'Jun 8', review: '5 min', provider: 'Dr. Chen', reason: null },
  { id: 'EX-20598', patient: 'Lena Forsythe', exam: 'Anti-Nausea Rx', full: 'Ondansetron 4mg ODT — Adult Telehealth Consult & Rx', loc: 'Scottsdale', status: 'Deferred', test: false, submitted: 'Jun 8', date: 'Jun 8', review: '12 min', provider: 'Dr. Morales', reason: 'Q4 — current medication interaction' },
  { id: 'EX-20597', patient: 'Dana Whitfield', exam: 'Anti-Nausea Rx', full: 'Ondansetron 4mg ODT — Adult Telehealth Consult & Rx', loc: 'Scottsdale', status: 'Deferred', test: true, submitted: 'Jun 8', date: 'Jun 8', review: '3 min', provider: 'Dr. Chen', reason: 'Test run — Q4 wording check' },
  { id: 'EX-20596', patient: 'Owen Tran', exam: 'GFE · IV Therapy', full: 'Good Faith Exam — IV Hydration & Vitamin Therapy Clearance', loc: 'Tempe', status: 'Deferred', test: false, submitted: 'Jun 7', date: 'Jun 7', review: '9 min', provider: 'Dr. Chen', reason: 'BP reading out of range' },
  { id: 'EX-20594', patient: 'Maya Reynolds', exam: 'GFE · IV Therapy', full: 'Good Faith Exam — IV Hydration & Vitamin Therapy Clearance', loc: 'Scottsdale', status: 'Completed', test: false, submitted: 'May 28', date: 'May 28', review: '6 min', provider: 'Dr. Chen', reason: null },
  { id: 'EX-20590', patient: 'Grace Okafor', exam: 'GLP-1 Weight Loss', full: 'Semaglutide / Tirzepatide Weight Management Program', loc: 'Mesa', status: 'Completed', test: false, submitted: 'Jun 6', date: 'Jun 6', review: '8 min', provider: 'Dr. Patel', reason: null },
  { id: 'EX-20588', patient: 'Hank Sorensen', exam: 'Hair Restoration Rx', full: 'Finasteride / Minoxidil Combination Therapy Consult', loc: 'Tempe', status: 'Expired', test: false, submitted: 'Jun 2', date: 'Jun 2', review: null, provider: null, reason: null },
  { id: 'EX-20585', patient: 'Ivy Calloway', exam: 'GFE · Injectables', full: 'Good Faith Exam — Neurotoxin & Dermal Filler Clearance', loc: 'Scottsdale', status: 'Completed', test: false, submitted: 'Jun 5', date: 'Jun 5', review: '10 min', provider: 'Dr. Morales', reason: null },
  { id: 'EX-20581', patient: 'Noel Vance', exam: 'Peptide Therapy', full: 'Peptide Wellness Protocol — Telehealth Consult', loc: 'Mesa', status: 'Pending', test: false, submitted: 'Jun 5', date: 'Jun 5', review: null, provider: null, reason: null },
  { id: 'EX-20578', patient: 'Tara Bishop', exam: 'GLP-1 Weight Loss', full: 'Semaglutide / Tirzepatide Weight Management Program', loc: 'Scottsdale', status: 'Completed', test: false, submitted: 'Jun 4', date: 'Jun 4', review: '7 min', provider: 'Dr. Chen', reason: null },
  { id: 'EX-20574', patient: 'Felix Romero', exam: 'Anti-Nausea Rx', full: 'Ondansetron 4mg ODT — Adult Telehealth Consult & Rx', loc: 'Tempe', status: 'Completed', test: false, submitted: 'Jun 3', date: 'Jun 3', review: '6 min', provider: 'Dr. Patel', reason: null },
  { id: 'EX-20570', patient: 'Dana Whitfield', exam: 'GFE · IV Therapy', full: 'Good Faith Exam — IV Hydration & Vitamin Therapy Clearance', loc: 'Scottsdale', status: 'Completed', test: true, submitted: 'Jun 2', date: 'Jun 2', review: '4 min', provider: 'Dr. Chen', reason: null },
  { id: 'EX-20566', patient: 'Rosa Delgado', exam: 'GFE · Injectables', full: 'Good Faith Exam — Neurotoxin & Dermal Filler Clearance', loc: 'Mesa', status: 'Completed', test: false, submitted: 'Jun 1', date: 'Jun 1', review: '8 min', provider: 'Dr. Morales', reason: null }
]

export const EXAM_LIBRARY = [
  { name: 'GLP-1 Weight Loss', full: 'Semaglutide / Tirzepatide Weight Management Program', price: '$49.00', locs: 3, mode: 'Live', changed: 'May 14' },
  { name: 'Anti-Nausea Rx', full: 'Ondansetron 4mg ODT — Adult Telehealth Consult & Rx', price: '$27.99', locs: 3, mode: 'Live', changed: 'Jun 5' },
  { name: 'GFE · IV Therapy', full: 'Good Faith Exam — IV Hydration & Vitamin Therapy Clearance', price: '$29.99', locs: 2, mode: 'Live', changed: 'Apr 30' },
  { name: 'GFE · Injectables', full: 'Good Faith Exam — Neurotoxin & Dermal Filler Clearance', price: '$29.99', locs: 3, mode: 'Live', changed: 'Apr 30' },
  { name: 'Hair Restoration Rx', full: 'Finasteride / Minoxidil Combination Therapy Consult', price: '$34.99', locs: 1, mode: 'Live', changed: 'May 22' },
  { name: 'Peptide Therapy', full: 'Peptide Wellness Protocol — Telehealth Consult', price: '$39.99', locs: 1, mode: 'Test', changed: 'Jun 8' }
]

export const MEMBERS = [
  { name: 'Dana Whitfield', email: 'dana@radiantwellness.com', role: 'Owner', access: 'Everything', last: 'Now' },
  { name: 'Ellie Park', email: 'ellie@radiantwellness.com', role: 'Manager', access: 'Exams, patients, reports, brand', last: '1h ago' },
  { name: 'Jordan Whitman', email: 'j.whitman@radiantwellness.com', role: 'Front desk', access: 'Send invites, view activity', last: 'Yesterday' },
  { name: 'Sasha Lee', email: 'sasha@radiantwellness.com', role: 'Read-only', access: 'View activity & reports', last: 'Jun 8' },
  { name: 'Miguel Reyes', email: 'miguel@radiantwellness.com', role: 'Invited', access: 'Manager (pending)', last: '—' }
]

export const AUDIT_LOG = [
  { time: 'Jun 11 09:40', actor: 'Dana Whitfield', action: 'updated Brand Studio draft (text color)', detail: 'Publishing blocked by contrast check' },
  { time: 'Jun 10 14:22', actor: 'Ellie Park', action: 'edited locations on "Anti-Nausea Rx"', detail: 'Impact preview acknowledged — 3 locations, no question IDs changed' },
  { time: 'Jun 9 11:05', actor: 'Ellie Park', action: 'duplicated "GLP-1 Weight Loss" safely', detail: 'New copy created — original question & response IDs untouched' },
  { time: 'Jun 8 16:48', actor: 'Dana Whitfield', action: 'ran a test exam (Anti-Nausea Rx)', detail: 'Excluded from results & billing' },
  { time: 'Jun 8 09:12', actor: 'Dana Whitfield', action: 'invited Miguel Reyes as Manager', detail: null },
  { time: 'Jun 5 10:30', actor: 'Ellie Park', action: 'changed notification matrix', detail: 'Deferred → SMS enabled for all locations' },
  { time: 'Jun 2 15:01', actor: 'Dana Whitfield', action: 'scheduled weekly Deferred / NA report', detail: 'Mondays 7:00 AM → ellie@radiantwellness.com' }
]

export const WEBHOOK_LOG = [
  { time: 'Jun 11 09:25', event: 'exam.deferred · EX-20617', code: '200 OK' },
  { time: 'Jun 11 06:14', event: 'exam.completed · EX-20615', code: '200 OK' },
  { time: 'Jun 10 16:40', event: 'order.tracking_synced · EX-20611', code: '200 OK' },
  { time: 'Jun 10 11:02', event: 'exam.completed · EX-20611', code: '200 OK' }
]

export const REPORT_TEMPLATES = {
  deferred: {
    name: 'Deferred / NA list',
    desc: 'Deferrals with reasons, by exam',
    filters: ['Status is Deferred', 'Date May 1 – Jun 11', 'Location All'],
    cols: ['Patient', 'Exam', 'Deferral reason', 'Submitted', 'Location'],
    match: (e) => e.status === 'Deferred',
    cells: (e) => [e.patient, e.exam, e.reason || '—', e.date, e.loc],
    csvCols: ['patient', 'exam', 'reason', 'date', 'loc']
  },
  billing: {
    name: 'Billing export',
    desc: 'Completed exams with fees',
    filters: ['Status is Completed', 'Date Jun 1 – Jun 11', 'Location All'],
    cols: ['Patient', 'Exam', 'Fee', 'Completed', 'Location'],
    match: (e) => e.status === 'Completed',
    cells: (e) => [e.patient, e.exam, '$27.99', e.date, e.loc],
    csvCols: ['patient', 'exam', 'date', 'loc']
  },
  async: {
    name: 'Async analysis',
    desc: 'Review times by provider',
    filters: ['Has provider decision', 'Date May 1 – Jun 11', 'Location All'],
    cols: ['Patient', 'Exam', 'Provider', 'Review time', 'Outcome'],
    match: (e) => !!e.review,
    cells: (e) => [e.patient, e.exam, e.provider, e.review, e.status],
    csvCols: ['patient', 'exam', 'provider', 'review', 'status']
  }
}

export const BRAND_PRESETS = [
  { name: 'Radiant', p: '#3E7C6F', g: '#FFFFFF', t: '#21302C' },
  { name: 'Midnight', p: '#2A2438', g: '#F4F3F7', t: '#1A1626' },
  { name: 'Soft clay', p: '#B0613A', g: '#F8F1EC', t: '#3A2A20' }
]

export const EMAIL_ELLIE = 'ellie@radiantwellness.com'
export const EMAIL_HELLO = 'hello@radiantwellness.com'
