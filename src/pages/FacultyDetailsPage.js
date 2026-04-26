import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarClock,
  Link as LinkIcon,
  GraduationCap,
  IdCard,
} from 'lucide-react';
import { getFacultyById } from '../data/faculty';

function Pill({ children }) {
  return (
    <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
      {children}
    </span>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-50 ring-1 ring-slate-200">
        <Icon className="h-4 w-4 text-slate-600" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium text-slate-500">{label}</div>
        <div className="mt-1 font-semibold text-slate-900">{value}</div>
      </div>
    </div>
  );
}

export default function FacultyDetailsPage() {
  const { id } = useParams();

  const profile = useMemo(() => getFacultyById(id), [id]);

  if (!profile) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-xl font-semibold text-slate-900">Faculty not found</div>
          <div className="mt-2 text-sm text-slate-600">The profile you are looking for does not exist.</div>
          <Link to="/faculty" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Faculty
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/faculty" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4" />
          Back to Faculty
        </Link>

        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-2xl font-semibold text-white">
                {profile.name.split(' ').slice(-1)[0].slice(0, 1)}
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-slate-900">{profile.name}</h1>
                <div className="mt-1 text-sm font-medium text-slate-600">{profile.designation}</div>
                <div className="mt-1 text-sm font-semibold text-emerald-700">{profile.department}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>{profile.qualification}</Pill>
                  <Pill>Faculty ID: {profile.facultyRegId}</Pill>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:w-96">
              <InfoRow icon={GraduationCap} label="Qualification" value={profile.qualification || '-'} />
              <InfoRow icon={IdCard} label="Faculty Registration ID" value={profile.facultyRegId || '-'} />
              <InfoRow icon={CalendarClock} label="Office hours" value={profile.officeHours || '—'} />
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-xl font-semibold text-slate-900">Profile</div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {profile.bio || 'Profile details will be updated soon.'}
                </p>
              </div>

              {profile.publications?.length ? (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-xl font-semibold text-slate-900">Publications</div>
                  <div className="mt-4 space-y-3">
                    {profile.publications.map((p) => (
                      <div key={p.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                        <div className="text-sm font-semibold text-slate-900">{p.title}</div>
                        <div className="mt-1 text-xs text-slate-600">
                          {p.venue} • {p.year}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="lg:col-span-4">
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-slate-900">Education</div>
                    <GraduationCap className="h-5 w-5 text-slate-500" />
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-slate-700">
                    {profile.education.map((e) => (
                      <div key={e} className="rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200">
                        {e}
                      </div>
                    ))}
                  </div>
                </div>

                {profile.links?.googleScholar || profile.links?.linkedin ? (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-slate-900">Links</div>
                      <LinkIcon className="h-5 w-5 text-slate-500" />
                    </div>
                    <div className="mt-4 space-y-2 text-sm">
                      {profile.links?.googleScholar ? (
                        <a
                          href={profile.links.googleScholar}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-2xl bg-slate-50 p-3 font-semibold text-blue-600 ring-1 ring-slate-200 hover:bg-slate-100"
                        >
                          Google Scholar
                        </a>
                      ) : null}
                      {profile.links?.linkedin ? (
                        <a
                          href={profile.links.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="block rounded-2xl bg-slate-50 p-3 font-semibold text-blue-600 ring-1 ring-slate-200 hover:bg-slate-100"
                        >
                          LinkedIn
                        </a>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
