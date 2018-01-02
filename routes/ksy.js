const express = require('express');
const router = express.Router();

let model = require("../mongo/user");
let article=model.article;
let hotproduct=model.hotProductDetail;


router.get('/travel', (req, res)=>{
    res.render('travel', {title: '旅行活动'});
});

router.get('/upline', (req, res)=>{
    res.render('upline', {title: '线下聚会'});
});
router.get('/newActive', (req, res)=>{
    res.render('newActive', {title: '最新活动'});
});
router.get('/new_center', (req, res)=>{
    res.render('new_center', {title: '新闻中心'});
});
router.get('/hotProduct', (req, res)=>{
    res.render('hotProduct', {title: '热门手机'});
});
// 新闻中心
function getData(range, res){
    article.find({id:range},function(err,result){
        if(err){
            console.log("获取内容失败")
            res.status(200).json({errno:1,msg:"获取内容失败"})
            throw err
        }
        res.status(200).json({errno:0,msg:"获取内容成功",article:result})
    })
}
router.get("/getall",function(rew, res){
    //找到id<=4的
    getData({$lte:4}, res);
});

router.get("/getnews",function(rew,res){
    //找到id  7,8,9的
    getData({'$gte':7,'$lte':9},res);
});

router.get("/getguan",function(rew,res){
    //找到id  5,6的
    getData({'$gte':5,'$lte':6},res);
});
router.get("/getZixun",function(rew,res){
    //找到id  3,4的
    getData({'$gte':3,'$lte':4},res);
});
router.get("/getImgshow",function(rew,res){
    //找到id  1,2的
    getData({$gte:1,$lte:2},res);
});


router.get("/getPage2",function(rew,res){
    getData({$gte:5,$lte:8},res);
});

router.get("/getPage3",function(rew,res){

    getData({$gte:9},res);
});

router.get("/getxiangqing",function(req,res){
    let id=req.query.id;
    article.find({id:id},function(err,result){
        if(err){
            console.log("获取内容失败")
            res.status(200).json({errno:1,msg:"获取内容失败"})
            throw err
        }
        res.status(200).json({errno:0,msg:"获取内容成功",xq:result[0]})
    })
});

// 热门产品
function getHotData(range, res){
    hotproduct.find({id:range},function(err,result){
        if(err){
            console.log("获取内容失败");
            res.status(200).json({errno:1,msg:"获取内容失败"});
            throw err
        }
        res.status(200).json({errno:0,msg:"获取内容成功",hotproduct:result})
    })
}

router.get("/getHotall",function(rew, res){
    //找到所有
    getHotData({$lte:4}, res);
});
router.get("/getjianguo",function(rew, res){
    //找到3,4
    getHotData({$gte:3,$lte:4}, res);
});
router.get("/getT2",function(rew,res){
    getHotData({$eq:2},res);
});
router.get("/getM1",function(rew,res){
    getHotData({$eq:1},res);
});
router.get("/getPro",function(rew,res){
    getHotData({$eq:4},res);
});
router.get("/getHotXq",function(req,res){
    hotproduct.find({},function(err,result){
        if(err){
            console.log("获取内容失败")
            res.status(200).json({errno:1,msg:"获取内容失败"});
            throw err
        }
        res.status(200).json({errno:0,msg:"获取内容成功",hotproduct:result})
    })
});

module.exports = router;