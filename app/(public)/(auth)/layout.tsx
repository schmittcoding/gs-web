const CORNER_PATHS = [
  { pos: "left-5 top-5", d: "M16 4H4v12" },
  { pos: "right-5 top-5", d: "M16 4h12v12" },
  { pos: "bottom-5 left-5", d: "M16 28H4V16" },
  { pos: "bottom-5 right-5", d: "M16 28h12V16" },
];

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-gray-950 sm:p-6">
      <div
        className="grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl shadow-2xl lg:grid-cols-[1fr_1.15fr]"
        style={{ minHeight: "600px" }}
      >
        {/* ── Left: form panel ─────────────────────────────── */}
        <div className="flex flex-col justify-center px-10 py-12 bg-gray-900 lg:px-14">
          {children}
        </div>

        {/* ── Right: illustration panel ─────────────────────── */}
        <div className="relative items-center justify-center hidden overflow-hidden bg-gray-950 lg:flex">
          <div
            className="absolute inset-0 bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage:
                "url('https://images.ranonlinegs.com/assets/background/bg-auth.webp')",
            }}
          />

          {CORNER_PATHS.map(({ pos, d }) => (
            <svg
              key={pos}
              className={`pointer-events-none absolute ${pos} size-8 text-primary`}
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d={d}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ))}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
