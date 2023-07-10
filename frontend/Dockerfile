FROM node
#WORKDIR /the/workdir/path
COPY . /app
WORKDIR /app
RUN npm install
#COPY . .
EXPOSE 5000
CMD [ "npm","run","serve" ]