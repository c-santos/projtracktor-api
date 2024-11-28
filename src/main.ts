import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './infrastructure/config/config.service';
import { TransformResponseInterceptor } from './infrastructure/http/interceptors/transform-response.interceptor';

async function bootstrap() {
    const port = configService.getValue('PORT') || 8000;
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    app.useGlobalInterceptors(new TransformResponseInterceptor());

    const swaggerConfig = new DocumentBuilder()
        .setTitle('projtracktor API')
        .setDescription('projtracktor REST API')
        .setVersion('0.1')
        .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/docs', app, swaggerDocument, {
        useGlobalPrefix: true,
    });

    await app.listen(port);
}

bootstrap();
