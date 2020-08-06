# stage1 as builder
FROM node:12 as builder

WORKDIR /app
# copy the package.json to install dependencies
COPY package.json ./

# Install the dependencies
RUN npm install

COPY . .

# Build the project and copy the files
RUN npm run build:prod

CMD ["npm", "run", "start:prod"]