import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { MemoryStorageService } from './memory-storage/memory-storage.service';
import { Receipt } from './interfaces/receipt.interface';
import { GetPointsService } from './get-points/get-points.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Receipts Award-Points Service')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly memoryStorageService: MemoryStorageService,
    private readonly getPointsService: GetPointsService,
  ) {}

  //*********************** HEALTH TEST  *************************//
  @ApiOperation({ summary: 'Test API initial response' })
  @Get()
  @ApiResponse({ status: 200, description: 'Hello World!' })
  getHello(): string {
    return this.appService.getHello();
  }

  //*********************** FIND BY ID  *************************//
  @ApiOperation({ summary: 'Find a simple receipt by Id' })
  @Get('/receipts/:id')
  @ApiParam({ name: 'id', description: 'Receipt id' })
  @ApiResponse({
    status: 200,
    description: 'A receipt was found',
    type: Receipt,
  })
  getReceiptById(@Param('id') id: string): Receipt {
    return this.memoryStorageService.getData(id);
  }

  //*********************** PROCESS RECEIPT  *************************//
  @ApiOperation({ summary: 'Process Receipts' })
  @Post('/receipts/process')
  @ApiBody({ type: Receipt })
  @ApiResponse({ status: 200, description: `{id: 'uuid'}` })
  processReceipt(@Body() data: Receipt): object {
    return this.memoryStorageService.storeData(data);
  }

  //*********************** GET POINTS FOR RECEIPT  *************************//
  @ApiOperation({ summary: 'Get Points' })
  @Get('/receipts/:id/points')
  @ApiParam({ name: 'id', description: 'Receipt id' })
  @ApiResponse({ status: 200, description: `{points: '50'}` })
  calculateReceiptPoints(@Param('id') id: string): string {
    return this.getPointsService.findReceiptAndCalculatePoints(id);
  }
}
