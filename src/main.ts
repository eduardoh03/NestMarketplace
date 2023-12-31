import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {useContainer} from "class-validator";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
                transform: true, // automatically transform payloads to DTO instances
                whitelist: true, // remove all non-whitelisted properties
                forbidNonWhitelisted: true, // throw an error if non-whitelisted properties are present
            }
        ))
    useContainer(app.select(AppModule), {fallbackOnErrors: true})
    await app.listen(3000);
}

bootstrap();
