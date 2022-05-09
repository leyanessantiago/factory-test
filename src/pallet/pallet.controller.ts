import { Body, Controller, Post } from '@nestjs/common';
import { PalletService } from './pallet.service';
import { PalletPriceDto } from './dto/pallet-price.dto';

export interface PriceResponse {
  cost: number; // cost from pricing API
  provider: string; // provider from pricing API
  pallets: number;
}

@Controller('price')
export class PalletController {
  constructor(private readonly palletService: PalletService) {}

  @Post()
  price(@Body() palletPriceDto: PalletPriceDto): Promise<PriceResponse> {
    return this.palletService.palletPrice(palletPriceDto);
  }
}
