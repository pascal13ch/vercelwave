import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import v1 from "./v1/group"

const app = new Elysia()
                  .get("/", () => "Hello World")
                  .use(v1)
                  .use(swagger({path: '/swagger'}))
                  .listen(3000);

console.log(
  `🚀 VercelWave is running at ${app.server?.hostname}:${app.server?.port}`
);
