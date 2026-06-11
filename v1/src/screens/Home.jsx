import { useApp } from '../App.jsx'
import { card, pageTitle, btnPrimary, btnSecondary, MONO } from '../lib/ui.jsx'
import { PlusIcon, CheckCircle } from '../components/Icons.jsx'
import { EMAIL_ELLIE } from '../data/exams.js'

const kpiLabel = { fontSize: 11.5, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#8B86A0' }
const kpiValue = { fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', margin: '6px 0 4px' }

const SPARK = [
  { h: 10, c: '#DDD9E8' }, { h: 8, c: '#DDD9E8' }, { h: 12, c: '#DDD9E8' }, { h: 9, c: '#DDD9E8' },
  { h: 14, c: '#DDD9E8' }, { h: 24, c: '#E08A8A' }, { h: 34, c: '#C03434' }
]

function AttentionRow({ color, title, desc, action, onClick }) {
  return (
    <div style={{ borderTop: '1px solid #F1F0F5', padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer' }} onClick={onClick}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, marginTop: 6, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13.5, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: '#6E6982', lineHeight: 1.55, marginTop: 2 }}>{desc}</div>
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 700, color: '#4D3D71', whiteSpace: 'nowrap', paddingTop: 2 }}>{action}</div>
    </div>
  )
}

function ActivityRow({ time, children }) {
  return (
    <div style={{ borderTop: '1px solid #F1F0F5', padding: '12px 20px', display: 'flex', gap: 12, alignItems: 'baseline' }}>
      <span style={{ fontFamily: MONO, fontSize: 11, color: '#8B86A0', width: 64, flexShrink: 0 }}>{time}</span>
      <span style={{ fontSize: 13, color: '#2A2438' }}>{children}</span>
    </div>
  )
}

function HealthItem({ done, label, onClick, openColor = '#C9C4D6', openBg = 'transparent' }) {
  if (done) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, fontWeight: 600, color: '#6E6982' }}>
        <CheckCircle />
        {label}
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 12.5, fontWeight: 700, color: '#2A2438', cursor: 'pointer' }} onClick={onClick}>
      <span style={{ width: 15, height: 15, borderRadius: '50%', border: `1.6px solid ${openColor}`, background: openBg, flexShrink: 0 }} />
      {label}
    </div>
  )
}

export default function Home() {
  const { set, go, flash } = useApp()
  const goDeferred = () => set({ screen: 'exams', examSub: 'activity', examTab: 'Deferred' })
  const goPending = () => set({ screen: 'exams', examSub: 'activity', examTab: 'Pending' })
  const goFixPcp = () => set({ screen: 'settings', settingsSection: 'locations' })

  return (
    <div style={{ padding: 28, maxWidth: 1180 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 22 }}>
        <div>
          <div style={pageTitle}>Good morning, Dana</div>
          <div style={{ fontSize: 13, color: '#6E6982', marginTop: 2 }}>Thursday, June 11 · Radiant Wellness</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={btnSecondary} onClick={() => go('reports')}>New report</div>
          <div style={{ ...btnPrimary, display: 'flex', alignItems: 'center', gap: 7 }} onClick={() => flash('Send-invite flow — stubbed in this demo')}>
            <PlusIcon />
            Send exam invite
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 18 }}>
        <div style={{ ...card, padding: 18 }}>
          <div style={kpiLabel}>Exams sent · June</div>
          <div style={kpiValue}>248</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0E7A4C' }}>↑ 12% vs May</div>
        </div>
        <div style={{ ...card, padding: 18 }}>
          <div style={kpiLabel}>Completion rate</div>
          <div style={kpiValue}>86%</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#0E7A4C' }}>↑ 3 pts</div>
        </div>
        <div style={{ ...card, padding: 18 }}>
          <div style={kpiLabel}>Avg approval time</div>
          <div style={kpiValue}>8 min</div>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6E6982' }}>GFE reviews stay fast</div>
        </div>
        <div style={{ ...card, padding: 18 }}>
          <div style={kpiLabel}>Deferral rate</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
            <div>
              <div style={kpiValue}>6.2%</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#C03434' }}>↑ 2.1 pts this week</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 34, marginBottom: 6 }}>
              {SPARK.map((b, i) => (
                <div key={i} style={{ width: 7, height: b.h, borderRadius: 2, background: b.c }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 332px', gap: 18, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ ...card, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14.5, fontWeight: 800 }}>Needs your attention</span>
              <span style={{ fontSize: 11.5, fontWeight: 800, background: '#FDEAEA', color: '#C03434', borderRadius: 999, padding: '2px 8px' }}>3</span>
            </div>
            <AttentionRow
              color="#C03434"
              title={'Deferral spike on "Anti-Nausea Rx"'}
              desc="12 of 31 exams deferred this week — 4× normal. Most providers cite the Question 4 wording."
              action="View deferred →"
              onClick={goDeferred}
            />
            <AttentionRow
              color="#DB8B11"
              title="Scottsdale has no Patient Care Provider assigned"
              desc="Exam invites from this location will fail until one is set."
              action="Fix now →"
              onClick={goFixPcp}
            />
            <AttentionRow
              color="#DB8B11"
              title="5 exam invites pending over 24 hours"
              desc="Patients haven't started — a nudge usually recovers about half."
              action="Review →"
              onClick={goPending}
            />
          </div>

          <div style={{ ...card, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px 12px', fontSize: 14.5, fontWeight: 800 }}>Recent activity</div>
            <ActivityRow time="2h ago"><b>Dr. Chen</b> approved GLP-1 Weight Loss for <b>Marcus Webb</b> · 9 min review</ActivityRow>
            <ActivityRow time="5h ago"><b>Dana W.</b> updated Brand Studio colors · unpublished draft</ActivityRow>
            <ActivityRow time="Yesterday"><b>J. Whitman</b> accepted team invite · Front desk role</ActivityRow>
            <ActivityRow time="Mon 7am">Weekly <b>Deferred / NA report</b> emailed to {EMAIL_ELLIE}</ActivityRow>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ ...card, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 14.5, fontWeight: 800 }}>Account health</span>
              <span style={{ fontFamily: MONO, fontSize: 11.5, fontWeight: 600, color: '#6E6982' }}>4/6</span>
            </div>
            <div style={{ height: 6, borderRadius: 999, background: '#EFEEF3', margin: '8px 0 14px', overflow: 'hidden' }}>
              <div style={{ width: '66%', height: '100%', borderRadius: 999, background: '#4D3D71' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <HealthItem done label="MD / Rx agreement signed" />
              <HealthItem done label="Pharmacy & order-set IDs linked" />
              <HealthItem done label="Webhook endpoint registered" />
              <HealthItem done label="Branding published" />
              <HealthItem label="Patient Care Provider — Scottsdale" onClick={goFixPcp} openColor="#DB8B11" openBg="#FCF1DC" />
              <HealthItem label="Run a test exam end-to-end" onClick={() => go('exams')} />
            </div>
          </div>

          <div style={{ ...card, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14.5, fontWeight: 800 }}>Quidget sync</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#0E7A4C' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0E7A4C' }} />In sync
              </span>
            </div>
            <div style={{ fontSize: 12.5, color: '#6E6982', lineHeight: 1.55, marginTop: 6 }}>
              Portal pricing matches your Quidget storefront. Last checked 12 min ago.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
