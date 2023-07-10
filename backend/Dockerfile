FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

#ENV userDB=value
#ENV passDB=value



CMD [ "npm","start" ]