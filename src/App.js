import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<PlaceholderPage title="Events" />} />
        <Route path="/faculty" element={<PlaceholderPage title="Faculty" />} />
        <Route path="/students" element={<PlaceholderPage title="Students" />} />
        <Route path="/announcements" element={<PlaceholderPage title="Announcements" />} />
        <Route path="/admin" element={<PlaceholderPage title="Admin Login" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
