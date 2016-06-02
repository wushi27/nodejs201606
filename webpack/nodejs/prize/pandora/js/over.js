/**
 * Created by 170157 on 2016/4/28.
 */
loadPrizeData();
function loadPrizeData(){
    //读取缓存，刷新调用。
    if(sessionStorage.getItem('prizeStorage')){
        //console.log(sessionStorage.getItem('prizeStorage'));
        var prizeStorage = JSON.parse(sessionStorage.getItem('prizeStorage'));
        var htmlstr3 = template('getprize_tpl', prizeStorage);
        $('#animateTest').html(htmlstr3);//按钮渲染
        $('#animateTest').on('click',gotoPrizeList);
    }else{
        $('#animateTest').off('click');
    }
}
//跳转到奖品列表页
function gotoPrizeList(){
    var obj = getParam();
    location.href = "prizelist.html?uid="+obj.uid+"&id="+obj.id;
}
function getParam(){
    //alert('sss');
    var obj = {};
    obj.id = getQueryString('id');//活动号
    obj.uid = getQueryString('uid');//用户id
    //obj.uname = getQueryString('uname');//用户name
    //obj.phone = getQueryString('phone');//用户phone
    //obj.apptype = getQueryString('apptype');
    return obj;
}

//var time_referrer = setInterval(function(){
//    location.href = document.referrer;
//},10000);