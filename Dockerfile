FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app  
COPY . .
# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
# RUN npm install --production --silent && mv node_modules /
RUN npm install
# RUN npm start

EXPOSE 8080
# RUN chown -R node /usr/src/app
# USER node
CMD ["npm", "run", "start"]


# optimizing docker build
  # multi stage build

# Port inbound 