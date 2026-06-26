// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import JobsPage from './pages/JobsPage';
import JobDetailsPage from './pages/JobDetailsPage';
import CreateJobPage from "./pages/CreateJobPage.jsx";
import ApplyPage from './pages/ApplyPage';
import ApplicationPage from './pages/ApplicationPage';

export default function App() {
  return (
    <Router>
      {/* Black & Deep Green Navigation Bar */}
      <nav className="bg-black text-white py-4 px-6 flex justify-between items-center border-b border-emerald-950/40 shadow-xl">
        <Link to="/" className="text-xl font-black tracking-wider text-emerald-400 flex items-center gap-2 uppercase">
          💼 CareerHub
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/jobs" className="text-slate-300 hover:text-emerald-400 font-medium text-sm transition-colors duration-200">
            Find Jobs
          </Link>
          <Link to="/jobs/create" className="bg-emerald-600 hover:bg-emerald-500 text-black font-extrabold px-5 py-2 rounded-xl text-sm tracking-wide shadow-md shadow-emerald-900/20 transition-all duration-200 hover:-translate-y-0.5">
            + Post a Job
          </Link>
        </div>
      </nav>

      {/* Main Dynamic Container with a sleek dark foundation style layout */}
      <main className="min-h-screen bg-slate-950 text-slate-100 pb-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/create" element={<CreateJobPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/jobs/:id/apply" element={<ApplyPage />} />
          <Route path="/applications/:id" element={<ApplicationPage />} />
        </Routes>
      </main>
    </Router>
  );
}