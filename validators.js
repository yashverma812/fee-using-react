// Shared validation helpers (regex-based, same rules as the original project).
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_RE = /^\d{10}$/

export const required = (msg) => (v) => (String(v).trim() ? '' : msg)
export const minLen = (n, msg) => (v) => (String(v).trim().length >= n ? '' : msg)
export const email = (v) => (EMAIL_RE.test(String(v).trim()) ? '' : 'Please enter a valid email address.')
export const phone = (v) => (PHONE_RE.test(String(v).trim()) ? '' : 'Enter a valid 10-digit phone number.')
export const optionalPhone = (v) => (!String(v).trim() || PHONE_RE.test(String(v).trim()) ? '' : 'Enter a valid 10-digit number.')
