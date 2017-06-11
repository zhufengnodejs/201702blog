let express = require('express');
let router = express.Router();
let Article = require('../model').Article;
let Category = require('../model').Category;
router.get('/add',function(req,res){
  Category.find({},function(err,categories){
      res.render('article/add',{title:'发表文章',categories});
  });
});
router.post('/add',function(req,res){
    let article = req.body;
    //文章的作者等于会话中用户对象的_id属性
    article.user = req.session.user._id;
    Article.create(article,function(err,doc){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/');
        }
    });
});
module.exports = router;
