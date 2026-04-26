const dept = 'CSE – Data Science';

function toId(name) {
  return name
    .toLowerCase()
    .replace(/\./g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function baseProfile({ name, designation, qualification, facultyRegId }) {
  return {
    id: toId(name),
    name,
    designation,
    qualification,
    facultyRegId,
    department: dept,
    email: '',
    phone: '',
    office: '',
    officeHours: '',
    expertise: [],
    education: qualification ? [qualification] : [],
    bio: '',
    courses: [],
    links: {
      googleScholar: '',
      linkedin: '',
    },
    stats: {
      publications: 0,
      projects: 0,
      citations: 0,
    },
    publications: [],
  };
}

export const faculty = [
  baseProfile({
    name: 'Dr. D. Sujatha',
    designation: 'HoD & Professor',
    qualification: 'B.E, M.Tech., Ph.D',
    facultyRegId: '17150401-154407',
  }),
  baseProfile({
    name: 'Dr. L. Kiran Kumar Reddy',
    designation: 'Professor',
    qualification: 'BE, M.Tech. (SE), Ph.D',
    facultyRegId: '4612-151217-230709',
  }),
  baseProfile({
    name: 'Dr. A. Venkata Ramana',
    designation: 'Professor & Assoc. Coordinator, IQAC',
    qualification: 'B.Sc, MCA M.Tech, Ph.D',
    facultyRegId: '4147-150415-121607',
  }),
  baseProfile({
    name: 'Dr. K. Ambedkar',
    designation: 'Associate Professor',
    qualification: 'B.Sc, M.Tech . (IT), Ph.D',
    facultyRegId: '3420-191107-161934',
  }),
  baseProfile({
    name: 'Dr. M Srinivas',
    designation: 'Associate Professor & Dept. Coord. -III',
    qualification: 'B.Tech. (ECE), M.Tech. (CS), Ph.D',
    facultyRegId: '4522-150408-125335',
  }),
  baseProfile({
    name: 'T. Pandu Ranga',
    designation: 'Associate Professor',
    qualification: 'AME, M.Tech. (CSE)',
    facultyRegId: '0395-171227-101529',
  }),
  baseProfile({
    name: 'S. Tirupathi Rao',
    designation: 'Associate Professor & Coord.-Internships',
    qualification: 'B.E (CE), M.Tech. (CSE)',
    facultyRegId: '42150406-160745',
  }),
  baseProfile({
    name: 'K. Gnana Mayuri',
    designation: 'Sr. Assistant Professor & Coordinator, Cantilever Training',
    qualification: 'B.Tech. (CSE), M.Tech. (CSE)',
    facultyRegId: '04150401-143157',
  }),
  baseProfile({
    name: 'G. Vijay Kumar',
    designation: 'Sr. Assistant Professor',
    qualification: 'B.Tech., M.Tech (CSE)',
    facultyRegId: '20150404-141037',
  }),
  baseProfile({
    name: 'N. Krishnavardhan',
    designation: 'Sr. Assistant Professor & Dept. Coor-IQAC',
    qualification: 'B.Tech., M.Tech.',
    facultyRegId: '11150407-123424',
  }),
  baseProfile({
    name: 'G. Srihari Babu',
    designation: 'Sr. Assistant Professor',
    qualification: 'B.Tech., M.Tech.',
    facultyRegId: '1470-160301-133028',
  }),
  baseProfile({
    name: 'K. Laxmi',
    designation: 'Sr. Assistant Professor',
    qualification: 'B.Tech., M.Tech. (SE)',
    facultyRegId: '9674-160222-100939',
  }),
  baseProfile({
    name: 'M. V. Lavanya',
    designation: 'Assistant Professor & Smart Interviews Coordinator',
    qualification: 'B.Tech. (IT), M.Tech. (SE)',
    facultyRegId: '3512-210312-155957',
  }),
  baseProfile({
    name: 'A. Bixapathi',
    designation: 'Assistant Professor',
    qualification: 'B.Tech. (IT), M.Tech. (SE)',
    facultyRegId: '41150407-152301',
  }),
  baseProfile({
    name: 'N. Madhavi',
    designation: 'Assistant Professor',
    qualification: 'B. Tech. (IT), M.Tech. (CSE)',
    facultyRegId: '1642-220530-130955',
  }),
  baseProfile({
    name: 'P. Shambhavi',
    designation: 'Assistant Professor',
    qualification: 'B.Tech. (CSE), M.Tech. (CSE)',
    facultyRegId: '7634-220506-111553',
  }),
  baseProfile({
    name: 'G. Rajasri',
    designation: 'Assistant Professor',
    qualification: 'B.Sc, M.Tech., MCA',
    facultyRegId: '8982-211206-130127',
  }),
  baseProfile({
    name: 'B. Venkateswarlu',
    designation: 'Assistant Professor',
    qualification: 'B.Tech., M.Tech. (CN&IS)',
    facultyRegId: '66150402-171228',
  }),
  baseProfile({
    name: 'M. Anusha Sri',
    designation: 'Assistant Professor',
    qualification: 'B.Tech., M.Tech. (SE)',
    facultyRegId: '8208-230202-135509',
  }),
  baseProfile({
    name: 'Anshu Kunwar',
    designation: 'Assistant Professor',
    qualification: 'B.Tech. (CSE), M.Tech. (DS)',
    facultyRegId: '5053-231117-103437',
  }),
  baseProfile({
    name: 'K. Pitru Jyothi',
    designation: 'Assistant Professor',
    qualification: 'B.Tech. (CSE), M.Tech. (CSE)',
    facultyRegId: '7789-231120-120305',
  }),
  baseProfile({
    name: 'R. Rajashekhar',
    designation: 'Assistant Professor',
    qualification: 'B.Tech. (CSE), M.Tech. (CSE)',
    facultyRegId: '4323-160106-223642',
  }),
  baseProfile({
    name: 'Rama Aruna',
    designation: 'Assistant Professor',
    qualification: 'B.Tech. (IT), M.Tech. (CSE)',
    facultyRegId: '4671-190828-105521',
  }),
  baseProfile({
    name: 'Ch. Krishna Priya',
    designation: 'Assistant Professor',
    qualification: 'BE, M.Sc (Human Comp. Intera.)',
    facultyRegId: '8543-250228-094524',
  }),
  baseProfile({
    name: 'P. Sowmya Reddy',
    designation: 'Assistant Professor',
    qualification: 'B.Tech., M.Tech. (CSE)',
    facultyRegId: '1345-250313-121642',
  }),
  baseProfile({
    name: 'K. Manoj Kumar',
    designation: 'Assistant Professor',
    qualification: 'B.Tech., M.Tech. (CSE)',
    facultyRegId: '0209-190117-162753',
  }),
];

export function getFacultyById(id) {
  return faculty.find((f) => f.id === id);
}
