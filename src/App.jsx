import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Psychologists from './pages/Psychologists';
import PsychologistProfile from './pages/PsychologistProfile';
import Booking from './pages/Booking';
import UserDashboard from './pages/UserDashboard';
import PsychologistDashboard from './pages/PsychologistDashboard';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './pages/Register';
import PsychologistRegister from './pages/PsychologistRegister';
import AdminApplications from './pages/AdminApplications';
import AdminRoute from './pages/AdminRoute';
import 'react-calendar/dist/Calendar.css';

export default function App() {
  return (  
    <Router>
      <Header />
      <div className="min-h-screen px-4 pb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/psychologists" element={<Psychologists />} />
          <Route path="/psychologists/:id" element={<PsychologistProfile />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/account" element={<UserDashboard />} />
          <Route path="/psychologist/dashboard" element={<PsychologistDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/psychologist/register" element={<PsychologistRegister />} />
          
          <Route
            path="/admin/applications"
            element={
              <AdminRoute>
                <AdminApplications />
              </AdminRoute>
            }
          />

        </Routes>
      </div>
      <Footer />
    </Router>
  );
}