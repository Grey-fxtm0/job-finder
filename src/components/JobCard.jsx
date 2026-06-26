// src/components/JobCard.jsx
import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg hover:border-emerald-800/60 transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-2 mb-3">
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">{job.title}</h3>
            <p className="text-emerald-400 font-medium text-sm">{job.company}</p>
          </div>
          <span className="bg-neutral-800 text-neutral-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-neutral-700 uppercase tracking-wider">
            {job.employment_type}
          </span>
        </div>
        
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-neutral-400 font-medium mb-4">
          <p>📍 {job.location || 'Remote'}</p>
          <p>💰 {job.salary_range || 'Not Disclosed'}</p>
        </div>

        <p className="text-neutral-300 text-sm line-clamp-3 mb-6 leading-relaxed">
          {job.description}
        </p>
      </div>

      <Link 
        to={`/jobs/${job.id}`}
        className="w-full block text-center bg-transparent hover:bg-emerald-600/10 text-emerald-400 hover:text-emerald-300 font-bold py-2.5 px-4 rounded-xl border border-emerald-500/30 hover:border-emerald-500 transition-all duration-200 text-sm"
      >
        View Open Position
      </Link>
    </div>
  );
}