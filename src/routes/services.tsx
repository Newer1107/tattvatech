import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ButtonLink, SiteFooter, SiteNavbar } from "@/components/site-chrome";
import { gsap } from "@/lib/animations";
import { PUBLIC_EMAIL, PUBLIC_EMAIL_MAILTO } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | TattvaTech" },
      {
        name: "description",
        content:
          "TattvaTech Services researches, designs, builds, deploys, and improves production systems across software, AI, cloud, data, and experience design.",
      },
    ],
  }),
  component: ServicesPage,
});

type Service = {
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  deliverables: string[];
  note?: string;
};

type DetailItem = {
  title: string;
  description: string;
};

type CapabilityCategory = {
  title: string;
  items: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

const services: Service[] = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Fast, accessible, and scalable web platforms built for real users and real operational requirements.",
    capabilities: [
      "Corporate websites",
      "Web applications",
      "Customer portals",
      "Admin dashboards",
      "E-commerce systems",
      "Progressive web apps",
      "API-integrated interfaces",
    ],
    deliverables: [
      "Responsive frontend",
      "Backend integrations",
      "Content management",
      "Authentication",
      "Analytics",
      "Deployment",
      "Documentation",
    ],
  },
  {
    number: "02",
    title: "Software Development",
    description:
      "Custom software systems designed around specific workflows, teams, and business operations.",
    capabilities: [
      "Internal tools",
      "Enterprise platforms",
      "Workflow systems",
      "ERP modules",
      "Operational dashboards",
      "Role-based systems",
      "Automation platforms",
    ],
    deliverables: [
      "System architecture",
      "Frontend and backend",
      "Database design",
      "Role and permission model",
      "Audit logs",
      "Testing",
      "Deployment documentation",
    ],
  },
  {
    number: "03",
    title: "Mobile Development",
    description:
      "Mobile products that connect users, field teams, and business systems through reliable cross-platform experiences.",
    capabilities: [
      "Android applications",
      "iOS applications",
      "Cross-platform apps",
      "Field applications",
      "Customer applications",
      "Offline-first workflows",
      "Push notifications",
    ],
    deliverables: [
      "Mobile UI",
      "API integration",
      "Authentication",
      "Offline state",
      "Notifications",
      "Store-ready build",
      "Analytics",
    ],
  },
  {
    number: "04",
    title: "AI & Automation",
    description:
      "Practical AI systems and workflow automation designed to reduce manual effort and improve decision-making.",
    capabilities: [
      "AI assistants",
      "Document processing",
      "Workflow automation",
      "Classification systems",
      "Recommendation systems",
      "Internal knowledge tools",
      "Process intelligence",
    ],
    deliverables: [
      "Use-case assessment",
      "Data pipeline",
      "Model or LLM integration",
      "Evaluation framework",
      "Human review workflow",
      "Monitoring",
      "Documentation",
    ],
    note: "Automation where rules are enough. AI where intelligence adds measurable value.",
  },
  {
    number: "05",
    title: "Cloud & DevOps",
    description:
      "Infrastructure and delivery systems that make applications reliable, repeatable, observable, and easier to maintain.",
    capabilities: [
      "Cloud deployment",
      "Containerization",
      "CI/CD pipelines",
      "Infrastructure setup",
      "Monitoring",
      "Storage systems",
      "Reverse proxies",
      "Environment management",
    ],
    deliverables: [
      "Deployment architecture",
      "Docker configuration",
      "CI/CD workflow",
      "Secrets strategy",
      "Monitoring",
      "Backup plan",
      "Operational runbook",
    ],
  },
  {
    number: "06",
    title: "Data Analytics",
    description:
      "Data systems that turn fragmented information into understandable metrics, reports, and operational insight.",
    capabilities: [
      "Data cleaning",
      "Business dashboards",
      "Reporting systems",
      "Data pipelines",
      "Operational analytics",
      "Forecasting support",
      "KPI design",
    ],
    deliverables: [
      "Data model",
      "Cleaning workflow",
      "Dashboard",
      "Reporting layer",
      "Metric definitions",
      "Export systems",
      "Documentation",
    ],
  },
  {
    number: "07",
    title: "UI/UX Design",
    description:
      "Clear digital experiences designed around user goals, operational constraints, and product behavior.",
    capabilities: [
      "UX research",
      "Information architecture",
      "User flows",
      "Wireframes",
      "Interface design",
      "Design systems",
      "Interactive prototypes",
      "Usability reviews",
    ],
    deliverables: [
      "UX audit",
      "User flows",
      "Wireframes",
      "High-fidelity interfaces",
      "Responsive states",
      "Component system",
      "Developer handoff",
    ],
  },
];

