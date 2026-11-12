/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** [BACKEND] 推理 API 根地址，例如 http://127.0.0.1:8000 */
  readonly VITE_API_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
