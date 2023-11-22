FROM node

ENV dir=vote

WORKDIR /$dir

COPY src/ ./

RUN npm i

# RUN npm ci --only=production

EXPOSE 5000

CMD ["node", "app.js"]

