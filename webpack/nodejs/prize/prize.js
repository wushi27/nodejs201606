/*
 * send:会自动加入一些设置，比如head头信息，http缓存支持等等。
 * 可以理解为一个优化过的函数。
 *
 * */
//get和post获取参数
var express = require('express');
var fs = require('fs');
var moment = require('moment');
var path = require('path');
//处理post需要引入这个中间件,处理的是application/x-www-form-urlencoded
var bodyParser = require('body-parser');

var app = express();
//使用中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
//静态资源的获取：
//console.log(path.join(__dirname, 'pandora')) ;
app.use(express.static(path.join(__dirname, 'pandora')));

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


//倒计时接口
app.post('/callservice/activityFrontService/getActivityInfo',function(req,res){
    var now = moment().format("YYYY-MM-DD HH:mm:ss");

    res.send({
        "rStatus": "200",
        "rMessage": "查询成功",
        "rContent": {
            "currentTime": now,
            "startTime": "2016-05-01 12:00:00",
            "endTime": "2016-06-01 12:30:30",
            "status": 1
        }
    });
});
//抽奖接口
app.post('/callservice/activityFrontService/letsGo',function(req,res){
    var random = Math.floor(Math.random()*10);
    var num = fs.readFileSync('./count.txt','utf8');
    num = parseInt(num);
    //console.log(parseInt(num)-1);
    if(random ==7 && num > 0){
		if(num >1){
			res.send({
            "rStatus": "200",
            "rMessage": "恭喜中奖",

            "rContent": {
                "prizeName": "聪明的一休",
                "prizeCode": "JP000002",
                "status":"100"
            }
        });
			
		}
		else{
			res.send({
            "rStatus": "200",
            "rMessage": "恭喜中奖",

            "rContent": {
                "prizeName": "北海道牛乳千层糕",
                "prizeCode": "JP000001",
                "status":"100"
            }
        });			
			
		}

        --num;
        if(num >-1)
            fs.writeFileSync('count.txt',num);

    }else{
        res.send({

            "rStatus": "-1",
            "rMessage": "潘朵拉小姐Fighting！",
            "rContent": ""
        });

    }

});

//中奖列表
app.get('/callservice/activityFrontService/getPrizeList',function(req,res){
    var num = fs.readFileSync('./count.txt','utf8');
    num = parseInt(num);
    if( num ===0){
        res.send({
            "rStatus": "200",
            "rMessage": "查询成功",
            "rContent": [
                {
                    "name": "北海道牛乳千层糕",
                    "prizeCode": "JP000001",
                    "status": 0,
                    "startTime":"2016-06-01 13:30:30",
                    "endTime":"2016-06-03 19:30:30"
                },
                {
                    "name": "聪明的一休",
                    "prizeCode": "JP000002",
                    "status": 0,
                    "startTime":"2016-06-01 13:30:30",
                    "endTime":"2016-06-03 19:30:30"
                }
            ]
        });
    }else{
        res.send({
            "rStatus": "200",
            "rMessage": "查询成功",
            "rContent": [
                {
                    "name": "北海道牛乳千层糕",
                    "prizeCode": "JP000001",
                    "status": 0,
                    "startTime":"2016-06-01 13:30:30",
                    "endTime":"2016-06-03 19:30:30"
                }
            ]
        });
    }

});
//查询当前用户中奖个数(奖箱奖品数)
app.get('/callservice/activityFrontService/getPrizeNum',function(req,res){
    var num = fs.readFileSync('./count.txt','utf8');
    num = parseInt(num);
    res.send({
        "rStatus": "200",
        "rMessage": "查询成功",
        "rContent": {
            "prizeNum": (2-num)
        }
    });
});
//查询当前活动剩余奖品数
app.get('/callservice/activityFrontService/remainPrize',function(req,res){
    var num = fs.readFileSync('./count.txt','utf8');
    num = parseInt(num);
    res.send({
        "rStatus": "200",
        "rMessage": "查询成功",
        "rContent": {
            "activityId": "ab",
            "prizeReminNum": num
        }

    });
});

app.listen(9997);