let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "Chen",
    password: "Aa123456",
    database: "games",
    acquireTimeout: 2000,
});

function createTable(q, res) {
    let roomId = q['room']
    pool.getConnection((err, con) => {
        if (err) {
            con.release()
            res.writeHead(500)
            res.end("Couldn't connect to DB")
            return
        }
        con.query('Create TABLE  ' + roomId + '( id INT AUTO_INCREMENT PRIMARY KEY, player VARCHAR(50) NOT NULL, rowNum INT NOT NULL, colNum INT NOT NULL);', [roomId], (err, result) => {
            if (err) {
                con.release()
                // throw new Error("Can't create table for this room: " + err.sqlMessage)
                res.writeHead(500)
                res.end(err.sqlMessage)
                return
                // return err.sqlMessage
            }
            con.release()
            res.writeHead(200, { "Content-Type": "text\plain" });
            res.end();
            return;
        })
    })
}

function recordMove(roomId, playerId, row, column) {
    pool.getConnection((err, con) => {
        if (err) {
            con.release()
            // res.writeHead(500)
            // res.end("Couldn't connect to DB")
            return
        }
        console.log(roomId)
        con.query('INSERT INTO ' + roomId + ' (player,rowNum,colNum) Values (?,?,?)', [playerId, row, column], (err, result) => {
            if (err) {
                con.release()
                throw new Error("Can't enter entry for this room" + err.sqlMessage)
            }
            con.release()
        })
    })
}

exports.createtable = createTable
exports.recordMove = recordMove