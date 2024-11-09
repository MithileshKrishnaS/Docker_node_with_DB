#use node alpine image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /

# Copy the package.json and package-lock.json (or equivalent dependencies file) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application's port (adjust as needed)
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]