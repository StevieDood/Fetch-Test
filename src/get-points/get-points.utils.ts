// **** GET POINTS UTILITIES ****

import { Item } from 'src/interfaces/item.interface';
import { DateTime } from 'luxon';
import { InvalidDate } from 'src/exceptions/exceptions';

export const checkAlphanumericCharactersAndReturnPoints = (
  str: string,
): number => {
  const alphanumericRegex = /[a-zA-Z0-9]/g;
  const matches = str.match(alphanumericRegex);
  return matches ? matches.length : 0;
};

export const checkTotalAndReturnPoints = (str: string): number => {
  const strToNumber = Number(str);

  const roundAmountPoints = Number.isInteger(strToNumber) ? 50 : 0;
  const multipleOfDot25Points = strToNumber % 0.25 === 0 ? 25 : 0;

  const totalPoints = roundAmountPoints + multipleOfDot25Points;

  return totalPoints;
};

const calculateDescriptionsPoints = (items: Item[]): number => {
  const descriptionPoints = items.reduce((points, item) => {
    const trimmedDescriptionLength = item.shortDescription.trim().length;
    if (trimmedDescriptionLength % 3 === 0) {
      return (points += Math.ceil(Number(item.price) * 0.2));
    }
    return points;
  }, 0);

  return descriptionPoints;
};

export const checkItemsAndReturnPoints = (items: Item[]): number => {
  const totalItemsPairs = Math.floor(items.length / 2);

  const itemsPairsPoints = totalItemsPairs * 5;

  const itemsDescriptionsPoints = calculateDescriptionsPoints(items);

  const totalPoints = itemsPairsPoints + itemsDescriptionsPoints;

  return totalPoints;
};

export const checkDateAndReturnPoints = (
  date: string,
  hour: string,
): number => {
  const concatenatedDate = date.concat('T', hour);
  const purchaseDate = DateTime.fromISO(concatenatedDate);

  if (!purchaseDate.isValid)
    throw new InvalidDate(purchaseDate.invalidExplanation, 400);

  const purchaseDateDay = purchaseDate.day;
  const pointsForBeingOdd = purchaseDateDay % 2 === 0 ? 0 : 6;

  const startHour = DateTime.fromISO(`${date}T14:00`);
  const endHour = DateTime.fromISO(`${date}T16:00`);
  const pointsForBeingBetween14And16Pm =
    purchaseDate >= startHour && purchaseDate <= endHour ? 10 : 0;

  const totalPoints = pointsForBeingOdd + pointsForBeingBetween14And16Pm;

  return totalPoints;
};
