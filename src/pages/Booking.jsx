import { useParams } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';

const dummyPsychologists = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Clinical Psychology',
    format: 'Online'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Cognitive Behavioral Therapy',
    format: 'Offline'
  }
];

export default function Booking() {
  const { id } = useParams();
  const psychologist = dummyPsychologists.find(p => p.id === Number(id));

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!psychologist) {
    return <p className="p-6 text-center">Psychologist not found.</p>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Здесь можно будет отправить данные на сервер
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold mb-4 text-indigo-700">Confirm your booking</h1>

  <div className="mb-6">
    <p className="font-semibold text-lg">{psychologist.name}</p>
    <p className="text-gray-600">{psychologist.specialization}</p>
    <p className="text-sm text-gray-600">Format: {psychologist.format}</p>
  </div>

  <form onSubmit={handleSubmit} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
      <input
        type="date"
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
        value={date}
        onChange={e => setDate(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
      <input
        type="time"
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        required
        value={time}
        onChange={e => setTime(e.target.value)}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Additional comments</label>
      <textarea
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
        rows="3"
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="(Optional)"
      />
    </div>

    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
    >
      Confirm Booking
    </button>
  </form>
</div>
  );
}