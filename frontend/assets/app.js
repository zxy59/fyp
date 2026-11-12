/**
 * RCSR Demo — 静态前端
 */

(function () {
  'use strict';

  const TAU = { 0.01: 0.22, 0.03: 0.35, 0.05: 0.48, 0.10: 0.62 };
  const COVERAGE = { 0.01: 0.41, 0.03: 0.58, 0.05: 0.71, 0.10: 0.84 };

  const I18N = {
    zh: {
      'doc.title': 'RCSR · 图像超分',
      'brand.sub': '选择性图像超分',
      'brand.tagFused': 'RCSR 融合',
      'health.connecting': '连接中…',
      'health.okRcsr': '已连接 · RCSR',
      'health.okDg': '已连接 · D/G',
      'health.partial': '部分可用',
      'health.notReady': '未就绪',
      'health.offline': '未连接',
      'upload.title': '输入',
      'upload.heading': '上传图片',
      'upload.hint': '拖拽或点击 · JPG / PNG',
      'coverage.title': 'G 覆盖率',
      'coverage.hint': 'Router 选用 OSEDiff 的 patch 比例 · 默认 5%',
      'coverage.note': '先上传推理；切换挡位会复用 D/G，只重跑融合',
      'fx.title': '效果增强',
      'fx.choose': '选择图片',
      'fx.preview': '预览',
      'fx.zoom': '放大查看',
      'fx.zoomAria': '点击放大预览',
      'fx.enhance': '显示增强',
      'fx.enhanceHint': '拖动滑块连续调整 Gamma、Contrast 与 CLAHE',
      'fx.off': '关闭',
      'fx.gamma': 'Gamma',
      'fx.contrast': 'Contrast',
      'fx.clahe': 'CLAHE',
      'fx.feather': '融合边缘羽化',
      'fx.featherHint': '软化 32px 拼接缝 · 0% 为硬拼接',
      'fx.featherNote': '羽化只写入预览与「用户优化」对比，不改主结果卡。',
      'fx.featherOn': '羽化 {n}% 只写入预览与「用户优化」对比，不改主结果卡。',
      'fx.reset': '重置',
      'fx.downloadRaw': '下载原图',
      'fx.downloadAdj': '下载调整后',
      'fx.clickPreview': '点击预览图或「放大查看」',
      'fx.onlyFused': '显示增强与羽化仅作用于融合图 · 点击预览图或「放大查看」',
      'fx.noOpt': '未优化，预览为原始融合',
      'fx.enhancePrefix': '增强',
      'fx.featherPrefix': '羽化',
      'common.needInfer': '请先完成推理',
      'common.cancel': '取消',
      'out.title': '输出结果',
      'out.desc': '原图 · Real-ESRGAN · OSEDiff · RCSR 融合',
      'card.lr': '原图',
      'card.lrSub': '输入 LR',
      'card.d': '全 D',
      'card.g': '全 G',
      'card.fused': '融合 ŷ',
      'card.waitRouter': '等待 Router',
      'card.output': '输出',
      'card.processing': '处理中…',
      'card.zoom': '点击放大',
      'card.noFused': '未返回融合图',
      'card.waitUpload': '等待上传',
      'card.download': '下载',
      'lat.total': '合计',
      'compare.title': '滑动对比',
      'compare.emptyDesc': '左右各选一路输出，拖动中线查看差异',
      'compare.empty': '上传图片后开始对比',
      'compare.unavailable': '当前模式暂无可用图片',
      'compare.desc': '原始融合不变；用户优化图为增强与羽化后的预览',
      'compare.label': '对比',
      'compare.left': '左侧',
      'compare.right': '右侧',
      'layer.optimizedFull': '用户优化融合',
      'compare.loading': '加载对比图…',
      'compare.fail': '加载失败',
      'compare.lrFused': '原图 ↔ RCSR 融合',
      'compare.dFused': 'Real-ESRGAN ↔ RCSR 融合',
      'compare.gFused': 'OSEDiff ↔ RCSR 融合',
      'compare.optFused': '用户优化 ↔ RCSR 融合',
      'compare.optD': '用户优化 ↔ Real-ESRGAN',
      'compare.optG': '用户优化 ↔ OSEDiff',
      'layer.lr': '原图',
      'layer.d': 'Real-ESRGAN',
      'layer.g': 'OSEDiff',
      'layer.fused': 'RCSR',
      'layer.optimized': '用户优化',
      'layer.lrFull': '原图 (LR)',
      'layer.dFull': 'Real-ESRGAN (D)',
      'layer.gFull': 'OSEDiff (G)',
      'layer.fusedFull': 'RCSR 融合',
      'spot.on': '同位置放大：开',
      'spot.off': '同位置放大：关',
      'spot.sameSize': '与上方对比同尺寸 · {name}',
      'spot.navTitle': '定位预览',
      'spot.expand': '放大定位',
      'spot.navHint': '小图：移动预览，单击确认 · 精确定位请点「放大定位」',
      'spot.magTitle': '同位置对比',
      'spot.magSub': '与上方滑动对比使用相同两路输出',
      'spot.left': '左图',
      'spot.right': '右图',
      'spot.toolbarHint': '移动预览、单击确认；精确定位请放大',
      'spot.zoom': '放大倍数',
      'spot.fsTitle': '放大定位',
      'spot.fsSub': '先移动鼠标选点，在图上单击固定位置；调整倍数后点「确认位置」',
      'spot.fsHint': '100% 与上方对比同尺度，可继续调大放大倍数',
      'spot.confirm': '确认位置',
      'infer.working': '处理中…',
      'infer.refusing': '按 {cov} 重融合…',
      'infer.refusingFx': '按 {cov} 重融合并生成优化预览…',
      'infer.doneReuse': '融合完成 · {cov} · {time}',
      'infer.done': '完成 · {cov} · {time}',
      'time.sec': '秒',
      'err.fetch': '无法连接后端：请先运行 backend/run.py；若终端出现 CUDA 报错，修复后需重启后端再试。',
      'tip.off': '关闭全部显示增强，预览回到原始融合',
      'tip.gamma': 'Gamma：Gamma correction（伽马校正），范围 0.50–2.00；小于 1 提亮中间调，1.00 为原图。向右拖更亮',
      'tip.contrast': 'Contrast：以中灰为中心的全局对比度拉伸，范围 0.50–1.50；1.00 为原图',
      'tip.clahe': 'CLAHE：Contrast Limited Adaptive Histogram Equalization（对比度受限的自适应直方图均衡），混合强度 0–1；0 为关闭，0.125 为原开关档',
      'tip.feather0': '硬拼接，边界无过渡',
      'tip.feather25': '轻度软化 D/G 拼缝',
      'tip.feather50': '中等边界过渡',
      'tip.feather75': '较强软混合，G 会略渗入邻块',
      'tip.feather100': '最强过渡：约 32px 软混合，覆盖一整块 patch 边界',
    },
    en: {
      'doc.title': 'RCSR · Super-Resolution',
      'brand.sub': 'Selective image super-resolution',
      'brand.tagFused': 'RCSR fusion',
      'health.connecting': 'Connecting…',
      'health.okRcsr': 'Connected · RCSR',
      'health.okDg': 'Connected · D/G',
      'health.partial': 'Partial',
      'health.notReady': 'Not ready',
      'health.offline': 'Offline',
      'upload.title': 'Input',
      'upload.heading': 'Upload image',
      'upload.hint': 'Drop or click · JPG / PNG',
      'coverage.title': 'G coverage',
      'coverage.hint': 'Share of patches routed to OSEDiff · default 5%',
      'coverage.note': 'Run inference first. Switching gears reuses D/G and only re-fuses.',
      'fx.title': 'Display effects',
      'fx.choose': 'Choose image',
      'fx.preview': 'Preview',
      'fx.zoom': 'View larger',
      'fx.zoomAria': 'Open preview',
      'fx.enhance': 'Display enhancement',
      'fx.enhanceHint': 'Drag sliders for Gamma, Contrast, and CLAHE',
      'fx.off': 'Off',
      'fx.gamma': 'Gamma',
      'fx.contrast': 'Contrast',
      'fx.clahe': 'CLAHE',
      'fx.feather': 'Edge feathering',
      'fx.featherHint': 'Soften 32px splice seams · 0% is a hard cut',
      'fx.featherNote': 'Feathering only appears in preview and “Optimized” compare, not the main cards.',
      'fx.featherOn': 'Feather {n}% is preview / Optimized-compare only; main cards stay hard-spliced.',
      'fx.reset': 'Reset',
      'fx.downloadRaw': 'Download original',
      'fx.downloadAdj': 'Download adjusted',
      'fx.clickPreview': 'Click the preview or “View larger”',
      'fx.onlyFused': 'Enhancement and feathering apply to the fused image only · click preview or “View larger”',
      'fx.noOpt': 'No effects; preview is the original fusion',
      'fx.enhancePrefix': 'Enhance',
      'fx.featherPrefix': 'Feather',
      'common.needInfer': 'Run inference first',
      'common.cancel': 'Cancel',
      'out.title': 'Outputs',
      'out.desc': 'Input · Real-ESRGAN · OSEDiff · RCSR fusion',
      'card.lr': 'Input',
      'card.lrSub': 'LR input',
      'card.d': 'All D',
      'card.g': 'All G',
      'card.fused': 'Fused ŷ',
      'card.waitRouter': 'Waiting for Router',
      'card.output': 'Output',
      'card.processing': 'Processing…',
      'card.zoom': 'Click to enlarge',
      'card.noFused': 'No fused image returned',
      'card.waitUpload': 'Waiting for upload',
      'card.download': 'Download',
      'lat.total': 'Total',
      'compare.title': 'Slider compare',
      'compare.emptyDesc': 'Choose a different output on each side, then drag the divider',
      'compare.empty': 'Upload an image to compare',
      'compare.unavailable': 'No images for this pair',
      'compare.desc': 'Raw fusion stays unchanged; Optimized is the enhanced / feathered preview',
      'compare.label': 'Pair',
      'compare.left': 'Left',
      'compare.right': 'Right',
      'layer.optimizedFull': 'Optimized fusion',
      'compare.loading': 'Loading compare…',
      'compare.fail': 'Failed to load',
      'compare.lrFused': 'Input ↔ RCSR fusion',
      'compare.dFused': 'Real-ESRGAN ↔ RCSR fusion',
      'compare.gFused': 'OSEDiff ↔ RCSR fusion',
      'compare.optFused': 'Optimized ↔ RCSR fusion',
      'compare.optD': 'Optimized ↔ Real-ESRGAN',
      'compare.optG': 'Optimized ↔ OSEDiff',
      'layer.lr': 'Input',
      'layer.d': 'Real-ESRGAN',
      'layer.g': 'OSEDiff',
      'layer.fused': 'RCSR',
      'layer.optimized': 'Optimized',
      'layer.lrFull': 'Input (LR)',
      'layer.dFull': 'Real-ESRGAN (D)',
      'layer.gFull': 'OSEDiff (G)',
      'layer.fusedFull': 'RCSR fusion',
      'spot.on': 'Linked zoom: on',
      'spot.off': 'Linked zoom: off',
      'spot.sameSize': 'Same scale as slider · {name}',
      'spot.navTitle': 'Locate',
      'spot.expand': 'Precise locate',
      'spot.navHint': 'Move to preview, click to lock · use Precise locate for accuracy',
      'spot.magTitle': 'Same-spot compare',
      'spot.magSub': 'Uses the same two outputs as the slider',
      'spot.left': 'Left',
      'spot.right': 'Right',
      'spot.toolbarHint': 'Move to preview, click to lock; enlarge for precision',
      'spot.zoom': 'Zoom',
      'spot.fsTitle': 'Precise locate',
      'spot.fsSub': 'Move to pick a point, click to lock; then confirm after setting zoom',
      'spot.fsHint': '100% matches the slider scale; you can zoom in further',
      'spot.confirm': 'Confirm location',
      'infer.working': 'Processing…',
      'infer.refusing': 'Re-fusing at {cov}…',
      'infer.refusingFx': 'Re-fusing at {cov} and building optimized preview…',
      'infer.doneReuse': 'Fused · {cov} · {time}',
      'infer.done': 'Done · {cov} · {time}',
      'time.sec': 's',
      'err.fetch': 'Cannot reach the backend. Start backend/run.py first. If you see a CUDA error, restart the server after fixing it.',
      'tip.off': 'Turn off all display enhancement; preview returns to the raw fusion',
      'tip.gamma': 'Gamma: Gamma correction（伽马校正）. Range 0.50–2.00; below 1 brightens midtones, 1.00 is original. Drag right to brighten',
      'tip.contrast': 'Contrast: global stretch around mid-gray. Range 0.50–1.50; 1.00 is original',
      'tip.clahe': 'CLAHE: Contrast Limited Adaptive Histogram Equalization mix 0–1; 0 is off, 0.125 is the old toggle-on preset',
      'tip.feather0': 'Hard splice, no edge blend',
      'tip.feather25': 'Light softening of D/G seams',
      'tip.feather50': 'Medium edge transition',
      'tip.feather75': 'Stronger blend; G may leak into neighboring patches',
      'tip.feather100': 'Strongest blend: about 32px, a full patch-width along seams',
    },
  };

  const COMPARE_LAYER_IDS = ['lr', 'd', 'g', 'fused', 'optimized'];

  const EMPTY_ICON = `<svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`;

  const USE_MOCK = false;
  const API_BASE = (location.protocol === 'http:' || location.protocol === 'https:')
    ? ''
    : 'http://127.0.0.1:8000';

  const DEFAULT_ALPHA = 0.03;
  const DEFAULT_COVERAGE = 0.05;
  const COVERAGE_LEVELS = [0.01, 0.05, 0.10];
  const FEATHER_LEVELS = [0, 0.25, 0.50, 0.75, 1];
  const GAMMA_IDLE = 1;
  const CONTRAST_IDLE = 1;
  const CLAHE_IDLE = 0;

  let state = {
    alpha: DEFAULT_ALPHA,
    coverage: DEFAULT_COVERAGE,
    loading: false,
    currentFile: null,
    result: null,
    comparePct: 50,
    compareLeft: 'lr',
    compareRight: 'fused',
    comparePair: null,
    previewItems: [],
    previewIndex: 0,
    compareSpotMode: false,
    spotDisplayZoom: 100,
    compareSpotPoint: null,
    spotNavHoverPoint: null,
    navPickerOpen: false,
    spotFsFollow: true,
    spotFsFreezeFollow: false,
    compareCleanup: null,
    compareImages: null,
    gamma: GAMMA_IDLE,
    contrast: CONTRAST_IDLE,
    clahe: CLAHE_IDLE,
    feather: 0,
    lang: localStorage.getItem('rcsr-lang') === 'zh' ? 'zh' : 'en',
    healthKey: 'health.connecting',
  };

  const SPOT_PATCH = 168;

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function t(key, vars) {
    const table = I18N[state.lang] || I18N.zh;
    let s = table[key] || I18N.zh[key] || key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        s = s.split(`{${k}}`).join(String(vars[k]));
      });
    }
    return s;
  }

  function compareLayerLabel(id) {
    if (id === 'optimized') return t('layer.optimizedFull');
    if (id === 'fused') return t('layer.fusedFull');
    if (id === 'lr') return t('layer.lrFull');
    if (id === 'd') return t('layer.dFull');
    if (id === 'g') return t('layer.gFull');
    return layerLabel(id);
  }

  function availableCompareLayers(result) {
    return COMPARE_LAYER_IDS.filter((id) => {
      if (id === 'optimized') return !!(result && (result.fused || result.fusedOptimized));
      return !!getResultLayer(result, id);
    });
  }

  function pickOtherCompareLayer(result, lockedId, preferred) {
    const ids = availableCompareLayers(result).filter((id) => id !== lockedId);
    if (!ids.length) return null;
    if (preferred && ids.includes(preferred)) return preferred;
    return ids[0];
  }

  function adjustLayerMeta() {
    return [
      { id: 'lr', label: t('layer.lrFull') },
      { id: 'd', label: t('layer.dFull') },
      { id: 'g', label: t('layer.gFull') },
      { id: 'fused', label: t('layer.fusedFull') },
    ];
  }

  function layerLabel(id) {
    return t(`layer.${id}`) || id;
  }

  function applyI18n() {
    document.documentElement.lang = state.lang === 'en' ? 'en' : 'zh-CN';
    document.title = t('doc.title');
    $$('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    $$('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });
    $$('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === state.lang);
    });
  }

  function setLang(next) {
    if (next !== 'en' && next !== 'zh') return;
    if (next === state.lang) return;
    state.lang = next;
    localStorage.setItem('rcsr-lang', next);
    applyI18n();
    syncEnhanceUi();
    syncFeatherUi();
    syncAdjustPanel(state.result);
    renderResults(state.result);
    renderCompare(state.result);
    renderLatencyStrip(state.result);
    applyHealthBadgeText();
  }

  const els = {
    fileInput: $('#file-input'),
    uploadZone: $('#upload-zone'),
    errorBox: $('#error-box'),
    toolbarInfo: $('#toolbar-info'),
    resultGrid: $('#result-grid'),
    compareSection: $('#compare-section'),
    latencyStrip: $('#latency-strip'),
    lightbox: $('#lightbox'),
    lightboxImg: $('#lightbox-img'),
    lightboxTitle: $('#lightbox-title'),
    lightboxSub: $('#lightbox-sub'),
    lightboxCounter: $('#lightbox-counter'),
    lightboxPrev: $('#lightbox-prev'),
    lightboxNext: $('#lightbox-next'),
    lightboxDownload: $('#lightbox-download'),
    adjustLayer: $('#adjust-layer'),
    adjustPreview: $('#adjust-preview'),
    adjustPreviewOpen: $('#adjust-preview-open'),
    adjustPreviewZoom: $('#adjust-preview-zoom'),
    adjustPreviewHint: $('#adjust-preview-hint'),
    enhanceGamma: $('#enhance-gamma'),
    enhanceGammaVal: $('#enhance-gamma-val'),
    enhanceContrast: $('#enhance-contrast'),
    enhanceContrastVal: $('#enhance-contrast-val'),
    enhanceClahe: $('#enhance-clahe'),
    enhanceClaheVal: $('#enhance-clahe-val'),
    featherHint: $('#feather-hint'),
    adjustReset: $('#adjust-reset'),
    adjustDownloadRaw: $('#adjust-download-raw'),
    adjustDownload: $('#adjust-download'),
    coveragePanel: $('#coverage-panel'),
    coverageHint: $('#coverage-hint'),
  };

  function init() {
    applyI18n();
    bindLangSwitch();
    bindTips();
    renderResults(null);
    renderCompare(null);
    renderLatencyStrip(null);
    syncAdjustPanel(null);
    bindEvents();
    bindLightbox();
    bindSpotFullscreen();
    bindAdjustPanel();
    bindCoveragePanel();
    if (!USE_MOCK) checkBackendHealth();
  }

  function bindLangSwitch() {
    $$('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
  }

  function bindTips() {
    const tip = $('#float-tip');
    if (!tip) return;
    const hide = () => { tip.hidden = true; };
    const show = (el) => {
      const text = el.dataset.tipKey ? t(el.dataset.tipKey) : el.dataset.tip;
      if (!text) return;
      tip.textContent = text;
      tip.hidden = false;
      const r = el.getBoundingClientRect();
      const tw = tip.offsetWidth;
      const th = tip.offsetHeight;
      let left = r.left + r.width / 2 - tw / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - tw - 8));
      let top = r.top - th - 8;
      if (top < 8) top = r.bottom + 8;
      tip.style.left = `${left}px`;
      tip.style.top = `${top}px`;
    };
    document.addEventListener('mouseover', (e) => {
      const el = e.target.closest('[data-tip-key], [data-tip]');
      if (el) show(el);
    });
    document.addEventListener('mouseout', (e) => {
      const el = e.target.closest('[data-tip-key], [data-tip]');
      if (!el) return;
      const next = e.relatedTarget;
      if (next && el.contains(next)) return;
      hide();
    });
    window.addEventListener('scroll', hide, true);
  }

  function coverageLabel(value) {
    return `${Math.round((value ?? DEFAULT_COVERAGE) * 100)}%`;
  }

  function syncCoverageButtons() {
    $$('.coverage-btn').forEach((btn) => {
      const v = parseFloat(btn.dataset.coverage);
      btn.classList.toggle('active', Math.abs(v - state.coverage) < 1e-6);
    });
  }

  function bindCoveragePanel() {
    $$('.coverage-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = parseFloat(btn.dataset.coverage);
        if (!COVERAGE_LEVELS.includes(next) || next === state.coverage) return;
        state.coverage = next;
        syncCoverageButtons();
        if (state.currentFile && state.result && !state.loading) {
          handleInfer(state.currentFile, state.alpha, { reuseExperts: true });
        }
      });
    });
    syncCoverageButtons();
  }

  function downloadDataUrl(dataUrl, filename) {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    a.rel = 'noopener';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function safeFilename(name) {
    return (name || 'image').replace(/[\\/:*?"<>|]/g, '_').replace(/\s+/g, '_');
  }

  function getLayerSrc(result, layerId) {
    if (!result) return null;
    switch (layerId) {
      case 'lr': return result.lr;
      case 'd': return result.dOutput;
      case 'g': return result.gOutput;
      case 'fused': return result.fused || null;
      case 'mask': return result.mask;
      case 'score': return result.scoreMap;
      default: return null;
    }
  }

  function nearIdle(value, idle) {
    return Math.abs(Number(value) - idle) < 1e-6;
  }

  function enhancementActive() {
    return !nearIdle(state.gamma, GAMMA_IDLE) || !nearIdle(state.contrast, CONTRAST_IDLE) || !nearIdle(state.clahe, CLAHE_IDLE);
  }

  function effectActive() {
    return enhancementActive() || state.feather > 0;
  }

  function getOptimizedSrc(result) {
    if (!result) return null;
    return result.fusedOptimized || result.fused || null;
  }

  function getAdjustedSrc(result, layerId) {
    if (!result) return null;
    if (layerId === 'fused') return getOptimizedSrc(result);
    return getLayerSrc(result, layerId);
  }

  function effectCaption() {
    const parts = [];
    if (enhancementActive()) {
      const bits = [];
      if (!nearIdle(state.gamma, GAMMA_IDLE)) bits.push(`${t('fx.gamma')} ${Number(state.gamma).toFixed(2)}`);
      if (!nearIdle(state.contrast, CONTRAST_IDLE)) bits.push(`${t('fx.contrast')} ${Number(state.contrast).toFixed(2)}`);
      if (!nearIdle(state.clahe, CLAHE_IDLE)) bits.push(`${t('fx.clahe')} ${Number(state.clahe).toFixed(3)}`);
      parts.push(`${t('fx.enhancePrefix')} ${bits.join(', ')}`);
    }
    if (state.feather > 0) parts.push(`${t('fx.featherPrefix')} ${Math.round(state.feather * 100)}%`);
    return parts.length ? parts.join(' · ') : t('fx.noOpt');
  }

  function buildPreviewCanvas(fullSize) {
    if (!state.adjustSourceImg) return null;
    const img = state.adjustSourceImg;
    const out = document.createElement('canvas');
    const maxSide = fullSize ? Math.max(img.width, img.height) : 1024;
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    out.width = Math.max(1, Math.round(img.width * scale));
    out.height = Math.max(1, Math.round(img.height * scale));
    const ctx = out.getContext('2d');
    ctx.drawImage(img, 0, 0, out.width, out.height);
    return out;
  }

  function openAdjustPreviewLightbox() {
    const src = getAdjustedSrc(state.result, els.adjustLayer.value);
    if (!src) return;
    const meta = adjustLayerMeta().find((m) => m.id === els.adjustLayer.value);
    openLightboxWithImage(src, meta?.label || '预览', effectCaption());
  }

  function openLightboxWithImage(src, title, sub) {
    state.previewItems = [{ src, title, sub }];
    state.previewIndex = 0;
    updateLightbox();
    els.lightbox.hidden = false;
    els.lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    els.lightboxPrev.disabled = true;
    els.lightboxNext.disabled = true;
    els.lightboxCounter.textContent = '1 / 1';
  }

  function drawAdjustedPreview() {
    const layerId = els.adjustLayer.value;
    const src = getAdjustedSrc(state.result, layerId);
    const img = state.adjustSourceImg;
    const hint = els.adjustPreviewHint;
    if (!src || !img || !img.complete) {
      if (hint) hint.textContent = t('common.needInfer');
      const pctx = els.adjustPreview.getContext('2d');
      pctx.clearRect(0, 0, els.adjustPreview.width, els.adjustPreview.height);
      return;
    }
    if (hint) {
      hint.textContent = layerId === 'fused'
        ? `${effectCaption()} · ${t('fx.clickPreview')}`
        : t('fx.onlyFused');
    }
    const preview = els.adjustPreview;
    const pctx = preview.getContext('2d');
    const side = preview.width;
    const sideH = preview.height;
    pctx.clearRect(0, 0, side, sideH);
    pctx.fillStyle = '#eef2f7';
    pctx.fillRect(0, 0, side, sideH);
    const tmp = buildPreviewCanvas(false);
    if (!tmp) return;
    const scale = Math.min(side / tmp.width, sideH / tmp.height);
    const dw = tmp.width * scale;
    const dh = tmp.height * scale;
    pctx.drawImage(tmp, (side - dw) / 2, (side - dh) / 2, dw, dh);
  }

  async function loadAdjustSource(layerId) {
    const src = getAdjustedSrc(state.result, layerId);
    if (!src) {
      state.adjustSourceImg = null;
      drawAdjustedPreview();
      return;
    }
    state.adjustSourceImg = await loadImageFromUrl(src);
    drawAdjustedPreview();
  }

  function setAdjustControlsEnabled(on) {
    [
      els.adjustLayer, els.adjustReset, els.adjustDownloadRaw, els.adjustDownload,
      els.adjustPreviewOpen, els.adjustPreviewZoom,
    ].forEach((el) => { if (el) el.disabled = !on; });
  }

  function syncEnhanceUi() {
    if (els.enhanceGamma) els.enhanceGamma.value = String(state.gamma);
    if (els.enhanceContrast) els.enhanceContrast.value = String(state.contrast);
    if (els.enhanceClahe) els.enhanceClahe.value = String(state.clahe);
    if (els.enhanceGammaVal) els.enhanceGammaVal.textContent = Number(state.gamma).toFixed(2);
    if (els.enhanceContrastVal) els.enhanceContrastVal.textContent = Number(state.contrast).toFixed(2);
    if (els.enhanceClaheVal) els.enhanceClaheVal.textContent = Number(state.clahe).toFixed(3);
  }

  function syncFeatherUi() {
    $$('.feather-btn').forEach((btn) => {
      const v = parseFloat(btn.dataset.feather);
      btn.classList.toggle('active', Math.abs(v - state.feather) < 1e-6);
    });
    if (els.featherHint) {
      els.featherHint.textContent = state.feather > 0
        ? t('fx.featherOn', { n: Math.round(state.feather * 100) })
        : t('fx.featherNote');
    }
  }

  function resetEffectSettings() {
    state.gamma = GAMMA_IDLE;
    state.contrast = CONTRAST_IDLE;
    state.clahe = CLAHE_IDLE;
    state.feather = 0;
    syncEnhanceUi();
    syncFeatherUi();
  }

  let enhanceTimer = null;

  function scheduleEffectRefresh(immediate) {
    if (enhanceTimer) {
      clearTimeout(enhanceTimer);
      enhanceTimer = null;
    }
    if (immediate) {
      requestEffectRefresh();
      return;
    }
    enhanceTimer = setTimeout(() => {
      enhanceTimer = null;
      requestEffectRefresh();
    }, 350);
  }

  function requestEffectRefresh() {
    if (state.currentFile && state.result && !state.loading) {
      handleInfer(state.currentFile, state.alpha, { reuseExperts: true });
    }
  }

  function syncAdjustPanel(result) {
    if (!els.adjustLayer) return;
    syncEnhanceUi();
    syncFeatherUi();
    if (!result) {
      els.adjustLayer.innerHTML = `<option value="">${t('common.needInfer')}</option>`;
      setAdjustControlsEnabled(false);
      state.adjustSourceImg = null;
      if (els.adjustPreviewHint) els.adjustPreviewHint.textContent = t('common.needInfer');
      const pctx = els.adjustPreview.getContext('2d');
      pctx.clearRect(0, 0, els.adjustPreview.width, els.adjustPreview.height);
      return;
    }
    const prev = els.adjustLayer.value;
    const options = adjustLayerMeta().filter((m) => getLayerSrc(result, m.id));
    els.adjustLayer.innerHTML = options.map((m) => `<option value="${m.id}">${m.label}</option>`).join('');
    setAdjustControlsEnabled(options.length > 0);
    if (options.length) {
      const keep = options.some((m) => m.id === prev) ? prev : (options.find((m) => m.id === 'fused') || options[0]).id;
      els.adjustLayer.value = keep;
      loadAdjustSource(keep);
    }
  }

  function bindAdjustPanel() {
    if (!els.adjustLayer) return;
    els.adjustLayer.addEventListener('change', () => {
      loadAdjustSource(els.adjustLayer.value);
    });
    const bindEnhanceSlider = (input, key, idle) => {
      if (!input) return;
      const onInput = () => {
        state[key] = Number(input.value);
        syncEnhanceUi();
        scheduleEffectRefresh(false);
      };
      const onChange = () => {
        state[key] = Number(input.value);
        syncEnhanceUi();
        scheduleEffectRefresh(true);
      };
      input.addEventListener('input', onInput);
      input.addEventListener('change', onChange);
    };
    bindEnhanceSlider(els.enhanceGamma, 'gamma', GAMMA_IDLE);
    bindEnhanceSlider(els.enhanceContrast, 'contrast', CONTRAST_IDLE);
    bindEnhanceSlider(els.enhanceClahe, 'clahe', CLAHE_IDLE);
    $$('.feather-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = parseFloat(btn.dataset.feather);
        if (!FEATHER_LEVELS.includes(next) || Math.abs(next - state.feather) < 1e-6) return;
        state.feather = next;
        syncFeatherUi();
        requestEffectRefresh();
      });
    });
    els.adjustReset.addEventListener('click', () => {
      const changed = effectActive();
      resetEffectSettings();
      if (changed) requestEffectRefresh();
      else loadAdjustSource(els.adjustLayer.value);
    });
    els.adjustDownloadRaw.addEventListener('click', () => {
      const layerId = els.adjustLayer.value;
      const meta = adjustLayerMeta().find((m) => m.id === layerId);
      const src = getLayerSrc(state.result, layerId);
      if (src) downloadDataUrl(src, safeFilename(`RCSR_${meta?.label || layerId}_original.png`));
    });
    els.adjustDownload.addEventListener('click', () => {
      const layerId = els.adjustLayer.value;
      const meta = adjustLayerMeta().find((m) => m.id === layerId);
      const src = getAdjustedSrc(state.result, layerId);
      if (!src) return;
      const suffix = effectActive() && layerId === 'fused' ? 'adjusted' : 'export';
      downloadDataUrl(src, safeFilename(`RCSR_${meta?.label || layerId}_${suffix}.png`));
    });
    els.adjustPreviewOpen?.addEventListener('click', () => openAdjustPreviewLightbox());
    els.adjustPreviewZoom?.addEventListener('click', () => openAdjustPreviewLightbox());
    syncEnhanceUi();
    syncFeatherUi();
  }

  function getElementViewScale(el, imgW, imgH) {
    if (!el || !imgW || !imgH) return 1;
    const rect = el.getBoundingClientRect();
    return Math.min(rect.width / imgW, rect.height / imgH);
  }

  function getCanvasViewScale(canvas, imgW, imgH) {
    if (!canvas || !imgW || !imgH) return 1;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 1) return canvas.width / imgW;
    return Math.min(rect.width / imgW, rect.height / imgH);
  }

  function imagePointToViewXY(px, py, container, imgW, imgH) {
    const rect = container.getBoundingClientRect();
    const scale = Math.min(rect.width / imgW, rect.height / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const ox = (rect.width - dw) / 2;
    const oy = (rect.height - dh) / 2;
    return { viewX: ox + px * scale, viewY: oy + py * scale };
  }

  function getImageDisplayRect(container, imgW, imgH) {
    const rect = container.getBoundingClientRect();
    const scale = Math.min(rect.width / imgW, rect.height / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const ox = (rect.width - dw) / 2;
    const oy = (rect.height - dh) / 2;
    return { ox, oy, dw, dh, scale };
  }

  function clampImagePointForBox(px, py, imgW, imgH, zoomPercent, viewScale) {
    const zmult = Math.max(1, (zoomPercent ?? 100) / 100);
    const patch = SPOT_PATCH / viewScale / zmult;
    const half = patch / 2;
    return {
      px: Math.max(half, Math.min(imgW - half, px)),
      py: Math.max(half, Math.min(imgH - half, py)),
    };
  }

  function syncSpotNavReticle(pt, navViewport, imgW, imgH, zoomPercent, reticleEl) {
    const reticle = reticleEl || $('#spot-nav-reticle');
    const box = reticle?.querySelector('.spot-nav-box');
    if (!reticle || !pt || !navViewport) {
      if (reticle) reticle.hidden = true;
      return;
    }
    const view = imagePointToViewXY(pt.px, pt.py, navViewport, imgW, imgH);
    const viewScale = getElementViewScale(navViewport, imgW, imgH);
    const zmult = Math.max(1, (zoomPercent ?? 100) / 100);
    const patch = SPOT_PATCH / viewScale / zmult;
    const boxCss = Math.max(12, Math.min(patch * viewScale, navViewport.clientWidth * 0.45));
    const rect = navViewport.getBoundingClientRect();
    const scale = Math.min(rect.width / imgW, rect.height / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const ox = (rect.width - dw) / 2;
    const oy = (rect.height - dh) / 2;
    const clampedX = Math.max(ox, Math.min(ox + dw, view.viewX));
    const clampedY = Math.max(oy, Math.min(oy + dh, view.viewY));
    reticle.hidden = false;
    reticle.style.left = `${clampedX}px`;
    reticle.style.top = `${clampedY}px`;
    if (box) {
      box.style.width = `${boxCss}px`;
      box.style.height = `${boxCss}px`;
    }
  }

  function syncSpotFsReticle(pt, navViewport, imgW, imgH, zoomPercent, reticleEl) {
    const reticle = reticleEl || $('#spot-nav-picker-reticle');
    const box = reticle?.querySelector('.spot-nav-box');
    if (!reticle || !pt || !navViewport) {
      if (reticle) reticle.hidden = true;
      return;
    }
    const { ox, oy, dw, dh, scale } = getImageDisplayRect(navViewport, imgW, imgH);
    const viewScale = scale > 0 ? scale : getElementViewScale(navViewport, imgW, imgH);
    const zmult = Math.max(1, (zoomPercent ?? 100) / 100);
    const patch = SPOT_PATCH / viewScale / zmult;
    const maxBox = Math.min(dw, dh) * 0.92;
    const boxCss = Math.max(12, Math.min(patch * viewScale, navViewport.clientWidth * 0.45, maxBox));
    const clampedImg = clampImagePointForBox(pt.px, pt.py, imgW, imgH, zoomPercent, viewScale);
    const view = imagePointToViewXY(clampedImg.px, clampedImg.py, navViewport, imgW, imgH);
    const half = boxCss / 2;
    let minX = ox + half;
    let maxX = ox + dw - half;
    let minY = oy + half;
    let maxY = oy + dh - half;
    if (maxX < minX) minX = maxX = ox + dw / 2;
    if (maxY < minY) minY = maxY = oy + dh / 2;
    const clampedX = Math.max(minX, Math.min(maxX, view.viewX));
    const clampedY = Math.max(minY, Math.min(maxY, view.viewY));
    reticle.hidden = false;
    reticle.style.left = `${clampedX}px`;
    reticle.style.top = `${clampedY}px`;
    if (box) {
      box.style.width = `${boxCss}px`;
      box.style.height = `${boxCss}px`;
    }
  }

  function pickImagePoint(clientX, clientY, container, imgW, imgH) {
    const pt = viewportToImagePoint(container, clientX, clientY, imgW, imgH);
    if (!pt) return null;
    return { px: pt.px, py: pt.py, nx: pt.nx, ny: pt.ny };
  }

  /** 全屏：指针在留白区时，投影到图片矩形上最近边界的点 */
  function pickFsViewportPoint(clientX, clientY, container, imgW, imgH) {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const scale = Math.min(rect.width / imgW, rect.height / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const ox = (rect.width - dw) / 2;
    const oy = (rect.height - dh) / 2;
    const vx = Math.max(ox, Math.min(ox + dw, x));
    const vy = Math.max(oy, Math.min(oy + dh, y));
    return {
      nx: dw > 0 ? (vx - ox) / dw : 0.5,
      ny: dh > 0 ? (vy - oy) / dh : 0.5,
      px: scale > 0 ? (vx - ox) / scale : imgW / 2,
      py: scale > 0 ? (vy - oy) / scale : imgH / 2,
    };
  }

  function applyFsSpotPoint(rawPt, container, imgW, imgH) {
    const viewScale = getElementViewScale(container, imgW, imgH);
    return {
      ...rawPt,
      ...clampImagePointForBox(rawPt.px, rawPt.py, imgW, imgH, state.spotDisplayZoom, viewScale),
    };
  }

  function confirmSpotPoint(pt) {
    if (!pt) return;
    state.compareSpotPoint = { px: pt.px, py: pt.py, nx: pt.nx, ny: pt.ny };
    state.spotNavHoverPoint = { ...state.compareSpotPoint };
    redrawAllSpotViews();
  }

  function previewNavSpotHover(clientX, clientY, container, imgW, imgH) {
    const pt = pickImagePoint(clientX, clientY, container, imgW, imgH);
    if (!pt) return;
    state.spotNavHoverPoint = pt;
    syncSpotNavReticle(pt, container, imgW, imgH, state.spotDisplayZoom);
  }

  function previewFsSpotHover(clientX, clientY, container, imgW, imgH, reticleEl) {
    if (state.spotFsFreezeFollow) return;
    const raw = pickFsViewportPoint(clientX, clientY, container, imgW, imgH);
    state.spotNavHoverPoint = applyFsSpotPoint(raw, container, imgW, imgH);
    syncSpotFsReticle(state.spotNavHoverPoint, container, imgW, imgH, state.spotDisplayZoom, reticleEl);
  }

  function setSpotFsPointFromClick(clientX, clientY, container, imgW, imgH, reticleEl) {
    const raw = pickFsViewportPoint(clientX, clientY, container, imgW, imgH);
    state.spotNavHoverPoint = applyFsSpotPoint(raw, container, imgW, imgH);
    state.spotFsFollow = false;
    syncSpotFsReticle(state.spotNavHoverPoint, container, imgW, imgH, state.spotDisplayZoom, reticleEl);
    redrawAllSpotViews();
  }

  function redrawAllSpotViews() {
    const imgs = state.compareImages;
    if (!imgs) return;
    const navVp = $('#spot-nav-viewport');
    const left = $('#spot-canvas-left');
    const right = $('#spot-canvas-right');
    const z = state.spotDisplayZoom;
    const displayPt = state.navPickerOpen
      ? state.spotNavHoverPoint
      : (state.compareSpotPoint || state.spotNavHoverPoint);
    if (displayPt && navVp) {
      syncSpotNavReticle(displayPt, navVp, imgs.w, imgs.h, z);
    }
    const pickerVp = $('#spot-nav-picker-viewport');
    const pickerReticle = $('#spot-nav-picker-reticle');
    const pickerPanel = $('#spot-nav-picker');
    if (pickerVp && state.navPickerOpen && state.spotNavHoverPoint) {
      syncSpotFsReticle(state.spotNavHoverPoint, pickerVp, imgs.w, imgs.h, z, pickerReticle);
    }
    const magPt = state.navPickerOpen
      ? (state.spotFsFollow ? state.compareSpotPoint : state.spotNavHoverPoint)
      : state.compareSpotPoint;
    if (!magPt) return;
    if (left) {
      drawSpotPatch(left, imgs.left, magPt.px, magPt.py, imgs.w, imgs.h, z, getCanvasViewScale(left, imgs.w, imgs.h));
    }
    if (right) {
      drawSpotPatch(right, imgs.right, magPt.px, magPt.py, imgs.w, imgs.h, z, getCanvasViewScale(right, imgs.w, imgs.h));
    }
  }

  function ensureDefaultSpotPoint(navViewport, imgW, imgH) {
    if (state.compareSpotPoint || !navViewport) return;
    const rect = navViewport.getBoundingClientRect();
    const pt = pickImagePoint(rect.left + rect.width / 2, rect.top + rect.height / 2, navViewport, imgW, imgH);
    if (pt) confirmSpotPoint(pt);
  }

  function openNavPickerPanel(pair) {
    const fs = $('#spot-nav-fullscreen');
    const pickerViewport = $('#spot-nav-picker-viewport');
    if (!fs || state.navPickerOpen) return;
    if (!pair?.left) return;
    state.navPickerOpen = true;
    state.spotFsFollow = true;
    state.spotFsFreezeFollow = false;
    fs.removeAttribute('hidden');
    fs.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    const pickerImg = $('#spot-nav-picker-img');
    if (pickerImg) pickerImg.src = pair.left;
    const pZoom = $('#spot-picker-zoom');
    const pZoomVal = $('#spot-picker-zoom-val');
    const tZoom = $('#spot-zoom');
    const tZoomVal = $('#spot-zoom-val');
    if (pZoom) pZoom.value = String(state.spotDisplayZoom);
    if (pZoomVal) pZoomVal.textContent = String(state.spotDisplayZoom);
    if (tZoom) tZoom.value = String(state.spotDisplayZoom);
    if (tZoomVal) tZoomVal.textContent = String(state.spotDisplayZoom);
    if (state.compareSpotPoint) {
      state.spotNavHoverPoint = applyFsSpotPoint(state.compareSpotPoint, pickerViewport, pair.w, pair.h);
    }
    requestAnimationFrame(() => {
      if (!state.spotNavHoverPoint && pickerViewport && pair) {
        const rect = pickerViewport.getBoundingClientRect();
        const raw = pickFsViewportPoint(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          pickerViewport,
          pair.w,
          pair.h,
        );
        state.spotNavHoverPoint = applyFsSpotPoint(raw, pickerViewport, pair.w, pair.h);
      } else if (state.spotNavHoverPoint && pickerViewport && pair) {
        state.spotNavHoverPoint = applyFsSpotPoint(state.spotNavHoverPoint, pickerViewport, pair.w, pair.h);
      }
      redrawAllSpotViews();
    });
  }

  function closeNavPickerPanel(apply) {
    if (!state.navPickerOpen) return;
    const fs = $('#spot-nav-fullscreen');
    if (apply && state.spotNavHoverPoint) confirmSpotPoint(state.spotNavHoverPoint);
    else if (state.compareSpotPoint) state.spotNavHoverPoint = { ...state.compareSpotPoint };
    state.navPickerOpen = false;
    state.spotFsFollow = true;
    if (fs) {
      fs.setAttribute('hidden', '');
      fs.setAttribute('aria-hidden', 'true');
    }
    if (els.lightbox.hidden) document.body.classList.remove('lightbox-open');
    redrawAllSpotViews();
  }

  function syncSpotZoomUi(value) {
    state.spotDisplayZoom = value;
    const s = String(value);
    ['#spot-zoom', '#spot-picker-zoom'].forEach((sel) => {
      const el = $(sel);
      if (el) el.value = s;
    });
    ['#spot-zoom-val', '#spot-picker-zoom-val'].forEach((sel) => {
      const el = $(sel);
      if (el) el.textContent = s;
    });
    redrawAllSpotViews();
  }

  function bindSpotFullscreen() {
    $$('[data-spot-fs-close]').forEach((el) => {
      el.addEventListener('click', () => closeNavPickerPanel(false));
    });
    $('#spot-nav-picker-confirm')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeNavPickerPanel(true);
    });
    $('#spot-nav-picker-cancel')?.addEventListener('click', (e) => {
      e.preventDefault();
      closeNavPickerPanel(false);
    });
    $('#spot-picker-zoom')?.addEventListener('input', (e) => {
      syncSpotZoomUi(parseInt(e.target.value, 10));
    });
    const fsDialog = document.querySelector('.spot-fs-dialog');
    const freezeFollow = () => { state.spotFsFreezeFollow = true; };
    const unfreezeFollow = () => { state.spotFsFreezeFollow = false; };
    fsDialog?.querySelector('.spot-fs-toolbar')?.addEventListener('pointerdown', freezeFollow);
    fsDialog?.querySelector('.spot-fs-actions')?.addEventListener('pointerdown', freezeFollow);
    window.addEventListener('pointerup', unfreezeFollow);
    window.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return;
      const fs = $('#spot-nav-fullscreen');
      if (fs && !fs.hidden) closeNavPickerPanel(false);
    });
  }

  function applyHealthBadgeText() {
    const badge = document.querySelector('.badge-status');
    if (!badge) return;
    badge.textContent = t(state.healthKey || 'health.connecting');
  }

  async function checkBackendHealth() {
    const badge = document.querySelector('.badge-status');
    if (!badge) return;
    try {
      const res = await fetch(`${API_BASE}/api/health`);
      if (!res.ok) throw new Error('health failed');
      const data = await res.json();
      const dOk = !!data.d_weights_ready;
      const gOk = !!data.g_weights_ready && !!data.g_code_ready;
      const rOk = !!data.router_ready;
      const ok = dOk && gOk;
      const partial = dOk || gOk;
      state.healthKey = ok ? (rOk ? 'health.okRcsr' : 'health.okDg') : (partial ? 'health.partial' : 'health.notReady');
      badge.style.background = ok ? '#ecfdf5' : partial ? '#fffbeb' : '#fef2f2';
      badge.style.color = ok ? '#059669' : partial ? '#d97706' : '#dc2626';
      badge.style.borderColor = ok ? '#a7f3d0' : partial ? '#fde68a' : '#fecaca';
    } catch {
      state.healthKey = 'health.offline';
      badge.style.background = '#fef2f2';
      badge.style.color = '#dc2626';
      badge.style.borderColor = '#fecaca';
    }
    applyHealthBadgeText();
  }

  function mapBackendResponse(raw, alpha) {
    const lat = raw.stats?.latency_ms || {};
    const risk = raw.stats?.risk || {};
    const dm = raw.stats?.d_model || {};
    return {
      lr: raw.lr,
      dOutput: raw.d_output,
      gOutput: raw.g_output,
      fused: raw.fused || null,
      fusedOptimized: raw.fused_optimized || raw.fused || null,
      mask: raw.mask || null,
      scoreMap: raw.score_map || null,
      risk: {
        coverage: risk.coverage ?? raw.stats?.coverage?.target ?? 0,
        targetCoverage: risk.target_coverage ?? raw.stats?.coverage?.target ?? 0,
        tau: risk.threshold_tau ?? risk.tau ?? 0,
        alpha: risk.alpha ?? alpha,
        violation: risk.violation_rate ?? risk.violation ?? 0,
      },
      latency: {
        d: lat.d ?? 0,
        g: lat.g ?? 0,
        router: lat.router ?? 0,
        fuse: lat.fuse ?? 0,
        total: lat.total ?? (lat.d || 0) + (lat.g || 0),
      },
      metrics: raw.stats?.metrics || null,
      dModel: dm,
      gModel: raw.stats?.g_model || {},
      stage: raw.stage,
    };
  }

  function bindEvents() {
    els.uploadZone.addEventListener('click', () => !state.loading && els.fileInput.click());
    els.fileInput.addEventListener('change', (e) => {
      const f = e.target.files[0];
      if (f) handleInfer(f);
    });

    els.uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!state.loading) els.uploadZone.classList.add('drag-over');
    });
    els.uploadZone.addEventListener('dragleave', () => els.uploadZone.classList.remove('drag-over'));
    els.uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      els.uploadZone.classList.remove('drag-over');
      const f = e.dataTransfer.files[0];
      if (f && f.type.startsWith('image/') && !state.loading) handleInfer(f);
    });

    els.resultGrid.addEventListener('click', (e) => {
      const dl = e.target.closest('.result-download-btn');
      if (dl) {
        e.preventDefault();
        e.stopPropagation();
        downloadDataUrl(dl.dataset.src, safeFilename(dl.dataset.filename || 'RCSR.png'));
        return;
      }
      const btn = e.target.closest('.result-preview-btn');
      if (!btn) return;
      openLightbox(parseInt(btn.dataset.index, 10));
    });
  }

  function bindLightbox() {
    if (!els.lightbox) return;

    els.lightbox.querySelectorAll('[data-close]').forEach((el) => {
      el.addEventListener('click', closeLightbox);
    });
    els.lightboxPrev?.addEventListener('click', () => stepLightbox(-1));
    els.lightboxNext?.addEventListener('click', () => stepLightbox(1));
    els.lightboxDownload?.addEventListener('click', () => {
      const item = state.previewItems[state.previewIndex];
      if (!item?.src) return;
      downloadDataUrl(item.src, safeFilename(`RCSR_${item.title}_${item.sub}.png`));
    });

    window.addEventListener('keydown', (e) => {
      if (els.lightbox.hidden) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') stepLightbox(-1);
      if (e.key === 'ArrowRight') stepLightbox(1);
    });
  }

  function openLightbox(index) {
    const items = state.previewItems;
    if (!items.length || index < 0 || index >= items.length) return;
    state.previewIndex = index;
    updateLightbox();
    els.lightbox.hidden = false;
    els.lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
  }

  function closeLightbox() {
    els.lightbox.hidden = true;
    els.lightbox.setAttribute('aria-hidden', 'true');
    if (!state.navPickerOpen) document.body.classList.remove('lightbox-open');
  }

  function stepLightbox(delta) {
    const items = state.previewItems;
    if (!items.length) return;
    state.previewIndex = (state.previewIndex + delta + items.length) % items.length;
    updateLightbox();
  }

  function updateLightbox() {
    const item = state.previewItems[state.previewIndex];
    if (!item) return;
    els.lightboxImg.src = item.src;
    els.lightboxImg.alt = item.title;
    els.lightboxTitle.textContent = item.title;
    els.lightboxSub.textContent = item.sub;
    els.lightboxCounter.textContent = `${state.previewIndex + 1} / ${state.previewItems.length}`;
    const single = state.previewItems.length <= 1;
    els.lightboxPrev.disabled = single;
    els.lightboxNext.disabled = single;
  }

  function setLoading(on) {
    state.loading = on;
    $$('.coverage-btn, .enhance-btn, .feather-btn').forEach((btn) => { btn.disabled = on; });
    [els.enhanceGamma, els.enhanceContrast, els.enhanceClahe].forEach((el) => { if (el) el.disabled = on; });
    if (els.uploadZone) els.uploadZone.classList.toggle('is-busy', on);
  }

  function showError(msg) {
    if (msg) {
      els.errorBox.hidden = false;
      els.errorBox.textContent = msg;
    } else {
      els.errorBox.hidden = true;
    }
  }

  function formatDuration(ms) {
    if (ms >= 1000) return `${(ms / 1000).toFixed(1)} ${t('time.sec')}`;
    return `${Math.round(ms)} ms`;
  }

  async function handleInfer(file, alpha, opts) {
    const reuseExperts = !!opts?.reuseExperts;
    state.currentFile = file;
    const a = alpha ?? state.alpha ?? DEFAULT_ALPHA;
    showError(null);
    setLoading(true);
    els.toolbarInfo.textContent = reuseExperts
      ? t(effectActive() ? 'infer.refusingFx' : 'infer.refusing', { cov: coverageLabel(state.coverage) })
      : t('infer.working');
    if (!reuseExperts) {
      renderLatencyStrip(null);
      renderResults(null, true);
    }

    try {
      const result = await runInference(file, a, { reuseExperts });
      state.result = result;
      const covTxt = coverageLabel(result.risk?.targetCoverage || state.coverage);
      els.toolbarInfo.textContent = reuseExperts
        ? t('infer.doneReuse', { cov: covTxt, time: formatDuration(result.latency.router || result.latency.total) })
        : t('infer.done', { cov: covTxt, time: formatDuration(result.latency.total) });
      renderResults(result);
      renderCompare(result);
      renderLatencyStrip(result);
      syncAdjustPanel(result);
    } catch (err) {
      let msg = err.message || '处理失败';
      if (msg === 'Failed to fetch' || msg.includes('NetworkError')) {
        msg = t('err.fetch');
      }
      showError(msg);
      state.result = null;
      els.toolbarInfo.textContent = '';
      renderResults(null);
      renderCompare(null);
      renderLatencyStrip(null);
      syncAdjustPanel(null);
    } finally {
      setLoading(false);
    }
  }

  function emptySlot(label) {
    return `<div class="empty-slot">${EMPTY_ICON}<span>${label}</span></div>`;
  }

  function renderResults(result, loading) {
    const cards = [
      { key: 'lr', title: t('card.lr'), sub: t('card.lrSub'), badge: null },
      { key: 'd', title: t('card.d'), sub: 'Real-ESRGAN', badge: 'D' },
      { key: 'g', title: t('card.g'), sub: 'OSEDiff', badge: 'G' },
    ];

    let fourth = {
      title: t('card.fused'),
      sub: result?.fused
        ? `RCSR · G ${coverageLabel(result.risk?.targetCoverage || state.coverage)}`
        : t('card.waitRouter'),
      src: result?.fused || null,
      highlight: true,
      badge: t('card.output'),
    };

    cards.push(fourth);

    const previewItems = [];
    const cardHtml = cards.map((c, index) => {
      let src = c.src;
      if (c.key === 'lr') src = result?.lr;
      if (c.key === 'd') src = result?.dOutput;
      if (c.key === 'g') src = result?.gOutput;

      let body;
      if (loading) {
        body = `<div class="loading-overlay"><div class="spinner"></div><span style="font-size:12px;color:var(--muted)">${t('card.processing')}</span></div>`;
      } else if (src) {
        previewItems.push({ src, title: c.title, sub: c.sub });
        const previewIndex = previewItems.length - 1;
        body = `
          <button type="button" class="result-preview-btn" data-index="${previewIndex}" aria-label="${t('fx.zoom')} ${c.title}">
            <img src="${src}" alt="${c.title}" />
            <span class="zoom-hint">${t('card.zoom')}</span>
          </button>`;
      } else {
        body = emptySlot(result && c.highlight ? t('card.noFused') : t('card.waitUpload'));
      }

      const badgeHtml = c.badge ? `<span class="result-badge">${c.badge}</span>` : '';
      const downloadHtml = src && !loading
        ? `<button type="button" class="btn btn-ghost btn-icon result-download-btn" title="${t('card.download')}" data-src="${src}" data-filename="RCSR_${safeFilename(c.title + '_' + c.sub)}.png">↓</button>`
        : '';

      return `
        <div class="result-card ${c.highlight ? 'highlight' : ''}">
          <div class="result-card-head">
            <div><h4>${c.title}</h4><p>${c.sub}</p></div>
            <div class="result-card-actions">${badgeHtml}${downloadHtml}</div>
          </div>
          <div class="result-img-wrap">${body}</div>
        </div>`;
    }).join('');

    state.previewItems = previewItems;
    els.resultGrid.innerHTML = cardHtml;
    if (!previewItems.length && !els.lightbox.hidden) closeLightbox();
  }

  function renderLatencyStrip(result) {
    if (!els.latencyStrip) return;
    if (!result) {
      els.latencyStrip.hidden = true;
      els.latencyStrip.innerHTML = '';
      return;
    }
    const lat = result.latency;
    const routerChip = (lat.router > 0 || lat.fuse > 0)
      ? `<div class="latency-chip">Router <strong>${formatDuration(lat.router || lat.fuse)}</strong></div>`
      : '';
    els.latencyStrip.hidden = false;
    els.latencyStrip.innerHTML = `
      <div class="latency-chip">Real-ESRGAN <strong>${formatDuration(lat.d)}</strong></div>
      <div class="latency-chip">OSEDiff <strong>${formatDuration(lat.g)}</strong></div>
      ${routerChip}
      <div class="latency-chip latency-chip-accent">${t('lat.total')} <strong>${formatDuration(lat.total)}</strong></div>
    `;
  }

  function getResultLayer(result, key) {
    if (!result) return null;
    switch (key) {
      case 'lr': return result.lr;
      case 'd': return result.dOutput;
      case 'g': return result.gOutput;
      case 'fused': return result.fused || null;
      case 'optimized': return result.fusedOptimized || result.fused || null;
      default: return null;
    }
  }

  function getComparePairKeys() {
    return { left: state.compareLeft, right: state.compareRight };
  }

  async function normalizeComparePair(leftSrc, rightSrc) {
    const [leftImg, rightImg] = await Promise.all([
      loadImageFromUrl(leftSrc),
      loadImageFromUrl(rightSrc),
    ]);
    const w = Math.max(leftImg.width, rightImg.width);
    const h = Math.max(leftImg.height, rightImg.height);

    function drawContained(img) {
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);
      const scale = Math.min(w / img.width, h / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
      return canvas.toDataURL('image/jpeg', 0.92);
    }

    return {
      left: drawContained(leftImg),
      right: drawContained(rightImg),
      w,
      h,
      leftRaw: leftImg,
      rightRaw: rightImg,
    };
  }

  function cleanupCompareListeners() {
    if (typeof state.compareCleanup === 'function') {
      state.compareCleanup();
      state.compareCleanup = null;
    }
  }

  function viewportToImagePoint(viewport, clientX, clientY, imgW, imgH) {
    const rect = viewport.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const scale = Math.min(rect.width / imgW, rect.height / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    const ox = (rect.width - dw) / 2;
    const oy = (rect.height - dh) / 2;
    if (x < ox || y < oy || x > ox + dw || y > oy + dh) return null;
    return {
      nx: (x - ox) / dw,
      ny: (y - oy) / dh,
      px: (x - ox) / scale,
      py: (y - oy) / scale,
      viewX: x,
      viewY: y,
    };
  }

  function drawSpotPatch(canvas, img, px, py, imgW, imgH, zoomPercent, viewScale) {
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, size, size);
    if (!img || !img.complete || !img.naturalWidth) return;
    const scale = viewScale > 0 ? viewScale : 1;
    const zmult = Math.max(1, (zoomPercent ?? state.spotDisplayZoom ?? 100) / 100);
    const patch = size / scale / zmult;
    const half = patch / 2;
    const sx = Math.max(0, Math.min(imgW - patch, px - half));
    const sy = Math.max(0, Math.min(imgH - patch, py - half));
    const sw = Math.min(patch, imgW - sx);
    const sh = Math.min(patch, imgH - sy);
    if (sw <= 0 || sh <= 0) return;
    ctx.imageSmoothingEnabled = zmult > 1.5;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
  }

  function setupCompareInteractions(viewport, preset, pair) {
    cleanupCompareListeners();
    const leftEl = $('#compare-left');
    const leftImg = $('#compare-left-img');
    const rightImg = $('#compare-right');
    const handle = $('#compare-handle');
    const spotWorkbench = $('#compare-spot-workbench');
    const spotToolbarZoom = $('#spot-toolbar-zoom-wrap');
    const spotLeft = $('#spot-canvas-left');
    const spotRight = $('#spot-canvas-right');
    const spotToggle = $('#compare-spot-toggle');
    const spotLabelLeft = $('#spot-label-left');
    const spotLabelRight = $('#spot-label-right');
    const spotZoom = $('#spot-zoom');
    const spotZoomVal = $('#spot-zoom-val');
    const navViewport = $('#spot-nav-viewport');
    const navImg = $('#spot-nav-img');
    const navSub = $('#spot-nav-sub');
    const navExpandBtn = $('#spot-nav-expand-btn');
    const pickerViewport = $('#spot-nav-picker-viewport');
    const pickerReticle = $('#spot-nav-picker-reticle');
    const pickerConfirm = $('#spot-nav-picker-confirm');
    const pickerCancel = $('#spot-nav-picker-cancel');
    const spotToolbarHint = $('#spot-toolbar-hint-wrap');

    navImg.src = pair.left;
    if (navSub) {
      navSub.textContent = t('spot.sameSize', { name: layerLabel(preset.left) });
    }

    if (spotLeft) {
      spotLeft.width = SPOT_PATCH;
      spotLeft.height = SPOT_PATCH;
    }
    if (spotRight) {
      spotRight.width = SPOT_PATCH;
      spotRight.height = SPOT_PATCH;
    }
    spotLabelLeft && (spotLabelLeft.textContent = layerLabel(preset.left));
    spotLabelRight && (spotLabelRight.textContent = layerLabel(preset.right));

    function syncCompareImageRefs() {
      if (!leftImg.complete || !rightImg.complete) return;
      state.compareImages = { left: leftImg, right: rightImg, w: pair.w, h: pair.h };
      if (state.compareSpotMode) {
        ensureDefaultSpotPoint(navViewport, pair.w, pair.h);
        redrawAllSpotViews();
      }
    }

    function syncLeftImgWidth() {
      leftImg.style.width = viewport.offsetWidth + 'px';
      leftImg.style.maxWidth = 'none';
    }

    function setSpotWorkbench(on) {
      state.compareSpotMode = on;
      spotWorkbench.hidden = !on;
      if (spotToolbarZoom) {
        spotToolbarZoom.hidden = !on;
        spotToolbarZoom.style.display = on ? '' : 'none';
      }
      if (spotToolbarHint) {
        spotToolbarHint.hidden = !on;
        spotToolbarHint.style.display = on ? '' : 'none';
      }
      spotToggle.textContent = on ? t('spot.on') : t('spot.off');
      spotToggle.classList.toggle('btn-primary', on);
      spotToggle.classList.toggle('btn-ghost', !on);
      if (!on) closeNavPickerPanel(false);
      if (on) {
        ensureDefaultSpotPoint(navViewport, pair.w, pair.h);
        syncCompareImageRefs();
        redrawAllSpotViews();
      }
    }

    setSpotWorkbench(state.compareSpotMode);

    function moveSlider(clientX) {
      const rect = viewport.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      state.comparePct = (x / rect.width) * 100;
      leftEl.style.width = state.comparePct + '%';
      handle.style.left = state.comparePct + '%';
    }

    let dragging = false;

    const onResize = () => {
      syncLeftImgWidth();
      syncCompareImageRefs();
      if (state.compareSpotPoint && navViewport) {
        syncSpotNavReticle(state.compareSpotPoint, navViewport, pair.w, pair.h, state.spotDisplayZoom);
      }
      redrawAllSpotViews();
    };
    const onMouseMove = (e) => {
      if (dragging) moveSlider(e.clientX);
    };
    const onMouseUp = () => { dragging = false; };
    const onViewportMouseDown = (e) => {
      if (!viewport.classList.contains('is-ready')) return;
      e.preventDefault();
      dragging = true;
      moveSlider(e.clientX);
    };
    const onHandleMouseDown = (e) => {
      if (!viewport.classList.contains('is-ready')) return;
      e.preventDefault();
      e.stopPropagation();
      dragging = true;
      moveSlider(e.clientX);
    };
    const onNavMouseMove = (e) => {
      if (!state.compareSpotMode || state.navPickerOpen) return;
      previewNavSpotHover(e.clientX, e.clientY, navViewport, pair.w, pair.h);
    };
    const onNavMouseLeave = () => {
      if (!state.compareSpotMode || state.navPickerOpen) return;
      if (state.compareSpotPoint) {
        state.spotNavHoverPoint = { ...state.compareSpotPoint };
        syncSpotNavReticle(state.compareSpotPoint, navViewport, pair.w, pair.h, state.spotDisplayZoom);
      }
    };
    let navClickTimer = null;
    const onNavClick = (e) => {
      if (!state.compareSpotMode || state.navPickerOpen) return;
      clearTimeout(navClickTimer);
      navClickTimer = setTimeout(() => {
        const pt = state.spotNavHoverPoint
          || pickImagePoint(e.clientX, e.clientY, navViewport, pair.w, pair.h);
        if (pt) confirmSpotPoint(pt);
      }, 220);
    };
    const onPickerMouseMove = (e) => {
      if (!state.navPickerOpen || !state.spotFsFollow) return;
      previewFsSpotHover(e.clientX, e.clientY, pickerViewport, pair.w, pair.h, pickerReticle);
    };
    const onPickerClick = (e) => {
      if (!state.navPickerOpen) return;
      e.preventDefault();
      setSpotFsPointFromClick(e.clientX, e.clientY, pickerViewport, pair.w, pair.h, pickerReticle);
    };
    const onWorkbenchClick = (e) => {
      if (e.target.closest('#spot-nav-expand-btn')) {
        e.preventDefault();
        openNavPickerPanel(pair);
      }
    };
    const onTouchStart = (e) => {
      if (!viewport.classList.contains('is-ready')) return;
      dragging = true;
      moveSlider(e.touches[0].clientX);
    };
    const onTouchMove = (e) => {
      if (!dragging) return;
      moveSlider(e.touches[0].clientX);
    };
    const onTouchEnd = () => { dragging = false; };
    const onSpotToggle = () => setSpotWorkbench(!state.compareSpotMode);
    const onSpotZoomInput = () => {
      syncSpotZoomUi(parseInt(spotZoom.value, 10));
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    viewport.addEventListener('mousedown', onViewportMouseDown);
    handle?.addEventListener('mousedown', onHandleMouseDown);
    handle?.addEventListener('touchstart', (e) => {
      if (!viewport.classList.contains('is-ready')) return;
      e.stopPropagation();
      dragging = true;
      moveSlider(e.touches[0].clientX);
    }, { passive: true });
    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: true });
    viewport.addEventListener('touchend', onTouchEnd);
    navViewport?.addEventListener('mousemove', onNavMouseMove);
    navViewport?.addEventListener('mouseleave', onNavMouseLeave);
    navViewport?.addEventListener('click', onNavClick);
    spotWorkbench?.addEventListener('click', onWorkbenchClick);
    pickerViewport?.addEventListener('mousemove', onPickerMouseMove);
    pickerViewport?.addEventListener('click', onPickerClick);
    navExpandBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      openNavPickerPanel(pair);
    });
    spotToggle.addEventListener('click', onSpotToggle);
    spotZoom?.addEventListener('input', onSpotZoomInput);
    if (spotZoom) {
      spotZoom.value = String(state.spotDisplayZoom);
      if (spotZoomVal) spotZoomVal.textContent = String(state.spotDisplayZoom);
    }

    state.compareCleanup = () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      viewport.removeEventListener('mousedown', onViewportMouseDown);
      handle?.removeEventListener('mousedown', onHandleMouseDown);
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchmove', onTouchMove);
      viewport.removeEventListener('touchend', onTouchEnd);
      navViewport?.removeEventListener('mousemove', onNavMouseMove);
      navViewport?.removeEventListener('mouseleave', onNavMouseLeave);
      navViewport?.removeEventListener('click', onNavClick);
      spotWorkbench?.removeEventListener('click', onWorkbenchClick);
      pickerViewport?.removeEventListener('mousemove', onPickerMouseMove);
      pickerViewport?.removeEventListener('click', onPickerClick);
      spotToggle.removeEventListener('click', onSpotToggle);
      spotZoom?.removeEventListener('input', onSpotZoomInput);
    };

    return { syncLeftImgWidth, syncCompareImageRefs };
  }

  async function renderCompare(result) {
    cleanupCompareListeners();
    state.navPickerOpen = false;
    if (!result) {
      state.comparePair = null;
      state.compareImages = null;
      els.compareSection.innerHTML = `
        <div class="compare-head">
          <div>
            <h2 class="panel-title">${t('compare.title')}</h2>
            <p class="panel-desc">${t('compare.emptyDesc')}</p>
          </div>
        </div>
        <div class="compare-empty">${EMPTY_ICON}<span>${t('compare.empty')}</span></div>`;
      return;
    }

    const layers = availableCompareLayers(result);
    if (layers.length < 2) {
      els.compareSection.innerHTML = `
        <div class="compare-head">
          <div><h2 class="panel-title">${t('compare.title')}</h2></div>
        </div>
        <div class="compare-empty">${EMPTY_ICON}<span>${t('compare.unavailable')}</span></div>`;
      return;
    }
    if (!layers.includes(state.compareLeft)) state.compareLeft = layers[0];
    state.compareRight = pickOtherCompareLayer(result, state.compareLeft, state.compareRight);
    const preset = getComparePairKeys();
    const leftSrc = getResultLayer(result, preset.left);
    const rightSrc = getResultLayer(result, preset.right);

    if (!leftSrc || !rightSrc) {
      els.compareSection.innerHTML = `
        <div class="compare-head">
          <div><h2 class="panel-title">${t('compare.title')}</h2></div>
        </div>
        <div class="compare-empty">${EMPTY_ICON}<span>${t('compare.unavailable')}</span></div>`;
      return;
    }

    els.compareSection.innerHTML = `
      <div class="compare-head">
        <div>
          <h2 class="panel-title">${t('compare.title')}</h2>
            <p class="panel-desc">${t('compare.desc')}</p>
        </div>
        <div class="compare-controls">
          <div class="compare-side">
            <label for="compare-left-layer">${t('compare.left')}</label>
            <select id="compare-left-layer" class="compare-select">
              ${layers.filter((id) => id !== state.compareRight).map((id) => `
                <option value="${id}" ${id === state.compareLeft ? 'selected' : ''}>${compareLayerLabel(id)}</option>
              `).join('')}
            </select>
          </div>
          <div class="compare-side">
            <label for="compare-right-layer">${t('compare.right')}</label>
            <select id="compare-right-layer" class="compare-select">
              ${layers.filter((id) => id !== state.compareLeft).map((id) => `
                <option value="${id}" ${id === state.compareRight ? 'selected' : ''}>${compareLayerLabel(id)}</option>
              `).join('')}
            </select>
          </div>
        </div>
      </div>
      <div class="compare-viewport mode-slider" id="compare-viewport">
        <div class="compare-loading" id="compare-loading">${t('compare.loading')}</div>
        <div class="compare-wrap" id="compare-wrap">
          <img id="compare-right" alt="${t('spot.right')}" draggable="false" />
          <div class="compare-left" id="compare-left" style="width:${state.comparePct}%">
            <img id="compare-left-img" alt="${t('spot.left')}" draggable="false" />
          </div>
          <div class="compare-label compare-label-left" id="compare-label-left"></div>
          <div class="compare-label compare-label-right" id="compare-label-right"></div>
          <div class="compare-handle" id="compare-handle" style="left:${state.comparePct}%">
            <div class="compare-knob">↔</div>
          </div>
        </div>
      </div>
      <div class="compare-spot-toolbar">
        <button type="button" id="compare-spot-toggle" class="btn btn-ghost btn-sm">${t('spot.off')}</button>
        <div class="spot-toolbar-zoom" id="spot-toolbar-zoom-wrap" hidden style="display:none">
          <label for="spot-zoom">${t('spot.zoom')}</label>
          <input type="range" id="spot-zoom" min="100" max="400" step="5" value="${state.spotDisplayZoom}" />
          <output id="spot-zoom-val">${state.spotDisplayZoom}</output><span>%</span>
        </div>
        <span class="compare-mode-hint" id="spot-toolbar-hint-wrap" hidden style="display:none">${t('spot.toolbarHint')}</span>
      </div>
      <section class="compare-spot-workbench" id="compare-spot-workbench" hidden>
        <div class="spot-workbench-grid">
          <div class="spot-nav-card">
            <div class="spot-card-head spot-card-head-row">
              <div>
                <span class="spot-card-title">${t('spot.navTitle')}</span>
                <span class="spot-card-sub" id="spot-nav-sub"></span>
              </div>
              <button type="button" id="spot-nav-expand-btn" class="btn btn-ghost btn-sm">${t('spot.expand')}</button>
            </div>
            <div class="spot-nav-viewport" id="spot-nav-viewport">
              <img id="spot-nav-img" alt="${t('spot.navTitle')}" draggable="false" />
              <div class="spot-nav-reticle" id="spot-nav-reticle" hidden>
                <span class="spot-nav-cross-v"></span>
                <span class="spot-nav-cross-h"></span>
                <span class="spot-nav-box"></span>
              </div>
            </div>
            <p class="spot-nav-hint">${t('spot.navHint')}</p>
          </div>
          <div class="spot-mag-card">
            <div class="spot-card-head">
              <span class="spot-card-title">${t('spot.magTitle')}</span>
              <span class="spot-card-sub">${t('spot.magSub')}</span>
            </div>
            <div class="spot-mag-grid">
              <div class="spot-mag-item">
                <span id="spot-label-left">${t('spot.left')}</span>
                <canvas id="spot-canvas-left" width="168" height="168"></canvas>
              </div>
              <div class="spot-mag-item">
                <span id="spot-label-right">${t('spot.right')}</span>
                <canvas id="spot-canvas-right" width="168" height="168"></canvas>
              </div>
            </div>
          </div>
        </div>
      </section>`;

    $('#compare-left-layer')?.addEventListener('change', async (e) => {
      state.compareLeft = e.target.value;
      state.compareRight = pickOtherCompareLayer(result, state.compareLeft, state.compareRight);
      state.comparePct = 50;
      state.compareSpotPoint = null;
      state.spotNavHoverPoint = null;
      await renderCompare(result);
    });
    $('#compare-right-layer')?.addEventListener('change', async (e) => {
      state.compareRight = e.target.value;
      if (state.compareRight === state.compareLeft) {
        state.compareLeft = pickOtherCompareLayer(result, state.compareRight, state.compareLeft);
      }
      state.comparePct = 50;
      state.compareSpotPoint = null;
      state.spotNavHoverPoint = null;
      await renderCompare(result);
    });

    try {
      const pair = await normalizeComparePair(leftSrc, rightSrc);
      state.comparePair = pair;

      const viewport = $('#compare-viewport');
      const leftImg = $('#compare-left-img');
      const rightImg = $('#compare-right');

      rightImg.src = pair.right;
      leftImg.src = pair.left;
      $('#compare-label-left').textContent = layerLabel(preset.left);
      $('#compare-label-right').textContent = layerLabel(preset.right);

      const helpers = setupCompareInteractions(viewport, preset, pair);

      function revealCompare() {
        if (!rightImg.complete || !leftImg.complete) return;
        viewport.classList.add('is-ready');
        viewport.classList.add('mode-slider');
        helpers.syncLeftImgWidth();
        helpers.syncCompareImageRefs();
      }

      rightImg.onload = revealCompare;
      leftImg.onload = revealCompare;
      revealCompare();
    } catch {
      els.compareSection.querySelector('.compare-loading').textContent = t('compare.fail');
    }
  }

  function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }

  function loadImageFromUrl(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  }

  function canvasToDataUrl(c) { return c.toDataURL('image/jpeg', 0.92); }

  function renderD(source) {
    const c = document.createElement('canvas');
    c.width = source.width; c.height = source.height;
    const ctx = c.getContext('2d');
    ctx.filter = 'blur(1.2px) saturate(0.95)';
    ctx.drawImage(source, 0, 0);
    return canvasToDataUrl(c);
  }

  function renderG(source) {
    const c = document.createElement('canvas');
    c.width = source.width; c.height = source.height;
    const ctx = c.getContext('2d');
    ctx.filter = 'contrast(1.12) saturate(1.18) brightness(1.03)';
    ctx.drawImage(source, 0, 0);
    const w = c.width, h = c.height;
    ctx.fillStyle = 'rgba(255,180,80,0.08)';
    ctx.fillRect(w * 0.08, h * 0.12, w * 0.35, h * 0.18);
    ctx.strokeStyle = 'rgba(220,38,38,0.35)';
    ctx.lineWidth = 2;
    ctx.strokeRect(w * 0.08, h * 0.12, w * 0.35, h * 0.18);
    return canvasToDataUrl(c);
  }

  function renderMaskAndScore(w, h, alpha) {
    const tau = TAU[alpha];
    const patch = 32;
    const maskC = document.createElement('canvas');
    maskC.width = w; maskC.height = h;
    const mCtx = maskC.getContext('2d');
    const scoreC = document.createElement('canvas');
    scoreC.width = w; scoreC.height = h;
    const sCtx = scoreC.getContext('2d');
    let accept = 0, total = 0;

    for (let y = 0; y < h; y += patch) {
      for (let x = 0; x < w; x += patch) {
        total++;
        const nx = (x + patch / 2) / w, ny = (y + patch / 2) / h;
        const textZone = nx > 0.05 && nx < 0.42 && ny > 0.1 && ny < 0.32;
        const faceZone = nx > 0.55 && nx < 0.88 && ny > 0.15 && ny < 0.55;
        const repeatZone = nx > 0.2 && nx < 0.75 && ny > 0.62 && ny < 0.92;
        let score = 0.25 + Math.sin(nx * 11) * 0.08 + Math.cos(ny * 9) * 0.06;
        if (textZone) score += 0.45;
        if (faceZone) score += 0.38;
        if (repeatZone) score += 0.28;
        score = Math.min(0.95, Math.max(0.05, score));
        const ok = score <= tau;
        if (ok) accept++;
        mCtx.fillStyle = ok ? 'rgba(5,150,105,0.55)' : 'rgba(220,38,38,0.55)';
        mCtx.fillRect(x, y, patch, patch);
        mCtx.strokeStyle = 'rgba(255,255,255,0.15)';
        mCtx.strokeRect(x + 0.5, y + 0.5, patch - 1, patch - 1);
        const t = 1 - score;
        sCtx.fillStyle = `hsl(${Math.round(210 - t * 160)},72%,${Math.round(38 + t * 22)}%)`;
        sCtx.fillRect(x, y, patch, patch);
      }
    }

    const coverage = (accept / total) * 0.3 + COVERAGE[alpha] * 0.7;
    return { mask: canvasToDataUrl(maskC), scoreMap: canvasToDataUrl(scoreC), coverage, tau };
  }

  async function renderFused(dUrl, gUrl, maskUrl, w, h) {
    const [dImg, gImg, mImg] = await Promise.all([loadImageFromUrl(dUrl), loadImageFromUrl(gUrl), loadImageFromUrl(maskUrl)]);
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    ctx.drawImage(dImg, 0, 0);
    const gC = document.createElement('canvas'); gC.width = w; gC.height = h;
    gC.getContext('2d').drawImage(gImg, 0, 0);
    const mC = document.createElement('canvas'); mC.width = w; mC.height = h;
    mC.getContext('2d').drawImage(mImg, 0, 0);
    const gData = gC.getContext('2d').getImageData(0, 0, w, h);
    const mData = mC.getContext('2d').getImageData(0, 0, w, h);
    const out = ctx.getImageData(0, 0, w, h);
    for (let i = 0; i < out.data.length; i += 4) {
      const green = mData.data[i + 1] > mData.data[i] && mData.data[i + 1] > mData.data[i + 2];
      if (!green) continue;
      const blend = 0.55;
      out.data[i] = out.data[i] * (1 - blend) + gData.data[i] * blend;
      out.data[i + 1] = out.data[i + 1] * (1 - blend) + gData.data[i + 1] * blend;
      out.data[i + 2] = out.data[i + 2] * (1 - blend) + gData.data[i + 2] * blend;
    }
    ctx.putImageData(out, 0, 0);
    return canvasToDataUrl(c);
  }

  async function runInference(file, alpha, opts) {
    const reuseExperts = !!opts?.reuseExperts;
    if (!USE_MOCK) {
      const appendInferFields = (form, reuse) => {
        form.append('alpha', String(alpha));
        form.append('coverage', String(state.coverage));
        form.append('reuse_experts', reuse ? 'true' : 'false');
        form.append('enhancement', 'none');
        form.append('gamma', Number(state.gamma).toFixed(2));
        form.append('contrast', Number(state.contrast).toFixed(2));
        form.append('clahe', Number(state.clahe).toFixed(3));
        form.append('feather', String(state.feather));
        form.append('return_mask', 'true');
        form.append('return_intermediate', 'true');
      };
      const form = new FormData();
      if (!reuseExperts && file) form.append('image', file);
      appendInferFields(form, reuseExperts);
      let res = await fetch(`${API_BASE}/api/infer`, { method: 'POST', body: form });
      if (!res.ok && reuseExperts && file) {
        const retry = new FormData();
        retry.append('image', file);
        appendInferFields(retry, false);
        res = await fetch(`${API_BASE}/api/infer`, { method: 'POST', body: retry });
      }
      if (!res.ok) {
        const detail = await res.text();
        throw new Error(`处理失败，请确认后端已启动。${detail}`);
      }
      return mapBackendResponse(await res.json(), alpha);
    }

    await new Promise((r) => setTimeout(r, 800));

    const img = await loadImageFromFile(file);
    const maxSide = 512;
    const scale = Math.min(1, maxSide / Math.max(img.width, img.height));
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);

    const base = document.createElement('canvas');
    base.width = w; base.height = h;
    base.getContext('2d').drawImage(img, 0, 0, w, h);
    const lr = canvasToDataUrl(base);
    const dOutput = renderD(base);
    const gOutput = renderG(base);
    const { mask, scoreMap, coverage, tau } = renderMaskAndScore(w, h, alpha);
    const fused = await renderFused(dOutput, gOutput, mask, w, h);

    return {
      lr, dOutput, gOutput, fused, mask, scoreMap,
      risk: { coverage, tau, alpha, violation: alpha * (0.85 + Math.random() * 0.2) },
      latency: { d: 198, g: 1080, router: 48, fuse: 12, total: 1338 },
      metrics: {
        psnr: 28.4 + coverage * 1.2,
        ssim: 0.891,
        lpips: 0.118 - coverage * 0.02,
        dists: 0.142,
      },
    };
  }

  init();
})();
