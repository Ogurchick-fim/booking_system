import { use, useEffect, useState } from 'react';
import { supabase } from '../supabase';

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from('psychologist_applications')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (!error) setApplications(data);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    console.log('Applications fetched:', applications);

  },[applications]);
  const updateStatus = async (id, status, interview_link = null) => {
    const { error } = await supabase
      .from('psychologist_applications')
      .update({ status, interview_link })
      .eq('id', id);

    if (!error) fetchApplications();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Psychologist Applications</h1>
      <div className="space-y-4">
        {applications.map((app) => (
          <div key={app.id} className="border rounded-lg p-4 shadow bg-white">
            <p><strong>{app.name} {app.surname}</strong> | {app.email}</p>
            <p className="text-sm text-gray-600">Status: <span className="font-semibold">{app.status}</span></p>
            <p>Birth: {app.birth} | Country: {app.country}</p>
            <p className="text-sm">Skills: {app.skills}</p>
            <p className="text-sm italic mb-2">"{app.description}"</p>
            <div className="flex gap-4 mb-2">
              {app.cv_url && (
                <a
                  href={`https://tmhuruxjbvgfzvckhinw.supabase.co/storage/v1/object/public/applications/${app.cv_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline"
                >
                  CV
                </a>
              )}
              {app.cert_url && (
                <a
                  href={`https://tmhuruxjbvgfzvckhinw.supabase.co/storage/v1/object/public/applications/${app.cert_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 underline"
                >
                  Certificate
                </a>
              )}
            </div>

            <div className="flex gap-3 items-center mt-2">
              <button onClick={() => updateStatus(app.id, 'approved')} className="px-3 py-1 bg-green-600 text-white rounded text-sm">Approve</button>
              <button onClick={() => updateStatus(app.id, 'rejected')} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Reject</button>
              <button
                onClick={() => {
                  const link = prompt('Enter Google Meet interview link:');
                  if (link) updateStatus(app.id, 'interview', link);
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              >
                Schedule Interview
              </button>
              {app.interview_link && (
                <a
                  href={app.interview_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline text-sm"
                >
                  Join Interview
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}