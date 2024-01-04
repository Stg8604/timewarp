FROM node:21-alpine as dev

WORKDIR /app

COPY ./package*.json ./yarn.lock ./

RUN yarn install 
COPY .. .
EXPOSE 80

CMD ["yarn", "dev", "--host", "0.0.0.0", "--port", "80"]


FROM alpine/git:2.43.0 as mod
WORKDIR /
RUN git clone https://github.com/mharrish7/Modified_Ion_Phaser.git

FROM node:21-alpine as builder
WORKDIR /app
COPY ./package*.json ./yarn.lock ./
RUN yarn install 
COPY .. .
COPY --from=mod /Modified_Ion_Phaser/dist ./node_modules/@ion-phaser/core/dist
RUN yarn build

FROM nginx:1.24-alpine as prod

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir /usr/share/nginx/html/assets/assets
RUN mv /usr/share/nginx/html/assets/fonts /usr/share/nginx/html/assets/assets/.
COPY ./mime.types /etc/nginx/mime.types
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
