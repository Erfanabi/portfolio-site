/** جای کارت هنگام بارگذاری — تا جابه‌جایی چیدمان حس نشود */
export function CardSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className="glass-soft animate-skeleton h-[320px] rounded-[var(--radius-md)]"
        />
      ))}
    </div>
  );
}
