import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Listening to Kafka messaging
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: [configService.get<string>('KAFKA_BROKERS')],
      },
      producer: {
        allowAutoTopicCreation: false,
      },
    },
  });

  app.startAllMicroservices().then(() => {
    console.log('[Classroom] Microservices are running...');
  });

  app.listen(3334).then(() => {
    console.log('[Classroom] Server is running...');
  });
}
bootstrap();
