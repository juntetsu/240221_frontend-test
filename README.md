# 使用技術

### フロント
* [React](https://ja.react.dev/) 18.2.0
* [TypeScript](https://www.typescriptlang.org/) 18.2.0

### ビルドツール
* [Vite](https://ja.vitejs.dev/) 5.1.4

# 環境構築
```
# パッケージインストール
$ npm install

# ローカル環境立ち上げ
$ npm start
```
下記のローカル環境にアクセス出来ればOK  
http://localhost:5173/  

バックエンドは[こちら](https://github.com/ncdcdev/recruit-frontend)をローカルで起動してください。

# 要件

1. サイドバーに全ページを表示することができる。
2. サイドバーで新たにページを作成することができる。
   - メニューの下の「+」ボタンをクリックしてページを追加できる。
3. 「-」ボタンをクリックすることで、ページを削除することができる。
4. メインエリアのページはタイトルと本文で構成されており、それぞれ編集・保存できる。