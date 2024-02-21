const amqp = require('amqplib/callback_api');
const config = require('./config')
const pq = require('./pg')


const rabbitProtocol = config.rabbitConfig.protocol;
const rabbitUrl = config.rabbitConfig.url;
const rabbitUsername = config.rabbitConfig.username;
const rabbitPassword = config.rabbitConfig.password;
const rabbitVHost = config.rabbitConfig.vHost;
const rabbitQueue = config.rabbitConfig.queue;

amqp.connect(`${rabbitProtocol}://${rabbitUsername}:${rabbitPassword}@${rabbitUrl}/${rabbitVHost}`, function (error0, connection) {
    if (error0) {
        console.log('[x][x] Error : ', error0.message);
    }
    connection.on("error", function (err) {
        if (err.message !== "Connection closing") {
            console.log("[x][x] Error : connection error", err.message);
        }
    });
    connection.on("close", function () {
        console.log("[x][x] Error : reconnecting");
    });

    console.log("[x][x] amqp : connected");

    connection.createChannel(function (error1, channel) {
        if (error1) {
            console.log('[x][x] Channel Error : ', error1.message);
        }
        channel.on("error", function (err) {
            console.log("[x][x] Channel Error : ", err.message);
        });
        channel.on("close", function () {
            console.log("[x][x] Channel Error : channel closed");
        });

        const queue = rabbitQueue;

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Waiting for messages in %s.", queue);

        channel.consume(queue, async function (msg) {
            try {
                let message = JSON.parse(msg.content.toString())
                let type = message.type
                if (type === 'date') {
                    let date = message.date;
                    await pq.insertDate(date);
                }
            } catch (err) {
                console.log(err)
            }
        }, {
            noAck: true
        });
    });
});
