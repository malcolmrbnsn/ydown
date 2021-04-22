FROM node:lts-alpine3.13

ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Install server dependencies
COPY package*.json ./
RUN npm install
RUN npm build
COPY . .

EXPOSE 3000

CMD ['npm' 'prod']
