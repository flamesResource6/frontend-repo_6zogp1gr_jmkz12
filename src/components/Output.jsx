import { Download, Copy, FileOutput, Gavel, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function Output({ data = sample }) {
  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'legal_sum_output.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const downloadPDF = () => {
    const html = document.getElementById('print-area')?.innerHTML || ''
    const win = window.open('', '_blank')
    win.document.write(`<html><head><title>LegalSum AI Report</title><style>body{font-family: Inter, system-ui; padding:24px} .card{border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin-bottom:12px}</style></head><body>${html}</body></html>`) 
    win.document.close();
    win.focus();
    win.print();
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    alert('Copied to clipboard')
  }

  const Card = ({ title, icon:Icon, children, accent='indigo' }) => (
    <div className="rounded-2xl border bg-white/70 backdrop-blur p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className={`size-8 rounded-lg flex items-center justify-center text-white ${accent==='indigo'?'bg-indigo-600': accent==='amber'?'bg-amber-500': accent==='red'?'bg-red-500':'bg-slate-900'}`}>
          <Icon className="size-4"/>
        </div>
        <h4 className="font-semibold text-slate-900">{title}</h4>
      </div>
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-4 flex flex-wrap gap-2 justify-end">
        <button onClick={downloadJSON} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800"><Download className="size-4"/> Download JSON</button>
        <button onClick={downloadPDF} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-500"><FileOutput className="size-4"/> Download PDF</button>
        <button onClick={copyToClipboard} className="inline-flex items-center gap-2 rounded-xl bg-amber-500 text-white px-4 py-2 text-sm hover:bg-amber-400"><Copy className="size-4"/> Copy</button>
      </div>

      <div id="print-area" className="grid lg:grid-cols-2 gap-4">
        <Card title="Parties Involved" icon={Gavel}>
          <ul className="list-disc ml-5">
            {data.parties.map((p,i)=>(<li key={i}>{p}</li>))}
          </ul>
        </Card>
        <Card title="Timeline" icon={Clock} accent="amber">
          <ol className="relative border-l border-slate-300 ml-3">
            {data.timeline.map((t,i)=> (
              <li key={i} className="ml-4 mb-3">
                <div className="absolute -left-1.5 mt-1 size-3 rounded-full bg-amber-500"></div>
                <time className="text-xs text-slate-500">{t.date}</time>
                <p className="text-sm text-slate-800">{t.event}</p>
              </li>
            ))}
          </ol>
        </Card>
        <Card title="Incident Summary" icon={Gavel}>
          <p>{data.incident_summary}</p>
        </Card>
        <Card title="Key Facts" icon={CheckCircle2}>
          <ul className="list-disc ml-5">
            {data.key_facts.map((p,i)=>(<li key={i}>{p}</li>))}
          </ul>
        </Card>
        <Card title="Evidence" icon={CheckCircle2}>
          <ul className="list-disc ml-5">
            {data.evidence.map((p,i)=>(<li key={i}>{p}</li>))}
          </ul>
        </Card>
        <Card title="Red Flags" icon={AlertTriangle} accent="red">
          <ul className="list-disc ml-5 text-red-700">
            {data.red_flags.map((p,i)=>(<li key={i}>{p}</li>))}
          </ul>
        </Card>
        <Card title="IPC Sections" icon={Gavel}>
          <div className="flex flex-wrap gap-2">
            {data.ipc_sections.map((s,i)=>(<span key={i} className="inline-flex items-center rounded-full bg-amber-100 text-amber-800 px-2 py-1 text-xs">{s}</span>))}
          </div>
        </Card>
        <Card title="Final Summary" icon={Gavel}>
          <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3 text-slate-800">
            {data.final_summary}
          </div>
        </Card>
      </div>
    </div>
  )
}

const sample = {
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
