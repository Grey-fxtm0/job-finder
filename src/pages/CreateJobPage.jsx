// src/pages/CreateJobPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "../services/supabase.js";

export default function CreateJobPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    employment_type: 'Remote',
    salary_range: '',
    description: '',
    requirements: '',
    deadline: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('jobs').insert([formData]);
      if (error) throw error;
      navigate('/jobs');
    } catch (err) {
      alert('Error creating listing: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl my-12">
      <h2 className="text-3xl font-black text-white tracking-tight mb-2">➕ Post a Career Opportunity</h2>
      <p className="text-neutral-400 text-sm mb-6">Fill in the fields below to publish a new open vacancy.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Job Title *</label>
            <input type="text" name="title" required value={formData.title} onChange={handleChange} className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition" placeholder="e.g. Senior Frontend Engineer" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Company Name *</label>
            <input type="text" name="company" required value={formData.company} onChange={handleChange} className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition" placeholder="e.g. Acme Tech Corp" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition" placeholder="e.g. New York, NY" />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Employment Type</label>
            <select name="employment_type" value={formData.employment_type} onChange={handleChange} className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition">
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Salary Range</label>
            <input type="text" name="salary_range" value={formData.salary_range} onChange={handleChange} className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition" placeholder="e.g. $120k - $140k" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Job Description *</label>
          <textarea name="description" required rows="4" value={formData.description} onChange={handleChange} className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition" placeholder="Detail the primary roles, context and expectations..."></textarea>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">Core Requirements</label>
          <textarea name="requirements" rows="3" value={formData.requirements} onChange={handleChange} className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition" placeholder="e.g. 5+ Years React, Mastery of SQL archives..."></textarea>
        </div>

        <div className="max-w-xs">
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
            Application Deadline
          </label>
          <input
            type="date"
            name="deadline"                     // Makes sure handleChange updates the right key
            value={formData.deadline || ''}     // Prevents uncontrolled component warnings
            onChange={handleChange}
            className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 transition"
          />
        </div>

        <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-800 text-black font-extrabold py-3.5 px-4 rounded-xl tracking-wide shadow-lg shadow-emerald-950/40 transition duration-200">
          {loading ? 'Publishing Opportunity...' : '🚀 Launch Job Listing'}
        </button>
      </form>
    </div>
  );
}