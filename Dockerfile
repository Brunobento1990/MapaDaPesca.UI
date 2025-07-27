FROM node:24.4.1 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build && rm -rf node_modules && npm install --production --legacy-peer-deps

FROM node:24.4.1
WORKDIR /app
COPY --from=build /app .
ENV TZ=America/Sao_Paulo
CMD ["npm", "run","start"]