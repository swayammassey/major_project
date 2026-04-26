import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Users,
  User,
  ClipboardList,
  BadgeCheck,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

function Progress({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <div className="text-slate-600">{label}</div>
        <div className="font-semibold text-blue-600">{value}%</div>
      </div>
      <div className="mt-2 h-2 rounded-full bg-slate-200">
        <div className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-emerald-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <div className="text-slate-600">{label}</div>
      <div className="font-semibold text-slate-900">{value}</div>
    </div>
  );
}

export default function EventDetailsPage() {
  const { id } = useParams();
  const { eventRecords } = useAdminData();

  const event = useMemo(() => eventRecords.find((item) => item.id === id), [id, eventRecords]);

  if (!event) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-xl font-semibold text-slate-900">Event not found</div>
          <div className="mt-2 text-sm text-slate-600">The event you are looking for does not exist.</div>
          <Link to="/events" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4" />
          Back to Events
        </Link>

        <div className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-sm">
          <div className="p-8 sm:p-10">
            <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold ring-1 ring-white/25">
              {event.category}
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{event.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90">
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                {event.date}
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="h-4 w-4" />
                {event.participants} Participants
              </span>
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                Coordinated by {event.coordinator.name}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="text-xl font-semibold text-slate-900">About This Event</div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">{event.about}</p>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="text-xl font-semibold text-slate-900">Key Outcomes & Highlights</div>
              <div className="mt-4 space-y-3">
                {event.highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div>{h}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="text-xl font-semibold text-slate-900">Event Timeline</div>
              <div className="mt-6 space-y-6">
                {event.timeline.map((t, idx) => (
                  <div key={t.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="h-3 w-3 rounded-full bg-blue-600" />
                      {idx < event.timeline.length - 1 ? (
                        <div className="mt-2 h-full w-px bg-blue-200" />
                      ) : null}
                    </div>
                    <div className="pb-2">
                      <div className="text-xs font-semibold text-blue-600">{t.label}</div>
                      <div className="mt-1 font-semibold text-slate-900">{t.title}</div>
                      <div className="mt-1 text-sm text-slate-600">{t.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="space-y-6 lg:sticky lg:top-24">
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50 to-emerald-50 p-6 shadow-sm">
                <div className="text-lg font-semibold text-slate-900">Event Information</div>
                <div className="mt-4 space-y-3">
                  <InfoRow label="Category" value={event.category} />
                  <InfoRow label="Date" value={event.date} />
                  <InfoRow label="Participants" value={event.participants} />
                  <InfoRow label="Year" value={event.year} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-lg font-semibold text-slate-900">Event Coordinator</div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-semibold text-white">
                    {event.coordinator.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{event.coordinator.name}</div>
                    <div className="text-sm text-slate-600">{event.coordinator.role}</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-lg font-semibold text-slate-900">Participation</div>
                <div className="mt-4 space-y-4">
                  <Progress label="Attendance Rate" value={event.participation.attendanceRate} />
                  <Progress label="Satisfaction Rate" value={event.participation.satisfactionRate} />
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Register Interest</div>
                    <div className="mt-1 text-sm text-slate-600">We'll notify you about updates.</div>
                  </div>
                  <ClipboardList className="h-5 w-5 text-slate-500" />
                </div>
                <button
                  type="button"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  <BadgeCheck className="h-4 w-4" />
                  Register
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
