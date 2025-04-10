import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

const countries = [
  'Kyrgyzstan', 'Kazakhstan', 'Russia', 'USA', 'Germany', 'Turkey'
];
  
export default function Register() {
  
  
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    country: '',
    age: '',
    gender: ''

    })


  

        
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!form.name || !form.country || !form.gender || !form.age) {
      setError('Please fill in all fields');
      return;
    }

    
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          name: form.name,
          country: form.country,
          gender: form.gender,
          age: form.age
        }
      }
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email to confirm your registration.');
      setForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        gender: '',
        age: ''
      });
      setTimeout(() => navigate('/'), 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-3">{message}</p>}

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full border px-3 py-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          className="w-full border px-3 py-2 rounded"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <select
          name="country"
          className="w-full border px-3 py-2 rounded"
          value={form.country}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          name="gender"
          className="w-full border px-3 py-2 rounded"
          value={form.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input
          name="age"
          type="number"
          placeholder="Age"
          min="1"
          max="100"
          className="w-full border px-3 py-2 rounded"
          value={form.age}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}