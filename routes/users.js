var express = require('express');
var router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registerProcess', function(req, res, next) {

  const { username, email, password, password2 } = req.body;

  const checkUserExistsQuery = `SELECT * FROM users WHERE username = $1 OR email = $2`
  db.any(checkUserExistsQuery, [username, email]).then((results)=>{
    if(results.length > 0) {
      // this user already exists
      res.redirect('/login?msg=userexists')
    }else{
      // new user. insert
      insertUser();

    }
  })

  function insertUser(){
  const insertUserQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) returning id`

const hash = bcrypt.hashSync(password, 10);

  db.one(insertUserQuery, [username, email, hash]).then((resp)=>{
    res.json({
      msg: resp
    })
  })
}
})

module.exports = router;
