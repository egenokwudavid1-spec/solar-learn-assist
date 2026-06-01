export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  coverImage: string;
  category: string;
  pages: number;
  preview: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  lessons: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Solar Panel Masterclass',
    author: 'Dr. Helios Ray',
    description: 'A comprehensive guide to understanding photovoltaic cells, efficiency ratings, and panel manufacturing processes.',
    price: 49.99,
    coverImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/640ed6c5-42dd-44dd-9985-3351fd1a9a2c/solar-panel-ebook-cover-0662aceb-1780319683264.webp',
    category: 'Solar Panels',
    pages: 245,
    preview: ['Introduction to PV', 'Silicon Types', 'Efficiency Calculations']
  },
  {
    id: '2',
    title: 'Inverters & Batteries: The Heart',
    author: 'Engineer Volt',
    description: 'Master the core components of energy storage and conversion. Covers hybrid inverters and lithium storage.',
    price: 59.99,
    coverImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/640ed6c5-42dd-44dd-9985-3351fd1a9a2c/inverter-battery-ebook-cover-3e58893d-1780319683148.webp',
    category: 'Inverters',
    pages: 180,
    preview: ['DC to AC Conversion', 'Battery Management Systems', 'Sizing Storage']
  },
  {
    id: '3',
    title: 'Ultimate Installation Guide',
    author: 'Chief Tech Mike',
    description: 'Step-by-step procedures for professional solar mounting, wiring, and commissioning.',
    price: 39.99,
    coverImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/640ed6c5-42dd-44dd-9985-3351fd1a9a2c/installation-guide-ebook-cover-3cc3b5e7-1780319683971.webp',
    category: 'Installation',
    pages: 310,
    preview: ['Site Survey', 'Mounting Systems', 'Safety Protocols']
  },
  {
    id: '4',
    title: 'The Solar Business Blueprint',
    author: 'Sarah Watts',
    description: 'Learn how to market solar products, manage projects, and scale your renewable energy business.',
    price: 79.99,
    coverImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/640ed6c5-42dd-44dd-9985-3351fd1a9a2c/solar-business-ebook-cover-5959c78f-1780319683312.webp',
    category: 'Business',
    pages: 150,
    preview: ['Customer Acquisition', 'Financial Models', 'Project Management']
  },
  {
    id: '5',
    title: 'Maintenance & Troubleshooting',
    author: 'Alex Fixit',
    description: 'Diagnose common issues, perform routine checks, and maximize system lifespan.',
    price: 29.99,
    coverImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/640ed6c5-42dd-44dd-9985-3351fd1a9a2c/maintenance-guide-ebook-cover-2d0a0d4e-1780319683744.webp',
    category: 'Maintenance',
    pages: 120,
    preview: ['Cleaning Schedules', 'Multimeter Diagnostics', 'Common Failure Points']
  },
  {
    id: '6',
    title: 'Off-Grid Living: Solar Secrets',
    author: 'Luna Green',
    description: 'Everything you need to know about becoming energy independent in remote locations.',
    price: 44.99,
    coverImage: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/640ed6c5-42dd-44dd-9985-3351fd1a9a2c/offgrid-solar-ebook-cover-023a9b3e-1780319683887.webp',
    category: 'Off-Grid',
    pages: 200,
    preview: ['Load Assessment', 'Generator Integration', 'Battery Bank Design']
  }
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Solar Installation 101',
    description: 'Learn the basics of installing a small residential solar system.',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=800',
    lessons: 12,
    duration: '6 hours',
    difficulty: 'Beginner'
  },
  {
    id: 'c2',
    title: 'Advanced PV Engineering',
    description: 'Deep dive into electrical calculations and grid-tied synchronization.',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800',
    lessons: 25,
    duration: '18 hours',
    difficulty: 'Advanced'
  },
  {
    id: 'c3',
    title: 'Solar Sales Professional',
    description: 'Master the art of selling renewable energy solutions.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800',
    lessons: 8,
    duration: '4 hours',
    difficulty: 'Intermediate'
  }
];

export const CATEGORIES = [
  'All', 'Solar Panels', 'Inverters', 'Batteries', 'Charge Controllers', 
  'Installation', 'Maintenance', 'Business', 'Off-Grid', 'Hybrid'
];