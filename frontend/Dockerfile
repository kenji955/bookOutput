# ベースイメージの作成
FROM node:12.16.1

# コンテナ内で作業するディレクトリを指定
WORKDIR /app

# 上記作業ディレクトリにファイルをコピー
COPY package*.json ./

# パッケージをインストール
RUN npm cache clean --force && npm ci

# ファイルを作業用ディレクトリにコピー。COPY <ソース>... <送信先>
COPY . /app

EXPOSE 3000

# コンテナを起動する際に実行されるコマンド
ENTRYPOINT [ "npm","run", "start" ]

# ! /bin/sh
# ENTRYPOINT if [ "${LOCALDOMAIN}x" != "x" ]; then echo "search ${LOCALDOMAIN}" >> /etc/resolv.conf; fi exec "$@"