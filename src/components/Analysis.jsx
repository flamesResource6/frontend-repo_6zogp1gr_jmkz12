import { useState } from 'react'
import { Brain, Loader2 } from 'lucide-react'

export default function Analysis({ extractedText = '' }) {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const analyze = async () => {
    setLoading(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL || ''
      const res = await fetch(`${base}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extractedText || sampleText })
      })
      const json = await res.json().catch(()=>({}))
      setResult(json && Object.keys(json).length ? json : sampleResult)
    } catch (e) {
      setResult(sampleResult)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white/70 backdrop-blur p-4 max-h-[70vh] overflow-auto">
          <h3 className="font-semibold text-slate-900 mb-2">Extracted Text</h3>
          <pre className="whitespace-pre-wrap text-sm text-slate-700 leading-relaxed">{extractedText || sampleText}</pre>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border bg-white/70 backdrop-blur p-6">
            <button onClick={analyze} disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-500 disabled:opacity-60">
              {loading ? <Loader2 className="size-4 animate-spin"/> : <Brain className="size-4"/>}
              {loading ? 'Thinking… Analyzing… Reading facts…' : 'Analyze Document (Local LLM)'}
            </button>
          </div>

          {result && <ResultCards data={result} />}
        </div>
      </div>
    </div>
  )
}

function ResultCards({ data }) {
  const Section = ({ title, children }) => (
    <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 shadow-sm">
      <h4 className="font-semibold text-slate-900 mb-2">{title}</h4>
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  )

  return (
    <div className="space-y-4">
      <Section title="Parties Involved">
        <ul className="list-disc ml-5">
          {data.parties?.map((p,i)=>(<li key={i}>{p}</li>))}
        </ul>
      </Section>
      <Section title="Incident Summary">
        <p>{data.incident_summary}</p>
      </Section>
      <Section title="Key Facts">
        <ul className="list-disc ml-5">
          {data.key_facts?.map((p,i)=>(<li key={i}>{p}</li>))}
        </ul>
      </Section>
      <Section title="Evidence">
        <ul className="list-disc ml-5">
          {data.evidence?.map((p,i)=>(<li key={i}>{p}</li>))}
        </ul>
      </Section>
      <Section title="IPC Sections">
        <div className="flex flex-wrap gap-2">
          {data.ipc_sections?.map((s,i)=>(<span key={i} className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2 py-1 text-xs">{s}</span>))}
        </div>
      </Section>
      <Section title="Timeline">
        <ol className="relative border-l border-slate-300 ml-3">
          {data.timeline?.map((t,i)=> (
            <li key={i} className="ml-4 mb-3">
              <div className="absolute -left-1.5 mt-1 size-3 rounded-full bg-indigo-600"></div>
              <time className="text-xs text-slate-500">{t.date}</time>
              <p className="text-sm text-slate-800">{t.event}</p>
            </li>
          ))}
        </ol>
      </Section>
      <Section title="Red Flags">
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-red-800">
          <ul className="list-disc ml-5">
            {data.red_flags?.map((p,i)=>(<li key={i}>{p}</li>))}
          </ul>
        </div>
      </Section>
      <Section title="Recommendations">
        <ul className="list-disc ml-5">
          {data.recommendations?.map((p,i)=>(<li key={i}>{p}</li>))}
        </ul>
      </Section>
      <Section title="Final Summary">
        <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3 text-slate-800">
          {data.final_summary}
        </div>
      </Section>
    </div>
  )
}

const sampleText = `FIR report regarding theft incident on 12 Jan 2024 at Mumbai. Complainant: Mr. A. Accused: Mr. B. Witness statements and CCTV footage available.`

const sampleResult = {
  parties: ['Complainant: Mr. A', 'Accused: Mr. B', 'Witnesses: 2 unnamed'],
  incident_summary: 'Reported theft on 12 Jan 2024 at Mumbai residence. Valuables missing. Police informed the same day.',
  key_facts: ['Entry through window', 'CCTV shows suspect at 22:10', 'No prior enmity recorded'],
  evidence: ['CCTV footage', 'Witness statements', 'Recovered fingerprints'],
  ipc_sections: ['IPC 378 (Theft)', 'IPC 457 (Lurking house-trespass by night)'],
  timeline: [
    { date: '12 Jan 2024, 21:50', event: 'Incident occurred' },
    { date: '12 Jan 2024, 22:30', event: 'FIR lodged' },
    { date: '13 Jan 2024', event: 'Site investigation & evidence collection' },
  ],
  red_flags: ['Inconsistent witness timings', 'No inventory list provided initially'],
  recommendations: ['Verify alibi of accused', 'Forensic analysis of prints', 'Request original CCTV recording'],
  final_summary: 'The evidence supports a probable theft under IPC 378 with potential aggravating circumstances under IPC 457. Further investigation is warranted.'
}
