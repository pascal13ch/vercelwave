import Elysia from "elysia";

import DiscordWebhook from "discord-webhook-ts";
import { brotliDecompressSync } from "zlib";

const discordClient = new DiscordWebhook(process.env.WEBHOOK_URL);


const vercel = new Elysia()
    .post('/webhook', ({body}) => {
        console.log(body);
        switch(body.payload.type) {
            case "deployment.created": {
                discordClient.execute({
                    "author": {
                        "name": `Deployment ${body.payload.deployment.id} created`,
                        "url": `${body.payload.deployment.inspectorUrl}`,
                        "icon_url": "blob:https://vercel.com/3350cdaf-648d-4370-a0dc-f6b7a24217d3"
                    },
                    "title": `VercelWave`,
                    "url": "",
                    "description": `A new ${body.payload.deployment.name} has been triggered`,
                    "timestamp": `${body.payload.createdAt}`,
                    "fields": [
                        {
                          "name": "Location",
                          "value": `${body.payload.deployment.regions[0]}`,
                          "inline": true
                        },
                        {
                          "name": "Target",
                          "value": `${body.payload.deployment.target}`,
                          "inline": true
                        },
                        {
                          "name": "URL",
                          "value": `[TargetURL](${body.payload.deployment.url})`,
                          "inline": true
                        }
                    ],
                })
                break;
            }

            case "deployment.succeeded": {
                discordClient.execute({
                    "author": {
                        "name": `Deployment ${body.payload.deployment.id} created`,
                        "url": `${body.payload.deployment.inspectorUrl}`,
                        "icon_url": "blob:https://vercel.com/3350cdaf-648d-4370-a0dc-f6b7a24217d3"
                    },
                    "title": `VercelWave`,
                    "url": "",
                    "description": `${body.payload.deployment.name} has been passed`,
                    "timestamp": `${body.payload.createdAt}`,
                    "fields": [
                        {
                          "name": "Location",
                          "value": `${body.payload.deployment.regions[0]}`,
                          "inline": true
                        },
                        {
                          "name": "Target",
                          "value": `${body.payload.deployment.target}`,
                          "inline": true
                        },
                        {
                          "name": "URL",
                          "value": `[URL](${body.payload.deployment.url})`,
                          "inline": true
                        }
                    ],
                })
                break;
                break;
            }

            default: {
                console.log(`[VercelWave]: No Discord Webhook found for ${body.payload.type}`)
            }
        }
        
    }, {detail: {deprecated: false, tags: ["Vercel"]}})

export default vercel;