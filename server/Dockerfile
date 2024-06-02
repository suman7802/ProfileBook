FROM node:16-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY .env .env


RUN npm install --dev

COPY . .
RUN npx prisma generate
RUN npm run build
CMD ["npm", "run", "dev"]

EXPOSE 8000
