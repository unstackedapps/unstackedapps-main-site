export function MarketingAtmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 55% at 15% -10%, rgba(243, 239, 230, 0.08), transparent 55%),
            radial-gradient(ellipse 70% 50% at 90% 10%, rgba(243, 239, 230, 0.05), transparent 50%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(243, 239, 230, 0.06), transparent 55%),
            linear-gradient(180deg, #0c1219 0%, #121a24 45%, #0c1219 100%)
          `,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </>
  );
}
