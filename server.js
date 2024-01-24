/** import amqplib module */
const amqplib = require("amqplib");
/** define a queue name for RabbitMQ */
const queueName = "rpc";
/** import uuid module */
const { v4: uuidV4 } = require("uuid");

async function processTask() {
	/** connect to RabbitMQ server running on localhost */
	const connection = await amqplib.connect("amqp://localhost:5672");
	/** create a channel for communicating with RabbitMQ */
	const channel = await connection.createChannel();
	/** declare a unique and exclusive queue */
	await channel.assertQueue(queueName);
	/** print a notice message in terminal */
	console.log("waiting for new task to process...");
	/** listen to assertedQueue's queue for receiving data from it if there was any data income */
	channel.consume(queueName, (msg) => {
		/** print received data in terminal */
		console.log("received:", msg.content.toString());
		/** convert received data to number */
		const data = parseInt(msg.content.toString());
		let temp = 0;
		for (let i = 1; i <= data; i++) {
			temp += data * i;
		}
		/** send replay to the request received through the queue */
		channel.sendToQueue(msg.properties.replyTo, Buffer.from(temp.toString()), {
			correlationId: msg.properties.correlationId,
		});
		/** mark the received message as processed and done */
		channel.ack(msg);
	});
}

processTask()
	.then(() => {})
	.catch((err) => console.error(err));
