import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_LINK)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log("Server running on port http://localhost:" + port);
    });
  })
  .catch(console.error);
