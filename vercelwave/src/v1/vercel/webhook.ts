import Elysia from "elysia";
import sendDeploymentWebhook from "../../../webhooks/deployment";

const vercel = new Elysia()
    .post('/webhook', ({ body }) => {
        console.log(body);
        switch (body.type) {
            case "deployment.created": {
                sendDeploymentWebhook("created", body)
                break;
            }

            case "deployment.succeeded": {
                sendDeploymentWebhook("succeeded", body)
                break;
            }

            case "deployment.error": {
                sendDeploymentWebhook("error", body)
                break;
            }

            default: {
                console.log(`[VercelWave]: No Discord Webhook found for ${body.type}`)
            }
        }

        return "OK";

    }, { detail: { deprecated: false, tags: ["Vercel"] } })

export default vercel;