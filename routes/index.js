let express = require('express');
let router = express.Router();
let Article = require('../model').Article;
//当客户端以GET方法访问/的时候，执行对应的回调函数
router.get('/',function(req,res){
  //populate填充，用来把外键字段从字符串转成对应的文档对象
  Article.find({}).populate('user').exec(function(err,articles){
      res.render('index',{title:'首页',articles});
  });
});

module.exports = router;