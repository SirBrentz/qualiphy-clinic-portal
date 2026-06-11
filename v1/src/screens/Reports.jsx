import { useApp } from '../App.jsx'
import { EXAMS, REPORT_TEMPLATES, EMAIL_ELLIE } from '../data/exams.js'
import { card, pageTitle, downloadCsv, MONO } from '../lib/ui.jsx'
import { InfoIcon } from '../components/Icons.jsx'

const railLabel = { fontSize: 11, fontWeight: 800, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#8B86A0', marginBottom: 8 }

export default function Reports() {
  const { state, set, flash } = useApp()
  const cur = REPORT_TEMPLATES[state.reportTpl]
  const matched = EXAMS.filter(cur.match)
  const rows = matched.filter((e) => !e.test)
  const excluded = matched.length - rows.length

  const exportReport = () => {
    downloadCsv(state.reportTpl + '-report.csv', rows, cur.csvCols)
    flash('Exported ' + rows.length + ' rows — full data, no caps')
  }

  return (
    <div style={{ padding: '26px 28px', maxWidth: 1180, display: 'grid', gridTemplateColumns: '248px 1fr', gap: 20, alignItems: 'start' }}>
      <div>
        <div style={{ ...pageTitle, marginBottom: 16 }}>Reports</div>
        <div style={railLabel}>Templates</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 22 }}>
          {Object.entries(REPORT_TEMPLATES).map(([key, tpl]) => {
            const active = state.reportTpl === key
            return (
              <div
                key={key}
                style={{ background: '#FFFFFF', borderRadius: 10, padding: '11px 13px', cursor: 'pointer', border: active ? '1.5px solid #4D3D71' : '1px solid #E8E6EE' }}
                onClick={() => set({ reportTpl: key })}
              >
                <div style={{ fontSize: 13, fontWeight: active ? 800 : 700, color: active ? '#4D3D71' : '#1A1626' }}>{tpl.name}</div>
                <div style={{ fontSize: 11.5, color: '#6E6982', marginTop: 2 }}>{tpl.desc}</div>
              </div>
            )
          })}
          <div
            style={{ border: '1px dashed #C9C4D6', borderRadius: 10, padding: '11px 13px', fontSize: 13, fontWeight: 700, color: '#4D3D71', cursor: 'pointer' }}
            onClick={() => flash('Blank report builder — stubbed in this demo')}
          >
            + Blank report
          </div>
        </div>
        <div style={railLabel}>Scheduled</div>
        <div style={{ background: '#FFFFFF', border: '1px solid #E8E6EE', borderRadius: 10, padding: '11px 13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0E7A4C' }} />
            <span style={{ fontSize: 12.5, fontWeight: 700 }}>Weekly Deferred / NA</span>
          </div>
          <div style={{ fontSize: 11.5, color: '#6E6982', marginTop: 3, lineHeight: 1.5 }}>Mondays 7:00 AM → {EMAIL_ELLIE}</div>
        </div>
      </div>

      <div style={{ ...card, overflow: 'hidden' }}>
        <div style={{ padding: '18px 22px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 800 }}>{cur.name}</div>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#8B86A0' }}>Draft · unsaved</span>
          </div>
          <div style={{ display: 'flex', gap: 28, marginTop: 18 }}>
            <div style={{ flex: 1 }}>
              <div style={railLabel}>1 · Filters</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cur.filters.map((f) => (
                  <span key={f} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 700, border: '1px solid #DCD8E6', borderRadius: 8, padding: '6px 11px' }}>{f}</span>
                ))}
                <span style={{ display: 'inline-flex', alignItems: 'center', fontSize: 12.5, fontWeight: 700, border: '1px dashed #C9C4D6', borderRadius: 8, padding: '6px 11px', color: '#4D3D71' }}>+ Add filter</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={railLabel}>2 · Columns</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {cur.cols.map((c) => (
                  <span key={c} style={{ fontSize: 12, fontWeight: 700, background: '#EFECF6', color: '#4D3D71', borderRadius: 999, padding: '5px 11px' }}>{c} ✕</span>
                ))}
                <span style={{ fontSize: 12, fontWeight: 700, border: '1px dashed #C9C4D6', color: '#4D3D71', borderRadius: 999, padding: '5px 11px' }}>+ Add column</span>
              </div>
            </div>
          </div>
          <div style={{ ...railLabel, margin: '22px 0 8px' }}>3 · Preview</div>
        </div>

        <div style={{ margin: '0 22px', border: '1px solid #ECEAF1', borderRadius: 10, overflow: 'hidden' }}>
          {excluded > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F4F3F7', padding: '8px 14px', fontSize: 12, fontWeight: 600, color: '#5B566B' }}>
              <InfoIcon size={13} />
              {excluded} test-mode exam{excluded === 1 ? '' : 's'} matched your filters and are excluded from this report.
            </div>
          )}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {cur.cols.map((c) => (
                  <th key={c} style={{ textAlign: 'left', padding: '9px 14px', borderBottom: '1px solid #ECEAF1', borderTop: '1px solid #ECEAF1', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8B86A0' }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 5).map((e) => (
                <tr key={e.id}>
                  {cur.cells(e).map((c, i) => (
                    <td key={i} style={{ padding: '10px 14px', fontSize: 12.5, color: '#46415A', borderBottom: '1px solid #F1F0F5' }}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 22px 18px' }}>
          <span style={{ fontFamily: MONO, fontSize: 12.5, fontWeight: 600, color: '#2A2438' }}>{rows.length} rows match</span>
          <span style={{ fontSize: 12, color: '#0E7A4C', fontWeight: 700 }}>Full export — no row caps</span>
          <div style={{ flex: 1 }} />
          <div
            style={{ border: '1px solid #DCD8E6', borderRadius: 8, padding: '9px 15px', fontSize: 13, fontWeight: 700, color: '#2A2438', cursor: 'pointer' }}
            onClick={() => flash('Scheduled: weekly, Mondays 7:00 AM → ' + EMAIL_ELLIE)}
          >
            Schedule weekly email
          </div>
          <div style={{ background: '#4D3D71', borderRadius: 8, padding: '9px 15px', fontSize: 13, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }} onClick={exportReport}>Export CSV</div>
        </div>
      </div>
    </div>
  )
}
