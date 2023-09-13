import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";

import v1 from "./v1/group"

if(!process.env.WEBHOOK_URL) {
  console.log('[AppWave]: Please specify a WEBHOOK_URL Environment Variable...')
  process.exit(1)
}

if(!process.env.CLIENT_ID) {
  console.log('[AppWave]: Please specify a CLIENT_ID Environment Variable...')
  process.exit(1)
}

if(!process.env.CLIENT_SECRET) {
  console.log('[AppWave]: Please specify a CLIENT_SECRET Environment Variable...')
  process.exit(1)
}

if(!process.env.REDIRECT_URI) {
  console.log('[AppWave]: Please specify a REDIRECT_URI Environment Variable...')
  process.exit(1)
}


console.log(`Using ${process.env.WEBHOOK_URL} as URL... `)

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
