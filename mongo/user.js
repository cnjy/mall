const mongoose = require('mongoose');

//连接数据库
mongoose.connect('mongodb://localhost:27017/shopCart');

//创建连接句柄
const db = mongoose.connection;

//利用句柄监听数据库连接
db.on('open', function(err){
    if(err){
        throw err;
    }
});
//建立用户登录信息表数据结构
let itemMes = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    grade: String,
    shopCart: Array,
    userSite: Array,
    orderDetail: Array,
});

//建立用户地址表数据结构
let item = new mongoose.Schema({
    id: Number,
    name: String,
    phone: Number,
    site: String,
    text: String
});

//定义新闻中心表的数据结构
let articleSchema = new mongoose.Schema({
    id: Number,
    title: String,
    img: String,
    content: String,
    wen: String,
    imgs: Array
}, {
    versionKey: false
});

//定义热门产品表的数据结构
let hotDetailSchema = new mongoose.Schema({
    id:Number,
    head:String,
    img:String,
    imgs:Array
},{
    versionKey:false
});

//加入我们表结构
let joinScema = new mongoose.Schema({
    id:Number,
    job:String,
    content:String,
    request:String

},{
    versionKey:false  //versionKey:false取消默认版本信息
});

//将数据结构和表关联起来
let articleModel = mongoose.model("articleModel", articleSchema, "article");
let hotDetailModel=mongoose.model("hotDetailModel",hotDetailSchema,"hotDetail");

//关联用户登录信息表
let mesModel = mongoose.model('mes', itemMes, 'userMessage');

//关联用户地址中表
let itemModel = mongoose.model('any', item, 'userSite');

//关联加入我们表
let joinModel=mongoose.model("joinModel",joinScema,"join");

module.exports = {
    userSite: itemModel,
    userMessage: mesModel,
    article: articleModel,
    hotProductDetail: hotDetailModel,
    join: joinModel
};
