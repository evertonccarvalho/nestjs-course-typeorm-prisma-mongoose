import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tags.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configSerice: ConfigService) => {
        return {
          type: 'postgres',
          host: configSerice.get('DB_HOST'),
          port: Number(configSerice.get('DB_PORT')),
          username: configSerice.get('DB_USER'),
          password: configSerice.get('DB_PASS'),
          database: configSerice.get('DB_NAME'),
          entities: [Course, Tag],
          synchronize: false,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
