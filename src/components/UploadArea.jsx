import { useRef } from 'react'
import { CloudUpload } from 'lucide-react'

export default function UploadArea({ onFiles }) {
  const inputRef = useRef(null)

  const handleDrop = (e) => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    onFiles?.(files)
  }

  const handleChange = (e) => {
    const files = Array.from(e.target.files)
    onFiles?.(files)
  }

  return (
    <div
      onDragOver={(e)=>e.preventDefault()}
      onDrop={handleDrop}
      className="mx-auto max-w-3xl p-8 border-2 border-dashed rounded-2xl bg-white/60 backdrop-blur text-center border-slate-300 hover:border-indigo-500 transition-colors"
    >
      <CloudUpload className="mx-auto size-10 text-indigo-600"/>
      <p className="mt-3 text-slate-700 font-medium">Drag & drop files here</p>
      <p className="text-sm text-slate-500">or</p>
      <button
        onClick={()=>inputRef.current?.click()}
        className="mt-3 inline-flex items-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-2 text-sm hover:bg-slate-800"
      >
        Browse Files
      </button>
      <input ref={inputRef} type="file" multiple className="hidden" onChange={handleChange}
        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.mp3,.wav" />
    </div>
  )
}
