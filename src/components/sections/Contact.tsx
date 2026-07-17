"use client";

import { useMemo, useState } from "react";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { SectionContainer } from "@/components/layout/SectionContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { businessVerticals } from "@/constants/verticals";
import { contactIntro } from "@/constants/home";
import { siteConfig } from "@/constants/site";

type FormState = {
  name: string;
  organization: string;
  email: string;
  vertical: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  name: "",
  organization: "",
  email: "",
  vertical: businessVerticals[0]?.id ?? "",
  message: "",
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function Contact() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState("");

  const verticalOptions = useMemo(
    () =>
      businessVerticals.map((vertical) => ({
        value: vertical.id,
        label: `${vertical.titleTop} ${vertical.titleBottom}`,
      })),
    [],
  );

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormState((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};

    if (!formState.name.trim()) {
      nextErrors.name = "Please share your name.";
    }

    if (!formState.email.trim()) {
      nextErrors.email = "Please share an email address.";
    } else if (!isValidEmail(formState.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formState.message.trim()) {
      nextErrors.message = "Please describe what you would like to discuss.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatusMessage("Please fix the highlighted fields before continuing.");
      return;
    }

    const selectedVertical =
      verticalOptions.find((option) => option.value === formState.vertical)?.label ?? "General enquiry";

    const subject = encodeURIComponent(`TattvaTech enquiry: ${selectedVertical}`);
    const body = encodeURIComponent(
      [
        `Name: ${formState.name}`,
        `Organization: ${formState.organization || "Not provided"}`,
        `Email: ${formState.email}`,
        `Vertical: ${selectedVertical}`,
        "",
        "Project details:",
        formState.message,
      ].join("\n"),
    );

    setStatusMessage("Opening your email client with the enquiry details.");
    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <SectionContainer id="contact" className="pb-24 lg:pb-32">
      <SectionReveal className="overflow-hidden rounded-[34px] border border-[rgba(16,24,40,0.08)] bg-[linear-gradient(180deg,rgba(252,251,249,0.94)_0%,rgba(255,255,255,1)_100%)] shadow-[0_28px_80px_rgba(16,24,40,0.08)]">
        <div className="grid gap-0 lg:grid-cols-[minmax(0,0.78fr)_minmax(380px,0.92fr)]">
          <div className="relative border-b border-[rgba(16,24,40,0.08)] px-6 py-8 md:px-10 md:py-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-12">
            <div data-reveal>
              <SectionLabel>{contactIntro.label}</SectionLabel>
              <SectionHeading className="mt-5 max-w-[11ch]">
                {contactIntro.heading}
              </SectionHeading>
              <p className="mt-6 max-w-[42ch] text-[1rem] leading-8 text-text-secondary">
                {contactIntro.copy}
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {verticalOptions.map((option, index) => (
                <div
                  key={option.value}
                  data-reveal
                  data-reveal-axis="x"
                  data-reveal-direction={index % 2 === 0 ? "left" : "right"}
                  className="rounded-[22px] border border-[rgba(16,24,40,0.08)] bg-white/82 px-4 py-4"
                >
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-orange-primary">
                    Vertical
                  </p>
                  <p className="mt-3 text-sm leading-6 text-text-primary">{option.label}</p>
                </div>
              ))}
            </div>

            <div data-reveal className="mt-8 rounded-[24px] bg-background-dark px-5 py-5 text-white md:px-6">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-amber-primary">
                Direct contact
              </p>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-3 inline-block font-heading text-[1.4rem] leading-[1.05] tracking-[-0.03em] text-white underline decoration-white/24 underline-offset-4"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10 lg:px-12 lg:py-12">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div data-reveal className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-medium text-text-primary">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    aria-invalid={errors.name ? "true" : "false"}
                    value={formState.name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    className="mt-2 h-12 w-full rounded-[18px] border border-[rgba(16,24,40,0.12)] bg-white px-4 text-base text-text-primary outline-none transition-colors focus:border-orange-primary"
                    autoComplete="name"
                  />
                  {errors.name ? <p className="mt-2 text-sm text-orange-dark">{errors.name}</p> : null}
                </div>

                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-text-primary">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    aria-invalid={errors.email ? "true" : "false"}
                    value={formState.email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    className="mt-2 h-12 w-full rounded-[18px] border border-[rgba(16,24,40,0.12)] bg-white px-4 text-base text-text-primary outline-none transition-colors focus:border-orange-primary"
                    autoComplete="email"
                  />
                  {errors.email ? <p className="mt-2 text-sm text-orange-dark">{errors.email}</p> : null}
                </div>
              </div>

              <div data-reveal className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(220px,0.7fr)]">
                <div>
                  <label htmlFor="contact-organization" className="text-sm font-medium text-text-primary">
                    Organization
                  </label>
                  <input
                    id="contact-organization"
                    name="organization"
                    value={formState.organization}
                    onChange={(event) => handleChange("organization", event.target.value)}
                    className="mt-2 h-12 w-full rounded-[18px] border border-[rgba(16,24,40,0.12)] bg-white px-4 text-base text-text-primary outline-none transition-colors focus:border-orange-primary"
                    autoComplete="organization"
                  />
                </div>

                <div>
                  <label htmlFor="contact-vertical" className="text-sm font-medium text-text-primary">
                    Vertical
                  </label>
                  <select
                    id="contact-vertical"
                    name="vertical"
                    value={formState.vertical}
                    onChange={(event) => handleChange("vertical", event.target.value)}
                    className="mt-2 h-12 w-full rounded-[18px] border border-[rgba(16,24,40,0.12)] bg-white px-4 text-base text-text-primary outline-none transition-colors focus:border-orange-primary"
                  >
                    {verticalOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div data-reveal>
                <label htmlFor="contact-message" className="text-sm font-medium text-text-primary">
                  Project brief
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  aria-invalid={errors.message ? "true" : "false"}
                  value={formState.message}
                  onChange={(event) => handleChange("message", event.target.value)}
                  rows={6}
                  className="mt-2 w-full rounded-[22px] border border-[rgba(16,24,40,0.12)] bg-white px-4 py-3 text-base text-text-primary outline-none transition-colors focus:border-orange-primary"
                />
                {errors.message ? <p className="mt-2 text-sm text-orange-dark">{errors.message}</p> : null}
              </div>

              <div data-reveal className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p aria-live="polite" className="text-sm leading-6 text-text-secondary">
                  {statusMessage || "Your details stay in your email client until the dedicated contact workflow is launched."}
                </p>
                <button
                  type="submit"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[image:var(--brand-gradient)] px-6 text-sm font-semibold text-white shadow-[0_18px_40px_var(--orange-shadow)] transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-primary focus-visible:ring-offset-2"
                >
                  Start the enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </SectionReveal>
    </SectionContainer>
  );
}
