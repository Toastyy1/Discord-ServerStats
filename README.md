# Discord-ServerStats

A server-stats bot for the chatting platform `Discord`, written by Toasty
## Commands

| Command | Description                                                                                                                                                                                           |
|---------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /help   | Shows a small help-embed containing a step-by-step description                                                                                                                                        |
| /menu   | Sends the dropdown menu for choosing the category the user want to create the stats-channels in. After selecting the category, another menu is sent in which you can select the type of stats-channel |

## Prerequisites

- Node.js 16.9.1 or higher
- A complete and valid `.env` file -> [Example file](https://github.com/Toasty65/Discord-ServerStats/blob/main/.env)
  - Or use environment variables via Dockerfile
  - You can also use a almost complete [Docker Image]("https://hub.docker.com/repository/docker/toasty65/discord-serverstats#"). Simply pull the image and adapt the environment variables `CLIENTID`, `DEVELOPERID`, `GUILDID` and `TOKEN` to your environment when creating a new container. Here's an example:
    - `docker run --name discord-serverstats_test -e "CLIENTID=<Your bot's client ID>" -e "DEVELOPERID=<ID of the user to contact when an error occured>" -e "GUILDID=<Id of your guild>" -e "TOKEN=<Your bot's token>" toasty65/discord-serverstats:1.0`
- Following npm packages:
  - discord.js
  - dotenv
  - node-schedule

## Used tools

- **IDE:** Visual Studio Code
- GitHub
- NPM
- Docker

## Bugs & Improvements

- If you ever notice a bug or simply want to suggest something, you can do that by creating an issue [here](https://github.com/Toasty65/Discord-ServerStats/issues)
