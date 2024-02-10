import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({transform:true}))  
  await app.listen(3000);
// get all route
//   const server = app.getHttpServer();
//   const router = server._events.request._router;
//   console.log( {
//     routes: router.stack
//         .map(layer => {
//             if(layer.route) {
//                 const path = layer.route?.path;
//                 const method = layer.route?.stack[0].method;
//                 return `${method.toUpperCase()} ${path}`
//             }
//         })
//         .filter(item => item !== undefined)
// });
}
bootstrap();
