var mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    database: 'database',
    user: 'root',
    password: '1234'
});

mysqlConnection.connect( function(err) {
    if (err){
        console.log('conection error' + err.stack);
        return
    } else {
        console.log('Db is connected');
    }
});

module.exports = mysqlConnection;