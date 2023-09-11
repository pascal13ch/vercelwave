import Elysia from "elysia";


import vercel from "./vercel/vercel"
import discord from "./discord/discord";

const v1 = new Elysia({ prefix: 'v1'})
    .use(vercel)    
    .use(discord)


export default v1;