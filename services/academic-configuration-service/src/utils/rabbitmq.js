import amqp from "amqplib";

let connection;
let channel;

export const connectRabbitMQ = async () => {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();
    console.log("RabbitMQ connected");
    return channel;
  } catch (err) {
    console.error("RabbitMQ connection error:", err);
    throw err;
  }
};

export const publishMessage = async (queue, message) => {
  try {
    if (!channel) {
      channel = await connectRabbitMQ();
    }
    await channel.assertQueue(queue, {
      durable: true,
    });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log(`Message published to queue ${queue}:`, message);
  } catch (err) {
    console.error("Error In Publishing Message:", err);
  }
};

export const consumeMessage = async (queue, callback)=> {
  try {
    if (!channel) {
      channel = await connectRabbitMQ();
    }
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log(`Message received from queue ${queue}:`, message);

        callback(message);

        channel.ack(msg);
      }
    });
    console.log("Waiting for messages in queue:", queue);
  } catch (error) {
    console.error("Error In Consuming Message:", error);
  }
};
