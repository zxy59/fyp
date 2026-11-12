import type { InferResponse } from '../types'

interface Props {
  result?: InferResponse | null
  loading?: boolean
}

function Stat({ label, value, unit, accent }: { label: string; value: string; unit?: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl border p-3 ${accent ? 'border-brand-200 bg-brand-50' : 'border-border bg-surface'}`}>
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold text-brand-900">
        {value}
        {unit && <span className="ml-0.5 text-sm font-normal text-muted">{unit}</span>}
      </p>
    </div>
  )
}

export function StatsPanel({ result, loading }: Props) {
  const risk = result?.stats.risk
  const lat = result?.stats.latencyMs
  const m = result?.stats.metrics

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      {/* 风险统计 — [BACKEND] 字段来自 stats.risk */}
      <div className="rounded-2xl border border-border bg-panel p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-brand-900">风险校准</h3>
        {loading ? (
          <p className="text-xs text-muted animate-pulse-soft">计算中…</p>
        ) : risk ? (
          <div className="grid grid-cols-2 gap-2">
            <Stat label="覆盖率" value={(risk.coverage * 100).toFixed(1)} unit="%" accent />
            <Stat label="阈值 τ" value={risk.thresholdTau.toFixed(3)} />
            <Stat label="α 目标" value={`${(risk.alpha * 100).toFixed(0)}%`} />
            <Stat label="违约率" value={(risk.violationRate * 100).toFixed(2)} unit="%" />
          </div>
        ) : (
          <p className="text-xs text-muted">上传图像后开始推理</p>
        )}
      </div>

      {/* 延迟 — [BACKEND] 字段来自 stats.latency_ms */}
      <div className="rounded-2xl border border-border bg-panel p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-brand-900">推理效率</h3>
        {loading ? (
          <p className="text-xs text-muted animate-pulse-soft">计时中…</p>
        ) : lat ? (
          <div className="space-y-2">
            {[
              { k: 'D', v: lat.d },
              { k: 'G', v: lat.g },
              { k: 'Router', v: lat.router },
              { k: '融合', v: lat.fuse },
            ].map(({ k, v }) => (
              <div key={k} className="flex items-center gap-2">
                <span className="w-14 text-xs font-medium text-muted">{k}</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all"
                    style={{ width: `${Math.min(100, (v / lat.total) * 100)}%` }}
                  />
                </div>
                <span className="w-14 text-right font-mono text-xs text-brand-900">{v} ms</span>
              </div>
            ))}
            <div className="mt-2 flex justify-between border-t border-border pt-2 text-xs">
              <span className="text-muted">总延迟</span>
              <span className="font-mono font-semibold text-brand-900">{lat.total} ms</span>
            </div>
            <p className="text-[10px] text-muted">目标：额外开销 &lt; 单步 G 的 10%</p>
          </div>
        ) : (
          <p className="text-xs text-muted">—</p>
        )}
      </div>

      {/* 质量指标 — [BACKEND] 有 GT 时返回 psnr/ssim/lpips/dists */}
      <div className="rounded-2xl border border-border bg-panel p-4 shadow-sm">
        <h3 className="mb-3 text-sm font-semibold text-brand-900">图像质量</h3>
        {loading ? (
          <p className="text-xs text-muted animate-pulse-soft">评估中…</p>
        ) : m ? (
          <div className="grid grid-cols-2 gap-2">
            {m.psnr != null && <Stat label="PSNR" value={m.psnr.toFixed(2)} unit="dB" />}
            {m.ssim != null && <Stat label="SSIM" value={m.ssim.toFixed(3)} />}
            {m.lpips != null && <Stat label="LPIPS" value={m.lpips.toFixed(3)} />}
            {m.dists != null && <Stat label="DISTS" value={m.dists.toFixed(3)} />}
          </div>
        ) : (
          <p className="text-xs text-muted">Mock 模式提供示意指标 · 接入后端后替换</p>
        )}
      </div>
    </section>
  )
}
