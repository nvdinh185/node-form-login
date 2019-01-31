"use strict"

const SQLiteDAO = require('../db/sqlite3/sqlite-dao');

const dirDB = 'db';
const dbFile = './' + dirDB + '/users.db';

var db = new SQLiteDAO(dbFile);


const getUsers = (req, res) => {
  var promise = new Promise((resolve, reject) => {
    db.getRsts("SELECT * FROM users")
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
  });

  res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
  promise.then(data => {
    res.end(JSON.stringify(data, (key, value) => {
      //if (value === null) { return undefined; }
      return value;
    }
    ));
  }).catch(err => {
    console.log(err);
  })
}

module.exports = {
  getUsers: getUsers
};