import { DataSource, DeepPartial, EntityManager, In, Not, UpdateResult } from 'typeorm';

import { BaseQuery, Order } from '../constants';
import { HttpRequestLog } from '../entities';

export class HttpRequestLogQuery extends BaseQuery<HttpRequestLog> {
  public static of(source: DataSource | EntityManager) {
    return new HttpRequestLogQuery(source.getRepository(HttpRequestLog));
  }

  async findAndCountHttpRequestLogs(
    userId: number,
    skip = 0,
    take = 20,
    methods: string[] = [],
    statusCodes: number[] = [],
    order: Order = Order.Desc,
  ): Promise<[HttpRequestLog[], number]> {
    return this.repository.findAndCount({
      relations: { user: true },
      where: {
        user: { id: Not(userId) },
        method: methods.length > 0 ? In(methods) : undefined,
        statusCode: statusCodes.length > 0 ? In(statusCodes) : undefined,
      },
      order: { createdAt: order === Order.Desc ? 'DESC' : 'ASC' },
      skip,
      take,
    });
  }

  async saveHttpRequestLog(httpRequestLog: DeepPartial<HttpRequestLog>): Promise<HttpRequestLog> {
    return this.repository.save(this.repository.create(httpRequestLog));
  }

  async updateHttpRequestLog(id: string, httpRequestLog: DeepPartial<HttpRequestLog>): Promise<UpdateResult> {
    return this.repository.update(id, httpRequestLog);
  }
}
