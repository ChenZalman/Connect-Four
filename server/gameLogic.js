let games = {}

function move(q) {
    let column = q['column']
    let roomId = q['room']
    let playerId = q['id']
    let row = 5
    // console.log(roomId + " player: " + playerId + " inserted token to col: " + column)
if (games[roomId]["turn"] !== games[roomId]['players'].indexOf(playerId)) {
        throw new Error("Not your turn!")
    }
    while (games[roomId]['table'][row][column]) {
        row--
    }
    if (row < 0) {
        throw new Error("Invalid move!");
    }
    games[q['room']]['table'][row][column] = playerId
    games[roomId]["turn"] = (games[roomId]["turn"] + 1) % 2
    // console.log(row)
    // for (let i = 0; i < 6; i++)
    //     for (let column = 0; column < 7; column++)
    //         console.log(games[q['room']]['table'][i][column])
}

function createRoom(q) {
    if (!games[q['room']]) {
        console.log("Creating new room")
        games[q['room']] = {
            "roomId": q['room'],
            "players": [q["id"]],
            "table": [...Array(7)].map(e => Array(6)),
            "turn": 0,
        }
    }
    else {
        games[q['room']]['players'].push(q['id'])
    }
    console.log(games)
}

exports.move = move
exports.createRoom = createRoom