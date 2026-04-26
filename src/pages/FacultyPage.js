import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, IdCard, Search, Users } from 'lucide-react';
import { faculty } from '../data/faculty';

function Pill({ children }) {
  return (
    <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
      {children}
    </span>
  );
}

function FacultyCard({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-semibold text-white">
              {item.name.split(' ').slice(-1)[0].slice(0, 1)}
            </div>
            <div className="min-w-0">
              <div className="truncate text-lg font-semibold text-slate-900">{item.name}</div>
              <div className="mt-1 text-sm font-medium text-slate-600">{item.designation}</div>
              <div className="mt-1 text-xs text-emerald-700">{item.department}</div>
            </div>
          </div>
          <div className="hidden rounded-2xl bg-slate-50 p-2 text-slate-700 ring-1 ring-slate-200 sm:block">
            <Users className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Pill>{item.designation}</Pill>
          <Pill>{item.qualification}</Pill>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
          <IdCard className="h-4 w-4 text-slate-500" />
          <span className="truncate">Faculty Registration ID: {item.facultyRegId}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-5 py-3">
        <div className="text-xs font-medium text-slate-600">Click to view profile</div>
        <div className="text-xs font-semibold text-blue-600 group-hover:text-blue-700">View profile</div>
      </div>
    </button>
  );
}

export default function FacultyPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [designation, setDesignation] = useState('All');

  const designations = useMemo(() => {
    const set = new Set(faculty.map((f) => f.designation));
    return ['All', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faculty
      .filter((f) => (designation === 'All' ? true : f.designation === designation))
      .filter((f) => {
        if (!q) return true;
        return (
          f.name.toLowerCase().includes(q) ||
          f.designation.toLowerCase().includes(q) ||
          f.expertise.some((e) => e.toLowerCase().includes(q))
        );
      });
  }, [query, designation]);

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Faculty</h1>
            <p className="mt-1 text-sm text-slate-600">Meet the department faculty and explore their profiles.</p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-12 sm:items-center sm:p-5">
          <div className="sm:col-span-7">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, expertise..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="sm:col-span-5">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50">
                <Filter className="h-4 w-4 text-slate-600" />
              </div>
              <select
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              >
                {designations.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((f) => (
            <FacultyCard key={f.id} item={f} onOpen={() => navigate(`/faculty/${f.id}`)} />
          ))}
        </div>
      </div>
    </div>
  );
}
