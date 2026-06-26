// src/pages/ApplicationPage.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../services/supabase';

export default function ApplicationPage() {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicationRecord = async () => {
      try {
        setLoading(true);
        // Execute a relational query to grab connected job data
        const { data, error } = await supabase
          .from('applications')
          .select(`
            reference_code,
            full_name,
            status,
            created_at,
            jobs (
              title,
              company
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setApplication(data);
      } catch (err) {
        console.error('Error fetching application metrics:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicationRecord();
  }, [id]);

  if (loading) return <div className="text-center py-16 text-neutral-400">Verifying transmission records...</div>;
  if (!application) return <div className="text-center py-16 text-rose-500 font-bold">Error: Tracking record context unavailable.</div>;

  const jobDetails = application.jobs;

  return (
    <div className="max-w-md mx-auto p-6 my-12">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl text-center">
        
        {/* Banner Status Module */}
        <div className="bg-black p-6 border-b border-neutral-800/60">
          <div className="inline-flex items-center justify-center bg-emerald-950/80 text-emerald-400 border border-emerald-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 animate-pulse">
            ✓ Transmission Verified
          </div>
          <h2 className="text-xl font-bold text-white line-clamp-1">{jobDetails?.title}</h2>
          <p className="text-neutral-400 text-xs mt-1">{jobDetails?.company}</p>
        </div>

        {/* Detailed Metrics Panel */}
        <div className="p-6 space-y-4">
          <div className="bg-black/40 border border-neutral-800/80 rounded-2xl p-4 text-left space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Tracking ID</span>
              <span className="font-mono text-sm font-black text-emerald-400 select-all bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                {application.reference_code}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Candidate</span>
              <span className="text-sm font-semibold text-neutral-200">{application.full_name}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Submitted On</span>
              <span className="text-sm text-neutral-300">
                {new Date(application.created_at).toLocaleDateString(undefined, { dateStyle: 'medium' })}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-dashed border-neutral-800">
              <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Review Status</span>
              <span className="bg-emerald-600 text-black text-xs font-black px-2.5 py-1 rounded-md tracking-wide uppercase">
                {application.status}
              </span>
            </div>
          </div>

          <p className="text-xs text-neutral-400 leading-relaxed max-w-xs mx-auto">
            Your application credentials have been filed into the recruitment archive pipeline. Keep your unique reference tracking code handy for progress inquiries.
          </p>

          <Link 
            to="/jobs" 
            className="w-full block text-center bg-neutral-950 hover:bg-neutral-800 text-white font-bold py-3 px-4 rounded-xl border border-neutral-800 transition text-sm mt-4"
          >
            ← Return to Career Board
          </Link>
        </div>
      </div>
    </div>
  );
}