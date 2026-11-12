import { useCallback, useRef, useState } from 'react'

interface Props {
  leftSrc?: string
  rightSrc?: string
  leftLabel?: string
  rightLabel?: string
}

/** 左右滑动对比 — 适合答辩时展示 D vs 融合 */
export function CompareSlider({
  leftSrc,
  rightSrc,
  leftLabel = '全 D',
  rightLabel = '融合 ŷ',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(50)

  const onMove = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPct((x / rect.width) * 100)
  }, [])

  if (!leftSrc || !rightSrc) {
    return (
      <div className="flex aspect-[16/7] items-center justify-center rounded-2xl border border-dashed border-border bg-panel text-sm text-muted">
        推理完成后可拖动对比 D 与融合结果
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-border bg-panel p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-brand-900">滑动对比</h3>
          <p className="text-xs text-muted">直观展示感知提升与忠实回退</p>
        </div>
        <div className="flex gap-3 text-[11px] text-muted">
          <span>{leftLabel}</span>
          <span>↔</span>
          <span>{rightLabel}</span>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative aspect-[16/7] cursor-ew-resize select-none overflow-hidden rounded-xl bg-surface"
        onMouseMove={(e) => e.buttons === 1 && onMove(e.clientX)}
        onMouseDown={(e) => onMove(e.clientX)}
        onTouchMove={(e) => onMove(e.touches[0].clientX)}
      >
        <img src={rightSrc} alt={rightLabel} className="absolute inset-0 h-full w-full object-contain" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pct}%` }}>
          <img
            src={leftSrc}
            alt={leftLabel}
            className="absolute inset-0 h-full w-full object-contain"
            style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
          />
        </div>
        <div
          className="absolute inset-y-0 w-0.5 bg-white shadow-lg"
          style={{ left: `${pct}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-2 ring-brand-200">
            <svg className="h-4 w-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
