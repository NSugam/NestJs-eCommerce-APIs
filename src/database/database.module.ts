import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (ConfigService: ConfigService) => ({
                type: 'postgres',
                host: ConfigService.get('DB_HOST'),
                port: ConfigService.get('DB_PORT'),
                database: ConfigService.get('DB_DATABASE'),
                username: ConfigService.get('DB_USERNAME'),
                password: ConfigService.get('DB_PASSWORD'),
                autoLoadEntities: true,
                synchronize: true
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule { }
