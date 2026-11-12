export function Header() {
  return (
    <header className="border-b border-border bg-panel/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500 text-sm font-bold text-white shadow-sm">
            R
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-brand-900 sm:text-lg">
              RCSR Demo
            </h1>
            <p className="text-xs text-muted sm:text-sm">
              风险校准的选择性真实超分
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600 ring-1 ring-brand-200 sm:inline">
            ŷ = D + M̃ ⊙ HP(G − D)
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-warn ring-1 ring-amber-200">
            <span className="h-1.5 w-1.5 rounded-full bg-warn animate-pulse-soft" />
            Mock 模式
          </span>
        </div>
      </div>
    </header>
  )
}
