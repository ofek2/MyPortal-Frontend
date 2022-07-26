# stage1 as builder
FROM node as builder

WORKDIR /app
# copy the package.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

COPY . .

# Build the project and copy the files
RUN npm run build

CMD ["npm", "run", "start:prod"]


#FROM nginx:alpine

#!/bin/sh

#COPY ./nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
#RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
#COPY --from=builder /app/build /usr/share/nginx/html

#EXPOSE 3000 80 8080 443

#ENTRYPOINT ["nginx", "-g", "daemon off;"]