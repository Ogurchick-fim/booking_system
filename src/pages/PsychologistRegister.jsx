import { useState } from 'react';
import { supabase } from '../supabase';
import React from 'react';

export default function PsychologistRegister() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    birth: '',
    education: '',
    experience: '',
    certification: '',
    description: '',
    skills: ''
  });

  const [cvFile, setCvFile] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e, setFile) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // 1. Загрузка файлов в Storage
      const uploads = [];

      if (cvFile) {
        const { data, error } = await supabase.storage
          .from('applications')
          .upload(`cv/${Date.now()}-${cvFile.name}`, cvFile);
        if (error) throw error;
        uploads.push({ key: 'cv_url', url: data.path });
      }

      if (certFile) {
        const { data, error } = await supabase.storage
          .from('applications')
          .upload(`cert/${Date.now()}-${certFile.name}`, certFile);
        if (error) throw error;
        uploads.push({ key: 'cert_url', url: data.path });
      }

      // 2. Отправка данных в таблицу
      const submission = {
        ...form,
        cv_url: uploads.find(f => f.key === 'cv_url')?.url || '',
        cert_url: uploads.find(f => f.key === 'cert_url')?.url || '',
        status: 'pending',
        submitted_at: new Date()
      };

      const { error: insertError } = await supabase
        .from('psychologist_applications')
        .insert([submission]);

      if (insertError) throw insertError;

      setMessage('Application submitted! You will receive an email shortly.');
      setForm({
        name: '', surname: '', email: '', birth: '',
        education: '', experience: '', certification: '', description: '', skills: ''
      });
      setCvFile(null);
      setCertFile(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Psychologist Application</h1>

      {error && <p className="text-red-500 mb-2 text-sm">{error}</p>}
      {message && <p className="text-green-600 mb-2 text-sm">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="First Name" className="w-full border px-3 py-2 rounded" value={form.name} onChange={handleChange} required />
        <input name="surname" placeholder="Last Name" className="w-full border px-3 py-2 rounded" value={form.surname} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" className="w-full border px-3 py-2 rounded" value={form.email} onChange={handleChange} required />
        <input name="birth" type="date" className="w-full border px-3 py-2 rounded" value={form.birth} onChange={handleChange} required />
        <textarea name="education" placeholder="Education background" className="w-full border px-3 py-2 rounded" rows={2} value={form.education} onChange={handleChange} required />
        <textarea name="experience" placeholder="Work experience" className="w-full border px-3 py-2 rounded" rows={2} value={form.experience} onChange={handleChange} required />
        <textarea name="certification" placeholder="Certifications" className="w-full border px-3 py-2 rounded" rows={2} value={form.certification} onChange={handleChange} required />
        <textarea name="skills" placeholder="Skills" className="w-full border px-3 py-2 rounded" rows={2} value={form.skills} onChange={handleChange} required />
        <textarea name="description" placeholder="Describe yourself" className="w-full border px-3 py-2 rounded" rows={3} value={form.description} onChange={handleChange} required />

        <div>
          <label className="block text-sm mb-1">Upload CV (PDF)</label>
          <input type="file" accept=".pdf,.jpg,.png" onChange={(e) => handleFileUpload(e, setCvFile)} required />
        </div>

        <div>
          <label className="block text-sm mb-1">Upload Certificate (PDF/JPG)</label>
          <input type="file" accept=".pdf,.jpg,.png" onChange={(e) => handleFileUpload(e, setCertFile)} required />
        </div>

        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          Submit Application
        </button>
      </form>
    </div>
  );
}