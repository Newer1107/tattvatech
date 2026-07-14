import { ButtonLink } from "@/components/ui/Button";
import { PageContainer } from "@/components/layout/PageContainer";

export default function NotFound() {
  return (
    <PageContainer className="flex min-h-screen items-center justify-center py-24">
      <div className="max-w-xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-orange-primary">
          404
        </p>
        <h1 className="font-heading text-[clamp(2.5rem,5vw,4.5rem)] leading-none tracking-[-0.04em]">
          This page has not been mapped yet.
        </h1>
        <p className="mt-6 text-lg leading-8 text-text-secondary">
          Return to the main website to continue exploring the TattvaTech brand
          and service roadmap.
        </p>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/">Back to homepage</ButtonLink>
        </div>
      </div>
    </PageContainer>
  );
}
