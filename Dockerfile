# YDown image
FROM jrottenberg/ffmpeg:4.1-alpine
FROM node:current-alpine

# install ffmpeg binaries
COPY --from=0 / /

WORKDIR /app

# copy over package files and install
COPY package*.json ./
RUN npm install

# copy the rest of the files
COPY . ./

# expose the port and start server
EXPOSE 3001
CMD ["npm", "start"]
