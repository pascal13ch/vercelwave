import Elysia from "elysia";

const vercel = new Elysia()
    .post('/webhook', ({body}) => {
        console.log(body);
        return "Hello Vercel"
        
    }, {detail: {deprecated: false, tags: ["Vercel"]}})

export default vercel;