import { PageContainer } from "./PageContainer";

export function Footer() {
  return (
    <footer id="footer" className="bg-background-dark text-white">
      <PageContainer className="py-14">
        <div className="rounded-[28px] border border-white/10 px-6 py-10 md:px-8">
          <p className="text-[0.74rem] font-semibold uppercase tracking-[0.24em] text-amber-primary">
            Footer
          </p>
          <h2 className="mt-5 font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-[-0.04em]">
            The final dark footer will be detailed here in a later pass.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">
            This placeholder preserves the required footer position, visual tone,
            and dark close to the page while leaving detailed links, contact
            data, and business structure content for the dedicated footer design
            reference.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
