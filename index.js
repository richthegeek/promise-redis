const redis = require('redis');
const list = require('redis-commands').list;
const promisify = require('util').promisify;

module.exports = (target = redis) => {
  const multi = target.Multi.prototype;
  const client = target.RedisClient.prototype;

  list.filter((cmd) => {
    return cmd !== 'multi' && 'function' === typeof client[cmd];
  }).forEach((cmd) => {
    client[cmd] = promisify(client[cmd]);
    client[cmd.toUpperCase()] = client[cmd];
  });

    // For Multi only `exec` command returns promise.
  multi.exec_transaction = promisify(multi.exec_transaction);
  multi.exec = multi.exec_transaction;
  multi.EXEC = multi.exec;

  return target;
};
