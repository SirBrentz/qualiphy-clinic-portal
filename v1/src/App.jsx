import { createContext, useContext, useRef, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Topbar from './components/Topbar.jsx'
import { SlideOver, ImpactModal, Toast } from './components/Overlays.jsx'
import Home from './screens/Home.jsx'
import Exams from './screens/Exams.jsx'
import Patients from './screens/Patients.jsx'
import Reports from './screens/Reports.jsx'
import Brand from './screens/Brand.jsx'
import Integrations from './screens/Integrations.jsx'
import Team from './screens/Team.jsx'
import Settings from './screens/Settings.jsx'
import Help from './screens/Help.jsx'

const AppContext = createContext(null)
export const useApp = () => useContext(AppContext)

const HASH_SCREEN = (window.location.hash || '').replace('#', '')

const INITIAL = {
  screen: ['home', 'exams', 'patients', 'reports', 'brand', 'integrations', 'team', 'settings', 'help'].includes(HASH_SCREEN) ? HASH_SCREEN : 'home',
  examTab: 'All', examSub: 'activity', examSearch: '', selected: {}, openExam: null,
  patientId: null, patientSearch: '',
  reportTpl: 'deferred',
  // Ships intentionally broken (white-on-white) so the demo opens on the contrast-bug story
  brand: { primary: '#3E7C6F', bg: '#FFFFFF', text: '#FFFFFF', device: 'mobile', published: false },
  modal: null, modalExam: null, modalLocs: null,
  teamTab: 'members',
  settingsSection: 'notifications',
  notif: {
    'completed.email': true, 'completed.sms': false, 'completed.app': true,
    'deferred.email': true, 'deferred.sms': true, 'deferred.app': true,
    'pending.email': false, 'pending.sms': false, 'pending.app': true,
    'report.email': true, 'report.sms': false, 'report.app': false,
    'billing.email': true, 'billing.sms': false, 'billing.app': true
  },
  keyRevealed: false,
  webhookLog: null,
  pcpFixed: false,
  toast: null
}

const SCREENS = {
  home: Home, exams: Exams, patients: Patients, reports: Reports, brand: Brand,
  integrations: Integrations, team: Team, settings: Settings, help: Help
}

export default function App() {
  const [state, setState] = useState(INITIAL)
  const toastTimer = useRef(null)

  const set = (patch) => setState((prev) => ({ ...prev, ...patch }))
  const go = (screen, extra = {}) => set({ screen, openExam: null, modal: null, ...extra })
  const flash = (msg) => {
    clearTimeout(toastTimer.current)
    setState((prev) => ({ ...prev, toast: msg }))
    toastTimer.current = setTimeout(() => setState((prev) => ({ ...prev, toast: null })), 2600)
  }

  const app = { state, set, go, flash }
  const Screen = SCREENS[state.screen]

  return (
    <AppContext.Provider value={app}>
      <div style={{ fontFamily: "'Manrope', sans-serif", color: '#1A1626', display: 'flex', height: '100vh', overflow: 'hidden', background: '#FAFAFB' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <Topbar />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Screen />
          </div>
        </div>
        <SlideOver />
        <ImpactModal />
        <Toast />
      </div>
    </AppContext.Provider>
  )
}
