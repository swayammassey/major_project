import React, { useMemo, useState } from 'react';
import { faculty } from '../data/faculty';
import { students } from '../data/students';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAdminData } from '../context/AdminDataContext';

function StatCard({ title, value, subtitle }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-medium text-slate-500">{title}</div>
      <div className="mt-2 text-3xl font-semibold text-slate-900">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{subtitle}</div>
    </div>
  );
}

function SectionCard({ title, description, children, action }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function EditDrawer({ title, isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <button type="button" className="h-full flex-1 bg-black/30" onClick={onClose} aria-label="Close editor" />
      <div className="h-full w-full max-w-xl overflow-y-auto border-l border-slate-200 bg-white p-5 shadow-xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'students', label: 'Students' },
  { id: 'faculty', label: 'Faculty' },
  { id: 'events', label: 'Events' },
  { id: 'placements', label: 'Placements' },
  { id: 'achievements', label: 'Achievements' },
];

function DashboardTabs({ activeTab, setActiveTab }) {
  return (
    <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="flex min-w-max gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={
              'rounded-xl px-4 py-2 text-sm font-semibold transition-colors ' +
              (activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-700 hover:bg-slate-100')
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function DepartmentOverviewManager({ departmentProfile, updateDepartmentProfile }) {
  const [form, setForm] = useState(departmentProfile);

  const save = (event) => {
    event.preventDefault();
    updateDepartmentProfile({
      ...departmentProfile,
      ...form,
      establishedYear: Number(form.establishedYear) || departmentProfile.establishedYear,
      annualIntake: Number(form.annualIntake) || departmentProfile.annualIntake,
      hodExperienceYears: Number(form.hodExperienceYears) || departmentProfile.hodExperienceYears,
    });
  };

  return (
    <SectionCard
      title="Department Overview"
      description="Manage core department profile details shown for internal planning and public pages."
      action={<div className="text-xs font-semibold text-emerald-700">Saved in admin data</div>}
    >
      <div className="grid gap-4 lg:grid-cols-12">
        <form onSubmit={save} className="space-y-3 lg:col-span-8">
          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Identity & Contact</div>
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                value={form.name || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Department name"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.program || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, program: e.target.value }))}
                placeholder="Program"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.contactEmail || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, contactEmail: e.target.value }))}
                placeholder="Official email"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.contactPhone || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, contactPhone: e.target.value }))}
                placeholder="Contact phone"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.officeLocation || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, officeLocation: e.target.value }))}
                placeholder="Office location"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.sourceUrl || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, sourceUrl: e.target.value }))}
                placeholder="Department source URL"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Academic Snapshot</div>
            <div className="grid gap-2 sm:grid-cols-3">
              <input
                value={form.establishedYear || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, establishedYear: e.target.value }))}
                placeholder="Established year"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.annualIntake || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, annualIntake: e.target.value }))}
                placeholder="Annual intake"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.placementRate || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, placementRate: e.target.value }))}
                placeholder="Placement rate"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.hodName || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, hodName: e.target.value }))}
                placeholder="HOD name"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm sm:col-span-2"
              />
              <input
                value={form.hodExperienceYears || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, hodExperienceYears: e.target.value }))}
                placeholder="HOD experience (years)"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.accreditation || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, accreditation: e.target.value }))}
                placeholder="Accreditation"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm sm:col-span-3"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Narrative</div>
            <div className="space-y-2">
              <textarea
                value={form.overview || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, overview: e.target.value }))}
                placeholder="Department overview"
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <textarea
                value={form.vision || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, vision: e.target.value }))}
                placeholder="Vision statement"
                rows={3}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <textarea
                value={form.mission || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, mission: e.target.value }))}
                placeholder="Mission statement"
                rows={5}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button type="submit" className="w-full rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white">
            Save Department Overview
          </button>
        </form>

        <aside className="lg:col-span-4">
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quick KPIs</div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Established</span>
                  <span className="font-semibold text-slate-900">{form.establishedYear || '-'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Annual Intake</span>
                  <span className="font-semibold text-slate-900">{form.annualIntake || '-'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Placement Rate</span>
                  <span className="font-semibold text-slate-900">{form.placementRate || '-'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Accreditation</span>
                  <span className="font-semibold text-slate-900">{form.accreditation || '-'}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Leadership</div>
              <div className="mt-2 text-sm text-slate-700">{form.hodName || 'Not set'}</div>
              <div className="text-xs text-slate-500">Experience: {form.hodExperienceYears || '-'} years</div>
            </div>
          </div>
        </aside>
      </div>
    </SectionCard>
  );
}

function StudentManager({ studentRecords, setStudentRecords }) {
  const [query, setQuery] = useState('');
  const [batchFilter, setBatchFilter] = useState('All');
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [studentForm, setStudentForm] = useState({
    rollNo: '',
    name: '',
    section: '',
    year: '',
    branch: '',
    cgpa: '',
    imageUrl: '',
    skills: '',
    bio: '',
    github: '',
    linkedin: '',
    leetcode: '',
    portfolio: '',
  });

  const getBatchLabel = (rollNo) => {
    const match = String(rollNo || '').match(/^(\d{2})/);
    if (!match) return 'Unknown';
    const startYear = 2000 + Number(match[1]);
    if (Number.isNaN(startYear)) return 'Unknown';
    return `${startYear}-${startYear + 4}`;
  };

  const batches = useMemo(() => {
    const set = new Set(studentRecords.map((s) => getBatchLabel(s.rollNo)));
    return Array.from(set).sort();
  }, [studentRecords]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return studentRecords
      .filter((s) => (batchFilter === 'All' ? true : getBatchLabel(s.rollNo) === batchFilter))
      .filter(
        (s) =>
          !q ||
          s.name.toLowerCase().includes(q) ||
          s.rollNo.toLowerCase().includes(q) ||
          s.section.toLowerCase().includes(q)
      )
      .slice(0, 100);
  }, [query, batchFilter, studentRecords]);

  const openStudentEditor = (student) => {
    setEditingStudentId(student.id);
    setStudentForm({
      rollNo: student.rollNo || '',
      name: student.name || '',
      section: student.section || '',
      year: String(student.year || ''),
      branch: student.branch || '',
      cgpa: String(student.cgpa || ''),
      imageUrl: student.imageUrl || '',
      skills: Array.isArray(student.skills) ? student.skills.join(', ') : '',
      bio: student.bio || '',
      github: student.links?.github || '',
      linkedin: student.links?.linkedin || '',
      leetcode: student.links?.leetcode || '',
      portfolio: student.links?.portfolio || '',
    });
    setDragActive(false);
  };

  const applyImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setStudentForm((prev) => ({ ...prev, imageUrl: String(reader.result || '') }));
    };
    reader.readAsDataURL(file);
  };

  const saveStudentProfile = () => {
    if (!editingStudentId) return;
    setStudentRecords((prev) =>
      prev.map((s) =>
        s.id === editingStudentId
          ? {
              ...s,
              rollNo: studentForm.rollNo.trim() || s.rollNo,
              name: studentForm.name.trim(),
              section: studentForm.section.trim(),
              year: Number(studentForm.year) || s.year,
              branch: studentForm.branch.trim(),
              cgpa: studentForm.cgpa.trim(),
              imageUrl: studentForm.imageUrl.trim(),
              skills: studentForm.skills
                .split(',')
                .map((v) => v.trim())
                .filter(Boolean),
              bio: studentForm.bio.trim(),
              links: {
                ...s.links,
                github: studentForm.github.trim(),
                linkedin: studentForm.linkedin.trim(),
                leetcode: studentForm.leetcode.trim(),
                portfolio: studentForm.portfolio.trim(),
              },
            }
          : s
      )
    );
    setEditingStudentId(null);
    setDragActive(false);
  };

  return (
    <SectionCard
      title="Student Management"
      description="Search and review student records by name, roll number, and section."
      action={<button className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white">Add Student</button>}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or roll number"
        className="mb-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setBatchFilter('All')}
          className={
            'rounded-lg px-3 py-1.5 text-xs font-semibold ' +
            (batchFilter === 'All' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')
          }
        >
          All Batches
        </button>
        {batches.map((batch) => (
          <button
            key={batch}
            type="button"
            onClick={() => setBatchFilter(batch)}
            className={
              'rounded-lg px-3 py-1.5 text-xs font-semibold ' +
              (batchFilter === batch ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200')
            }
          >
            {batch}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-3 py-2">Batch</th>
              <th className="px-3 py-2">Roll No</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Year</th>
              <th className="px-3 py-2">Section</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((student) => (
              <tr key={student.id} className="border-t border-slate-100">
                <td className="px-3 py-2 text-slate-700">{getBatchLabel(student.rollNo)}</td>
                <td className="px-3 py-2 font-medium text-slate-800">{student.rollNo}</td>
                <td className="px-3 py-2 text-slate-700">{student.name}</td>
                <td className="px-3 py-2 text-slate-700">{student.year}</td>
                <td className="px-3 py-2 text-slate-700">{student.section}</td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => openStudentEditor(student)}
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditDrawer
        title="Edit Student Profile"
        isOpen={Boolean(editingStudentId)}
        onClose={() => {
          setEditingStudentId(null);
          setDragActive(false);
        }}
      >
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Profile Photo</div>
            <div
              className={
                'rounded-2xl border-2 border-dashed p-4 text-center transition-colors ' +
                (dragActive ? 'border-blue-400 bg-blue-50' : 'border-slate-300 bg-white')
              }
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                applyImageFile(e.dataTransfer.files?.[0]);
              }}
            >
              {studentForm.imageUrl ? (
                <div className="space-y-3">
                  <img
                    src={studentForm.imageUrl}
                    alt="Student profile preview"
                    className="mx-auto h-24 w-24 rounded-2xl object-cover shadow-sm"
                  />
                  <div className="flex justify-center gap-2">
                    <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      Replace
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => applyImageFile(e.target.files?.[0])}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => setStudentForm((prev) => ({ ...prev, imageUrl: '' }))}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-sm font-medium text-slate-700">Drag and drop student photo here</div>
                  <label className="mt-3 inline-block cursor-pointer rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => applyImageFile(e.target.files?.[0])}
                    />
                  </label>
                </div>
              )}
            </div>
            <input
              value={studentForm.imageUrl}
              onChange={(e) => setStudentForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="Or paste profile picture URL"
              className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Academic Profile</div>
            <div className="grid gap-2">
              <input
                value={studentForm.name}
                onChange={(e) => setStudentForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Student name"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={studentForm.rollNo}
                  onChange={(e) => setStudentForm((prev) => ({ ...prev, rollNo: e.target.value }))}
                  placeholder="Roll number"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  value={studentForm.cgpa}
                  onChange={(e) => setStudentForm((prev) => ({ ...prev, cgpa: e.target.value }))}
                  placeholder="CGPA"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  value={studentForm.year}
                  onChange={(e) => setStudentForm((prev) => ({ ...prev, year: e.target.value }))}
                  placeholder="Year"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  value={studentForm.section}
                  onChange={(e) => setStudentForm((prev) => ({ ...prev, section: e.target.value }))}
                  placeholder="Section"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  value={studentForm.branch}
                  onChange={(e) => setStudentForm((prev) => ({ ...prev, branch: e.target.value }))}
                  placeholder="Branch"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Skills & Links</div>
            <div className="grid gap-2">
              <input
                value={studentForm.skills}
                onChange={(e) => setStudentForm((prev) => ({ ...prev, skills: e.target.value }))}
                placeholder="Skills (comma separated)"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={studentForm.github}
                  onChange={(e) => setStudentForm((prev) => ({ ...prev, github: e.target.value }))}
                  placeholder="GitHub URL"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  value={studentForm.linkedin}
                  onChange={(e) => setStudentForm((prev) => ({ ...prev, linkedin: e.target.value }))}
                  placeholder="LinkedIn URL"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={studentForm.leetcode}
                  onChange={(e) => setStudentForm((prev) => ({ ...prev, leetcode: e.target.value }))}
                  placeholder="LeetCode URL"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  value={studentForm.portfolio}
                  onChange={(e) => setStudentForm((prev) => ({ ...prev, portfolio: e.target.value }))}
                  placeholder="Portfolio URL"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <textarea
                value={studentForm.bio}
                onChange={(e) => setStudentForm((prev) => ({ ...prev, bio: e.target.value }))}
                placeholder="Short bio / notes"
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={saveStudentProfile}
            className="w-full rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Save Student Profile
          </button>
        </div>
      </EditDrawer>
    </SectionCard>
  );
}

function FacultyManager({ facultyRecords, setFacultyRecords }) {
  const [query, setQuery] = useState('');
  const [editingFacultyId, setEditingFacultyId] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [facultyForm, setFacultyForm] = useState({
    name: '',
    designation: '',
    qualification: '',
    facultyRegId: '',
    email: '',
    phone: '',
    office: '',
    imageUrl: '',
    expertise: '',
    bio: '',
  });
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return facultyRecords;
    return facultyRecords.filter(
      (member) =>
        member.name.toLowerCase().includes(q) ||
        member.designation.toLowerCase().includes(q) ||
        String(member.facultyRegId || '')
          .toLowerCase()
          .includes(q)
    );
  }, [query, facultyRecords]);

  const openFacultyEditor = (member) => {
    setEditingFacultyId(member.id);
    setFacultyForm({
      name: member.name || '',
      designation: member.designation || '',
      qualification: member.qualification || '',
      facultyRegId: member.facultyRegId || '',
      email: member.email || '',
      phone: member.phone || '',
      office: member.office || '',
      imageUrl: member.imageUrl || '',
      expertise: Array.isArray(member.expertise) ? member.expertise.join(', ') : '',
      bio: member.bio || '',
    });
  };

  const saveFacultyProfile = () => {
    if (!editingFacultyId) return;
    setFacultyRecords((prev) =>
      prev.map((f) =>
        f.id === editingFacultyId
          ? {
              ...f,
              name: facultyForm.name.trim(),
              designation: facultyForm.designation.trim(),
              qualification: facultyForm.qualification.trim(),
              facultyRegId: facultyForm.facultyRegId.trim(),
              email: facultyForm.email.trim(),
              phone: facultyForm.phone.trim(),
              office: facultyForm.office.trim(),
              imageUrl: facultyForm.imageUrl.trim(),
              expertise: facultyForm.expertise
                .split(',')
                .map((v) => v.trim())
                .filter(Boolean),
              bio: facultyForm.bio.trim(),
            }
          : f
      )
    );
    setEditingFacultyId(null);
    setDragActive(false);
  };

  const applyImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFacultyForm((prev) => ({ ...prev, imageUrl: String(reader.result || '') }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (event) => {
    const file = event.target.files?.[0];
    applyImageFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    applyImageFile(file);
  };

  return (
    <SectionCard
      title="Faculty Management"
      description="Maintain faculty profiles, designations, and registration references."
      action={<button className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white">Add Faculty</button>}
    >
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by faculty name, designation, or reg ID"
        className="mb-3 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Designation</th>
              <th className="px-3 py-2">Qualification</th>
              <th className="px-3 py-2">Reg ID</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((member) => (
              <tr key={member.id} className="border-t border-slate-100 align-top">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-xl bg-slate-100">
                      {member.imageUrl ? (
                        <img src={member.imageUrl} alt={member.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs font-semibold text-slate-500">
                          {member.name?.slice(0, 1) || 'F'}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{member.name}</div>
                      {member.email ? <div className="text-xs text-slate-500">{member.email}</div> : null}
                    </div>
                  </div>
                </td>
                <td className="px-3 py-2 text-slate-700">{member.designation}</td>
                <td className="px-3 py-2 text-slate-700">{member.qualification}</td>
                <td className="px-3 py-2 text-slate-600">{member.facultyRegId || 'Not set'}</td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => openFacultyEditor(member)}
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs font-medium text-slate-700"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditDrawer
        title="Edit Faculty Profile"
        isOpen={Boolean(editingFacultyId)}
        onClose={() => {
          setEditingFacultyId(null);
          setDragActive(false);
        }}
      >
        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Profile Photo</div>
            <div
              className={
                'rounded-2xl border-2 border-dashed p-4 text-center transition-colors ' +
                (dragActive ? 'border-blue-400 bg-blue-50' : 'border-slate-300 bg-white')
              }
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDrop={handleDrop}
            >
              {facultyForm.imageUrl ? (
                <div className="space-y-3">
                  <img
                    src={facultyForm.imageUrl}
                    alt="Faculty profile preview"
                    className="mx-auto h-24 w-24 rounded-2xl object-cover shadow-sm"
                  />
                  <div className="flex justify-center gap-2">
                    <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50">
                      Replace
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
                    </label>
                    <button
                      type="button"
                      onClick={() => setFacultyForm((prev) => ({ ...prev, imageUrl: '' }))}
                      className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-sm font-medium text-slate-700">Drag and drop profile photo here</div>
                  <div className="mt-1 text-xs text-slate-500">or use upload / image URL below</div>
                  <label className="mt-3 inline-block cursor-pointer rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700">
                    Upload Photo
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
                  </label>
                </div>
              )}
            </div>
            <input
              value={facultyForm.imageUrl}
              onChange={(e) => setFacultyForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="Or paste profile picture URL"
              className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Basic Information</div>
            <div className="grid gap-2">
              <input
                value={facultyForm.name}
                onChange={(e) => setFacultyForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="Faculty name"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={facultyForm.designation}
                onChange={(e) => setFacultyForm((prev) => ({ ...prev, designation: e.target.value }))}
                placeholder="Designation"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={facultyForm.qualification}
                onChange={(e) => setFacultyForm((prev) => ({ ...prev, qualification: e.target.value }))}
                placeholder="Qualification"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={facultyForm.facultyRegId}
                  onChange={(e) => setFacultyForm((prev) => ({ ...prev, facultyRegId: e.target.value }))}
                  placeholder="Registration ID"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  value={facultyForm.office}
                  onChange={(e) => setFacultyForm((prev) => ({ ...prev, office: e.target.value }))}
                  placeholder="Office"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">Professional Details</div>
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  value={facultyForm.email}
                  onChange={(e) => setFacultyForm((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Email"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
                <input
                  value={facultyForm.phone}
                  onChange={(e) => setFacultyForm((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="Phone"
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <input
                value={facultyForm.expertise}
                onChange={(e) => setFacultyForm((prev) => ({ ...prev, expertise: e.target.value }))}
                placeholder="Expertise (comma separated)"
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <textarea
                value={facultyForm.bio}
                onChange={(e) => setFacultyForm((prev) => ({ ...prev, bio: e.target.value }))}
                placeholder="Short professional bio"
                rows={4}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={saveFacultyProfile}
            className="w-full rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Save Faculty Profile
          </button>
        </div>
      </EditDrawer>
    </SectionCard>
  );
}

function AnnouncementsManager() {
  const { announcements, updateAnnouncements, deleteAnnouncement } = useAdminData();
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [form, setForm] = useState({
    type: 'Event',
    priority: 'Normal',
    date: '',
    title: '',
    summary: '',
    details: '',
    actionLabel: 'View',
    imageUrl: '',
  });

  const addAnnouncement = (event) => {
    event.preventDefault();
    const trimmed = form.title.trim();
    if (!trimmed) return;
    const normalized = {
      id: editingId || `a-${Date.now()}`,
      type: form.type,
      priority: form.priority,
      date: form.date.trim() || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      title: trimmed,
      summary: form.summary.trim() || 'Added from admin dashboard.',
      details: form.details.trim() || `${trimmed}\n\nThis announcement was added from the admin dashboard.`,
      actionLabel: form.actionLabel.trim() || 'View',
      imageUrl: form.imageUrl.trim(),
    };

    if (editingId) {
      updateAnnouncements((prev) => prev.map((item) => (item.id === editingId ? normalized : item)));
    } else {
      updateAnnouncements((prev) => [normalized, ...prev]);
    }
    setForm({
      type: 'Event',
      priority: 'Normal',
      date: '',
      title: '',
      summary: '',
      details: '',
      actionLabel: 'View',
      imageUrl: '',
    });
    setEditingId(null);
    setDragActive(false);
  };

  const openEditor = (item) => {
    setEditingId(item.id);
    setForm({
      type: item.type || 'Event',
      priority: item.priority || 'Normal',
      date: item.date || '',
      title: item.title || '',
      summary: item.summary || '',
      details: item.details || '',
      actionLabel: item.actionLabel || 'View',
      imageUrl: item.imageUrl || '',
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setDragActive(false);
    setForm({
      type: 'Event',
      priority: 'Normal',
      date: '',
      title: '',
      summary: '',
      details: '',
      actionLabel: 'View',
      imageUrl: '',
    });
  };

  const applyImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, imageUrl: String(reader.result || '') }));
    };
    reader.readAsDataURL(file);
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return announcements;
    return announcements.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
    );
  }, [announcements, query]);

  return (
    <SectionCard
      title="Announcements Management"
      description="Professional announcement composer with rich details and managed publishing."
      action={
        <button
          type="button"
          onClick={resetForm}
          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white"
        >
          New Announcement
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search announcements by title, type..."
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            {filtered.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {item.type} - {item.priority || 'Normal'} - {item.date}
                    </div>
                    <div className="mt-2 text-xs text-slate-600">{item.summary}</div>
                  </div>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} className="h-12 w-12 rounded-lg object-cover" />
                  ) : null}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditor(item)}
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteAnnouncement(item.id)}
                    className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <form onSubmit={addAnnouncement} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-slate-900">
              {editingId ? 'Edit Announcement' : 'Create Announcement'}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={form.type}
                onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="Event">Event</option>
                <option value="Exam">Exam</option>
                <option value="Placement">Placement</option>
              </select>
              <select
                value={form.priority}
                onChange={(e) => setForm((prev) => ({ ...prev, priority: e.target.value }))}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>

            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Announcement title"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              value={form.date}
              onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
              placeholder="Date (e.g. Nov 30)"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              value={form.actionLabel}
              onChange={(e) => setForm((prev) => ({ ...prev, actionLabel: e.target.value }))}
              placeholder="Action label (e.g. Register, Open Timetable)"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <textarea
              value={form.summary}
              onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
              placeholder="Short summary"
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <textarea
              value={form.details}
              onChange={(e) => setForm((prev) => ({ ...prev, details: e.target.value }))}
              placeholder="Detailed description"
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />

            <div
              className={
                'rounded-xl border-2 border-dashed p-3 text-center ' +
                (dragActive ? 'border-blue-400 bg-blue-50' : 'border-slate-300 bg-slate-50')
              }
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                applyImageFile(e.dataTransfer.files?.[0]);
              }}
            >
              <div className="text-xs font-semibold text-slate-700">Drop announcement visual/banner</div>
              <label className="mt-2 inline-block cursor-pointer rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => applyImageFile(e.target.files?.[0])}
                />
              </label>
              {form.imageUrl ? (
                <img src={form.imageUrl} alt="Announcement visual preview" className="mx-auto mt-2 h-20 rounded-lg object-cover" />
              ) : null}
            </div>
            <input
              value={form.imageUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
              placeholder="Or paste image URL"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {editingId ? 'Update Announcement' : 'Publish Announcement'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </SectionCard>
  );
}

function EventsManager({ eventRecords, updateEventRecords }) {
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [form, setForm] = useState({
    category: 'Workshop',
    title: '',
    date: '',
    year: new Date().getFullYear(),
    participants: '',
    coordinatorName: '',
    coordinatorRole: 'Faculty Coordinator',
    about: '',
    tags: '',
    highlights: '',
    attendanceRate: '',
    satisfactionRate: '',
    timeline: '',
    posterUrl: '',
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return eventRecords;
    return eventRecords.filter(
      (event) =>
        event.title.toLowerCase().includes(q) ||
        event.category.toLowerCase().includes(q) ||
        event.about.toLowerCase().includes(q) ||
        event.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [eventRecords, query]);

  const resetForm = () => {
    setForm({
      category: 'Workshop',
      title: '',
      date: '',
      year: new Date().getFullYear(),
      participants: '',
      coordinatorName: '',
      coordinatorRole: 'Faculty Coordinator',
      about: '',
      tags: '',
      highlights: '',
      attendanceRate: '',
      satisfactionRate: '',
      timeline: '',
      posterUrl: '',
    });
    setEditingId(null);
    setDragActive(false);
  };

  const toInitials = (name) =>
    String(name || '')
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const slugify = (text) =>
    String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const toTimeline = (text) =>
    String(text || '')
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line, index) => {
        const [title, description] = line.split(' - ');
        return {
          label: `Stage ${index + 1}`,
          title: title || `Step ${index + 1}`,
          description: description || title || line,
        };
      });

  const openEditor = (event) => {
    setEditingId(event.id);
    setForm({
      category: event.category || 'Workshop',
      title: event.title || '',
      date: event.date || '',
      year: event.year || new Date().getFullYear(),
      participants: String(event.participants || ''),
      coordinatorName: event.coordinator?.name || '',
      coordinatorRole: event.coordinator?.role || 'Faculty Coordinator',
      about: event.about || '',
      tags: Array.isArray(event.tags) ? event.tags.join(', ') : '',
      highlights: Array.isArray(event.highlights) ? event.highlights.join('\n') : '',
      attendanceRate: String(event.participation?.attendanceRate || ''),
      satisfactionRate: String(event.participation?.satisfactionRate || ''),
      timeline: Array.isArray(event.timeline)
        ? event.timeline.map((step) => `${step.title} - ${step.description}`).join('\n')
        : '',
      posterUrl: event.posterUrl || '',
    });
  };

  const applyImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, posterUrl: String(reader.result || '') }));
    };
    reader.readAsDataURL(file);
  };

  const saveEvent = (event) => {
    event.preventDefault();
    const trimmedTitle = form.title.trim();
    if (!trimmedTitle) return;

    const normalized = {
      id: editingId || `${slugify(trimmedTitle)}-${Date.now()}`,
      category: form.category.trim() || 'Workshop',
      title: trimmedTitle,
      date: form.date.trim() || 'TBD',
      year: Number(form.year) || new Date().getFullYear(),
      participants: Number(form.participants) || 0,
      coordinator: {
        name: form.coordinatorName.trim() || 'Department Faculty',
        role: form.coordinatorRole.trim() || 'Faculty Coordinator',
        initials: toInitials(form.coordinatorName) || 'DF',
      },
      about: form.about.trim() || 'Details will be added soon.',
      highlights: form.highlights
        .split('\n')
        .map((item) => item.trim())
        .filter(Boolean),
      participation: {
        attendanceRate: Number(form.attendanceRate) || 0,
        satisfactionRate: Number(form.satisfactionRate) || 0,
      },
      timeline: toTimeline(form.timeline),
      tags: form.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      posterUrl: form.posterUrl.trim(),
    };

    if (editingId) {
      updateEventRecords((prev) => prev.map((item) => (item.id === editingId ? normalized : item)));
    } else {
      updateEventRecords((prev) => [normalized, ...prev]);
    }
    resetForm();
  };

  const deleteEvent = (id) => {
    updateEventRecords((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <SectionCard
      title="Events Management"
      description="BookMyShow-style event operations: poster, details, tags, timeline, and participation metrics."
      action={
        <button
          type="button"
          onClick={resetForm}
          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white"
        >
          Add New Event
        </button>
      }
    >
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events by title, category, tag..."
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-3">
            {filtered.map((item) => (
              <div key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="grid gap-3 p-3 sm:grid-cols-12">
                  <div className="sm:col-span-4">
                    <div className="h-28 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-700 to-blue-600">
                      {item.posterUrl ? (
                        <img src={item.posterUrl} alt={item.title} className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                  </div>
                  <div className="sm:col-span-8">
                    <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {item.category} - {item.date} - {item.participants} participants
                    </div>
                    <div className="mt-2 line-clamp-2 text-xs text-slate-600">{item.about}</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => openEditor(item)}
                        className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteEvent(item.id)}
                        className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <form onSubmit={saveEvent} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-slate-900">
              {editingId ? 'Edit Event' : 'Create Event'}
            </div>

            <div
              className={
                'rounded-xl border-2 border-dashed p-4 text-center ' +
                (dragActive ? 'border-blue-400 bg-blue-50' : 'border-slate-300 bg-slate-50')
              }
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const file = e.dataTransfer.files?.[0];
                applyImageFile(file);
              }}
            >
              <div className="text-xs font-semibold text-slate-700">Drop event poster here</div>
              <label className="mt-2 inline-block cursor-pointer rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                Upload Poster
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => applyImageFile(e.target.files?.[0])}
                />
              </label>
              {form.posterUrl ? (
                <img src={form.posterUrl} alt="Event poster preview" className="mx-auto mt-3 h-28 rounded-lg object-cover" />
              ) : null}
            </div>

            <input
              value={form.posterUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, posterUrl: e.target.value }))}
              placeholder="Poster image URL"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />

            <div className="grid grid-cols-2 gap-2">
              <input
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Event title"
                className="col-span-2 rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="Category"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.date}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                placeholder="Date (e.g. July 12, 2026)"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.year}
                onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))}
                placeholder="Year"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.participants}
                onChange={(e) => setForm((prev) => ({ ...prev, participants: e.target.value }))}
                placeholder="Participants"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <input
                value={form.coordinatorName}
                onChange={(e) => setForm((prev) => ({ ...prev, coordinatorName: e.target.value }))}
                placeholder="Coordinator name"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.coordinatorRole}
                onChange={(e) => setForm((prev) => ({ ...prev, coordinatorRole: e.target.value }))}
                placeholder="Coordinator role"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <textarea
              value={form.about}
              onChange={(e) => setForm((prev) => ({ ...prev, about: e.target.value }))}
              placeholder="About event"
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              value={form.tags}
              onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
              placeholder="Tags (comma separated)"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <textarea
              value={form.highlights}
              onChange={(e) => setForm((prev) => ({ ...prev, highlights: e.target.value }))}
              placeholder="Highlights (one per line)"
              rows={3}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <textarea
              value={form.timeline}
              onChange={(e) => setForm((prev) => ({ ...prev, timeline: e.target.value }))}
              placeholder="Timeline steps (one per line): Title - Description"
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={form.attendanceRate}
                onChange={(e) => setForm((prev) => ({ ...prev, attendanceRate: e.target.value }))}
                placeholder="Attendance rate %"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.satisfactionRate}
                onChange={(e) => setForm((prev) => ({ ...prev, satisfactionRate: e.target.value }))}
                placeholder="Satisfaction rate %"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {editingId ? 'Update Event' : 'Publish Event'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </SectionCard>
  );
}

