import type { AlphaLevel, InferResponse } from '../types'

/** Mock 数据：无后端时用 Canvas 生成演示图，模拟 D/G/融合/掩码差异 */

const TAU_BY_ALPHA: Record<AlphaLevel, number> = {
  0.01: 0.22,
  0.03: 0.35,
  0.05: 0.48,
  0.10: 0.62,
}

const COVERAGE_BY_ALPHA: Record<AlphaLevel, number> = {
  0.01: 0.41,
  0.03: 0.58,
  0.05: 0.71,
  0.10: 0.84,
}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

function canvasToDataUrl(canvas: HTMLCanvasElement): string {
  return canvas.toDataURL('image/jpeg', 0.92)
}

function drawBase(ctx: CanvasRenderingContext2D, img: HTMLImageElement, w: number, h: number) {
  ctx.drawImage(img, 0, 0, w, h)
}

/** 模拟 D：轻微模糊 + 降噪 */
function renderD(source: HTMLCanvasElement): string {
  const c = document.createElement('canvas')
  c.width = source.width
  c.height = source.height
  const ctx = c.getContext('2d')!
  ctx.filter = 'blur(1.2px) saturate(0.95)'
  ctx.drawImage(source, 0, 0)
  ctx.filter = 'none'
  return canvasToDataUrl(c)
}

/** 模拟 G：锐化 + 饱和，局部「幻觉」高亮 */
function renderG(source: HTMLCanvasElement): string {
  const c = document.createElement('canvas')
  c.width = source.width
  c.height = source.height
  const ctx = c.getContext('2d')!
  ctx.filter = 'contrast(1.12) saturate(1.18) brightness(1.03)'
  ctx.drawImage(source, 0, 0)

  const w = c.width
  const h = c.height
  ctx.fillStyle = 'rgba(255, 180, 80, 0.08)'
  ctx.fillRect(w * 0.08, h * 0.12, w * 0.35, h * 0.18)
  ctx.strokeStyle = 'rgba(220, 38, 38, 0.35)'
  ctx.lineWidth = 2
  ctx.strokeRect(w * 0.08, h * 0.12, w * 0.35, h * 0.18)
  return canvasToDataUrl(c)
}

/** 模拟 Router 分数图与掩码 M */
function renderMaskAndScore(
  w: number,
  h: number,
  alpha: AlphaLevel,
): { mask: string; scoreMap: string; coverage: number } {
  const tau = TAU_BY_ALPHA[alpha]
  const patch = 32
  const maskC = document.createElement('canvas')
  maskC.width = w
  maskC.height = h
  const mCtx = maskC.getContext('2d')!

  const scoreC = document.createElement('canvas')
  scoreC.width = w
  scoreC.height = h
  const sCtx = scoreC.getContext('2d')!

  let accept = 0
  let total = 0

  for (let y = 0; y < h; y += patch) {
    for (let x = 0; x < w; x += patch) {
      total++
      const cx = x + patch / 2
      const cy = y + patch / 2
      const nx = cx / w
      const ny = cy / h

      const textZone = nx > 0.05 && nx < 0.42 && ny > 0.1 && ny < 0.32
      const faceZone = nx > 0.55 && nx < 0.88 && ny > 0.15 && ny < 0.55
      const repeatZone = nx > 0.2 && nx < 0.75 && ny > 0.62 && ny < 0.92

      let score = 0.25 + Math.sin(nx * 11) * 0.08 + Math.cos(ny * 9) * 0.06
      if (textZone) score += 0.45
      if (faceZone) score += 0.38
      if (repeatZone) score += 0.28
      score = Math.min(0.95, Math.max(0.05, score))

      const acceptG = score <= tau
      if (acceptG) accept++

      mCtx.fillStyle = acceptG ? 'rgba(5, 150, 105, 0.55)' : 'rgba(220, 38, 38, 0.55)'
      mCtx.fillRect(x, y, patch, patch)
      mCtx.strokeStyle = 'rgba(255,255,255,0.15)'
      mCtx.strokeRect(x + 0.5, y + 0.5, patch - 1, patch - 1)

      const t = 1 - score
      sCtx.fillStyle = `hsl(${Math.round(210 - t * 160)}, 72%, ${Math.round(38 + t * 22)}%)`
      sCtx.fillRect(x, y, patch, patch)
    }
  }

  const targetCoverage = COVERAGE_BY_ALPHA[alpha]
  const actualCoverage = accept / total
  const coverage = actualCoverage * 0.3 + targetCoverage * 0.7

  return {
    mask: canvasToDataUrl(maskC),
    scoreMap: canvasToDataUrl(scoreC),
    coverage,
  }
}

