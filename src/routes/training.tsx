import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ButtonLink, SiteFooter, SiteNavbar } from "@/components/site-chrome";
import { gsap } from "@/lib/animations";
import { PUBLIC_EMAIL, PUBLIC_EMAIL_MAILTO } from "@/lib/site";

export const Route = createFileRoute("/training")({
  head: () => ({
    meta: [
      { title: "Training | TattvaTech" },
      {
        name: "description",
        content:
          "TattvaTech Training delivers practical technical programs for students, faculty, institutions, and teams across software, AI, cloud, data, and engineering workflows.",
      },
    ],
  }),
  component: TrainingPage,
});

type TrainingProgram = {
  number: string;
  title: string;
  description: string;
  audiences: string[];
  formats: string[];
  outcomes: string[];
};

type DetailItem = {
  title: string;
  description: string;
};

type LearningAreaGroup = {
  title: string;
  items: string[];
};

type FaqItem = {
  question: string;
  answer: string;
};

const programs: TrainingProgram[] = [
  {
    number: "01",
    title: "College Programs",
    description:
      "Semester-length and institution-aligned technical programs designed to strengthen practical software and emerging-technology capability.",
    audiences: [
      "Engineering colleges",
      "Computer science departments",
      "Technology institutes",
      "Student cohorts",
      "Placement preparation programs",
    ],
    formats: [
      "Semester programs",
      "Credit-aligned modules",
      "Lab-integrated learning",
      "Project-based tracks",
      "Capstone support",
    ],
    outcomes: [
      "Stronger technical foundations",
      "Practical project experience",
      "Improved development workflow",
      "Portfolio-ready work",
      "Better industry preparation",
    ],
  },
  {
    number: "02",
    title: "Workshops",
    description:
      "Focused hands-on sessions that help learners understand and apply a specific technology, tool, workflow, or engineering concept.",
    audiences: [
      "Student groups",
      "Faculty groups",
      "Internal company teams",
      "Technical communities",
      "Event cohorts",
    ],
    formats: [
      "Half-day sessions",
      "Full-day workshops",
      "Multi-day bootcamps",
      "Hands-on labs",
      "Live build sessions",
    ],
    outcomes: [
      "Working implementation",
      "Clear conceptual understanding",
      "Practical reference material",
      "Reusable starter resources",
      "Next-step learning plan",
    ],
  },
  {
    number: "03",
    title: "Faculty Development",
    description:
      "Programs that help educators strengthen technical depth, update teaching practices, and integrate modern engineering tools into curriculum delivery.",
    audiences: [
      "Faculty members",
      "Department coordinators",
      "Lab instructors",
      "Academic leadership",
      "Curriculum teams",
    ],
    formats: [
      "Faculty development programs",
      "Technical refresher programs",
      "Curriculum workshops",
      "Tool-specific training",
      "Project mentoring systems",
    ],
    outcomes: [
      "Updated technical understanding",
      "Improved practical teaching methods",
      "Better project evaluation",
      "Modern lab workflows",
      "Reusable teaching resources",
    ],
  },
  {
    number: "04",
    title: "Student Upskilling",
    description:
      "Career-focused technical tracks that help students move from classroom understanding to practical software, AI, data, cloud, and project capability.",
    audiences: [
      "Undergraduate students",
      "Final-year students",
      "Placement cohorts",
      "Project teams",
      "Early technical learners",
    ],
    formats: [
      "Skill tracks",
      "Project programs",
      "Career preparation",
      "Technology bootcamps",
      "Mentored build cycles",
    ],
    outcomes: [
      "Hands-on technical skills",
      "Complete projects",
      "Development discipline",
      "Interview-ready understanding",
      "Improved professional confidence",
    ],
  },
  {
    number: "05",
    title: "Corporate Training",
    description:
      "Structured programs for engineering teams and organizations adopting new technologies, workflows, systems, or development practices.",
    audiences: [
      "Engineering teams",
      "Product teams",
      "Operations teams",
      "Technical leadership",
      "Cross-functional teams",
    ],
    formats: [
      "Team workshops",
      "Technology adoption programs",
      "Custom internal training",
      "Engineering practice programs",
      "Workflow modernization sessions",
    ],
    outcomes: [
      "Shared technical understanding",
      "Improved development workflow",
      "Faster adoption",
      "Better engineering consistency",
      "Practical internal documentation",
    ],
  },
];

