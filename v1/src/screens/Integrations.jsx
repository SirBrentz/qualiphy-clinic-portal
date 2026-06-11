import { useApp } from '../App.jsx'
import { WEBHOOK_LOG } from '../data/exams.js'
import { card, pageTitle, MONO } from '../lib/ui.jsx'
import logo from '../assets/qualiphy-logo.png'

const innerBox = { border: '1px solid #ECEAF1', borderRadius: 10, padding: '12px 14px' }
const linkBtn = { fontSize: 12, fontWeight: 700, color: '#4D3D71', cursor: 'pointer' }
const whTh = { textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #ECEAF1', fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8B86A0' }

export default function Integrations() {
  const { state, set, flash } = useApp()
  const whLog = state.webhookLog || WEBHOOK_LOG

  const testFire = () => {
    set({ webhookLog: [{ time: 'Just now', event: 'ping.test · manual', code: '200 OK' }, ...whLog] })
    flash('Test event delivered — 200 OK in 142ms')
  }

  return (
    <div style={{ padding: '26px 28px', maxWidth: 1080 }}>
      <div style={{ ...pageTitle, marginBottom: 18 }}>Integrations</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
        <div style={{ ...card, padding: '18px 20px' }}>
          <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 12 }}>API keys</div>
          <div style={{ ...innerBox, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12.5, fontWeight: 700 }}>Production</span>
              <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.05em', padding: '1px 7px', borderRadius: 5, background: '#E5F6EE', color: '#0E7A4C' }}>ACTIVE</span>
              <div style={{ flex: 1 }} />
              <span style={linkBtn} onClick={() => set({ keyRevealed: !state.keyRevealed })}>{state.keyRevealed ? 'Hide' : 'Reveal'}</span>
              <span style={linkBtn} onClick={() => flash('Key copied to clipboard')}>Copy</span>
              <span style={{ ...linkBtn, color: '#C03434' }} onClick={() => flash('Rotate requires confirmation — breaking change for integrations (stubbed)')}>Rotate</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 12, color: '#5B566B', marginTop: 7 }}>
              {state.keyRevealed ? 'qphy_live_8f2Kd91mNQv64XzpA7Rt3BwL' : 'qphy_live_••••••••••••••••••••3BwL'}
            </div>
            <div style={{ fontSize: 11.5, color: '#8B86A0', marginTop: 5 }}>Scope: all locations · created Mar 2, 2026</div>
          </div>
          <div style={innerBox}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12.5, fontWeight: 700 }}>Sandbox</span>
              <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.05em', padding: '1px 7px', borderRadius: 5, border: '1px dashed #B9B4C7', color: '#6E6982' }}>TEST</span>
              <div style={{ flex: 1 }} />
              <span style={linkBtn} onClick={() => flash('Key copied to clipboard')}>Copy</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 12, color: '#5B566B', marginTop: 7 }}>qphy_test_••••••••••••••••••••3k9d</div>
            <div style={{ fontSize: 11.5, color: '#8B86A0', marginTop: 5 }}>Excluded from results &amp; billing · safe for integration testing</div>
          </div>
        </div>

        <div style={{ ...card, padding: '18px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14.5, fontWeight: 800 }}>Connected apps</span>
          </div>
          <div style={{ ...innerBox, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={logo} alt="Quidget" style={{ width: 26, height: 26, borderRadius: 6 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700 }}>Quidget · WooCommerce</div>
              <div style={{ fontSize: 11.5, color: '#8B86A0' }}>v2.4.1 · pricing in sync · 3 products mapped</div>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#0E7A4C' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0E7A4C' }} />Connected
            </span>
            <span style={linkBtn} onClick={() => flash('Quidget setup wizard — stubbed in this demo')}>Setup wizard</span>
          </div>
          <div style={{ border: '1px dashed #DCD8E6', borderRadius: 10, padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: '#F4F3F7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#8B86A0' }}>IQ</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700 }}>IntakeQ EMR</div>
              <div style={{ fontSize: 11.5, color: '#8B86A0' }}>Sync exam results into patient charts</div>
            </div>
            <span style={linkBtn} onClick={() => flash('IntakeQ connection flow — stubbed in this demo')}>Connect</span>
          </div>
        </div>

        <div style={{ ...card, padding: '18px 20px', gridColumn: '1 / -1' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 14.5, fontWeight: 800 }}>Webhooks</span>
            <span style={{ fontFamily: MONO, fontSize: 11.5, color: '#8B86A0', marginLeft: 10 }}>https://radiantwellness.com/api/qualiphy-hook</span>
            <span style={{ marginLeft: 10, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#0E7A4C' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0E7A4C' }} />Active
            </span>
            <div style={{ flex: 1 }} />
            <div style={{ border: '1px solid #DCD8E6', borderRadius: 8, padding: '7px 13px', fontSize: 12.5, fontWeight: 700, color: '#2A2438', cursor: 'pointer' }} onClick={testFire}>Send test event</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={whTh}>Time</th>
                <th style={whTh}>Event</th>
                <th style={whTh}>Delivery</th>
              </tr>
            </thead>
            <tbody>
              {whLog.map((w, i) => (
                <tr key={i}>
                  <td style={{ padding: '9px 12px', fontFamily: MONO, fontSize: 11.5, color: '#8B86A0', borderBottom: '1px solid #F1F0F5' }}>{w.time}</td>
                  <td style={{ padding: '9px 12px', fontFamily: MONO, fontSize: 12, color: '#2A2438', borderBottom: '1px solid #F1F0F5' }}>{w.event}</td>
                  <td style={{ padding: '9px 12px', borderBottom: '1px solid #F1F0F5' }}><span style={{ fontSize: 11.5, fontWeight: 700, color: '#0E7A4C' }}>{w.code}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
