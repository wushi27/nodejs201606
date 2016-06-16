//喇叭声波
//http://localhost:8686/didi/index.html?id=ab&uid=wanglei&uname=wanglei&phone=1333333333&apptype=1
//var HOST = 'http://localhost:9997';
$(function(){

    var timeStart = Date.parse(new Date());

    //定时刷新，5分钟
    var timer_freshPage = setInterval(function(){
        location.reload();
    },1000*300);
    (function ($wave) {
        function addWave(delay) {
            if (queue.length >= 6) {
                return;
            }
            var s = setTimeout(function () {
                var $$wave = $('<div style="visibility:visible;-webkit-animation:opac 2s;">');
                $wave.append($$wave);
                clearTimeout(s);
                queue.shift();
                setTimeout(function () {
                    $$wave.remove();
                }, 2000);
            }, delay);
            queue.push(s);

        }

        var time = 1, queue = [];
        var max_time = 30000;//两次点击间隔时间
        var max_count = 50;//最大点击次数

        var audioIndex = 0;
        var audio1 = document.getElementById('audioDiv');

        $('#laba').bind('touchstart', function () {
            clearInterval(timer_freshPage);//点击一次即剔除间隔函数。
            var audioId = "audio" + audioIndex;
            // var html = "<audio id='" + audioId + "' src='di.wav'></audio>";
            // $("#audioDiv").append(html);
            // audioIndex++;
            if (audio1.currentTime > 0.08) {
                audio1.currentTime = 0;
            }
            audio1.play();//开始播放
            $(".laba").css('background-position', '0 -5.79rem')
            $(".guangbo").show();
            if (time === 1) {
                addWave(0);
                addWave(300);
                addWave(600);
                addWave(900);
                addWave(1200);
            }
            else {
                addWave(0);
            }
            time++;
            /******************************次数统计和时差统计*******************************/
            /*
             *   1.连续点击：时差小于一秒，并且次数达到20次，发送一次请求。
             *   2.非连续点击：时差大于等于一秒，发送一次请求。
             *   3.发送请求结束后，次数跟起始时间重置。
             * */
            var timeEnd = Date.parse(new Date());

            //console.log(time);

            //console.log(timeEnd);
            if((timeEnd - timeStart) >= max_time){
                getPrize();

            }
            else if(time > max_count){
                getPrize();
                time = 1;
            }
//时间重置
            timeStart = Date.parse(new Date());
            /******************************次数统计和时差统计*******************************/
        });
    }($('div.wave')));


    $("#laba").bind("touchend", function () {
        $(".laba").css('background-position', '0 0');
    });
    $('#closeMe').click(function(e){
        hideAll();
        updatePrizeRemain();//加载总剩余数
        timeStart = Date.parse(new Date());
        updatePrizeCount();
    });
    //updatePrizeRemain();//加载总剩余数
    loadPrizeData();//加载奖品盒
    //var param = getParam();
    //alert(param.uname);
    function getPrize(){

        var param = getParam();
        //alert(param.uname);
        var url = '/callservice/activityFrontService/letsGo';//?id='+param.id+'&uid='+param.uid+'&uname='+param.uname+'&phone='+param.phone+'&apptype='+param.apptype;
        var data_param = {id:param.id,uid:param.uid,uname:param.uname,phone:param.phone,apptype:param.apptype};
        $.ajax({
            url:url,
            dataType:'json',
            type:'post',
            data:data_param,
            success:function(data){
                console.log(data);
                hideAll();
                $('.closeWin').show();
                if(data['rStatus']!=-1){
                    //测试代码
                    if(data['rContent']['status']==100){//中奖了
                        if(data['rContent'] && (Object.prototype.toString.call(data['rContent']) == "[object String]"))
                            var json  = JSON.parse(data['rContent']);
                        else
                            var json = data['rContent'];
                        data['content'] = json;


                        var htmlstr = template('prize_tpl', data);
                        //console.log(htmlstr);
                        $('#okprize').html(htmlstr);



                        updatePrizeCount(data);//刷新奖品数
                        //updatePrizeRemain();
                        $('#okprize').show();

                    }else if(data['rContent']['status'] ==3){//活动过期了
                        //活动过期
                        //location.href = 'over.html?uid='+param.uid+'&id='+param.id;
                        hideOthers();
                        //渲染奖品箱
                        render_box(param.id,param.uid);
                        //if(sessionStorage.getItem('prizeStorage')){
                        //    //console.log(sessionStorage.getItem('prizeStorage'));
                        //    var prizeStorage = JSON.parse(sessionStorage.getItem('prizeStorage'));
                        //    var htmlstr3 = template('getprize_tpl', prizeStorage);
                        //    $('#animateTest1').html(htmlstr3);//按钮渲染
                        //    $('#animateTest1').on('click',gotoPrizeList);
                        //}else{
                        //    $('#animateTest1').off('click');
                        //}
                        //
                        //
                        //$('#over').show();
                    }else{//没有中奖
                        //alert('tttt');
                        var htmlstrnoprize = template('noprize_tpl', data);
                        //console.log(data);
                        //data['content'] = data['rMessage'];
                        $('#noprize').html(htmlstrnoprize);
                        $('#noprize').show();
                    }
                }else{
                    //location.href = '404.html';
                    //alert('tttt');
                        var htmlstrnoprize = template('noprize_tpl', data);
                        //console.log(data);
                        //data['content'] = data['rMessage'];
                        $('#noprize').html(htmlstrnoprize);
                        $('#noprize').show();
                }

            },
            error:function(){
				//location.href = '404.html';
            }
        });
    }

    function loadPrizeData(){
        updatePrizeCount();

    }

});



