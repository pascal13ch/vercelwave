import Elysia from "elysia";

new Elysia()
.post('/vercel/webhooks', () => "hello vercel");