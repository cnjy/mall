const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shopCart");

let db = mongoose.connection;

db.on('open', function(err){
    if(err){
        throw err;
    }
});

//商品信息
let itemList = new mongoose.Schema({
    id: Number,
    phoneImg: Array,
    shopDetails: Array,
    content: Object
});

//加入到购物车的商品
let itemCart = new mongoose.Schema({
    id: Number,
    value: Number,
    img: String,
    title: String,
    txt: String,
    price: Number

});
//确认订单信息表
let itemOrder = new mongoose.Schema({
    id: Number,
    value: Number,
    price: Number,
    userId: Number,
    img: String,
    title: String,
    txt: String,
    checked: Boolean,
});

let shopListModel = mongoose.model('shop', itemList, 'shopList');
let shopCartModel = mongoose.model('shopSingle', itemCart, 'shopCart');
let collectModel = mongoose.model('collect', itemCart, 'collectShop');
let orderModel = mongoose.model('collect', itemCart, 'userOrder');


module.exports={
    shopList: shopListModel,
    shopCart: shopCartModel,
    collectShop: collectModel,
    userOrder: orderModel
};