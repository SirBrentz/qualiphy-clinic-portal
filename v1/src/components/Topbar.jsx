import { useApp } from '../App.jsx'
import { BuildingIcon, ChevronDown, SearchIcon, BellIcon } from './Icons.jsx'
import { MONO } from '../lib/ui.jsx'

export default function Topbar() {
  const { flash } = useApp()
  return (
    <div style={{ height: 60, flexShrink: 0, background: '#FFFFFF', borderBottom: '1px solid #ECEAF1', display: 'flex', alignItems: 'center', gap: 14, padding: '0 24px' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #E4E1EC', borderRadius: 8, padding: '7px 12px', fontSize: 13, fontWeight: 700, color: '#2A2438', cursor: 'pointer' }}
        onClick={() => flash('Location switcher — stubbed in this demo')}
      >
        <BuildingIcon />
        Radiant Wellness · All locations
        <ChevronDown />
      </div>
      <div style={{ flex: 1, maxWidth: 400, display: 'flex', alignItems: 'center', gap: 8, background: '#F4F3F7', borderRadius: 8, padding: '8px 12px', color: '#8B86A0', fontSize: 13, fontWeight: 500 }}>
        <SearchIcon />
        <span style={{ flex: 1 }}>Search patients, exams…</span>
        <span style={{ fontFamily: MONO, fontSize: 11, background: '#FFFFFF', border: '1px solid #E4E1EC', borderRadius: 5, padding: '1px 6px' }}>⌘K</span>
      </div>
      <div style={{ flex: 1 }} />
      <div
        style={{ position: 'relative', width: 34, height: 34, border: '1px solid #E4E1EC', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5B566B', cursor: 'pointer' }}
        onClick={() => flash('Notification center — stubbed in this demo')}
      >
        <BellIcon />
        <span style={{ position: 'absolute', top: 6, right: 7, width: 7, height: 7, borderRadius: '50%', background: '#C03434', border: '1.5px solid #FFFFFF' }} />
      </div>
      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4D3D71', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800 }}>DW</div>
    </div>
  )
}
