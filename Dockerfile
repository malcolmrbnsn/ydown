FROM node:lts-alpine3.13

ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app


# Install server dependencies
COPY package*.json ./
RUN npm install

# Install client dependencies and build
COPY client/package*.json ./client
RUN cd client
RUN npm install
RUN npm build

RUN cd /usr/src/app
COPY . .

EXPOSE 3000

CMD ['npm' 'prod']
