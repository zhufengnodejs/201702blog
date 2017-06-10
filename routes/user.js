let express = require('express');
let router = express.Router();
//当客户端访问 /user/signup 路径的时候，会交由此路由来进行处理
router.get('/signup',function(req,res){
  res.render('user/signup',{title:'用户注册'});
});
router.get('/signin',function(req,res){
    res.send('登录');
});
router.get('/signout',function(req,res){
    res.send('退出');
});
module.exports = router;
