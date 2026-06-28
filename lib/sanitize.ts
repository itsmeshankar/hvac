const BLOCKED_TAGS = /<\/?(?:script|iframe|object|embed|form|input|button|style|link|meta)[^>]*>/gi;
const EVENT_HANDLERS = /\son\w+=("[^"]*"|'[^']*'|[^\s>]*)/gi;
const JAVASCRIPT_URLS = /(href|src)=("|')\s*javascript:[^"']*("|')/gi;

export function sanitizeHtml(html = "") {
  return html
    .replace(BLOCKED_TAGS, "")
    .replace(EVENT_HANDLERS, "")
    .replace(JAVASCRIPT_URLS, "$1=\"#\"");
}
