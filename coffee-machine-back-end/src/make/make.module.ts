import { Module } from '@nestjs/common';
import { MakeController } from './make.controller';
import { CoffeeConsumer, MakeService } from './make.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MakeSchema } from './make.model';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Make', schema:MakeSchema }]),BullModule.registerQueue({
    name: 'coffeeRequest',
  })],
  controllers: [MakeController],
  providers: [MakeService,CoffeeConsumer]
})
export class MakeModule {}
