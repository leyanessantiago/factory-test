import { Injectable } from '@nestjs/common';
import { PalletPriceDto } from './dto/pallet-price.dto';
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { PriceResponse } from './pallet.controller';

const LONGER_SIDE = 1200;
const SHORTER_SIDE = 1000;

const QUARTER_HEIGHT = 600;
const HALF_HEIGHT = 1000;
const FULL_HEIGHT = 1800;

type RemainingArea = { longer: number; shorter: number }[][];

interface PricingRequest {
  countryCode: 'GB';
  postalCode: 'PE20 3PW';
  pallets: 'quarter' | 'half' | number;
}

export interface PricingResponse {
  provider: string;
  description: string;
  totalCost: {
    value: number;
    currency: string;
  };
}

@Injectable()
export class PalletService {
  palletPrice(palletPriceDto: PalletPriceDto) {
    // const sortedParts = this.sortRectangles(palletPriceDto.parts, false);
    //
    // let remainingArea: RemainingArea = [
    //   [{ longer: LONGER_SIDE, shorter: SHORTER_SIDE }],
    // ];
    // let remainingHeight = FULL_HEIGHT;
    // let pallets = sortedParts.length ? 1 : 0;
    // for (let i = 0; i < sortedParts.length && remainingHeight > 0; i++) {
    //   const part = sortedParts[i];
    //   const longerSide = part[0] >= part[1] ? part[0] : part[1];
    //   const shorterSide = part[0] <= part[1] ? part[0] : part[1];
    //   for (let j = 0; j < remainingArea.length; j++) {
    //     if (
    //       remainingArea[j].longer >= longerSide &&
    //       remainingArea[j].shorter >= shorterSide
    //     ) {
    //       const a = remainingArea[j][0] - longerSide;
    //       const b = remainingArea[j][1] - shorterSide;
    //       if (a > 0 && b > 0) {
    //         const rect1 = [a, shorterSide].sort((a, b) => b - a);
    //         const rect2 = [b, remainingArea[j][0]].sort((a, b) => b - a);
    //
    //         remainingArea[j] = rect1;
    //         remainingArea.push(rect2);
    //         remainingArea = this.sortRectangles(remainingArea);
    //       } else if (a === 0 && b === 0) {
    //         remainingArea.splice(j, 1);
    //       } else if (a > 0) {
    //         remainingArea[j] = [a, shorterSide].sort((a, b) => b - a);
    //       } else {
    //         remainingArea[j] = [b, remainingArea[j][0]].sort((a, b) => b - a);
    //       }
    //       break;
    //     }
    //   }
    //   if (remainingArea.length === 0) {
    //     remainingHeight -= 10;
    //     remainingArea = [[LONGER_SIDE, SHORTER_SIDE]];
    //   }
    //   if (remainingHeight === 0 && sortedParts.length > i + 1) {
    //     pallets++;
    //     remainingHeight = FULL_HEIGHT;
    //   }
    // }

    return axios({
      method: 'post',
      url: 'http://localhost:3000/getprice/pallet',
      data: {
        countryCode: 'GB',
        postalCode: 'PE20 3PW',
        pallets: 2,
      },
    }).then((pricing: AxiosResponse<PricingResponse>) => {
      return {
        cost: pricing.data.totalCost.value,
        provider: pricing.data.provider,
        pallets: 2,
      };
    });
  }

  sortRectangles(rectangles: number[][], asc = true) {
    return rectangles.sort((a, b) => {
      const largerA = a[0] > a[1] ? a[0] : a[1];
      const largerB = b[0] > b[1] ? b[0] : b[1];
      if (asc) {
        return largerA - largerB;
      }
      return largerB - largerA;
    });
  }
}
