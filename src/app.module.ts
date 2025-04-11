import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local', // this loads .env.local instead of default .env
      isGlobal: true
    }),
    TypeOrmModule.forFeature([User]),
    DatabaseModule, UsersModule, ProductsModule, CartModule
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .exclude(
        { path: 'user/login', method: RequestMethod.POST },
        { path: 'user/register', method: RequestMethod.POST },
        { path: 'product/all', method: RequestMethod.GET },
      )
      .forRoutes('/*path')
  }
}
