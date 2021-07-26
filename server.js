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

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
    console.log(`My Portal Front listening on port ${port}!`);
});
