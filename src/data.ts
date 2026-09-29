export interface Role {
  company: string;
  title: string;
  period: string;
  /** Desk/market location. Every role carries one, so this is effectively
      required; it is optional in the type only so a future entry can omit it
      rather than have to invent a city. */
  location?: string;
  blurb: string;
  url?: string;
  highlights: string[];
}

export const profile = {
  name: "Tidar Sentausa",
  roles: ["SEO Manager", "Digital Project Manager", "SEO Strategist"],
  location: "Kuala Lumpur, MY",
  email: "tidar.sentausa@gmail.com",
  phone: "+60 16 226 5070",
  site: "https://urbanidea.id",
  linkedin: "https://www.linkedin.com/in/tidar-sentausa/",
  summary:
    "Results-driven SEO Manager with 10+ years of experience transforming digital presence for global brands including Samsung and LegalBison. Specialized in organic search optimization, content strategy, and cross-functional project management with a proven track record of delivering 150%+ lead growth and tripling website traffic through data-driven SEO initiatives.",
} as const;

/** Headline numbers, each traceable to a bullet in the source resume. */
export const stats = [
  { value: 10, suffix: "+", label: "Years in search" },
  { value: 2600, suffix: "K", label: "Impressions added" },
  { value: 1595, suffix: "%", label: "Click growth" },
  { value: 230, suffix: "K", label: "Monthly visits" },
] as const;

/**
 * The SEO and analytics stack.
 *
 * `slug` resolves an SVG from simple-icons. Ahrefs and Screaming Frog were
 * removed upstream for trademark reasons, so both carry a self-hosted `src`:
 * Ahrefs uses its standalone "a" mark rather than the full wordmark. Every
 * slug below was verified to return a real SVG.
 *
 * Note: Moz resolves to the Mozilla mark, since simple-icons has no Moz entry.
 */
export const tools = [
  { name: "Ahrefs", slug: null, src: "/ahrefs.svg" },
  { name: "Semrush", slug: "semrush", src: null },
  { name: "Screaming Frog", slug: null, src: "/sf-favicon.png" },
  { name: "Moz", slug: "mozilla", src: null },
  { name: "Google Search Console", slug: "googlesearchconsole", src: null },
  { name: "Google Analytics", slug: "googleanalytics", src: null },
  { name: "Google Data Studio", slug: "googledatastudio", src: null },
  { name: "Google Tag Manager", slug: "googletagmanager", src: null },
  { name: "Microsoft Clarity", slug: null, src: "/clarity.png" },
  { name: "Similarweb", slug: "similarweb", src: null },
] as const;

