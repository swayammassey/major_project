import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export default function AdminLoginPage() {
  const { isAuthenticated, login, mockCredentials } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(mockCredentials.email);
  const [password, setPassword] = useState(mockCredentials.password);
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    const result = login({ email: email.trim(), password });
    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate('/admin/dashboard', { replace: true });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white shadow-lg">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <ShieldCheck className="h-4 w-4" />
            Admin Access
          </div>
          <h1 className="mt-4 text-3xl font-semibold leading-tight">Department Management Dashboard</h1>
          <p className="mt-3 text-sm text-blue-100">
            Secure portal to manage students, faculty, announcements, events, and operational content.
          </p>

          <div className="mt-8 space-y-3 rounded-2xl bg-white/10 p-5 text-sm">
            <div className="font-semibold">Mock Credentials</div>
            <div>
              Email: <span className="font-mono">{mockCredentials.email}</span>
            </div>
            <div>
              Password: <span className="font-mono">{mockCredentials.password}</span>
            </div>
            <p className="pt-2 text-xs text-blue-100">
              These are for development/demo only. Replace with backend auth before production.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">Sign in as Admin</h2>
            <p className="mt-1 text-sm text-slate-600">Use the provided mock credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                required
              />
            </label>

            {error ? <div className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <LockKeyhole className="h-4 w-4" />
              Login to Dashboard
            </button>
          </form>

          <div className="mt-5 text-sm text-slate-600">
            Need to go back?{' '}
            <Link to="/" className="font-semibold text-blue-600 hover:text-blue-700">
              Return to website
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
