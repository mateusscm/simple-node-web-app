import { Knex } from "./server/database/knex";
import { server } from "./server/Server";

const startServer = () => {
  server.listen(process.env.PORT || 3333, () =>
    console.log(`Server is running on port ${process.env.PORT || 3333}`)
  );
};

if (process.env.IS_LOCALHOST !== "true") {
  Knex.migrate
    .latest()
    .then(() => {
      startServer();
    })
    .catch(console.log);
} else {
  startServer();
}
