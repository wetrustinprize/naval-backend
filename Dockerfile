FROM node

WORKDIR /usr/app

COPY package.json ./
COPY prisma ./prisma/

RUN npm install --force

COPY . .

CMD ["npm", "run", "dev"]