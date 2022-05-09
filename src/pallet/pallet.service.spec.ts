import { Test, TestingModule } from '@nestjs/testing';
import { PalletService } from './pallet.service';
import { PalletPriceDto } from './dto/pallet-price.dto';

describe('PalletService', () => {
  let service: PalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PalletService],
    }).compile();

    service = module.get<PalletService>(PalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the parts in descending', () => {
    const parts = [
      [100, 20],
      [900, 450],
      [340, 80],
    ];

    const sortedParts = [
      [900, 450],
      [340, 80],
      [100, 20],
    ];

    expect(service.sortRectangles(parts, false)).toEqual(sortedParts);
  });

  it('should return the parts in ascending', () => {
    const parts = [
      [100, 500],
      [900, 450],
      [340, 80],
    ];

    const sortedParts = [
      [340, 80],
      [100, 500],
      [900, 450],
    ];

    expect(service.sortRectangles(parts)).toEqual(sortedParts);
  });

  it('should return the number of needed pallets', () => {
    const example: PalletPriceDto = {
      parts: [
        [100, 20],
        [900, 450],
      ],
    };

    for (let i = 0; i < 100; i++) {
      example.parts.push([600, 500]);
    }

    for (let i = 0; i < 79; i++) {
      example.parts.push([300, 900]);
    }

    expect(service.palletPrice(example)).toBe(1);
  });
});
