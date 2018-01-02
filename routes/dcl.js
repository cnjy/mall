const express = require('express');
const router = express.Router();
const joinData=require("../mongo/user").join;

router.get('/company', (req, res)=>{
    res.render('company', {title: '公司简介'});
});
router.get('/join', (req, res)=>{
    joinData.find({},function(err,result){
        if(err){
            throw err;
        }
        res.render('join', {title: '加入我们', join: result});
    });
});
router.get('/contact', (req, res)=>{
    res.render('contact', {title: '联系我们'});
});
router.get('/service', (req, res)=>{
    res.render('service', {title: '服务支持'});
});
router.get('/account', (req, res)=>{
    res.render('account', {title: '账户设置'});
});
router.get('/password', (req, res)=>{
    res.render('password', {title: '找回密码'});
});


module.exports = router;