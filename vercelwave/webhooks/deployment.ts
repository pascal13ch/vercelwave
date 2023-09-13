import DiscordWebhook from "discord-webhook-ts";

const discordClient = new DiscordWebhook(process.env.WEBHOOK_URL);


function sendDeploymentWebhook(status, body) {

    let embedTitle : string;
    let embedDescription : string;
    let embedColor : string;
    
    switch(status) {
        case "succeeded": {
            embedTitle = `Deployment #${String(body.payload.deployment.id)} succeeded`;
            embedDescription = ``;
            embedColor = '3066993';
            break;
        }

        case "created": {
            embedTitle = `Deployment #${String(body.payload.deployment.id)} created`;
            embedDescription = `A new \`${String(body.payload.deployment.name)}\` Deployment has been triggered`;
            embedColor = '0';
            break;
        }

        case "error": {
            embedTitle = `Deployment #${String(body.payload.deployment.id)} failed`;
            embedDescription = ``;
            embedColor = '15158332';
            break;
        }

        default: {
            embedTitle = '';
            embedDescription = '';
            embedColor = '0';
            break;
        }
    }

    discordClient.execute({
        embeds: [
            {
                color: `${String(embedColor)}`,
                author: {
                    name: `${String(embedTitle)}`,
                    url: `${String(body.payload.deployment.inspectorUrl)}`,
                    icon_url: "https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png"
                },
                title: `VercelWave`,
                url: "",
                description: `${String(embedDescription)}`,
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
                        value: `[\`${String(body.payload.url)}\`](https://${String(body.payload.url)})`,
                        inline: true
                    }
                ],
            }
        ]
    }).then((response) => {
        console.log(`[VercelWave]: Successfully sent deployment.${status} webhook.`)
    })
}

export default sendDeploymentWebhook;