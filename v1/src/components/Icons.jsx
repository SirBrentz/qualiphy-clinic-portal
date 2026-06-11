const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

const Icon = ({ size = 16, children, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...rest}>
    {children}
  </svg>
)

export const HomeIcon = (p) => (
  <Icon {...p}><path d="M3 10.5L12 3l9 7.5" /><path d="M5 9v12h14V9" /></Icon>
)
export const ExamsIcon = (p) => (
  <Icon {...p}><rect x="5" y="5" width="14" height="16" rx="2" /><path d="M9 5a3 3 0 0 1 6 0" /><path d="M9 11h6" /><path d="M9 15h4" /></Icon>
)
export const PatientsIcon = (p) => (
  <Icon {...p}><circle cx="9" cy="8" r="3.5" /><path d="M3.5 20c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><circle cx="17" cy="9" r="2.5" /><path d="M16.5 15.2c2.4.4 4 2 4 4.3" /></Icon>
)
export const ReportsIcon = (p) => (
  <Icon {...p}><path d="M4 20h16" /><path d="M7 20v-6" /><path d="M12 20V8" /><path d="M17 20v-10" /></Icon>
)
export const BrandIcon = (p) => (
  <Icon {...p}><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" /></Icon>
)
export const IntegrationsIcon = (p) => (
  <Icon {...p}><path d="M9 7V3" /><path d="M15 7V3" /><path d="M6 7h12v4a6 6 0 0 1-12 0V7z" /><path d="M12 17v4" /></Icon>
)
export const TeamIcon = (p) => (
  <Icon {...p}><circle cx="12" cy="7" r="3" /><path d="M5 21c0-3.5 3-6 7-6s7 2.5 7 6" /></Icon>
)
export const SettingsIcon = (p) => (
  <Icon {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v3" /><path d="M12 19v3" /><path d="M2 12h3" /><path d="M19 12h3" /><path d="M4.9 4.9l2.2 2.2" /><path d="M16.9 16.9l2.2 2.2" /><path d="M19.1 4.9L16.9 7.1" /><path d="M7.1 16.9l-2.2 2.2" /></Icon>
)
export const HelpIcon = (p) => (
  <Icon {...p}><circle cx="12" cy="12" r="9" /><path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.4c-.8.3-1 .9-1 1.7" /><path d="M12 16.8h.01" /></Icon>
)
export const SearchIcon = ({ size = 14, ...rest }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...rest}>
    <circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" />
  </svg>
)
export const BellIcon = (p) => (
  <Icon {...p}><path d="M18 9a6 6 0 1 0-12 0c0 7-2 8-2 8h16s-2-1-2-8" /><path d="M10.3 20a2 2 0 0 0 3.4 0" /></Icon>
)
export const BuildingIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#4D3D71" strokeWidth="1.8" strokeLinecap="round">
    <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" /><path d="M16 9h3a1 1 0 0 1 1 1v11" /><path d="M4 21h17" /><path d="M8 7h4" /><path d="M8 11h4" /><path d="M8 15h4" />
  </svg>
)
export const ChevronDown = ({ size = 12, stroke = '#8B86A0' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9l6 6 6-6" />
  </svg>
)
export const PlusIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
    <path d="M12 5v14" /><path d="M5 12h14" />
  </svg>
)
export const InfoIcon = ({ size = 14, stroke = '#8B86A0' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><path d="M12 8v4" /><path d="M12 16h.01" />
  </svg>
)
export const CheckCircle = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#0E7A4C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" stroke="#BFE5D2" fill="#E5F6EE" /><path d="M8.5 12.5l2.5 2.5 4.5-5" />
  </svg>
)
export const CheckMark = ({ color }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4 10-11" />
  </svg>
)
