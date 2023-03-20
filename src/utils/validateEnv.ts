import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  MONGO_CONNECTION_LINK: str(),
  PORT: port(),
  SESSION_SECRET: str(),
});
