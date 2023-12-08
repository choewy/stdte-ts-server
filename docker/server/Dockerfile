FROM node:20

EXPOSE 3000

WORKDIR /var/server

COPY build/package.json ./package.json
COPY build/package-lock.json ./package-lock.json
COPY build/dist ./dist
COPY build/.env ./.env

RUN npm ci --omit=dev

CMD ["node", "dist/main.js"]