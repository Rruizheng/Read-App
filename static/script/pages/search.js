var windowWidth = $(window).width();
if(windowWidth < 320){
    widowWidth = 320;
};

new Vue({
    el: "#root",
    data: {
        //屏幕数据
        screen_width:windowWidth,
        double_screen_width:windowWidth*2,
        search: [],
        condition: true,
        empty: false,
    },
    methods:{
        doSearch: function(e){
            var keyword = $('#search_box').val();
            var _this = this;
            $.get('/ajax/search',{
                keyword:keyword
            },function(d){
                _this.condition = false;
                _this.search = d.items;
                if(_this.search.length == 0){
                    _this.empty = true;
                }else{
                    _this.empty = false;
                }
            },'json')
        }
    }

});