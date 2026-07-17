type HeroBackgroundProps = {
  sceneActive: boolean;
};

export function HeroBackground({ sceneActive }: HeroBackgroundProps) {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 72% 42%, rgba(245, 90, 10, 0.14), transparent 30%),
            radial-gradient(circle at 58% 70%, rgba(255, 168, 0, 0.08), transparent 28%),
            linear-gradient(135deg, #08111f 0%, #101828 48%, #080d16 100%)`,
        }}
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at var(--hero-mouse-x,72%) var(--hero-mouse-y,42%), rgba(245, 90, 10, 0.08), transparent 22%)",
          opacity: sceneActive ? 1 : 0.72,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.03),transparent_20%),radial-gradient(circle_at_82%_72%,rgba(255,255,255,0.025),transparent_26%)]" />
      <div className="absolute inset-x-[6%] top-[12%] bottom-[10%] border border-white/6" />
      <div className="absolute inset-x-[6%] top-[50%] h-px bg-white/6" />
      <div className="absolute left-[52%] top-[12%] bottom-[10%] w-px bg-white/6 max-lg:hidden" />
    </div>
  );
}
