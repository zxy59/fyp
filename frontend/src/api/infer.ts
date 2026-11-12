import type { AlphaLevel, InferRequest, InferResponse } from '../types'
import { mockInfer } from './mockInfer'

/**
 * ============================================================
 * [BACKEND] 推理 API 接入点
 * ============================================================
 *
 * 后端就绪后：
 * 1. 将 USE_MOCK 设为 false
 * 2. 在 vite.config.ts 中启用 /api 代理，或设置 VITE_API_BASE
 * 3. 确保 FastAPI/Flask 实现 POST /api/infer，请求/响应格式见下方
 *
 * 期望的后端接口：
 *   POST /api/infer
 *   Content-Type: multipart/form-data
 *   Fields:
 *     - image: File          输入 LR 图像
 *     - alpha: number         风险水平 (0.01 | 0.03 | 0.05 | 0.10)
 *     - return_mask: boolean
 *     - return_intermediate: boolean
 *
 *   Response JSON:
 *     { lr, d_output, g_output, fused, mask?, score_map?, stats }
 *     stats: { latency_ms, risk: { coverage, violation_rate, threshold_tau, alpha }, metrics? }
 * ============================================================
 */

const USE_MOCK = true

/** [BACKEND] 生产环境 API 根路径，例如 http://127.0.0.1:8000 */
const API_BASE = import.meta.env.VITE_API_BASE ?? ''

export async function runInference(req: InferRequest): Promise<InferResponse> {
  if (USE_MOCK) {
    return mockInfer(req.imageFile, req.alpha)
  }

  // [BACKEND] 真实推理请求 — 取消注释并对接 Python 服务
  const form = new FormData()
  form.append('image', req.imageFile)
  form.append('alpha', String(req.alpha))
  form.append('return_mask', String(req.returnMask ?? true))
  form.append('return_intermediate', String(req.returnIntermediate ?? true))

  const res = await fetch(`${API_BASE}/api/infer`, {
    method: 'POST',
    body: form,
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`推理失败 (${res.status}): ${detail}`)
  }

  const raw = await res.json()

  // [BACKEND] 若后端字段为 snake_case，在此做映射
  return {
    lr: raw.lr,
    dOutput: raw.d_output ?? raw.dOutput,
    gOutput: raw.g_output ?? raw.gOutput,
    fused: raw.fused,
    mask: raw.mask,
    scoreMap: raw.score_map ?? raw.scoreMap,
    stats: {
      latencyMs: {
        d: raw.stats.latency_ms.d,
        g: raw.stats.latency_ms.g,
        router: raw.stats.latency_ms.router,
        fuse: raw.stats.latency_ms.fuse,
        total: raw.stats.latency_ms.total,
      },
      risk: {
        coverage: raw.stats.risk.coverage,
        violationRate: raw.stats.risk.violation_rate ?? raw.stats.risk.violationRate,
        thresholdTau: raw.stats.risk.threshold_tau ?? raw.stats.risk.thresholdTau,
        alpha: raw.stats.risk.alpha as AlphaLevel,
      },
      metrics: raw.stats.metrics,
    },
  }
}

/** [BACKEND] 健康检查 — 可用于前端显示「后端已连接」状态 */
export async function checkBackendHealth(): Promise<boolean> {
  if (USE_MOCK) return false
  try {
    const res = await fetch(`${API_BASE}/api/health`, { method: 'GET' })
    return res.ok
  } catch {
    return false
  }
}
