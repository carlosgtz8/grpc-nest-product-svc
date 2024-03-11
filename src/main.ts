import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { INestMicroservice, Logger, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { protobufPackage } from './product/product.pb';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: process.env.PRODUCT_SERVICE_URL,
        package: protobufPackage,
        protoPath: join('node_modules/grpc-nest-proto/proto/product.proto'),
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
  logger.log(`Microservice running on ${process.env.PRODUCT_SERVICE_URL}`);
}
bootstrap();
