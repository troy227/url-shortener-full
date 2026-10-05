import {
  IsISO8601,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateUrlDto {
  @IsUrl({ require_protocol: true })
  longUrl!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  alias?: string;

  @IsOptional()
  @IsISO8601({ strict: true })
  expiry?: string;
}

export class CreateUrlResponseDto {
  @IsString()
  shortUrl!: string;
}