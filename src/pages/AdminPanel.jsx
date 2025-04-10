import { useState } from 'react';
import React from 'react';

const dummyUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    role: 'User',
    status: 'active'
  },
  {
    id: 2,
    name: 'Dr. Sarah Johnson',
    email: 'sarah@example.com',
    role: 'Psychologist',
    status: 'active'
  },
  {
    id: 3,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin',
    status: 'active'
  }
];

export default function AdminPanel() {
  const [users, setUsers] = useState(dummyUsers);

  const updateStatus = (id, action) => {
    const updated = users.map(user =>
      user.id === id
        ? {
            ...user,
            status: action === 'block' ? 'blocked' : 'active'
          }
        : user
    );
    setUsers(updated);
  };

  const handleDelete = (id) => {
    const updated = users.filter(user => user.id !== id);
    setUsers(updated);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Panel: Users Management</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Role</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2">
                  <span
                    className={`text-sm font-medium ${
                      user.status === 'active'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  {user.status === 'active' ? (
                    <button
                      onClick={() => updateStatus(user.id, 'block')}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => updateStatus(user.id, 'activate')}
                      className="text-green-600 text-sm hover:underline"
                    >
                      Activate
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-gray-500 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}