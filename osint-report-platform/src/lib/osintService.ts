
import { v4 as uuidv4 } from 'uuid';

// Type definitions
type OsintQuery = {
  type: 'domain' | 'email' | 'person';
  value: string;
};

type OsintResult = {
  id: string;
  title: string;
  category: string;
  data: Record<string, any>;
};

// Mock data for demonstration
// In a real application, this would call actual APIs
const getMockDomainResults = (domain: string): OsintResult[] => [
  {
    id: uuidv4(),
    title: 'WHOIS Information',
    category: 'Domain Intelligence',
    data: {
      'Registration Date': '2021-06-15',
      'Expiry Date': '2023-06-15',
      'Registrar': 'Example Registrar Inc.',
      'Name Servers': ['ns1.example.com', 'ns2.example.com'],
      'Owner': 'Example Organization',
      'Email': 'admin@example.com',
      'Phone': '+1 555-123-4567'
    }
  },
  {
    id: uuidv4(),
    title: 'DNS Records',
    category: 'Domain Intelligence',
    data: {
      'A Record': '192.168.1.1',
      'MX Records': ['mail.example.com', 'mail2.example.com'],
      'TXT Records': ['v=spf1 include:_spf.example.com ~all'],
      'NS Records': ['ns1.example.com', 'ns2.example.com'],
      'CNAME Records': ['www.example.com']
    }
  },
  {
    id: uuidv4(),
    title: 'IP Information',
    category: 'Server Information',
    data: {
      'IP Address': '192.168.1.1',
      'Location': 'San Francisco, CA',
      'ISP': 'Example ISP',
      'Hosting Provider': 'Example Cloud Services',
      'Detected OS': 'Linux',
      'Open Ports': [80, 443, 22],
      'Security Issues': 'None detected'
    }
  },
  {
    id: uuidv4(),
    title: 'Subdomains',
    category: 'Domain Intelligence',
    data: {
      'Total Found': 5,
      'Subdomains': [
        'blog.example.com', 
        'api.example.com', 
        'mail.example.com',
        'dev.example.com',
        'test.example.com'
      ]
    }
  },
  {
    id: uuidv4(),
    title: 'Website Technologies',
    category: 'Technical Analysis',
    data: {
      'CMS': 'WordPress',
      'Server': 'Nginx',
      'JavaScript Frameworks': ['React', 'jQuery'],
      'Analytics': 'Google Analytics',
      'JavaScript Libraries': ['moment.js', 'lodash'],
      'Security': ['SSL/TLS']
    }
  },
  {
    id: uuidv4(),
    title: 'SSL Certificate',
    category: 'Security Information',
    data: {
      'Valid': true,
      'Issued By': 'Let\'s Encrypt',
      'Issued To': domain,
      'Valid From': '2022-01-15',
      'Valid Until': '2023-01-15',
      'Key Strength': '2048-bit',
      'Signature Algorithm': 'SHA-256'
    }
  }
];

const getMockEmailResults = (email: string): OsintResult[] => [
  {
    id: uuidv4(),
    title: 'Email Validation',
    category: 'Email Intelligence',
    data: {
      'Valid Format': true,
      'Deliverable': true,
      'Free Provider': email.includes('gmail') || email.includes('yahoo') || email.includes('hotmail'),
      'Disposable': false,
      'MX Records': ['mx.example.com'],
      'Role Account': email.startsWith('admin') || email.startsWith('info')
    }
  },
  {
    id: uuidv4(),
    title: 'Data Breach Information',
    category: 'Security Intelligence',
    data: {
      'Breaches Found': 3,
      'Breach Names': [
        'ExampleBreachOne (2020)', 
        'ExampleBreachTwo (2021)', 
        'ExampleBreachThree (2022)'
      ],
      'Exposed Data': [
        'Email address', 
        'Password (hashed)', 
        'Name',
        'Phone number'
      ],
      'Recommendation': 'Change passwords and enable 2FA'
    }
  },
  {
    id: uuidv4(),
    title: 'Social Media Profiles',
    category: 'Online Presence',
    data: {
      'LinkedIn': 'https://linkedin.com/in/example-profile',
      'Twitter': 'https://twitter.com/example',
      'GitHub': 'https://github.com/example',
      'Facebook': 'Not found',
      'Instagram': 'Not found'
    }
  },
  {
    id: uuidv4(),
    title: 'Domain Association',
    category: 'Email Intelligence',
    data: {
      'Primary Domain': email.split('@')[1],
      'Associated Domains': [
        'example.org', 
        'example.net'
      ],
      'Role': 'Owner',
      'WHOIS Records': 3
    }
  }
];

const getMockPersonResults = (name: string): OsintResult[] => [
  {
    id: uuidv4(),
    title: 'Personal Information',
    category: 'Personal Intelligence',
    data: {
      'Full Name': name,
      'Age Range': '30-40',
      'Locations': ['San Francisco, CA', 'New York, NY (previous)'],
      'Occupation': 'Software Engineer',
      'Education': 'Stanford University',
      'Marital Status': 'Married',
      'Languages': ['English', 'Spanish']
    }
  },
  {
    id: uuidv4(),
    title: 'Social Media Presence',
    category: 'Online Presence',
    data: {
      'LinkedIn': 'https://linkedin.com/in/example-person',
      'Twitter': 'https://twitter.com/example_person',
      'Facebook': 'https://facebook.com/example.person',
      'Instagram': 'https://instagram.com/example_person',
      'YouTube': 'Not found',
      'TikTok': 'Not found',
      'GitHub': 'https://github.com/example-person',
    }
  },
  {
    id: uuidv4(),
    title: 'Employment History',
    category: 'Professional Information',
    data: {
      'Current Employer': 'Tech Company Inc.',
      'Position': 'Senior Software Engineer',
      'Previous Employers': [
        'Previous Company Ltd. (2018-2020)',
        'First Company LLC (2015-2018)'
      ],
      'Skills': [
        'JavaScript', 'Python', 'Cloud Computing', 'React', 'Node.js'
      ]
    }
  },
  {
    id: uuidv4(),
    title: 'Online Activity',
    category: 'Online Presence',
    data: {
      'Blog': 'https://example-person-blog.com',
      'Forums': ['Stack Overflow', 'Reddit'],
      'Publications': ['Medium', 'Dev.to'],
      'Recent Activity': '2 weeks ago'
    }
  },
  {
    id: uuidv4(),
    title: 'Associated Emails',
    category: 'Contact Information',
    data: {
      'Primary Email': `${name.toLowerCase().replace(' ', '.')}@gmail.com`,
      'Secondary Emails': [
        `${name.toLowerCase().replace(' ', '_')}@outlook.com`,
        `${name.toLowerCase().split(' ')[0]}@professional-domain.com`
      ],
      'Verification': 'Emails have been verified'
    }
  },
  {
    id: uuidv4(),
    title: 'Digital Footprint',
    category: 'Online Presence',
    data: {
      'Websites': 2,
      'Social Profiles': 5,
      'News Mentions': 1,
      'Images': 12,
      'Videos': 3,
      'First Seen Online': '2010-05-15'
    }
  }
];

// Service function to perform OSINT search
export const performOsintSearch = async (query: OsintQuery): Promise<OsintResult[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock data based on query type
  switch (query.type) {
    case 'domain':
      return getMockDomainResults(query.value);
    case 'email':
      return getMockEmailResults(query.value);
    case 'person':
      return getMockPersonResults(query.value);
    default:
      return [];
  }
};
