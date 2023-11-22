FROM node

ENV dir=maze

WORKDIR /$dir

COPY src/ ./

# 把package.json和package-lock.json复制到工作目录
COPY src/ ./

RUN npm i

# RUN npm ci --only=production

EXPOSE 5000

CMD ["node", "app.js"]
