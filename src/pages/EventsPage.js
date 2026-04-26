import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, Filter, Search, Users } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

function CategoryPill({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-full px-4 py-2 text-sm font-semibold transition-all ' +
        (active
          ? 'bg-blue-600 text-white shadow-sm'
          : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50')
      }
    >
      {children}
    </button>
  );
}

function EventCard({ item, onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group w-full overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative h-36">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-blue-700 to-teal-600" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25">
            {item.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-lg font-semibold text-slate-900">{item.title}</div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-slate-500" />
                {item.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4 text-slate-500" />
                {item.participants} participants
              </span>
            </div>
          </div>

          <div className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-50 text-blue-600 ring-1 ring-slate-200 transition-colors group-hover:bg-blue-50 group-hover:text-blue-700">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 line-clamp-2 text-sm text-slate-600">{item.about}</div>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 4).map((t) => (
            <span key={t} className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
              {t}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default function EventsPage() {
  const navigate = useNavigate();
  const { eventRecords } = useAdminData();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(eventRecords.map((e) => e.category));
    return ['All', ...Array.from(set)];
  }, [eventRecords]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return eventRecords
      .filter((e) => (category === 'All' ? true : e.category === category))
      .filter((e) => {
        if (!q) return true;
        return (
          e.title.toLowerCase().includes(q) ||
          e.about.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
  }, [query, category, eventRecords]);

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Events</h1>
            <p className="mt-1 text-sm text-slate-600">
              Discover department workshops, hackathons, expert talks, and conferences.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-12 sm:items-center sm:p-5">
          <div className="sm:col-span-7">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events by name, tag..."
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {categories.map((c) => (
            <CategoryPill key={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </CategoryPill>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((e) => (
            <EventCard key={e.id} item={e} onOpen={() => navigate(`/events/${e.id}`)} />
          ))}
        </div>
      </div>
    </div>
  );
}
