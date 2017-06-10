let express = require('express');
let app = express();
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