import { useState } from 'react';
import Filters from '../components/Filters';
import PsychologistCard from '../components/PsychologistCard';
import React from 'react';

const psychologistsList = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Clinical Psychology',
    format: 'Online',
    gender: 'Female',
    languages: ['EN', 'RU']
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Cognitive Behavioral Therapy',
    format: 'Offline',
    gender: 'Male',
    languages: ['EN', 'KG']
  },
  {
    id: 3,
    name: 'Dr. Emma Williams',
    specialization: 'Family Therapy',
    format: 'Online',
    gender: 'Female',
    languages: ['EN', 'RU', 'KG']
  },
  {
    id: 4,
    name: 'Dr. David Miller',
    specialization: 'Child Psychology',
    format: 'Online',
    gender: 'Male',
    languages: ['EN', 'RU']
  },
  {
    id: 5,
    name: 'Dr. Anna Lee',
    specialization: 'Child Psychology',
    format: 'Offline',
    gender: 'Female',
    languages: ['EN', 'KG']
  }
];

export default function Psychologists() {
  const [filters, setFilters] = useState({
    specialization: '',
    language: '',
    gender: '',
    format: ''
  });

  const filteredPsychologists = psychologistsList.filter(psych => {
    const specMatch = !filters.specialization || psych.specialization === filters.specialization;
    const langMatch = !filters.language || psych.languages.includes(filters.language);
    const genderMatch = !filters.gender || psych.gender === filters.gender;
    const formatMatch = !filters.format || psych.format === filters.format;
    return specMatch && langMatch && genderMatch && formatMatch;
  });

  return (
    <div className="p-6 md:flex gap-8 bg-gray-50 min-h-screen">
      {/* Filters */}
      <aside className="md:w-1/4 bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Filters</h2>
        <Filters filters={filters} setFilters={setFilters} />
      </aside>

      {/* Psychologists list */}
      <main className="md:w-3/4 mt-6 md:mt-0">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Available Psychologists</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPsychologists.map(psych => (
            <PsychologistCard key={psych.id} psychologist={psych} />
          ))}
        </div>
        {filteredPsychologists.length === 0 && (
          <p className="text-gray-500 mt-6">No psychologists match the selected filters.</p>
        )}
      </main>
    </div>
  );
}