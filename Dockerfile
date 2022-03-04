FROM node:16 as base
ENV PORT=8000
EXPOSE 8000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .

FROM base as dev
RUN yarn
RUN yarn build
CMD ["yarn", "dev:docker"]

FROM base as prod
ENV NODE_ENV=production
RUN yarn --production
RUN yarn build
CMD ["yarn", "start"]
