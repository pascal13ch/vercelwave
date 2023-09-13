<p align="center">
  <a href="https://www.appwave.codes"><img src="https://www.appwave.codes/assets/img/logo/logo.png" alt="Logo" height=170></a>
</p>
<h1 align="center">VercelWave</h1>


## What is VercelWave?
> **VercelWave is still under development**

VercelWave is a self-hosted interface that provides a connection between Vercel and webhook providers. VercelWave was developed to enable a feature that is not available by default in Vercel.

### Installation

## Create Vercel Integration

To create a Intergration follow this guide: [Vercel | Integrate with Vercel](https://vercel.com/docs/integrations/create-integration)

## Docker Setup

```yaml
version: '3.3'
services:
  api:
    image: ghcr.io/pascal13ch/vercelwave:main
    restart: always
    environment:
     PORT: 8080
     WEBHOOK_URL: https://discord.com/api/webhooks/xxx
     CLIENT_ID: # Placeholder
     CLIENT_SECRET: # Placeholder
     REDIRECT_URI: # Placeholder
    ports:
      - '8088:8088'
    expose:
      - '8088'
```

### Environment Variables

| Variable      | Description                                                           | Required | Default |
|---------------|-----------------------------------------------------------------------|:--------:|:-------:|
| PORT          | Port over which the backend should be started                         | No       | 3000    |
| WEBHOOK_URL   | Disord Webhook URL (Secer Settings > Integrations > Create Webhook )  | Yes      | -       |
| CLIENT_ID     | Vercel Integration ClientID                                           | Yes      | -       |
| CLIENT_SECRET | Vercel Integration Client Secret                                      | Yes      | -       |
| REDIRECT_URI  | Vercel Integration Redirect URL                                       | Yes      | -       |


## Contribute

Contributions are welcome! Please see our [Contribution Guidelines](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT license. For more information, see the [LICENSE.txt](LICENSE.txt) file.
