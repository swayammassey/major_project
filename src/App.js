function StatCard({ label, value, sublabel }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-medium text-slate-600">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      {sublabel ? (
        <div className="mt-1 text-xs text-slate-500">{sublabel}</div>
      ) : null}
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-7xl">
        <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 md:block">
          <div className="text-lg font-semibold">Department Portal</div>
          <div className="mt-1 text-xs text-slate-500">Analytics & insights</div>

          <nav className="mt-6 space-y-1 text-sm">
            <button
              className="block w-full rounded-lg bg-slate-100 px-3 py-2 text-left font-medium"
              type="button"
            >
              Overview
            </button>
            <button
              className="block w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100"
              type="button"
            >
              Students
            </button>
            <button
              className="block w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100"
              type="button"
            >
              Faculty
            </button>
            <button
              className="block w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100"
              type="button"
            >
              Courses
            </button>
            <button
              className="block w-full rounded-lg px-3 py-2 text-left text-slate-700 hover:bg-slate-100"
              type="button"
            >
              Reports
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-8">
          <header className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Department Analytics Portal</h1>
              <p className="mt-1 text-sm text-slate-600">
                Track performance, engagement, and outcomes across your department.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">
                Export
              </button>
              <button className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800">
                New Report
              </button>
            </div>
          </header>

          <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Total Students" value="1,248" sublabel="+4.2% vs last term" />
            <StatCard label="Attendance" value="92%" sublabel="7-day average" />
            <StatCard label="Course Completion" value="86%" sublabel="This semester" />
            <StatCard label="Active Faculty" value="58" sublabel="Including visiting" />
          </section>

          <section className="mt-6 grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">Weekly Trend</div>
                <div className="text-xs text-slate-500">Placeholder chart</div>
              </div>
              <div className="mt-4 h-56 rounded-lg bg-slate-50" />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-sm font-semibold">Alerts</div>
              <div className="mt-3 space-y-3 text-sm">
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <div className="font-medium text-amber-900">Low attendance detected</div>
                  <div className="mt-1 text-xs text-amber-800">3 courses below 75% this week</div>
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                  <div className="font-medium text-emerald-900">Completion improving</div>
                  <div className="mt-1 text-xs text-emerald-800">+2.1% compared to last month</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
