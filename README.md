# promise-redis-ejs

`promise-redis-ejs` is a modern (>= 8.x) fork of [promise-redis](https://github.com/maxbrieiev/promise-redis) which makes [node_redis](https://github.com/NodeRedis/node_redis) return Promises.

It uses native Promise objects and `util.promisify` for promisifacation, but allows providing an alternative client for use with [fakeredis](https://github.com/hdachev/fakeredis)


## Installation
```bash
npm install promise-redis
```

## Normal Usage
```javascript
const PromiseRedis = require('promise-redis-ejs');
const Redis = PromiseRedis();
const client = Redis.createClient();

client.keys('*').then((keys) => {
  console.log(keys);
});

(async () => {
  var keys = await client.keys('*');
  console.log(keys);
})
```

## Using FakeRedis for testing
```javascript
const FakeRedis = require('fakeredis');
const PromiseRedis = require('promise-redis-ejs');
const client = PromiseRedis(FakeRedis).createClient();

client.set('x', 'y').then(async () => {
  var keys = await client.keys('*');
  console.log(keys); // ['x']
})
```
