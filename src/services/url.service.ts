import { PrismaClient } from '@prisma/client';
import { generateToken } from '@utils/token-generator';

const prisma = new PrismaClient();

export class UrlService {
  async createShortUrl(originalUrl: string) {
    // 1. Cek apakah URL sudah ada
    const existing = await prisma.shortUrl.findUnique({
      where: { originalUrl },
    });

  if(existing) {
    return existing;
  }

    // 2. Generate token unik
    let token = generateToken();
    while (await prisma.shortUrl.findUnique({ where: { shortToken: token } })) {
      token = generateToken();
    }

    // 3. Simpan ke DB
    return prisma.shortUrl.create({
      data: { originalUrl, shortToken: token },
    });
  }

  async getOriginalUrl(token: string) {
    const url = await prisma.shortUrl.findUnique({ where: { shortToken: token } });
    if (!url) return null;

    // Increment klik
    await prisma.shortUrl.update({
      where: { shortToken: token },
      data: { clicks: { increment: 1 } },
    });

    return url.originalUrl;
  }

  async getStats(token: string) {
    return prisma.shortUrl.findUnique({ where: { shortToken: token } });
  }

  async findByOriginalUrl(originalUrl: string) {
    return prisma.shortUrl.findUnique({
      where: { originalUrl },
    });
  }
}
