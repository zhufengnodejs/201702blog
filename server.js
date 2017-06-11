let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
//会话中间件
let session = require('express-session');
//是一个消息提示模块
let flash = require('connect-flash');
//把会话数据保存在数据库中
let MongoStore = require('connect-mongo')(session);
let app = express();
app.use(bodyParser.urlencoded({extended:true}));
//设置模板引擎
app.set('view engine','html');
//设置模板的存放目录
app.set('views',path.resolve('views'));
let config = require('./config');
//如果模板后缀是HTML的话，使用EJS模板引擎的方法来进行渲染
app.engine('html',require('ejs').__express);
//使用了会话中间件 req.session
app.use(session({
    secret:'zfpx',//秘钥
    resave:true,//每次都重新保存
    saveUninitialized:true,//保存未初始化的session
    //session数据默认会存放在服务器端的内存里
    store:new MongoStore({
        url:config.dbUrl
    })
}));
//使用此中间件之后会往 req.flash
app.use(flash());
app.use(function(req,res,next){
    //给res.locals赋值则意味着所有的模板都能用
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    res.locals.user = req.session.user;
    res.locals.keyword = '';
    next();
});
//静态文件中间件的参数是静态文件根目录
app.use(express.static(path.resolve('node_modules')));
app.use(express.static(path.resolve('public')));
//返回一个路由中间件
let index = require('./routes/index');
let user = require('./routes/user');
let article = require('./routes/article');
let category = require('./routes/category');
//如果客户端请求的路径是以/开头的话，才会交由index路由中间件来处理
// /user/signup/s/s/s/s
// /xxx
app.use('/',index);
//如果请求的URL地址是以/user开头的话
app.use('/user',user);
app.use('/article',article);
app.use('/category',category);
app.use(function(req,res,next){ // 404
 res.render('404',{title:'你的页面走丢了'});
});
app.listen(8080);