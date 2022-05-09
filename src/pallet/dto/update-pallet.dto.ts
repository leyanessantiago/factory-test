import { PartialType } from '@nestjs/mapped-types';
import { PalletPriceDto } from './pallet-price.dto';

export class UpdatePalletDto extends PartialType(PalletPriceDto) {}
