import { useState } from 'react';
import React from 'react';

const dummyRequests = [
  {
    id: 1,
    clientName: 'John Smith',
    date: '2025-04-12',
    time: '13:00',
    status: 'Pending',
    comment: '',
    description: ''
  },
  {
    id: 2,
    clientName: 'Maria Ivanova',
    date: '2025-04-14',
    time: '10:30',
    status: 'Confirmed',
    comment: 'Need help with anxiety.',
    description: ''
  }
];

export default function PsychologistDashboard() {
  const [requests, setRequests] = useState(dummyRequests);

  const updateStatus = (id, newStatus) => {
    const updated = requests.map(r =>
      r.id === id ? { ...r, status: newStatus } : r
    );
    setRequests(updated);
  };

  const updateDescription = (id, newText) => {
    const updated = requests.map(r =>
      r.id === id ? { ...r, description: newText } : r
    );
    setRequests(updated);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Appointment Requests</h1>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        <div className="space-y-4">
          {requests.map(request => (
            <div key={request.id} className="border rounded p-4 bg-white shadow">
              <p className="font-semibold text-lg mb-1">{request.clientName}</p>
              <p className="text-sm text-gray-600">
                {request.date} at {request.time}
              </p>
              <p className="text-sm font-medium mt-1">
                Status:{' '}
                <span
                  className={`${
                    request.status === 'Confirmed'
                      ? 'text-green-600'
                      : request.status === 'Cancelled'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}
                >
                  {request.status}
                </span>
              </p>

              {request.comment && (
                <p className="text-sm mt-1 italic text-gray-700">
                  Client Comment: {request.comment}
                </p>
              )}

              {request.status === 'Pending' && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => updateStatus(request.id, 'Confirmed')}
                    className="text-green-600 hover:underline text-sm"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(request.id, 'Cancelled')}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Decline
                  </button>
                </div>
              )}

              {request.status === 'Confirmed' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">
                    Description (after consultation)
                  </label>
                  <textarea
                    className="w-full border px-3 py-2 rounded"
                    rows="3"
                    value={request.description}
                    onChange={e => updateDescription(request.id, e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}