FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install --force

COPY . .

CMD ["npm", "run", "dev"]