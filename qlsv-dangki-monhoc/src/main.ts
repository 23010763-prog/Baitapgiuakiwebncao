import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

const port = Number(process.env.PORT ?? 3000);

async function isAppAlreadyRunning(): Promise<boolean> {
  try {
    const response = await fetch(`http://127.0.0.1:${port}/`, {
      signal: AbortSignal.timeout(1000),
    });
    return (
      response.ok &&
      (await response.text()) === 'QLSV Dang Ky Mon Hoc API is running'
    );
  } catch {
    return false;
  }
}

async function bootstrap() {
  if (await isAppAlreadyRunning()) {
    console.log(`QLSV API is already running at http://localhost:${port}`);
    return;
  }

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(port);
}
await bootstrap();
