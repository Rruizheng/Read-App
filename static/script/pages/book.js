//取得id,但是存在问题，id不存在会报错
var id = location.href.split('?id=').pop();

$.get('/ajax/book?id='+id,function(d){
    //自适应屏幕宽度
	var windowWidth = $(window).width();
	if(windowWidth < 320){
		widowWidth = 320;
	}
    new Vue({
        el: "#app",
        data:{
            d,
            screen_width:windowWidth,
			double_screen_width:windowWidth*2,
        },   
        methods:{
            readBook: function(){
                location.href = "/reader";
            }
        }
    });
},'json');