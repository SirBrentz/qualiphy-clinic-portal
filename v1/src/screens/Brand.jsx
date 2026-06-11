import { useApp } from '../App.jsx'
import { BRAND_PRESETS } from '../data/exams.js'
import { contrastRatio, MONO } from '../lib/ui.jsx'

const swatch = (c) => ({ width: 22, height: 22, borderRadius: 6, background: c, border: '1px solid #E4E1EC', flexShrink: 0 })
const fieldLabel = { fontSize: 12, fontWeight: 700, color: '#5B566B', marginBottom: 6 }
const hexInput = { fontFamily: MONO, fontSize: 12.5, fontWeight: 600, border: 'none', outline: 'none', width: 90, background: 'transparent', color: '#1A1626' }

function ColorField({ label, value, onChange, swatchColor, right, style }) {
  return (
    <>
      <div style={fieldLabel}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, border: '1px solid #E4E1EC', borderRadius: 9, padding: '9px 12px', marginBottom: 14, ...style }}>
        <span style={swatch(swatchColor)} />
        <input value={value} onChange={onChange} style={hexInput} />
        <div style={{ flex: 1 }} />
        {right}
      </div>
    </>
  )
}

export default function Brand() {
  const { state, set, flash } = useApp()
  const b = state.brand
  const r = contrastRatio(b.text, b.bg)
  const fail = r < 4.5
  const mob = b.device === 'mobile'

  const setB = (patch) => set({ brand: { ...b, ...patch, published: false } })
  const segBtn = (on) => ({ fontSize: 12, fontWeight: on ? 700 : 600, padding: '5px 12px', borderRadius: 6, cursor: 'pointer', background: on ? '#EFECF6' : 'transparent', color: on ? '#4D3D71' : '#6E6982' })

  const publishState = fail ? 'Publishing blocked — fix contrast' : b.published ? 'Published' : 'Unpublished changes'
  const publishColor = fail ? '#C03434' : b.published ? '#0E7A4C' : '#9A6700'
  const publishDot = fail ? '#C03434' : b.published ? '#0E7A4C' : '#DB8B11'

  const publish = () => {
    if (fail) { flash('Blocked: fix the unreadable text color first'); return }
    set({ brand: { ...b, published: true } })
    flash('Branding published to all patient touchpoints')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #ECEAF1', display: 'flex', alignItems: 'center', gap: 14, padding: '14px 24px' }}>
        <div style={{ fontSize: 16, fontWeight: 800 }}>Brand Studio</div>
        <div style={{ flex: 1 }} />
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 700, color: publishColor }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: publishDot }} />
          {publishState}
        </span>
        <div
          style={{ border: '1px solid #DCD8E6', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 700, color: '#2A2438', cursor: 'pointer' }}
          onClick={() => { setB({ primary: '#3E7C6F', bg: '#FFFFFF', text: '#21302C' }); flash('Draft discarded — reverted to last published theme') }}
        >
          Discard
        </div>
        <div
          style={{ background: '#4D3D71', borderRadius: 8, padding: '8px 14px', fontSize: 13, fontWeight: 700, color: '#FFFFFF', cursor: fail ? 'not-allowed' : 'pointer', opacity: fail ? 0.45 : 1 }}
          onClick={publish}
        >
          Publish
        </div>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '332px 1fr' }}>
        <div style={{ borderRight: '1px solid #ECEAF1', background: '#FFFFFF', padding: '20px 22px' }}>
          <div style={{ display: 'flex', gap: 4, background: '#F4F3F7', borderRadius: 9, padding: 4, marginBottom: 22 }}>
            <span style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 700, padding: '6px 0', borderRadius: 6, background: '#FFFFFF', boxShadow: '0 1px 3px rgba(26,22,38,0.1)' }}>Colors</span>
            <span style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 600, padding: '6px 0', color: '#6E6982' }}>Logo</span>
            <span style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 600, padding: '6px 0', color: '#6E6982' }}>Type</span>
            <span style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 600, padding: '6px 0', color: '#6E6982' }}>Layout</span>
          </div>

          <ColorField
            label="Primary color"
            value={b.primary}
            onChange={(ev) => setB({ primary: ev.target.value })}
            swatchColor={b.primary}
            right={<span style={{ fontSize: 11.5, fontWeight: 700, color: '#0E7A4C' }}>AA ✓</span>}
          />
          <ColorField label="Background" value={b.bg} onChange={(ev) => setB({ bg: ev.target.value })} swatchColor={b.bg} />
          <ColorField
            label="Text color"
            value={b.text}
            onChange={(ev) => setB({ text: ev.target.value })}
            swatchColor={b.text}
            right={<span style={{ fontSize: 11.5, fontWeight: 800, color: fail ? '#C03434' : '#0E7A4C' }}>{fail ? 'Fails ✕' : 'AA ✓'}</span>}
            style={fail ? { border: '1.5px solid #C03434', background: '#FFF8F8', marginBottom: 0 } : undefined}
          />
          {fail && (
            <div style={{ fontSize: 12, color: '#6B2222', lineHeight: 1.55, background: '#FDEAEA', borderRadius: '0 0 9px 9px', margin: '0 6px 14px', padding: '9px 12px' }}>
              <b>Unreadable:</b> contrast is {r.toFixed(1)}:1 — patients won't see their exam steps. Publishing is blocked.
              <div style={{ fontWeight: 800, color: '#C03434', marginTop: 5, cursor: 'pointer' }} onClick={() => setB({ text: '#2A2438' })}>Fix automatically → #2A2438</div>
            </div>
          )}

          <div style={{ ...fieldLabel, margin: '18px 0 8px' }}>Theme presets</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            {BRAND_PRESETS.map((pr) => (
              <div key={pr.name} style={{ border: '1px solid #E4E1EC', borderRadius: 9, padding: 9, cursor: 'pointer' }} onClick={() => setB({ primary: pr.p, bg: pr.g, text: pr.t })}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
                  <span style={{ width: 14, height: 14, borderRadius: 4, background: pr.p }} />
                  <span style={{ width: 14, height: 14, borderRadius: 4, background: pr.g, border: '1px solid #E4E1EC' }} />
                  <span style={{ width: 14, height: 14, borderRadius: 4, background: pr.t }} />
                </div>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: '#5B566B' }}>{pr.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, fontWeight: 700, color: '#5B566B' }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0E7A4C' }} />
              Live preview — patient exam view, updates as you type
            </span>
            <div style={{ flex: 1 }} />
            <div style={{ display: 'flex', gap: 4, background: '#FFFFFF', border: '1px solid #E4E1EC', borderRadius: 9, padding: 4 }}>
              <span style={segBtn(!mob)} onClick={() => setB({ device: 'desktop' })}>Desktop</span>
              <span style={segBtn(mob)} onClick={() => setB({ device: 'mobile' })}>Mobile</span>
            </div>
          </div>

          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F1F0F4', borderRadius: 14, padding: 28 }}>
            <div style={{ width: mob ? 308 : 540, background: '#FFFFFF', borderRadius: mob ? 26 : 14, border: '1px solid #E4E1EC', boxShadow: '0 12px 40px rgba(26,22,38,0.14)', overflow: 'hidden' }}>
              <div style={{ background: b.primary, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 9 }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: 11, fontWeight: 800 }}>R</span>
                <span style={{ color: '#FFFFFF', fontSize: 13.5, fontWeight: 700 }}>Radiant Wellness</span>
              </div>
              <div style={{ height: 4, background: '#EFEEF3' }}>
                <div style={{ width: '75%', height: '100%', background: b.primary }} />
              </div>
              <div style={{ padding: '20px 20px 24px', background: b.bg }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#8B86A0', marginBottom: 10 }}>Step 6 of 8</div>
                <div style={fail ? { position: 'relative', border: '1.5px dashed #C03434', borderRadius: 8, padding: '10px 12px', marginBottom: 14 } : { position: 'relative', padding: '0 0 14px' }}>
                  <div style={{ fontSize: 15, fontWeight: 800, color: b.text }}>Medical history</div>
                  <div style={{ fontSize: 12, color: b.text, marginTop: 3, opacity: 0.85 }}>Do you currently take any of the following medications?</div>
                  {fail && (
                    <span style={{ position: 'absolute', top: -9, right: 10, background: '#C03434', color: '#FFFFFF', fontSize: 9.5, fontWeight: 800, letterSpacing: '0.05em', padding: '2px 8px', borderRadius: 999 }}>UNREADABLE TEXT</span>
                  )}
                </div>
                {['Blood thinners', 'SSRIs / antidepressants'].map((opt, i) => (
                  <div key={opt} style={{ border: '1px solid #E4E1EC', borderRadius: 9, padding: '11px 13px', marginBottom: i === 0 ? 8 : 16, display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span style={{ width: 15, height: 15, borderRadius: '50%', border: '1.5px solid #C9C4D6', flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: b.text }}>{opt}</span>
                  </div>
                ))}
                <div style={{ background: b.primary, borderRadius: 9, padding: '12px 0', textAlign: 'center', color: '#FFFFFF', fontSize: 13.5, fontWeight: 700 }}>Continue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