const positioningPoints: DetailItem[] = [
  {
    title: "Built around the problem",
    description: "Not around a preselected technology stack.",
  },
  {
    title: "Designed for production",
    description: "Architecture, security, performance, and maintainability matter from day one.",
  },
  {
    title: "Built for continuity",
    description: "We prefer long-term engineering relationships over one-off delivery.",
  },
];

const engagementModels: DetailItem[] = [
  {
    title: "Project Delivery",
    description:
      "A defined scope, timeline, and production outcome. Best for clearly understood products and platforms.",
  },
  {
    title: "Dedicated Engineering Team",
    description:
      "A focused TattvaTech team working alongside your organization for continuous delivery and improvement.",
  },
  {
    title: "Technical Discovery",
    description:
      "Research, requirements, architecture, feasibility, and roadmap before committing to a full build.",
  },
  {
    title: "Modernization and Improvement",
    description:
      "Audit, repair, redesign, migrate, or scale an existing system without rebuilding everything unnecessarily.",
  },
];

const processSteps: DetailItem[] = [
  {
    title: "01 Understand",
    description: "We study the problem, users, workflows, constraints, and desired outcome.",
  },
  {
    title: "02 Research",
    description: "We validate requirements, risks, technologies, and possible approaches.",
  },
  {
    title: "03 Design",
    description: "We define the architecture, experience, data, and implementation plan.",
  },
  {
    title: "04 Build",
    description: "We develop in clear stages with regular reviews and working releases.",
  },
  {
    title: "05 Deploy",
    description: "We configure production infrastructure, testing, monitoring, and handover.",
  },
  {
    title: "06 Improve",
    description:
      "We learn from real usage and continue refining performance, reliability, and product value.",
  },
];

const deliverables = [
  "Product and technical discovery",
  "Architecture decisions",
  "UI/UX design",
  "Production-ready implementation",
  "Testing and quality checks",
  "Deployment configuration",
  "Documentation",
  "Training and handover",
  "Post-launch support",
  "Improvement roadmap",
];

const technologyCategories: CapabilityCategory[] = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Modern browser APIs"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "WebSockets", "Python services"],
  },
  {
    title: "Data",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Object storage"],
  },
  {
    title: "Cloud and Delivery",
    items: ["Docker", "AWS", "Cloudflare", "CI/CD", "Linux", "Monitoring"],
  },
  {
    title: "AI and Automation",
    items: [
      "LLM integrations",
      "Local model deployments",
      "Python ML services",
      "Data processing",
      "Evaluation systems",
      "Workflow automation",
    ],
  },
];

const ecosystemBlocks = [
  {
    title: "Products",
    description: "Recurring client problems reveal opportunities for scalable software products.",
    tags: ["Recurring insight", "Reusable systems"],
    href: "/products" as const,
  },
  {
    title: "Drones",
    description:
      "Software, data, cloud, and interface capabilities support field and aerial systems.",
    tags: ["Field systems", "Operational data"],
    href: "/drones" as const,
  },
  {
    title: "Training",
    description:
      "Real engineering experience becomes practical programs, workshops, and learning content.",
    tags: ["Programs", "Workshops"],
    href: "/training" as const,
  },
];

