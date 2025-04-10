import React from 'react';

export default function Filters({ filters, setFilters }) {
    return (
      <div className="bg-white p-4 rounded shadow-md space-y-4">
        <div>
          <label className="block mb-1 font-medium">Specialization</label>
          <select
            className="w-full border px-2 py-1 rounded"
            onChange={e => setFilters({ ...filters, specialization: e.target.value })}
          >
            <option value="">Any</option>
            <option value="Clinical Psychology">Clinical Psychology</option>
            <option value="Cognitive Behavioral Therapy">CBT</option>
            <option value="Family Therapy">Family Therapy</option>
            <option value="Child Psychology">Child Psychology</option>
            <option value="Relationship Counseling">Relationship Counseling</option>
          </select>
        </div>
  
        <div>
          <label className="block mb-1 font-medium">Language</label>
          <select
            className="w-full border px-2 py-1 rounded"
            onChange={e => setFilters({ ...filters, language: e.target.value })}
          >
            <option value="">Any</option>
            <option value="EN">English</option>
            <option value="RU">Russian</option>
            <option value="KG">Kyrgyz</option>
          </select>
        </div>
  
        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <select
            className="w-full border px-2 py-1 rounded"
            onChange={e => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="">Any</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
  
        <div>
          <label className="block mb-1 font-medium">Format</label>
          <select
            className="w-full border px-2 py-1 rounded"
            onChange={e => setFilters({ ...filters, format: e.target.value })}
          >
            <option value="">Any</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>
    );
  }