// url.routes.ts
import { Router } from 'express';
import { UrlController } from '@controllers/url.controller';
import { methodNotAllowed } from '@middlewares/methodNotAllowed';

const router = Router();
const controller = new UrlController();

/**
 * -------------------------------------------------------------------
 * Route: POST /shorten
 * Tujuan: Membuat URL pendek dari URL panjang yang diberikan.
 * Catatan:
 * - Menerima body JSON: { url: string }
 * - Response: 201 Created + { shortToken }
 * - Penanganan error:
 *    • 400 Bad Request → URL tidak ada
 *    • 422 Unprocessable Entity → format URL tidak valid
 * -------------------------------------------------------------------
 */
router.post('/shorten', controller.shorten.bind(controller));

/**
 * -------------------------------------------------------------------
 * Penanganan Method Tidak Diizinkan untuk /shorten
 * Tujuan: Memastikan /shorten hanya menerima POST.
 * Response: 405 Method Not Allowed untuk method lain
 * -------------------------------------------------------------------
 */
router.all('/shorten', methodNotAllowed(['POST']));

/**
 * -------------------------------------------------------------------
 * Route: GET /stats/:shortToken
 * Tujuan: Mendapatkan statistik klik dan metadata URL asli dari token pendek.
 * Response: 200 OK + JSON { originalUrl, shortToken, clicks }
 * Penanganan error: 404 Not Found → token tidak ditemukan
 * -------------------------------------------------------------------
 */
router.get('/stats/:shortToken', controller.stats.bind(controller));

/**
 * -------------------------------------------------------------------
 * Route: GET /get-token
 * Tujuan: Mendapatkan token pendek yang sudah ada dari URL asli.
 * Query: ?url=<originalUrl>
 * Response: 200 OK + { shortToken }
 * Penanganan error:
 * - 400 Bad Request → parameter URL tidak ada
 * - 404 Not Found → URL tidak ada di database
 * -------------------------------------------------------------------
 */
router.get('/get-token', controller.getTokenByUrl.bind(controller));

/**
 * -------------------------------------------------------------------
 * Route: GET /:shortToken
 * Tujuan: Mengalihkan pengguna dari URL pendek ke URL panjang.
 * Catatan:
 * - Diletakkan di bagian bawah agar tidak konflik dengan route lain.
 * - Response: 302 Found → redirect ke URL asli
 * - Penanganan error: 404 Not Found → token pendek tidak ditemukan
 * -------------------------------------------------------------------
 */
router.get('/:shortToken', controller.redirect.bind(controller));

export default router;
