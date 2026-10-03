/** لکه‌های نورانی پس‌زمینه — فقط تزئینی */
export function BackgroundOrbs() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <span
        className="absolute -top-20 -start-16 size-[420px] rounded-full blur-[60px]"
        style={{ background: 'var(--orb-1)', opacity: 'var(--orb-opacity)' }}
      />
      <span
        className="absolute top-[45%] -start-32 size-[340px] rounded-full blur-[60px]"
        style={{ background: 'var(--orb-2)', opacity: 'var(--orb-opacity)' }}
      />
      <span
        className="absolute -bottom-24 -end-24 size-[380px] rounded-full blur-[60px]"
        style={{ background: 'var(--orb-3)', opacity: 'var(--orb-opacity)' }}
      />
    </div>
  );
}
