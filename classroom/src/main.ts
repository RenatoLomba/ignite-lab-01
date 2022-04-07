import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Listening to Kafka messaging
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
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
