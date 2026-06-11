import { useApp } from '../App.jsx'
import { EXAMS, EXAM_LIBRARY } from '../data/exams.js'
import { card, pageTitle, th, btnPrimary, subTabStyle, StatusChip, TestBadge, downloadCsv, MONO } from '../lib/ui.jsx'
import { SearchIcon, ChevronDown, InfoIcon, CheckMark } from '../components/Icons.jsx'

const STATUSES = ['All', 'Pending', 'Completed', 'Deferred', 'Expired']

function Activity() {
  const { state, set, flash } = useApp()
  const counts = { All: EXAMS.length }
  STATUSES.slice(1).forEach((s) => { counts[s] = EXAMS.filter((e) => e.status === s).length })

  const q = state.examSearch.trim().toLowerCase()
  const filtered = EXAMS.filter(
    (e) =>
      (state.examTab === 'All' || e.status === state.examTab) &&
      (!q || (e.patient + ' ' + e.exam + ' ' + e.full + ' ' + e.loc).toLowerCase().includes(q))
  )
  const selIds = Object.keys(state.selected).filter((k) => state.selected[k])

  const exportSel = () => {
    const sel = EXAMS.filter((e) => selIds.includes(e.id))
    downloadCsv('exam-selection.csv', sel, ['id', 'patient', 'exam', 'loc', 'status', 'date'])
    flash('Exported ' + sel.length + ' rows — full data, no caps')
  }

  return (
    <div style={{ ...card, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 16px', borderBottom: '1px solid #F1F0F5' }}>
        {STATUSES.map((label) => {
          const active = state.examTab === label
          return (
            <span
              key={label}
              style={{ fontSize: 12.5, fontWeight: 700, padding: '6px 12px', borderRadius: 999, cursor: 'pointer', background: active ? '#4D3D71' : 'transparent', color: active ? '#FFFFFF' : '#5B566B' }}
              onClick={() => set({ examTab: label })}
            >
              {label} <span style={{ opacity: 0.65 }}>{counts[label]}</span>
            </span>
          )
        })}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, border: '1px solid #E4E1EC', borderRadius: 8, padding: '6px 11px' }}>
          <SearchIcon size={13} style={{ color: '#8B86A0' }} />
          <input
            value={state.examSearch}
            onChange={(ev) => set({ examSearch: ev.target.value })}
            placeholder="Search this list"
            style={{ border: 'none', outline: 'none', fontSize: 12.5, fontWeight: 600, color: '#2A2438', width: 130, background: 'transparent' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, border: '1px solid #E4E1EC', borderRadius: 8, padding: '7px 11px', fontSize: 12.5, fontWeight: 600, color: '#5B566B' }}>
          Last 30 days <ChevronDown size={11} />
        </div>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 7, border: '1px dashed #C9C4D6', borderRadius: 8, padding: '7px 11px', fontSize: 12.5, fontWeight: 700, color: '#4D3D71', cursor: 'pointer' }}
          onClick={() => set({ examTab: 'Deferred', examSearch: '' })}
        >
          ★ NA-deferred
        </div>
      </div>

      {selIds.length > 0 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '9px 16px', background: '#EFECF6', borderBottom: '1px solid #E4E1EC', fontSize: 12.5 }}>
          <span style={{ fontWeight: 800, color: '#4D3D71' }}>{selIds.length} selected</span>
          <span style={{ fontWeight: 700, color: '#4D3D71', cursor: 'pointer' }} onClick={() => { flash('Invites resent to ' + selIds.length + ' patient(s)'); set({ selected: {} }) }}>Resend invites</span>
          <span style={{ fontWeight: 700, color: '#4D3D71', cursor: 'pointer' }} onClick={exportSel}>Export selection</span>
          <span style={{ fontWeight: 600, color: '#8B86A0', cursor: 'pointer' }} onClick={() => set({ selected: {} })}>Clear</span>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ width: 42, padding: '10px 0 10px 16px', borderBottom: '1px solid #ECEAF1' }} />
            {['Patient', 'Exam', 'Location', 'Status', 'Submitted', 'Review'].map((h) => (
              <th key={h} style={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filtered.map((e) => {
            const sel = !!state.selected[e.id]
            return (
              <tr
                key={e.id}
                style={{ background: state.openExam === e.id ? '#F7F5FB' : 'transparent', cursor: 'pointer' }}
                onClick={() => set({ openExam: e.id })}
              >
                <td style={{ padding: '12px 0 12px 16px' }} onClick={(ev) => { ev.stopPropagation(); set({ selected: { ...state.selected, [e.id]: !sel } }) }}>
                  <span style={{ display: 'inline-flex', width: 16, height: 16, borderRadius: 4, alignItems: 'center', justifyContent: 'center', background: sel ? '#4D3D71' : 'transparent', border: sel ? '1.5px solid #4D3D71' : '1.5px solid #CFCBDB', cursor: 'pointer' }}>
                    <CheckMark color={sel ? '#FFFFFF' : 'transparent'} />
                  </span>
                </td>
                <td
                  style={{ padding: '12px 14px', fontSize: 13.5, fontWeight: 700, color: '#4D3D71', borderBottom: '1px solid #F1F0F5' }}
                  onClick={(ev) => { ev.stopPropagation(); set({ screen: 'patients', patientId: e.patient }) }}
                >
                  {e.patient}
                </td>
                <td style={{ padding: '12px 14px', borderBottom: '1px solid #F1F0F5' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span style={{ fontSize: 13.5, fontWeight: 700 }}>{e.exam}</span>
                    {e.test && <TestBadge />}
                  </div>
                  <div style={{ fontSize: 11, color: '#8B86A0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 240 }}>{e.full}</div>
                </td>
                <td style={{ padding: '12px 14px', fontSize: 13, color: '#5B566B', borderBottom: '1px solid #F1F0F5' }}>{e.loc}</td>
                <td style={{ padding: '12px 14px', borderBottom: '1px solid #F1F0F5' }}><StatusChip status={e.status} test={e.test} /></td>
                <td style={{ padding: '12px 14px', fontSize: 13, color: '#5B566B', borderBottom: '1px solid #F1F0F5' }}>{e.submitted}</td>
                <td style={{ padding: '12px 14px', fontSize: 13, color: '#5B566B', borderBottom: '1px solid #F1F0F5' }}>{e.review || '—'}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', fontSize: 12.5, color: '#8B86A0', fontWeight: 600 }}>
        <span>Showing {filtered.length} of {EXAMS.length} exams</span>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12 }}>Click a row for detail · click a patient name for history</span>
      </div>
    </div>
  )
}

function Library() {
  const { set } = useApp()
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {EXAM_LIBRARY.map((l) => (
          <div key={l.name} style={{ ...card, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <span style={{ fontSize: 15, fontWeight: 800 }}>{l.name}</span>
              <span
                style={{
                  fontSize: 10.5, fontWeight: 800, letterSpacing: '0.05em', padding: '2px 8px', borderRadius: 5, textTransform: 'uppercase',
                  background: l.mode === 'Live' ? '#E5F6EE' : 'transparent',
                  color: l.mode === 'Live' ? '#0E7A4C' : '#6E6982',
                  border: l.mode === 'Live' ? '1px solid #BFE5D2' : '1px dashed #B9B4C7'
                }}
              >
                {l.mode}
              </span>
              <div style={{ flex: 1 }} />
              <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600 }}>{l.price}</span>
            </div>
            <div style={{ fontSize: 12, color: '#8B86A0', margin: '4px 0 12px' }}>{l.full}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12.5, color: '#5B566B', fontWeight: 600 }}>
              <span>{l.locs} locations assigned</span>
              <span style={{ color: '#C9C4D6' }}>·</span>
              <span>Last changed {l.changed}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <div style={{ border: '1px solid #DCD8E6', borderRadius: 8, padding: '7px 13px', fontSize: 12.5, fontWeight: 700, color: '#2A2438', cursor: 'pointer' }} onClick={() => set({ modal: 'locations', modalExam: l.name, modalLocs: l.locs })}>Edit locations</div>
              <div style={{ border: '1px solid #DCD8E6', borderRadius: 8, padding: '7px 13px', fontSize: 12.5, fontWeight: 700, color: '#2A2438', cursor: 'pointer' }} onClick={() => set({ modal: 'duplicate', modalExam: l.name })}>Duplicate safely</div>
              <div style={{ flex: 1 }} />
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#4D3D71', padding: '7px 0', cursor: 'pointer' }} onClick={() => set({ screen: 'team', teamTab: 'audit' })}>Change history →</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FFFFFF', border: '1px solid #E8E6EE', borderRadius: 10, padding: '11px 16px', marginTop: 14, fontSize: 12.5, color: '#5B566B' }}>
        <InfoIcon />
        Editing a live exam can change question &amp; response IDs used by API integrations. The portal always warns with an impact summary before saving — try "Edit locations" or "Duplicate safely".
      </div>
    </>
  )
}

export default function Exams() {
  const { state, set, flash } = useApp()
  return (
    <div style={{ padding: '26px 28px', maxWidth: 1180 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={pageTitle}>Exams</div>
          <div style={{ display: 'flex', gap: 18, marginTop: 10, fontSize: 13.5, fontWeight: 700 }}>
            <span style={subTabStyle(state.examSub === 'activity')} onClick={() => set({ examSub: 'activity' })}>Activity</span>
            <span style={subTabStyle(state.examSub === 'library')} onClick={() => set({ examSub: 'library' })}>Exam Library</span>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ ...btnPrimary, alignSelf: 'flex-start' }} onClick={() => flash('Send-invite flow — stubbed in this demo')}>Send exam invite</div>
      </div>
      {state.examSub === 'activity' ? <Activity /> : <Library />}
    </div>
  )
}
