import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();
 
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, }))
  const config = new DocumentBuilder()
    .setTitle('Documentação da API Nanogram')
    .setDescription(
      'Documentação destinada a descrever usos e rotas especificadas pela API a ser consumida pelo Frontend da aplicação nanogram',
    )
    .setVersion('1.0')
    .addTag('users')
    .addTag('auth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
