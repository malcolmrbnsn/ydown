# YDown image
FROM jrottenberg/ffmpeg:4.1-alpine
FROM node:current-alpine

# install ffmpeg binaries to node image
COPY --from=0 / /

WORKDIR /app

# copy over package files and install
COPY package*.json ./
RUN npm install

# copy the rest of the code
COPY . ./

# expose the port, set the volume and start server
VOLUME /persist
EXPOSE 3001
CMD ["npm", "start"]
