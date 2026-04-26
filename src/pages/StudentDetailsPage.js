import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  Code,
  ExternalLink,
  Globe,
  GraduationCap,
  Link as LinkIcon,
  Trophy,
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

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

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-slate-600">{label}</div>
        <Icon className="h-4 w-4 text-slate-500" />
      </div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
    </div>
  );
}

function LinkButton({ href, icon: Icon, label }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-3 text-sm font-semibold text-blue-600 ring-1 ring-slate-200 hover:bg-slate-100"
    >
      <span className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      <LinkIcon className="h-4 w-4 text-slate-400" />
    </a>
  );
}

export default function StudentDetailsPage() {
  const { id } = useParams();
  const { studentRecords } = useAdminData();

  const profile = useMemo(() => studentRecords.find((student) => student.id === id), [id, studentRecords]);

  if (!profile) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="text-xl font-semibold text-slate-900">Student not found</div>
          <div className="mt-2 text-sm text-slate-600">The profile you are looking for does not exist.</div>
          <Link to="/students" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
            <ArrowLeft className="h-4 w-4" />
            Back to Students
          </Link>
        </div>
      </div>
    );
  }

  const stats = {
    certifications: profile.certifications?.length || 0,
    participations: profile.participations?.length || 0,
    projects: profile.projects?.length || 0,
  };

  return (
    <div className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to="/students" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
          <ArrowLeft className="h-4 w-4" />
          Back to Students
        </Link>

        <div className="mt-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-blue-500 text-xl font-semibold text-white">
                <Initials name={profile.name} />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-slate-900">{profile.name}</h1>
                <div className="mt-1 text-sm font-medium text-slate-600">{profile.rollNo}</div>
                <div className="mt-1 text-sm font-semibold text-emerald-700">Year {profile.year} • {profile.section}</div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Pill>{profile.branch}</Pill>
                  <Pill>{profile.section}</Pill>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:w-96">
              <LinkButton href={profile.links?.github} icon={Code} label="GitHub" />
              <LinkButton href={profile.links?.linkedin} icon={ExternalLink} label="LinkedIn" />
              <LinkButton href={profile.links?.leetcode} icon={Trophy} label="LeetCode" />
              <LinkButton href={profile.links?.portfolio} icon={Globe} label="Portfolio" />
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <Stat icon={BadgeCheck} label="Certifications" value={stats.certifications} />
            <Stat icon={Award} label="Participation" value={stats.participations} />
            <Stat icon={GraduationCap} label="Projects" value={stats.projects} />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-xl font-semibold text-slate-900">Certifications</div>
                {profile.certifications?.length ? (
                  <div className="mt-4 space-y-3">
                    {profile.certifications.map((c) => (
                      <div key={`${c.title}-${c.issuer}`} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                        <div className="text-sm font-semibold text-slate-900">{c.title}</div>
                        <div className="mt-1 text-xs text-slate-600">
                          {c.issuer}{c.year ? ` • ${c.year}` : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 text-sm text-slate-600">Certifications will be updated soon.</div>
                )}
              </div>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-xl font-semibold text-slate-900">Participation</div>
                {profile.participations?.length ? (
                  <div className="mt-4 space-y-3">
                    {profile.participations.map((p) => (
                      <div key={`${p.event}-${p.year}`} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                        <div className="text-sm font-semibold text-slate-900">{p.event}</div>
                        <div className="mt-1 text-xs text-slate-600">
                          {p.role}{p.year ? ` • ${p.year}` : ''}{p.achievement ? ` • ${p.achievement}` : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-3 text-sm text-slate-600">Participation details will be updated soon.</div>
                )}
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="space-y-6 lg:sticky lg:top-24">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-xl font-semibold text-slate-900">Skills</div>
                  {profile.skills?.length ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {profile.skills.map((s) => (
                        <Pill key={s}>{s}</Pill>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-slate-600">Skills will be updated soon.</div>
                  )}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="text-xl font-semibold text-slate-900">Projects</div>
                  {profile.projects?.length ? (
                    <div className="mt-4 space-y-3">
                      {profile.projects.map((p) => (
                        <div key={p.title} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                          <div className="text-sm font-semibold text-slate-900">{p.title}</div>
                          <div className="mt-1 text-xs text-slate-600">{p.description}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 text-sm text-slate-600">Projects will be updated soon.</div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