function AchievementsManager({ achievementRecords, updateAchievementRecords }) {
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [form, setForm] = useState({
    category: 'Student',
    title: '',
    achieverName: '',
    date: '',
    level: 'Department',
    description: '',
    score: '',
    badge: '',
    proofUrl: '',
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return achievementRecords;
    return achievementRecords.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.achieverName.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.level.toLowerCase().includes(q)
    );
  }, [achievementRecords, query]);

  const resetForm = () => {
    setForm({
      category: 'Student',
      title: '',
      achieverName: '',
      date: '',
      level: 'Department',
      description: '',
      score: '',
      badge: '',
      proofUrl: '',
    });
    setEditingId(null);
    setDragActive(false);
  };

  const openEditor = (item) => {
    setEditingId(item.id);
    setForm({
      category: item.category || 'Student',
      title: item.title || '',
      achieverName: item.achieverName || '',
      date: item.date || '',
      level: item.level || 'Department',
      description: item.description || '',
      score: item.score || '',
      badge: item.badge || '',
      proofUrl: item.proofUrl || '',
    });
  };

  const applyImageFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((prev) => ({ ...prev, proofUrl: String(reader.result || '') }));
    };
    reader.readAsDataURL(file);
  };

  const saveAchievement = (event) => {
    event.preventDefault();
    const title = form.title.trim();
    const achieverName = form.achieverName.trim();
    if (!title || !achieverName) return;

    const normalized = {
      id: editingId || `ach-${Date.now()}`,
      category: form.category.trim() || 'Student',
      title,
      achieverName,
      date: form.date.trim() || 'TBD',
      level: form.level.trim() || 'Department',
      description: form.description.trim(),
      score: form.score.trim(),
      badge: form.badge.trim(),
      proofUrl: form.proofUrl.trim(),
    };

    if (editingId) {
      updateAchievementRecords((prev) => prev.map((item) => (item.id === editingId ? normalized : item)));
    } else {
      updateAchievementRecords((prev) => [normalized, ...prev]);
    }
    resetForm();
  };

  const deleteAchievement = (id) => {
    updateAchievementRecords((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <SectionCard
      title="Achievements"
      description="Manage student, faculty, and department achievements with proper structured inputs."
      action={
        <button
          type="button"
          onClick={resetForm}
          className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white"
        >
          Add Achievement
        </button>
      }
    >
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search achievements by title, achiever, category..."
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            {filtered.length ? (
              filtered.map((item) => (
                <div key={item.id} className="rounded-2xl border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-500">
                        {item.category} - {item.level} - {item.date}
                      </div>
                      <div className="mt-1 text-xs text-slate-700">By {item.achieverName}</div>
                      {item.score ? <div className="mt-1 text-xs text-emerald-700">Score: {item.score}</div> : null}
                      {item.badge ? <div className="mt-1 text-xs text-blue-700">Badge: {item.badge}</div> : null}
                    </div>
                    {item.proofUrl ? (
                      <img src={item.proofUrl} alt={item.title} className="h-12 w-12 rounded-lg object-cover" />
                    ) : null}
                  </div>
                  {item.description ? <div className="mt-2 text-xs text-slate-600">{item.description}</div> : null}
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => openEditor(item)}
                      className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteAchievement(item.id)}
                      className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-slate-200 p-3 text-sm text-slate-600">
                No achievements added yet.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <form onSubmit={saveAchievement} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-slate-900">
              {editingId ? 'Edit Achievement' : 'Create Achievement'}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
                <option value="Department">Department</option>
              </select>
              <select
                value={form.level}
                onChange={(e) => setForm((prev) => ({ ...prev, level: e.target.value }))}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="Department">Department</option>
                <option value="College">College</option>
                <option value="State">State</option>
                <option value="National">National</option>
                <option value="International">International</option>
              </select>
            </div>
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Achievement title"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              value={form.achieverName}
              onChange={(e) => setForm((prev) => ({ ...prev, achieverName: e.target.value }))}
              placeholder="Achiever name"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={form.date}
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                placeholder="Date"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.score}
                onChange={(e) => setForm((prev) => ({ ...prev, score: e.target.value }))}
                placeholder="Score / Rank"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <input
              value={form.badge}
              onChange={(e) => setForm((prev) => ({ ...prev, badge: e.target.value }))}
              placeholder="Badge / Award"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Achievement details"
              rows={4}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />

            <div
              className={
                'rounded-xl border-2 border-dashed p-3 text-center ' +
                (dragActive ? 'border-blue-400 bg-blue-50' : 'border-slate-300 bg-slate-50')
              }
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                setDragActive(false);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                applyImageFile(e.dataTransfer.files?.[0]);
              }}
            >
              <div className="text-xs font-semibold text-slate-700">Drop certificate/proof image</div>
              <label className="mt-2 inline-block cursor-pointer rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white">
                Upload Proof
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => applyImageFile(e.target.files?.[0])}
                />
              </label>
              {form.proofUrl ? (
                <img src={form.proofUrl} alt="Proof preview" className="mx-auto mt-2 h-20 rounded-lg object-cover" />
              ) : null}
            </div>
            <input
              value={form.proofUrl}
              onChange={(e) => setForm((prev) => ({ ...prev, proofUrl: e.target.value }))}
              placeholder="Or paste proof image URL"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                {editingId ? 'Update Achievement' : 'Save Achievement'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </SectionCard>
  );
}

