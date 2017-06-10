let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();
//设置模板引擎
app.set('view engine','html');
//设置模板的存放目录
app.set('views',path.resolve('views'));
//如果模板后缀是HTML的话，使用EJS模板引擎的方法来进行渲染
app.engine('html',require('ejs').__express);
//使用bodyParser中间件
app.use(bodyParser.urlencoded({extended:true}));
//静态文件中间件的参数是静态文件根目录
app.use(express.static(path.resolve('node_modules')));
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
app.listen(8080);