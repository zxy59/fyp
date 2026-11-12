interface ImageCardProps {
  title: string
  subtitle: string
  src?: string
  badge?: string
  badgeTone?: 'neutral' | 'success' | 'danger' | 'brand' | 'warn'
  loading?: boolean
  highlight?: boolean
}

const BADGE: Record<NonNullable<ImageCardProps['badgeTone']>, string> = {
  neutral: 'bg-slate-100 text-slate-600',
  success: 'bg-emerald-50 text-success',
  danger: 'bg-red-50 text-danger',
  brand: 'bg-brand-50 text-brand-600',
  warn: 'bg-amber-50 text-warn',
}

function ImageCard({ title, subtitle, src, badge, badgeTone = 'neutral', loading, highlight }: ImageCardProps) {
  return (
    <div
      className={[
        'overflow-hidden rounded-2xl border bg-panel shadow-sm transition',
        highlight ? 'border-brand-400 ring-2 ring-brand-100' : 'border-border',
      ].join(' ')}
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2.5">
        <div>
          <p className="text-sm font-semibold text-brand-900">{title}</p>
          <p className="text-[11px] text-muted">{subtitle}</p>
        </div>
        {badge && (
          <span className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${BADGE[badgeTone]}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="relative aspect-[4/3] bg-surface">
        {loading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-200 border-t-brand-500" />
            <span className="text-xs text-muted animate-pulse-soft">推理中…</span>
          </div>
        ) : src ? (
          <img src={src} alt={title} className="h-full w-full object-contain" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-xs text-muted">
            等待输入
          </div>
        )}
      </div>
    </div>
  )
}

interface Props {
  lr?: string
  dOutput?: string
  gOutput?: string
  fused?: string
  mask?: string
  scoreMap?: string
  loading?: boolean
  overlayMode: 'none' | 'mask' | 'score'
}

export function ResultPanel({
  lr,
  dOutput,
  gOutput,
  fused,
  mask,
  scoreMap,
  loading,
  overlayMode,
}: Props) {
  const fusedDisplay =
    overlayMode === 'mask' && mask
      ? mask
      : overlayMode === 'score' && scoreMap
        ? scoreMap
        : fused

  const fusedTitle =
    overlayMode === 'mask'
      ? '选择掩码 M'
      : overlayMode === 'score'
        ? 'Router 分数 s'
        : '融合结果 ŷ'

  const fusedSubtitle =
    overlayMode === 'mask'
      ? '绿 = 接受 G · 红 = 回退 D'
      : overlayMode === 'score'
        ? '分数越低风险越小'
        : 'D + M̃ ⊙ HP(G − D)'

  return (
    <section className="animate-fade-up">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-brand-900">结果对比</h2>
          <p className="text-sm text-muted">四路输出并排 · 突出选择性回退价值</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <ImageCard title="LR 输入" subtitle="低分辨率 x" src={lr} loading={loading && !lr} />
        <ImageCard
          title="全 D"
          subtitle="Real-ESRGAN · 稳但偏糊"
          src={dOutput}
          badge="确定性"
          badgeTone="neutral"
          loading={loading && !dOutput}
        />
        <ImageCard
          title="全 G"
          subtitle="OSEDiff · 单步扩散 · 好看易幻觉"
          src={gOutput}
          badge="生成"
          badgeTone="danger"
          loading={loading && !gOutput}
        />
        <ImageCard
          title={fusedTitle}
          subtitle={fusedSubtitle}
          src={fusedDisplay}
          badge={overlayMode === 'none' ? 'Ours' : overlayMode === 'mask' ? 'Mask' : 'Score'}
          badgeTone={overlayMode === 'none' ? 'brand' : overlayMode === 'mask' ? 'success' : 'warn'}
          loading={loading && !fusedDisplay}
          highlight={overlayMode === 'none'}
        />
      </div>
    </section>
  )
}
