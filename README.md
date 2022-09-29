## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Creating subscription

[creating subscription img](imgs/creating_post_to_trigger_subscription_2022-09-11_22-33-50.png)

Creating post to trigger subscription with filters

[triggering subscription](imgs/creating_post_to_trigger_subscription_2022-09-11_22-33-50.png)

Getting results in redis by subscribing to the **createdAt** channel

[redis createdAt channel](imgs/redis_createdAt_channel_2022-09-11_22-40-10.png)
