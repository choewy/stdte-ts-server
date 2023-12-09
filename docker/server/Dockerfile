FROM node:20

EXPOSE 3000

ENV CONTAINER_PROCESS=0

WORKDIR /var/server

COPY build/package.json ./package.json
COPY build/package-lock.json ./package-lock.json
COPY build/dist ./dist
COPY build/.env ./.env

RUN echo "CONTAINER_PROCESS = $CONTAINER_PROCESS" >> /var/server/.env

RUN npm ci --omit=dev

CMD ["node", "dist/main.js"]