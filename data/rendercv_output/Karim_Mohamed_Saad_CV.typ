// Import the rendercv function and all the refactored components
#import "@preview/rendercv:0.3.0": *

// Apply the rendercv template with custom configuration
#show: rendercv.with(
  name: "Karim Mohamed Saad",
  title: "Karim Mohamed Saad - CV",
  footer: context { [#emph[Karim Mohamed Saad - Page #str(here().page()) of #str(counter(page).final().first())]] },
  top-note: [ #emph[Last updated in Nov 2026] ],
  locale-catalog-language: "en",
  text-direction: ltr,
  page-size: "us-letter",
  page-top-margin: 0.7in,
  page-bottom-margin: 0.7in,
  page-left-margin: 0.7in,
  page-right-margin: 0.7in,
  page-show-footer: true,
  page-show-top-note: true,
  colors-body: rgb(0, 0, 0),
  colors-name: rgb(0, 79, 144),
  colors-headline: rgb(0, 79, 144),
  colors-connections: rgb(0, 79, 144),
  colors-section-titles: rgb(0, 79, 144),
  colors-links: rgb(0, 79, 144),
  colors-footer: rgb(128, 128, 128),
  colors-top-note: rgb(128, 128, 128),
  typography-line-spacing: 0.6em,
  typography-alignment: "justified",
  typography-date-and-location-column-alignment: right,
  typography-font-family-body: "Source Sans 3",
  typography-font-family-name: "Source Sans 3",
  typography-font-family-headline: "Source Sans 3",
  typography-font-family-connections: "Source Sans 3",
  typography-font-family-section-titles: "Source Sans 3",
  typography-font-size-body: 10pt,
  typography-font-size-name: 30pt,
  typography-font-size-headline: 10pt,
  typography-font-size-connections: 10pt,
  typography-font-size-section-titles: 1.4em,
  typography-small-caps-name: false,
  typography-small-caps-headline: false,
  typography-small-caps-connections: false,
  typography-small-caps-section-titles: false,
  typography-bold-name: true,
  typography-bold-headline: false,
  typography-bold-connections: false,
  typography-bold-section-titles: true,
  links-underline: false,
  links-show-external-link-icon: false,
  header-alignment: center,
  header-photo-width: 3.5cm,
  header-space-below-name: 0.7cm,
  header-space-below-headline: 0.7cm,
  header-space-below-connections: 0.7cm,
  header-connections-hyperlink: true,
  header-connections-show-icons: true,
  header-connections-display-urls-instead-of-usernames: false,
  header-connections-separator: "",
  header-connections-space-between-connections: 0.5cm,
  section-titles-type: "with_partial_line",
  section-titles-line-thickness: 0.5pt,
  section-titles-space-above: 0.5cm,
  section-titles-space-below: 0.3cm,
  sections-allow-page-break: true,
  sections-space-between-text-based-entries: 0.3em,
  sections-space-between-regular-entries: 0.5em,
  entries-date-and-location-width: 4.15cm,
  entries-side-space: 0.2cm,
  entries-space-between-columns: 0.1cm,
  entries-allow-page-break: false,
  entries-short-second-row: false,
  entries-degree-width: 1cm,
  entries-summary-space-left: 0cm,
  entries-summary-space-above: 0cm,
  entries-highlights-bullet:  "•" ,
  entries-highlights-nested-bullet:  "•" ,
  entries-highlights-space-left: 0.15cm,
  entries-highlights-space-above: 0cm,
  entries-highlights-space-between-items: 0cm,
  entries-highlights-space-between-bullet-and-text: 0.5em,
  date: datetime(
    year: 2026,
    month: 11,
    day: 4,
  ),
)


= Karim Mohamed Saad

  #headline([Full Stack Developer \/ Data Analyst])

#connections(
  [#connection-with-icon("location-dot")[Egypt]],
  [#link("mailto:karimsaad1552003@gmail.com", icon: false, if-underline: false, if-color: false)[#connection-with-icon("envelope")[karimsaad1552003\@gmail.com]]],
  [#link("tel:+20-11-45222298", icon: false, if-underline: false, if-color: false)[#connection-with-icon("phone")[011 45222298]]],
  [#link("https://karim-saad-portofolio.vercel.app/", icon: false, if-underline: false, if-color: false)[#connection-with-icon("link")[karim-saad-portofolio.vercel.app]]],
  [#link("https://linkedin.com/in/karimmsaad", icon: false, if-underline: false, if-color: false)[#connection-with-icon("linkedin")[karimmsaad]]],
  [#link("https://github.com/karimsaad1552003-creator", icon: false, if-underline: false, if-color: false)[#connection-with-icon("github")[karimsaad1552003-creator]]],
)


== Professional Summary

Information Systems graduate (AAST, 2026) working across full-stack development and data analysis. Builds client software at Ascendra, including school management and gate access systems, and has delivered 20+ websites for US businesses with Vertex Reviews. Turns data into insight with Power BI dashboards and Python machine learning workflows, with hands-on ML experience from Telecom Egypt. Client-facing sales experience adds strong communication and requirements-gathering skills.

== Education

#education-entry(
  [
    #strong[Arab Academy for Science, Technology & Maritime Transport], College of Computing and Information Technology

    #summary[Information Systems]

  ],
  [
    Alexandria, Egypt

    2022 – 2026

  ],
  degree-column: [
    #strong[BSc]
  ],
  main-column-second-row: [
  ],
)

#education-entry(
  [
    #strong[Collège Saint-Marc], Secondary Education

  ],
  [
    Alexandria, Egypt

  ],
  degree-column: [
    
  ],
  main-column-second-row: [
  ],
)

== Experience

#regular-entry(
  [
    #strong[Ascendra], Full Stack Developer

    #summary[Build school systems and gate systems at a technology studio delivering custom software, websites, and IoT systems for clients in Egypt and the United States.]

  ],
  [
    Alexandria, Egypt

    Apr 2026 – present

  ],
  main-column-second-row: [
    - Live site: #link("https://ascendrasol.com/")[ascendrasol.com]

  ],
)

#regular-entry(
  [
    #strong[Vertex Reviews], Full Stack Developer

    #summary[Work with Vertex Reviews through its collaboration with Ascendra, which runs Vertex's back-end services. Delivered 20+ websites and business rebranding through logos, flyers, and printable menus.]

  ],
  [
    New Jersey, USA (Remote)

    Apr 2026 – present

  ],
  main-column-second-row: [
    - Live site: #link("https://www.vertexreviews.com")[vertexreviews.com]

  ],
)

#regular-entry(
  [
    #strong[ElitePlus], Real Estate Agent (Sales)

    #summary[Worked in client-facing real estate sales, building communication, negotiation, and relationship management skills.]

  ],
  [
    Egypt

    Aug 2025 – Oct 2026

  ],
  main-column-second-row: [
  ],
)

#regular-entry(
  [
    #strong[Telecom Egypt], Machine and Deep Learning Intern

    #summary[Worked on machine and deep learning tasks, including data preparation and model development.]

  ],
  [
    Egypt

    Jan 2025 – Feb 2025

  ],
  main-column-second-row: [
  ],
)

#regular-entry(
  [
    #strong[AppSoft], Requirements Analyst Intern

    #summary[Analyzed software requirements and wrote specifications for implementation.]

  ],
  [
    Egypt

    July 2024 – Aug 2024

  ],
  main-column-second-row: [
  ],
)

