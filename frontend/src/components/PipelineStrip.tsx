const STEPS = [
  { key: 'lr', label: 'LR 输入', desc: 'x' },
  { key: 'd', label: '确定性 D', desc: 'Real-ESRGAN' },
  { key: 'g', label: '生成 G', desc: 'OSEDiff' },
  { key: 'router', label: 'Router s', desc: '风险头' },
  { key: 'fuse', label: '融合 ŷ', desc: '高频残差' },
]

export function PipelineStrip() {
  return (
    <section className="rounded-2xl border border-border bg-panel p-4 shadow-sm">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">
        推理流水线
      </p>
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {STEPS.map((step, i) => (
          <div key={step.key} className="flex items-center gap-2">
            <div className="rounded-xl border border-border bg-surface px-3 py-2 text-center min-w-[88px]">
              <div className="text-xs font-semibold text-brand-900">{step.label}</div>
              <div className="text-[10px] text-muted">{step.desc}</div>
            </div>
            {i < STEPS.length - 1 && (
              <svg className="hidden h-4 w-4 text-brand-300 sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
