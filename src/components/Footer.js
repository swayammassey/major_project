import React from 'react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-slate-700 bg-[#0B1F4D] text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="flex items-start gap-3">
          <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white">
            <img
              src="/logo.png"
              alt="Department logo"
              className="h-full w-full object-contain p-1.5"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="text-sm font-semibold">CSE - Data Science Department</div>
            <div className="mt-1 text-xs text-slate-300">
              Geethanjali College of Engineering and Technology
            </div>
          </div>
        </div>

        <div>
          <div className="text-sm font-semibold">Contact</div>
          <div className="mt-2 space-y-1 text-xs text-slate-300">
            <div>Email: cse-ds@gcet.edu</div>
            <div>Phone: +91-00000-00000</div>
            <div>Campus: Block C, Hyderabad</div>
          </div>
        </div>

        <div className="lg:text-right">
          <div className="text-sm font-semibold">Department Portal</div>
          <div className="mt-2 text-xs text-slate-300">
            Events, announcements, placements, achievements, and academic profiles.
          </div>
          <div className="mt-3 text-xs text-slate-400">© {year} CSE - Data Science. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
