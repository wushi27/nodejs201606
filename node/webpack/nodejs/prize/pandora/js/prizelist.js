//var HOST = 'http://localhost:9997';
(function(){
    var uid = getQueryString('uid');
    var id =  getQueryString('id');
    $.ajax({
        url:'/callservice/activityFrontService/getPrizeList?uid='+uid+'&id='+id,
        dataType:'json',
        success:function(data){
            console.log(data);
            if(data['rStatus'] == 200){
                data['rContent'].forEach(function(value,key){
                    //console.log(value);
                    //console.log(key);
                    switch(parseInt(value['status'])){
                        case 0:
                            value['statusText'] = '未使用';
                            break;
                        case 99:
                            value['statusText'] = '已失效';
                            break;
                        case 1:
                            value['statusText'] = '已确认地址';
                            break;
                        case 2:
                            value['statusText'] = '已发货';
                            break;
                        case 11:
                            value['statusText'] = '已使用';
                            break;
                        default:
                            value['statusText'] = '未确认';
                            break;
                    }
                });
                var htmlstr = template('prizelist_tpl', data);
                //console.log(htmlstr);
                $('body').html(htmlstr);
            }else{
                location.href = '404.html';
            }
        },
        error:function(){
			location.href = '404.html';
        }
    });


})();