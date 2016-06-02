//获取font-size
function size(){
    var w = $(window).width();
	//var h = $(window).height();
    var newfontsize = w/20;
	if(w>=640){
		newfontsize = 640/20;
		}

    $("html").css({"font-size":newfontsize});
	//$("body").css({"height":h});
}
size();
$(window).on("resize",size);

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}