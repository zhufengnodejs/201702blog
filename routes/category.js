let express = require('express');
let router = express.Router();
router.get('/add',function(req,res){
    res.render('category/add',{title:'增加分类'});
});
router.get('/list',function(req,res){
    res.render('category/list',{title:'分类列表'});
});
module.exports = router;