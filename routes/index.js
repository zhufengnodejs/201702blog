let express = require('express');
let router = express.Router();
let Article = require('../model').Article;
//当客户端以GET方法访问/的时候，执行对应的回调函数
router.get('/',function(req,res){
  let {keyword,pageNum,pageSize} = req.query;
  pageNum = isNaN(pageNum)?1:parseInt(pageNum);//当前页码
  pageSize = isNaN(pageSize)?3:parseInt(pageSize);//每页的条数
  let query = {};
  if(keyword){
      let reg = new RegExp(keyword);
      query['$or'] = [{title:reg},{content:reg}];
  }
  //populate填充，用来把外键字段从字符串转成对应的文档对象
  Article.count(query,function(err,count){
      Article.find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('user').exec(function(err,articles){
          res.render('index',{
              title:'首页',
              keyword,
              totalPages:Math.ceil(count/pageSize),
              pageNum,//当前页码
              pageSize,//每页的数量
              articles
          });
      });
  });
});

module.exports = router;