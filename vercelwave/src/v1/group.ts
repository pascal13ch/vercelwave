import Elysia from "elysia";


import vercel from "./vercel/vercel";

const v1 = new Elysia({ prefix: 'v1'})
    .use(vercel);    


export default v1;