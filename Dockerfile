FROM node:22-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NITRO_PRESET=node-server
ENV HOST=0.0.0.0
ENV PORT=8080
RUN npm run build
EXPOSE 8080
CMD ["node", ".output/server/index.mjs"]
