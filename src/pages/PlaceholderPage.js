import React from 'react';

export default function PlaceholderPage({ title }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
      <p className="mt-2 text-sm text-slate-600">This page will be implemented next.</p>
    </div>
  );
}
