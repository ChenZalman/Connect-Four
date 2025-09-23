let WebSocket = require('ws');
let wss = null;
let arr = [];
let http = require('http');
let url = require('url');
let api = require('./api');
let fs = require('fs');
let extensions = {
    '.html': 'text/html',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png'
};

wss = new WebSocket.Server({ port: 8080 });
console.log('server is now listening on port 8080');
wss.on('connection', (ws) => {
    arr.push(ws);
    ws.on('message', (message) => {
        for (let i = 0; i < arr.length; i++) {
            arr[i].send(`update!`);
        }
    });

    ws.on('close', () => {
        //remove from arr
        let index = arr.indexOf(ws)
        arr.splice(index, index)
        console.log('client got disconnected');
    });

});





http.createServer((req, res) => {
    if (req.method == "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    let parsedUrl = url.parse(req.url, true);
    let q = parsedUrl.query;
    let path = parsedUrl.pathname;
    if (path.startsWith("/api/")) {
        path = path.substring(5);
        if (!api.hasOwnProperty(path)) {
            res.writeHead(400);
            res.end();
            return;
        }
        api[path](req, res, q);
    } else {
        if (path == "/") path = "/index.html";
        let indexOfDot = path.indexOf(".");
        if (indexOfDot == -1) {
            res.writeHead(400);
            res.end();
            return;
        }
        let extension = path.substring(indexOfDot);
        if (!extensions.hasOwnProperty(extension)) {
            res.writeHead(404);
            res.end();
            return;
        }
        fs.readFile('../client' + path, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end();
                return;
            }
            res.writeHead(200, { 'Content-Type': extensions[extension] });
            res.end(data);
        });


    }


}).listen(3000, () => { console.log("now http server is listening on port 3000..."); });

