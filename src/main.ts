import { NestFactory } from '@nestjs/core';
import { AppModule } from './infrastructure/modules/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { configService } from './infrastructure/config/config.service';
import { TransformResponseInterceptor } from './infrastructure/http/interceptors/transform-response.interceptor';

async function bootstrap() {
    const port = configService.getValue('PORT') || 8000;
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('my-nest-template');
    app.useGlobalInterceptors(new TransformResponseInterceptor());

    const swaggerConfig = new DocumentBuilder()
        .setTitle('my-nestjs-template')
        .setDescription('My Nest Template API')
        .setVersion('1.0')
        .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api', app, swaggerDocument, {
        useGlobalPrefix: true,
    });

    await app.listen(port);
}

bootstrap();
