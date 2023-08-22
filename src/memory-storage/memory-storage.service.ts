import { Injectable } from '@nestjs/common';
import { v4 as uuid_v4, validate } from 'uuid';
import { Receipt } from '../interfaces/receipt.interface';
import { InvalidUUID, ReceiptNotFound } from 'src/exceptions/exceptions';

@Injectable()
export class MemoryStorageService {
  private storage = new Map();

  storeData(data: Receipt): object {
    const id = uuid_v4();
    this.storage.set(id, { id, ...data });
    return { id: id };
  }

  getData(id: string): Receipt {
    if (!validate(id)) throw new InvalidUUID();

    const receipt = this.storage.get(id);
    if (!receipt) throw new ReceiptNotFound();

    return receipt;
  }
}
