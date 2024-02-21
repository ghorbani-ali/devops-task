require('dotenv').config();

const env = process.env;

const redis = {
    url: env.REDIS_URL
}

const pg = {
    pgUser: env.PGUSER,
    pgHost: env.PGHOST,
    pgDatabase: env.PGDATABASE,
    pgPassword: env.PGPASSWORD,
    pgPort: env.PGPORT,
    pgSchema: env.PGSCHEMA,
}

let rabbitConfig = {
    protocol: env.RABBIT_PROTOCOL,
    url: env.RABBIT_URL,
    username: env.RABBIT_USERNAME,
    password: env.RABBIT_PASSWORD,
    vHost: env.RABBIT_V_HOST,
    queue: env.RABBIT_QUEUE
}

module.exports = {pg, redis, rabbitConfig}