import { InjectDataSource } from '@nestjs/typeorm';

import { TypeOrmConnection } from '../constants';

export const InjectWriterDataSource = () => InjectDataSource(TypeOrmConnection.Writer);
export const InjectReaderDataSource = () => InjectDataSource(TypeOrmConnection.Reader);