/** 模拟融合：D 底 + 选择性注入 G 高频 */
function renderFused(dUrl: string, gUrl: string, maskUrl: string, w: number, h: number): Promise<string> {
  return Promise.all([loadImageFromDataUrl(dUrl), loadImageFromDataUrl(gUrl), loadImageFromDataUrl(maskUrl)]).then(
    ([dImg, gImg, mImg]) => {
      const c = document.createElement('canvas')
      c.width = w
      c.height = h
      const ctx = c.getContext('2d')!
      ctx.drawImage(dImg, 0, 0)

      const gC = document.createElement('canvas')
      gC.width = w
      gC.height = h
      const gCtx = gC.getContext('2d')!
      gCtx.drawImage(gImg, 0, 0)

      const dC = document.createElement('canvas')
      dC.width = w
      dC.height = h
      const dCtx = dC.getContext('2d')!
      dCtx.drawImage(dImg, 0, 0)

      const gData = gCtx.getImageData(0, 0, w, h)
      const dData = dCtx.getImageData(0, 0, w, h)
      const out = ctx.getImageData(0, 0, w, h)

      const mC = document.createElement('canvas')
      mC.width = w
      mC.height = h
      mC.getContext('2d')!.drawImage(mImg, 0, 0)
      const mData = mC.getContext('2d')!.getImageData(0, 0, w, h)

      for (let i = 0; i < out.data.length; i += 4) {
        const isGreen = mData.data[i + 1] > mData.data[i] && mData.data[i + 1] > mData.data[i + 2]
        if (!isGreen) continue
        const blend = 0.55
        out.data[i] = out.data[i] * (1 - blend) + gData.data[i] * blend
        out.data[i + 1] = out.data[i + 1] * (1 - blend) + gData.data[i + 1] * blend
        out.data[i + 2] = out.data[i + 2] * (1 - blend) + gData.data[i + 2] * blend
      }
      ctx.putImageData(out, 0, 0)
      return canvasToDataUrl(c)
    },
  )
}

function loadImageFromDataUrl(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

export async function mockInfer(file: File, alpha: AlphaLevel): Promise<InferResponse> {
  await delay(900)

  const img = await loadImage(file)
  const maxSide = 512
  const scale = Math.min(1, maxSide / Math.max(img.width, img.height))
  const w = Math.round(img.width * scale)
  const h = Math.round(img.height * scale)

  const base = document.createElement('canvas')
  base.width = w
  base.height = h
  const bCtx = base.getContext('2d')!
  drawBase(bCtx, img, w, h)
  const lr = canvasToDataUrl(base)

  const dOutput = renderD(base)
  const gOutput = renderG(base)
  const { mask, scoreMap, coverage } = renderMaskAndScore(w, h, alpha)
  const fused = await renderFused(dOutput, gOutput, mask, w, h)

  const tau = TAU_BY_ALPHA[alpha]

  return {
    lr,
    dOutput,
    gOutput,
    fused,
    mask,
    scoreMap,
    stats: {
      latencyMs: { d: 198, g: 1080, router: 48, fuse: 12, total: 1338 },
      risk: {
        coverage,
        violationRate: alpha * (0.85 + Math.random() * 0.2),
        thresholdTau: tau,
        alpha,
      },
      metrics: {
        psnr: 28.4 + coverage * 1.2,
        ssim: 0.891,
        lpips: 0.118 - coverage * 0.02,
        dists: 0.142,
      },
    },
  }
}
