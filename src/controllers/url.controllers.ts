import { Request, Response } from 'express';
import { UrlService } from '@services/url.service';
import { validateUrl } from '@utils/validateUrl';

// Inisialisasi service URL
const urlService = new UrlService();

/**
 * Controller untuk semua operasi terkait URL Shortener
 * Termasuk: shorten URL, redirect, mendapatkan statistik, dan mengambil token berdasarkan URL
 */
export class UrlController {
  /**
   * Endpoint untuk membuat short URL dari original URL
   * POST /shorten
   * 
   * Steps:
   * 1. Validasi input
   * 2. Cek format URL
   * 3. Buat short token (idempotent: URL sama → token sama)
   * 4. Kembalikan response 201 dengan shortToken
   */
  async shorten(req: Request, res: Response) {
    const { url } = req.body;

    // Validasi input: pastikan ada URL
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validasi format URL
    const validation = validateUrl(url);
    if (!validation.valid) {
      return res.status(validation.status || 422).json({ error: validation.message || 'Invalid URL format' });
    }

    try {
      // Panggil service untuk membuat short URL
      const result = await urlService.createShortUrl(url);

      // Response sukses
      return res.status(201).json({ shortToken: result.shortToken });
    } catch (error) {
      // Log error untuk debugging (tidak dikirim ke user)
      console.error('Error creating short URL:', error);

      // Response server error
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Endpoint untuk redirect short URL ke original URL
   * GET /:shortToken
   * 
   * Steps:
   * 1. Ambil shortToken dari params
   * 2. Cari original URL di database
   * 3. Redirect ke URL asli (302 Found)
   */
  async redirect(req: Request, res: Response) {
    const { shortToken } = req.params;

    const originalUrl = await urlService.getOriginalUrl(shortToken);

    if (!originalUrl) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    // Pastikan URL memiliki skema (http/https)
    const urlWithScheme = originalUrl.startsWith('http://') || originalUrl.startsWith('https://')
      ? originalUrl
      : `https://${originalUrl}`;

    // Redirect ke original URL
    return res.redirect(302, urlWithScheme);
  }

  /**
   * Endpoint untuk mendapatkan statistik short URL
   * GET /stats/:shortToken
   * 
   * Steps:
   * 1. Ambil shortToken dari params
   * 2. Ambil statistik dari service
   * 3. Response 200 OK dengan data statistik
   */
  async stats(req: Request, res: Response) {
    const { shortToken } = req.params;

    const stats = await urlService.getStats(shortToken);

    if (!stats) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    return res.status(200).json({
      originalUrl: stats.originalUrl,
      shortToken: stats.shortToken,
      clicks: stats.clicks
    });
  }

  /**
   * Endpoint untuk mendapatkan token berdasarkan original URL
   * GET /get-token?url=<originalUrl>
   * 
   * Steps:
   * 1. Validasi query parameter
   * 2. Cari URL di database
   * 3. Response 200 OK dengan shortToken jika ditemukan
   */
  async getTokenByUrl(req: Request, res: Response) {
    const { url } = req.query;

    // Validasi input query
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL query parameter is required' });
    }

    const existing = await urlService.findByOriginalUrl(url);

    if (!existing) {
      return res.status(404).json({ error: 'URL not found' });
    }

    return res.status(200).json({ shortToken: existing.shortToken });
  }
}
