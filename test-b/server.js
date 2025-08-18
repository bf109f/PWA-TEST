// server.js
const express = require('express');
const app = express();

// 让 /pwa-multi 目录作为静态资源目录
app.use('/src', express.static(__dirname + '/src'));

app.listen(8081, () => {
  console.log('PWA demo running at http://localhost:8081/src');
});
