import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabase';

export default function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const userName = user?.user_metadata?.name || user?.email;

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-indigo-700">PsyBooking</Link>

      <nav className="flex items-center gap-4">
        <Link to="/psychologists" className="text-gray-700 hover:text-indigo-600 font-medium">
          Psychologists
        </Link>

        <select className="border rounded px-2 py-1 text-sm">
          <option>EN</option>
          <option>RU</option>
          <option>KG</option>
        </select>

        {!user ? (
          <>
            <Link to="/login" className="text-indigo-600 hover:underline text-sm">
              Log In
            </Link>
            <Link to="/register" className="bg-indigo-600 text-white px-4 py-1.5 rounded text-sm">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/account"
              className="text-sm font-medium text-indigo-700 hover:underline"
            >
              {userName}
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Log Out
            </button>
          </>
        )}
      </nav>
    </header>
  );
}