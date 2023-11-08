import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class AppSwagger {
  constructor(private readonly app: INestApplication) {}

  private build(): Omit<OpenAPIObject, 'paths'> {
    return new DocumentBuilder().setTitle('STDTE TS APIs').build();
  }

  private document(config: Omit<OpenAPIObject, 'paths'>): OpenAPIObject {
    return SwaggerModule.createDocument(this.app, config);
  }

  public setup(path: string): void {
    const config = this.build();
    const document = this.document(config);

    SwaggerModule.setup(path, this.app, document);
  }
}
