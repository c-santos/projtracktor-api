FROM node:20.14.0-alpine3.19

# Set my-template as work directory inside of Docker container
WORKDIR /my-template

# Copy package.json and tsconfig.json to work dir
COPY package*.json tsconfig*.json /my-template/

RUN npm install

# Copy everything in the local directory to the container directory
COPY . /my-template/