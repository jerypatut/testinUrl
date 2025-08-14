// src/utils/validateUrl.ts

interface ValidationResult {
  valid: boolean;
  status?: number;
  message?: string;
}

const blockedDomains = [
  'malicious-site.com',
  'phishing.com'
];

export function validateUrl(url?: string): ValidationResult {
  // 1. URL kosong / tidak dikirim
  if (!url) {
    return { valid: false, status: 400, message: 'URL is required' };
  }

  // 2. Format bukan URL
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(url);
  } catch {
    return { valid: false, status: 422, message: 'Invalid URL format' };
  }

  // 3. Skema tidak diizinkan
  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    return { valid: false, status: 422, message: 'Only HTTP and HTTPS URLs are allowed' };
  }

  // 4. Panjang URL terlalu pendek / terlalu panjang
  if (url.length < 5 || url.length > 2000) {
    return { valid: false, status: 422, message: 'URL length must be between 5 and 2000 characters' };
  }

  // 5. Domain diblokir (opsional)
  const hostname = parsedUrl.hostname.toLowerCase();
  if (blockedDomains.includes(hostname)) {
    return { valid: false, status: 403, message: 'Domain is blocked' };
  }

  // 6. URL valid
  return { valid: true };
}
