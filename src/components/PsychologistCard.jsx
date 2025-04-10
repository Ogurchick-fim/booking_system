import { Link } from 'react-router-dom';
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function PsychologistCard({ psychologist }) {
  const { user } = useAuth();

  return (
    <div className="border rounded p-4 shadow-md bg-white">
      <h3 className="text-lg font-semibold mb-1">{psychologist.name}</h3>
      <p className="text-sm mb-1">{psychologist.specialization}</p>
      <p className="text-sm mb-2">Languages: {psychologist.languages.join(', ')}</p>
      <div className="flex justify-between items-center">
        <Link to={`/psychologists/${psychologist.id}`} className="text-blue-600 hover:underline text-sm">
          Learn more
        </Link>
        {user ? (
          <Link to={`/booking/${psychologist.id}`} className="bg-indigo-600 text-white px-3 py-1 rounded text-sm">
            Book
          </Link>
        ) : (
          <Link to="/login" className="text-sm text-gray-500 italic">Log in to book</Link>
        )}
      </div>
    </div>
  );
}