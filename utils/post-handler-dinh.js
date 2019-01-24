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

var jsonPost = (req, res) => {

  let postDataString = '';
  req.on('data', (chunk) => {
    postDataString = chunk;
  });

  req.on('end', () => {
    try {
      req.json_data = JSON.parse(postDataString);
      let status = "0";
      arrData.some(el => {
        if (req.json_data.username.localeCompare(el.username) == 0) {
          status = "1";
          return true;
        }
      })
      res.send(status);
    } catch (err) {
      res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(JSON.stringify({ code: 403, message: "post-handler: jsonProcess: No JSON parse Data", error: err }));
    }
  })
}

module.exports = {
  jsonPost: jsonPost
};