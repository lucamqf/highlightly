import { Environment } from "./infra/config/env";
import makeApp from "./infra/config/server";

process.env.TZ = "UTC";

const makeServer = async () => {
  const app = await makeApp();

  app.listen(Environment.infrastructure.server.port, () => {
    console.info({
      message: `Server running on port ${Environment.infrastructure.server.port}!`,
    });
  });
};

makeServer();
