import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import IoRedis, { RedisOptions } from 'ioredis';
import { REDIS_PUB_SUB } from './constants';

const RedisPubSubConnectionProvider: Provider = {
  provide: REDIS_PUB_SUB,
  useFactory: (configService: ConfigService) => {
    const port = +configService.get('REDIS_PORT');
    const host = configService.get('REDIS_HOST');

    const options: RedisOptions = {
      host,
      port,
      retryStrategy: (times: number) => {
        return Math.min(times * 50, 2000);
      },
    };

    const redisPubSub = new RedisPubSub({
      publisher: new IoRedis(options),
      subscriber: new IoRedis(options),

      // Tells RedisPubSub to register callbacks
      // on the messageBuffer and pmessageBuffer EventEmitters
      messageEventName: 'messageBuffer',
      pmessageEventName: 'pmessageBuffer',
    });

    return redisPubSub;
  },
  inject: [ConfigService],
};

export default RedisPubSubConnectionProvider;
