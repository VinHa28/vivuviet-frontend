const ENTITIES = { "&nbsp;": " ", "&quot;": '"', "&amp;": "&", "&#39;": "'", "&lt;": "<", "&gt;": ">" };

export function buildDescription(html, max = 155) {
  const text = (html || "")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, " ") // bỏ tiêu đề (kể cả h2 ẩn)
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, (e) => ENTITIES[e] ?? " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= max) return text;

  const cut = text.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:–-]+$/, "") + "…";
}