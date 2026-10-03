import { CardSkeleton } from '@/components/CardSkeleton';

export default function Loading() {
  return (
    <main className="px-4 pb-8 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-[1140px]">
        <div className="glass panel">
          <div className="animate-skeleton h-6 w-32 rounded-full bg-brand-soft" />
          <div className="animate-skeleton mt-4 h-9 w-48 rounded-xl bg-brand-soft" />
          <CardSkeleton />
        </div>
      </div>
    </main>
  );
}
