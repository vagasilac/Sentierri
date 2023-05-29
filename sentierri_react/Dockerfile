# Start from the official node.js 14 base image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code to the working directory
COPY . .

# Expose port 3000 for the app to be accessible
EXPOSE 3000

# Start the app using Vite
CMD ["npm", "run", "dev"]
