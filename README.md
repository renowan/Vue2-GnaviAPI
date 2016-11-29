# Vue2 + GnaviAPI
- Vue 2.0x
- vue-router
- vuex
- Electron

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# Macのアプリ書き出し
npm run pack-mac
```

## 開発者IDの取得
URL: http://api.gnavi.co.jp/api/  
ここでkeyを取得してここに入れてください  
`/src/common/utils/constants.js`  
```
export const KEY_ID = '{your_id}'
```


