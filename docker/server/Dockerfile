FROM node:20

EXPOSE 3000

WORKDIR /var/server

COPY build/dist .
COPY build/.env .


CMD ["node", "dist/main.js"]