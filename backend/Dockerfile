# ベースイメージの作成
FROM node:12.16.1

# コンテナ内で作業するディレクトリを指定
WORKDIR /app

# 上記作業ディレクトリにファイルをコピー
COPY package*.json ./

# パッケージをインストール
# RUN npm cache clean --force 
RUN npm install

# ファイルを作業用ディレクトリにコピー。COPY <ソース>... <送信先>
COPY . .

# コンテナを起動する際に実行されるコマンド
ENTRYPOINT [ "npm", "start" ]
