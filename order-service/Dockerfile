FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node server.js ./

ENV NODE_ENV=production
ENV PORT=3002

EXPOSE 3002

USER node

CMD ["npm", "start"]
