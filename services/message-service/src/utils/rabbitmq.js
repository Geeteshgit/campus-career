import amqp from "amqplib";

let connection;
let channel;

export const connectRabbitMQ = async () => {
  if (channel) return channel;
  let retries = 5;
  while (retries > 0) {
    try {
      connection = await amqp.connect("amqp://rabbitmq:5672");
      channel = await connection.createChannel();
      console.log("RabbitMQ connected");
      return channel;
    } catch (err) {
      retries--;
      console.error("RabbitMQ connection error:", err);
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
};

export const publishMessage = async (exchange, message) => {
  try {
    if (!channel) {
      channel = await connectRabbitMQ();
    }
    await channel.assertExchange(exchange, "fanout", {
      durable: true,
    });
    channel.publish(exchange, "", Buffer.from(JSON.stringify(message)));
    console.log(`Message published to exchange ${exchange}:`, message);
  } catch (err) {
    console.error("Error In Publishing Message:", err);
  }
};

export const consumeMessage = async (exchange, queue, callback) => {
  try {
    if (!channel) {
      channel = await connectRabbitMQ();
    }
    await channel.assertExchange(exchange, { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, "");

    channel.consume(queue, async (msg) => {
      if (msg !== null) {
        const message = JSON.parse(msg.content.toString());
        console.log(`Message received from queue ${queue}:`, message);

        await callback(message);

        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error In Consuming Message:", error);
  }
};
