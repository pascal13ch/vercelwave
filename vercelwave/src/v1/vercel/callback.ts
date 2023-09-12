import Elysia from "elysia";
import axios from "axios"
import DiscordWebhook from "discord-webhook-ts";

const discordClient = new DiscordWebhook(process.env.WEBHOOK_URL);

const callback = new Elysia()
    .get('/callback', ({ query, set }) => {
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
            console.log(`[VercelWave]: Succesfully registered new team. ID: ${query.teamId} `);
            discordClient.execute({
                embeds: [
                    {
                        title: 'VercelWave',
                        description: 'The `VercelWave` integration has been successfully linked',
                        fields: [
                            {
                                name: 'User ID',
                                value: `${response.data.user_id}`,
                            },
                            {
                                name: 'Team ID',
                                value: `${response.data.team_id}`,
                            }
                        ]
                    }
                ]
            }).then((response) => {
                console.log('[VercelWave]: Successfully sent link webhook.')
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