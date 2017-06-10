let express = require('express');
let router = express.Router();
let User = require('../model').User;
//当客户端访问 /user/signup 路径的时候，会交由此路由来进行处理
router.get('/signup',function(req,res){
  res.render('user/signup',{title:'用户注册'});
});
router.post('/signup',function(req,res){
   //1.得到客户端提交过来的请求体
    let user = req.body;
    User.create(user,function(err,doc){
        if(err){
            //如果error有值，就表示注册失败，返回注册面页继续填写
            res.redirect('back');
        }else{
            //如果注册成功，跳转到登录页
            res.redirect('/user/signin');
        }
    });
});
router.get('/signin',function(req,res){
    res.send('登录');
});
router.get('/signout',function(req,res){
    res.send('退出');
});
module.exports = router;
