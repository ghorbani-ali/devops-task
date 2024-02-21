const {Pool} = require('pg')
const config = require('./config')

const pool = new Pool({
    user: config.pg.pgUser,
    host: config.pg.pgHost,
    database: config.pg.pgDatabase,
    password: config.pg.pgPassword,
    port: config.pg.pgPort
})
pool.on('connect', async client => {
    client.query(`create table if not exists ${config.pg.pgSchema}.test (id   integer generated always as identity constraint test_pk primary key, date timestamp not null);`);
})

async function insertDate(date) {
    try {
        let param = [date]
        let query = `insert into test (date) values ($1) returning id;`
        let {rows} = await pool.query(query, param)
        if (rows[0]) {
            return rows[0].id
        } else {
            return null
        }
    } catch (error) {
        console.log('db-error', error)
    }
}

module.exports = {insertDate}