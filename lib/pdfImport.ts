// @ts-nocheck
/* ================================================================
   lib/pdfImport.ts — WEB-ONLY helpers for the admin "Import Questions
   from PDF" tool.

   Responsibilities:
   - renderPdf(file):   turn an uploaded PDF into per-page { image, text }
   - cropFromPage(...): crop a (normalized) figure box out of a page image
                        and return a JPEG Blob ready for Firebase Storage

   pdf.js is loaded via DYNAMIC import so native (iOS/Android) bundles never
   pull it in. The worker is pointed at a version-pinned CDN URL so Metro
   never has to bundle the pdf.js web worker.
================================================================ */

const PDFJS_VERSION = "4.8.69";
const PDFJS_WORKER = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/legacy/build/pdf.worker.min.mjs`;

let _pdfjs = null;
const getPdfjs = async () => {
  if (_pdfjs) return _pdfjs;
  // Legacy build = widest bundler/browser compatibility (works under Metro web).
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  _pdfjs = pdfjs;
  return pdfjs;
};

export type PdfPage = {
  pageIndex: number; // 0-based
  width: number;     // rendered px
  height: number;    // rendered px
  dataUrl: string;   // JPEG data URL of the rendered page
  text: string;      // best-effort text-layer extraction
};

/**
 * Render every page of a PDF File to a JPEG data URL + its text layer.
 * Pages are clamped to `maxWidth` and JPEG-compressed so each stays well under
 * Groq's 20MB-per-image / 5-images-per-request vision limits.
 */
export const renderPdf = async (
  file,
  { scale = 2, maxWidth = 1600, jpegQuality = 0.72 } = {}
): Promise<PdfPage[]> => {
  const pdfjs = await getPdfjs();
  const buf = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buf) }).promise;
  const pages: PdfPage[] = [];
  try {
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      let viewport = page.getViewport({ scale });
      if (viewport.width > maxWidth) {
        const s = (maxWidth / viewport.width) * scale;
        viewport = page.getViewport({ scale: s });
      }
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const ctx = canvas.getContext("2d");
      await page.render({ canvasContext: ctx, viewport }).promise;
      const dataUrl = canvas.toDataURL("image/jpeg", jpegQuality);

      let text = "";
      try {
        const tc = await page.getTextContent();
        text = tc.items.map((it) => (it.str || "")).join(" ");
      } catch (e) {
        /* text layer optional — vision model still reads the image */
      }

      pages.push({ pageIndex: i - 1, width: canvas.width, height: canvas.height, dataUrl, text });
      page.cleanup?.();
    }
  } finally {
    try { doc.destroy(); } catch (e) {}
  }
  return pages;
};

const loadImage = (src): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

/**
 * Crop a normalized box [x0,y0,x1,y1] (each 0..1, relative to the page image)
 * out of `dataUrl` and return a JPEG Blob. A little padding is added so figures
 * never get clipped at the edges.
 */
export const cropFromPage = async (dataUrl, box, { padding = 0.008 } = {}): Promise<Blob> => {
  const img = await loadImage(dataUrl);
  const W = img.naturalWidth;
  const H = img.naturalHeight;
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  let [x0, y0, x1, y1] = box;
  if (x1 < x0) [x0, x1] = [x1, x0];
  if (y1 < y0) [y0, y1] = [y1, y0];
  x0 = clamp01(x0 - padding);
  y0 = clamp01(y0 - padding);
  x1 = clamp01(x1 + padding);
  y1 = clamp01(y1 + padding);

  const sx = Math.floor(x0 * W);
  const sy = Math.floor(y0 * H);
  const sw = Math.max(1, Math.ceil((x1 - x0) * W));
  const sh = Math.max(1, Math.ceil((y1 - y0) * H));

  const canvas = document.createElement("canvas");
  canvas.width = sw;
  canvas.height = sh;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);

  return await new Promise((resolve) => canvas.toBlob((b) => resolve(b), "image/jpeg", 0.9));
};
