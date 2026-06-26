// src/pages/JobsPage.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../services/supabase';
import JobCard from '../components/JobCard';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('All'); // All, Remote, Hybrid, On-site

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('jobs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setJobs(data || []);
      } catch (err) {
        console.error('Error fetching jobs:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Filter logic handled cleanly on client-side runtime
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      (job.location && job.location.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter = filterType === 'All' || job.employment_type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="max-w-6xl mx-auto p-6 my-6">
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-black text-white tracking-tight">Explore Opportunities</h2>
        <p className="text-neutral-400 text-sm mt-1">Discover your next career jump in our verified ecosystem.</p>
      </div>

      {/* Control Panel: Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-neutral-900/40 p-4 rounded-2xl border border-neutral-900">
        <input 
          type="text" 
          placeholder="🔍 Search title, company, or location..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:max-w-md bg-black border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500/60 text-sm transition"
        />

        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {['All', 'Remote', 'Hybrid', 'On-site'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
                filterType === type 
                  ? 'bg-emerald-600 text-black shadow-md shadow-emerald-950/50' 
                  : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Grid List View Rendering Context */}
      {loading ? (
        <div className="text-center py-16 text-neutral-400 font-medium">Scanning career board database logs...</div>
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-20 bg-neutral-900/20 border border-dashed border-neutral-800 rounded-3xl">
          <p className="text-neutral-500 font-medium text-lg">No job openings found matching criteria parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}