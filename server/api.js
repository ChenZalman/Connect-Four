let gameLogic = require('./gameLogic')

function insert(req, res, q) {
    if (!q["column"]) {
        res.writeHead(400);
        res.end();
        return;
    }
    try {
        gameLogic.move(q, res)
    } catch (e) {
        res.writeHead(400, { "Content-Type": "text\plain" })
        res.end(e.message)
        return
    }
    res.writeHead(200, { "Content-Type": "text\plain" })
    res.end()
    return
}

function login(req, res, q) {
    if (!q["room"] || !q["id"]) {
        res.writeHead(400);
        res.end();
        return;
    }
    console.log("Room: " + q["room"] + " ID: " + q["id"])
    gameLogic.createRoom(q)
    res.writeHead(200, { "Content-Type": "text\plain" })
    res.end()
    return
}

exports.insert = insert
exports.login = login