function PlacementsManager({ placementRecords, updatePlacementRecords }) {
  const [query, setQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    company: '',
    role: '',
    packageLpa: '',
    driveDate: '',
    eligibility: '',
    status: 'Upcoming',
    mode: 'On-Campus',
    selectedCount: '',
    registeredCount: '',
    roundDetails: '',
    notes: '',
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return placementRecords;
    return placementRecords.filter(
      (item) =>
        item.company.toLowerCase().includes(q) ||
        item.role.toLowerCase().includes(q) ||
        item.status.toLowerCase().includes(q)
    );
  }, [placementRecords, query]);

  const stats = useMemo(() => {
    const totalSelected = placementRecords.reduce((sum, item) => sum + (Number(item.selectedCount) || 0), 0);
    const totalRegistered = placementRecords.reduce((sum, item) => sum + (Number(item.registeredCount) || 0), 0);
    const avgPackage =
      placementRecords.length > 0
        ? (
            placementRecords.reduce((sum, item) => sum + (Number(item.packageLpa) || 0), 0) /
            placementRecords.length
          ).toFixed(2)
        : '0.00';
    return { totalSelected, totalRegistered, avgPackage };
  }, [placementRecords]);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      company: '',
      role: '',
      packageLpa: '',
      driveDate: '',
      eligibility: '',
      status: 'Upcoming',
      mode: 'On-Campus',
      selectedCount: '',
      registeredCount: '',
      roundDetails: '',
      notes: '',
    });
  };

  const openEditor = (item) => {
    setEditingId(item.id);
    setForm({
      company: item.company || '',
      role: item.role || '',
      packageLpa: item.packageLpa || '',
      driveDate: item.driveDate || '',
      eligibility: item.eligibility || '',
      status: item.status || 'Upcoming',
      mode: item.mode || 'On-Campus',
      selectedCount: String(item.selectedCount ?? ''),
      registeredCount: String(item.registeredCount ?? ''),
      roundDetails: item.roundDetails || '',
      notes: item.notes || '',
    });
  };

  const savePlacement = (event) => {
    event.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return;

    const normalized = {
      id: editingId || `pl-${Date.now()}`,
      company: form.company.trim(),
      role: form.role.trim(),
      packageLpa: form.packageLpa.trim(),
      driveDate: form.driveDate.trim() || 'TBD',
      eligibility: form.eligibility.trim(),
      status: form.status,
      mode: form.mode,
      selectedCount: Number(form.selectedCount) || 0,
      registeredCount: Number(form.registeredCount) || 0,
      roundDetails: form.roundDetails.trim(),
      notes: form.notes.trim(),
    };

    if (editingId) {
      updatePlacementRecords((prev) => prev.map((item) => (item.id === editingId ? normalized : item)));
    } else {
      updatePlacementRecords((prev) => [normalized, ...prev]);
    }
    resetForm();
  };

  const deletePlacement = (id) => {
    updatePlacementRecords((prev) => prev.filter((item) => item.id !== id));
    if (editingId === id) resetForm();
  };

  return (
    <SectionCard
      title="Placements Management"
      description="Manage company drives, eligibility, rounds, registrations, and selection outcomes professionally."
      action={
        <button type="button" onClick={resetForm} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white">
          Add Drive
        </button>
      }
    >
      <div className="mb-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs text-slate-500">Total Selected</div>
          <div className="text-2xl font-semibold text-slate-900">{stats.totalSelected}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs text-slate-500">Total Registered</div>
          <div className="text-2xl font-semibold text-slate-900">{stats.totalRegistered}</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
          <div className="text-xs text-slate-500">Average Package (LPA)</div>
          <div className="text-2xl font-semibold text-slate-900">{stats.avgPackage}</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by company, role, status..."
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            {filtered.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">
                      {item.company} - {item.role}
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {item.driveDate} - {item.mode} - {item.status}
                    </div>
                    <div className="mt-1 text-xs text-slate-600">Package: {item.packageLpa} LPA</div>
                    <div className="mt-1 text-xs text-slate-600">
                      Selected {item.selectedCount} / Registered {item.registeredCount}
                    </div>
                  </div>
                  <span
                    className={
                      'rounded-full px-2.5 py-1 text-xs font-semibold ' +
                      (item.status === 'Completed'
                        ? 'bg-emerald-50 text-emerald-700'
                        : item.status === 'Open'
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-amber-50 text-amber-700')
                    }
                  >
                    {item.status}
                  </span>
                </div>
                <div className="mt-2 text-xs text-slate-600">{item.eligibility}</div>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEditor(item)}
                    className="rounded-md border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deletePlacement(item.id)}
                    className="rounded-md border border-red-200 bg-red-50 px-2 py-1 text-xs font-semibold text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <form onSubmit={savePlacement} className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-slate-900">{editingId ? 'Edit Placement Drive' : 'Create Placement Drive'}</div>
            <input
              value={form.company}
              onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
              placeholder="Company name"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
              placeholder="Role / Job profile"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={form.packageLpa}
                onChange={(e) => setForm((prev) => ({ ...prev, packageLpa: e.target.value }))}
                placeholder="Package (LPA)"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.driveDate}
                onChange={(e) => setForm((prev) => ({ ...prev, driveDate: e.target.value }))}
                placeholder="Drive date"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={form.mode}
                onChange={(e) => setForm((prev) => ({ ...prev, mode: e.target.value }))}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="On-Campus">On-Campus</option>
                <option value="Virtual">Virtual</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              <select
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              >
                <option value="Upcoming">Upcoming</option>
                <option value="Open">Open</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <textarea
              value={form.eligibility}
              onChange={(e) => setForm((prev) => ({ ...prev, eligibility: e.target.value }))}
              placeholder="Eligibility criteria"
              rows={2}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                value={form.registeredCount}
                onChange={(e) => setForm((prev) => ({ ...prev, registeredCount: e.target.value }))}
                placeholder="Registered count"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
              <input
                value={form.selectedCount}
                onChange={(e) => setForm((prev) => ({ ...prev, selectedCount: e.target.value }))}
                placeholder="Selected count"
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
              />
            </div>
            <textarea
              value={form.roundDetails}
              onChange={(e) => setForm((prev) => ({ ...prev, roundDetails: e.target.value }))}
              placeholder="Rounds details"
              rows={2}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <textarea
              value={form.notes}
              onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Notes"
              rows={2}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
            />
            <div className="flex gap-2">
              <button type="submit" className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white">
                {editingId ? 'Update Drive' : 'Save Drive'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </SectionCard>
  );
}

