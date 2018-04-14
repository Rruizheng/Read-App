$.get('/ajax/category',function(d){
    var windowWidth = $(window).width();
    if(windowWidth < 320){
        widowWidth = 320;
    };
    new Vue({
        el: '#root',
        data:{
            screen_width:windowWidth,
            double_screen_width:windowWidth*2,
            d
        },
    });
},'json')