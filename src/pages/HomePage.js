import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  TrendingUp,
  Users,
  Briefcase,
  BadgeCheck,
  Megaphone,
} from 'lucide-react';
import { department } from '../data/department';
import { useAdminData } from '../context/AdminDataContext';

function GradientStatCard({ icon: Icon, label, value, sublabel, gradient }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl p-5 text-white shadow-lg ${gradient}`}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/30" />
        <div className="absolute -bottom-14 -left-14 h-52 w-52 rounded-full bg-white/20" />
      </div>
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 p-2">
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-right">
          <div className="text-3xl font-semibold leading-none">{value}</div>
        </div>
      </div>
      <div className="relative mt-4">
        <div className="text-sm font-semibold">{label}</div>
        <div className="mt-1 text-xs text-white/80">{sublabel}</div>
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, value, label }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-50 p-2">
        <Icon className="h-6 w-6 text-blue-600" />
      </div>
      <div>
        <div className="text-xl font-semibold text-slate-900">{value}</div>
        <div className="text-xs text-slate-600">{label}</div>
      </div>
    </div>
  );
}

function SectionHeader({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
        {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
      </div>
      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          {actionLabel}
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

function StudentTableRow({ rank, name, id, year, cgpa, skills, badgeCount }) {
  const rankColor = rank <= 3 ? 'text-blue-700' : 'text-slate-700';
  return (
    <tr className="border-t border-slate-100">
      <td className={`px-3 py-3 text-sm font-semibold ${rankColor}`}>#{rank}</td>
      <td className="px-3 py-3">
        <div className="font-semibold text-slate-900">{name}</div>
        <div className="text-xs text-slate-500">{id}</div>
      </td>
      <td className="px-3 py-3 text-sm text-slate-700">Year {year}</td>
      <td className="px-3 py-3 text-sm font-semibold text-emerald-700">{cgpa}</td>
      <td className="px-3 py-3">
        <div className="flex flex-wrap gap-1.5">
          {skills.slice(0, 2).map((s) => (
            <span key={s} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">
              {s}
            </span>
          ))}
        </div>
      </td>
      <td className="px-3 py-3 text-xs text-slate-600">{badgeCount} achievements</td>
    </tr>
  );
}

function EventCard({ title, date, description, participants }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          <div className="mt-1 text-xs text-slate-500">{date}</div>
        </div>
        <ArrowRight className="h-4 w-4 text-blue-600" />
      </div>
      <p className="mt-3 line-clamp-3 text-sm text-slate-600">{description}</p>
      <div className="mt-4 text-xs text-slate-500">{participants} participants</div>
    </div>
  );
}

function AnnouncementCard({ type, title, date, body, accentColor }) {
  const accentClass =
    accentColor === 'red'
      ? 'bg-red-400'
      : accentColor === 'blue'
        ? 'bg-blue-400'
        : accentColor === 'emerald'
          ? 'bg-emerald-400'
          : 'bg-slate-300';

  const pillClass =
    accentColor === 'red'
      ? 'bg-red-50 text-red-700 ring-red-200'
      : accentColor === 'blue'
        ? 'bg-blue-50 text-blue-700 ring-blue-200'
        : accentColor === 'emerald'
          ? 'bg-emerald-50 text-emerald-700 ring-emerald-200'
          : 'bg-slate-50 text-slate-700 ring-slate-200';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className={`absolute left-0 top-0 h-full w-1 ${accentClass}`} />

      <div className="flex items-start justify-between gap-3 pl-1">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${pillClass}`}>{type}</span>
        <span className="whitespace-nowrap text-xs font-medium text-slate-500">{date}</span>
      </div>

      <div className="pl-1">
        <div className="mt-3 text-base font-semibold leading-snug text-slate-900">{title}</div>
        <p className="mt-2 line-clamp-4 text-sm leading-relaxed text-slate-600">{body}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const { announcements } = useAdminData();

  const students = useMemo(
    () => [
      {
        rank: 1,
        name: 'Ishita Verma',
        id: 'DS21002',
        year: 4,
        cgpa: '9.5',
        skills: ['Data Visualization', 'Statistical Analysis'],
        highlight: 3,
        badgeCount: 3,
      },
      {
        rank: 2,
        name: 'Karthik Kumar',
        id: 'DS23005',
        year: 2,
        cgpa: '9.3',
        skills: ['Python', 'Data Analysis', 'Pandas'],
        highlight: 3,
        badgeCount: 2,
      },
      {
        rank: 3,
        name: 'Aarav Patel',
        id: 'DS21001',
        year: 4,
        cgpa: '9.2',
        skills: ['Python', 'Machine Learning', 'TensorFlow'],
        highlight: 3,
        badgeCount: 3,
      },
      {
        rank: 4,
        name: 'Ananya Reddy',
        id: 'DS22020',
        year: 3,
        cgpa: '9.1',
        skills: ['Java', 'Big Data', 'Hadoop'],
        highlight: 4,
        badgeCount: 3,
      },
      {
        rank: 5,
        name: 'Vikram Singh',
        id: 'DS22008',
        year: 3,
        cgpa: '9.0',
        skills: ['Python', 'NLP', 'Transformers'],
        highlight: 3,
        badgeCount: 2,
      },
      {
        rank: 6,
        name: 'Arjun Kapoor',
        id: 'DS21015',
        year: 4,
        cgpa: '9.0',
        skills: ['Python', 'Time Series Analysis', 'ARIMA'],
        highlight: 3,
        badgeCount: 3,
      },
    ],
    []
  );

  const latestAnnouncements = useMemo(() => announcements.slice(0, 3), [announcements]);

  const toneByType = (type) => {
    if (type === 'Exam') return 'red';
    if (type === 'Placement') return 'emerald';
    return 'blue';
  };

  return (
    <div className="bg-slate-50">
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-indigo-900 via-blue-700 to-teal-600" />
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)' , backgroundSize: '22px 22px' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-10 text-white sm:px-6 sm:pb-16 sm:pt-14 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Welcome to CSE – Data Science
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
              Empowering the next generation of data scientists and AI innovators through cutting-edge
              education and research.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/events')}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-white/90"
              >
                Explore Events
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/faculty')}
                className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/15"
              >
                Meet Our Faculty
              </button>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <GradientStatCard
              icon={Users}
              label="Total Students"
              value="320"
              sublabel="Across all years"
              gradient="bg-gradient-to-br from-blue-600 to-blue-700"
            />
            <GradientStatCard
              icon={CalendarDays}
              label="Events This Year"
              value="24"
              sublabel="Workshops & Hackathons"
              gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
            />
            <GradientStatCard
              icon={BookOpen}
              label="Research Publications"
              value="145"
              sublabel="By faculty & students"
              gradient="bg-gradient-to-br from-indigo-500 to-violet-600"
            />
            <GradientStatCard
              icon={TrendingUp}
              label="Placement Rate"
              value="92%"
              sublabel="Top companies"
              gradient="bg-gradient-to-br from-cyan-600 to-teal-700"
            />
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <MiniStat icon={BadgeCheck} value="27" label="Student Certifications" />
          <MiniStat icon={GraduationCap} value="22" label="Projects Completed" />
          <MiniStat icon={Briefcase} value="8" label="Students with Internships" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          <aside className="lg:col-span-4 lg:order-2" id="announcements">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold text-slate-900">Important Announcements</div>
                    <div className="mt-1 text-sm text-slate-600">Don't miss out on updates</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/announcements')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View All
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-5 space-y-4">
                  {latestAnnouncements.length ? (
                    latestAnnouncements.map((item) => (
                      <AnnouncementCard
                        key={item.id}
                        type={item.type}
                        title={item.title}
                        date={item.date}
                        body={item.summary}
                        accentColor={toneByType(item.type)}
                      />
                    ))
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                      No announcements published yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:order-1">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" id="overview">
              <div className="flex items-start gap-3">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 p-2 text-white">
                  <Megaphone className="h-7 w-7" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-slate-900">Department Overview</h2>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                    {department.overview}
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-slate-900">Industry Partnerships</div>
                  <div className="mt-2 text-sm text-slate-600">
                    Collaborations with Microsoft, Google, Amazon, and leading tech companies
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-slate-900">State-of-the-Art Labs</div>
                  <div className="mt-2 text-sm text-slate-600">
                    AI/ML Lab, Big Data Analytics Lab, High-Performance Computing Center
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-sm font-semibold text-slate-900">Research Focus</div>
                  <div className="mt-2 text-sm text-slate-600">
                    Deep Learning, NLP, Computer Vision, Healthcare Analytics, and IoT
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4" id="vision-mission">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="text-xl font-semibold text-slate-900">Vision</div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{department.vision}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <div className="text-xl font-semibold text-slate-900">Mission</div>
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                  {department.mission}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" id="peos">
              <div className="text-xl font-semibold text-slate-900">Program Educational Objectives (PEOs)</div>
              <div className="mt-4 space-y-3">
                {department.programEducationalObjectives.map((peo, idx) => (
                  <div key={peo} className="flex gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      {idx + 1}
                    </div>
                    <div className="text-sm leading-relaxed text-slate-700">{peo}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" id="pos">
              <div className="text-xl font-semibold text-slate-900">Programme Outcomes (POs)</div>
              <div className="mt-4 space-y-3">
                {department.programOutcomes.map((po) => (
                  <div key={po.id} className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-semibold text-slate-900">
                        {po.id}: {po.title}
                      </div>
                    </div>
                    <div className="mt-2 text-sm leading-relaxed text-slate-700">{po.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-14" id="top-students">
              <SectionHeader
                title="Top Performing Students"
                subtitle="Excellence in academics and beyond"
                actionLabel="View All Students"
                onAction={() => navigate('/students')}
              />

              <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800">
                  Student Merit Board
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead className="bg-white text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-3 py-3">Rank</th>
                        <th className="px-3 py-3">Student</th>
                        <th className="px-3 py-3">Year</th>
                        <th className="px-3 py-3">CGPA</th>
                        <th className="px-3 py-3">Top Skills</th>
                        <th className="px-3 py-3">Highlights</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((s) => (
                        <StudentTableRow key={s.id} {...s} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="mt-14 pb-14" id="events">
              <SectionHeader
                title="Upcoming Events"
                subtitle="Workshops, seminars and conferences"
                actionLabel="View All"
                onAction={() => navigate('/events')}
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <EventCard
                  title="Workshop"
                  date="Jan 15, 2025"
                  description="A comprehensive workshop on machine learning fundamentals, model evaluation, and hands-on labs."
                  participants={85}
                />
                <EventCard
                  title="Hackathon"
                  date="Feb 20, 2025"
                  description="24-hour hackathon focused on solving real-world data science problems with mentorship and prizes."
                  participants={120}
                />
                <EventCard
                  title="Expert Talk"
                  date="Mar 10, 2025"
                  description="Expert talk on latest trends in deep learning, including transformers and efficient fine-tuning."
                  participants={150}
                />
                <EventCard
                  title="Conference"
                  date="Apr 5, 2025"
                  description="Two-day conference on big data technologies including Hadoop, Spark, and cloud analytics."
                  participants={200}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
