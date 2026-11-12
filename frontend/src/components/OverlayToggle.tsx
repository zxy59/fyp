import type { ViewMode } from '../types'

interface Props {
  value: ViewMode
  onChange: (v: ViewMode) => void
  disabled?: boolean
}

const OPTIONS: { value: ViewMode; label: string }[] = [
  { value: 'fused', label: '融合图' },
  { value: 'mask', label: '掩码 M' },
  { value: 'score', label: '分数 s' },
]

export function OverlayToggle({ value, onChange, disabled }: Props) {
  return (
    <div className="inline-flex rounded-xl border border-border bg-surface p-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(opt.value)}
          className={[
            'rounded-lg px-3 py-1.5 text-xs font-medium transition',
            value === opt.value
              ? 'bg-brand-500 text-white shadow-sm'
              : 'text-slate-600 hover:bg-brand-50',
            disabled ? 'opacity-50' : '',
          ].join(' ')}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
