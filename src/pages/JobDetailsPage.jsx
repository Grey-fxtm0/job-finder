// src/pages/JobDetailsPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setJob(data);
      } catch (err) {
        console.error('Error fetching job details:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleDelete = async () => {
    // Structural confirmation check required by the project specifications
    const confirmDelete = window.confirm(
      '⚠️ Are you absolutely sure you want to delete this job posting? All submitted applications for this role will be permanently removed.'
    );

    if (!confirmDelete) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      navigate('/jobs');
    } catch (err) {
      alert('Failed to delete listing: ' + err.message);
    }
  };

  if (loading) return <div className="text-center py-16 text-neutral-400">Loading vacancy profiles...</div>;
  if (!job) return <div className="text-center py-16 text-rose-500 font-bold">Error: Job profile not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 my-10">
      {/* Structural Header Panel */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 shadow-2xl mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-block bg-neutral-800 text-neutral-300 text-xs font-bold px-3 py-1 rounded-md border border-neutral-700 uppercase tracking-widest mb-3">
            {job.employment_type}
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{job.title}</h1>
          <p className="text-emerald-400 font-bold text-lg mt-1">{job.company}</p>
          
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-neutral-400 mt-4">
            <p>📍 {job.location || 'Remote'}</p>
            <p>💰 {job.salary_range || 'Not Disclosed'}</p>
            {job.deadline && (
              <p className="text-amber-500">⏳ Deadline: {new Date(job.deadline).toLocaleDateString()}</p>
            )}
          </div>
        </div>

        {/* Call to Action Controls */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 min-w-[160px]">
          <Link 
            to={`/jobs/${job.id}/apply`}
            className="w-full text-center bg-emerald-600 hover:bg-emerald-500 text-black font-extrabold py-3 px-6 rounded-xl tracking-wide transition duration-200 shadow-lg shadow-emerald-950/30"
          >
            Apply Now 🚀
          </Link>
          <button 
            onClick={handleDelete}
            className="w-full text-center bg-neutral-950 hover:bg-rose-950/20 text-neutral-400 hover:text-rose-400 font-bold py-2.5 px-4 rounded-xl border border-neutral-800 hover:border-rose-900/40 text-sm transition"
          >
            🗑️ Remove Listing
          </button>
        </div>
      </div>

      {/* Description & Requirements Block Details */}
      <div className="space-y-8 bg-neutral-900/30 border border-neutral-900/60 rounded-3xl p-6 md:p-8">
        <div>
          <h3 className="text-lg font-bold text-white mb-3 tracking-tight">Core Role Description</h3>
          <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
        </div>

        {job.requirements && (
          <div className="border-t border-neutral-900 pt-6">
            <h3 className="text-lg font-bold text-white mb-3 tracking-tight">Experience & Core Requirements</h3>
            <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-wrap">{job.requirements}</p>
          </div>
        )}
      </div>
    </div>
  );
}