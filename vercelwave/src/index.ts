import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import v1 from "./v1/group"

const app = new Elysia()
                  .get("/", () => "OK")
                  .use(v1)
                  .use(swagger({path: '/swagger', documentation: {
                    info: {
                      title: "VercelWave API",
                      version: '1.0.0'
                    }
                  }}))
                  .listen(3000);

console.log(
  `🚀 VercelWave is running at ${app.server?.hostname}:${app.server?.port}`
);
