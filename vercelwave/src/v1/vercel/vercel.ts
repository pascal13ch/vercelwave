import Elysia from "elysia";

import webhook from "./webhook";

const vercel = new Elysia({prefix: '/vercel'})
    .use(webhook);

export default vercel;