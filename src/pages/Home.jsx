import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import UploadArea from '../components/UploadArea'

export default function Home() {
  const navigate = useNavigate()

  const onFiles = (files) => {
    // In a real app, upload then navigate; here we directly go to processing
    navigate('/processing')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
      <Navbar />
      <Hero onUploadClick={()=>document.getElementById('upload-area')?.scrollIntoView({behavior:'smooth'})}/>
      <div id="upload-area" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UploadArea onFiles={onFiles} />
        </div>
      </div>
    </div>
  )
}
