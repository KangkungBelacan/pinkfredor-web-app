const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use('/api', createProxyMiddleware({ target: 'https://pinkfredor-web-app-api.herokuapp.com', changeOrigin: true }));

app.use(express.static(path.join(__dirname, 'build')));

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
