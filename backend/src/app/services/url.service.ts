import { randomUUID } from 'node:crypto';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { CreateUrlDto, CreateUrlResponseDto } from '../dtos/create-url.dto.js';
import { UrlRepository } from '../repositories/url.repository.js';
import { shortCodeFromId } from '../utils/short-code.js';
import { getSequelize } from '../../database/db.js';

@Injectable()
export class UrlService {
  constructor(private readonly urlRepository: UrlRepository) {}

  async createShortUrl(input: CreateUrlDto): Promise<CreateUrlResponseDto> {
    const expiry = input.expiry ? new Date(input.expiry) : null;

    if (input.alias) {
      const existing = await this.urlRepository.findOne(input.alias);
      if (existing) {
        throw new ConflictException(`The alias ${input.alias} already exists`);
      }

      try {
        const url = await this.urlRepository.create({
          shortCode: input.alias,
          longUrl: input.longUrl,
          expiry,
        });
        return { 
          shortUrl: this.buildShortUrl(url.shortCode)
        };
      } catch (error) {
        throw error;
      }
    }

    const pendingShortCode = `pending_${randomUUID()}`;
    const updated = await getSequelize().transaction(async (transaction) => {
      const url = await this.urlRepository.create(
        {
          shortCode: pendingShortCode,
          longUrl: input.longUrl,
          expiry,
        },
        transaction,
      );

      const shortCode = shortCodeFromId(Number(url.id));
      return this.urlRepository.update(
        Number(url.id),
        { shortCode },
        transaction,
      );
    });

    return { shortUrl: this.buildShortUrl(updated.shortCode) };
  }

  async resolveLongUrl(shortCode: string): Promise<string> {
    const url = await this.urlRepository.findOne(shortCode);
    if (!url) {
      throw new NotFoundException("URL not found");
    }

    if (url.expiry && url.expiry.getTime() <= Date.now()) {
      throw new NotFoundException("URL expired");
    }

    return url.longUrl;
  }

  private buildShortUrl(shortCode: string): string {
    const base =
      process.env.BASE_URL ??
      `http://localhost:${process.env.PORT ?? 3000}`;
    const normalizedBase = base.replace(/\/$/, '');
    return `${normalizedBase}/${shortCode}`;
  }
}
