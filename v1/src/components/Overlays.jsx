import { useApp } from '../App.jsx'
import { EXAMS } from '../data/exams.js'
import { StatusChip, initials, sectionLabel, MONO } from '../lib/ui.jsx'

export function SlideOver() {
  const { state, set, flash } = useApp()
  const e = state.openExam ? EXAMS.find((x) => x.id === state.openExam) : null
  if (!e) return null

  const close = () => set({ openExam: null })

  const timeline = [{ title: 'Invite sent', time: e.date + ' · 8:02 AM · by Dana W.', done: true }]
  if (e.status === 'Pending') {
    timeline.push({ title: 'Awaiting patient', time: 'Not started yet', done: false })
  } else if (e.status === 'Expired') {
    timeline.push({ title: 'Expired', time: e.date + ' · invite lapsed after 7 days', fail: true })
  } else {
    timeline.push({ title: 'Exam submitted', time: e.date + ' · 9:14 AM', done: true })
    timeline.push({ title: 'Provider review — ' + e.provider, time: e.date + ' · 9:18 AM', done: true })
    timeline.push({
      title: e.status, time: e.date + ' · 9:25 AM · ' + e.review + ' total',
      done: e.status === 'Completed', fail: e.status === 'Deferred'
    })
  }

  const peers = EXAMS.filter((x) => x.patient === e.patient)
  const fulfilled = e.status === 'Completed' && !e.test
  const fulfillStyle = fulfilled
    ? { border: '1px solid #BFE5D2', background: '#F4FBF7', borderRadius: 10, padding: '13px 15px', fontSize: 12.5, color: '#21563C', lineHeight: 1.55 }
    : { border: '1px dashed #DCD8E6', borderRadius: 10, padding: '13px 15px', fontSize: 12.5, color: '#8B86A0', lineHeight: 1.55 }
  const fulfillText = e.status === 'Completed'
    ? (e.test ? 'Test exam — excluded from fulfillment, results and billing.' : 'Fulfilled via partner pharmacy · tracking synced to the order automatically.')
    : 'No medication or tracking — exam was not completed.'

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,22,38,0.28)', zIndex: 50 }} onClick={close} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 396, background: '#FFFFFF', borderLeft: '1px solid #E4E1EC', boxShadow: '-24px 0 48px rgba(26,22,38,0.14)', zIndex: 51, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid #ECEAF1' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <div>
              <div style={{ fontSize: 17, fontWeight: 800 }}>{e.patient}</div>
              <div style={{ fontSize: 12.5, color: '#6E6982', marginTop: 2 }}>{e.exam} · {e.loc} · #{e.id}</div>
            </div>
            <div style={{ flex: 1 }} />
            <StatusChip status={e.status} test={e.test} />
            <span style={{ fontSize: 16, color: '#8B86A0', cursor: 'pointer', lineHeight: 1, padding: '2px 4px' }} onClick={close}>✕</span>
          </div>
        </div>
        <div style={{ padding: '18px 24px', flex: 1, overflowY: 'auto' }}>
          {e.reason && (
            <div style={{ background: '#FDEAEA', border: '1px solid #F4C9C9', borderRadius: 10, padding: '13px 15px', marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#C03434', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>Deferral reason</div>
              <div style={{ fontSize: 13, color: '#6B2222', lineHeight: 1.55 }}>Provider deferred: {e.reason}.</div>
            </div>
          )}
          <div style={{ ...sectionLabel, marginBottom: 12 }}>Timeline</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 22 }}>
            {timeline.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 12 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{ width: 9, height: 9, borderRadius: '50%', marginTop: 4, background: t.fail ? '#C03434' : t.done ? '#4D3D71' : '#C9C4D6', flexShrink: 0 }} />
                  <span style={{ width: 1.5, flex: 1, background: i < timeline.length - 1 ? '#E4E1EC' : 'transparent' }} />
                </div>
                <div style={{ paddingBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.fail ? '#C03434' : t.done ? '#1A1626' : '#8B86A0' }}>{t.title}</div>
                  <div style={{ fontFamily: MONO, fontSize: 11, color: '#8B86A0' }}>{t.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ ...sectionLabel, marginBottom: 10 }}>Fulfillment</div>
          <div style={fulfillStyle}>{fulfillText}</div>
          <div style={{ ...sectionLabel, margin: '22px 0 10px' }}>Patient</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#EFECF6', color: '#4D3D71', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>{initials(e.patient)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{e.patient}</div>
              <div style={{ fontSize: 11.5, color: '#8B86A0' }}>{peers.length}{peers.length === 1 ? ' exam' : ' exams'} on file</div>
            </div>
            <span
              style={{ fontSize: 12.5, fontWeight: 700, color: '#4D3D71', cursor: 'pointer' }}
              onClick={() => set({ screen: 'patients', patientId: e.patient, openExam: null })}
            >
              View patient →
            </span>
          </div>
        </div>
        <div style={{ padding: '16px 24px', borderTop: '1px solid #ECEAF1', display: 'flex', gap: 10 }}>
          <div
            style={{ flex: 1, background: '#4D3D71', borderRadius: 8, padding: '10px 0', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}
            onClick={() => { flash('Exam invite resent to ' + e.patient); close() }}
          >
            Resend exam
          </div>
          <div
            style={{ flex: 1, border: '1px solid #DCD8E6', borderRadius: 8, padding: '10px 0', textAlign: 'center', fontSize: 13, fontWeight: 700, color: '#2A2438', cursor: 'pointer' }}
            onClick={() => flash('PDF download — stubbed in this demo')}
          >
            Download PDF
          </div>
        </div>
      </div>
    </>
  )
}

