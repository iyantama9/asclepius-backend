FROM node:18.17.1

WORKDIR /app


COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8080
ENV MODEL_URL=URL_FOLDER_ATAU_FILE_BUCKET

EXPOSE 8080

CMD ["npm", "start"]