/** import amqplib module */
const amqplib = require("amqplib");
/** define a queue name for RabbitMQ */
const queueName = "rpc";
/** extract args from process */
const args = process.argv.slice(2);
/** import uuid module */
const { v4: uuidV4 } = require("uuid");
/** create an instants from uuid v4 */
const uuid = uuidV4();

async function sendTaskToProcess() {
	/** connect to RabbitMQ server running on localhost */
	const connection = await amqplib.connect("amqp://localhost:5672");
	/** create a channel for communicating with RabbitMQ */
	const channel = await connection.createChannel();
	/** declare a unique and exclusive queue */
	const assertedQueue = await channel.assertQueue("", { exclusive: true });
	/** send the received value to RabbitMQ queue */
	await channel.sendToQueue(queueName, Buffer.from(args[0]), {
		replyTo: assertedQueue.queue,
		correlationId: uuid,
	});
	/** listen to assertedQueue's queue for receiving data from it if there was any data income */
	channel.consume(assertedQueue.queue, (msg) => {
		if (msg.properties.correlationId === uuid) {
			console.log("process ended:", msg.content.toString());
			setTimeout(() => {
				process.exit(0);
			}, 1000);
		}
	});
}

sendTaskToProcess()
	.then(() => {})
	.catch((err) => console.error(err));
