import React, { createContext, useContext, useMemo, useState } from 'react';
import { announcements as defaultAnnouncements } from '../data/announcements';
import { students as defaultStudents } from '../data/students';
import { faculty as defaultFaculty } from '../data/faculty';
import { events as defaultEvents } from '../data/events';
import { department as defaultDepartment } from '../data/department';

const STORAGE_KEY = 'major_project_admin_data';
const defaultAchievements = [];
const defaultPlacements = [
  {
    id: 'pl-1',
    company: 'TCS',
    role: 'Data Analyst',
    packageLpa: '7.0',
    driveDate: 'Nov 25, 2026',
    eligibility: 'CGPA >= 7.0, No active backlogs',
    status: 'Open',
    mode: 'On-Campus',
    selectedCount: 18,
    registeredCount: 92,
    roundDetails: 'Aptitude, Technical Interview, HR Interview',
    notes: 'Resume shortlisting closes 3 days before drive.',
  },
  {
    id: 'pl-2',
    company: 'Accenture',
    role: 'Associate Software Engineer',
    packageLpa: '6.5',
    driveDate: 'Dec 02, 2026',
    eligibility: 'CGPA >= 6.5',
    status: 'Upcoming',
    mode: 'Virtual',
    selectedCount: 0,
    registeredCount: 76,
    roundDetails: 'Coding Test, Communication Round, Interview',
    notes: 'Students must complete coding assessment mock test.',
  },
  {
    id: 'pl-3',
    company: 'Deloitte',
    role: 'Analytics Trainee',
    packageLpa: '8.2',
    driveDate: 'Oct 20, 2026',
    eligibility: 'CGPA >= 7.5, Python/SQL basics',
    status: 'Completed',
    mode: 'On-Campus',
    selectedCount: 11,
    registeredCount: 54,
    roundDetails: 'Online Test, Case Study, Panel Interview',
    notes: 'Offer letters shared via placement cell.',
  },
];
const defaultDepartmentProfile = {
  name: defaultDepartment.name,
  establishedYear: defaultDepartment.establishedYear,
  program: defaultDepartment.program,
  annualIntake: defaultDepartment.annualIntake,
  hodName: defaultDepartment.hod?.name || '',
  hodExperienceYears: defaultDepartment.hod?.experienceYears || '',
  contactEmail: 'cse-ds@gcet.edu',
  contactPhone: '+91-00000-00000',
  officeLocation: 'Block C, 2nd Floor',
  accreditation: 'NAAC A+',
  placementRate: '92%',
  vision: defaultDepartment.vision,
  mission: defaultDepartment.mission,
  overview: defaultDepartment.overview,
  sourceUrl: defaultDepartment.sourceUrl,
};

const AdminDataContext = createContext(null);

function loadInitialAnnouncements() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultAnnouncements;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed?.announcements) && parsed.announcements.length) {
      return parsed.announcements;
    }
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
  return defaultAnnouncements;
}

function loadInitialData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        announcements: defaultAnnouncements,
        studentRecords: defaultStudents,
        facultyRecords: defaultFaculty,
        eventRecords: defaultEvents,
        achievementRecords: defaultAchievements,
        placementRecords: defaultPlacements,
        departmentProfile: defaultDepartmentProfile,
      };
    }
    const parsed = JSON.parse(raw);
    return {
      announcements:
        Array.isArray(parsed?.announcements) && parsed.announcements.length
          ? parsed.announcements
          : defaultAnnouncements,
      studentRecords:
        Array.isArray(parsed?.studentRecords) && parsed.studentRecords.length
          ? parsed.studentRecords
          : defaultStudents,
      facultyRecords:
        Array.isArray(parsed?.facultyRecords) && parsed.facultyRecords.length
          ? parsed.facultyRecords
          : defaultFaculty,
      eventRecords:
        Array.isArray(parsed?.eventRecords) && parsed.eventRecords.length
          ? parsed.eventRecords
          : defaultEvents,
      achievementRecords:
        Array.isArray(parsed?.achievementRecords) && parsed.achievementRecords.length
          ? parsed.achievementRecords
          : defaultAchievements,
      placementRecords:
        Array.isArray(parsed?.placementRecords) && parsed.placementRecords.length
          ? parsed.placementRecords
          : defaultPlacements,
      departmentProfile:
        parsed?.departmentProfile && typeof parsed.departmentProfile === 'object'
          ? { ...defaultDepartmentProfile, ...parsed.departmentProfile }
          : defaultDepartmentProfile,
    };
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
    return {
      announcements: defaultAnnouncements,
      studentRecords: defaultStudents,
      facultyRecords: defaultFaculty,
      eventRecords: defaultEvents,
      achievementRecords: defaultAchievements,
      placementRecords: defaultPlacements,
      departmentProfile: defaultDepartmentProfile,
    };
  }
}

