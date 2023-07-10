FROM node:19.2-alpine3.16 as Build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build



FROM node:19.2-alpine3.16 as Deps-Produ
WORKDIR /app
COPY package.json ./
RUN npm install --prod

FROM node:19.2-alpine3.16 as Produccion
WORKDIR /app
COPY --from=Build /app/dist ./dist
COPY --from=Deps-Produ /app/node_modules ./node_modules
ENV NODE_ENV='production'
CMD [ "node", "dist/main"]