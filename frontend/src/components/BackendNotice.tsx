export function BackendNotice() {
  return (
    <aside className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/60 p-4">
      <div className="flex gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500 text-white text-xs font-bold">
          API
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-brand-900">后端接入预留</p>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            当前为 <strong className="font-medium text-brand-700">Mock 演示模式</strong>。
            后端就绪后，修改 <code className="rounded bg-white/80 px-1 py-0.5 font-mono text-[11px]">src/api/infer.ts</code> 中{' '}
            <code className="rounded bg-white/80 px-1 py-0.5 font-mono text-[11px]">USE_MOCK = false</code>，
            并在 <code className="rounded bg-white/80 px-1 py-0.5 font-mono text-[11px]">vite.config.ts</code> 启用{' '}
            <code className="rounded bg-white/80 px-1 py-0.5 font-mono text-[11px]">/api</code> 代理至 FastAPI 服务。
          </p>
          <ul className="mt-2 space-y-1 text-[11px] text-muted">
            <li>· POST <code className="font-mono">/api/infer</code> — 主推理接口</li>
            <li>· GET <code className="font-mono">/api/health</code> — 健康检查（可选）</li>
            <li>· GET <code className="font-mono">/api/samples</code> — 预置示例图（可选）</li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
