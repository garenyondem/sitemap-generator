FROM node:12.16-buster-slim as builder
LABEL stage=builder
WORKDIR /app/sitemap-generator
COPY package*.json ./
COPY ./src ./src
COPY tsconfig.json .
RUN npm i -s && npm run build

FROM node:12.16-alpine as deploy
RUN mkdir -p /home/node/sitemap-generator/node_modules && chown -R node:node /home/node/sitemap-generator
WORKDIR /home/node/sitemap-generator
COPY package*.json ./
COPY --from=builder /app/sitemap-generator/dist ./dist
COPY --from=builder /app/sitemap-generator/src/public ./dist/public
USER node
RUN npm i --production --no-optional -s
EXPOSE 50010
CMD ["node","./dist/index.js"]