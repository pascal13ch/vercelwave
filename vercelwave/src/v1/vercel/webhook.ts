import Elysia from "elysia";

const vercel = new Elysia()
    .get('/webhook', () => "Hello Vercel")

export default vercel;