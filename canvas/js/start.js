/**
 * Created by 170157 on 2016/6/6.
 */
var Timeline = function(){
    this.order = [];
    this.add = function(timeout,func,name,log){
        this.order.push({
            timeout:timeout,
            func:func,
            log:log
        });
    };
    this.start = function(){
        for(s in this.order){
            (function(me){
                var fn = me.func;
                var timeout = me.timeout;
                var log = me.log;
                setTimeout(fn,timeout);
                setTimeout(function(){
                    console.log(log);
                }.timeout);
            })(this.order[s]);
        }
    }
}
var s1 = new Timeline();
var s2 = new Timeline();
var s3 = new Timeline();
s1.add(1,function(){
    $('#clickzongzi').attr('class','c_zongzi_box c_zongzi_box_rock');
    $('#clickzongzi').click = function(){
        alert('sss');
        s2.start();
        //$('.c_shengzi_1').click = function(){
        //
        //}
    };
});
s2.add(1,function(){
    $('.c_zongzi_box').attr('class','c_zongzi_box');
});