import {
  BadRequestException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';

export class ReceiptNotFound extends NotFoundException {
  constructor() {
    super('RECEIPT.NOT_FOUND!');
  }
}

export class InvalidUUID extends BadRequestException {
  constructor() {
    super('UUID.INVALID_FORMAT!');
  }
}

export class InvalidDate extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
