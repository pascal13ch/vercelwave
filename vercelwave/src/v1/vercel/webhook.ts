import { ok } from "assert";
import Elysia from "elysia";
import { ServerResponse } from "https";

const vercel = new Elysia()
    .post('/webhook', () => "Hello Vercel", {detail: {deprecated: false, tags: ["Vercel"]}})

export default vercel;