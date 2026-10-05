import { Module } from '@nestjs/common';
import { UrlController } from './controllers/url.controller.js';
import { UrlRepository } from './repositories/url.repository.js';
import { UrlService } from './services/url.service.js';

@Module({
  controllers: [UrlController],
  providers: [UrlRepository, UrlService],
})
export class UrlModule {}
