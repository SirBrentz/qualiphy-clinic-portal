import { useApp } from '../App.jsx'
import { EXAMS, EMAIL_HELLO } from '../data/exams.js'
import { card, pageTitle, downloadCsv, MONO } from '../lib/ui.jsx'

const SECTIONS = [
  ['profile', 'Profile'],
  ['locations', 'Locations'],
  ['notifications', 'Notifications'],
  ['billing', 'Billing'],
  ['security', 'Security']
]

const EVENTS = [
  ['completed', 'Exam completed', 'Provider approved or completed a review'],
  ['deferred', 'Exam deferred', 'Includes the deferral reason'],
  ['pending', 'Invite pending 24h', 'Patient has not started the exam'],
  ['report', 'Scheduled report sent', 'Weekly and monthly report deliveries'],
  ['billing', 'Billing events', 'Charges, refunds, payment issues']
]

const CHANNELS = ['email', 'sms', 'app']

const fieldLabel = { fontSize: 11.5, fontWeight: 700, color: '#8B86A0', marginBottom: 3 }
const editLink = { fontSize: 12.5, fontWeight: 700, color: '#4D3D71', cursor: 'pointer' }

function Profile({ flash }) {
  return (
    <div style={{ ...card, padding: '20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontSize: 15, fontWeight: 800 }}>Clinic profile</span>
        <div style={{ flex: 1 }} />
        <span style={editLink} onClick={() => flash('Edit flow — stubbed in this demo')}>Edit</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px 28px', fontSize: 13 }}>
        <div><div style={fieldLabel}>Clinic name</div>Radiant Wellness</div>
        <div><div style={fieldLabel}>Contact email</div>{EMAIL_HELLO}</div>
        <div><div style={fieldLabel}>Phone</div>(480) 555-0142</div>
        <div><div style={fieldLabel}>Timezone</div>America/Phoenix</div>
      </div>
    </div>
  )
}

function Locations({ state, set, flash }) {
  const locs = [
    { name: 'Scottsdale', addr: '7014 E Camelback Rd', pcp: state.pcpFixed ? 'Dr. Morales' : null },
    { name: 'Tempe', addr: '420 S Mill Ave', pcp: 'Dr. Chen' },
    { name: 'Mesa', addr: '1133 W Main St', pcp: 'Dr. Patel' }
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {locs.map((l) => (
        <div key={l.name} style={{ ...card, padding: '16px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 800 }}>{l.name}</span>
            <span style={{ fontSize: 12, color: '#8B86A0' }}>{l.addr}</span>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 999, background: l.pcp ? '#E5F6EE' : '#FDEAEA', color: l.pcp ? '#0E7A4C' : '#C03434' }}>
              {l.pcp ? 'PCP: ' + l.pcp : 'No Patient Care Provider'}
            </span>
            {!l.pcp && (
              <div
                style={{ background: '#4D3D71', borderRadius: 8, padding: '7px 13px', fontSize: 12.5, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }}
                onClick={() => { set({ pcpFixed: true }); flash('Dr. Morales assigned to Scottsdale — invites unblocked') }}
              >
                Assign provider
              </div>
            )}
          </div>
          {!l.pcp && (
            <div style={{ fontSize: 12.5, color: '#6B2222', background: '#FDEAEA', borderRadius: 8, padding: '8px 12px', marginTop: 10 }}>
              Exam invites from this location will fail until a Patient Care Provider is assigned.
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function Notifications({ state, set }) {
  return (
    <div style={{ ...card, padding: '20px 24px' }}>
      <div style={{ fontSize: 15, fontWeight: 800 }}>Notifications</div>
      <div style={{ fontSize: 12.5, color: '#6E6982', margin: '4px 0 16px' }}>Per event, per channel — self-serve, no support ticket needed.</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 70px 70px 70px', gap: '0 8px', alignItems: 'center', paddingBottom: 8, borderBottom: '1px solid #ECEAF1' }}>
        <span />
        {['Email', 'SMS', 'In-app'].map((c) => (
          <span key={c} style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8B86A0', textAlign: 'center' }}>{c}</span>
        ))}
      </div>
      {EVENTS.map(([key, label, desc]) => (
        <div key={key} style={{ display: 'grid', gridTemplateColumns: '1fr 70px 70px 70px', gap: '0 8px', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid #F1F0F5' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{label}</div>
            <div style={{ fontSize: 11.5, color: '#8B86A0' }}>{desc}</div>
          </div>
          {CHANNELS.map((ch) => {
            const k = key + '.' + ch
            const on = !!state.notif[k]
            return (
              <div key={ch} style={{ display: 'flex', justifyContent: 'center' }}>
                <span
                  style={{ display: 'inline-flex', alignItems: 'center', width: 34, height: 20, borderRadius: 999, cursor: 'pointer', background: on ? '#4D3D71' : '#DDD9E8', padding: 2, justifyContent: on ? 'flex-end' : 'flex-start', transition: 'background 0.15s' }}
                  onClick={() => set({ notif: { ...state.notif, [k]: !on } })}
                >
                  <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#FFFFFF', boxShadow: '0 1px 3px rgba(26,22,38,0.25)' }} />
                </span>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

function Billing({ flash }) {
  const exportBilling = () => {
    const rows = EXAMS.filter((e) => e.status === 'Completed' && !e.test)
    downloadCsv('billing-export.csv', rows, ['id', 'patient', 'exam', 'loc', 'date'])
    flash('Billing export downloaded — ' + rows.length + ' rows')
  }
  return (
    <div style={{ ...card, padding: '20px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ fontSize: 15, fontWeight: 800 }}>Billing</span>
        <div style={{ flex: 1 }} />
        <div style={{ border: '1px solid #DCD8E6', borderRadius: 8, padding: '8px 14px', fontSize: 12.5, fontWeight: 700, color: '#2A2438', cursor: 'pointer' }} onClick={exportBilling}>Export billing CSV</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <div style={{ border: '1px solid #ECEAF1', borderRadius: 10, padding: '13px 15px' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: '#8B86A0' }}>June consults</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 3 }}>214</div>
        </div>
        <div style={{ border: '1px solid #ECEAF1', borderRadius: 10, padding: '13px 15px' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: '#8B86A0' }}>June total</div>
          <div style={{ fontSize: 20, fontWeight: 800, marginTop: 3 }}>$5,989.86</div>
        </div>
        <div style={{ border: '1px solid #ECEAF1', borderRadius: 10, padding: '13px 15px' }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: '#8B86A0' }}>Payment method</div>
          <div style={{ fontSize: 13, fontWeight: 700, marginTop: 6, fontFamily: MONO }}>Visa ···· 4412</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: '#8B86A0', marginTop: 12 }}>Test-mode exams are never billed. Declined or incomplete visits are not charged.</div>
    </div>
  )
}

function Security({ flash }) {
  const row = { borderTop: '1px solid #F1F0F5', padding: '13px 24px', display: 'flex', alignItems: 'center' }
  return (
    <div style={{ ...card, overflow: 'hidden' }}>
      <div style={{ padding: '16px 24px', fontSize: 15, fontWeight: 800 }}>Security</div>
      <div style={row}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Password</div>
          <div style={{ fontSize: 11.5, color: '#8B86A0' }}>Last changed Feb 12, 2026</div>
        </div>
        <div style={{ flex: 1 }} />
        <span style={editLink} onClick={() => flash('Edit flow — stubbed in this demo')}>Change</span>
      </div>
      <div style={row}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Two-factor authentication</div>
          <div style={{ fontSize: 11.5, color: '#8B86A0' }}>Authenticator app · enabled</div>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12, fontWeight: 800, color: '#0E7A4C' }}>On</span>
      </div>
      <div style={row}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>Active sessions</div>
          <div style={{ fontSize: 11.5, color: '#8B86A0' }}>2 devices · Phoenix, AZ</div>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ fontSize: 12.5, fontWeight: 700, color: '#C03434', cursor: 'pointer' }} onClick={() => flash('Signed out of other sessions')}>Sign out everywhere</span>
      </div>
    </div>
  )
}

export default function Settings() {
  const { state, set, flash } = useApp()
  const sec = state.settingsSection

  return (
    <div style={{ padding: '26px 28px', maxWidth: 1080, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24, alignItems: 'start' }}>
      <div>
        <div style={{ ...pageTitle, marginBottom: 16 }}>Settings</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {SECTIONS.map(([key, label]) => (
            <div
              key={key}
              style={{
                padding: '8px 12px', borderRadius: 8, fontSize: 13.5, cursor: 'pointer',
                fontWeight: sec === key ? 700 : 600,
                background: sec === key ? '#EFECF6' : 'transparent',
                color: sec === key ? '#4D3D71' : '#5B566B'
              }}
              onClick={() => set({ settingsSection: key })}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <div>
        {sec === 'profile' && <Profile flash={flash} />}
        {sec === 'locations' && <Locations state={state} set={set} flash={flash} />}
        {sec === 'notifications' && <Notifications state={state} set={set} />}
        {sec === 'billing' && <Billing flash={flash} />}
        {sec === 'security' && <Security flash={flash} />}
      </div>
    </div>
  )
}
