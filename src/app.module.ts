import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PalletModule } from './pallet/pallet.module';

@Module({
  imports: [PalletModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
