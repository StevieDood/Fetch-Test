import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoryStorageService } from './memory-storage/memory-storage.service';
import { GetPointsService } from './get-points/get-points.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MemoryStorageService, GetPointsService],
})
export class AppModule {}
