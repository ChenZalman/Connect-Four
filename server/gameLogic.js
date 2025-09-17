let games = {}

function move(q) {
    let column = q['column']
    let roomId = q['room']
    let playerId = q['id']
    let row = 5
    if (games[roomId]["turn"] !== games[roomId]['players'].indexOf(playerId)) {
        throw new Error("Not your turn!")
    }
    while (games[roomId]['table'][row][column]) {
        row--
    }
    if (row < 0) {
        throw new Error("Invalid move!");
    }
    // games[q['room']]['table'][row][column] = playerId
    fillBoard(row, column, games[roomId]['turn'], roomId)
    games[roomId]["turn"] = (games[roomId]["turn"] + 1) % 2
    console.log( games[roomId]["turn"])
}

function createRoom(q, res) {
    if (!games[q['room']]) {
        console.log("Creating new room")
        games[q['room']] = {
            "roomId": q['room'],
            "players": [q["id"]],
            "table": [...Array(6)].map(e => Array(7)),
            "turn": 0,
        }
    }
    else {
        if (games[q['room']]['players'].length === 2) {
            res.writeHead(401, { "Content-Type": "text/plain" })
            res.end("Sorry room is full")
            return
        }
        games[q['room']]['players'].push(q['id'])
    }
    console.log(games)
    res.writeHead(200, { "Content-Type": "text\plain" })
    res.end()
    return
}

function fillBoard(row, column, turn, roomId) {
    if (turn === 0)
        games[roomId]['table'][row][column] = '#ff0000'
    else
        games[roomId]['table'][row][column] = '#0000ff'
}

function getBoard(q){
return JSON.stringify({"table": games[q['room']]['table']})
}

exports.move = move
exports.createRoom = createRoom
exports.getBoard = getBoard