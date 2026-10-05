import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import type { Response } from 'express';
import { createValidationPipe } from '../../common/validation/validation.pipe.js';
import { CreateUrlDto, CreateUrlResponseDto } from '../dtos/create-url.dto.js';
import { UrlService } from '../services/url.service.js';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('urls')
  @UsePipes(createValidationPipe())
  create(@Body() body: CreateUrlDto): Promise<CreateUrlResponseDto> {
    return this.urlService.createShortUrl(body);
  }

  @Get(':shortCode')
  async redirect(
    @Param('shortCode') shortCode: string,
    @Res() response: Response,
  ): Promise<void> {
    const longUrl = await this.urlService.resolveLongUrl(shortCode);
    response.redirect(HttpStatus.FOUND, longUrl);
  }
}
