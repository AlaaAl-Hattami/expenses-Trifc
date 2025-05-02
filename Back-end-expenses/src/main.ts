// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //هذا استخدمته لربط مع الفرونت اند لانه يعملوا مع بورتين مخلتفين
  app.enableCors({
    origin: 'http://localhost:5173',
  });

  await app.listen(3000);
}
bootstrap();
