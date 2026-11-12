# RCSR Demo Frontend

风险校准选择性真实超分（RCSR）的前端演示页面。

项目整体结构见根目录 `README.md`：

```
FYP 2/
├── frontend/     ← 本目录
├── backend/      ← FastAPI 推理服务
├── models/       ← D/G 权重与第三方仓库
└── data/         ← 实验数据
```

## 两种打开方式

### 方式一：直接打开（推荐，无需安装任何工具）

**双击 `index.html`** 即可在浏览器中查看完整界面与 Mock 交互。

> 若样式未加载，请确保 `assets/style.css` 和 `assets/app.js` 与 `index.html` 在同一目录结构下。

### 方式二：Vite 开发模式（需 Node.js 18+）

```bash
cd frontend
npm install
npm run dev
```

使用 React 版源码（`src/`），入口为 `index.vite.html`。

## 后端接入

修改 `assets/app.js` 中的 `runInference()` 函数，将 Mock 逻辑替换为：

```javascript
const form = new FormData();
form.append('image', file);
form.append('alpha', alpha);
const res = await fetch('http://127.0.0.1:8000/api/infer', { method: 'POST', body: form });
```

React 版接入点：`src/api/infer.ts`（设 `USE_MOCK = false`）。

## 目录结构

```
frontend/
  index.html          ← 双击打开的主页面（纯 HTML/CSS/JS）
  assets/
    style.css         ← 样式
    app.js            ← 交互 + Mock 推理 + [BACKEND] 接入点
  src/                ← React 版（可选，需 Node）
  index.vite.html     ← Vite 开发入口
```