const differentiators: DetailItem[] = [
  {
    title: "01 Founder-led execution",
    description: "Projects remain close to technical leadership and accountable decision-making.",
  },
  {
    title: "02 Practical engineering",
    description: "We prioritize usable, maintainable systems over unnecessary complexity.",
  },
  {
    title: "03 End-to-end ownership",
    description: "Research, design, engineering, deployment, and improvement stay connected.",
  },
  {
    title: "04 Production-first thinking",
    description:
      "Reliability, security, performance, and operations are considered from the beginning.",
  },
  {
    title: "05 Long-term partnerships",
    description: "We aim to understand the organization and improve the system over time.",
  },
  {
    title: "06 Connected expertise",
    description:
      "Knowledge from products, field systems, and training strengthens service delivery.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "What types of projects does TattvaTech take on?",
    answer:
      "We take on software platforms, web applications, mobile products, AI workflows, data systems, and cloud delivery work tied to real operational needs.",
  },
  {
    question: "Can TattvaTech improve an existing application?",
    answer:
      "Yes. We regularly audit, repair, redesign, migrate, and scale existing systems when a full rebuild is not the right move.",
  },
  {
    question: "Do you work with startups, institutions, and established companies?",
    answer:
      "Yes. We adapt the engagement model to the organization's stage, internal capability, timeline, and operating constraints.",
  },
  {
    question: "Can you handle both design and engineering?",
    answer:
      "Yes. We can lead discovery, UX, interface design, system architecture, implementation, deployment, and iteration as one connected flow.",
  },
  {
    question: "Do you provide post-launch maintenance?",
    answer:
      "Yes. We support monitoring, fixes, upgrades, optimization, and roadmap planning after launch when continuity matters.",
  },
  {
    question: "How do you decide which technology stack to use?",
    answer:
      "We choose the stack based on requirements, team capability, operating environment, integration needs, and long-term maintainability.",
  },
  {
    question: "Can TattvaTech integrate AI into an existing workflow?",
    answer:
      "Yes. We assess where automation is enough, where AI adds measurable value, and how review, monitoring, and data quality should be handled.",
  },
  {
    question: "How do we start a project?",
    answer:
      "Start with a conversation. We clarify the problem, constraints, and next practical step before recommending scope or delivery structure.",
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 200px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, shown };
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement;
      const total = element.scrollHeight - element.clientHeight;
      setProgress(total > 0 ? element.scrollTop / total : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal();
  const cappedDelay = Math.min(delay, 220);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 500ms cubic-bezier(0.2,0.7,0.2,1) ${cappedDelay}ms, transform 500ms cubic-bezier(0.2,0.7,0.2,1) ${cappedDelay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children, inverse = false }: { children: ReactNode; inverse?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] ${
        inverse ? "text-ivory" : "text-charcoal/90"
      }`}
    >
      <span className={`h-px w-8 ${inverse ? "bg-ivory/70" : "bg-orange"}`} />
      <span>{children}</span>
    </div>
  );
}

function HeroArchitecture() {
  const layers = [
    ["Discovery", "Problem framing"],
    ["Interfaces", "Web, mobile, operations"],
    ["Services", "APIs, auth, workflows"],
    ["Data", "Metrics, events, storage"],
    ["Cloud", "Deploy, monitor, improve"],
  ];

  return (
    <div className="hero-media services-hero-visual reveal-up" style={{ animationDelay: "320ms" }}>
      <div className="hero-media-frame services-hero-card group relative rounded-3xl border border-border bg-cream shadow-warm">
        <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40 text-ink" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full glow-orange opacity-65 blur-3xl" />

        <div className="services-hero-system relative flex flex-col p-6 md:p-8">
          <div className="services-hero-visual-top grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-ivory/90 p-4 shadow-soft">
              <div className="text-[11px] uppercase tracking-[0.24em] text-orange">
                Architecture
              </div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">
                Systems shaped around workflows, dependencies, and operations.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-ivory/90 p-4 shadow-soft">
              <div className="text-[11px] uppercase tracking-[0.24em] text-orange">Delivery</div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">
                Research, design, build, deploy, and improve in one production loop.
              </p>
            </div>
          </div>

          <div className="services-hero-visual-stack mt-6 grid gap-3">
            {layers.map(([label, description], index) => (
              <div
                key={label}
                className="architecture-panel grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-border bg-ivory/88 px-4 py-3 shadow-soft"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <span className="text-xs tabular-nums text-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <div className="font-display text-lg leading-none text-ink md:text-xl">
                    {label}
                  </div>
                  <div className="mt-1 text-sm text-charcoal">{description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="services-hero-visual-meta mt-6 flex flex-wrap gap-2">
            {["APIs", "Automation", "Deployment", "Monitoring", "Data flow"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-ink/15 bg-ivory/90 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-charcoal"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <span className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-ink/30" />
        <span className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-ink/30" />
        <span className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-ink/30" />
        <span className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-ink/30" />
      </div>
    </div>
  );
}

function ServicesHero() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.to("#top h1", {
        scale: 0.96,
        opacity: 0.45,
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("#top .bg-grid", {
        y: "30%",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => context.revert();
  }, []);

  return (
    <section id="top" className="services-hero hero-section relative bg-ivory">
      <div className="absolute inset-0 text-ink">
        <div className="absolute inset-0 bg-grid grid-drift opacity-70" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(700px circle at ${mouse.x * 100}% ${mouse.y * 100}%, color-mix(in oklab, var(--orange-soft) 55%, transparent) 0%, transparent 60%)`,
          transition: "background 300ms ease-out",
        }}
      />

      <div className="services-hero__inner hero-shell relative mx-auto max-w-[1400px] px-6 pt-4 md:px-10 md:pt-6">
        <SiteNavbar page="services" />

        <div className="services-hero__body">
          <div className="services-hero__grid">
            <div className="services-hero__copy hero-copy">
              <div className="services-hero-badge mb-6 md:mb-8">
                <SectionLabel>TATTVATECH SERVICES</SectionLabel>
              </div>
              <h1 className="services-hero__title font-display text-[clamp(2.75rem,6vw,7rem)] leading-[0.9] text-balance break-words">
                <span className="services-hero-heading-line block">Engineering systems</span>
                <span className="services-hero-heading-line block">that solve real</span>
                <span className="services-hero-heading-line block italic text-gradient-orange">
                  business problems.
                </span>
              </h1>

              <p className="services-hero-paragraph mt-8 max-w-xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                We research, design, build, deploy, and improve digital systems across software, AI,
                cloud, data, and user experience.
              </p>

              <div className="services-hero-actions mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href="#contact">Start a Project</ButtonLink>
                <ButtonLink href="#services" variant="ghost">
                  Explore Services
                </ButtonLink>
              </div>
            </div>

            <div className="services-hero__visual">
              <HeroArchitecture />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PositioningSection() {
  return (
    <section id="positioning" className="services-section relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Positioning</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                From first problem
                <br />
                to <span className="italic text-gradient-orange">production system.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={120}>
              <p className="max-w-2xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                TattvaTech Services works across the complete engineering lifecycle.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 max-w-3xl text-pretty text-sm leading-relaxed text-charcoal md:text-base">
                We help organizations understand the problem, define the right system, design the
                experience, build the technology, deploy it reliably, and continue improving it
                after launch.
              </p>
            </Reveal>

            <div className="mt-10 rounded-3xl border border-border bg-cream shadow-soft">
              {positioningPoints.map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <div
                    className={`grid gap-4 px-6 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:px-8 md:py-8 ${
                      index !== positioningPoints.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <h3 className="font-display text-2xl leading-none md:text-3xl">{item.title}</h3>
                    <p className="max-w-xl text-sm leading-relaxed text-charcoal md:text-base">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoreServicesSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("#services .service-page-row").forEach((item) => {
        const trigger = {
          trigger: item,
          start: "top 85%",
          end: "top 45%",
          scrub: 0.5,
        };

        gsap.fromTo(
          item.querySelectorAll(".service-num, .service-title"),
          { x: -28, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.5, scrollTrigger: trigger },
        );

        gsap.fromTo(
          item.querySelectorAll(".service-copy, .service-list"),
          { x: 24, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05, scrollTrigger: trigger },
        );

        const divider = item.querySelector(".service-divider");
        if (divider) {
          gsap.fromTo(
            divider,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              duration: 0.4,
              scrollTrigger: trigger,
            },
          );
        }
      });
    });

    return () => context.revert();
  }, []);

  return (
    <section
      id="services"
      className="services-section services-section--continuous relative bg-ivory scroll-mt-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <Reveal>
            <SectionLabel>Core Services</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
              Engineering as a{" "}
              <span className="italic text-gradient-orange">long-term practice.</span>
            </h2>
          </Reveal>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {services.map((service, index) => (
            <li
              key={service.title}
              className="service-page-row group relative overflow-hidden py-8 md:py-10 lg:py-12"
            >
              <span className="service-divider pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-border/70" />
              <Reveal delay={index * 50}>
                <div className="grid gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-8 xl:grid-cols-[minmax(220px,0.95fr)_minmax(260px,1.1fr)_minmax(220px,0.9fr)_minmax(220px,0.9fr)] xl:gap-x-12">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-4">
                      <span className="service-num text-xs tabular-nums text-orange">
                        {service.number}
                      </span>
                      <h3 className="service-title font-display text-2xl md:text-4xl">
                        {service.title}
                      </h3>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="service-copy max-w-xl text-sm leading-relaxed text-charcoal md:text-base">
                      {service.description}
                    </p>

                    {service.note ? (
                      <p className="service-copy mt-4 max-w-xl text-sm leading-relaxed text-charcoal/80">
                        {service.note}
                      </p>
                    ) : null}
                  </div>

                  <div className="service-list min-w-0">
                    <div className="text-xs uppercase tracking-[0.24em] text-orange">
                      Capabilities
                    </div>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-charcoal">
                      {service.capabilities.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-list min-w-0">
                    <div className="text-xs uppercase tracking-[0.24em] text-orange">
                      Deliverables
                    </div>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-charcoal">
                      {service.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <a href="#contact" data-cursor="hover" className="vertical-card__cta mt-6">
                      <span>Start this project</span>
                      <span aria-hidden="true">&#8599;</span>
                    </a>
                  </div>
                </div>
              </Reveal>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-orange transition-transform duration-700 group-hover:scale-x-100" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function EngagementSection() {
  return (
    <section id="engagement" className="services-section relative bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Engagement Models</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Ways we <span className="italic text-gradient-orange">work.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 md:col-span-8 md:grid-cols-2">
            {engagementModels.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className="rounded-3xl border border-border bg-ivory p-6 shadow-soft md:p-8">
                  <div className="text-xs uppercase tracking-[0.24em] text-orange">Model</div>
                  <h3 className="mt-5 font-display text-2xl leading-none md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-charcoal md:text-base">
                    {item.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section
      id="process"
      className="services-section services-section--continuous relative overflow-hidden bg-cream scroll-mt-24"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Process</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                A calm, <span className="italic text-gradient-orange">deliberate cadence.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={160}>
              <p className="mb-10 max-w-xl text-pretty text-sm leading-relaxed text-charcoal">
                The same cycle we use on the homepage applies here too, with service delivery
                designed to loop insight from production back into the next round of understanding.
              </p>
            </Reveal>

            <ol className="grid gap-5 md:grid-cols-6">
              {processSteps.map((step, index) => (
                <Reveal key={step.title} delay={index * 90}>
                  <li className="relative">
                    <h3 className="font-display text-lg">{step.title}</h3>
                    <span className="mt-2 block h-px w-8 bg-orange/60" />
                    <p className="mt-3 text-xs leading-relaxed text-charcoal">{step.description}</p>
                  </li>
                </Reveal>
              ))}
            </ol>

            <Reveal delay={220}>
              <div className="mt-8 flex items-center gap-4 border-t border-border pt-6 text-sm text-charcoal">
                <span className="inline-block h-px w-12 bg-orange/60" />
                <p>
                  Improve feeds the next round of Understand so the system gets sharper over time.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function DeliverablesSection() {
  return (
    <section id="deliverables" className="services-section relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Deliverables</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                More than <span className="italic text-gradient-orange">source code.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="rounded-3xl border border-border bg-cream shadow-soft">
              <div className="grid gap-0 md:grid-cols-2">
                {deliverables.map((item, index) => (
                  <Reveal key={item} delay={index * 45}>
                    <div
                      className={`flex items-start gap-4 px-6 py-5 md:px-8 ${
                        index < deliverables.length - 1 ? "border-b border-border" : ""
                      } ${index % 2 === 0 ? "md:border-r md:border-border" : ""}`}
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                      <p className="text-sm leading-relaxed text-charcoal md:text-base">{item}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechnologySection() {
  return (
    <section id="technology" className="services-section relative bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Technology Capabilities</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Tools chosen for the system.
                <br />
                Not for the <span className="italic text-gradient-orange">trend.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="grid gap-6 md:grid-cols-2">
              {technologyCategories.map((category, index) => (
                <Reveal 
                  key={category.title} 
                  delay={index * 60}
                  className={index === technologyCategories.length - 1 ? "md:col-span-2" : ""}
                >
                  <article className="h-full rounded-3xl border border-border bg-ivory p-6 shadow-soft md:p-8">
                    <div className="text-xs uppercase tracking-[0.24em] text-orange">
                      {category.title}
                    </div>
                    <ul className={`mt-5 text-sm leading-relaxed text-charcoal md:text-base ${
                      index === technologyCategories.length - 1 
                        ? "grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3" 
                        : "space-y-3"
                    }`}>
                      {category.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={220}>
              <p className="mt-8 max-w-3xl text-pretty text-sm leading-relaxed text-charcoal md:text-base">
                The final stack is selected based on the system's requirements, team capabilities,
                operating environment, and long-term maintainability.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectedEcosystemSection() {
  return (
    <section
      id="connected-ecosystem"
      className="verticals-section services-section services-section--continuous services-ecosystem-section relative bg-cream"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40 text-ink" />

      <div className="verticals-inner relative">
        <div className="verticals-eyebrow">
          <SectionLabel>Connected Ecosystem</SectionLabel>
        </div>

        <div className="verticals-header">
          <div>
            <h2 className="verticals-title mt-6 font-display text-balance break-words">
              Services strengthens
              <br />
              the entire <span className="italic text-gradient-orange">ecosystem.</span>
            </h2>
          </div>
          <div className="verticals-copy">
            <Reveal delay={120}>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                Delivery work does not sit alone. It sharpens product thinking, supports field
                systems, and turns real engineering practice into training.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="verticals-grid">
          {ecosystemBlocks.map((block, index) => (
            <Reveal key={block.title} delay={index * 90}>
              <article
                className="vertical-card group relative rounded-[28px] shadow-soft"
                data-cursor="hover"
              >
                <div className="vertical-card__main-link">
                  <div className="vertical-card__header">
                    <span className="vertical-card__eyebrow">Services to</span>
                    <span className="vertical-card__rule" />
                  </div>

                  <div className="vertical-card__body">
                    <h3 className="vertical-card__title">
                      {block.title}
                      <span className="vertical-card__period">.</span>
                    </h3>

                    <p className="vertical-card__description">{block.description}</p>

                    <div className="vertical-card__tags">
                      {block.tags.map((tag) => (
                        <span
                          key={tag}
                          className="vertical-card__tag rounded-full border border-ink/15 bg-cream px-3 py-1"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="vertical-card__footer">
                  <Link
                    to={block.href}
                    className="vertical-card__cta"
                    aria-label={`View ${block.title}`}
                  >
                    <span>View {block.title}</span>
                    <span aria-hidden="true">&#8599;</span>
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("#why .why-row").forEach((row) => {
        const trigger = {
          trigger: row,
          start: "top 85%",
          end: "top 45%",
          scrub: 0.5,
        };

        gsap.fromTo(
          row.querySelector(".why-num"),
          { autoAlpha: 0 },
          { autoAlpha: 1, scrollTrigger: trigger },
        );

        gsap.fromTo(
          row.querySelector(".why-title"),
          { x: -24, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.5, scrollTrigger: trigger },
        );
      });
    });

    return () => context.revert();
  }, []);

  return (
    <section id="why" className="services-section relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Why TattvaTech Services</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Confidence through <span className="italic text-gradient-orange">restraint.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <dl className="divide-y divide-border border-y border-border">
              {differentiators.map((item, index) => {
                const [number, ...titleWords] = item.title.split(" ");
                return (
                  <Reveal key={item.title} delay={index * 50}>
                    <div className="why-row grid grid-cols-12 items-baseline gap-6 py-7">
                      <dt className="col-span-12 flex items-baseline gap-4 md:col-span-5">
                        <span className="why-num text-xs tabular-nums text-orange">{number}</span>
                        <span className="why-title font-display text-xl md:text-3xl">
                          {titleWords.join(" ")}
                        </span>
                      </dt>
                      <dd className="col-span-12 text-sm text-charcoal md:col-span-7 md:text-base">
                        {item.description}
                      </dd>
                    </div>
                  </Reveal>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openItem, setOpenItem] = useState<string | null>("faq-0");

  return (
    <section id="faq" className="services-section relative bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>FAQ</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Practical questions,{" "}
                <span className="italic text-gradient-orange">clear answers.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="border-y border-border">
              {faqs.map((item, index) => (
                <Reveal key={item.question} delay={index * 35}>
                  <div className={index !== faqs.length - 1 ? "border-b border-border" : ""}>
                    <button
                      type="button"
                      aria-expanded={openItem === `faq-${index}`}
                      aria-controls={`faq-panel-${index}`}
                      onClick={() =>
                        setOpenItem((current) =>
                          current === `faq-${index}` ? null : `faq-${index}`,
                        )
                      }
                      className="flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-xl leading-none text-ink md:text-2xl">
                        {item.question}
                      </span>
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-colors duration-300 ${
                          openItem === `faq-${index}`
                            ? "bg-orange text-ivory border-orange"
                            : "text-ink"
                        }`}
                        aria-hidden="true"
                      >
                        <svg
                          viewBox="0 0 20 20"
                          className={`h-4 w-4 transition-transform duration-300 ${
                            openItem === `faq-${index}` ? "rotate-180" : ""
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M5 8l5 5 5-5" />
                        </svg>
                      </span>
                    </button>

                    <div
                      id={`faq-panel-${index}`}
                      hidden={openItem !== `faq-${index}`}
                      className="max-w-2xl pb-6 text-sm leading-relaxed text-charcoal md:text-base"
                    >
                      {item.answer}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const whatsappServices = [
  {
    title: "Customer Support Bots",
    description: "Automate FAQs, ticketing, and tier-1 support directly in WhatsApp to resolve common issues instantly.",
    features: ["FAQ automation", "Ticket routing", "Agent handoff"]
  },
  {
    title: "Lead Generation Flows",
    description: "Qualify inbound leads conversationally and push structured data directly to your CRM.",
    features: ["Interactive qualification", "CRM integration", "Auto-scheduling"]
  },
  {
    title: "Order & Logistics Tracking",
    description: "Provide proactive updates and allow customers to query order status in real-time.",
    features: ["Shipping updates", "Status queries", "Return initiation"]
  },
  {
    title: "Broadcast Messaging",
    description: "Send targeted campaigns, alerts, and notifications to segmented customer lists safely.",
    features: ["Template messages", "Opt-in management", "Analytics"]
  }
];

function WhatsappAutomationSection() {
  return (
    <section id="whatsapp-automation" className="services-section relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Automation</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                WhatsApp Bot <span className="italic text-gradient-orange">Automation.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-6 text-sm leading-relaxed text-charcoal md:text-base">
                Meet your customers where they already are. We build automated conversational systems to improve support, streamline operations, and drive business growth.
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="grid gap-6 md:grid-cols-2">
              {whatsappServices.map((service, index) => (
                <Reveal key={service.title} delay={index * 60}>
                  <article className="h-full rounded-3xl border border-border bg-cream p-6 shadow-soft md:p-8">
                    <h3 className="font-display text-xl leading-none md:text-2xl text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-charcoal md:text-base">
                      {service.description}
                    </p>
                    <ul className="mt-5 space-y-3 text-sm leading-relaxed text-charcoal md:text-base">
                      {service.features.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const heading = document.querySelector("#contact .services-cta-heading");
      if (!heading) return;

      const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT, null);
      const textNodes: Text[] = [];
      while (walker.nextNode()) textNodes.push(walker.currentNode as Text);

      textNodes.forEach((node) => {
        const words = node.textContent?.split(/(\s+)/) ?? [];
        const fragment = document.createDocumentFragment();

        words.forEach((word) => {
          if (word.trim() === "") {
            fragment.appendChild(document.createTextNode(word));
            return;
          }

          const span = document.createElement("span");
          span.className = "services-cta-word";
          span.style.display = "inline-block";
          span.textContent = word;
          fragment.appendChild(span);
        });

        node.parentNode?.replaceChild(fragment, node);
      });

      gsap.fromTo(
        ".services-cta-word",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.035,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: { trigger: "#contact", start: "top 80%", once: true },
        },
      );
    });

    return () => context.revert();
  }, []);

  return (
    <section id="contact" className="relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 gradient-sunset" />
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-40 text-ink" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-15 text-ivory" />

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 text-ivory md:px-10 md:py-48">
        <Reveal>
          <SectionLabel inverse>Contact</SectionLabel>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="services-cta-heading mt-8 font-display text-[clamp(1.75rem,10vw,10rem)] leading-[0.92] text-balance break-words">
            Have a system to build
            <br />
            <span className="italic text-ivory/85">or a problem to solve?</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal delay={220} className="md:col-span-6">
            <p className="max-w-md text-pretty text-ivory/80">
              Tell us what you are trying to improve, automate, launch, or scale. We will help
              determine the clearest next step.
            </p>
          </Reveal>
          <Reveal delay={320} className="md:col-span-6 md:justify-self-end">
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href={PUBLIC_EMAIL_MAILTO} variant="onDark">
                Start a Conversation
              </ButtonLink>
              <ButtonLink href="/#ecosystem" variant="onDark">
                Explore the Ecosystem
              </ButtonLink>
              <a
                href={PUBLIC_EMAIL_MAILTO}
                data-cursor="hover"
                className="contact-email text-sm text-ivory/90 underline-offset-4 hover:underline"
              >
                {PUBLIC_EMAIL}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServicesPage() {
  const progress = useScrollProgress();

  return (
    <main className="min-h-screen overflow-x-clip bg-ivory">
      <div
        className="fixed left-0 top-0 z-[60] h-px gradient-sunset"
        style={{ width: `${progress * 100}%`, transition: "width 100ms linear" }}
      />

      <ServicesHero />
      <PositioningSection />
      <WhatsappAutomationSection />
      <CoreServicesSection />
      <EngagementSection />
      <ProcessSection />
      <DeliverablesSection />
      <TechnologySection />
      <ConnectedEcosystemSection />
      <WhySection />
      <FaqSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
