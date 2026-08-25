export type SocialLink = {
  label: string;
  href: string;
  icon: "linkedin" | "github" | "email" | "phone" | "website";
};

export type SkillCategory = {
  id: string;
  label: string;
  skills: string[];
};

export type ProjectCaseStudy = {
  problem?: string;
  research?: string;
  solution?: string;
  architecture?: string;
  implementation?: string;
  technologies?: string[];
  challenges?: string;
  results?: string;
  lessons?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  featured: boolean;
  priority: number;
  category: string;
  year?: string;
  role?: string;
  summary: string;
  problem?: string;
  solution?: string;
  highlights: string[];
  technologies: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: ProjectCaseStudy;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  location?: string;
  start: string;
  end: string;
  type: "full-time" | "internship" | "co-founder" | "freelance" | "collaboration";
  url?: string;
  summary: string;
  responsibilities: string[];
  technologies?: string[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  start: string;
  end: string;
  location?: string;
  gpa?: string;
  showGpa?: boolean;
  highlights?: string[];
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  note?: string;
  credentialUrl?: string;
  fileUrl?: string;
};

export type JourneyStep = {
  id: string;
  label: string;
  title: string;
  description: string;
};

export type PortfolioData = {
  personal: {
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    photo: string;
    positioning: string;
    shortBio: string;
    about: string[];
    focusAreas: string[];
    currentlyToward: string;
    languages: { name: string; level: string }[];
  };
  socials: SocialLink[];
  cv: {
    viewUrl: string;
    downloadUrl: string;
    fileName: string;
  };
  skills: SkillCategory[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  journey: JourneyStep[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
    siteUrl: string;
    ogImage: string;
  };
};

/**
 * CENTRAL PORTFOLIO DATA
 * Update this file to change site content everywhere.
 * Leave empty strings / omit optional fields when information is not available.
 */
export const portfolioData: PortfolioData = {
  personal: {
    firstName: "Karim",
    lastName: "Saad",
    fullName: "Karim Mohamed Saad",
    title: "Full Stack Developer · Data & AI",
    location: "Alexandria, Egypt",
    email: "karimsaad1552003@gmail.com",
    phone: "01145222298",
    photo: "/assets/images/karim-saad.jpg",
    positioning:
      "Building intelligent software, data-driven systems, and production-ready digital products.",
    shortBio:
      "Computer Science student and full-stack developer specializing in data analysis, AI, and shipping real products for businesses across Egypt and the US.",
    about: [
      "I am a Computer Science student at the Arab Academy for Science, Technology & Maritime Transport, specializing in data analysis and artificial intelligence while shipping production software as a full-stack developer.",
      "As Co-founder of Ascendra and Full Stack Developer at Vertex Reviews, I work on real products — from conversion-focused business platforms to custom software systems serving clients internationally.",
      "I also spent a year as a real estate sales agent at ElitePlus (2025–2026), which strengthened my client-facing communication, negotiation, and relationship-building skills — capabilities I bring into technical collaboration and stakeholder discussions.",
      "I enjoy problems that sit at the intersection of software engineering, data, and product: turning messy requirements into clear systems, interactive analytics, and experiences that hold up in production.",
      "I am currently strengthening my profile toward competitive software engineering, data, and AI roles at major technology companies, startups, and international organizations.",
    ],
    focusAreas: [
      "Full-stack product development",
      "Data analysis & BI",
      "Machine learning workflows",
      "Requirements & system design",
      "Client communication & sales",
    ],
    currentlyToward:
      "Production engineering roles where software, data, and AI meet real business problems.",
    languages: [
      { name: "Arabic", level: "Native" },
      { name: "English", level: "Fluent" },
      { name: "French", level: "DELF B1 · Fluent" },
    ],
  },

  socials: [
    {
      label: "Email",
      href: "mailto:karimsaad1552003@gmail.com",
      icon: "email",
    },
    {
      label: "GitHub",
      href: "https://github.com/karimsaad1552003-creator",
      icon: "github",
    },
    // Add LinkedIn when available
    // { label: "LinkedIn", href: "https://linkedin.com/in/YOUR_HANDLE", icon: "linkedin" },
    {
      label: "Ascendra",
      href: "https://maroweb.net/Ascendra/",
      icon: "website",
    },
    {
      label: "Vertex Reviews",
      href: "https://www.vertexreviews.com",
      icon: "website",
    },
  ],

  cv: {
    viewUrl: "/assets/cv/Karim-CV.pdf",
    downloadUrl: "/assets/cv/Karim-CV.pdf",
    fileName: "Karim-Saad-CV.pdf",
  },

  skills: [
    {
      id: "languages",
      label: "Programming Languages",
      skills: ["Python", "Java", "C", "SQL"],
    },
    {
      id: "ai-ml",
      label: "AI & Machine Learning",
      skills: ["Scikit-learn", "TensorFlow", "Machine Learning workflows", "Deep Learning fundamentals"],
    },
    {
      id: "data",
      label: "Data Science & Analytics",
      skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Tableau", "Excel"],
    },
    {
      id: "software",
      label: "Software & Analysis",
      skills: ["Requirements analysis", "ERD / data modeling", "Technical specifications", "Microsoft Project"],
    },
    {
      id: "security",
      label: "Networking & Security",
      skills: ["CCNA", "Cisco CyberOps Associate (CBROPS)"],
    },
    {
      id: "professional",
      label: "Professional Skills",
      skills: [
        "Client communication",
        "Sales & negotiation",
        "Relationship building",
        "Stakeholder collaboration",
      ],
    },
  ],

  projects: [
    {
      id: "vertex-reviews",
      slug: "vertex-reviews",
      title: "Vertex Reviews Platform",
      subtitle: "Google Business Profile & reputation management product",
      featured: true,
      priority: 1,
      category: "Full Stack · Product",
      role: "Full Stack Developer",
      summary:
        "Production website and service platform for Vertex Reviews (New Jersey) — structured Google Business Profile optimization, review monitoring, growth strategy, and service packages for US businesses.",
      problem:
        "Local businesses need accurate, optimized, and actively managed Google Business Profiles to earn trust and visibility — incomplete or poorly managed profiles hurt credibility.",
      solution:
        "A polished marketing and conversion website presenting Vertex’s services, packages, and inquiry flows so businesses can understand value and engage quickly.",
      highlights: [
        "Live production site for a US-based reputation management company",
        "Clear service storytelling: Profile Optimization, Monitoring & Response, Growth Strategy, Profile Maintenance",
        "Package architecture spanning Starter, Growth, Premium, and Launch offerings",
      ],
      technologies: ["Full-stack web", "Responsive UI", "Conversion-focused UX"],
      liveUrl: "https://www.vertexreviews.com",
      caseStudy: {
        problem:
          "Businesses lose credibility when Google Business Profiles are incomplete, outdated, or unmanaged. Vertex Reviews needed a professional digital presence that communicates services and converts inquiries.",
        solution:
          "Delivered the public Vertex Reviews web experience presenting services, package tiers, and contact pathways for US clients.",
        technologies: ["Full-stack web development", "Responsive design", "SEO-ready structure"],
        results:
          "Live at vertexreviews.com — the public face of Vertex Reviews’ Google Business Profile and reputation management offerings.",
      },
    },
    {
      id: "ascendra",
      slug: "ascendra",
      title: "Ascendra",
      subtitle: "Technology studio — custom software, websites & IoT",
      featured: true,
      priority: 2,
      category: "Co-founder · Product",
      role: "Co-founder",
      summary:
        "Co-founded Ascendra, a technology studio building custom software, conversion-focused business websites, and offline-first IoT systems for schools, gated communities, and growing businesses across the US and Egypt.",
      problem:
        "Growing businesses need one team that can design, build, deploy, and support real systems — websites, platforms, and field hardware — without agency hand-offs.",
      solution:
        "Ascendra ships end-to-end: business websites, full-stack platforms, IoT access control, and digital presence — deployed on managed infrastructure with domain and business email.",
      highlights: [
        "Authorized Egypt operations partner of Vertex Reviews (New Jersey, USA)",
        "Flagship systems: Sahel Gate (offline-first QR access) and Full School System",
        "Studio positioning across software, IoT, and digital presence for US & Egypt clients",
      ],
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "NestJS",
        "PostgreSQL",
        "Flutter",
        "Python",
        ".NET",
        "Raspberry Pi",
      ],
      image: "/assets/projects/ascendra/homepage.png",
      liveUrl: "https://maroweb.net/Ascendra/",
      caseStudy: {
        problem:
          "Schools, gated communities, and growing businesses needed production-ready software and IoT — not disconnected freelancers or template sites.",
        solution:
          "Built Ascendra as a technology studio delivering websites, custom platforms, offline-first IoT access control, and digital presence with deployment and support included.",
        architecture:
          "Product lines span business websites, Flutter + Next.js + NestJS platforms on PostgreSQL/Redis, and Raspberry Pi / Arduino / .NET / Python IoT gate systems designed to operate offline-first.",
        technologies: [
          "React",
          "Next.js",
          "TypeScript",
          "Flutter",
          "NestJS",
          "PostgreSQL",
          "Redis",
          "Tailwind CSS",
          "Python",
          ".NET",
          "Raspberry Pi",
          "Arduino",
        ],
        results:
          "Public studio presence live; flagship work includes Sahel Gate System (North Coast, Egypt) and Full School System & Control.",
      },
    },
    {
      id: "powerbi-games",
      slug: "video-game-sales-dashboard",
      title: "Video Game Sales Analysis",
      subtitle: "Interactive Power BI market intelligence dashboard",
      featured: true,
      priority: 3,
      category: "Data Analytics",
      role: "Data Analyst",
      summary:
        "Interactive Power BI dashboard analyzing 16,000+ video game sales records across regions to surface platform, genre, and market trends for forecasting and targeting.",
      problem:
        "Raw multi-region sales data is hard to interpret for market targeting, forecasting, and genre strategy without a clear analytical layer.",
      solution:
        "Built an interactive Power BI dashboard that explores regional performance, top platforms, and genre-specific insights from a large sales dataset.",
      highlights: [
        "Dataset of over 16,000 video game sales records",
        "Multi-region trend exploration for forecasting and targeting",
        "Genre and platform performance insights for product strategy",
      ],
      technologies: ["Power BI", "Data modeling", "Dashboard design"],
      caseStudy: {
        problem:
          "Stakeholders needed a clearer view of global video game market trends to support sales forecasting, market targeting, and genre-based development strategy.",
        research:
          "Analyzed a dataset of over 16,000 sales records spanning multiple regions, platforms, and genres.",
        solution:
          "Developed an interactive Power BI dashboard to identify trends, top-performing platforms, and genre-specific insights.",
        technologies: ["Power BI"],
        lessons:
          "Strong visual analytics turns large transactional datasets into decisions about markets, platforms, and product focus.",
      },
    },
    {
      id: "ml-dl-workflows",
      slug: "ml-dl-workflows",
      title: "Machine & Deep Learning Workflows",
      subtitle: "End-to-end ML pipelines for insight and decision support",
      featured: true,
      priority: 4,
      category: "AI / ML",
      role: "ML Developer",
      summary:
        "End-to-end machine learning workflows covering data collection, cleaning, transformation, model development, and evaluation to support data-driven decisions.",
      problem:
        "Raw data rarely produces decisions on its own — it needs disciplined cleaning, modeling, and evaluation.",
      solution:
        "Built and evaluated ML/DL models with Python, Pandas, Scikit-learn, and TensorFlow/PyTorch to extract insights and support decisions.",
      highlights: [
        "Full workflow: collection → cleaning → transformation → modeling",
        "Model evaluation focused on actionable insight",
        "Stack grounded in industry-standard Python ML tooling",
      ],
      technologies: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch"],
      caseStudy: {
        problem:
          "Need for repeatable ML workflows that turn raw datasets into evaluated models and usable insights.",
        implementation:
          "Worked across data collection, cleaning, transformation, and model development using Python scientific and ML libraries.",
        technologies: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "PyTorch"],
      },
    },
    {
      id: "ticketing-erd",
      slug: "ticketing-management-system",
      title: "Ticketing Management System Design",
      subtitle: "Requirements analysis, ERD, and technical specification",
      featured: false,
      priority: 5,
      category: "Systems Analysis",
      role: "Software Analyst",
      summary:
        "Designed the data foundation for a ticketing management system — ERD, data dictionary, and technical specification covering tickets, users, departments, priorities, and status logs.",
      problem:
        "A ticketing product needs a clear data structure and workflow logic before implementation.",
      solution:
        "Produced ERD, attribute-level data dictionary, and a technical specification outlining structure and workflow.",
      highlights: [
        "ERD covering Tickets, Users, Departments, Priorities, Status Logs",
        "Data dictionary with attributes, datatypes, and purpose",
        "Technical specification for future database implementation",
      ],
      technologies: ["ERD", "Data modeling", "Technical writing"],
      caseStudy: {
        problem:
          "Implementation teams need unambiguous data structures before building a ticketing platform.",
        solution:
          "Designed a comprehensive ERD and supporting documentation for core ticketing entities and workflows.",
        technologies: ["Entity-Relationship modeling", "Data dictionaries", "Technical specifications"],
      },
    },
    {
      id: "pharmacy-ms-project",
      slug: "pharmacy-management-planning",
      title: "Pharmacy Management System Planning",
      subtitle: "Project planning with Microsoft Project",
      featured: false,
      priority: 6,
      category: "Project Management",
      role: "Project Planner",
      summary:
        "Detailed project plan for a Pharmacy Management System using Microsoft Project — scope, tasks, timelines, resources, Gantt charts, and milestones.",
      problem:
        "Multi-phase software delivery fails without clear scope, sequencing, and resource planning.",
      solution:
        "Applied project management principles in MS Project to simulate real-world planning across development phases.",
      highlights: [
        "Scope, tasks, timelines, and resource allocations defined",
        "Gantt charts and milestones for delivery coordination",
        "Phase coordination modeled for realistic planning practice",
      ],
      technologies: ["Microsoft Project", "Gantt planning"],
    },
  ],

  experience: [
    {
      id: "ascendra-cofounder",
      company: "Ascendra",
      role: "Co-founder",
      location: "Alexandria, Egypt",
      start: "",
      end: "Present",
      type: "co-founder",
      url: "https://maroweb.net/Ascendra/",
      summary:
        "Co-founded a technology studio building custom software, conversion-focused websites, and offline-first IoT systems for clients in Egypt and the United States.",
      responsibilities: [
        "Help shape and ship Ascendra’s product direction across software, websites, and IoT",
        "Contribute to full-stack delivery for real business platforms and digital products",
        "Support the studio’s partnership as authorized Egypt operations partner of Vertex Reviews (New Jersey, USA)",
      ],
      technologies: ["Full-stack web", "Product delivery", "IoT systems"],
    },
    {
      id: "vertex-fullstack",
      company: "Vertex Reviews",
      role: "Full Stack Developer",
      location: "New Jersey, United States (remote / partner ops)",
      start: "",
      end: "Present",
      type: "full-time",
      url: "https://www.vertexreviews.com",
      summary:
        "Full-stack development for Vertex Reviews — a Google Business Profile and reputation management company serving US businesses.",
      responsibilities: [
        "Build and maintain production web experiences for Vertex Reviews",
        "Support product storytelling for services, packages, and client conversion flows",
        "Collaborate across Ascendra × Vertex partnership delivery",
      ],
      technologies: ["Full-stack web development"],
    },
    {
      id: "eliteplus",
      company: "ElitePlus",
      role: "Real Estate Agent (Sales)",
      location: "Egypt",
      start: "2025",
      end: "2026",
      type: "full-time",
      summary:
        "One year in real estate sales at ElitePlus — developing strong client communication, negotiation, and relationship-building skills in a client-facing commercial environment.",
      responsibilities: [
        "Worked as a real estate sales agent, engaging clients through the sales process",
        "Built strong communication and interpersonal skills through daily client interaction",
        "Practiced negotiation and relationship management in a competitive sales setting",
      ],
    },
    {
      id: "telecom-egypt",
      company: "Telecom Egypt",
      role: "Machine and Deep Learning Developer",
      location: "Egypt",
      start: "",
      end: "",
      type: "internship",
      summary:
        "Internship focused on machine and deep learning development — applying ML workflows to real data problems.",
      responsibilities: [
        "Worked on machine and deep learning development tasks",
        "Applied data preparation and model-oriented problem solving in an enterprise environment",
      ],
      technologies: ["Python", "Machine Learning", "Deep Learning"],
    },
    {
      id: "appsoft",
      company: "AppSoft",
      role: "Requirements Analyst",
      location: "Egypt",
      start: "",
      end: "",
      type: "internship",
      summary:
        "Internship as Requirements Analyst — translating product needs into structured analysis suitable for engineering delivery.",
      responsibilities: [
        "Analyzed software requirements and clarified system expectations",
        "Supported structured documentation for implementation-ready specifications",
      ],
    },
  ],

  education: [
    {
      id: "aast",
      institution: "Arab Academy for Science, Technology & Maritime Transport",
      degree: "Bachelor of Computer Science",
      field: "Computer Science · Data Analysis & AI focus",
      start: "2022",
      end: "2026",
      location: "Egypt",
      gpa: "2.9",
      showGpa: false,
      highlights: [
        "3rd-year Computer Science student specializing in Data Analysis and AI",
        "Combining academic foundations with production software delivery",
      ],
    },
    {
      id: "saint-marc",
      institution: "Collège Saint-Marc",
      degree: "Secondary education",
      field: "General studies",
      start: "",
      end: "",
      location: "Alexandria, Egypt",
    },
  ],

  certifications: [
    {
      id: "cyberops",
      title: "Cisco CyberOps Associate (CBROPS)",
      issuer: "NTI",
      note: "Excellent",
    },
    {
      id: "ccna",
      title: "CCNA",
      issuer: "Cisco",
    },
    {
      id: "odoo",
      title: "Odoo Technical Bootcamp",
      issuer: "Odoo Technical Bootcamp",
      date: "Feb 2026",
      note: "8-hour technical completion",
      fileUrl: "/assets/certificates/odoo-technical-bootcamp.pdf",
    },
  ],

  journey: [
    {
      id: "education",
      label: "01",
      title: "Computer Science foundation",
      description:
        "AAST Computer Science (2022–2026) with a focus on data analysis and AI.",
    },
    {
      id: "learning",
      label: "02",
      title: "Analytics, ML & networking",
      description:
        "Built strength in Python, BI tools, ML libraries, CCNA, and CyberOps.",
    },
    {
      id: "projects",
      label: "03",
      title: "Applied projects",
      description:
        "Dashboards, ML workflows, system design, and project planning delivered as tangible work.",
    },
    {
      id: "experience",
      label: "04",
      title: "Internships to production",
      description:
        "Telecom Egypt (ML/DL) and AppSoft (requirements) → shipping products in industry.",
    },
    {
      id: "sales",
      label: "05",
      title: "Client-facing sales experience",
      description:
        "One year as a real estate sales agent at ElitePlus (2025–2026) — strong communication and negotiation.",
    },
    {
      id: "current",
      label: "06",
      title: "Ascendra & Vertex Reviews",
      description:
        "Co-founder and full-stack developer building software for Egypt and US businesses.",
    },
    {
      id: "future",
      label: "07",
      title: "Next direction",
      description:
        "Competitive software, data, and AI engineering roles at major technology companies.",
    },
  ],

  seo: {
    title: "Karim Mohamed Saad | Full Stack Developer · Data & AI",
    description:
      "Portfolio of Karim Mohamed Saad — Computer Science student, Co-founder at Ascendra, Full Stack Developer at Vertex Reviews. Data analysis, AI, and production software.",
    keywords: [
      "Karim Mohamed Saad",
      "Karim Saad",
      "Full Stack Developer",
      "Data Analysis",
      "Machine Learning",
      "Ascendra",
      "Vertex Reviews",
      "Alexandria",
      "Computer Science",
    ],
    siteUrl: "https://karimsaad.dev",
    ogImage: "/assets/images/karim-saad.jpg",
  },
};

export const featuredProjects = portfolioData.projects
  .filter((p) => p.featured)
  .sort((a, b) => a.priority - b.priority);

export const getProjectBySlug = (slug: string) =>
  portfolioData.projects.find((p) => p.slug === slug);
