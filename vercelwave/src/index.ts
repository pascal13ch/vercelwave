import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import v1 from "./v1/group"

/*if(process.env.WEBHOOK_URL) {
  console.log('Please specify a WEBHOOK_URL Environment Variable...')
  process.exit(1)
}*/

const PORT = process.env.PORT || 3000;

const app = new Elysia()
                  .get("/", () => "OK")
                  .use(v1)
                  .use(swagger({path: '/swagger', documentation: {
                    info: {
                      title: "VercelWave API",
                      version: '1.0.0'
                    }
                  }}))
                  .listen(PORT);

console.log(
  `🚀 VercelWave is running at ${app.server?.hostname}:${app.server?.port}`
);
