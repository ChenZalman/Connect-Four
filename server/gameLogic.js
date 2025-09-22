let games = {}

function move(q) {
    let column = q['column']
    let roomId = q['room']
    let playerId = q['id']
    let row = 5
    if (games[roomId]['winner']) {
        return
    }
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
    checkVectory(q)
    games[roomId]["turn"] = (games[roomId]["turn"] + 1) % 2
    // console.log( games[roomId]["turn"])

}

function createRoom(q, res) {
    if (!games[q['room']]) {
        console.log("Creating new room")
        games[q['room']] = {
            "roomId": q['room'],
            "players": [q["id"]],
            "table": [...Array(6)].map(e => Array(7)),
            "turn": 0,
            "winner": null,
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

function getBoard(q) {
    return JSON.stringify({ "table": games[q['room']]['table'], "winner": games[q['room']]['winner'] })
}

function checkVectory(q) {
    //Check rows for 4 in a row
    for (i = 0; i < 6; i++) {
        for (j = 0; j < (7 - 3); j++) {
            if ((games[q['room']]['table'][i][j + 0] === games[q['room']]['table'][i][j + 1]) &&
                (games[q['room']]['table'][i][j + 2] === games[q['room']]['table'][i][j + 3]) &&
                (games[q['room']]['table'][i][j + 0] === games[q['room']]['table'][i][j + 2]) &&
                (games[q['room']]['table'][i][j + 0] != null)) {
                games[q['room']]['winner'] = games[q['room']]['players'][games[q['room']]['turn']]
            }
        }
    }
    //Check rows for 4 in a column
    for (i = 0; i < (6 - 3); i++) {
        for (j = 0; j < 7; j++) {
            if ((games[q['room']]['table'][i + 0][j] === games[q['room']]['table'][i + 1][j]) &&
                (games[q['room']]['table'][i + 2][j] === games[q['room']]['table'][i + 3][j]) &&
                (games[q['room']]['table'][i + 0][j] === games[q['room']]['table'][i + 2][j]) &&
                (games[q['room']]['table'][i + 0][j] != null)) {
                games[q['room']]['winner'] = games[q['room']]['players'][games[q['room']]['turn']]
            }
        }
    }
}

exports.move = move
exports.createRoom = createRoom
exports.getBoard = getBoard