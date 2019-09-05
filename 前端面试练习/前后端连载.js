前后端连载 
cnpm i concurrently --save-dev
两个 package.json 
 "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "start":"npm run server"
  },
 "scripts": {
    "client-install": "npm install -prefix client",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "start": "node server.js",
    "server": "nodemon server.js"
  },