# Use an official Node runtime as a parent image
FROM node:16.20.2

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock files
COPY package.json ./
# COPY yarn.lock ./

# Install dependencies
RUN yarn install

# Bundle app source
COPY . .

# Build the app
RUN yarn build

# Install a simple http server to serve static content
RUN yarn global add serve

# The port on which the app will be served
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build", "-l", "3000"]
