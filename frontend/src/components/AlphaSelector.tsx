import type { AlphaLevel } from '../types'

const OPTIONS: { value: AlphaLevel; label: string }[] = [
  { value: 0.01, label: 'α = 1%' },
  { value: 0.03, label: 'α = 3%' },
  { value: 0.05, label: 'α = 5%' },
  { value: 0.10, label: 'α = 10%' },
]

interface Props {
  value: AlphaLevel
  onChange: (v: AlphaLevel) => void
  disabled?: boolean
}

export function AlphaSelector({ value, onChange, disabled }: Props) {
  return (
    <div className="rounded-2xl border border-border bg-panel p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-900">风险水平 α</p>
          <p className="text-xs text-muted">校准集违约率上限 · 切换后重新融合</p>
        </div>
        {/* [BACKEND] 接入后可显示后端返回的锁定 τ */}
        <span className="font-mono text-xs text-muted">τ 由校准集锁定</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {OPTIONS.map((opt) => {
          const active = value === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              disabled={disabled}
              onClick={() => onChange(opt.value)}
              className={[
                'rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                active
                  ? 'bg-brand-500 text-white shadow-md ring-2 ring-brand-200'
                  : 'border border-border bg-surface text-slate-700 hover:border-brand-200 hover:bg-brand-50',
                disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
              ].join(' ')}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