export const roles: Role[] = [
  {
    company: "LegalBison.com",
    title: "Search Engine Optimization Manager",
    period: "Dec 2025 - Present",
    location: "Kuala Lumpur, Malaysia",
    blurb:
      "Corporate service provider specializing in FinTech, Web3, and cryptocurrency legal licensing, company formation, and regulatory structuring across global markets. Leading SEO strategy and execution to position LegalBison as the trusted authority in FinTech/crypto regulatory compliance and corporate services.",
    url: "https://legalbison.com",
    highlights: [
      "Prototype AI/automation tooling (LLM + agent workflows) to speed up GSC analysis, reporting, and content ops",
      "Scaled the organic content portfolio from 281 to 789 ranking pages - 515 new pages adding 5,900+ clicks and 2.6M impressions, expanding the ranked-keyword footprint 52% (22.7K to 34.5K queries)",
      "More than doubled Top-3 keyword rankings (3.5K to 7.9K) and lifted average position ~7 spots (23.7 to 16.6), pushing high-intent compliance terms onto page 1",
      "Built regulatory authority in zero-to-one niches - launched key FinTech licensing silos from scratch and grew the licensing hub +373% (318 to 1,504 clicks) across 21 jurisdictions",
      "Delivered flagship, revenue-intent assets guide (1.3K clicks) and a country-driven page (740+ clicks), ranking #2 to #6 for commercial keywords",
      "Reversed a 7-month organic decline, returning traffic to +29% QoQ by Q3 2026 while defending rankings against AI-Overviews CTR compression",
    ],
  },
  {
    company: "Self-Employed",
    title: "SEO Strategy Consultant (Freelance)",
    period: "Jan 2025 - Present",
    location: "Jakarta, Indonesia",
    blurb:
      "Expand brand presence from branded terms to high-intent generic keywords in competitive lifestyle market.",
    highlights: [
      "Spearheaded local proximity SEO strategy, shifting focus from branded to generic keywords across lifestyle category",
      "Delivered 1,595% increase in clicks and 1,386% growth in impressions through full-funnel content expansion and technical site revamp",
      "Boosted keyword visibility by 18,100%, growing Top 3 rankings from 2 to 364 and Top 10 from 60 to 388",
      "Conducted pre-launch technical audits and implemented custom analytics dashboard for hyper-local performance tracking",
      "Captured local intent with dedicated location pages, achieving 435% total organic traffic growth",
    ],
  },
  {
    company: "Samsung Indonesia",
    title: "B2B Digital Project Manager",
    period: "Jan 2024 - Dec 2024",
    location: "Jakarta, Indonesia",
    blurb:
      "Full-scope digital marketing management for Samsung B2B division across website, social media, KOL, OOH, and Salesforce leads.",
    highlights: [
      "Unified disparate teams (web, telesales, creative, KOL, media) into cohesive workflow, producing 49+ marketing assets and 16+ short-form content monthly",
      "Tripled website traffic and achieved 150% over business KPI in qualified leads by August 2024",
      "Generated 95+ B2B lead meetings monthly, directly enhancing forecast revenue pipeline",
      "Delivered 10+ long-form content pieces monthly, boosting overall project efficiency and audience engagement",
      "Championed multi-channel scope expansion; oversaw branded visual/video production and content creation across digital touchpoints",
    ],
  },
  {
    company: "Cheil Worldwide, Samsung B2C",
    title: "SEO Analyst (Regional)",
    period: "Dec 2021 - Aug 2024",
    location: "Singapore / Indonesia",
    blurb:
      "Localization SEO for Samsung websites across multiple APAC markets (Indonesia, Malaysia, Singapore, Philippines).",
    url: "https://samsung.com",
    highlights: [
      "Conducted end-to-end SEO analysis and optimization, increasing B2C pages CTR by +9% and impression share via SERP by +11%",
      "Targeted branded and non-branded keywords across categories, boosting smartphone SERP rank by +12%, display monitor by +11%, and home appliance by +8%",
      "Built content hubs and topical authority segments; performed in-depth keyword research and resolved technical errors via comprehensive audits",
      "Drove sustained organic growth across four markets through strategic content planning and SERP optimization",
    ],
  },
  {
    company: "AMAAN Indonesia",
    title: "Web & App Content Specialist",
    period: "Dec 2020 - Dec 2021",
    location: "Jakarta, Indonesia",
    blurb:
      "Sharia digital platform empowering female micro-entrepreneurs across six Indonesian provinces.",
    url: "https://amaan.co.id",
    highlights: [
      "Strategized internal/external content across channels; implemented SEO for website, in-app experience, social media, and community groups",
      "Developed both short- and long-form content tailored to user needs, enhancing engagement and platform visibility",
      "Collaborated on technical audits and content planning from early-stage development, ensuring compliance and organic discoverability",
    ],
  },
  {
    company: "Chilibeli",
    title: "SEO Content Marketing Specialist",
    period: "Dec 2019 - Dec 2020",
    location: "Jakarta, Indonesia",
    blurb:
      "Build organic presence for social commerce startup from zero domain rating in competitive grocery market.",
    url: "https://chilibeli.id",
    highlights: [
      "Built authority from domain rating 0 to 32 through strategic keyword-driven content and outreach",
      "Generated +230K new organic traffic monthly on top of existing base",
      "Gained 9.2K organic backlinks and 7.2K referring domains through content excellence",
      "Created content funnels for user journeys, converting visitors in competitive grocery market",
    ],
  },
  {
    company: "BukaReview by Bukalapak",
    title: "SEO Content Writer",
    period: "Jan 2017 - Dec 2019",
    location: "Jakarta, Indonesia",
    blurb:
      "Lifestyle blog content management across diverse categories (gadgets, fashion, finance, travel).",
    url: "https://review.bukalapak.com",
    highlights: [
      "Authored 1,601 search engine optimized articles across informational to transactional buying intents",
      "Applied best practices in writing and editing to enhance blog's role as daily activity resource",
      "Boosted user retention through up-to-date, trend-optimized content covering tech, hobbies, and travel",
    ],
  },
  /* The five pre-BukaReview roles, grouped into one row.

     Splitting them out individually was the alternative and it was the wrong
     call. Five copywriter roles in a row, each with its own accordion and its
     own bullet list, is roughly 700px of vertical space describing work that
     is all the same job at a different company - which is exactly what a CV
     should not do. A recruiter reading top-down wants to know the shape of the
     career, and the shape here is "six years of writing and SEO for Indonesian
     consumer and SME brands, then a step up to a lifestyle blog at scale". The
     individual employers are detail that belongs one click away, not five
     clicks away.

     So the companies appear as the bullets - one per role, name, dates and
     what was produced - and the blurb carries the through-line. Same content,
     one disclosure instead of five.

     The dates are kept exactly as LinkedIn records them, which means two
     things worth flagging to the user rather than silently tidying:

     Ensogo (Oct 2013 - Mar 2015) and PT. Vista Indonesia (Oct 2014 - Dec 2014)
     overlap by three months, and the PDF lists Vista *after* Ensogo despite
     starting later. Ensogo and Qraved also overlap in Sep 2013. These are
     almost certainly contract or overlapping engagements rather than a
     mistake, and the bullets are written so the overlap is not hidden - each
     line carries its own dates.

     MatahariMall runs to Oct 2017, and LinkedIn dates Bukalapak from Nov 2017,
     so the two do not actually collide. The period on the row above says
     "Jan 2017 - Dec 2019" and does overlap; that predates this change and was
     left alone rather than edited unasked. */
  {
    company: "Early Career - Copywriting & Content",
    title: "Copywriter / Content Writer",
    period: "Oct 2011 - Oct 2017",
    location: "Jakarta, Indonesia",
    blurb:
      "Six years writing for Indonesian consumer, retail, SME and social platforms. Daily production copywriting, SEO content, and the HTML/CSS editing that went with it, before moving into lifestyle editorial at scale.",
    highlights: [
      "88DB Indonesia (Oct 2011 - Sep 2013): website content from slogans and product copy through to full company profiles, for clients mainly in the SME sector. Applied copywriting, SEO content, HTML and CSS editing directly.",
      "Ensogo (Oct 2013 - Mar 2015): daily-deal platform copy covering retail products and travel deals, including banner copy, body copy and slogans. Reported to the editor and production lead daily and weekly.",
      "Qraved (Sep 2013 - Jan 2014): weekly food and restaurant review content, working to the editorial brief on what to cover.",
      "PT. Vista Indonesia (Oct 2014 - Dec 2014): BTL copy from private to government clients, from slogans and taglines to print and annual reports, including the ideation and pitching stage.",
      "MatahariMall.com (Mar 2015 - Oct 2017): daily retail content requiring basic SKU management in the CMS, working alongside photographers and the digital imaging team.",
    ],
  },
];