//倒计时
$(function(){

    var param = getParam();
    //console.log(param);
    var url = '/callservice/activityFrontService/getActivityInfo';//?id='+param.id+'&uid='+param.uid+'&uname='+param.uname+'&phone='+param.phone+'&apptype='+param.apptype;
    console.log(url);
    var data_param = {id:param.id,uid:param.uid,uname:param.uname,phone:param.phone,apptype:param.apptype};
    $.ajax({
        url:url,
        dataType:'json',
        type:'post',
        data:data_param,
        //beforeSend: function (request) {
        //    request.setRequestHeader('Content-Type','application/json; charset=UTF-8');
        //},
        success:function(data){
            //alert('ccc');
            console.log(data);
            if(data['rStatus']!=-1){
                if(data['rContent']['status'] == 1 || data['rContent']['status']==0){
                    var endTime = data['rContent']['startTime'].replace(/-/g,'/');
                    var currentTime = data['rContent']['currentTime'].replace(/-/g,'/');
                    //alert(endTime);alert(currentTime);
                    //console.log(endTime);
                    countDown(endTime,"#colockbox1",currentTime);
                }else{
                    //countDown(endTime,"#colockbox1");//测试代码
                   // location.href = 'over.html?uid='+param.uid+'&id='+param.id;
                    hideOthers();
                    //渲染奖品箱
                    render_box(param.id,param.uid);
                    //$('#over').show();
                }
            }else{
                //location.href = '404.html';
            }

        },
        error:function(){
            //alert('ttt');
            //console.log();
			//location.href = '404.html';
        }
    });

});
function getParam(){
    //alert('sss');
    //var temp = getQueryString('uname');
    //alert(temp);
    //temp = decodeURI(temp);
    //alert(temp);
    var obj = {};
    obj.id = getQueryString('id');//活动号
    obj.uid = getQueryString('uid');//用户id
    obj.uname = getQueryString('uname');//用户name
    obj.phone = getQueryString('phone');//用户phone
    obj.apptype = getQueryString('apptype');
    return obj;
}
//跳转到奖品列表页
function gotoPrizeList(){
    var obj = getParam();
    location.href = 'prizelist.html?uid='+obj.uid+'&id='+obj.id;
}
//剩余奖品数量
function updatePrizeCount(){
    //console.log(data);
    var data = arguments[0];
    var param = getParam();
    var url_getPrizeNum = '/callservice/activityFrontService/getPrizeNum?uid='+param.uid+'&id='+param.id;
    var url_remainPrize = '/callservice/activityFrontService/remainPrize?id='+param.id;

    $.when($.ajax({url:url_getPrizeNum,dataType:'json'}),$.ajax({url:url_remainPrize,dataType:'json'}))
        .done(function(data_num,data2){
            if(data_num[0]['rStatus']!=-1 && data2[0]['rStatus']!=-1){
                //console.log(data1[0]);console.log(data2[0]);
                if(data){
                    data['content']['prizeNum'] =  data_num[0]["rContent"]["prizeNum"];
                    // 记入缓存中，刷新读取。

                    sessionStorage.setItem('prizeStorage',JSON.stringify(data));
                    // console.log(sessionStorage.getItem('prizeStorage'));
                    var htmlstr2 = template('getprize_tpl', data);
                    $('#animateTest').html(htmlstr2);//按钮渲染
                    $('#animateTest').on('click',gotoPrizeList);

                    //------------------------------------------------------------------//

                    // alert(data2[0]["rContent"]['prizeReminNum']);
                    //sessionStorage.setItem('prizeRemainNum',data2[0]["rContent"]['prizeReminNum']);
                    $('#prize_left').text(data2[0]["rContent"]['prizeReminNum']);
                }else{
                    //单独渲染奖品盒
                    console.log(data_num);
                    if(data_num[0]["rContent"] && data_num[0]["rContent"]['prizeNum']>0){
                        var htmlstr = template('prize_box', data_num[0]["rContent"]);
                        $('#animateTest').html(htmlstr);//按钮渲染
                        $('#animateTest').on('click',gotoPrizeList);
                    }
                    else{
                        $('#animateTest').off('click');
                    }

                    //渲染奖品剩余数量
                    $('#prize_left').text(data2[0]["rContent"]['prizeReminNum']);
                }
            }else{
               // location.href = '404.html';
            }



        }).fail(function(){
			//location.href = '404.html';
        });


}
function hideAll(){

    $('#noprize').hide();
    $('#okprize').hide();
    $('.closeWin').hide();
    $('#loading').hide();
}
function hideOthers(){
    $('#qiehuan').hide();
    $('#dididi').hide();
    $('#over').hide();
    $('#loading').hide();
}
//刷新时的剩余总数量
function  updatePrizeRemain(){
    var id = getQueryString('id');//活动号
    var url = '/callservice/activityFrontService/remainPrize?id='+id;
    //console.log(url);
    $.ajax({
        url:url,
        dataType:'json',
        success:function(data){
            console.log(data);
            if(data['rStatus'] ==200){
                if(data['rContent'] && (Object.prototype.toString.call(data['rContent']) == "[object String]"))
                    var obj = JSON.parse(data['rContent']);
                else
                    var obj = data['rContent'];
                //(data['rContent']['prizeReminNum']);
                $('#prize_left').text(obj['prizeReminNum']);
            }else{
               // location.href = '404.html';
            }

        },
        error:function(){
				//location.href = '404.html';
        }
    });
}
//倒计时函数
function countDown(time,id,currentTime){
    var day_elem = $(id).find('.day');
    var hour_elem = $(id).find('.hour');
    var minute_elem = $(id).find('.minute');
    var second_elem = $(id).find('.second');
    var end_time = new Date(time).getTime();//月份是实际月份-1
	var current_time = new Date(currentTime).getTime();
    var sys_second = (end_time-current_time)/1000;
    var timer = setInterval(function(){
        if (sys_second > 1) {
            sys_second -= 1;
            var day = Math.floor((sys_second / 3600) / 24);
            var hour = Math.floor((sys_second / 3600) % 24);
            var minute = Math.floor((sys_second / 60) % 60);
            var second = Math.floor(sys_second % 60);
            day_elem && $(day_elem).text(day);//计算天
            $(hour_elem).text(hour<10?"0"+hour:hour);//计算小时
            $(minute_elem).text(minute<10?"0"+minute:minute);//计算分钟
            $(second_elem).text(second<10?"0"+second:second);//计算秒杀
        } else {
            clearInterval(timer);
            //首页 向 嘀嘀嘀页面切换动画 加了类 samllbig-dd

            $("#qiehuan").hide();
            $("#dididi").addClass('samllbig-dd');
            $("#dididi").show();

        }
    }, 1000);
}
function render_box(id,uid){
    var url_getPrizeNum = '/callservice/activityFrontService/getPrizeNum?uid='+uid+'&id='+id;
    $.ajax({
        url:url_getPrizeNum,
        dataType:'json',
        type:'get',
        success:function(data_num){
            console.log(data_num);
            if(data_num["rContent"] && data_num["rContent"]['prizeNum']>0){
                var htmlstr = template('prize_box', data_num["rContent"]);
                $('#animateTest1').html(htmlstr);//按钮渲染
                $('#animateTest1').on('click',gotoPrizeList);

            }
            else{
                $('#animateTest1').off('click');
            }
            $('#over').show();
        },
        error:function(xhr){
            //location.href = '404.html';
        }
    });
    //if(sessionStorage.getItem('prizeStorage')){
    //    //console.log(sessionStorage.getItem('prizeStorage'));
    //    var prizeStorage = JSON.parse(sessionStorage.getItem('prizeStorage'));
    //    var htmlstr3 = template('getprize_tpl', prizeStorage);
    //    $('#animateTest1').html(htmlstr3);//按钮渲染
    //    $('#animateTest1').on('click',gotoPrizeList);
    //}else{
    //    $('#animateTest1').off('click');
    //}


    //$('#over').show();
}





