import { Link, NavLink } from 'react-router-dom'
import { Gavel, Home, Loader2, FileText, Brain, LayoutDashboard } from 'lucide-react'

export default function Navbar() {
  const linkBase = 'text-slate-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5'
  const active = ({ isActive }) =>
    isActive ? `${linkBase} bg-white/10 text-white` : linkBase

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur supports-[backdrop-filter]:bg-white/40 bg-white/30 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="size-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
              <Gavel className="size-5" />
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-slate-900">LegalSum AI</p>
              <p className="text-[11px] text-slate-600">Offline Legal Intelligence</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={active}>
              <div className="flex items-center gap-2"><Home className="size-4"/> Home</div>
            </NavLink>
            <NavLink to="/processing" className={active}>
              <div className="flex items-center gap-2"><Loader2 className="size-4"/> Processing</div>
            </NavLink>
            <NavLink to="/analysis" className={active}>
              <div className="flex items-center gap-2"><Brain className="size-4"/> Analysis</div>
            </NavLink>
            <NavLink to="/output" className={active}>
              <div className="flex items-center gap-2"><LayoutDashboard className="size-4"/> Output</div>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>
  )
}
