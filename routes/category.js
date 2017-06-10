let express = require('express');
let router = express.Router();
router.get('/add',function(req,res){
    res.send('增加分类');
});
module.exports = router;