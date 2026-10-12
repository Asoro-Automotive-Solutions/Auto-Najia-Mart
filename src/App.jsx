import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Environment Ready
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Auto Naija Market
        </h1>

        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Frontend baseline scaffolded with React, React Router, and Tailwind CSS.
          Collaborators can now build and connect screens across routes.
        </p>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-left text-sm text-slate-300 space-y-2">
          <p className="font-semibold text-slate-200">Stack Configured:</p>
          <ul className="list-disc list-inside text-slate-400 space-y-1">
            <li><span className="text-slate-200">React 19</span> + Vite 8</li>
            <li><span className="text-slate-200">React Router v7</span> (Browser routing configured)</li>
            <li><span className="text-slate-200">Tailwind CSS v4</span> (@tailwindcss/vite active)</li>
          </ul>
        </div>
      </div>
    </main>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
