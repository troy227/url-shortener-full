import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller.js';
import { AppService } from './services/app.service.js';
import { UrlModule } from './url.module.js';

@Module({
  imports: [UrlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
