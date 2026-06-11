import { useApp } from '../App.jsx'
import { MEMBERS, AUDIT_LOG } from '../data/exams.js'
import { card, pageTitle, th, btnPrimary, subTabStyle, initials, MONO } from '../lib/ui.jsx'
import { InfoIcon } from '../components/Icons.jsx'

function roleStyle(role) {
  const purple = role === 'Owner'
  const pending = role === 'Invited'
  return {
    fontSize: 11.5, fontWeight: 800, padding: '3px 10px', borderRadius: 999,
    background: purple ? '#EFECF6' : pending ? '#FCF1DC' : '#F4F3F7',
    color: purple ? '#4D3D71' : pending ? '#9A6700' : '#5B566B'
  }
}

export default function Team() {
  const { state, set, flash } = useApp()
  const isMembers = state.teamTab === 'members'

  return (
    <div style={{ padding: '26px 28px', maxWidth: 1080 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 18 }}>
        <div>
          <div style={pageTitle}>Team</div>
          <div style={{ display: 'flex', gap: 18, marginTop: 10, fontSize: 13.5, fontWeight: 700 }}>
            <span style={subTabStyle(isMembers)} onClick={() => set({ teamTab: 'members' })}>Members</span>
            <span style={subTabStyle(!isMembers)} onClick={() => set({ teamTab: 'audit' })}>Audit log</span>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ ...btnPrimary, alignSelf: 'flex-start' }} onClick={() => flash('Invite flow — stubbed in this demo')}>Invite member</div>
      </div>

      {isMembers ? (
        <div style={{ ...card, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ ...th, padding: '10px 20px' }}>Member</th>
                <th style={th}>Role</th>
                <th style={th}>Access</th>
                <th style={th}>Last active</th>
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((m) => (
                <tr key={m.email}>
                  <td style={{ padding: '11px 20px', borderBottom: '1px solid #F1F0F5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                      <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#EFECF6', color: '#4D3D71', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{initials(m.name)}</div>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700 }}>{m.name}</div>
                        <div style={{ fontSize: 11.5, color: '#8B86A0' }}>{m.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '11px 14px', borderBottom: '1px solid #F1F0F5' }}><span style={roleStyle(m.role)}>{m.role}</span></td>
                  <td style={{ padding: '11px 14px', fontSize: 12.5, color: '#5B566B', borderBottom: '1px solid #F1F0F5' }}>{m.access}</td>
                  <td style={{ padding: '11px 14px', fontSize: 12.5, color: '#5B566B', borderBottom: '1px solid #F1F0F5' }}>{m.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '11px 20px', fontSize: 12, color: '#8B86A0' }}>
            <InfoIcon size={13} />
            Roles scope what each member can see — Front desk and Read-only never see API keys or billing.
          </div>
        </div>
      ) : (
        <div style={{ ...card, overflow: 'hidden' }}>
          {AUDIT_LOG.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '13px 20px', borderBottom: '1px solid #F1F0F5', alignItems: 'baseline' }}>
              <span style={{ fontFamily: MONO, fontSize: 11, color: '#8B86A0', width: 92, flexShrink: 0 }}>{a.time}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#2A2438' }}><b>{a.actor}</b> {a.action}</div>
                {a.detail && <div style={{ fontSize: 12, color: '#8B86A0', marginTop: 2 }}>{a.detail}</div>}
              </div>
            </div>
          ))}
          <div style={{ padding: '11px 20px', fontSize: 12, color: '#8B86A0' }}>Every change to exams, locations, branding, keys and team is recorded — nothing is silent.</div>
        </div>
      )}
    </div>
  )
}
