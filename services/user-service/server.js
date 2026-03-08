import app from "./src/app.js";

import { env } from "./src/config/env.js";
import { connectToDB } from "./src/config/db.js";
import { connectRabbitMQ } from "./src/utils/rabbitmq.js";
import { createSuperAdminIfNotExists } from "./src/bootstrap/superAdmin.bootstrap.js";

await connectToDB();
await createSuperAdminIfNotExists();
await connectRabbitMQ();

app.listen(env.PORT, () => {
    console.log(`User Server running on port: ${env.PORT}`);
});
