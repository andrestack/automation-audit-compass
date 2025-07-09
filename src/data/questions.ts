export interface Question {
  id: string;
  type: 'multiple-choice' | 'scale' | 'text' | 'number';
  category: 'business' | 'processes' | 'technology' | 'goals';
  title: string;
  description?: string;
  options?: { value: string; label: string; points?: number }[];
  min?: number;
  max?: number;
  required: boolean;
}

export const questions: Question[] = [
  // Business Overview
  {
    id: 'business-size',
    type: 'multiple-choice',
    category: 'business',
    title: 'What is the size of your business?',
    description: 'This helps us understand the scale of automation opportunities.',
    options: [
      { value: 'solo', label: 'Solo entrepreneur/Freelancer', points: 1 },
      { value: 'small', label: 'Small team (2-10 people)', points: 2 },
      { value: 'medium', label: 'Medium business (11-50 people)', points: 3 },
      { value: 'large', label: 'Large business (50+ people)', points: 4 }
    ],
    required: true
  },
  {
    id: 'industry',
    type: 'multiple-choice',
    category: 'business',
    title: 'What industry do you operate in?',
    options: [
      { value: 'consulting', label: 'Consulting/Professional Services' },
      { value: 'ecommerce', label: 'E-commerce/Retail' },
      { value: 'saas', label: 'SaaS/Technology' },
      { value: 'healthcare', label: 'Healthcare' },
      { value: 'education', label: 'Education' },
      { value: 'finance', label: 'Finance/Banking' },
      { value: 'manufacturing', label: 'Manufacturing' },
      { value: 'real-estate', label: 'Real Estate' },
      { value: 'marketing', label: 'Marketing/Advertising' },
      { value: 'other', label: 'Other' }
    ],
    required: true
  },
  
  // Time & Process Assessment
  {
    id: 'time-on-admin',
    type: 'scale',
    category: 'processes',
    title: 'How many hours per week do you spend on administrative tasks?',
    description: 'Include things like data entry, scheduling, email management, reporting.',
    min: 0,
    max: 40,
    required: true
  },
  {
    id: 'repetitive-tasks',
    type: 'multiple-choice',
    category: 'processes',
    title: 'Which repetitive tasks consume most of your time?',
    description: 'Select all that apply.',
    options: [
      { value: 'email-management', label: 'Email management and responses', points: 3 },
      { value: 'data-entry', label: 'Data entry and updates', points: 4 },
      { value: 'scheduling', label: 'Scheduling and calendar management', points: 3 },
      { value: 'invoicing', label: 'Invoicing and billing', points: 4 },
      { value: 'lead-qualification', label: 'Lead qualification and follow-up', points: 5 },
      { value: 'reporting', label: 'Report generation', points: 4 },
      { value: 'social-media', label: 'Social media posting', points: 2 },
      { value: 'customer-support', label: 'Customer support inquiries', points: 3 },
      { value: 'inventory', label: 'Inventory management', points: 4 },
      { value: 'document-processing', label: 'Document processing and filing', points: 3 }
    ],
    required: true
  },
  {
    id: 'manual-errors',
    type: 'scale',
    category: 'processes',
    title: 'How often do manual errors occur in your processes?',
    description: 'Rate from 1 (rarely) to 10 (frequently)',
    min: 1,
    max: 10,
    required: true
  },
  
  // Technology Assessment
  {
    id: 'current-tools',
    type: 'multiple-choice',
    category: 'technology',
    title: 'Which tools does your business currently use?',
    description: 'Select all that apply.',
    options: [
      { value: 'crm', label: 'CRM (Salesforce, HubSpot, etc.)' },
      { value: 'email-marketing', label: 'Email marketing platform' },
      { value: 'project-management', label: 'Project management tools' },
      { value: 'accounting', label: 'Accounting software' },
      { value: 'ecommerce', label: 'E-commerce platform' },
      { value: 'social-media', label: 'Social media management tools' },
      { value: 'analytics', label: 'Analytics and reporting tools' },
      { value: 'communication', label: 'Team communication tools' },
      { value: 'cloud-storage', label: 'Cloud storage solutions' },
      { value: 'none', label: 'Very few or basic tools' }
    ],
    required: true
  },
  {
    id: 'integration-challenges',
    type: 'scale',
    category: 'technology',
    title: 'How challenging is it to get your current tools to work together?',
    description: 'Rate from 1 (everything works seamlessly) to 10 (major integration issues)',
    min: 1,
    max: 10,
    required: true
  },
  {
    id: 'tech-comfort',
    type: 'multiple-choice',
    category: 'technology',
    title: 'How would you describe your comfort level with technology?',
    options: [
      { value: 'beginner', label: 'Beginner - I prefer simple solutions', points: 1 },
      { value: 'intermediate', label: 'Intermediate - I can learn new tools', points: 2 },
      { value: 'advanced', label: 'Advanced - I love trying new technologies', points: 3 },
      { value: 'expert', label: 'Expert - I can implement complex solutions', points: 4 }
    ],
    required: true
  },
  
  // Goals & Impact
  {
    id: 'primary-goals',
    type: 'multiple-choice',
    category: 'goals',
    title: 'What are your primary goals for automation?',
    description: 'Select your top 3 priorities.',
    options: [
      { value: 'save-time', label: 'Save time on repetitive tasks', points: 5 },
      { value: 'reduce-errors', label: 'Reduce manual errors', points: 4 },
      { value: 'improve-customer', label: 'Improve customer experience', points: 4 },
      { value: 'scale-business', label: 'Scale business without hiring', points: 5 },
      { value: 'better-insights', label: 'Get better business insights', points: 3 },
      { value: 'reduce-costs', label: 'Reduce operational costs', points: 4 },
      { value: 'improve-quality', label: 'Improve work quality and consistency', points: 3 },
      { value: 'faster-response', label: 'Respond to customers faster', points: 4 }
    ],
    required: true
  },
  {
    id: 'automation-budget',
    type: 'multiple-choice',
    category: 'goals',
    title: 'What budget range are you considering for automation solutions?',
    options: [
      { value: 'minimal', label: 'Under $500/month', points: 1 },
      { value: 'small', label: '$500-$1,500/month', points: 2 },
      { value: 'medium', label: '$1,500-$5,000/month', points: 3 },
      { value: 'large', label: '$5,000+/month', points: 4 },
      { value: 'unsure', label: 'Not sure yet', points: 0 }
    ],
    required: true
  },
  {
    id: 'implementation-timeline',
    type: 'multiple-choice',
    category: 'goals',
    title: 'When would you like to start implementing automation?',
    options: [
      { value: 'immediately', label: 'Immediately - I need solutions now' },
      { value: 'month', label: 'Within the next month' },
      { value: 'quarter', label: 'Within the next 3 months' },
      { value: 'exploring', label: 'Just exploring options for now' }
    ],
    required: true
  }
];

export const getQuestionsByCategory = (category: string) => 
  questions.filter(q => q.category === category);

export const getTotalQuestions = () => questions.length;