import { useApp } from '../App.jsx'
import { card, pageTitle, MONO } from '../lib/ui.jsx'
import { SearchIcon } from '../components/Icons.jsx'

const ARTICLES = [
  ['Never edit a live exam — duplicate it safely instead', 'Why question IDs matter for your API integration'],
  ['Understanding deferral reasons', 'What providers can share, and how to spot wording problems'],
  ['Quidget setup, end to end', 'Current plugin docs — the legacy widget guide is retired'],
  ['White-labeling without unreadable text', 'How the contrast checker keeps patient steps visible']
]

const PRICING = [
  ['Telehealth consult (all treatments)', 'from $27.99'],
  ['Setup · monthly · platform fees', '$0'],
  ['Declined / incomplete visits', 'not billed']
]

export default function Help() {
  const { flash } = useApp()
  return (
    <div style={{ padding: '26px 28px', maxWidth: 1080 }}>
      <div style={{ ...pageTitle, marginBottom: 18 }}>Help</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, alignItems: 'start' }}>
        <div style={{ ...card, padding: '18px 20px' }}>
          <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 10 }}>Knowledge base</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F4F3F7', borderRadius: 8, padding: '9px 12px', color: '#8B86A0', fontSize: 13, marginBottom: 12 }}>
            <SearchIcon />
            Search articles…
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {ARTICLES.map(([title, sub], i) => (
              <div
                key={title}
                style={{ padding: '10px 0', borderBottom: i < ARTICLES.length - 1 ? '1px solid #F1F0F5' : 'none', cursor: 'pointer' }}
                onClick={() => flash('Article view — stubbed in this demo')}
              >
                <div style={{ fontSize: 13, fontWeight: 700 }}>{title}</div>
                <div style={{ fontSize: 11.5, color: '#8B86A0', marginTop: 2 }}>{sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ ...card, padding: '18px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontSize: 14.5, fontWeight: 800 }}>Ask Qualiphy</span>
              <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.05em', padding: '1px 7px', borderRadius: 5, background: '#EFECF6', color: '#4D3D71' }}>BETA</span>
            </div>
            <div style={{ background: '#F4F3F7', borderRadius: 10, padding: '10px 13px', fontSize: 12.5, color: '#46415A', marginBottom: 8 }}>
              Why did deferrals spike on my Anti-Nausea exam?
            </div>
            <div style={{ background: '#EFECF6', borderRadius: 10, padding: '10px 13px', fontSize: 12.5, color: '#2A2438', lineHeight: 1.55, marginBottom: 12 }}>
              <b>12 of 31</b> exams were deferred this week, and 9 cite <b>Question 4</b>. The wording likely captures patients on unrelated medications — review it in the Exam Library, then duplicate safely to fix.
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1px solid #E4E1EC', borderRadius: 8, padding: '8px 12px', fontSize: 12.5, color: '#8B86A0' }}>
                Ask about your account…
              </div>
              <div style={{ background: '#4D3D71', borderRadius: 8, padding: '8px 16px', fontSize: 12.5, fontWeight: 700, color: '#FFFFFF', cursor: 'pointer' }} onClick={() => flash('Ask Qualiphy — AI helper stub for the demo')}>Ask</div>
            </div>
          </div>

          <div style={{ ...card, padding: '18px 20px' }}>
            <div style={{ fontSize: 14.5, fontWeight: 800, marginBottom: 10 }}>Pricing sheet</div>
            {PRICING.map(([label, price], i) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: i < PRICING.length - 1 ? '1px solid #F1F0F5' : 'none', fontSize: 12.5 }}>
                <span style={{ fontWeight: 600, color: '#46415A' }}>{label}</span>
                <span style={{ fontFamily: MONO, fontWeight: 600 }}>{price}</span>
              </div>
            ))}
            <div style={{ fontSize: 11.5, color: '#8B86A0', marginTop: 8 }}>One surface for pricing — always in sync with Quidget.</div>
          </div>

          <div style={{ ...card, padding: '18px 20px', display: 'flex', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 800 }}>Still stuck?</div>
              <div style={{ fontSize: 12, color: '#8B86A0', marginTop: 2 }}>Real humans, 6 AM – 7 PM PT, every day</div>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ border: '1px solid #DCD8E6', borderRadius: 8, padding: '8px 14px', fontSize: 12.5, fontWeight: 700, color: '#2A2438', cursor: 'pointer' }} onClick={() => flash('Support chat — stubbed in this demo')}>Contact support</div>
          </div>
        </div>
      </div>
    </div>
  )
}
