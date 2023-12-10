FROM node:20

EXPOSE 3000

ENV CONTAINER_PREFIX=
ENV CONTAINER_PROCESS=

WORKDIR /var/server

COPY build/package.json ./package.json
COPY build/package-lock.json ./package-lock.json
COPY build/dist ./dist
COPY build/.env ./.env

RUN echo "CONTAINER_PREFIX = $CONTAINER_PREFIX" >> /var/server/.env
RUN echo "CONTAINER_PROCESS = $CONTAINER_PROCESS" >> /var/server/.env

RUN npm ci --omit=dev
RUN npm i -g forever

CMD ["forever", "start", "dist/src/main.js"]