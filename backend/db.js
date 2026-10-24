const mysql = require('mysql2');

const prelims_db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "prelims_db"
});

module.exports = prelims_db;