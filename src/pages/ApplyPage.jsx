// src/pages/ApplyPage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { supabase } from '../services/supabase';

export default function ApplyPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Initialize React Hook Form utilities
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    supabase.from('jobs').select('title, company').eq('id', id).single().then(({ data }) => setJob(data));
  }, [id]);

  const onFormSubmit = async (formData) => {
    setSubmitting(true);
    try {
      // 1. Generate a standardized tracker reference string
      const trackingReference = `APP-2026-${Math.floor(100000 + Math.random() * 900000)}`;

      // 2. Insert payload into Supabase applications database table
      const { data, error } = await supabase
        .from('applications')
        .insert([
          {
            job_id: id,
            full_name: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            experience: parseInt(formData.experience),
            portfolio_url: formData.portfolioUrl,
            cover_letter: formData.coverLetter,
            reference_code: trackingReference
          }
        ])
        .select()
        .single();

      if (error) throw error;

      // 3. Route directly into the Application Success page passing database ID
      navigate(`/applications/${data.id}`);
    } catch (err) {
      alert('Application failed to transmit: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl my-10">
      <h2 className="text-2xl font-black text-white tracking-tight">Apply for Position</h2>
      <p className="text-neutral-400 text-sm mb-6">
        Submitting to: <span className="text-emerald-400 font-semibold">{job?.title} at {job?.company}</span>
      </p>

      {/* Form Submission linked directly to React Hook Form validator intercept handler */}
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        
        {/* Full Name field input component */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Full Name *</label>
          <input 
            type="text" 
            {...register('fullName', { required: 'Full name field context is required' })}
            className={`w-full bg-black border rounded-xl p-3 text-white outline-none focus:border-emerald-500 text-sm transition ${errors.fullName ? 'border-rose-600 focus:border-rose-600' : 'border-neutral-800'}`}
            placeholder="John Doe" 
          />
          {errors.fullName && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.fullName.message}</p>}
        </div>

        {/* Email structural input validation logic */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Email Address *</label>
          <input 
            type="email" 
            {...register('email', { 
              required: 'Email coordinates are required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid format standard layout notation entry' }
            })}
            className={`w-full bg-black border rounded-xl p-3 text-white outline-none focus:border-emerald-500 text-sm transition ${errors.email ? 'border-rose-600 focus:border-rose-600' : 'border-neutral-800'}`}
            placeholder="john@example.com" 
          />
          {errors.email && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.email.message}</p>}
        </div>

        {/* Telephone parameters input layout configuration */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Phone Number</label>
          <input 
            type="tel" 
            {...register('phone')}
            className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 text-sm transition"
            placeholder="+1 (555) 000-0000" 
          />
        </div>

        {/* Numeric integer context values field mapping layer */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Years of Experience *</label>
          <input 
            type="number" 
            {...register('experience', { 
              required: 'Experience configuration metric indicator is required',
              min: { value: 0, message: 'Experience cannot register as negative value integer' }
            })}
            className={`w-full bg-black border rounded-xl p-3 text-white outline-none focus:border-emerald-500 text-sm transition ${errors.experience ? 'border-rose-600 focus:border-rose-600' : 'border-neutral-800'}`}
            placeholder="e.g. 3" 
          />
          {errors.experience && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.experience.message}</p>}
        </div>

        {/* Portfolio URL mapping validation input criteria blocks */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Portfolio URL</label>
          <input 
            type="text" 
            {...register('portfolioUrl', {
              pattern: { value: /^https?:\/\/.+/i, message: 'URL must start with http:// or https://' }
            })}
            className={`w-full bg-black border rounded-xl p-3 text-white outline-none focus:border-emerald-500 text-sm transition ${errors.portfolioUrl ? 'border-rose-600 focus:border-rose-600' : 'border-neutral-800'}`}
            placeholder="https://myportfolio.dev" 
          />
          {errors.portfolioUrl && <p className="text-rose-500 text-xs mt-1 font-semibold">{errors.portfolioUrl.message}</p>}
        </div>

        {/* Cover Letter rich block paragraph textual string segment */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">Cover Letter</label>
          <textarea 
            rows="5" 
            {...register('coverLetter')}
            className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-white outline-none focus:border-emerald-500 text-sm transition"
            placeholder="Introduce yourself to the development group engineering managers..."
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={submitting}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-neutral-800 text-black font-extrabold py-3.5 px-4 rounded-xl tracking-wide shadow-xl transition-all duration-200"
        >
          {submitting ? 'Transmitting Documents...' : '📨 Deliver My Application'}
        </button>
      </form>
    </div>
  );
}