import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/dwiki'),
    AdminModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}