import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "./PageContainer";
import { businessVerticals } from "@/constants/verticals";
import { navigationItems } from "@/constants/navigation";
import { siteConfig } from "@/constants/site";

export function Footer() {
  return (
    <footer id="footer" className="relative -mt-10 bg-background-dark pt-10 text-white md:-mt-14">
      <PageContainer className="pb-10 md:pb-12">
        <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,27,45,1)_0%,rgba(12,18,31,1)_100%)] px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_repeat(2,minmax(220px,0.54fr))] lg:gap-12">
            <div>
              <Link
                href="#home"
                className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
              >
                <Image
                  src="/brand/tattvatech-logo.png"
                  alt="TattvaTech logo"
                  width={184}
                  height={52}
                  className="h-auto w-[168px] object-contain object-left md:w-[184px]"
                />
              </Link>

              <p className="mt-6 max-w-[34ch] text-[1rem] leading-8 text-white/72">
                TattvaTech is a founder-led parent technology brand connecting digital delivery, products, drone capability, and training through one clear operating system.
              </p>

              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="mt-6 inline-flex rounded-md text-[1.08rem] font-medium text-white underline decoration-white/24 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
              >
                {siteConfig.contactEmail}
              </a>
            </div>

            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-amber-primary">
                Navigate
              </p>
              <ul className="mt-5 space-y-3">
                {navigationItems.slice(1).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href ?? "#home"}
                      className="text-[0.98rem] leading-7 text-white/78 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-amber-primary">
                Verticals
              </p>
              <ul className="mt-5 space-y-3">
                {businessVerticals.map((vertical) => (
                  <li key={vertical.id}>
                    <Link
                      href={vertical.anchor}
                      className="text-[0.98rem] leading-7 text-white/78 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-primary"
                    >
                      {vertical.titleTop} {vertical.titleBottom}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
