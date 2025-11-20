import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProcessingPage from './pages/ProcessingPage'
import AnalysisPage from './pages/AnalysisPage'
import OutputPage from './pages/OutputPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/processing" element={<ProcessingPage />} />
      <Route path="/analysis" element={<AnalysisPage />} />
      <Route path="/output" element={<OutputPage />} />
    </Routes>
  )
}

export default App
