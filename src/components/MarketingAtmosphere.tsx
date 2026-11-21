// Flat navy with a faint dot grid that fades out down the screen, the ground the Hairline figure sits on.
export function MarketingAtmosphere() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 bg-[#0c1219]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(243, 239, 230, 0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(180deg, #000 0%, transparent 70%)",
        }}
      />
    </>
  );
}
