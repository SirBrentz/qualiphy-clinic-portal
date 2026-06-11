export const MONO = "'IBM Plex Mono', monospace"

const CHIP_COLORS = {
  Completed: ['#E5F6EE', '#0E7A4C', '#0E7A4C'],
  Pending: ['#FCF1DC', '#9A6700', '#DB8B11'],
  Deferred: ['#FDEAEA', '#C03434', '#C03434'],
  Expired: ['#EFEEF3', '#6E6982', '#8B86A0']
}

export function chipStyle(status, test) {
  const c = test ? ['#EFEEF3', '#6E6982', '#8B86A0'] : CHIP_COLORS[status]
  return {
    display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700,
    padding: '3px 10px', borderRadius: 999, background: c[0], color: c[1]
  }
}

export function dotStyle(status, test) {
  const m = { Completed: '#0E7A4C', Pending: '#DB8B11', Deferred: '#C03434', Expired: '#8B86A0' }
  return { width: 6, height: 6, borderRadius: '50%', background: test ? '#8B86A0' : m[status] }
}

export function StatusChip({ status, test }) {
  return (
    <span style={chipStyle(status, test)}>
      <span style={dotStyle(status, test)} />
      {status}
    </span>
  )
}

export function TestBadge() {
  return (
    <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.05em', padding: '1px 7px', borderRadius: 5, border: '1px dashed #B9B4C7', color: '#6E6982' }}>
      TEST
    </span>
  )
}

export function initials(name) {
  return name ? name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase() : ''
}

// WCAG relative luminance + contrast ratio (real math — powers the Brand Studio gate)
export function luminance(hex) {
  const h = (hex || '').replace('#', '')
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return 0
  const c = [0, 2, 4].map((i) => {
    const v = parseInt(h.slice(i, i + 2), 16) / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}

export function contrastRatio(a, b) {
  const l1 = Math.max(luminance(a), luminance(b))
  const l2 = Math.min(luminance(a), luminance(b))
  return (l1 + 0.05) / (l2 + 0.05)
}

export function downloadCsv(name, rows, cols) {
  const esc = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"'
  const txt = [cols.map(esc).join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([txt], { type: 'text/csv' }))
  a.download = name
  a.click()
}

// Common style fragments
export const card = { background: '#FFFFFF', border: '1px solid #E8E6EE', borderRadius: 12 }
export const pageTitle = { fontSize: 21, fontWeight: 800, letterSpacing: '-0.01em' }
export const th = {
  textAlign: 'left', padding: '10px 14px', borderBottom: '1px solid #ECEAF1',
  fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8B86A0'
}
export const sectionLabel = {
  fontSize: 11.5, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8B86A0'
}
export const btnPrimary = {
  background: '#4D3D71', borderRadius: 8, padding: '9px 16px', fontSize: 13.5, fontWeight: 700,
  color: '#FFFFFF', cursor: 'pointer'
}
export const btnSecondary = {
  border: '1px solid #DCD8E6', background: '#FFFFFF', borderRadius: 8, padding: '9px 16px',
  fontSize: 13.5, fontWeight: 700, color: '#2A2438', cursor: 'pointer'
}
export const subTabStyle = (active) => ({
  color: active ? '#4D3D71' : '#8B86A0',
  borderBottom: active ? '2px solid #4D3D71' : '2px solid transparent',
  paddingBottom: 6, cursor: 'pointer'
})
