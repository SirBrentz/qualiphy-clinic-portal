import { useApp } from '../App.jsx'
import { HomeIcon, ExamsIcon, PatientsIcon, ReportsIcon, BrandIcon, IntegrationsIcon, TeamIcon, SettingsIcon, HelpIcon } from './Icons.jsx'
import logo from '../assets/qualiphy-logo.png'

const NAV = [
  ['home', 'Home', HomeIcon],
  ['exams', 'Exams', ExamsIcon],
  ['patients', 'Patients', PatientsIcon],
  ['reports', 'Reports', ReportsIcon],
  ['brand', 'Brand Studio', BrandIcon],
  ['integrations', 'Integrations', IntegrationsIcon],
  ['team', 'Team', TeamIcon],
  ['settings', 'Settings', SettingsIcon],
  ['help', 'Help', HelpIcon]
]

export default function Sidebar() {
  const { state, set, go, flash } = useApp()

  const itemStyle = (key) => {
    const active = state.screen === key
    return {
      display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
      background: active ? '#EFECF6' : 'transparent', color: active ? '#4D3D71' : '#5B566B',
      fontSize: 13.5, fontWeight: active ? 700 : 600
    }
  }

  const navTo = (key) => {
    if (key === 'patients') set({ screen: 'patients', patientId: null, openExam: null, modal: null })
    else go(key)
  }

  return (
    <div style={{ width: 224, flexShrink: 0, background: '#FCFCFD', borderRight: '1px solid #ECEAF1', padding: '18px 12px 16px', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px 16px' }}>
        <img src={logo} alt="Qualiphy" style={{ width: 30, height: 30, borderRadius: 7 }} />
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, letterSpacing: '-0.01em' }}>Qualiphy</div>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: '#8B86A0', letterSpacing: '0.04em' }}>CLINIC PORTAL</div>
        </div>
      </div>
      {NAV.map(([key, label, IconCmp]) => (
        <div key={key} style={itemStyle(key)} onClick={() => navTo(key)}>
          <IconCmp />
          {label}
        </div>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{ background: '#EFECF6', borderRadius: 10, padding: 12, margin: '0 2px' }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: '#4D3D71' }}>Give $250, get $250</div>
        <div style={{ fontSize: 11.5, color: '#6E6982', lineHeight: 1.5, margin: '3px 0 8px' }}>Refer a clinic, both get credit when they go live.</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#4D3D71', cursor: 'pointer' }} onClick={() => flash('Referral link copied')}>Share your link →</div>
      </div>
    </div>
  )
}
