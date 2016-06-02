module.exports = {
    entry:{
        bundle1:'./entry1.js',
        bundle2:'./entry2.js'
    },//多入口文件
    output:{
        path:__dirname,//定义输出文件夹
        filename:"[name].js"
    },
    module:{
        loaders:[//定义一系列加载器。
            {test:/\.css$/,loader:"style!css"},//匹配css文件时，就用css和style两个加载器处理。
            //两种传参方式：1.?后面加参数 2.query:{}方式。不合并，插件是es2015.
            {test:/\.js?$/,loader:'babel-loader',exclude:/node_modules/,query:{compact:false,presets:['es2015']}}
        ]
    }
};
