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
import { UserModule } from './user/user.module';
import { ProfileController } from './user/business/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DP_PORT ? +process.env.DP_PORT : 21138,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'dangcaoson',
      // database: 'tutorial_db',
      entities: [User, Dish],
      synchronize: true,
    }),
    AuthModule,
    DishModule,
    UserModule,
  ],
  controllers: [AppController, DishController, ProfileController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
