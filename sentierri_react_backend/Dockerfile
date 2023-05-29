# Specify the base image
FROM node:16

# Specify the working directory in the Docker container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the Docker container
COPY package*.json ./

# Install app dependencies inside the Docker container
RUN npm install

# Copy the rest of your app's source code to the Docker container
COPY . .

# Expose port 3000 for the app (change this if your app uses a different port)
EXPOSE 3000

# The command to run the application
CMD [ "node", "server.js" ]
