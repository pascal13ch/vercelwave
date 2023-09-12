import Elysia from "elysia";

import webhook from "./webhook";
import callback from "./callback";

const vercel = new Elysia({prefix: '/vercel'})
    .use(webhook)
    .use(callback);

export default vercel;