export function ImpactModal() {
  const { state, set, flash } = useApp()
  if (!state.modal) return null

  const isDup = state.modal === 'duplicate'
  const points = isDup
    ? [
        'The copy gets new question & response IDs.',
        'The original exam and its IDs stay untouched — API integrations keep working.',
        'Edit wording on the copy, test it, then swap location assignments when ready.'
      ]
    : [
        'This exam is assigned to ' + (state.modalLocs || 3) + ' location(s) — unassigning removes patient access immediately.',
        'Location edits never change question or response IDs.',
        'Every change is recorded in the audit log with who and when.'
      ]

  const close = () => set({ modal: null })

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,22,38,0.32)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={close}>
      <div style={{ width: 480, background: '#FFFFFF', borderRadius: 14, boxShadow: '0 24px 64px rgba(26,22,38,0.25)', padding: '24px 26px' }} onClick={(ev) => ev.stopPropagation()}>
        <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>
          {isDup ? 'Duplicate safely — ' : 'Edit locations — '}{state.modalExam}
        </div>
        <div style={{ fontSize: 13, color: '#6E6982', marginBottom: 14 }}>
          {isDup ? 'Creates a new copy; the original stays untouched.' : 'Review the impact before anything changes.'}
        </div>
        <div style={{ background: '#FCF1DC', border: '1px solid #F0DCB2', borderRadius: 10, padding: '13px 15px', marginBottom: 16 }}>
          <div style={{ fontSize: 11.5, fontWeight: 800, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#9A6700', marginBottom: 7 }}>Impact summary</div>
          {points.map((p, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12.5, color: '#5C4A12', lineHeight: 1.55, padding: '2px 0' }}>
              <span style={{ flexShrink: 0 }}>•</span><span>{p}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <div style={{ border: '1px solid #DCD8E6', borderRadius: 8, padding: '9px 16px', fontSize: 13, fontWeight: 700, color: '#2A2438', cursor: 'pointer' }} onClick={close}>Cancel</div>
          <div
            style={{ background: '#4D3D71', borderRadius: 8, padding: '9px 16px', fontSize: 13, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}
            onClick={() => { flash(isDup ? 'Duplicate created — original IDs untouched' : 'Location editor — stubbed in this demo'); close() }}
          >
            {isDup ? 'Create duplicate' : 'Continue to editor'}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Toast() {
  const { state } = useApp()
  if (!state.toast) return null
  return (
    <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#1A1626', color: '#FFFFFF', borderRadius: 10, padding: '11px 18px', fontSize: 13, fontWeight: 600, zIndex: 90, boxShadow: '0 8px 24px rgba(26,22,38,0.3)', whiteSpace: 'nowrap' }}>
      {state.toast}
    </div>
  )
}
