import Elysia from "elysia";

import deployment from "./deployment";
import promote from "./promote";

const discord = new Elysia({prefix: '/discord'})
    .use(deployment)
    .use(promote)

export default discord;