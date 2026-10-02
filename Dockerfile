FROM node:24-alpine
WORKDIR /app
COPY --chown=node:node imos-release/server.mjs ./server.mjs
COPY --chown=node:node imos-release/public ./public
ENV NODE_ENV=production
ENV PORT=8080
USER node
EXPOSE 8080
CMD ["node", "server.mjs"]