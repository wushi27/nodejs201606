var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry:'./entry.js',//指定打包入口文件，每有一个键值对，就是一个入口文件。
    output:{
        path:__dirname,//定义输出文件夹
        filename:"./dest/bundle.js"
    },
    module:{
        loaders:[//定义一系列加载器。
            //{test:/\.css$/,loader:"style!css"},//匹配css文件时，就用css和style两个加载器处理。
            //{test:/\.less$/,loader:"style!css!less"},//匹配css文件时，就用css和style两个加载器处理。
            {test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
            {test:/\.less$/,loader:ExtractTextPlugin.extract("style-loader","css-loader!less-loader")},
            //两种传参方式：1.?后面加参数 2.query:{}方式。不合并，插件是es2015.
            {test:/\.js?$/,loader:'babel-loader',exclude:/node_modules/,query:{compact:false,presets:['es2015','react']}}
        ]

    },
    plugins: [
        new ExtractTextPlugin("./dest/bundle.css")
    ]

};
