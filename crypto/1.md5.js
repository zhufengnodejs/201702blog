/**
 * MD5是一种哈希算法 hash
 * SHA1 也是一种哈希算法
 * 1. 它可以任意长度的输入转成固定长度的输出
 * 2. 输入不同，输出肯定也不同
 * 3. 相同的输入一定会产生相同的输出
 * 4. 不能从输出的字符串中反推输入的内容
 *
 * 密码的明文保存是非常危险，因为如果数据库泄露，那么密码全暴露了
 *
 */
let crypto = require('crypto');
let str = '123456';
/*let result = crypto.createHash('md5').update(str)
    .digest('hex')//16进制*/
let result = crypto.createHmac('sha1','zfpx').update(str).digest('hex');
console.log(result);
//23b431acfeb41e15d466d75de822307c
//6512bd43d9caa6e02c990b0a82652dca
//a5769b7ddfb0750af32fc935fb47453fedb8ecad
