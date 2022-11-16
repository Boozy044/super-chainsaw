import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrmConfigService } from './database.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: OrmConfigService
        })
    ]
})
export class DatabaseModule { }
