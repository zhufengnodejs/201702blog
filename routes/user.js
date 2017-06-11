let express = require('express');
let router = express.Router();
let User = require('../model').User;
let utils = require('../utils');
let multer = require('multer');
let middleware = require('../middleware');
//在NODE的文件路径是相对启动的文件 相对于server.js
let upload = multer({dest:'./public/uploads'});
//当客户端访问 /user/signup 路径的时候，会交由此路由来进行处理
router.get('/signup',middleware.checkNotLogin,function(req,res){
  res.render('user/signup',{title:'用户注册'});
});
//upload.single('avatar') 会返回一个中间件函数
router.post('/signup',middleware.checkNotLogin,upload.single('avatar'),function(req,res){
    //1.得到客户端提交过来的请求体
    let user = req.body;
    // /uploads/3030a92278ccf4e47197063e4e72a858
    user.avatar = `/uploads/${req.file.filename}`;
    user.password = utils.encry(user.password);
    //先查询一下跟此用户名相同的用户还是否存在
    User.findOne({username:user.username},function(err,oldUser){
        if(err){
            res.redirect('back');
        }else{
            if(oldUser){
                req.flash('error','此用户名已经被占用，请换一个用户名吧');
                res.redirect('back');
            }else{
                User.create(user,function(err,doc){
                    if(err){
                        //如果error有值，就表示注册失败，返回注册面页继续填写
                        res.redirect('back');
                    }else{
                        //如果注册成功，跳转到登录页
                        res.redirect('/user/signin');
                    }
                });
            }
        }

    });

});
router.get('/signin',middleware.checkNotLogin,function(req,res){
  res.render('user/signin',{title:'用户登录'});
});
router.post('/signin',middleware.checkNotLogin,function(req,res){
  let user = req.body;
  user.password = utils.encry(user.password);
  User.findOne(user,function(err,doc){
     if(err){
         res.redirect('back');
     }else{
         if(doc){
             //向会话中写入一个消息，消息类型 消息内容
            req.flash('success','登录成功');
            //把当前登录成功后的用户对象放置到session对象中
            req.session.user = doc;
            //req.session.success = '登录成功';
            res.redirect('/');
         }else{
             req.flash('error','登录失败');
            //req.session.error = '登录失败';
            res.redirect('back');
         }
     }
  });
});
router.get('/signout',middleware.checkLogin,function(req,res){
   req.session.user = null;
   res.redirect('/user/signin');
});
module.exports = router;

/**
 {
  fieldname: 'avatar', 字段名 表单中的input框的name属性
  originalname: 'avatar.png', 上传的文件的原始文件名
  encoding: '7bit',
  mimetype: 'image/png',文件类型 大类型/小类型
  destination: './public/uploads', //上传文件的保存路径
  filename: '3030a92278ccf4e47197063e4e72a858',//在服务器端保存时候的文件名
  path: 'public\\uploads\\3030a92278ccf4e47197063e4e72a858',
  size: 8738
  }
 **/