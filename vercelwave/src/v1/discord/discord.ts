import Elysia from "elysia";

import deployment from "./deployment";

const discord = new Elysia({prefix: '/discord'})
    .use(deployment);

export default discord;