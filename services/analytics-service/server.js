import app from "./src/app.js";

import { env } from "./src/config/env.js";
import { connectRabbitMQ } from "./src/utils/rabbitmq.js";

await connectRabbitMQ();

app.listen(env.PORT, () => {
    console.log(`Analytics Server running on port: ${env.PORT}`);
});