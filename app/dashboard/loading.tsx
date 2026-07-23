export default function DashboardLoading() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div className="h-6 w-28 animate-pulse rounded-md bg-[var(--color-muted)]" />
        <div className="h-4 w-16 animate-pulse rounded-md bg-[var(--color-muted)]" />
      </div>
      <div className="h-7 w-40 animate-pulse rounded-md bg-[var(--color-muted)]" />
      <div className="mt-3 h-4 w-64 animate-pulse rounded-md bg-[var(--color-muted)]" />
      <div className="mt-6 h-16 animate-pulse rounded-2xl bg-[var(--color-muted)]" />
      <div className="mt-5 flex flex-col gap-2.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 animate-pulse rounded-xl bg-[var(--color-muted)]" />
        ))}
      </div>
    </main>
  );
}
