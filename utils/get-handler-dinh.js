"use strict"

const SQLiteDAO = require('../db/sqlite3/sqlite-dao');

const dirDB = 'db';
const dbFile = './' + dirDB + '/users.db';

var db = new SQLiteDAO(dbFile);
var arrData = [];

db.getRsts("SELECT * FROM users")
  .then(data => {
    arrData = data;
  })
  .catch(err => {
    console.log("Loi", err);
  });

  const getUsers = (req, res) => {
    let returnArray = arrData;

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(returnArray, (key, value) => {
        if (value === null) { return undefined; }
        return value;
    }
    ));
  }

module.exports = {
  getUsers: getUsers
};