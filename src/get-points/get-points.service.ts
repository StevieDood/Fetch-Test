import { Injectable } from '@nestjs/common';
import { Receipt } from 'src/interfaces/receipt.interface';
import {
  checkAlphanumericCharactersAndReturnPoints,
  checkDateAndReturnPoints,
  checkItemsAndReturnPoints,
  checkTotalAndReturnPoints,
} from './get-points.utils';
import { MemoryStorageService } from 'src/memory-storage/memory-storage.service';

@Injectable()
export class GetPointsService {
  constructor(private readonly memoryStorageService: MemoryStorageService) {}

  findReceiptAndCalculatePoints(id: string): string {
    const receipt = this.memoryStorageService.getData(id);

    return this.calculatePoints(receipt);
  }

  calculatePoints(receipt: Receipt): string {
    const { retailer, purchaseDate, purchaseTime, total, items } = receipt;

    const alphanumericPoints =
      checkAlphanumericCharactersAndReturnPoints(retailer);
    const purchasePoints = checkTotalAndReturnPoints(total);
    const itemsPoints = checkItemsAndReturnPoints(items);
    const datePoints = checkDateAndReturnPoints(purchaseDate, purchaseTime);

    const totalPoints =
      alphanumericPoints + purchasePoints + itemsPoints + datePoints;

    //Just for console checks ;D
    console.log(`Total Points: ${totalPoints}
      Breakdown:
          ${alphanumericPoints} points - retailer name points
          ${purchasePoints} points from total with no cents and total is multiple of 0.25
          ${itemsPoints} points - for items pairs and description points
          ${datePoints} points - purchase day is odd and/or purchase is between after 2pm and before 4pm
        + ---------
        = ${totalPoints} points`);

    return JSON.stringify({ points: totalPoints });
  }
}
