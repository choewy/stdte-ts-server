import { ValueTransformer } from 'typeorm';

export class Base64ValueTransformer implements ValueTransformer {
  from(base64: string | null) {
    if (base64 === undefined || base64 === null) {
      return null;
    }

    if (typeof base64 === 'object') {
      return base64;
    }

    return JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));
  }

  to(value: string | object | null): string | null {
    if (value === undefined || value === null) {
      return null;
    }

    if (typeof value === 'object') {
      if (Object.keys(value).length === 0) {
        return null;
      }

      return Buffer.from(JSON.stringify(value), 'utf8').toString('base64');
    }

    if (value.length === 0) {
      return null;
    }

    return Buffer.from(value, 'utf8').toString('base64');
  }
}
