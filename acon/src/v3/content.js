import { content } from '../../../pyj/src/lib/config';

export const role = 'Independent Software, Cloud & AI Engineering Consultant';

export const hero = {
  ...content.hero,
  availabilityBadge: 'Available for select consulting projects · remote or San Diego',
  eyebrow: 'Software, cloud & AI engineering · 20+ years',
  headline: 'Secure web applications, reliable cloud systems, and practical AI automation.',
  subheadline:
    'I bring 20+ years of software engineering experience at companies including Google, Intuit, Medtronic, ADP, Ticketmaster, and The Walt Disney Company. I help teams build secure, responsive web applications, improve Python and SQL workloads, and design cloud services and AI automation for production.',
  proofPoints: [
    ...content.hero.proofPoints.slice(0, -1),
    { value: '20+ years', label: 'Production engineering' },
  ],
  techMarquee: [
    'Python', 'AWS', 'SQL', 'React', 'TypeScript', 'Node.js', 'Go (Golang)', 'Ruby', 'C#',
    'PHP', 'Angular', 'HTML5', 'Azure', 'GCP', 'SAML', 'Okta', 'Kubernetes', 'AI automation',
  ],
};

export const positioning = {
  heading: 'Engineering expertise',
  subheading: 'Hands-on consulting for secure applications, cloud architecture, and high-volume systems.',
  pillars: [
    {
      title: 'Secure, responsive websites and applications',
      body: 'I build responsive websites and web applications using PHP, React (ReactJS), TypeScript, Angular, and HTML5. I implement secure single sign-on and authentication with SAML, Okta, OpenID Connect, Microsoft Entra ID, and Google and Facebook sign-in.',
    },
    {
      title: 'Cloud architecture for heavy workloads',
      body: 'I design and implement services on AWS, Microsoft Azure, and Google Cloud (GCP). I tune architectures for high-volume workloads and design distributed processing and compute for high availability across regions.',
    },
    {
      title: 'APIs, live reporting, and automation',
      body: 'I build APIs and automation with Python, Node.js, Go (Golang), Ruby, and C#. I tune SQL queries and data pipelines that generate live reports, and integrate AI into production workflows with testing and monitoring.',
    },
  ],
};

export const skills = {
  heading: content.skills.heading,
  subheading: 'Languages, platforms, and practices I use to build and operate production systems.',
  groups: [
    {
      name: 'Programming & APIs',
      items: ['Python', 'Node.js', 'Go (Golang)', 'Ruby', 'C#', 'PHP', 'TypeScript', 'FastAPI', 'Flask', 'REST', 'GraphQL'],
    },
    {
      name: 'Responsive web & identity',
      items: ['React', 'Angular', 'HTML5', 'Responsive web design', 'SAML', 'Okta', 'OpenID Connect', 'Microsoft Entra ID', 'Google and Facebook sign-in'],
    },
    {
      name: 'Cloud services & architecture',
      items: ['AWS', 'Microsoft Azure', 'Google Cloud (GCP)', 'AWS Lambda', 'ECS', 'EKS', 'Docker', 'Kubernetes', 'Terraform', 'Multi-region compute', 'High availability'],
    },
    {
      name: 'Data engineering & live reporting',
      items: ['SQL', 'Live report generation', 'Query tuning', 'PostgreSQL', 'MySQL', 'Apache Kafka', 'Apache Airflow', 'Apache Spark', 'ETL / ELT', 'Distributed processing'],
    },
    {
      name: 'AI automation',
      items: ['LLM integrations', 'LangChain', 'OpenAI API', 'Anthropic API', 'Retrieval-augmented generation (RAG)', 'LLM evaluation', 'Workflow automation'],
    },
    {
      name: 'Performance & reliability',
      items: ['Load and latency tuning', 'Autoscaling', 'Caching', 'Distributed tracing', 'Structured logging', 'Automated testing', 'CI/CD', 'Incident response'],
    },
  ],
};

export const credentials = {
  ...content.credentials,
  focusHeading: 'Technical focus areas',
  certifications: [
    { name: 'Software & web engineering', issuer: 'Responsive web applications, APIs, single sign-on, and identity integration' },
    { name: 'Cloud & distributed systems', issuer: 'AWS, Azure, GCP, Kubernetes, Terraform, and multi-region compute' },
    { name: 'Data & AI engineering', issuer: 'SQL performance, live reporting, data pipelines, and AI automation' },
    { name: 'Testing & code quality', issuer: 'Automated testing, code review, observability, and CI/CD' },
  ],
};
