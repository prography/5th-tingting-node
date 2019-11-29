FROM node:10

ENV TZ="/usr/share/zoneinfo/Asia/Seoul"

ARG PROJECT_DIR=/tingting/web

COPY package.json ${PROJECT_DIR}/package.json
COPY package-lock.json ${PROJECT_DIR}}/package-lock.json
WORKDIR ${PROJECT_DIR}
RUN npm install

COPY . ${PROJECT_DIR}

# RUN npm run build

EXPOSE 4000

# RUN npm run start
CMD ["npm","run","start"]