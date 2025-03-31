FROM node:18

WORKDIR /app

COPY package*.json ./

# 유연한 설치 (강제 fallback)
RUN npm install || npm install --force

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]