export default function AdminDashboardPage() {
  const { admin, logout } = useAdminAuth();
  const {
    announcements,
    studentRecords,
    facultyRecords,
    eventRecords,
    achievementRecords,
    placementRecords,
    departmentProfile,
    updateStudentRecords,
    updateFacultyRecords,
    updateEventRecords,
    updateAchievementRecords,
    updatePlacementRecords,
    updateDepartmentProfile,
  } = useAdminData();
  const [activeTab, setActiveTab] = useState('overview');
  const totalParticipants = useMemo(
    () => eventRecords.reduce((sum, event) => sum + (Number(event.participants) || 0), 0),
    [eventRecords]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-sm font-medium text-blue-600">Admin Workspace</div>
            <h1 className="text-2xl font-semibold text-slate-900">CSE - Data Science Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">Welcome back, {admin?.name || admin?.email || 'Admin'}.</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Students" value={studentRecords.length} subtitle="Active records in directory" />
        <StatCard title="Faculty Members" value={facultyRecords.length} subtitle="Profiles available in portal" />
        <StatCard title="Announcements" value={announcements.length} subtitle="Currently visible notices" />
        <StatCard title="Event Participants" value={totalParticipants} subtitle="Across listed department events" />
      </div>

      <DashboardTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-6 grid gap-6">
        {activeTab === 'overview' ? (
          <>
            <DepartmentOverviewManager
              departmentProfile={departmentProfile}
              updateDepartmentProfile={updateDepartmentProfile}
            />
          </>
        ) : null}
        {activeTab === 'announcements' ? <AnnouncementsManager /> : null}
        {activeTab === 'students' ? (
          <StudentManager studentRecords={studentRecords} setStudentRecords={updateStudentRecords} />
        ) : null}
        {activeTab === 'faculty' ? (
          <FacultyManager facultyRecords={facultyRecords} setFacultyRecords={updateFacultyRecords} />
        ) : null}
        {activeTab === 'events' ? (
          <EventsManager eventRecords={eventRecords} updateEventRecords={updateEventRecords} />
        ) : null}
        {activeTab === 'placements' ? (
          <PlacementsManager placementRecords={placementRecords} updatePlacementRecords={updatePlacementRecords} />
        ) : null}
        {activeTab === 'achievements' ? (
          <AchievementsManager
            achievementRecords={achievementRecords}
            updateAchievementRecords={updateAchievementRecords}
          />
        ) : null}
      </div>
    </div>
  );
}
