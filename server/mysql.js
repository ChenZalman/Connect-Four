let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "Chen",
    password: "Aa123456",
    database: "games",
    acquireTimeout: 2000,
});

