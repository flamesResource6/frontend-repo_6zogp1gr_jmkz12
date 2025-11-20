import { Loader2, FileText, ScanText, Mic, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Processing({ stage = 'starting', onViewText }) {
  const steps = [
    { key: 'extract', label: 'Extracting text…', icon: FileText },
    { key: 'ocr', label: 'Running OCR…', icon: ScanText },
    { key: 'asr', label: 'Detecting voice…', icon: Mic },
  ]

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-2xl border bg-white/70 backdrop-blur p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900">Processing Document</h2>
          <Loader2 className="size-5 animate-spin text-indigo-600"/>
        </div>

        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-600 via-amber-400 to-indigo-600"
            initial={{ width: '5%' }}
            animate={{ width: stage === 'done' ? '100%' : '80%' }}
            transition={{ duration: 2, repeat: stage === 'done' ? 0 : Infinity, repeatType: 'reverse' }}
          />
        </div>

        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon
            const done = stage === 'done' || idx < (stage === 'ocr' ? 1 : stage === 'asr' ? 2 : 0)
            return (
              <div key={s.key} className="rounded-xl border p-4 bg-white/60">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-lg flex items-center justify-center ${done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-900/90 text-amber-400'}`}>
                    {done ? <CheckCircle2 className="size-5"/> : <Icon className="size-5"/>}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{s.label}</p>
                    <p className="text-xs text-slate-500">{done ? 'Completed' : 'In progress'}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button onClick={onViewText} className="inline-flex items-center rounded-xl bg-indigo-600 text-white px-4 py-2 text-sm hover:bg-indigo-500">
            View Extracted Text
          </button>
        </div>
      </div>
    </div>
  )
}
