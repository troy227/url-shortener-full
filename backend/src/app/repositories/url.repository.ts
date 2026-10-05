import { Injectable } from '@nestjs/common';
import type { Transaction } from 'sequelize';
import { Url } from '../../database/models/url.model.js';

export type CreateUrlInput = {
  shortCode: string;
  longUrl: string;
  expiry?: Date | null;
};

export type UpdateUrlFields = {
  shortCode?: string;
  longUrl?: string;
  expiry?: Date | null;
};

@Injectable()
export class UrlRepository {
  findOne(shortCode: string): Promise<Url | null> {
    return Url.findOne({ where: { shortCode } });
  }

  create(input: CreateUrlInput, transaction?: Transaction): Promise<Url> {
    return Url.create(
      {
        shortCode: input.shortCode,
        longUrl: input.longUrl,
        expiry: input.expiry ?? null,
      },
      { transaction },
    );
  }

  async update(
    id: number,
    fields: UpdateUrlFields,
    transaction?: Transaction,
  ): Promise<Url> {
    const [affectedCount] = await Url.update(fields, {
      where: { id },
      transaction,
    });
    if (affectedCount === 0) {
      throw new Error(`Url not found: ${id}`);
    }
    const url = await Url.findByPk(id, { transaction });
    if (!url) {
      throw new Error(`Url not found: ${id}`);
    }
    return url;
  }
}
