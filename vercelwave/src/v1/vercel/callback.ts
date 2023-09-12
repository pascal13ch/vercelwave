import Elysia from "elysia";
import axios from "axios"
import DiscordWebhook from "discord-webhook-ts";

const page = ``

const discordClient = new DiscordWebhook(process.env.WEBHOOK_URL);

const callback = new Elysia()
    .get('/callback', ({ query, set }) => {

        console.log(query)

        axios({
            method: "post",
            url: "https://api.vercel.com/v2/oauth/access_token",
            data: {
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                code: query.code,
                redirect_uri: process.env.REDIRECT_URI
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })
        .then(response => {
            console.log(response.data);

            console.log(`[VercelWave]: Succesfully registered new team. ID: ${query.teamId} `);
            discordClient.execute({
                embeds: [
                    {
                        title: 'VercelWave',
                        description: 'The `VercelWave` integration has been successfully linked',
                        fields: [
                            {
                                name: 'Some field',
                                value: 'Some field value',
                            }
                        ]
                    }
                ]
            }).then((response) => {
                console.log('Successfully sent webhook.')
            })
        })
        .catch(err => {

            console.log(`[VercelWave]: Failed to registered new team. ID: ${query.teamId} `);
            console.log(err.response.data.error_description);
           
            return "Authentication failed check AppWave Console for more Infos";
        });

        set.redirect = String(query.next);


    }, { detail: { deprecated: false, tags: ["Vercel"] } });

export default callback;