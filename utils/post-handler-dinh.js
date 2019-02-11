"use strict"

const SQLiteDAO = require('../db/sqlite3/sqlite-dao');

const dirDB = 'db';
const dbFile = './' + dirDB + '/users.db';

var db = new SQLiteDAO(dbFile);

var postLogin = (req, res) => {
  var promise = new Promise((resolve, reject) => {
    db.getRsts("SELECT * FROM users")
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  })
  promise.then(data => {
    let postDataString = '';
    req.on('data', (chunk) => {
      postDataString = chunk;
    });
    req.on('end', () => {
      try {
        req.json_data = JSON.parse(postDataString);
        let status = "0";
        data.some(el => {
          if (req.json_data.username.localeCompare(el.username) == 0 && req.json_data.password.localeCompare(el.password) == 0) {
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
  }).catch(err => {
    console.log(err);
  })
}

var postConfirm = (req, res) => {
  var promise = new Promise((resolve, reject) => {
    db.getRsts("SELECT * FROM users")
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  })
  promise.then(data => {
    let postDataString = '';
    req.on('data', (chunk) => {
      postDataString = chunk;
    });

    req.on('end', () => {
      try {
        req.json_data = JSON.parse(postDataString);
        let status = "0";
        data.some(el => {
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
  })
}

var postRegister = (req, res) => {

  var postDataString = '';
  req.on('data', (chunk) => {
    postDataString = chunk;
    console.log("req.............on");//--> nếu bị lỗi thì lặp lại 2 lần lệnh này, mỗi lần cho một giá trị khác nhau, không biết tại sao?
  });
  console.log("req.............2");
  req.on('end', () => {
    console.log("req.............end");
    try {
      req.json_data = JSON.parse(postDataString); //--> lỗi tại dòng này...
      console.log("req.............try");
      let updateTable = {
        name: 'users',
        cols: [
          {
            name: 'password',
            value: req.json_data.password
          },
          {
            name: 'fullname',
            value: req.json_data.fullname
          },
          {
            name: 'email',
            value: req.json_data.email
          },
          {
            name: 'phone',
            value: req.json_data.phone
          },
          {
            name: 'url_image',
            value: req.json_data.image
          }
        ],
        wheres: [
          {
            name: 'username',
            value: req.json_data.username
          }
        ]
      }
      db.update(updateTable)
        .then(data => {
          res.send("1");
          console.log("req.............then");
        })
        .catch(err => {
          res.send("0");
        });
    } catch (err) {
      res.send("0");
      console.log("req.............catch");
    }
  })
}

module.exports = {
  postLogin: postLogin,
  postConfirm: postConfirm,
  postRegister: postRegister
};