== Skills

#strong[Programming Languages:] Python, Java, C, SQL, JavaScript

#strong[Full-Stack Development:] HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind CSS, Node.js, REST APIs, PostgreSQL

#strong[Data & AI:] Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, TensorFlow, PyTorch, Power BI, Tableau, Excel

#strong[Analysis & Tools:] Requirements analysis, ERD, technical specifications, Microsoft Project, Git, GitHub

#strong[Soft Skills:] Client communication, sales and negotiation, relationship building, stakeholder collaboration

== Languages

#strong[Arabic:] Native

#strong[English:] Fluent

#strong[French:] Fluent (DELF B1)

== Certifications

- Cisco CyberOps Associate (CBROPS) – NTI, Excellent (2024)

- Odoo Technical Bootcamp – 8-hour technical course (2026)

- DELF B1 (French) – French Ministry of National Education (2018)

== Projects

  #regular-entry(
  [
    #strong[VulnGPT – AI-Assisted Web Vulnerability Analysis Engine]

  ],
  [
  ],
  main-column-second-row: [
    #summary[AI-powered web security testing platform using HTTP\/HTTPS traffic analysis, controlled security testing, and evidence-based reporting.]

    - AI-assisted vulnerability analysis, risk prioritization, false-positive verification, and remediation recommendations.

    - Nominated for discussion before the College Council for its technical value and potential impact.

  ],
)

  #regular-entry(
  [
    #strong[Video Game Sales Analysis (Power BI)]

  ],
  [
  ],
  main-column-second-row: [
    #summary[Interactive dashboard on 16,000+ sales records across regions, platforms, and genres.]

  ],
)

  #regular-entry(
  [
    #strong[Machine & Deep Learning Workflows]

  ],
  [
  ],
  main-column-second-row: [
    #summary[End-to-end workflows: collection, cleaning, transformation, model development, and evaluation.]

    - Python, Pandas, Scikit-learn, TensorFlow, PyTorch.

  ],
)

  #regular-entry(
  [
    #strong[Ticketing Management System Design]

  ],
  [
  ],
  main-column-second-row: [
    #summary[ERD, data dictionary, and technical specification for tickets, users, departments, priorities, and status logs.]

  ],
)

  #regular-entry(
  [
    #strong[Pharmacy Management System Planning (Microsoft Project)]

  ],
  [
  ],
  main-column-second-row: [
    #summary[Scope, tasks, timelines, resources, Gantt chart, and milestones.]

  ],
)
