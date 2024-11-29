FROM node:18.17.1

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080
ENV MODEL_URL=https://storage.googleapis.com/asclepius-bucket/asclepius-model/model.json

EXPOSE 8080

CMD ["npm", "start"]