
import React from 'react';
import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ email: '', password: '', general: '' }); // очищаем ошибки при вводе
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '' });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password
    });

    if (error) {
      // Распознаем тип ошибки по сообщению
      if (error.message.toLowerCase().includes('invalid login credentials')) {
        setErrors({
          ...errors,
          general: 'Incorrect email or password.'
        });
      } else if (error.message.toLowerCase().includes('email')) {
        setErrors({
          ...errors,
          email: 'This email is not registered.'
        });
      } else {
        setErrors({
          ...errors,
          general: error.message
        });
      }
    } else {
      navigate('/account');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Log In</h1>

      {errors.general && <p className="text-red-500 text-sm mb-2">{errors.general}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Log in
        </button>
      </form>
    </div>
  );
}