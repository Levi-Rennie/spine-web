export default function Loading() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10 border-b border-zinc-800 pb-6">
          <h1 className="text-4xl font-bold tracking-tight">
            Spine<span className="text-emerald-400">.</span>
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Library loans</p>
        </header>
        <div className="space-y-10">
          {/* form placeholder */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
            <div className="h-4 w-20 bg-zinc-800 rounded mb-4 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 bg-zinc-800/60 rounded-md animate-pulse" />
              ))}
            </div>
            <div className="h-9 w-28 bg-zinc-800 rounded-md mt-4 animate-pulse" />
          </div>

          {/* list placeholder */}
          <div>
            <div className="h-3 w-16 bg-zinc-800 rounded mb-3 animate-pulse" />
            <ul className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <li
                  key={i}
                  className="border border-zinc-800 rounded-lg p-4"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="h-4 w-1/2 bg-zinc-800 rounded animate-pulse" />
                    <div className="h-3 w-8 bg-zinc-800/60 rounded animate-pulse" />
                  </div>
                  <div className="h-3 w-1/3 bg-zinc-800/60 rounded mt-2 animate-pulse" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}