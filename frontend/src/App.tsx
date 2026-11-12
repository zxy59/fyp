import { useCallback, useState } from 'react'
import { runInference } from './api/infer'
import { AlphaSelector } from './components/AlphaSelector'
import { BackendNotice } from './components/BackendNotice'
import { CompareSlider } from './components/CompareSlider'
import { Header } from './components/Header'
import { ImageUpload } from './components/ImageUpload'
import { OverlayToggle } from './components/OverlayToggle'
import { PipelineStrip } from './components/PipelineStrip'
import { ResultPanel } from './components/ResultPanel'
import { SampleGallery } from './components/SampleGallery'
import { StatsPanel } from './components/StatsPanel'
import type { AlphaLevel, InferResponse, ViewMode } from './types'

export default function App() {
  const [alpha, setAlpha] = useState<AlphaLevel>(0.03)
  const [viewMode, setViewMode] = useState<ViewMode>('fused')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<InferResponse | null>(null)
  const [currentFile, setCurrentFile] = useState<File | null>(null)

  const handleInfer = useCallback(
    async (file: File, nextAlpha?: AlphaLevel) => {
      setError(null)
      setLoading(true)
      setCurrentFile(file)
      try {
        const res = await runInference({
          imageFile: file,
          alpha: nextAlpha ?? alpha,
          returnMask: true,
          returnIntermediate: true,
        })
        setResult(res)
      } catch (e) {
        setError(e instanceof Error ? e.message : '推理失败')
        setResult(null)
      } finally {
        setLoading(false)
      }
    },
    [alpha],
  )

  const handleAlphaChange = (next: AlphaLevel) => {
    setAlpha(next)
    if (currentFile) handleInfer(currentFile, next)
  }

  const overlayMode =
    viewMode === 'fused' ? 'none' : viewMode === 'mask' ? 'mask' : 'score'

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8">
        <section className="animate-fade-up space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
            风险校准的选择性真实超分
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            冻结确定性模型 D 与单步扩散 G，轻量 Router 预测局部超额风险 Δ，
            经校准阈值 τ 决定哪些区域注入 G 的高频细节，哪些区域回退 D。
          </p>
        </section>

        <PipelineStrip />
        <BackendNotice />

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <aside className="space-y-4">
            <ImageUpload onFileSelect={handleInfer} disabled={loading} />
            <SampleGallery onFileSelect={handleInfer} disabled={loading} />
            <AlphaSelector value={alpha} onChange={handleAlphaChange} disabled={loading} />
          </aside>

          <div className="space-y-6">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-danger">
                {error}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <OverlayToggle
                value={viewMode}
                onChange={setViewMode}
                disabled={!result || loading}
              />
              {result && (
                <p className="text-xs text-muted">
                  当前 α = {(result.stats.risk.alpha * 100).toFixed(0)}%
                  · τ = {result.stats.risk.thresholdTau.toFixed(3)}
                </p>
              )}
            </div>

            <ResultPanel
              lr={result?.lr}
              dOutput={result?.dOutput}
              gOutput={result?.gOutput}
              fused={result?.fused}
              mask={result?.mask}
              scoreMap={result?.scoreMap}
              loading={loading}
              overlayMode={overlayMode}
            />

            <CompareSlider leftSrc={result?.dOutput} rightSrc={result?.fused} />

            <StatsPanel result={result} loading={loading} />
          </div>
        </div>

        <footer className="border-t border-border pt-6 text-center text-xs text-muted">
          Risk-Calibrated Selective Generation for Real-ISR · FYP Demo
        </footer>
      </main>
    </div>
  )
}
