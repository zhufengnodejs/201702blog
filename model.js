//1.引入mongoose模块
let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let config = require('./config');
//2.连接数据库
mongoose.connect(config.dbUrl);
//3.定义Schema 定义文档的属性名和属性的类型
let UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
});
// 4.定义模型
let User = mongoose.model('User',UserSchema);
exports.User = User;

let CategorySchema = new mongoose.Schema({
    name:String
});
//得到分类的模型
let Category = mongoose.model('Category',CategorySchema);
//把操作数据库的模型导出
exports.Category = Category;

let ArticleSchema = new mongoose.Schema({
    title:String,
    content:String,
    //ref表示此外键引用的是User集合的主键
    user:{type:ObjectId,ref:'User'}//成为一个外键
});
let Article = mongoose.model('Article',ArticleSchema);
exports.Article = Article;