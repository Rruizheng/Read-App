var windowWidth = $(window).width();
if(windowWidth < 320){
    widowWidth = 320;
};
var app = new Vue({
    el: '#root',
    data: {
        //屏幕数据
        screen_width:windowWidth,
        double_screen_width:windowWidth*2,
    }
});