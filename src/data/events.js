export const events = [
  {
    id: 'ml-workshop-2025',
    category: 'Workshop',
    title: 'Machine Learning Workshop',
    date: 'January 15, 2025',
    year: 2025,
    participants: 85,
    coordinator: {
      name: 'Dr. Rajesh Kumar',
      role: 'Faculty Coordinator',
      initials: 'R',
    },
    about:
      'A comprehensive workshop on machine learning fundamentals, covering supervised and unsupervised learning techniques, model evaluation, and practical applications using Python and scikit-learn.',
    highlights: [
      'Students learned ML algorithms implementation',
      'Hands-on projects completed',
      '90% satisfaction rate',
    ],
    participation: {
      attendanceRate: 95,
      satisfactionRate: 92,
    },
    timeline: [
      {
        label: 'Registration',
        title: 'Participant Registration & Welcome',
        description: 'Students registered for the event and received welcome kits',
      },
      {
        label: 'Session 1',
        title: 'Opening Ceremony & Keynote',
        description: 'Introduction to the event objectives and keynote address',
      },
      {
        label: 'Session 2',
        title: 'Main Workshop/Activity',
        description: 'Hands-on sessions and interactive activities',
      },
      {
        label: 'Closing',
        title: 'Q&A and Closing Ceremony',
        description: 'Interactive discussion, feedback collection, and certificates distribution',
      },
    ],
    tags: ['Python', 'ML', 'scikit-learn', 'Hands-on'],
  },
  {
    id: 'ds-hackathon-2025',
    category: 'Hackathon',
    title: '24-Hour Data Science Hackathon',
    date: 'February 20, 2025',
    year: 2025,
    participants: 120,
    coordinator: {
      name: 'Prof. Anjali Mehta',
      role: 'Event Coordinator',
      initials: 'A',
    },
    about:
      'A 24-hour hackathon focused on solving real-world data science problems. Teams will build solutions with mentorship, evaluation rubrics, and prizes.',
    highlights: ['Mentor hours with industry experts', 'Real datasets', 'Top 3 prizes & certificates'],
    participation: {
      attendanceRate: 90,
      satisfactionRate: 89,
    },
    timeline: [
      { label: 'Kickoff', title: 'Problem Statements Released', description: 'Teams select tracks and start ideation' },
      { label: 'Build', title: 'Modeling & Prototyping', description: 'Data cleaning, feature engineering and model training' },
      { label: 'Demo', title: 'Final Presentations', description: 'Teams present outcomes to jury and mentors' },
    ],
    tags: ['Kaggle', 'EDA', 'Modeling', 'Teamwork'],
  },
  {
    id: 'ai-talk-2025',
    category: 'Expert Talk',
    title: 'Expert Talk: Trends in Deep Learning',
    date: 'March 10, 2025',
    year: 2025,
    participants: 150,
    coordinator: {
      name: 'Dr. Priya Nair',
      role: 'Faculty Coordinator',
      initials: 'P',
    },
    about:
      'Expert talk on latest trends in deep learning, including transformers, retrieval-augmented generation, and efficient fine-tuning approaches.',
    highlights: ['Transformers & attention', 'RAG pipelines', 'Q&A with speaker'],
    participation: {
      attendanceRate: 93,
      satisfactionRate: 91,
    },
    timeline: [
      { label: 'Talk', title: 'Key Concepts & Trends', description: 'Overview of modern deep learning techniques' },
      { label: 'Q&A', title: 'Interactive Q&A', description: 'Students ask questions and discuss applications' },
    ],
    tags: ['Deep Learning', 'Transformers', 'GenAI'],
  },
  {
    id: 'bigdata-conf-2025',
    category: 'Conference',
    title: 'Conference on Big Data Technologies',
    date: 'April 5, 2025',
    year: 2025,
    participants: 200,
    coordinator: {
      name: 'Dr. Sandeep Reddy',
      role: 'Conference Chair',
      initials: 'S',
    },
    about:
      'Two-day conference on big data technologies including Hadoop, Spark, cloud data platforms, and modern data engineering practices.',
    highlights: ['Multiple tracks', 'Poster session', 'Industry panel'],
    participation: {
      attendanceRate: 88,
      satisfactionRate: 90,
    },
    timeline: [
      { label: 'Day 1', title: 'Keynotes & Tracks', description: 'Keynotes and parallel technical sessions' },
      { label: 'Day 2', title: 'Panels & Posters', description: 'Industry panel and student poster session' },
    ],
    tags: ['Hadoop', 'Spark', 'Cloud', 'Data Engineering'],
  },
];

export function getEventById(id) {
  return events.find((e) => e.id === id);
}
