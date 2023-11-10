import expressBasicAuth from 'express-basic-auth';
import { Request, Response, NextFunction } from 'express';

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';

import { ExpressBasicAuthConfig } from './common';

export class AppSwagger {
  constructor(private readonly app: INestApplication) {}

  private build(): Omit<OpenAPIObject, 'paths'> {
    return new DocumentBuilder().setTitle('STDTE TS APIs').build();
  }

  private document(config: Omit<OpenAPIObject, 'paths'>): OpenAPIObject {
    return SwaggerModule.createDocument(this.app, config);
  }

  public setup(path: string): void {
    path = path.startsWith('/') ? path : `/${path}`;

    const expressBasicAuthConfig = new ExpressBasicAuthConfig();
    const expressBasicAuthOptions = expressBasicAuthConfig.getExpressBasicAuthOptions();
    const expressBasicRequestHandler = expressBasicAuth(expressBasicAuthOptions);

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      req.path.startsWith(path) ? expressBasicRequestHandler(req, res, next) : next();
    });

    const swaggerDocument = this.document(this.build());
    const swaggerOptions: SwaggerUiOptions = { defaultModelsExpandDepth: 0 };

    SwaggerModule.setup(path, this.app, swaggerDocument, { swaggerOptions });
  }
}