export interface Project {
  name: string;
  blurb: string;
  /** Optional: some projects are internal work with nowhere to link. */
  url?: string;
  /** Optional supporting bullets, as a longer case study. */
  bullets?: string[];
  /** Span the full grid row, for a card with enough content to warrant it. */
  wide?: boolean;
}

export const projects: Project[] = [
  {
    name: "UrbanIdea ID",
    blurb:
      "Indonesian media platform covering technology, gadgets, gaming, and digital lifestyle content",
    url: "https://urbanidea.id",
  },
  {
    name: "Essential Gear ID",
    blurb: "Transforming how people carry, one bag at a time",
    url: "https://essentialgear.id",
  },
  {
    name: "AI-Augmented SEO Ops & Vibe-Coded Tooling",
    blurb:
      "Design and ship AI-assisted workflows that turn raw search data into decisions, combining prompt engineering, agentic browser automation, and rapid prototyping.",
    wide: true,
    bullets: [
      "Built an LLM-driven GSC / SEO analysis pipeline that surfaces query-, page- and category-level uplift",
      "Automated search-console data extraction with a browser-agent workflow, cutting manual reporting time",
      "Prototyped a React portfolio site end-to-end using AI coding agents and MCP tooling",
      "Stack: Claude/ChatGPT, agentic browser automation, MCP, VS Code, REST/JSON APIs, React, Git",
    ],
  },
];

export const skills = [
  {
    group: "SEO & Digital Marketing",
    level: "Expert",
    items: [
      "Search Engine Optimization",
      "Content Strategy",
      "Keyword Research & Analysis",
      "Link Building & Authority",
      "Local & Regional SEO",
      "On-Page SEO",
      "Technical SEO",
      "SEO Audits",
    ],
  },
  {
    group: "Project Management",
    level: "Expert",
    items: [
      "Cross-Functional Leadership",
      "Stakeholder Management",
      "Workflow Optimization",
      "Multi-Channel Campaigns",
      "Agile Project Management",
    ],
  },
  {
    group: "Technical & Analytics",
    level: "Advanced",
    items: [
      "Google Analytics",
      "Google Search Console",
      "Performance Dashboards",
      "Data-Driven Decision Making",
      "SEO Tools (Ahrefs, SEMrush)",
    ],
  },
  {
    group: "AI Workflow Automation",
    level: "Advanced",
    items: ["AI", "LLM", "Agentic"],
  },
  {
    group: "Data Analysis & Dashboards",
    level: "Advanced",
    items: ["Analytics", "Data"],
  },
] as const;

export const languages = [
  { name: "Indonesian", level: "Native" },
  { name: "English", level: "Fluent" },
] as const;

export const education = {
  school: "Universitas Mercu Buana",
  degree: "Bachelor's Degree in Industrial & Product Design",
  period: "2014 - 2019",
  url: "https://mercubuana.ac.id",
} as const;
