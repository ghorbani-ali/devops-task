const schedule = require('node-schedule');
const moment = require("moment-timezone");
const pq = require('./pg')
const redis = require('./redis')
const rabbit = require("./rabbitmq")
const fs = require('fs');
const util = require('util');
const log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
const log_stdout = process.stdout;

console.log = function(d) { //
    log_file.write(util.format(d) + '\n');
    log_stdout.write(util.format(d) + '\n');
};

schedule.scheduleJob('*/30 * * * * *', async function () {
    let date = moment().tz("Asia/Tehran").format("YYYY-MM-DD HH:mm:ss");
    await pq.insertDate(date);
    await redis.redisSetKey('date', date)
    console.log(date + ' : Syncing data...')
});