const positioningPrinciples: DetailItem[] = [
  {
    title: "Practice before performance",
    description:
      "Learners build, test, debug, and improve instead of only watching demonstrations.",
  },
  {
    title: "Foundations before tools",
    description:
      "Programs explain how systems work before focusing on individual frameworks or platforms.",
  },
  {
    title: "Outcomes before certificates",
    description: "The goal is usable skill, stronger thinking, and real project capability.",
  },
];

const learningOutcomes = [
  "Practical technical understanding",
  "A working project or implementation",
  "Structured problem-solving ability",
  "Experience with real development workflows",
  "Confidence using modern engineering tools",
  "Clear documentation and reference material",
  "A roadmap for continued learning",
];

const deliveryFormats: DetailItem[] = [
  {
    title: "On-campus",
    description: "Programs delivered directly within institutions for student or faculty cohorts.",
  },
  {
    title: "Online",
    description:
      "Instructor-led remote sessions with live demonstrations, guided implementation, and structured support.",
  },
  {
    title: "Hybrid",
    description:
      "A combination of online learning, live workshops, mentoring, and in-person review.",
  },
  {
    title: "On-site corporate",
    description:
      "Programs delivered within an organization for focused technical and operational outcomes.",
  },
  {
    title: "Custom cohort",
    description:
      "A dedicated program designed around a specific group, technology, timeline, or expected outcome.",
  },
];

const programStructure: DetailItem[] = [
  {
    title: "01 Understand",
    description:
      "We identify the learners, current capability, operating context, and expected outcomes.",
  },
  {
    title: "02 Define",
    description: "We establish the scope, duration, technical depth, and success criteria.",
  },
  {
    title: "03 Design",
    description:
      "We build the curriculum, practical exercises, projects, resources, and delivery plan.",
  },
  {
    title: "04 Deliver",
    description:
      "We teach through explanation, demonstration, guided work, and active problem-solving.",
  },
  {
    title: "05 Apply",
    description:
      "Learners implement concepts through exercises, projects, reviews, and real workflows.",
  },
  {
    title: "06 Improve",
    description: "We review outcomes, learner feedback, and performance to refine future delivery.",
  },
];

const audiences = [
  "College students",
  "Engineering project teams",
  "Faculty members",
  "Technical departments",
  "Early-career developers",
  "Corporate engineering teams",
  "Product teams",
  "Operations teams",
  "Technology leadership",
];

const learningAreaGroups: LearningAreaGroup[] = [
  {
    title: "Build and interface",
    items: ["Web development", "Mobile development", "UI/UX design", "APIs and backend systems"],
  },
  {
    title: "Engineering systems",
    items: [
      "Software engineering",
      "Database design",
      "Project architecture",
      "Git and development workflows",
    ],
  },
  {
    title: "Data and intelligence",
    items: ["AI and automation", "Data analytics"],
  },
  {
    title: "Production and delivery",
    items: ["Cloud and DevOps", "Deployment and production practices"],
  },
];

const ecosystemBlocks = [
  {
    eyebrow: "Services to Training",
    title: "Services",
    description:
      "Real client work becomes practical examples, workflows, case discussions, and engineering lessons.",
    tags: ["Client work", "Engineering lessons"],
    href: "/services" as const,
  },
  {
    eyebrow: "Products to Training",
    title: "Products",
    description:
      "Product development creates reusable learning around architecture, iteration, ownership, and system design.",
    tags: ["Iteration", "System design"],
    href: "/products" as const,
  },
  {
    eyebrow: "Drones to Training",
    title: "Drones",
    description:
      "Field systems and aerial technology introduce learners to hardware, telemetry, operations, and applied engineering.",
    tags: ["Field systems", "Telemetry"],
    href: "/drones" as const,
  },
];

