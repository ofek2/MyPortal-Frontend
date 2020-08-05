const http = require('http');

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.use (function (req, res, next) {
    if (req.secure) {
            // request was via https, so do no special handling
            next();
    } else {
            // request was via http, so redirect to https
            res.redirect('https://' + req.headers.host + req.url);
    }
});

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
    console.log(`Web-Service listening on port ${port}!`);
});