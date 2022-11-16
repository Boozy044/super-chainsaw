import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class OrmConfigService implements TypeOrmOptionsFactory {
    constructor(
        private readonly config: ConfigService,
    ) { }

    public createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'postgres',
            host: this.config.get<string>('HOST'),
            port: this.config.get<number>('PORT'),
            username: this.config.get<string>('USERNAME'),
            password: this.config.get<string>('PASSWORD'),
            database: this.config.get<string>('DATABASE'),
            entities: ['dist/modules/**/*.entity.{ts,js}'],
            migrations: ['dist/core/database/migrations/*.{ts,js}'],
            migrationsTableName: 'typeorm_migrations',
            autoLoadEntities: true,
            synchronize: true,
            logging: true
        }
    }
}