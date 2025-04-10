import { useState } from 'react';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';

export default function UserDashboard() {
  const { user } = useAuth();
  const [section, setSection] = useState('about');

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      await supabase.auth.admin.deleteUser(user.id); // for admin only
      await supabase.auth.signOut();
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.user_metadata?.name || user.email}</h1>

      <div className="flex gap-4 mb-6">
        <button onClick={() => setSection('about')} className={section === 'about' ? 'font-bold' : ''}>About</button>
        <button onClick={() => setSection('settings')} className={section === 'settings' ? 'font-bold' : ''}>Settings</button>
        <button onClick={() => setSection('bookings')} className={section === 'bookings' ? 'font-bold' : ''}>Bookings</button>
        <button onClick={() => setSection('delete')} className={section === 'delete' ? 'text-red-500 font-bold' : 'text-red-500'}>Delete</button>
      </div>

      {section === 'about' && (
        <div className="space-y-2">
          <p><strong>Name:</strong> {user.user_metadata?.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Country:</strong> {user.user_metadata?.country}</p>
          <p><strong>Gender:</strong> {user.user_metadata?.gender}</p>
          <p><strong>Age:</strong> {user.user_metadata?.age}</p>
        </div>
      )}

      {section === 'settings' && (
        <p className="text-gray-500 italic">⚙️ Settings functionality coming soon.</p>
      )}

      {section === 'bookings' && (
        <p className="text-gray-500 italic">📅 You will see your bookings here.</p>
      )}

      {section === 'delete' && (
        <div className="mt-4">
          <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete My Account
          </button>
        </div>
      )}
    </div>
  );
}