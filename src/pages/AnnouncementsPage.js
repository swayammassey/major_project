import React, { useMemo, useState } from 'react';
import { ArrowRight, CalendarDays, CheckCircle2, Filter, GraduationCap, Search, Briefcase } from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

function Badge({ children, tone }) {
  const cls =
    tone === 'red'
      ? 'bg-red-50 text-red-700 ring-red-200'
      : tone === 'blue'
        ? 'bg-blue-50 text-blue-700 ring-blue-200'
        : tone === 'emerald'
          ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
          : 'bg-slate-50 text-slate-700 ring-slate-200';

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${cls}`}>
      {children}
    </span>
  );
}

function typeMeta(type) {
  if (type === 'Exam') return { tone: 'red', Icon: GraduationCap };
  if (type === 'Placement') return { tone: 'emerald', Icon: Briefcase };
  return { tone: 'blue', Icon: CalendarDays };
}

function AnnouncementListItem({ item, selected, onSelect }) {
  const { tone, Icon } = typeMeta(item.type);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={
        'w-full rounded-2xl border p-4 text-left shadow-sm transition-all hover:shadow-md ' +
        (selected
          ? 'border-blue-200 bg-blue-50/60'
          : 'border-slate-200 bg-white hover:border-slate-300')
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-50 p-2">
            <Icon className="h-5 w-5 text-slate-700" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone={tone}>{item.type}</Badge>
              {item.priority === 'High' ? <Badge tone="red">High</Badge> : null}
            </div>
            <div className="mt-2 line-clamp-2 text-sm font-semibold text-slate-900">{item.title}</div>
            <div className="mt-1 line-clamp-2 text-sm text-slate-600">{item.summary}</div>
          </div>
        </div>
        <div className="whitespace-nowrap text-xs font-medium text-slate-500">{item.date}</div>
      </div>
    </button>
  );
}

export default function AnnouncementsPage() {
  const { announcements } = useAdminData();
  const data = useMemo(() => announcements, [announcements]);

  const [query, setQuery] = useState('');
  const [type, setType] = useState('All');
  const [selectedId, setSelectedId] = useState('a1');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data
      .filter((d) => (type === 'All' ? true : d.type === type))
      .filter((d) => {
        if (!q) return true;
        return (
          d.title.toLowerCase().includes(q) ||
          d.summary.toLowerCase().includes(q) ||
          d.details.toLowerCase().includes(q)
        );
      });
  }, [data, query, type]);

  const selected = useMemo(() => filtered.find((f) => f.id === selectedId) || filtered[0], [filtered, selectedId]);

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900">Announcements</h1>
            <p className="mt-1 text-sm text-slate-600">
              Department notices, exams, events, placements, and important updates.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Updated regularly
          </div>
        </div>

        <div className="mt-6 grid gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-12 sm:items-center sm:p-5">
          <div className="sm:col-span-7">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search announcements..."
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
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-12 flex-1 rounded-2xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100"
              >
                <option value="All">All types</option>
                <option value="Exam">Exam</option>
                <option value="Event">Event</option>
                <option value="Placement">Placement</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="space-y-4">
              {filtered.length ? (
                filtered.map((item) => (
                  <AnnouncementListItem
                    key={item.id}
                    item={item}
                    selected={selected?.id === item.id}
                    onSelect={() => setSelectedId(item.id)}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
                  No announcements found.
                </div>
              )}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                {selected ? (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge tone={typeMeta(selected.type).tone}>{selected.type}</Badge>
                          {selected.priority === 'High' ? <Badge tone="red">High priority</Badge> : null}
                        </div>
                        <div className="mt-3 text-xl font-semibold leading-snug text-slate-900">
                          {selected.title}
                        </div>
                      </div>
                      <div className="whitespace-nowrap text-xs font-medium text-slate-500">{selected.date}</div>
                    </div>

                    <div className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                      {selected.details}
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                      >
                        {selected.actionLabel}
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        onClick={() => {
                          navigator.clipboard?.writeText(`${selected.title}\n${selected.details}`);
                        }}
                      >
                        Copy
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-slate-600">Select an announcement to view details.</div>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
