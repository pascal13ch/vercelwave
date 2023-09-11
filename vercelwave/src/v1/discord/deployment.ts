import Elysia from "elysia";

const deployment = new Elysia()
    .get('/deployment', () => "Hello Discord")

export default deployment;