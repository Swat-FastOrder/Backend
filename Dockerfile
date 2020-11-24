FROM node:13

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm install

EXPOSE 3000

COPY ./ /app/

RUN npm run build
CMD npm run start