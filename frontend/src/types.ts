/** 风险水平 α，对应校准集上允许的违约率上限 */
export type AlphaLevel = 0.01 | 0.03 | 0.05 | 0.10

export interface LatencyStats {
  d: number
  g: number
  router: number
  fuse: number
  total: number
}

export interface QualityMetrics {
  psnr?: number
  ssim?: number
  lpips?: number
  dists?: number
  musiq?: number
}

export interface RiskStats {
  coverage: number
  violationRate: number
  thresholdTau: number
  alpha: AlphaLevel
}

export interface InferRequest {
  imageFile: File
  alpha: AlphaLevel
  returnMask?: boolean
  returnIntermediate?: boolean
}

/** 后端 /api/infer 应返回的结构 — 见 src/api/infer.ts */
export interface InferResponse {
  lr: string
  dOutput: string
  gOutput: string
  fused: string
  mask?: string
  scoreMap?: string
  stats: {
    latencyMs: LatencyStats
    risk: RiskStats
    metrics?: QualityMetrics
  }
}

export type ViewMode = 'fused' | 'mask' | 'score'

export interface SampleItem {
  id: string
  label: string
  tag: 'texture' | 'text' | 'face' | 'repeat' | 'general'
  description: string
}
