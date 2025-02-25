import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard';
import { User } from './auth/entity/user.entity';
import { DishController } from './dish/business/dish.controller';
import { DishModule } from './dish/dish.module';
import { Dish } from './dish/entity/dish.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DP_PORT ? +process.env.DP_PORT : 21138,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [User, Dish],
      synchronize: true,
    }),
    AuthModule,
    DishModule,
  ],
  controllers: [AppController, DishController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
