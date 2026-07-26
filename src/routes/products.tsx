import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ButtonLink, SiteFooter, SiteNavbar } from "@/components/site-chrome";
import { gsap } from "@/lib/animations";
import { PUBLIC_EMAIL, PUBLIC_EMAIL_MAILTO } from "@/lib/site";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products | TattvaTech" },
      {
        name: "description",
        content:
          "TattvaTech Products turns recurring real-world problems into practical software products across SaaS, tools, platforms, and reusable systems.",
      },
    ],
  }),
  component: ProductsPage,
});

type Product = {
  number: string;
  name: string;
  category: string;
  status: string;
  problem: string;
  audience: string[];
  capabilities: string[];
};

type DetailItem = {
  title: string;
  description: string;
};

type Category = {
  title: string;
  description: string;
  forms: string[];
};

type CapabilityGroup = {
  title: string;
  items: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

const positioningPillars: DetailItem[] = [
  {
    title: "Recurring problems",
    description:
      "We look for problems that appear across teams, industries, or delivery environments.",
  },
  {
    title: "Own the stack",
    description:
      "We design, build, operate, and improve the underlying system instead of depending on disconnected tools.",
  },
  {
    title: "Compounding IP",
    description:
      "Every product becomes stronger through real use, technical refinement, and reusable engineering knowledge.",
  },
];

const categories: Category[] = [
  {
    title: "SaaS Products",
    description:
      "Subscription-based software that helps teams manage recurring workflows, operations, data, or decision-making.",
    forms: [
      "Workflow platforms",
      "Operations systems",
      "Team tools",
      "Reporting systems",
      "Management portals",
    ],
  },
  {
    title: "Tools",
    description:
      "Focused software products that solve a specific operational or technical problem with clarity and speed.",
    forms: [
      "Developer tools",
      "Automation tools",
      "Audit tools",
      "Internal utilities",
      "Workflow accelerators",
    ],
  },
  {
    title: "Platforms",
    description:
      "Broader systems that connect users, processes, data, and services in one structured environment.",
    forms: [
      "Enterprise platforms",
      "Multi-role systems",
      "Institutional systems",
      "Ecosystem platforms",
      "Data platforms",
    ],
  },
];

const products: Product[] = [
  {
    number: "01",
    name: "Operations and workflow systems",
    category: "Product pipeline",
    status: "In development",
    problem:
      "Teams often repeat the same approvals, tracking, and coordination work across fragmented tools and manual follow-ups.",
    audience: ["Operations teams", "Delivery teams", "Internal administrators"],
    capabilities: [
      "Structured workflows",
      "Role-based actions",
      "Task visibility",
      "Operational reporting",
    ],
  },
  {
    number: "02",
    name: "Assessment and institutional software",
    category: "Product pipeline",
    status: "Research phase",
    problem:
      "Institutions need clearer systems for assessment, compliance, recordkeeping, and multi-role coordination.",
    audience: ["Institutions", "Academic teams", "Administrative stakeholders"],
    capabilities: [
      "Assessment flows",
      "Record management",
      "Multi-user access",
      "Process accountability",
    ],
  },
  {
    number: "03",
    name: "Automation and intelligence tools",
    category: "Product pipeline",
    status: "Internal use",
    problem:
      "Repeated operational work often contains narrow, high-value tasks that benefit from automation, review loops, and structured intelligence.",
    audience: ["Internal teams", "Engineering teams", "Operations leads"],
    capabilities: [
      "Automation triggers",
      "Human review steps",
      "Process intelligence",
      "Reusable integrations",
    ],
  },
];

const processSteps: DetailItem[] = [
  {
    title: "01 Observe",
    description:
      "We identify recurring problems through service delivery, field work, internal systems, and industry conversations.",
  },
  {
    title: "02 Validate",
    description:
      "We confirm that the problem is common, valuable, and structured enough to solve repeatedly.",
  },
  {
    title: "03 Define",
    description:
      "We establish the product scope, target users, operating model, and success criteria.",
  },
  {
    title: "04 Build",
    description: "We develop the smallest reliable product that solves the core problem clearly.",
  },
  {
    title: "05 Pilot",
    description:
      "We test the product with real users, real workflows, and real operational constraints.",
  },
  {
    title: "06 Improve",
    description:
      "We refine the product through feedback, usage, performance, and long-term product learning.",
  },
];

const principles: DetailItem[] = [
  {
    title: "Useful before impressive",
    description: "The product must solve a real problem before it tries to look innovative.",
  },
  {
    title: "Simple before broad",
    description:
      "We begin with a clear use case instead of attempting to solve every possible problem at once.",
  },
  {
    title: "Reliable before fast-growing",
    description: "Operational trust, maintainability, and product stability matter before scale.",
  },
  {
    title: "Owned end to end",
    description: "Product strategy, engineering, deployment, and improvement remain connected.",
  },
  {
    title: "Built to compound",
    description:
      "Every release should create reusable knowledge, stronger infrastructure, and better decisions.",
  },
];

const capabilityGroups: CapabilityGroup[] = [
  {
    title: "Discovery and definition",
    items: ["Product discovery", "User research", "System architecture", "UI/UX design"],
  },
  {
    title: "Core engineering",
    items: ["Frontend engineering", "Backend engineering", "Database design", "API design"],
  },
  {
    title: "Systems and operations",
    items: ["Authentication and permissions", "Automation", "Analytics", "Cloud infrastructure"],
  },
  {
    title: "Reliability and continuity",
    items: ["Monitoring", "Testing", "Documentation", "Product operations"],
  },
];

const lifecycle: DetailItem[] = [
  {
    title: "Discovery",
    description: "Clarify the problem, users, constraints, and product opportunity.",
  },
  {
    title: "Prototype",
    description: "Test structure, usability, and operating assumptions quickly.",
  },
  {
    title: "MVP",
    description: "Build the smallest dependable version of the core system.",
  },
  {
    title: "Pilot",
    description: "Validate the product inside real workflows with real users.",
  },
  {
    title: "Production",
    description: "Stabilize operations, support, monitoring, and delivery discipline.",
  },
  {
    title: "Scale",
    description: "Expand capability, reliability, and reach without losing clarity.",
  },
  {
    title: "Continuous improvement",
    description: "Use feedback and technical learning to strengthen the product over time.",
  },
];

const ecosystemBlocks = [
  {
    eyebrow: "Services to Products",
    title: "Services",
    description:
      "Recurring client and operational problems reveal product opportunities grounded in actual delivery work.",
    tags: ["Recurring insight", "Operational patterns"],
    href: "/services" as const,
  },
  {
    eyebrow: "Drones to Products",
    title: "Drones",
    description:
      "Field systems, telemetry, and aerial workflows create opportunities for specialized software and platforms.",
    tags: ["Field systems", "Telemetry"],
    href: "/drones" as const,
  },
  {
    eyebrow: "Training to Products",
    title: "Training",
    description:
      "Training reveals capability gaps, learning workflows, and institutional needs that may become reusable systems.",
    tags: ["Capability gaps", "Institutional needs"],
    href: "/training" as const,
  },
];

const differentiators: DetailItem[] = [
  {
    title: "01 Real problem origin",
    description:
      "Products begin with recurring problems observed in real delivery, operations, and field environments.",
  },
  {
    title: "02 Engineering ownership",
    description:
      "Product decisions remain connected to the people responsible for architecture, implementation, and operation.",
  },
  {
    title: "03 Practical product scope",
    description:
      "We prioritize clear use cases and usable outcomes over unnecessary feature volume.",
  },
  {
    title: "04 Production-first design",
    description:
      "Reliability, security, maintainability, and operations are considered from the beginning.",
  },
  {
    title: "05 Long-term improvement",
    description:
      "Products are designed to evolve through real use, feedback, and technical learning.",
  },
  {
    title: "06 Connected expertise",
    description: "Knowledge from Services, Drones, and Training strengthens product decisions.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "What kinds of products does TattvaTech build?",
    answer:
      "We focus on software products shaped by recurring operational problems, including SaaS systems, internal tools, platforms, and reusable workflow infrastructure.",
  },
  {
    question: "Are TattvaTech products available publicly?",
    answer:
      "Availability depends on the product. Some systems may be in research, internal use, pilot stages, or available only to selected partners.",
  },
  {
    question: "Can an organization partner with TattvaTech on a product?",
    answer:
      "Yes. We can explore partnership where the problem is recurring, valuable, and suitable for a reusable product approach.",
  },
  {
    question: "Do you build custom products for companies?",
    answer:
      "Yes. We build custom systems, and in some cases that work also reveals product opportunities that can scale further.",
  },
  {
    question: "How do you decide whether a problem should become a product?",
    answer:
      "We look for problems that repeat often enough, have a clear structure, and create enough value to justify a reusable system.",
  },
  {
    question: "Can TattvaTech modernize an existing product?",
    answer:
      "Yes. We can evaluate an existing product, improve architecture, refine workflows, and strengthen reliability without unnecessary rebuilds.",
  },
  {
    question: "Do you support products after launch?",
    answer:
      "Yes. Launch is one stage in the lifecycle. We support monitoring, iteration, refinement, and long-term product improvement.",
  },
  {
    question: "How can we discuss a product opportunity?",
    answer:
      "Start by sharing the repeated problem, current workflow, and what existing tools are failing to handle well.",
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
      className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] ${
        inverse ? "text-ivory/80" : "text-charcoal/70"
      }`}
    >
      <span className={`h-px w-8 ${inverse ? "bg-ivory/40" : "bg-orange/50"}`} />
      <span>{children}</span>
    </div>
  );
}

function ProductsHeroVisual() {
  const layers = [
    ["Signals", "Repeated issues across delivery and operations"],
    ["Structure", "Reusable workflows, permissions, and logic"],
    ["System", "Product-grade interfaces, services, and data models"],
    ["Continuity", "Monitoring, support, and long-term refinement"],
  ];

  return (
    <div className="hero-media products-hero-visual reveal-up" style={{ animationDelay: "320ms" }}>
      <div className="hero-media-frame products-hero-card group relative rounded-3xl border border-border bg-cream shadow-warm">
        <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40 text-ink" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full glow-orange opacity-60 blur-3xl" />

        <div className="products-hero-system relative flex flex-col p-6 md:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-ivory/90 p-4 shadow-soft">
              <div className="text-[11px] uppercase tracking-[0.24em] text-orange">Origin</div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">
                Products begin where repeated operational friction becomes too common to ignore.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-ivory/90 p-4 shadow-soft">
              <div className="text-[11px] uppercase tracking-[0.24em] text-orange">Outcome</div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">
                Reusable systems that become clearer, stronger, and more valuable through use.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {layers.map(([label, description], index) => (
              <div
                key={label}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-border bg-ivory/88 px-4 py-3 shadow-soft"
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

          <div className="flex flex-wrap gap-2">
            {["SaaS", "Tools", "Platforms", "Workflows", "Infrastructure"].map((item) => (
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

function ProductsHero() {
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
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

      timeline.fromTo(
        ".products-hero-badge",
        { y: -8, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5 },
      );

      timeline.fromTo(
        ".products-hero-heading-line",
        { y: 28, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.14 },
        0.2,
      );

      timeline.fromTo(
        ".products-hero-paragraph",
        { y: 18, opacity: 0, filter: "blur(3px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6 },
        0.45,
      );

      timeline.fromTo(
        ".products-hero-actions",
        { y: 14, opacity: 0, filter: "blur(2px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5 },
        0.6,
      );

      timeline.fromTo(
        ".products-hero-frame .rounded-2xl, .products-hero-frame span.rounded-full",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, stagger: 0.05 },
        0.35,
      );

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
    <section id="top" className="products-hero hero-section relative bg-ivory">
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

      <div className="products-hero__inner hero-shell relative mx-auto max-w-[1400px] px-6 pt-4 md:px-10 md:pt-6">
        <SiteNavbar page="products" />

        <div className="products-hero__body">
          <div className="products-hero__grid">
            <div className="products-hero__copy hero-copy">
              <div className="products-hero-badge">
                <div className="mb-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-charcoal/70 md:mb-8">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-orange shadow-[0_0_14px_var(--orange)]" />
                  TATTVATECH PRODUCTS
                </div>
              </div>
              <h1 className="products-hero__title font-display text-[clamp(2.75rem,6vw,7rem)] leading-[0.9] text-balance break-words">
                <span className="block products-hero-heading-line">Products built</span>
                <span className="block products-hero-heading-line">from recurring</span>
                <span className="block products-hero-heading-line italic text-gradient-orange">
                  real-world problems.
                </span>
              </h1>

              <p className="products-hero-paragraph mt-8 max-w-xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                We identify recurring operational problems, turn them into reusable software
                systems, and build products that improve through real-world use.
              </p>

              <div className="products-hero-actions mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href="#contact">Discuss a Product</ButtonLink>
                <ButtonLink href="#products" variant="ghost">
                  Explore Products
                </ButtonLink>
              </div>
            </div>

            <div className="products-hero__visual products-hero-frame">
              <ProductsHeroVisual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductPipelineRow({ product }: { product: Product }) {
  return (
    <article className="rounded-3xl border border-border bg-cream p-6 shadow-soft md:p-8">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(220px,0.5fr)_minmax(260px,0.7fr)] lg:gap-10">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs tabular-nums text-orange">{product.number}</span>
            <span className="rounded-full border border-ink/15 bg-ivory px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-charcoal">
              {product.status}
            </span>
          </div>

          <h3 className="mt-5 font-display text-2xl leading-none md:text-3xl">{product.name}</h3>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-charcoal/65">
            {product.category}
          </p>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-charcoal md:text-base">
            {product.problem}
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-orange">Intended users</div>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal md:text-base">
            {product.audience.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.24em] text-orange">Core capabilities</div>
          <ul className="mt-4 space-y-3 text-sm leading-relaxed text-charcoal md:text-base">
            {product.capabilities.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function PositioningSection() {
  return (
    <section id="positioning" className="services-section relative bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Product Positioning</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Products shaped by
                <br />
                problems worth solving
                <br />
                <span className="italic text-gradient-orange">more than once.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={160}>
              <p className="max-w-3xl text-pretty text-sm leading-relaxed text-charcoal md:text-base">
                TattvaTech Products begins with patterns we see repeatedly across organizations,
                workflows, teams, and systems.
              </p>
              <p className="mt-4 max-w-3xl text-pretty text-sm leading-relaxed text-charcoal md:text-base">
                When a problem is common enough, structured enough, and valuable enough to solve at
                scale, we turn that learning into a reusable product.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {positioningPillars.map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <article className="rounded-3xl border border-border bg-ivory p-6 shadow-soft md:p-8">
                    <div className="text-xs uppercase tracking-[0.24em] text-orange">Pillar</div>
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
      </div>
    </section>
  );
}

function CategoriesSection() {
  return (
    <section
      id="categories"
      className="services-section services-section--continuous relative bg-cream"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Product Categories</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                What we <span className="italic text-gradient-orange">build.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="divide-y divide-border border-y border-border">
              {categories.map((category, index) => (
                <Reveal key={category.title} delay={index * 55}>
                  <article className="grid gap-5 py-7 md:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)] md:gap-8">
                    <div>
                      <div className="text-xs uppercase tracking-[0.24em] text-orange">
                        Category
                      </div>
                      <h3 className="mt-5 font-display text-2xl leading-none md:text-3xl">
                        {category.title}
                      </h3>
                    </div>

                    <div>
                      <p className="text-sm leading-relaxed text-charcoal md:text-base">
                        {category.description}
                      </p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {category.forms.map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 text-sm leading-relaxed text-charcoal md:text-base"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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

function CurrentProductsSection() {
  return (
    <section id="products" className="services-section relative bg-ivory scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="max-w-5xl">
          <Reveal>
            <SectionLabel>Current Products</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
              Product pipeline
              <br />
              shaped by repeated <span className="italic text-gradient-orange">work.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-3xl text-pretty text-sm leading-relaxed text-charcoal md:text-base">
              The repository contains clear Products positioning, but not a verified public product
              catalog. To keep the page honest, this section presents the current pipeline by
              category and stage rather than inventing named public offerings.
            </p>
          </Reveal>
        </div>

        <div className="mt-12 space-y-6">
          {products.map((product, index) => (
            <Reveal key={product.number} delay={index * 70}>
              <ProductPipelineRow product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process" className="services-section relative bg-cream scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 grid gap-6 md:mb-12 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] md:items-end md:gap-12">
          <div>
            <Reveal>
              <SectionLabel>How Products Are Created</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                From repeated problem
                <br />
                to reusable <span className="italic text-gradient-orange">product.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-charcoal md:justify-self-end">
              Product work follows the same disciplined rhythm as service delivery, but with the
              explicit goal of turning repeatable insight into a dependable system.
            </p>
          </Reveal>
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
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
      </div>
    </section>
  );
}

function PrinciplesSection() {
  return (
    <section id="principles" className="services-section relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Product Principles</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                How we think
                <br />
                about <span className="italic text-gradient-orange">products.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 md:col-span-8 md:grid-cols-2">
            {principles.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className="rounded-3xl border border-border bg-cream p-6 shadow-soft md:p-8">
                  <div className="text-xs uppercase tracking-[0.24em] text-orange">Principle</div>
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

function CapabilitiesSection() {
  return (
    <section id="capabilities" className="services-section relative bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Product Capabilities</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Product capability
                <br />
                across the <span className="italic text-gradient-orange">full stack.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="divide-y divide-border border-y border-border">
              {capabilityGroups.map((group, index) => (
                <Reveal key={group.title} delay={index * 55}>
                  <div className="grid gap-4 py-7 md:grid-cols-[minmax(0,0.45fr)_minmax(0,1fr)] md:gap-8">
                    <h3 className="font-display text-2xl leading-none md:text-3xl">
                      {group.title}
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {group.items.map((item) => (
                        <div
                          key={item}
                          className="flex items-start gap-3 text-sm leading-relaxed text-charcoal md:text-base"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                          <span>{item}</span>
                        </div>
                      ))}
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

function LifecycleSection() {
  return (
    <section id="lifecycle" className="services-section relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Product Lifecycle</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Built beyond <span className="italic text-gradient-orange">launch.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={160}>
              <p className="max-w-3xl text-pretty text-sm leading-relaxed text-charcoal md:text-base">
                A product is not finished when it ships. It becomes clearer through real use,
                stronger through iteration, and more valuable through disciplined improvement.
              </p>
            </Reveal>

            <ol className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-7">
              {lifecycle.map((step, index) => (
                <Reveal key={step.title} delay={index * 70}>
                  <li className="relative">
                    <h3 className="font-display text-lg">{step.title}</h3>
                    <span className="mt-2 block h-px w-8 bg-orange/60" />
                    <p className="mt-3 text-xs leading-relaxed text-charcoal">{step.description}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
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
      className="verticals-section services-section services-section--continuous services-ecosystem-section relative bg-cream scroll-mt-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40 text-ink" />

      <div className="verticals-inner relative">
        <div className="verticals-eyebrow">
          <SectionLabel>Connected Ecosystem</SectionLabel>
        </div>

        <div className="verticals-header">
          <div>
            <h2 className="verticals-title mt-6 font-display text-balance break-words">
              Products strengthened
              <br />
              by the wider <span className="italic text-gradient-orange">ecosystem.</span>
            </h2>
          </div>
          <div className="verticals-copy">
            <Reveal delay={120}>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                Product thinking stays practical because it is connected to service delivery, field
                systems, and training rather than isolated from them.
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
                    <span className="vertical-card__eyebrow">{block.eyebrow}</span>
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
              <SectionLabel>Why TattvaTech Products</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Built with practical
                <br />
                engineering <span className="italic text-gradient-orange">discipline.</span>
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
                            ? "border-orange bg-orange text-ivory"
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

const PRODUCTS_EMAIL_MAILTO = `${PUBLIC_EMAIL_MAILTO}?subject=${encodeURIComponent("TattvaTech Product Enquiry")}`;

function ContactSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const heading = document.querySelector("#contact .products-cta-heading");
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
          span.className = "products-cta-word";
          span.style.display = "inline-block";
          span.textContent = word;
          fragment.appendChild(span);
        });

        node.parentNode?.replaceChild(fragment, node);
      });

      gsap.fromTo(
        ".products-cta-word",
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
          <h2 className="products-cta-heading mt-8 font-display text-[clamp(1.75rem,10vw,10rem)] leading-[0.92] text-balance break-words">
            Have a recurring problem
            <br />
            <span className="italic text-ivory/85">that deserves a product?</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal delay={220} className="md:col-span-6">
            <p className="max-w-md text-pretty text-ivory/80">
              Tell us what keeps repeating, where current tools fall short, and what a better system
              should make possible.
            </p>
          </Reveal>
          <Reveal delay={320} className="md:col-span-6 md:justify-self-end">
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href={PRODUCTS_EMAIL_MAILTO} variant="onDark">
                Discuss a Product
              </ButtonLink>
              <ButtonLink href="/#ecosystem" variant="onDark">
                Explore the Ecosystem
              </ButtonLink>
              <a
                href={PRODUCTS_EMAIL_MAILTO}
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

function ProductsPage() {
  const progress = useScrollProgress();

  return (
    <main className="min-h-screen overflow-x-clip bg-ivory">
      <div
        className="fixed left-0 top-0 z-[60] h-px gradient-sunset"
        style={{ width: `${progress * 100}%`, transition: "width 100ms linear" }}
      />

      <ProductsHero />
      <PositioningSection />
      <CategoriesSection />
      <CurrentProductsSection />
      <ProcessSection />
      <PrinciplesSection />
      <CapabilitiesSection />
      <LifecycleSection />
      <ConnectedEcosystemSection />
      <WhySection />
      <FaqSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
