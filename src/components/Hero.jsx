import { UploadCloud, FileText, FileType, Image, Mic2 } from 'lucide-react'

export default function Hero({ onUploadClick }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-40" aria-hidden>
        <div className="absolute -top-40 -right-40 size-[480px] bg-gradient-to-br from-indigo-600 to-amber-400 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 size-[420px] bg-gradient-to-br from-sky-400 to-indigo-700 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-16 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
              LegalSum AI
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-xl">
              Offline Legal Document Understanding & Case Timeline Generator
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={onUploadClick} className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 text-white px-5 py-3 text-sm font-medium shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-colors">
                <UploadCloud className="size-4"/>
                Upload Document
              </button>
              <div className="flex items-center gap-2 text-slate-600/80">
                <span className="text-xs">Supported:</span>
                <div className="flex items-center gap-1 text-xs">
                  <FileText className="size-4"/> PDF
                  <FileType className="size-4 ml-2"/> DOCX
                  <Image className="size-4 ml-2"/> JPG/PNG
                  <Mic2 className="size-4 ml-2"/> MP3/WAV
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur rounded-2xl border border-slate-200 p-6 shadow-xl">
            <h3 className="font-semibold text-slate-900">Recent uploads</h3>
            <p className="text-sm text-slate-600 mb-4">Preview only</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {['FIR_2023.pdf','CourtOrder.docx','Evidence-photos.zip','WitnessAudio.wav'].map((name,i) => (
                <div key={i} className="rounded-xl border border-slate-200 p-4 bg-white/80">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-lg bg-slate-900/90 text-amber-400 flex items-center justify-center">
                      <FileText className="size-5"/>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-900">{name}</p>
                      <p className="text-xs text-slate-500">Just now</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
