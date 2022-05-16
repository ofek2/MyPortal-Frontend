const http = require('http');
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const port = process.env.PORT || 8080;
const app = express();
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));

const backendUrl =  process.env.BACKEND_URL || "http://localhost:5000";

app.get('/*', function (req, res) {
    // Cache control - forcing no cache
    // res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    // res.setHeader('Pragma', 'no-cache');
    // res.setHeader('Expires', '0');

    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

// if the backend is placed on a different server/port we can proxy the requests using BACKEND_URL env variable (we use it in the test env for example)
if (backendUrl) {
    app.use('/api/*', createProxyMiddleware({target: backendUrl, changeOrigin: true}));
}

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
    console.log(`My Portal Front listening on port ${port}!`);
});
