let express = require('express');
let router = express.Router();
let Category = require('../model').Category;
router.get('/add',function(req,res){
    res.render('category/add',{title:'增加分类'});
});
router.post('/add',function(req,res){
    let category = req.body;
    Category.create(category,function(err,doc){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('/category/list');
        }
    })
});
router.get('/list',function(req,res){
    Category.find({},function(err,categories){
        res.render('category/list',{title:'分类列表',categories});
    });
});
router.get('/delete/:_id',function(req,res){
    Category.remove({_id:req.params._id},function(err,result){
        if(err){
            res.redirect('back');
        }else{
            res.redirect('back');
        }
    });
});
module.exports = router;