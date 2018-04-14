var sex = location.href.split('/').pop();

$.get('/ajax/'+sex,function(d){
   	//自适应屏幕宽度
	var windowWidth = $(window).width();
	if(windowWidth < 320){
		widowWidth = 320;
	}
   
    new Vue({
        el:"#root",
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