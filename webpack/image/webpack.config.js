module.exports = {
    entry:'./entry.js',//指定打包入口文件，每有一个键值对，就是一个入口文件。
    output:{
        path:__dirname,//定义输出文件夹
        filename:"bundle.js"
    },
    module:{
        loaders:[//定义一系列加载器。
            {test:/\.css$/,loader:"style!css"},//匹配css文件时，就用css和style两个加载器处理。
            {test:/\.(jpg|gif|png)$/,loader:"url?limit=4000"},//图片小于4k就转为base64，否则还是外链。
        ]
    }
};
