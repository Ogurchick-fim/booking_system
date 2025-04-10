
import PsychologistCard from '../components/PsychologistCard';
import React from 'react';

const popularPsychologists = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Clinical Psychology',
    format: 'Online',
    languages: ['EN', 'RU']
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Cognitive Behavioral Therapy',
    format: 'Offline',
    languages: ['EN', 'KG']
  },
  {
    id: 3,
    name: 'Dr. Emma Williams',
    specialization: 'Family Therapy',
    format: 'Online',
    languages: ['EN', 'RU', 'KG']
  }
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-indigo-700 text-white text-center px-6 py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find your psychologist</h1>
        <p className="text-lg mb-8">Fast. Comfortable. For free.</p>

        <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search by name or specialization"
            className="w-full md:w-[400px] px-4 py-2 rounded border border-white bg-transparent placeholder-white text-white focus:outline-none"
          />
          <button className="bg-white text-indigo-700 font-medium px-6 py-2 rounded hover:bg-gray-200 transition">
            Find
          </button>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">How it works</h2>
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            { step: 1, color: 'bg-green-100', title: 'Find a psychologist', text: 'Browse through our verified specialists and choose the one that suits you best' },
            { step: 2, color: 'bg-blue-100', title: 'Book an appointment', text: 'Choose a convenient time and format for your consultation' },
            { step: 3, color: 'bg-purple-100', title: 'Get help', text: 'Connect with your specialist and start your journey to better mental health' }
          ].map((step) => (
            <div key={step.step}>
              <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center text-lg font-bold ${step.color}`}>
                {step.step}
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular psychologists */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">Popular psychologists</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {popularPsychologists.map((psych) => (
            <PsychologistCard key={psych.id} psychologist={psych} />
          ))}
        </div>
      </section>
    </div>
  );
}