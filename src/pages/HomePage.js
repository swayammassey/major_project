import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  GraduationCap,
  TrendingUp,
  Users,
  Award,
  Briefcase,
  BadgeCheck,
  Megaphone,
} from 'lucide-react';

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

function StudentCard({ rank, name, id, year, cgpa, skills, highlight, badgeCount }) {
  const rankColor = rank === 1 ? 'bg-amber-500' : rank === 2 ? 'bg-slate-400' : 'bg-orange-500';

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 text-lg font-semibold text-white">
            {name.slice(0, 1).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-slate-900">{name}</div>
            <div className="text-xs text-slate-500">
              {id} • Year {year}
            </div>
          </div>
        </div>

        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white ${rankColor}`}>
          #{rank}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 text-sm">
          <TrendingUp className="h-4 w-4 text-emerald-600" />
          <span className="text-slate-600">CGPA:</span>
          <span className="font-semibold text-emerald-700">{cgpa}</span>
        </div>
        <div className="text-xs text-slate-500">{badgeCount} </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-blue-600">
            {s}
          </span>
        ))}
        {highlight ? (
          <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">+{highlight}</span>
        ) : null}
      </div>

      <div className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500">
        <Award className="h-3.5 w-3.5 text-amber-500" />
        {badgeCount > 2 ? 'Research Paper Published in Springer' : 'Dean\'s list / awards'}
      </div>
    </div>
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

function AnnouncementCard({ type, title, date, body, accent }) {
  return (
    <div className={`rounded-2xl border bg-white p-5 shadow-sm ${accent}`}>
      <div className="flex items-start justify-between">
        <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">{type}</span>
        <span className="text-xs text-slate-500">{date}</span>
      </div>
      <div className="mt-3 text-lg font-semibold text-slate-900">{title}</div>
      <p className="mt-2 text-sm text-slate-600">{body}</p>
    </div>
  );
}

export default function HomePage() {
  const navigate = useNavigate();

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

  return (
    <div className="bg-slate-50">
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-indigo-900 via-blue-700 to-teal-600" />
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)' , backgroundSize: '22px 22px' }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-10 text-white sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome to CSE – Data Science
            </h1>
            <p className="mt-4 text-base text-white/90 sm:text-lg">
              Empowering the next generation of data scientists and AI innovators through cutting-edge
              education and research.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate('/events')}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-white/90"
              >
                Explore Events
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/faculty')}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/15"
              >
                Meet Our Faculty
              </button>
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
        </div>
      </section>

      <section className="mx-auto -mt-8 max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <MiniStat icon={BadgeCheck} value="27" label="Student Certifications" />
          <MiniStat icon={GraduationCap} value="22" label="Projects Completed" />
          <MiniStat icon={Briefcase} value="8" label="Students with Internships" />
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" id="overview">
          <div className="flex items-start gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 p-2 text-white">
              <Megaphone className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Department Overview</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                The Department of Computer Science and Engineering - Data Science at Geethanjali College of
                Engineering and Technology is committed to excellence in education, research, and
                innovation. Our curriculum is designed to equip students with strong foundations in
                computer science, mathematics, statistics, and specialized knowledge in machine learning,
                big data analytics, and artificial intelligence.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-600">
                We foster an environment that encourages critical thinking, problem-solving, and hands-on
                learning through industry collaborations, research projects, and cutting-edge
                laboratories. Our faculty members are experienced researchers and industry practitioners
                who mentor students to become future leaders in data science and analytics.
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

        <div className="mt-14" id="top-students">
          <SectionHeader
            title="Top Performing Students"
            subtitle="Excellence in academics and beyond"
            actionLabel="View All Students"
            onAction={() => navigate('/students')}
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {students.map((s) => (
              <StudentCard key={s.id} {...s} />
            ))}
          </div>
        </div>

        <div className="mt-14" id="events">
          <SectionHeader title="Upcoming Events" subtitle="Workshops, seminars and conferences" actionLabel="View All" onAction={() => navigate('/events')} />
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

        <div className="mt-14 pb-14" id="announcements">
          <SectionHeader
            title="Important Announcements"
            subtitle="Don't miss out on important updates"
            actionLabel="View All"
            onAction={() => navigate('/announcements')}
          />

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            <AnnouncementCard
              type="Exam"
              title="Mid-Term Examinations Schedule Released"
              date="Nov 15"
              body="The mid-term examination schedule for all years has been released. Exams will commence from December 1st, 2025. Check your portal for detailed timetable."
              accent="border-l-4 border-l-red-400"
            />
            <AnnouncementCard
              type="Event"
              title="Industry Expert Talk on AI/ML"
              date="Nov 16"
              body={
                'Guest lecture by Mr. Suresh Menon, Lead Data Scientist at Microsoft, on "Future of AI in Enterprise Applications". ' +
                'Date: November 25th, 2025 at 2:00 PM in Seminar Hall A.'
              }
              accent="border-l-4 border-l-blue-400"
            />
            <AnnouncementCard
              type="Placement"
              title="Campus Placement Drive - TCS"
              date="Nov 17"
              body="TCS will be conducting an on-campus placement drive for final year students. Eligible students should register by November 22nd. Package: 7-9 LPA."
              accent="border-l-4 border-l-emerald-400"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
