import { ComplexityPlugin } from './common/plugins/complexity';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { options } from 'data-source';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPostsModule } from './user-posts/userPosts.module';
import { LogErrOnFailure } from './common/plugins/log-err-on-failure';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        PORT: Joi.number().default(3000),
        // pg related
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        //redis related
        REDIS_PORT: Joi.number().required(),
        REDIS_HOST: Joi.string().required(),
      }),
    }),

    TypeOrmModule.forRoot({ ...options }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.{gql,graphql}'],
      playground: false,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
        outputAs: 'class',
        emitTypenameField: true,
      },

      plugins: [ApolloServerPluginLandingPageLocalDefault(), LogErrOnFailure],
      subscriptions: {
        'subscriptions-transport-ws': true,
        'graphql-ws': true,
      },
    }),
    UserPostsModule,
  ],
  controllers: [],
  providers: [ComplexityPlugin],
})
export class AppModule {}
