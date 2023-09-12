import Elysia from "elysia";

const deployment = new Elysia()
    .post('/deployment', () => "Hello Discord", {detail: {deprecated: false, tags: ["Discord"]}})

export default deployment;