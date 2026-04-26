import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Filter, GraduationCap, Search } from 'lucide-react';
import { students } from '../data/students';

function Pill({ children }) {
  return (
    <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
      {children}
    </span>
  );
}

function Initials({ name }) {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] || '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

function BatchTab({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm'
          : 'rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50'
      }
    >
      {label}
    </button>
  );
}

function StudentRow({ item, index, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full text-left transition-colors hover:bg-slate-50 focus:outline-none"
    >
      <div className="grid gap-3 px-4 py-4 sm:grid-cols-12 sm:items-center sm:gap-4">
        <div className="text-xs font-semibold tabular-nums text-slate-500 sm:col-span-1">{index + 1}</div>

        <div className="flex items-center gap-3 sm:col-span-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 text-xs font-semibold text-white">
            <Initials name={item.name} />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-900 sm:text-base">{item.name}</div>
            <div className="mt-0.5 text-xs font-medium text-slate-600">{item.rollNo}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 sm:col-span-3 sm:justify-end">
          <Pill>Year {item.year}</Pill>
          <Pill>{item.section}</Pill>
        </div>

        <div className="flex items-center justify-between sm:col-span-2 sm:justify-end">
          <div className="hidden items-center gap-2 text-xs font-medium text-slate-600 sm:flex">
            <GraduationCap className="h-4 w-4 text-slate-500" />
            Profile
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
            View
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </button>
  );
}

export default function StudentsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [batch, setBatch] = useState('2022-2026');
  const [year, setYear] = useState('All');
  const [section, setSection] = useState('All');

  const batches = useMemo(
    () => [
      { id: '2022-2026', label: '2022–2026 Batch', year: '4' },
      { id: '2023-2027', label: '2023–2027 Batch', year: '3' },
      { id: '2024-2028', label: '2024–2028 Batch', year: '2' },
    ],
    []
  );

  const years = useMemo(() => {
    const set = new Set(students.map((s) => String(s.year)));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const sections = useMemo(() => {
    const set = new Set(students.map((s) => s.section));
    return ['All', ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const batchYear = batches.find((b) => b.id === batch)?.year;
    const effectiveYear = batchYear || year;

    return students
      .filter((s) => (effectiveYear === 'All' ? true : String(s.year) === effectiveYear))
      .filter((s) => (section === 'All' ? true : s.section === section))
      .filter((s) => {
        if (!q) return true;
        return s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q) || s.section.toLowerCase().includes(q);
      });
  }, [query, batch, batches, year, section]);

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">Students</h1>
          <p className="mt-1 text-sm text-slate-600">Browse student profiles by year, section, and roll number.</p>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-wrap gap-2">
            {batches.map((b) => (
              <BatchTab key={b.id} label={b.label} active={b.id === batch} onClick={() => setBatch(b.id)} />
            ))}
          </div>
          <div className="mt-3 text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span> students
            {section !== 'All' ? (
              <>
                {' '}
                in <span className="font-semibold text-slate-900">{section}</span>
              </>
            ) : null}
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-12 sm:items-center sm:p-5">
          <div className="sm:col-span-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or roll number..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          <div className="sm:col-span-3">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50">
                <Filter className="h-4 w-4 text-slate-600" />
              </div>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                disabled
                className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y === 'All' ? 'All Years' : `Year ${y}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-3">
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
            >
              {sections.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Sections' : s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="hidden grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600 sm:grid">
            <div className="col-span-1">S.No</div>
            <div className="col-span-6">Student</div>
            <div className="col-span-3 text-right">Year / Section</div>
            <div className="col-span-2 text-right">Profile</div>
          </div>

          <div className="divide-y divide-slate-200">
            {filtered.map((s, idx) => (
              <StudentRow key={s.id} item={s} index={idx} onOpen={() => navigate(`/students/${s.id}`)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
