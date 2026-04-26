import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Filter, GraduationCap, Search, Users, Sparkles, BarChart3 } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

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
    <tr className="border-t border-slate-100 hover:bg-slate-50">
      <td className="px-3 py-3 text-sm font-medium text-slate-600">{index + 1}</td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 text-[10px] font-semibold text-white">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt={item.name} className="h-full w-full rounded-full object-cover" />
            ) : (
              <Initials name={item.name} />
            )}
          </div>
          <span className="text-sm font-semibold text-slate-900">{item.name}</span>
        </div>
      </td>
      <td className="px-3 py-3 text-sm text-slate-700">{item.rollNo}</td>
      <td className="px-3 py-3 text-sm text-slate-700">Year {item.year}</td>
      <td className="px-3 py-3 text-sm text-slate-700">{item.section}</td>
      <td className="px-3 py-3 text-sm font-semibold text-emerald-700">{item.cgpa || '-'}</td>
      <td className="px-3 py-3 text-right">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          View
          <ArrowRight className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}

export default function StudentsPage() {
  const navigate = useNavigate();
  const { studentRecords } = useAdminData();
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
    const set = new Set(studentRecords.map((s) => String(s.year)));
    return ['All', ...Array.from(set).sort()];
  }, [studentRecords]);

  const sections = useMemo(() => {
    const set = new Set(studentRecords.map((s) => s.section));
    return ['All', ...Array.from(set).sort()];
  }, [studentRecords]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const batchYear = batches.find((b) => b.id === batch)?.year;
    const effectiveYear = batchYear || year;

    return studentRecords
      .filter((s) => (effectiveYear === 'All' ? true : String(s.year) === effectiveYear))
      .filter((s) => (section === 'All' ? true : s.section === section))
      .filter((s) => {
        if (!q) return true;
        return s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q) || s.section.toLowerCase().includes(q);
      });
  }, [query, batch, batches, year, section, studentRecords]);

  const stats = useMemo(() => {
    const withCgpa = filtered.filter((s) => Number(s.cgpa) > 0);
    const avgCgpa =
      withCgpa.length > 0
        ? (withCgpa.reduce((sum, s) => sum + Number(s.cgpa), 0) / withCgpa.length).toFixed(2)
        : 'N/A';
    return {
      total: filtered.length,
      sections: new Set(filtered.map((s) => s.section)).size,
      avgCgpa,
    };
  }, [filtered]);

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

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500">
              Students in View
              <Users className="h-4 w-4" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{stats.total}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500">
              Active Sections
              <GraduationCap className="h-4 w-4" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{stats.sections}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500">
              Average CGPA
              <BarChart3 className="h-4 w-4" />
            </div>
            <div className="mt-2 text-2xl font-semibold text-slate-900">{stats.avgCgpa}</div>
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
          <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              Student Directory
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-white text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-3 py-3">S.No</th>
                  <th className="px-3 py-3">Student Name</th>
                  <th className="px-3 py-3">Roll No</th>
                  <th className="px-3 py-3">Year</th>
                  <th className="px-3 py-3">Section</th>
                  <th className="px-3 py-3">CGPA</th>
                  <th className="px-3 py-3 text-right">Profile</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, idx) => (
                  <StudentRow key={s.id} item={s} index={idx} onOpen={() => navigate(`/students/${s.id}`)} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
