## 创建项目
```
mkdir 201702bog
cd 201702bog
npm init -y
```
## 安装依赖的模块
```
npm install express ejs body-parser debug express-session connect-mongo mongoose connect-flash multer bootstrap -S
```

## 配置路由
```
/ 首页

/user/signup  用户注册
/user/signin  登录
/user/signout 退出登录

/article/add 发表文章

/category/add 增加分类
```
