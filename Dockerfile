# ベースとなるイメージを指定
FROM node:18-alpine

# アプリケーションのソースコードを配置するディレクトリを作成
WORKDIR /app

# package.json と package-lock.json（ある場合）をコピーし、依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションのソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN npm run build

# アプリケーションを起動するためのコマンドを指定
CMD ["npm", "start"]
