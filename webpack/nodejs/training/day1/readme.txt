全栈工程师：
全栈工程师是指掌握多种技能，并能利用多种技能独立完成产品的人。
1.前端开发：
html，css，js特效，前端优化与实现，及各种自动化工具。
2.后端开发：
linux nodejs，常用框架。
3.移动端开发：
前端开发：html5，css3，bootstrap，angularjs等。
后端开发：nodejs
数据库：mongodb，redis，mysql，memcached等。
移动客户端：ionic，react，react-native
运维部署：linux，nginx，apache等。
为啥要成为全栈工程师？
全局思维。

什么是nodejs？
是js语言的服务器运行环境。
提供大量工具库，可以调用操作系统级别的api。
内部采用google公司的v8引擎，例如谷歌浏览器的console控制台。作为js语言的解释器，速度快。
nodejs是一个基于事件驱动和异步io的服务端js环境，跟nginx类似。
部署：forever，pm2，nodemon
测试：jasmine，karma，protractor

----------------------------------------------------
一个普通网站的访问过程：
浏览器向服务器发送一个http请求
先把域名解析为ip地址-》搜索操作系统缓存-》读取本地host文件-》发起dns系统调用
-》运营商dns缓存-》找根域-》com域
客户端通过随机端口向服务器发起tcp三次握手，建立了tcp链接。
链接建立后，浏览器就可以发送http请求了。
服务器接收到http请求，解析请求的路径和参数，经过后台的一些处理后，生成完整的响应页面。
服务器将生成的页面作为http的响应体，根据不同的处理结果生成响应头，发回客户端。
请求的方式：
http://user:pass@www.baidu.com:80/index.html?name=aaa&age=123