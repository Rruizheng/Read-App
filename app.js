var koa = require('koa');
//koa-route，get,post方法接受http请求，并调用对应的函数
var controller = require('koa-route');
var app = koa();

var views = require('co-views');
var render = views('./view',{
    map:{html:'ejs'}
});

//静态文件提取
var koa_static = require('koa-static-server');
//api接口提取
var service = require('./service/webAppService.js');
//启动koa,静态文件
app.use(koa_static({
    rootDir: './static/',
    rootPath: '/static/',
    maxage: 0,
}));
//路由测试
app.use(controller.get('/route_test',function*(){
    this.set('Cache-Control','no-cache');
    this.body = 'Hello';
}));
//esj测试,渲染页面,模板
app.use(controller.get('/ejs_test',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('test',{title:'title_test'});
}));

//数据api测试，api
app.use(controller.get('/api_test',function*(){
    this.set('Cache-Control','no-cache');
    this.body = service.get_test_data();
}));



//页面路由。。。。。。。。
//首页渲染
app.use(controller.get('/',function*(){
    this.set('Cache-Control','no-cache');
    this.body = yield render('index');
}));
//书架
app.use(controller.get('/backet', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('backet');
}));
//书籍
var querystring = require('querystring')
app.use(controller.get('/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var bookId = params.id;
	this.body = yield render('book',{nav:'书籍详情',bookId:bookId});
}));
//搜索
app.use(controller.get('/search', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('search',{nav:'搜索'});
}));
//阅读器
app.use(controller.get('/reader', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('reader');
}));
//频道
app.use(controller.get('/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('male',{nav:'男生频道'});
}));

app.use(controller.get('/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('female',{nav:'女生频道'});
}));
//用户中心
app.use(controller.get('/usercenter', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('user-center',{nav:'用户中心'});
}));
//排行
app.use(controller.get('/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('rank',{nav:'排行'});
}));
//目录
app.use(controller.get('/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('category',{nav:'分类'});
}));


//数据路由
//首页的路由
app.use(controller.get('/ajax/index',function*(){
    this.set('Cache-Control','no-cache');
    this.body = service.get_index_data();
}));

//排序的路由
app.use(controller.get('/ajax/rank',function*(){
    this.set('Cache-Control','no-cache');
    this.body = service.get_rank_data();
}));

//书籍的路由
app.use(controller.get('/ajax/book',function*(){
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    this.body = service.get_book_data(id);
}));

app.use(controller.get('/ajax/reader', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_chapter_data();
}));

//章节的路由
app.use(controller.get('/ajax/chapter',function*(){
    this.set('Cache-Control','no-cache');
    this.body = service.get_chapter_data();
}));


//章节的内容this.req._parsedUrl.query
app.use(controller.get('/ajax/chapter_data', function*(){
    this.set('Cache-Control', 'no-cache');
    var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);
	var id = params.id;
	if(!id){
	   id = "";
	}
	this.body = service.get_chapter_content_data(id);
}));

//频道
app.use(controller.get('/ajax/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_male_data();
}));

app.use(controller.get('/ajax/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_female_data();
}));

//目录
app.use(controller.get('/ajax/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_category_data();
}));


//搜索功能，http请求转发。已经有线上接口了，做数据调试
app.use(controller.get('/ajax/search',function*(){
    this.set('Cache-Control','no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start,end,keyword);
}));


app.listen(3001);
console.log('koa');
