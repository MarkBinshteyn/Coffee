import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MakeModule } from './make/make.module';
import { BullModule } from '@nestjs/bull';
@Module({
  imports: [MongooseModule.forRoot('mongodb://mongodb:27017'), UsersModule, MakeModule, BullModule.forRoot({
    redis: {
      host: 'redis',
      port: 6379,
    },
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