const differentiators: DetailItem[] = [
  {
    title: "01 Engineering-led content",
    description:
      "Programs are shaped by people actively building and delivering technical systems.",
  },
  {
    title: "02 Practical delivery",
    description: "Learners apply concepts through guided implementation, exercises, and projects.",
  },
  {
    title: "03 Context-specific programs",
    description:
      "Content is adapted to the learners, institution, team, timeline, and expected outcome.",
  },
  {
    title: "04 Real project experience",
    description:
      "Programs focus on workflows, decisions, debugging, architecture, and delivery rather than isolated syntax.",
  },
  {
    title: "05 Clear learning outcomes",
    description: "Every program is designed around defined capabilities and measurable progress.",
  },
  {
    title: "06 Connected expertise",
    description:
      "Experience from Services, Products, and Drones strengthens the training material.",
  },
];

const faqs: FaqItem[] = [
  {
    question: "Who can enroll in TattvaTech training programs?",
    answer:
      "Programs are designed for students, faculty, institutions, engineering teams, product teams, and organizations with technical learning goals.",
  },
  {
    question: "Do you conduct programs for colleges?",
    answer:
      "Yes. We work with colleges and departments on semester programs, workshops, lab-integrated learning, and cohort-based technical delivery.",
  },
  {
    question: "Can the curriculum be customized?",
    answer:
      "Yes. We adjust the scope, depth, examples, projects, and delivery format to match the learners and the expected outcome.",
  },
  {
    question: "Do you offer faculty development programs?",
    answer:
      "Yes. Faculty development is one of our core formats, especially where modern tooling and practical delivery need to be strengthened.",
  },
  {
    question: "Can TattvaTech train corporate engineering teams?",
    answer:
      "Yes. We design training for engineering, product, operations, and cross-functional teams adopting new systems or practices.",
  },
  {
    question: "Are the programs online or in person?",
    answer:
      "Both. We support online, on-campus, hybrid, and on-site corporate delivery depending on the cohort and the objective.",
  },
  {
    question: "Do learners build projects during the program?",
    answer:
      "Where appropriate, yes. We prefer practical exercises, guided implementation, and real workflows over passive demonstration alone.",
  },
  {
    question: "Do you provide certificates?",
    answer:
      "Certificates may be included where appropriate, but the primary focus remains practical capability and demonstrated outcomes.",
  },
  {
    question: "How long does a typical program last?",
    answer:
      "It depends on the format. Programs can range from a half-day workshop to multi-week or semester-length structured delivery.",
  },
  {
    question: "How can an institution or company start a conversation?",
    answer:
      "Start by sharing the learner group, the skills needed, and the intended outcome. We can then recommend an appropriate format and scope.",
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

function TrainingHeroVisual() {
  const programLayers = [
    ["Context", "Audience, goals, and technical baseline"],
    ["Curriculum", "Concepts sequenced into practical modules"],
    ["Labs", "Guided builds, debugging, and working exercises"],
    ["Outcomes", "Projects, confidence, and reusable skill"],
  ];

  return (
    <div className="hero-media services-hero-media training-hero-media reveal-up" style={{ animationDelay: "320ms" }}>
      <div className="hero-media-frame services-hero-frame training-hero-frame group relative rounded-3xl border border-border bg-cream shadow-warm">
        <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-40 text-ink" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full glow-orange opacity-50 blur-3xl" />

        <div className="services-hero-frame-body relative flex flex-col p-6 md:p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-ivory/90 p-4 shadow-soft">
              <div className="text-[11px] uppercase tracking-[0.24em] text-orange">Programs</div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">
                College cohorts, workshops, faculty development, and team learning.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-ivory/90 p-4 shadow-soft">
              <div className="text-[11px] uppercase tracking-[0.24em] text-orange">Method</div>
              <p className="mt-3 text-sm leading-relaxed text-charcoal">
                Explain, build, review, and apply in one practical sequence.
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            {programLayers.map(([label, description], index) => (
              <div
                key={label}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-border bg-ivory/88 px-4 py-3 shadow-soft"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <span className="text-xs tabular-nums text-orange">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <div className="font-display text-lg leading-none text-ink md:text-xl">{label}</div>
                  <div className="mt-1 text-sm text-charcoal">{description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {["Software", "AI", "Cloud", "Data", "Workflows"].map((item) => (
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

function TrainingHero() {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const progress = useScrollProgress();

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
        ".training-hero-badge",
        { y: -8, opacity: 0, filter: "blur(4px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5 },
      );

      timeline.fromTo(
        ".training-hero-heading-line",
        { y: 28, opacity: 0, filter: "blur(6px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.14 },
        0.2,
      );

      timeline.fromTo(
        ".training-hero-paragraph",
        { y: 18, opacity: 0, filter: "blur(3px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6 },
        0.45,
      );

      timeline.fromTo(
        ".training-hero-actions",
        { y: 14, opacity: 0, filter: "blur(2px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.5 },
        0.6,
      );

      timeline.fromTo(
        ".training-hero-frame .rounded-2xl, .training-hero-frame span.rounded-full",
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
    <section id="top" className="hero-section services-hero-section relative bg-ivory">
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

      <div className="hero-shell services-hero-shell relative mx-auto flex max-w-[1400px] flex-col px-6 pb-12 pt-4 md:px-10 md:pb-16 md:pt-6">
        <SiteNavbar page="training" />

        <div className="hero-content services-hero-content flex flex-1 flex-col justify-center py-6 md:py-8">
          <div className="training-hero-badge mb-8 md:mb-10" style={{ opacity: 0 }}>
            <SectionLabel>TATTVATECH TRAINING</SectionLabel>
          </div>

          <div className="hero-grid services-hero-grid grid gap-10">
            <div className="hero-copy">
              <h1
                className="font-display text-[clamp(2.75rem,6vw,7rem)] leading-[0.9] text-balance break-words"
                style={{ transform: `translateY(${progress * -40}px)` }}
              >
                <span className="training-hero-heading-line block" style={{ opacity: 0 }}>
                  Practical learning
                </span>
                <span className="training-hero-heading-line block" style={{ opacity: 0 }}>
                  built from real
                </span>
                <span
                  className="training-hero-heading-line block italic text-gradient-orange"
                  style={{ opacity: 0 }}
                >
                  engineering work.
                </span>
              </h1>

              <p
                className="training-hero-paragraph mt-8 max-w-xl text-pretty text-base leading-relaxed text-charcoal md:text-lg"
                style={{ opacity: 0 }}
              >
                We design practical technical programs for students, faculty, teams, and
                organizations across software, AI, cloud, data, and emerging technologies.
              </p>

              <div
                className="training-hero-actions mt-10 flex flex-wrap items-center gap-4"
                style={{ opacity: 0 }}
              >
                <ButtonLink href="#contact">Discuss a Program</ButtonLink>
                <ButtonLink href="#programs" variant="ghost">
                  Explore Programs
                </ButtonLink>
              </div>
            </div>

            <TrainingHeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

function PositioningSection() {
  return (
    <section className="services-section relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Positioning</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Learning shaped by
                <br />
                what engineering
                <br />
                <span className="italic text-gradient-orange">actually demands.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={120}>
              <p className="max-w-3xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                TattvaTech Training turns real technical experience into structured programs that
                help learners understand, build, and apply technology with confidence.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-5 max-w-3xl text-pretty text-sm leading-relaxed text-charcoal md:text-base">
                Programs are designed around practical workflows, real tools, working systems, and
                measurable outcomes rather than theory alone.
              </p>
            </Reveal>

            <div className="mt-10 rounded-3xl border border-border bg-cream shadow-soft">
              {positioningPrinciples.map((item, index) => (
                <Reveal key={item.title} delay={index * 70}>
                  <div
                    className={`grid gap-4 px-6 py-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:px-8 md:py-8 ${
                      index !== positioningPrinciples.length - 1 ? "border-b border-border" : ""
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

function ProgramsSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("#programs .training-program-row").forEach((item) => {
        const trigger = {
          trigger: item,
          start: "top 85%",
          end: "top 45%",
          scrub: 0.5,
        };

        gsap.fromTo(
          item.querySelectorAll(".program-num, .program-title"),
          { x: -28, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.5, scrollTrigger: trigger },
        );

        gsap.fromTo(
          item.querySelectorAll(".program-copy, .program-list"),
          { x: 24, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.5, stagger: 0.05, scrollTrigger: trigger },
        );

        const divider = item.querySelector(".program-divider");
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
    <section id="programs" className="services-section relative bg-ivory scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-12 md:mb-16">
          <Reveal>
            <SectionLabel>Programs</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
              Programs shaped by practical <span className="italic text-gradient-orange">technical work.</span>
            </h2>
          </Reveal>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {programs.map((program, index) => (
            <li
              key={program.title}
              className="training-program-row group relative overflow-hidden py-8 md:py-10 lg:py-12"
            >
              <span className="program-divider pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-border/70" />
              <Reveal delay={index * 50}>
                <div className="grid gap-8 md:gap-y-8 lg:grid-cols-[minmax(280px,1.4fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)_minmax(180px,0.8fr)] lg:gap-x-8">
                  <div className="min-w-0 md:col-span-2 lg:col-span-1">
                    <div className="flex items-baseline gap-4">
                      <span className="program-num text-xs tabular-nums text-orange">
                        {program.number}
                      </span>
                      <h3 className="program-title font-display text-2xl md:text-4xl">
                        {program.title}
                      </h3>
                    </div>
                    <p className="program-copy mt-4 max-w-xl text-sm leading-relaxed text-charcoal md:text-base">
                      {program.description}
                    </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:col-span-3 lg:grid-cols-3">
                    <div className="program-list min-w-0">
                      <div className="text-xs uppercase tracking-[0.24em] text-orange">
                        Suitable for
                      </div>
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-charcoal">
                        {program.audiences.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="program-list min-w-0">
                      <div className="text-xs uppercase tracking-[0.24em] text-orange">
                        Formats
                      </div>
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-charcoal">
                        {program.formats.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="program-list min-w-0">
                      <div className="text-xs uppercase tracking-[0.24em] text-orange">
                        Outcomes
                      </div>
                      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-charcoal">
                        {program.outcomes.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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

function LearningOutcomesSection() {
  return (
    <section className="services-section relative bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Learning Outcomes</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                What learners
                <br />
                leave <span className="italic text-gradient-orange">with.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="rounded-3xl border border-border bg-ivory shadow-soft">
              <div className="grid gap-0 md:grid-cols-2">
                {learningOutcomes.map((item, index) => (
                  <Reveal key={item} delay={index * 45}>
                    <div
                      className={`flex items-start gap-4 px-6 py-5 md:px-8 ${
                        index < learningOutcomes.length - 1 ? "border-b border-border" : ""
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

function DeliveryFormatsSection() {
  return (
    <section className="services-section relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Delivery Formats</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Programs shaped around
                <br />
                the people <span className="italic text-gradient-orange">learning.</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid gap-6 md:col-span-8 md:grid-cols-2">
            {deliveryFormats.map((item, index) => (
              <Reveal key={item.title} delay={index * 70}>
                <article className="rounded-3xl border border-border bg-cream p-6 shadow-soft md:p-8">
                  <div className="text-xs uppercase tracking-[0.24em] text-orange">Format</div>
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

function ProgramStructureSection() {
  return (
    <section id="process" className="relative bg-cream pb-20 pt-0 scroll-mt-24 md:pb-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="mb-10 grid gap-6 md:mb-12 md:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] md:items-end md:gap-12">
          <div>
            <Reveal>
              <SectionLabel>Program Structure</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                How a program is <span className="italic text-gradient-orange">built.</span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-charcoal md:justify-self-end">
              Training follows a deliberate structure so scope, delivery, and outcomes stay clear
              for institutions, learner cohorts, and teams.
            </p>
          </Reveal>
        </div>

        <ol className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {programStructure.map((step, index) => (
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

function AudienceSection() {
  return (
    <section className="services-section relative bg-ivory">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Who We Train</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Different learners.
                <br />
                Different contexts.
                <br />
                <span className="italic text-gradient-orange">One practical standard.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="rounded-3xl border border-border bg-cream shadow-soft">
              {audiences.map((item, index) => (
                <Reveal key={item} delay={index * 40}>
                  <div
                    className={`grid gap-4 px-6 py-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:px-8 ${
                      index !== audiences.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <span className="text-xs uppercase tracking-[0.24em] text-orange">
                      Audience
                    </span>
                    <p className="font-display text-2xl leading-none text-ink md:text-3xl">
                      {item}
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

function TrainingAreasSection() {
  return (
    <section className="services-section relative bg-cream">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Reveal>
              <SectionLabel>Training Areas</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Training grounded
                <br />
                in modern <span className="italic text-gradient-orange">engineering.</span>
              </h2>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <div className="divide-y divide-border border-y border-border">
              {learningAreaGroups.map((group, index) => (
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

            <Reveal delay={220}>
              <p className="mt-8 max-w-3xl text-pretty text-sm leading-relaxed text-charcoal md:text-base">
                Technologies are selected according to learner needs, institutional context, program
                outcomes, and long-term relevance.
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
              Training strengthened
              <br />
              by the wider <span className="italic text-gradient-orange">ecosystem.</span>
            </h2>
          </div>
          <div className="verticals-copy">
            <Reveal delay={120}>
              <p className="max-w-xl text-pretty text-base leading-relaxed text-charcoal md:text-lg">
                Training stays practical because it is connected to delivery work, product
                iteration, and field systems rather than isolated from them.
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
              <SectionLabel>Why TattvaTech Training</SectionLabel>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-6 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] text-balance break-words">
                Practical capability
                <br />
                over polished <span className="italic text-gradient-orange">theory.</span>
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
    <section className="services-section relative bg-cream">
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

const TRAINING_EMAIL_MAILTO = `${PUBLIC_EMAIL_MAILTO}?subject=${encodeURIComponent("TattvaTech Training Enquiry")}`;

function ContactSection() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const heading = document.querySelector("#contact .training-cta-heading");
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
          span.className = "training-cta-word";
          span.style.display = "inline-block";
          span.textContent = word;
          fragment.appendChild(span);
        });

        node.parentNode?.replaceChild(fragment, node);
      });

      gsap.fromTo(
        ".training-cta-word",
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
          <h2 className="training-cta-heading mt-8 font-display text-[clamp(1.75rem,10vw,10rem)] leading-[0.92] text-balance break-words">
            Planning a program
            <br />
            <span className="italic text-ivory/85">for your learners or team?</span>
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal delay={220} className="md:col-span-6">
            <p className="max-w-md text-pretty text-ivory/80">
              Tell us who the program is for, what they need to learn, and what outcome you want to
              create. We will help define the right format and scope.
            </p>
          </Reveal>
          <Reveal delay={320} className="md:col-span-6 md:justify-self-end">
            <div className="flex flex-wrap items-center gap-4">
              <ButtonLink href={TRAINING_EMAIL_MAILTO} variant="onDark">
                Discuss a Training Program
              </ButtonLink>
              <ButtonLink href="/#ecosystem" variant="onDark">
                Explore the Ecosystem
              </ButtonLink>
              <a
                href={TRAINING_EMAIL_MAILTO}
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

function TrainingPage() {
  const progress = useScrollProgress();

  return (
    <main className="min-h-screen overflow-x-clip bg-ivory">
      <div
        className="fixed left-0 top-0 z-[60] h-px gradient-sunset"
        style={{ width: `${progress * 100}%`, transition: "width 100ms linear" }}
      />

      <TrainingHero />
      <PositioningSection />
      <ProgramsSection />
      <LearningOutcomesSection />
      <DeliveryFormatsSection />
      <ProgramStructureSection />
      <AudienceSection />
      <TrainingAreasSection />
      <ConnectedEcosystemSection />
      <WhySection />
      <FaqSection />
      <ContactSection />
      <SiteFooter />
    </main>
  );
}
