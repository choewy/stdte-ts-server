FROM node:20

EXPOSE 3000

ENV NAME=stdte-ts
ENV LABEL=0

WORKDIR /var/server

COPY build/package.json ./package.json
COPY build/package-lock.json ./package-lock.json
COPY build/dist ./dist
COPY build/.env ./.env

RUN echo "NAME = $NAME" >> /var/server/.env
RUN echo "LABEL = $LABEL" >> /var/server/.env

RUN npm ci --omit=dev

CMD ["node", "dist/main.js"]