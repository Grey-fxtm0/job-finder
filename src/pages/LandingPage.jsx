// src/pages/LandingPage.jsx
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col items-center text-center">
      <span className="bg-emerald-950/60 border border-emerald-900 text-emerald-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
        Next-Gen Tech Job Engine
      </span>
      
      <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-6">
        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Dream Job</span>
      </h1>
      
      <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-10 font-normal leading-relaxed">
        Connect directly with engineering groups and tech teams. Skip the recruiters and track your application status live from submission to offer.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-16">
        <Link to="/jobs" className="bg-emerald-600 hover:bg-emerald-500 text-black font-extrabold px-8 py-4 rounded-xl tracking-wide shadow-xl shadow-emerald-950/40 transition-all duration-200 transform hover:-translate-y-0.5 text-base">
          🔍 Search Open Positions
        </Link>
        <Link to="/jobs/create" className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold border border-neutral-800 px-8 py-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 text-base">
          Post an Opening
        </Link>
      </div>

      {/* Analytics Statistics Panel Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl border-t border-neutral-900 pt-12 text-center">
        <div>
          <p className="text-3xl md:text-4xl font-black text-white">500+</p>
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mt-1">Open Positions</p>
        </div>
        <div>
          <p className="text-3xl md:text-4xl font-black text-emerald-400">100%</p>
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mt-1">Verified Companies</p>
        </div>
        <div className="col-span-2 md:col-span-1">
          <p className="text-3xl md:text-4xl font-black text-white">12k+</p>
          <p className="text-neutral-500 text-xs font-bold uppercase tracking-wider mt-1">Applications Handled</p>
        </div>
      </div>
    </div>
  );
}