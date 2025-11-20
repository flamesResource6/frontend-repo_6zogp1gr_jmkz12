import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Processing from '../components/Processing'

export default function ProcessingPage(){
  const [stage, setStage] = useState('extract')
  const navigate = useNavigate()

  useEffect(()=>{
    const seq = ['extract','ocr','asr','done']
    let i = 0
    const id = setInterval(()=>{
      i = Math.min(i+1, seq.length-1)
      setStage(seq[i])
    }, 1200)
    return ()=>clearInterval(id)
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Processing stage={stage} onViewText={()=>navigate('/analysis')} />
      </div>
    </div>
  )
}
