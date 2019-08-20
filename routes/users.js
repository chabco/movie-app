var express = require('express');
var router = express.Router();
const db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/registerProcess', function(req, res, next) {

  const { username, email, password, passowrd2 } = req.body;

  const insertUserQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) returning id`
  db.one(insertUserQuery, [username, email, password]).then((resp)=>{
    res.json({
      msg: 'useradded'
    })

  })

});

module.exports = router;
