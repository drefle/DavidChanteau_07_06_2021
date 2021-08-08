const mysql = require('mysql2')
const dbConfig = require ('../config/config.js')

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

connection.connect(err => {
    if(err){
        console.error(err);
        return;
    }else{
        console.log('Connection achieved')
    }
  })

module.exports =connection