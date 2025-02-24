import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = new DocumentBuilder()
  //     .setTitle('Cats example')
  //     .setDescription('The cats API description')
  //     .setVersion('1.0')
  //     .addTag('cats')
  //     .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  //全局启用ValidationPipe，校验请求实体参数
  // app.useGlobalPipes(new ValidationPipe({transform: true}));

  app.enableCors({origin: '*', allowedHeaders: '*', methods: '*'}); //跨域支持
  await app.listen(3001);
}
bootstrap();
