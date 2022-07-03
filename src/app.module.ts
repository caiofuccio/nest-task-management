import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TasksModule } from './tasks/tasks.module';

console.log(process.env);
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_CONNECTION_TYPE as 'postgres',
      host: process.env.DB_CONNECTION_HOST,
      port: +process.env.DB_CONNECTION_PORT,
      username: process.env.DB_CONNECTION_USERNAME,
      password: process.env.DB_CONNECTION_PASSWORD,
      database: process.env.DB_CONNECTION_DATABASE,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
