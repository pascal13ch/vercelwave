import Elysia from "elysia";

const promote = new Elysia()
    .post('/promote', () => "Hello Discord", {detail: {deprecated: false, tags: ["Discord"]}})

export default promote;