$.get('/ajax/rank',function(d){
    //自适应屏幕宽度
    
	var windowWidth = $(window).width();
	if(windowWidth < 320){
		widowWidth = 320;
	}
    for(var i=0;i<d.items.length;i++){
         d.items[i].description = d.items[i].description.split('/');
     }
    new Vue({
        el: "#root",
        data:{
            d,
            screen_width:windowWidth,
			double_screen_width:windowWidth*2,
        },
    });
},'json')