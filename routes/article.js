let express = require('express');
let router = express.Router();
let Article = require('../model').Article;
let Category = require('../model').Category;
router.get('/add',function(req,res){
  Category.find({},function(err,categories){
      res.render('article/add',{title:'发表文章',categories,article:{}});
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
router.get('/detail/:_id',function(req,res){
  //根据文章的ID查询文章的对象并且渲染到页面中
  //increase 把原来的值加1
  Article.update({_id:req.params._id},{$inc:{pageView:1}},function(err,result){
      Article.findById(req.params._id)
          .populate('category') //把分类ID变成分类对象
          .populate('user')     //把用户ID变成用户对象
          .exec(function (err, article) {
              res.render('article/detail',{title:'文章详情',article});
          })
  });

});
router.get('/delete/:_id',function(req,res){
  Article.remove({_id:req.params._id},function(err,result){
     if(err){
          res.redirect('back');
     }else{
         res.redirect('/');
     }
  });
});

router.get('/update/:_id',function(req,res){
  Article.findById(req.params._id).exec(function(err,article){
    Category.find({},function(err,categories){
        console.log(article);
       res.render('article/add',{title:'更新文章',article,categories});
    });
  });
});
router.post('/update/:_id',function(req,res){
  let _id = req.params._id;
  let article = req.body;
  Article.update({_id},article,function(err,result){
    if(err){
        res.redirect('back');
    }else{
        res.redirect(`/article/detail/${_id}`);
    }
  });
});


module.exports = router;
// <%if(user

// user 模板里的一个变量
// 这个变量从渲染模板的数据对象中取值的
// 这个数据对象 res.locals
// res.locals.user 是从会话对象中取的 req.session.user
// req.session.user是在登录成功之后把查找的用户对象传给req.session的