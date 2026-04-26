import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const navItemBase = 'px-3 py-2 text-sm font-medium transition-colors';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700">
            GC
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-slate-900">
              Geethanjali College of Engineering and Technology
            </div>
            <div className="text-xs font-medium text-emerald-700">CSE – Data Science Department</div>
          </div>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navItemBase} rounded-lg ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `${navItemBase} rounded-lg ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/faculty"
            className={({ isActive }) =>
              `${navItemBase} rounded-lg ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`
            }
          >
            Faculty
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive }) =>
              `${navItemBase} rounded-lg ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`
            }
          >
            Students
          </NavLink>
          <NavLink
            to="/announcements"
            className={({ isActive }) =>
              `${navItemBase} rounded-lg ${isActive ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`
            }
          >
            Announcements
          </NavLink>
        </nav>

        <button
          type="button"
          onClick={() => navigate('/admin')}
          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
        >
          Admin Login
        </button>
      </div>
    </header>
  );
}
