import { useParams, Link } from 'react-router-dom';
import React from 'react';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const dummyPsychologists = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Clinical Psychology',
    experience: 8,
    format: 'Online',
    gender: 'Female',
    languages: ['EN', 'RU'],
    about:
      'Dr. Sarah Johnson is a licensed clinical psychologist with over 8 years of experience helping individuals overcome anxiety, depression, and relationship challenges. She employs evidence-based approaches including Cognitive Behavioral Therapy (CBT) and mindfulness techniques.'
  },
  // Добавь других, если нужно
];



export default function PsychologistProfile() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id } = useParams();
  const psychologist = dummyPsychologists.find(p => p.id === Number(id));

  if (!psychologist) {
    return <p className="p-6 text-center">Psychologist not found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md mt-6">
    <h1 className="text-3xl font-bold mb-2 text-indigo-800">{psychologist.name}</h1>
    <p className="text-gray-600 mb-1">{psychologist.specialization} • {psychologist.experience} years of experience</p>
    <p className="text-sm text-gray-600 mb-4">Format: {psychologist.format}</p>
    <p className="text-sm text-gray-600 mb-4">Languages: {psychologist.languages.join(', ')}</p>

    <h2 className="text-xl font-semibold text-gray-800 mb-2">About</h2>
    <p className="text-gray-700 mb-6 leading-relaxed">{psychologist.about}</p>

    <h2 className="text-xl font-semibold text-gray-800 mb-2">Schedule</h2>
    <div className="bg-white border rounded p-4 mb-6">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        minDate={new Date()}
        className="REACT-CALENDAR p-2"
      />
      <p className="text-sm text-gray-600 mt-2">
        Selected date: <span className="font-medium">{selectedDate.toDateString()}</span>
      </p>
    </div>

    <Link
      to={`/booking/${psychologist.id}`}
      className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700 transition"
    >
      Book Appointment
    </Link>
  </div>
  );
}