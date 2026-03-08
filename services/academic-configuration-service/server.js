import app from "./src/app.js";

import { env } from "./src/config/env.js";
import { connectToDB } from "./src/config/db.js";
import { connectRabbitMQ } from "./src/utils/rabbitmq.js";

await connectToDB();
await connectRabbitMQ();

app.listen(env.PORT, () => {
  console.log(`Academic Configuration Server running on port: ${env.PORT}`);
});
