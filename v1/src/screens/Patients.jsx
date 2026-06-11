import { useApp } from '../App.jsx'
import { EXAMS } from '../data/exams.js'
import { card, pageTitle, th, btnPrimary, sectionLabel, StatusChip, TestBadge, initials, MONO } from '../lib/ui.jsx'
import { SearchIcon } from '../components/Icons.jsx'

function groupByPatient() {
  const byName = {}
  EXAMS.forEach((e) => { (byName[e.patient] = byName[e.patient] || []).push(e) })
  return byName
}

function Avatar({ name, size = 30, fontSize = 11 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: '#EFECF6', color: '#4D3D71', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize, fontWeight: 800, flexShrink: 0 }}>
      {initials(name)}
    </div>
  )
}

function PatientList({ byName }) {
  const { state, set } = useApp()
  const q = state.patientSearch.trim().toLowerCase()
  const names = Object.keys(byName).filter((n) => !q || n.toLowerCase().includes(q))

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
        <div style={pageTitle}>Patients</div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, border: '1px solid #E4E1EC', background: '#FFFFFF', borderRadius: 8, padding: '7px 11px' }}>
          <SearchIcon size={13} style={{ color: '#8B86A0' }} />
          <input
            value={state.patientSearch}
            onChange={(ev) => set({ patientSearch: ev.target.value })}
            placeholder="Search patients"
            style={{ border: 'none', outline: 'none', fontSize: 12.5, fontWeight: 600, color: '#2A2438', width: 160, background: 'transparent' }}
          />
        </div>
      </div>
      <div style={{ ...card, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...th, padding: '10px 20px' }}>Patient</th>
              <th style={th}>Exams</th>
              <th style={th}>Last activity</th>
              <th style={th}>Latest status</th>
              <th style={th}>Locations</th>
            </tr>
          </thead>
          <tbody>
            {names.map((n) => {
              const xs = byName[n]
              const latest = xs[0]
              return (
                <tr key={n} style={{ cursor: 'pointer' }} onClick={() => set({ patientId: n })}>
                  <td style={{ padding: '11px 20px', borderBottom: '1px solid #F1F0F5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                      <Avatar name={n} />
                      <span style={{ fontSize: 13.5, fontWeight: 700, color: '#4D3D71' }}>{n}</span>
                    </div>
                  </td>
                  <td style={{ padding: '11px 14px', fontSize: 13, color: '#5B566B', borderBottom: '1px solid #F1F0F5' }}>{xs.length}{xs.length === 1 ? ' exam' : ' exams'}</td>
                  <td style={{ padding: '11px 14px', fontSize: 13, color: '#5B566B', borderBottom: '1px solid #F1F0F5' }}>{latest.submitted}</td>
                  <td style={{ padding: '11px 14px', borderBottom: '1px solid #F1F0F5' }}><StatusChip status={latest.status} test={latest.test} /></td>
                  <td style={{ padding: '11px 14px', fontSize: 13, color: '#5B566B', borderBottom: '1px solid #F1F0F5' }}>{[...new Set(xs.map((x) => x.loc))].join(', ')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div style={{ padding: '12px 20px', fontSize: 12.5, color: '#8B86A0', fontWeight: 600 }}>{names.length} patients · one row per patient — exam history inside</div>
      </div>
    </>
  )
}

function PatientDetail({ byName }) {
  const { state, set, flash } = useApp()
  const name = state.patientId
  const xs = byName[name] || []

  return (
    <>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#4D3D71', cursor: 'pointer', marginBottom: 14 }} onClick={() => set({ patientId: null })}>← All patients</div>
      <div style={{ ...card, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
        <Avatar name={name} size={46} fontSize={15} />
        <div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>{name}</div>
          <div style={{ fontSize: 12.5, color: '#6E6982', marginTop: 2 }}>
            {xs.length}{xs.length === 1 ? ' exam' : ' exams'} on file · {[...new Set(xs.map((x) => x.loc))].join(', ')}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ ...btnPrimary, fontSize: 13 }} onClick={() => flash('Send-invite flow — stubbed in this demo')}>Send exam invite</div>
      </div>
      <div style={{ ...sectionLabel, marginBottom: 10 }}>Exam history</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {xs.map((e) => (
          <div key={e.id} style={{ ...card, padding: '15px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <StatusChip status={e.status} test={e.test} />
              <span style={{ fontSize: 13.5, fontWeight: 800 }}>{e.exam}</span>
              {e.test && <TestBadge />}
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: MONO, fontSize: 11.5, color: '#8B86A0' }}>
                {e.date}{e.review ? ' · ' + e.review + ' review' : ''}
              </span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: '#4D3D71', cursor: 'pointer' }} onClick={() => set({ openExam: e.id })}>View exam →</span>
            </div>
            {e.reason && (
              <div style={{ fontSize: 12.5, color: '#6B2222', background: '#FDEAEA', borderRadius: 8, padding: '8px 12px', marginTop: 10 }}>
                <b>Deferral reason:</b> {e.reason}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default function Patients() {
  const { state } = useApp()
  const byName = groupByPatient()
  return (
    <div style={{ padding: '26px 28px', maxWidth: 1080 }}>
      {state.patientId ? <PatientDetail byName={byName} /> : <PatientList byName={byName} />}
    </div>
  )
}