export function AdminDataProvider({ children }) {
  const initialData = loadInitialData();
  const [announcements, setAnnouncements] = useState(initialData.announcements || loadInitialAnnouncements);
  const [studentRecords, setStudentRecords] = useState(initialData.studentRecords || defaultStudents);
  const [facultyRecords, setFacultyRecords] = useState(initialData.facultyRecords || defaultFaculty);
  const [eventRecords, setEventRecords] = useState(initialData.eventRecords || defaultEvents);
  const [achievementRecords, setAchievementRecords] = useState(
    initialData.achievementRecords || defaultAchievements
  );
  const [placementRecords, setPlacementRecords] = useState(
    initialData.placementRecords || defaultPlacements
  );
  const [departmentProfile, setDepartmentProfile] = useState(
    initialData.departmentProfile || defaultDepartmentProfile
  );

  const persistData = (next) => {
    if (next.announcements) setAnnouncements(next.announcements);
    if (next.studentRecords) setStudentRecords(next.studentRecords);
    if (next.facultyRecords) setFacultyRecords(next.facultyRecords);
    if (next.eventRecords) setEventRecords(next.eventRecords);
    if (next.achievementRecords) setAchievementRecords(next.achievementRecords);
    if (next.placementRecords) setPlacementRecords(next.placementRecords);
    if (next.departmentProfile) setDepartmentProfile(next.departmentProfile);

    const payload = {
      announcements: next.announcements || announcements,
      studentRecords: next.studentRecords || studentRecords,
      facultyRecords: next.facultyRecords || facultyRecords,
      eventRecords: next.eventRecords || eventRecords,
      achievementRecords: next.achievementRecords || achievementRecords,
      placementRecords: next.placementRecords || placementRecords,
      departmentProfile: next.departmentProfile || departmentProfile,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(payload)
    );
  };

  const publishAnnouncement = ({ title, type }) => {
    const trimmed = String(title || '').trim();
    if (!trimmed) {
      return { ok: false, message: 'Announcement title is required.' };
    }

    const next = {
      id: `admin-${Date.now()}`,
      type: type || 'Event',
      priority: 'Normal',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      title: trimmed,
      summary: 'Added from admin dashboard.',
      details: `${trimmed}\n\nThis announcement was added from the admin dashboard.`,
      actionLabel: 'View',
    };

    persistData({ announcements: [next, ...announcements] });
    return { ok: true };
  };

  const updateAnnouncements = (updater) => {
    const next = typeof updater === 'function' ? updater(announcements) : updater;
    persistData({ announcements: next });
  };

  const deleteAnnouncement = (id) => {
    persistData({ announcements: announcements.filter((item) => item.id !== id) });
  };

  const updateStudentRecords = (updater) => {
    const next = typeof updater === 'function' ? updater(studentRecords) : updater;
    persistData({ studentRecords: next });
  };

  const updateFacultyRecords = (updater) => {
    const next = typeof updater === 'function' ? updater(facultyRecords) : updater;
    persistData({ facultyRecords: next });
  };

  const updateEventRecords = (updater) => {
    const next = typeof updater === 'function' ? updater(eventRecords) : updater;
    persistData({ eventRecords: next });
  };

  const updateAchievementRecords = (updater) => {
    const next = typeof updater === 'function' ? updater(achievementRecords) : updater;
    persistData({ achievementRecords: next });
  };

  const updatePlacementRecords = (updater) => {
    const next = typeof updater === 'function' ? updater(placementRecords) : updater;
    persistData({ placementRecords: next });
  };

  const updateDepartmentProfile = (updater) => {
    const next = typeof updater === 'function' ? updater(departmentProfile) : updater;
    persistData({ departmentProfile: next });
  };

  const value = useMemo(
    () => ({
      announcements,
      studentRecords,
      facultyRecords,
      eventRecords,
      achievementRecords,
      placementRecords,
      departmentProfile,
      publishAnnouncement,
      updateAnnouncements,
      deleteAnnouncement,
      updateStudentRecords,
      updateFacultyRecords,
      updateEventRecords,
      updateAchievementRecords,
      updatePlacementRecords,
      updateDepartmentProfile,
    }),
    [
      announcements,
      studentRecords,
      facultyRecords,
      eventRecords,
      achievementRecords,
      placementRecords,
      departmentProfile,
      publishAnnouncement,
      updateAnnouncements,
      deleteAnnouncement,
      updateStudentRecords,
      updateFacultyRecords,
      updateEventRecords,
      updateAchievementRecords,
      updatePlacementRecords,
      updateDepartmentProfile,
    ]
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within AdminDataProvider');
  }
  return context;
}
