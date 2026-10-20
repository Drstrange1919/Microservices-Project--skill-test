FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --chown=node:node server.js ./

ENV NODE_ENV=production
ENV PORT=3003

EXPOSE 3003

USER node

CMD ["npm", "start"]
