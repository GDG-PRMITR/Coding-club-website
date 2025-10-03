import { Event, PastEvent, UpcomingEvent } from '../types/events';

// Mock data for development and testing
export const mockEvents: Event[] = [
  // Past Events
  {
    id: 'gdg-devfest-2024',
    title: 'DevFest 2024: Building the Future',
    description: 'DevFest is an annual developer festival hosted by Google Developer Groups (GDG) worldwide. Join us for a day filled with technical sessions, workshops, and networking opportunities focused on the latest Google technologies including AI/ML, Cloud, Web, Mobile, and more.',
    shortDescription: 'Annual developer festival with workshops on AI/ML, Cloud, and Web technologies.',
    organization: 'GDG',
    category: 'conference',
    status: 'past',
    date: '2024-11-15T09:00:00Z',
    duration: 8,
    venue: {
      name: 'Computer Science Department',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'DevFest 2024 event banner'
    },
    keywords: ['AI/ML', 'Cloud Computing', 'Web Development', 'Android', 'Flutter'],
    attendeeCount: 250,
    speakers: [
      {
        name: 'Dr. Priya Sharma',
        designation: 'Senior ML Engineer',
        company: 'Google',
        image: '/professional-young-woman-in-business-attire-in-off.jpg'
      },
      {
        name: 'Rahul Verma',
        designation: 'Cloud Architect',
        company: 'Google Cloud',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      }
    ],
    gallery: [
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'DevFest keynote session' },
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Workshop participants' },
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Networking session' }
    ],
    highlights: [
      'Keynote on "The Future of AI in Software Development"',
      'Hands-on workshops on Google Cloud Platform',
      'Panel discussion on sustainable tech solutions',
      'Networking with 250+ developers'
    ],
    feedback: {
      rating: 4.8,
      totalResponses: 189
    },
    resources: {
      presentation: 'https://docs.google.com/presentation/devfest2024',
      code: 'https://github.com/kartikshriwas',
      recording: 'https://youtube.com/Astra.'
    }
  },
  {
    id: 'coding-club-hackathon-2024',
    title: 'CodeRush 2024: 48-Hour Innovation Challenge',
    description: 'A 48-hour hackathon organized by the Coding Club focusing on innovative solutions for real-world problems. Participants will work in teams to develop applications using modern technologies while competing for exciting prizes and internship opportunities.',
    shortDescription: '48-hour hackathon focusing on innovative tech solutions with exciting prizes.',
    organization: 'Coding Club',
    category: 'hackathon',
    status: 'past',
    date: '2024-10-20T18:00:00Z',
    duration: 48,
    venue: {
      name: 'College Main Campus',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'CodeRush 2024 hackathon'
    },
    keywords: ['Hackathon', 'Innovation', 'Full Stack', 'Mobile App', 'Problem Solving'],
    attendeeCount: 120,
    speakers: [
      {
        name: 'Anjali Patel',
        designation: 'Senior Software Engineer',
        company: 'Microsoft',
        image: '/professional-young-woman-in-business-attire-in-off.jpg'
      }
    ],
    gallery: [
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Teams working late night' },
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Final presentations' },
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Winners celebration' }
    ],
    highlights: [
      '30 teams participated in the challenge',
      'Winners received internship opportunities',
      'Mentorship from industry experts',
      'Prize pool worth ₹50,000'
    ],
    feedback: {
      rating: 4.6,
      totalResponses: 95
    }
  },
  {
    id: 'gsa-workshop-flutter',
    title: 'Flutter Mobile Development Workshop',
    description: 'Learn to build beautiful, natively compiled applications for mobile from a single codebase using Flutter. This workshop covers Flutter fundamentals, widget architecture, state management, and building a complete mobile app from scratch.',
    shortDescription: 'Hands-on workshop on building mobile apps with Flutter framework.',
    organization: 'GSA',
    category: 'workshop',
    status: 'past',
    date: '2024-09-28T14:00:00Z',
    duration: 4,
    venue: {
      name: 'Computer Lab - Block A',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Flutter workshop session'
    },
    keywords: ['Flutter', 'Mobile Development', 'Dart', 'Cross Platform', 'UI/UX'],
    attendeeCount: 45,
    speakers: [
      {
        name: 'Arjun Singh',
        designation: 'Flutter Developer',
        company: 'Flipkart',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      }
    ],
    gallery: [
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Workshop participants coding' },
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Live coding demonstration' }
    ],
    highlights: [
      'Built a complete todo app from scratch',
      'Learned state management with Provider',
      'UI design best practices',
      'App deployment on Android'
    ],
    feedback: {
      rating: 4.7,
      totalResponses: 38
    }
  },
  {
    id: 'gdg-android-workshop-2024',
    title: 'Android Development with Kotlin Workshop',
    description: 'Learn modern Android development using Kotlin and Jetpack Compose. This workshop covers the fundamentals of Android app development, UI design with Compose, state management, and publishing apps to the Play Store.',
    shortDescription: 'Hands-on workshop on Android development with Kotlin and Jetpack Compose.',
    organization: 'GDG',
    category: 'workshop',
    status: 'past',
    date: '2024-08-15T10:00:00Z',
    duration: 6,
    venue: {
      name: 'Computer Lab - Block B',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Android Kotlin Workshop'
    },
    keywords: ['Android', 'Kotlin', 'Jetpack Compose', 'Mobile Development', 'Play Store'],
    attendeeCount: 85,
    speakers: [
      {
        name: 'Rohan Mehta',
        designation: 'Android Developer',
        company: 'Flipkart',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      }
    ],
    gallery: [
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Participants coding Android app' },
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Jetpack Compose demo' }
    ],
    highlights: [
      'Built a complete weather app',
      'Learned Jetpack Compose UI framework',
      'Published apps to Google Play Console',
      'Best practices for Android development'
    ],
    feedback: {
      rating: 4.6,
      totalResponses: 72
    }
  },
  {
    id: 'gsa-web-development-bootcamp',
    title: 'Full Stack Web Development Bootcamp',
    description: 'Intensive 3-day bootcamp covering modern web development technologies including React, Node.js, MongoDB, and deployment strategies. Perfect for beginners and intermediate developers looking to build complete web applications.',
    shortDescription: 'Intensive 3-day bootcamp on full stack web development with MERN stack.',
    organization: 'GSA',
    category: 'workshop',
    status: 'past',
    date: '2024-07-10T09:00:00Z',
    duration: 24,
    venue: {
      name: 'Auditorium',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Web Development Bootcamp'
    },
    keywords: ['React', 'Node.js', 'MongoDB', 'Full Stack', 'MERN', 'JavaScript'],
    attendeeCount: 120,
    speakers: [
      {
        name: 'Priya Sharma',
        designation: 'Full Stack Developer',
        company: 'Razorpay',
        image: '/professional-young-woman-in-business-attire-in-off.jpg'
      },
      {
        name: 'Amit Kumar',
        designation: 'Backend Engineer',
        company: 'Swiggy',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      }
    ],
    gallery: [
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'React development session' },
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Node.js backend workshop' },
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Final project presentations' }
    ],
    highlights: [
      'Built complete e-commerce application',
      'Learned modern React hooks and context',
      'Implemented authentication and authorization',
      'Deployed applications to Heroku and Netlify'
    ],
    feedback: {
      rating: 4.8,
      totalResponses: 98
    }
  },
  {
    id: 'coding-club-competitive-programming-contest',
    title: 'CodeMaster Championship 2024',
    description: 'Annual competitive programming contest featuring algorithmic challenges and data structure problems. Participants competed in multiple rounds with increasing difficulty levels, testing their problem-solving skills and coding efficiency.',
    shortDescription: 'Annual competitive programming contest with algorithmic challenges.',
    organization: 'Coding Club',
    category: 'competition',
    status: 'past',
    date: '2024-06-22T14:00:00Z',
    duration: 5,
    venue: {
      name: 'Computer Lab - All Blocks',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Competitive Programming Contest'
    },
    keywords: ['Competitive Programming', 'Algorithms', 'Data Structures', 'Problem Solving', 'Contest'],
    attendeeCount: 150,
    speakers: [
      {
        name: 'Vikram Singh',
        designation: 'Competitive Programmer',
        company: 'CodeChef',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      }
    ],
    gallery: [
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Contest participants' },
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Winners ceremony' }
    ],
    highlights: [
      '150+ participants from multiple colleges',
      '3 rounds of increasing difficulty',
      'Cash prizes worth ₹25,000',
      'Top performers received internship offers'
    ],
    feedback: {
      rating: 4.5,
      totalResponses: 125
    }
  },
  {
    id: 'gdg-firebase-meetup-2024',
    title: 'Firebase for Modern Apps Meetup',
    description: 'Monthly meetup focused on Firebase services including Firestore, Authentication, Cloud Functions, and Hosting. Learn how to build scalable, real-time applications using Google Firebase platform.',
    shortDescription: 'Monthly meetup on Firebase services and real-time app development.',
    organization: 'GDG',
    category: 'meetup',
    status: 'past',
    date: '2024-05-18T18:30:00Z',
    duration: 3,
    venue: {
      name: 'Conference Room',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Firebase Meetup'
    },
    keywords: ['Firebase', 'Real-time Database', 'Authentication', 'Cloud Functions', 'NoSQL'],
    attendeeCount: 65,
    speakers: [
      {
        name: 'Neha Agarwal',
        designation: 'Firebase Developer Expert',
        company: 'Google',
        image: '/professional-young-woman-in-business-attire-in-off.jpg'
      }
    ],
    gallery: [
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Firebase demo session' },
      { url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI', alt: 'Networking session' }
    ],
    highlights: [
      'Built real-time chat application',
      'Learned Firebase security rules',
      'Cloud Functions deployment',
      'Performance optimization techniques'
    ],
    feedback: {
      rating: 4.4,
      totalResponses: 52
    }
  },

  // Upcoming Events
  {
    id: 'gdg-cloud-summit-2025',
    title: 'Google Cloud Summit 2025',
    description: 'Join us for an exciting day exploring the latest in Google Cloud technologies. Learn about AI/ML services, serverless computing, data analytics, and cloud security. Perfect for developers, architects, and IT professionals looking to enhance their cloud skills.',
    shortDescription: 'Comprehensive summit on Google Cloud technologies and AI/ML services.',
    organization: 'GDG',
    category: 'conference',
    status: 'upcoming',
    date: '2025-02-15T09:00:00Z',
    endDate: '2025-02-16T17:00:00Z',
    venue: {
      name: 'Computer Science Department',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Google Cloud Summit 2025'
    },
    keywords: ['Google Cloud', 'AI/ML', 'Serverless', 'Data Analytics', 'Security'],
    registrationUrl: 'https://google.com',
    registrationDeadline: '2025-02-10T23:59:59Z',
    maxAttendees: 500,
    currentAttendees: 234,
    speakers: [
      {
        name: 'Dr. Meera Rajesh',
        designation: 'Cloud Solutions Architect',
        company: 'Google Cloud',
        image: '/professional-young-woman-in-business-attire-in-off.jpg'
      },
      {
        name: 'Vikram Mehta',
        designation: 'AI/ML Specialist',
        company: 'Google',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      }
    ],
    agenda: [
      { time: '09:00', activity: 'Registration & Breakfast', speaker: '' },
      { time: '10:00', activity: 'Keynote: The Future of Cloud Computing', speaker: 'Dr. Meera Rajesh' },
      { time: '11:30', activity: 'Workshop: Building ML Pipelines on Google Cloud', speaker: 'Vikram Mehta' },
      { time: '14:00', activity: 'Panel: Cloud Security Best Practices', speaker: 'Multiple Speakers' },
      { time: '16:00', activity: 'Networking & Closing', speaker: '' }
    ],
    price: {
      amount: 11,
      currency: 'INR',
      earlyBird: {
        amount: 9,
        deadline: '2025-09-31T23:59:59Z'
      }
    }
  },
  {
    id: 'coding-club-web-dev-bootcamp',
    title: 'Full Stack Web Development Bootcamp',
    description: 'Intensive 3-day bootcamp covering modern web development stack including React, Node.js, MongoDB, and deployment strategies. Perfect for beginners and intermediate developers looking to enhance their full-stack development skills.',
    shortDescription: '3-day intensive bootcamp on full-stack web development with React and Node.js.',
    organization: 'Coding Club',
    category: 'workshop',
    status: 'upcoming',
    date: '2025-01-25T09:00:00Z',
    endDate: '2025-01-27T17:00:00Z',
    venue: {
      name: 'Computer Science Department',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Web Development Bootcamp'
    },
    keywords: ['Web Development', 'React', 'Node.js', 'MongoDB', 'Full Stack'],
    registrationUrl: 'https://google.com',
    registrationDeadline: '2025-01-20T23:59:59Z',
    maxAttendees: 80,
    currentAttendees: 42,
    speakers: [
      {
        name: 'Sneha Gupta',
        designation: 'Full Stack Developer',
        company: 'Razorpay',
        image: '/professional-young-woman-in-business-attire-in-off.jpg'
      }
    ],
    prerequisites: [
      'Basic knowledge of HTML, CSS, JavaScript',
      'Laptop with VS Code installed',
      'Node.js and npm installed'
    ],
    agenda: [
      { time: 'Day 1', activity: 'React Fundamentals & Component Architecture', speaker: 'Sneha Gupta' },
      { time: 'Day 2', activity: 'Backend Development with Node.js & Express', speaker: 'Sneha Gupta' },
      { time: 'Day 3', activity: 'Database Integration & Deployment', speaker: 'Sneha Gupta' }
    ]
  },
  {
    id: 'gsa-ai-ethics-seminar',
    title: 'AI Ethics & Responsible Computing',
    description: 'An important discussion on the ethical implications of artificial intelligence and machine learning. Explore bias in AI systems, privacy concerns, and best practices for developing responsible AI applications.',
    shortDescription: 'Seminar on AI ethics, bias, and responsible computing practices.',
    organization: 'GSA',
    category: 'seminar',
    status: 'upcoming',
    date: '2025-11-18T15:00:00Z',
    venue: {
      name: 'Virtual Event',
      address: 'Online',
      city: 'Virtual',
      isOnline: true,
      meetingLink: 'https://meet.google.com/gsa-ai-ethics'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'AI Ethics Seminar'
    },
    keywords: ['AI Ethics', 'Responsible AI', 'Machine Learning', 'Privacy', 'Bias'],
    registrationUrl: 'https://google.com',
    maxAttendees: 200,
    currentAttendees: 87,
    speakers: [
      {
        name: 'Prof. Aditya Sharma',
        designation: 'AI Research Scientist',
        company: 'IIT Bombay',
        image: '/professional-faculty-member-in-office-with-books.jpg'
      }
    ],
    agenda: [
      { time: '15:00', activity: 'Introduction to AI Ethics', speaker: 'Prof. Aditya Sharma' },
      { time: '15:30', activity: 'Case Studies: Bias in AI Systems', speaker: 'Prof. Aditya Sharma' },
      { time: '16:15', activity: 'Q&A and Discussion', speaker: 'Prof. Aditya Sharma' }
    ]
  },
  {
    id: 'coding-club-open-source-contest',
    title: 'Open Source Contribution Challenge',
    description: 'Month-long challenge encouraging students to contribute to open source projects. Participants will learn Git/GitHub, find suitable projects, make meaningful contributions, and compete for prizes based on their contributions.',
    shortDescription: 'Month-long challenge to encourage meaningful open source contributions.',
    organization: 'Coding Club',
    category: 'competition',
    status: 'upcoming',
    date: '2025-02-01T00:00:00Z',
    endDate: '2025-02-28T23:59:59Z',
    venue: {
      name: 'Online Competition',
      address: 'Remote participation',
      city: 'Virtual',
      isOnline: true
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Open Source Challenge'
    },
    keywords: ['Open Source', 'Git', 'GitHub', 'Collaboration', 'Programming'],
    registrationUrl: 'https://google.com',
    registrationDeadline: '2025-01-31T23:59:59Z',
    maxAttendees: 150,
    currentAttendees: 73,
    agenda: [
      { time: 'Week 1', activity: 'Git/GitHub Workshop & Project Selection', speaker: 'Coding Club Team' },
      { time: 'Week 2-3', activity: 'Making Contributions & Mentorship', speaker: 'Senior Members' },
      { time: 'Week 4', activity: 'Final Submissions & Evaluation', speaker: 'Judges Panel' }
    ]
  },
  {
    id: 'gdg-tensorflow-workshop-2025',
    title: 'TensorFlow & Machine Learning Workshop',
    description: 'Comprehensive workshop on machine learning using TensorFlow. Learn to build, train, and deploy ML models for real-world applications including image classification, natural language processing, and predictive analytics.',
    shortDescription: 'Comprehensive workshop on machine learning and TensorFlow for beginners.',
    organization: 'GDG',
    category: 'workshop',
    status: 'upcoming',
    date: '2025-12-08T10:00:00Z',
    venue: {
      name: 'AI/ML Lab',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'TensorFlow ML Workshop'
    },
    keywords: ['TensorFlow', 'Machine Learning', 'AI', 'Deep Learning', 'Neural Networks'],
    registrationUrl: 'https://gdg-tensorflow-workshop.eventbrite.com',
    registrationDeadline: '2025-12-05T23:59:59Z',
    maxAttendees: 80,
    currentAttendees: 45,
    speakers: [
      {
        name: 'Dr. Ankit Patel',
        designation: 'ML Engineer',
        company: 'Google Brain',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      },
      {
        name: 'Kavya Reddy',
        designation: 'Data Scientist',
        company: 'Microsoft',
        image: '/professional-young-woman-in-business-attire-in-off.jpg'
      }
    ],
    prerequisites: [
      'Basic Python programming knowledge',
      'Understanding of statistics and linear algebra',
      'Laptop with Python 3.8+ installed'
    ],
    agenda: [
      { time: '10:00', activity: 'Introduction to Machine Learning & TensorFlow', speaker: 'Dr. Ankit Patel' },
      { time: '11:30', activity: 'Building Your First Neural Network', speaker: 'Kavya Reddy' },
      { time: '13:00', activity: 'Lunch Break', speaker: '' },
      { time: '14:00', activity: 'Image Classification Project', speaker: 'Dr. Ankit Patel' },
      { time: '15:30', activity: 'Model Deployment & Best Practices', speaker: 'Kavya Reddy' },
      { time: '16:30', activity: 'Q&A and Networking', speaker: 'Both Speakers' }
    ]
  },
  {
    id: 'gsa-cybersecurity-seminar-2025',
    title: 'Cybersecurity Awareness & Ethical Hacking',
    description: 'Essential seminar on cybersecurity fundamentals, ethical hacking techniques, and digital privacy. Learn about common vulnerabilities, penetration testing, and how to secure applications and personal data.',
    shortDescription: 'Essential seminar on cybersecurity fundamentals and ethical hacking techniques.',
    organization: 'GSA',
    category: 'seminar',
    status: 'upcoming',
    date: '2025-10-25T15:00:00Z',
    venue: {
      name: 'Seminar Hall',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Cybersecurity Seminar'
    },
    keywords: ['Cybersecurity', 'Ethical Hacking', 'Penetration Testing', 'Digital Privacy', 'Security'],
    registrationUrl: 'https://gsa-cybersecurity-seminar.com',
    registrationDeadline: '2025-10-23T23:59:59Z',
    maxAttendees: 200,
    currentAttendees: 156,
    speakers: [
      {
        name: 'Raj Kumar',
        designation: 'Cybersecurity Expert',
        company: 'IBM Security',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      }
    ],
    agenda: [
      { time: '15:00', activity: 'Introduction to Cybersecurity Landscape', speaker: 'Raj Kumar' },
      { time: '15:45', activity: 'Common Vulnerabilities & Attack Vectors', speaker: 'Raj Kumar' },
      { time: '16:30', activity: 'Ethical Hacking Demonstration', speaker: 'Raj Kumar' },
      { time: '17:15', activity: 'Personal Security Best Practices', speaker: 'Raj Kumar' },
      { time: '17:45', activity: 'Q&A Session', speaker: 'Raj Kumar' }
    ]
  },
  {
    id: 'coding-club-game-dev-hackathon-2025',
    title: 'GameDev Jam 2025: 48-Hour Game Development Challenge',
    description: 'Create innovative games in 48 hours using Unity, Unreal Engine, or web technologies. Teams will compete to build engaging games around a surprise theme, with mentorship from industry professionals.',
    shortDescription: '48-hour game development hackathon with Unity and web technologies.',
    organization: 'Coding Club',
    category: 'hackathon',
    status: 'upcoming',
    date: '2025-11-15T18:00:00Z',
    endDate: '2025-11-17T18:00:00Z',
    venue: {
      name: 'Gaming Lab & Computer Labs',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Game Development Hackathon'
    },
    keywords: ['Game Development', 'Unity', 'Unreal Engine', 'Hackathon', 'JavaScript', 'C#'],
    registrationUrl: 'https://gamedev-jam-2025.devpost.com',
    registrationDeadline: '2025-11-10T23:59:59Z',
    maxAttendees: 120,
    currentAttendees: 87,
    speakers: [
      {
        name: 'Sarah Johnson',
        designation: 'Game Developer',
        company: 'Ubisoft',
        image: '/professional-young-woman-in-business-attire-in-off.jpg'
      },
      {
        name: 'Alex Chen',
        designation: 'Indie Game Developer',
        company: 'Independent',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      }
    ],
    prerequisites: [
      'Basic programming knowledge (C# or JavaScript)',
      'Familiarity with game engines (Unity preferred)',
      'Team formation (2-4 members per team)'
    ],
    price: {
      amount: 500,
      currency: 'INR',
      earlyBird: {
        amount: 300,
        deadline: '2025-11-01T23:59:59Z'
      }
    },
    agenda: [
      { time: 'Friday 18:00', activity: 'Registration & Theme Announcement', speaker: 'Organizers' },
      { time: 'Friday 19:00', activity: 'Team Formation & Brainstorming', speaker: 'Mentors' },
      { time: 'Saturday', activity: 'Development Phase with Mentorship', speaker: 'Industry Mentors' },
      { time: 'Sunday 16:00', activity: 'Final Presentations', speaker: 'All Teams' },
      { time: 'Sunday 18:00', activity: 'Judging & Awards Ceremony', speaker: 'Judges' }
    ]
  },
  {
    id: 'gdg-flutter-conference-2025',
    title: 'Flutter India Conference 2025',
    description: 'Premier conference on Flutter development featuring talks from Google Flutter team, community experts, and industry leaders. Learn about latest Flutter updates, best practices, and future roadmap.',
    shortDescription: 'Premier Flutter conference with Google team and industry experts.',
    organization: 'GDG',
    category: 'conference',
    status: 'upcoming',
    date: '2025-12-15T09:00:00Z',
    venue: {
      name: 'Main Auditorium',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Flutter India Conference'
    },
    keywords: ['Flutter', 'Dart', 'Mobile Development', 'Cross Platform', 'Google', 'Conference'],
    registrationUrl: 'https://flutter-india-conf-2025.eventbrite.com',
    registrationDeadline: '2025-12-10T23:59:59Z',
    maxAttendees: 500,
    currentAttendees: 324,
    speakers: [
      {
        name: 'Tim Sneath',
        designation: 'Product Manager',
        company: 'Google Flutter Team',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      },
      {
        name: 'Pooja Shah',
        designation: 'Flutter Developer Advocate',
        company: 'Google',
        image: '/professional-young-woman-in-business-attire-in-off.jpg'
      },
      {
        name: 'Ravi Teja',
        designation: 'Senior Flutter Developer',
        company: 'Paytm',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      }
    ],
    agenda: [
      { time: '09:00', activity: 'Registration & Welcome Coffee', speaker: 'Organizers' },
      { time: '10:00', activity: 'Keynote: Future of Flutter', speaker: 'Tim Sneath' },
      { time: '11:00', activity: 'Flutter 4.0 New Features', speaker: 'Pooja Shah' },
      { time: '12:00', activity: 'Building Production Apps', speaker: 'Ravi Teja' },
      { time: '13:00', activity: 'Lunch & Networking', speaker: '' },
      { time: '14:00', activity: 'Performance Optimization', speaker: 'Community Speakers' },
      { time: '15:00', activity: 'Flutter Web & Desktop', speaker: 'Community Speakers' },
      { time: '16:00', activity: 'Panel Discussion', speaker: 'All Speakers' },
      { time: '17:00', activity: 'Closing & Prize Distribution', speaker: 'Organizers' }
    ]
  },
  {
    id: 'gsa-data-science-workshop-2025',
    title: 'Data Science & Analytics Workshop',
    description: 'Comprehensive workshop on data science fundamentals including Python for data analysis, data visualization, statistical analysis, and machine learning basics. Perfect for beginners entering the field of data science.',
    shortDescription: 'Comprehensive workshop on data science fundamentals and Python analytics.',
    organization: 'GSA',
    category: 'workshop',
    status: 'upcoming',
    date: '2025-10-30T09:00:00Z',
    venue: {
      name: 'Data Science Lab',
      address: 'PRMITR Campus',
      city: 'Badnera, Maharashtra'
    },
    image: {
      url: 'https://media.licdn.com/dms/image/v2/D5622AQGkTRYjHI57PA/feedshare-shrink_800/B56ZZytRfVGoAg-/0/1745681198603?e=1761177600&v=beta&t=ik4qLaYgx0D7lZiu-g6RnGMUvqZN62qb4jqqisMQTeI',
      alt: 'Data Science Workshop'
    },
    keywords: ['Data Science', 'Python', 'Pandas', 'Machine Learning', 'Data Visualization', 'Analytics'],
    registrationUrl: 'https://gsa-data-science-workshop.com',
    registrationDeadline: '2025-10-28T23:59:59Z',
    maxAttendees: 60,
    currentAttendees: 42,
    speakers: [
      {
        name: 'Dr. Meera Singh',
        designation: 'Senior Data Scientist',
        company: 'Amazon',
        image: '/professional-young-woman-in-business-attire-in-off.jpg'
      },
      {
        name: 'Karthik Ramesh',
        designation: 'ML Engineer',
        company: 'Flipkart',
        image: '/professional-young-man-in-business-attire-presenti.jpg'
      }
    ],
    prerequisites: [
      'Basic Python programming knowledge',
      'Understanding of mathematics and statistics',
      'Laptop with Anaconda/Jupyter installed'
    ],
    agenda: [
      { time: '09:00', activity: 'Introduction to Data Science', speaker: 'Dr. Meera Singh' },
      { time: '10:00', activity: 'Python for Data Analysis', speaker: 'Karthik Ramesh' },
      { time: '11:30', activity: 'Data Cleaning & Preprocessing', speaker: 'Dr. Meera Singh' },
      { time: '13:00', activity: 'Lunch Break', speaker: '' },
      { time: '14:00', activity: 'Data Visualization with Matplotlib', speaker: 'Karthik Ramesh' },
      { time: '15:30', activity: 'Introduction to Machine Learning', speaker: 'Dr. Meera Singh' },
      { time: '16:30', activity: 'Project Work & Q&A', speaker: 'Both Speakers' }
    ]
  }
];

// Helper functions for filtering events
export const getEventsByOrganization = (organization: string): Event[] => {
  if (organization === 'All') return mockEvents;
  return mockEvents.filter(event => event.organization === organization);
};

export const getEventsByStatus = (status: string): Event[] => {
  if (status === 'All') return mockEvents;
  return mockEvents.filter(event => event.status === status);
};

export const getPastEvents = (): Event[] => {
  return mockEvents.filter(event => event.status === 'past');
};

export const getUpcomingEvents = (): Event[] => {
  return mockEvents.filter(event => event.status === 'upcoming');
};

export const searchEvents = (query: string): Event[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockEvents.filter(event => 
    event.title.toLowerCase().includes(lowercaseQuery) ||
    event.description.toLowerCase().includes(lowercaseQuery) ||
    event.keywords.some(keyword => keyword.toLowerCase().includes(lowercaseQuery)) ||
    event.organization.toLowerCase().includes(lowercaseQuery)
  );
};