let express = require('express');
let router = express.Router();

//当客户端以GET方法访问/的时候，执行对应的回调函数
router.get('/',function(req,res){
  res.send('首页');
});

module.exports = router;