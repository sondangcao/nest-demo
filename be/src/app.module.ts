import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guard';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'ep-sweet-tooth-a2y9mxhy.eu-central-1.pg.koyeb.app',
      port: 3306,
      username: 'koyeb-adm',
      password: 'npg_Ir4SgT1sWOpy',
      database: 'tutorialdb',
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'dangcaoson',
      // database: 'tutorial_db',
      entities: [User],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
