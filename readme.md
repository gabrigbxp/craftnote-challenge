# How to run project

- Install using [yarn](https://classic.yarnpkg.com/en/docs/install)
- Use `yarn tsw` to compile (and watch) the code
- Run using `yarn dev` (watch with nodemon)
- Use `yarn build` to compile the server and `yarn start` to run it (no watch)
- Use environment variable `PORT` to specify the server port (8000 by default, `.env` file accepted)

# Docker
Use `docker compose` to run the compose file, ie: `docker compose -f docker-compose.production.yml up`
- Use `docker-compose.yml` to run the server with typescript and nodeamon watching for development*
- Use `docker-compose.production.yml` to install only production dependencies an run the server

*tsc needs around 1 minute to start properly

# Endpoint
The endpoint is http://localhost:(SERVER PORT)/direction?heading=(NUMBER)&target=(NUMBER)
`heading` and `target` are mandatories
