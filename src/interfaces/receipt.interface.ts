import { ApiProperty } from '@nestjs/swagger';
import { Item } from './item.interface';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';
import { v4 as uuid_v4 } from 'uuid';

export class Receipt {
  @ApiProperty({ example: uuid_v4() })
  @IsString()
  @IsOptional()
  id?: string;

  @ApiProperty({ example: 'Starbucks' })
  @IsString()
  @IsNotEmpty()
  retailer: string;

  @ApiProperty({ example: '2023-08-21' })
  @IsString()
  @IsNotEmpty()
  purchaseDate: string;

  @ApiProperty({ example: '14:35' })
  @IsString()
  @IsNotEmpty()
  purchaseTime: string;

  @ApiProperty({ example: '35.25' })
  @IsString()
  @IsNotEmpty()
  total: string;

  @ApiProperty({
    example: [
      {
        shortDescription: 'Mountain Dew 12PK',
        price: '6.49',
      },
      {
        shortDescription: 'Emils Cheese Pizza',
        price: '12.25',
      },
      {
        shortDescription: 'Knorr Creamy Chicken',
        price: '1.26',
      },
      {
        shortDescription: 'Doritos Nacho Cheese',
        price: '3.35',
      },
      {
        shortDescription: '   Klarbrunn 12-PK 12 FL OZ  ',
        price: '12.00',
      },
    ],
  })
  @IsArray()
  @IsNotEmpty()
  items: Item[];
}
