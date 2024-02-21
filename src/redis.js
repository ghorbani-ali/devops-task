const redis = require('redis')
const config = require('./config')

const redisClient = redis.createClient({url: `${config.redis.url}`});

(async () => {
    redisClient.on("error", (error) => console.error(`Error : ${error}`));
    await redisClient.connect();
})();

const REDIS_PREFIX = 'test:';

async function redisSetKey(key, value, expireSeconds = null) {
    const jVal = JSON.stringify(value)

    if (expireSeconds) {
        await redisClient.set(REDIS_PREFIX + key, jVal, {NX: true, EX: expireSeconds})
    } else {
        await redisClient.set(REDIS_PREFIX + key, jVal)
    }
    console.log("redisSetKey:", REDIS_PREFIX + key, value)

}

module.exports = {redisSetKey, redisClient}