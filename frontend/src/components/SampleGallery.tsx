import type { SampleItem } from '../types'

const TAG_STYLE: Record<SampleItem['tag'], string> = {
  texture: 'bg-emerald-50 text-success ring-emerald-200',
  text: 'bg-red-50 text-danger ring-red-200',
  face: 'bg-violet-50 text-violet-700 ring-violet-200',
  repeat: 'bg-amber-50 text-warn ring-amber-200',
  general: 'bg-slate-50 text-slate-600 ring-slate-200',
}

const TAG_LABEL: Record<SampleItem['tag'], string> = {
  texture: '纹理',
  text: '文字',
  face: '人脸',
  repeat: '重复纹理',
  general: '通用',
}

/** [BACKEND] 接入后可改为从 /api/samples 拉取预置高风险示例图 */
export const SAMPLE_ITEMS: SampleItem[] = [
  { id: 'general', label: '通用场景', tag: 'general', description: '自然纹理，G 与 D 差异适中' },
  { id: 'text', label: '文字区域', tag: 'text', description: '高风险：G 易编造笔画' },
  { id: 'face', label: '人脸细节', tag: 'face', description: '高风险：G 易改变面部结构' },
  { id: 'repeat', label: '重复纹理', tag: 'repeat', description: '高风险：G 易产生重复伪影' },
]

/** 生成占位示例图（无后端时用 SVG data URL） */
function makePlaceholderSample(tag: SampleItem['tag'], label: string): string {
  const colors: Record<SampleItem['tag'], [string, string]> = {
    general: ['#2a6f78', '#d5ecef'],
    text: ['#1f3a5f', '#fecaca'],
    face: ['#5b21b6', '#ddd6fe'],
    repeat: ['#b45309', '#fde68a'],
    texture: ['#059669', '#a7f3d0'],
  }
  const [c1, c2] = colors[tag]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="480" viewBox="0 0 640 480">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="${c1}"/><stop offset="100%" stop-color="${c2}"/></linearGradient></defs>
    <rect width="640" height="480" fill="url(#g)"/>
    <text x="320" y="230" text-anchor="middle" fill="white" font-size="28" font-family="sans-serif" opacity="0.9">${label}</text>
    <text x="320" y="270" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif" opacity="0.7">Mock 示例 · 可替换为真实 LR</text>
  </svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

interface Props {
  onSelect: (file: File) => void
  disabled?: boolean
}

export function SampleGallery({ onSelect, disabled }: Props) {
  const handleSample = async (item: SampleItem) => {
    const url = makePlaceholderSample(item.tag, item.label)
    const res = await fetch(url)
    const blob = await res.blob()
    const file = new File([blob], `${item.id}.svg`, { type: 'image/svg+xml' })
    onSelect(file)
  }

  return (
    <div className="rounded-2xl border border-border bg-panel p-4 shadow-sm">
      <p className="mb-1 text-sm font-semibold text-brand-900">示例图库</p>
      <p className="mb-3 text-xs text-muted">覆盖 PPT 高风险子集 · 点击快速演示</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {SAMPLE_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={disabled}
            onClick={() => handleSample(item)}
            className="group rounded-xl border border-border bg-surface p-3 text-left transition hover:border-brand-300 hover:shadow-sm disabled:opacity-60"
          >
            <span className={`inline-block rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1 ${TAG_STYLE[item.tag]}`}>
              {TAG_LABEL[item.tag]}
            </span>
            <p className="mt-2 text-xs font-semibold text-brand-900">{item.label}</p>
            <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-muted">{item.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
