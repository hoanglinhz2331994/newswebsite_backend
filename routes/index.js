var express = require('express');
var router = express.Router();

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'tintuc',
  password: '123abc',
  port: 5432,
})

router.get('/getData',function(req, res, next){
  pool.query('SELECT * FROM tintuc ORDER BY id DESC LIMIT 6',(error,response)=>{
    if(error){
      console.log(error);
    }else{
      console.log(response);
      res.send(response.rows)
    }
    //pool.end();
  })
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin',{})
});

router.post('/admin', function(req, res, next) {
  var title = req.body.title,
      content = req.body.content,
      img = req.body.img;

      pool.query("insert into tintuc (title,content,img) values ($1,$2,$3)",[title,content,img],(err,response)=>{
        if(err){
          res.send(err);
        }else{
          res.send('Đã inseet dữ liệu thành công '+ title + content + img);
        }
      })
  
});

module.exports = router;
