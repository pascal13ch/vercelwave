import Elysia from "elysia";

import DiscordWebhook from "discord-webhook-ts";
import { brotliDecompressSync } from "zlib";

const discordClient = new DiscordWebhook(process.env.WEBHOOK_URL);


const vercel = new Elysia()
    .post('/webhook', ({ body }) => {
        console.log(body);
        switch (body.type) {
            case "deployment.created": {
                discordClient.execute({
                    embeds: [
                        {
                            author: {
                                name: `Deployment #${String(body.payload.deployment.id)} created`,
                                url: `${String(body.payload.deployment.inspectorUrl)}`,
                                icon_url: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png"
                            },
                            title: `VercelWave`,
                            url: "",
                            description: `A new \`${String(body.payload.deployment.name)}\` Deployment has been triggered`,
                            fields: [
                                {
                                    name: "Location",
                                    value: `${String(body.payload.regions[0])}`,
                                    inline: true
                                },
                                {
                                    name: "Target",
                                    value: `${String(body.payload.target)}`,
                                    inline: true
                                },
                                {
                                    name: "URL",
                                    value: `[\`TargetURL\`](https://${String(body.payload.url)})`,
                                    inline: true
                                }
                            ],
                        }
                    ]
                }).then((response) => {
                    console.log('[VercelWave]: Successfully sent deploymed.created webhook.')
                })
                break;
            }

            case "deployment.succeeded": {
                discordClient.execute({
                    embeds: [
                        {
                            color: '3066993',
                            author: {
                                name: `Deployment #${String(body.payload.deployment.id)} succeeded`,
                                url: `${String(body.payload.deployment.inspectorUrl)}`,
                                icon_url: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png"
                            },
                            title: `VercelWave`,
                            url: "",
                            description: `A new \`${String(body.payload.deployment.name)}\` Deployment has been deployed`,
                            fields: [
                                {
                                    name: "Location",
                                    value: `${String(body.payload.regions[0])}`,
                                    inline: true
                                },
                                {
                                    name: "Target",
                                    value: `${String(body.payload.target)}`,
                                    inline: true
                                },
                                {
                                    name: "URL",
                                    value: `[\`TargetURL\`](https://${String(body.payload.url)})`,
                                    inline: true
                                }
                            ],
                        }
                    ]
                }).then((response) => {
                    console.log('[VercelWave]: Successfully sent deploymed.succeeded webhook.')
                })
                break;
            }

            default: {
                console.log(`[VercelWave]: No Discord Webhook found for ${body.payload.type}`)
            }
        }

        return "OK";

    }, { detail: { deprecated: false, tags: ["Vercel"] } })

export default vercel;