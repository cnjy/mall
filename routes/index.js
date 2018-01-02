var express = require('express');
var router = express.Router();

const shopList = require('../mongo/shopCartMogo').shopList;
const shopCart = require('../mongo/shopCartMogo').shopCart;
const userOrder = require('../mongo/shopCartMogo').userOrder;
const collectShop = require('../mongo/shopCartMogo').collectShop;
const userSite = require('../mongo/user').userSite;
const userMessage = require('../mongo/user').userMessage;

//获取购物车信息
router.post('/getCartData', function(req, res){
    let num = req.body.id || 0;
    toData(num);
    function toData(id){
        shopList.find({id: id}, function(err, result){
            if(err){
                throw err;
            }
            res.status(200).json(result);
        });
    }
});

//点击修改购买商品的数量
router.post('/changeShop', (req, res)=>{
    let id = req.body.id;
    let value = req.body.value;
    shopList.find({id: id}, (err, result)=>{
        if(err){
            throw err;
        }
        let title = result[0].content.title;
        let txt = result[0].content.txt;
        let price = result[0].content.price;
        let all = result[0].content.all;
        shopList.update({id: id}, {$set:{content: {
            all: all,
            value: value,
            price: price,
            txt: txt,
            title: title

        }}}, (err)=>{
            if(err){
                throw err;
            }
            res.status(200).json(1);
        });
    });
});

router.get('/shopData', (req, res)=>{
    shopList.find({id: {$gte:0,$lte:5}}, (err, result)=>{
        if(err){
            throw err;
        }
        res.status(200).json(result);
    })
});

//获取商品信息
router.get('/getShopData', (req, res)=>{
    shopList.find({}, (err, result)=>{
        if(err){
            throw err;
        }
        res.status(200).json(result);
    })
});

//展示购物车添加信息
router.post('/storeShop', (req, res)=>{
    let id = req.body.id;
    shopCart.find({id: id}, (err, result)=>{
        if(err){
            throw err;
        }
        let length = result.length;
        if(length == 0){
            shopCart.find({}, (err, result)=>{
                if(err){
                    throw err;
                }
                res.status(200).json(result);
            })
        }else{
             res.status(200).json(result);
        }
    })
});

//获取添加至购物车中的全部信息
router.get('/shopAll', (req, res)=>{
    let id = req.query.id;
    userMessage.find({id: id}, (err, result)=>{
        if(err){
            throw err;
        }
        res.status(200).json(result[0].shopCart);
    })
});

//改变购物车里的商品数量
router.post('/changeCart', (req, res)=>{
    let id = req.body.id;
    let value = req.body.value;
    shopCart.find({id: id}, (err, result)=>{
        if(err){
            throw err;
        }
        let img = result[0].img;
        let title = result[0].title;
        let txt = result[0].txt;
        let price = result[0].price;
        shopCart.update({id: id}, {$set:{
            id: id,
            value: value,
            img: img,
            title: title,
            txt: txt,
            price: price
        }}, (err)=>{
            if(err){
                throw err;
            }
            res.status(200).json(1);
        })
    })
});

//存储加入购物车的商品信息
router.post('/upDateShop', (req, res)=>{
    let userId = req.body.userId;
    let shopValue = req.body.value;
    let id = req.body.id;
    let img = req.body.img;
    let title = req.body.title;
    let txt = req.body.txt;
    let price = req.body.price;
    shopCart.find({shopId: userId, id: id}, (err, result)=>{
        if(err){
            throw err;
        }
        let length = result.length;
        if(length !== 0){
            let beValue = result[0].value;
            let value = Number(beValue) + Number(shopValue);
            shopCart.update({shopId: userId, id: id}, {$set:{value: value}}, (err)=>{
                if(err){
                    throw err;
                }
                shopCart.find({shopId: userId, id: id}, (err, result)=>{
                    if(err){
                        throw err;
                    }
                    res.status(200).json(result);
                    return;
                })
            });
        }
        else{
            shopCart.create({
                shopId: userId,
                id: id,
                value: shopValue,
                img: img,
                title: title,
                txt: txt,
                price:price
                }, (err)=>{
                if(err){
                    throw err;
                }
                shopCart.find({shopId: userId, id: id}, (err, result)=>{
                        if(err){
                            throw err;
                        }
                        res.status(200).json(result);
                        return;
                    })
            });
        }
    })

});

//点击删除添加到购物车的商品
router.get('/removeShop', (req, res)=>{
    let id = req.query.id;
    let userId = req.query.userId;
    shopCart.remove({id: id}, function(err){
        if(err){
            throw err;
        }
        console.log('删除成功');
        userMessage.find({id: userId}, (err, result)=>{
            if(err) {
                throw err;
            }
            let userName = result[0].name;
            let userPaw = result[0].password;
            let userEmail = result[0].email;
            let userGrade = result[0].grade;
            let orderDetail = result[0].orderDetail;
            shopCart.find({}, (err, result)=> {
                if (err) {
                    throw err;
                }
                let userShopCart = result;
                let userList = {
                    id: userId,
                    name: userName,
                    password: userPaw,
                    email: userEmail,
                    grade: userGrade,
                    shopCart: userShopCart,
                    orderDetail: orderDetail
                };
                userMessage.update({id: userId}, {$set: userList}, (err) => {
                    if (err) {
                        throw err;
                    }
                    res.status(200).json(1);
                });
            });
        });
        
    })
});

//判断否收藏
router.post('/isNoCollect', (req, res)=>{
    let id = req.body.id;
    collectShop.find({id: id}, (err, result)=>{
        if(err){
            throw err;
        }
        if(result.length != 0){
            res.status(200).json('true');
        }else{
            res.status(200).json('false');
        }
    })
});
//收藏商品
router.get('/collectShop', (req, res)=>{
    let id = req.query.id;
    shopList.find({id: id}, (err, result)=>{
        if(err){
            throw err;
        }
        console.log(result[0].content);
        let value = result[0].content.value;
        let title = result[0].content.title;
        let txt = result[0].content.txt;
        let price = result[0].content.price;
        let img = result[0].phoneImg[0].img;
        collectShop.create({
            id: id,
            value: value,
            title: title,
            txt: txt,
            price: price,
            img: img
        }, function(err){
            if(err){
                throw err;
            }
            res.status(200).json(1);
        })
    })
});
//取消收藏
router.get('/reCollect', (req, res)=>{
    let id = req.query.id;
    collectShop.remove({id: id}, (err)=>{
        if(err){
            throw err;
        }
        console.log('收藏取消');
        res.status(200).json(1);
    })
});

//产品展示页面
router.get('/', function(req, res) {
  res.render('index', {title: '科技产品公司'});
});
router.get('/index', function(req, res) {
  res.render('index', {title: '科技产品公司'});
});
router.get('/shopCart', function(req, res){
    res.render('shopCart', {title: '购物车'});
});
router.get('/accessoryRim', function(req, res){
    res.render('accessoryRim', {title: '周边产品'});
});
router.get('/addShopCart', function(req, res){
    userOrder.remove({}, (err)=>{
        if(err){
            throw err;
        }
    });
    res.render('addShopCart', {title: '添加商品'});
});
router.get('/shopElectronics', function(req, res){
    res.render('shopElectronics', {title: '电子产品'});
});

router.get('/goPay', (req, res)=>{
    userSite.find({}, (err, result)=>{
        if(err){
            throw err;
        }
        let userSite = result;
        userOrder.find({}, (err, result)=>{
            if(err){
                throw err;
            }console.log(result);
            let value = 0, total = 0;
            for(let item of result){
                value += item.value;
                total += item.value * item.price;
            }
            res.render('goPay', {
                title: '结算',
                value: value,
                total: total,
                userSite: userSite,
                shopCart: result
            });
        });
    });
});

//用户订单详情
router.post('/saveOrder', (req, res)=>{
    let id = req.body.userId;
    userOrder.create(req.body, (err)=>{
        if(err){
            throw err;
        }
    });

    userMessage.find({id: id}, (err, result)=>{
        if(err){
            throw err;
        }
        let name = result[0].name;
        let email = result[0].email;
        let password = result[0].password;
        let grade = result[0].grade;
        let shopCart = result[0].shopCart;
        let userSite = result[0].userSite;
        let userOrder = [];
        userOrder.push(req.body);
        let user = {
            id: id,
            name: name,
            email: email,
            password: password,
            grade: grade,
            shopCart: shopCart,
            userSite: userSite,
            orderDetail: userOrder
        };
        userMessage.update({id: id}, {$set: user}, (err)=>{
            if(err){
                throw err;
            }
            console.log('用户订单添加成功');
            res.status(200).json(1);
        });
    });
});


//个人中心
router.get('/personal', function(req, res){
    res.render('personal', {title: '个人中心'});
});
router.get('/collect', function(req, res){
    res.render('collect', {title: '我的收藏'});
});
router.get('/order', function(req, res){
    res.render('order', {title: '我的订单'});
});
router.get('/coupon', function(req, res){
    res.render('coupon', {title: '我的优惠劵'});
});
router.get('/consume', function(req, res){
    res.render('consume', {title: '消费明细'});
});
router.get('/orderDetail', function(req, res){
    res.render('orderDetail', {title: '订单详情'});
});

//退出登录
router.get('/userExit', (req, res)=>{
    shopCart.remove({}, (err)=>{
        if(err){
            throw err;
        }
    });
    userSite.remove({}, (err)=>{
        if(err){
            throw err;
        }
        console.log('退出成功');
        res.status(200).json(1);
    })
});


//自动获取添加成功的地址
router.get('/site', function(req, res){
    userSite.find({}, (err, result)=>{
        if(err){
            throw err;
        }
        res.render('site', {
            title: '收货地址',
            result: result
        });
    });
});
//添加用户地址
router.post('/user', function(req, res){
    let name = req.body.name;
    let userId = req.body.userId;
    userSite.find({name: name}, function(err, result){
        if(err){
            throw err;
        }
        let length = result.length;
        if(length == 0){
             userSite.create(req.body, function(err){
                if(err){
                    throw err;
                }
                console.log('添加成功');
                userSite.find({}, function(err, result){
                    if(err){
                        throw err;
                    }
                    let userSite = result;
                    userMessage.find({id: userId}, (err, result)=>{
                        if(err){
                            throw err;
                        }
                        let name = result[0].name;
                        let email = result[0].email;
                        let password = result[0].password;
                        let grade = result[0].grade;
                        let shopCart = result[0].shopCart;
                        let orderDetail = result[0].orderDetail;
                        let user = {
                            id: userId,
                            name: name,
                            email: email,
                            password: password,
                            grade: grade,
                            shopCart: shopCart,
                            userSite: userSite,
                            orderDetail: orderDetail
                        };
                        userMessage.update({id: userId}, {$set: user}, (err)=>{
                            if(err){
                                throw err;
                            }
                            console.log('用户地址添加成功');
                            userMessage.find({id: userId}, (err, result)=>{
                                if(err){
                                    throw err;
                                }
                                res.render('site', {
                                    title: '添加地址',
                                    result: result
                                });
                            })
                        });
                    });
                })
            })  
        }
    })
});
//修改用户地址
router.post('/userChange', (req, res)=>{
    let id = req.body.id;
    console.log(id);
    userSite.update({id: id}, {$set:req.body}, (err)=>{
        if(err){
            throw err;
        }
        console.log('地址更新成功');
        res.status(200).json(1);
    }) 
});
//删除已添加的地址
router.get('/remSite', (req, res)=>{
    let userId = req.query.userId;
    let siteId = req.query.id;
    userSite.remove({id: siteId}, (err)=>{
        if(err){
            throw err;
        }
        console.log('删除地址成功');
        userSite.find({}, (err, result)=>{
            if(err){
                throw err;
            }
            let userSite = result;
            userMessage.find({id: userId}, (err, result)=>{
                if(err){
                    throw err;
                }
                let name = result[0].name;
                let email = result[0].email;
                let password = result[0].password;
                let grade = result[0].grade;
                let shopCart = result[0].shopCart;
                let orderDetail = result[0].orderDetail;
                let user = {
                    id: userId,
                    name: name,
                    email: email,
                    password: password,
                    grade: grade,
                    shopCart: shopCart,
                    userSite: userSite,
                    orderDetail: orderDetail
                };
                userMessage.update({id: userId}, {$set: user}, (err)=>{
                    if(err){
                        throw err;
                    }
                    console.log('用户地址添加成功');
                    res.status(200).json(1);
                });
            });
        });
    })
});


//获取商品收藏信息
router.get('/getCollect', (req, res)=>{
    collectShop.find({}, (err, result)=>{
        if(err){
            throw err;
        }
        res.status(200).json(result);
    })
});


//获取用户信息
router.get('/getUserMessage', (req, res)=>{
    let id = req.query.id;
    userMessage.find({id: id}, function(err, result){
        if(err){
            throw err;
        }
        for(let item of result[0].userSite){
            userSite.create(item, (err)=>{
                if(err){
                    throw err;
                }
            })
        }
        res.status(200).json(result);
    })
});

//获取用户添加的商品信息
router.get('/userShopCart', (req, res)=>{
    let userId = req.query.id;
    userMessage.find({id: userId}, (err, result)=>{
        if(err) {
            throw err;
        }
        let userName = result[0].name;
        let userPaw = result[0].password;
        let userEmail = result[0].email;
        let userGrade = result[0].grade;
        let orderDetail = result[0].orderDetail;
        if(result[0].shopCart.length == 0){
            shopCart.find({}, (err, result)=> {
                if (err) {
                    throw err;
                }
                let userShopCart = result;
                let userList = {
                    id: userId,
                    name: userName,
                    password: userPaw,
                    email: userEmail,
                    grade: userGrade,
                    shopCart: userShopCart,
                    orderDetail: orderDetail
                };
                userMessage.update({id: userId}, {$set: userList}, (err) => {
                    if (err) {
                        throw err;
                    }
                    userMessage.find({id: userId}, (err, result) => {
                        if (err) {
                            throw err;
                        }
                        res.status(200).json(result);
                    })
                });
            });
        }else{
            let userShop = result;
            shopCart.find({}, (err, result)=>{
                if(err){
                    throw err;
                }
                if(result.length != 0){
                    let userShopCart = result;
                    let userList = {
                        id: userId,
                        name: userName,
                        password: userPaw,
                        email: userEmail,
                        grade: userGrade,
                        shopCart: userShopCart,
                        orderDetail: orderDetail
                    };
                    userMessage.update({id: userId}, {$set: userList}, (err) => {
                        if (err) {
                            throw err;
                        }
                        userMessage.find({id: userId}, (err, result) => {
                            if (err) {
                                throw err;
                            }
                            res.status(200).json(result);
                        })
                    });
                }else{
                    res.status(200).json(userShop);
                }
            });
        }
    });
});

//获取商品订单详情
router.get('/shopDetail', (req, res)=>{
    let orderId = req.query.orderId;
    let userId = req.query.userId;
    userMessage.find({id: userId}, (err, result)=>{
        if(err){
            throw err;
        }
        for(let item of result[0].shopCart){
            if(item.id == orderId){
                res.status(200).json(item);
            }
        }
    });
});

//进入账户设置
router.get('/toUserSet', (req, res)=>{
    let userId = req.query.id;
    userMessage.find({id: userId}, (err, result)=>{
        if(err){
            throw err;
        }
        res.status(200).json(result);
    })
});

//登录 注册
router.get('/login', function(req, res){
    res.render('login');
});
router.post('/login', function(req, res){
    let name = req.body.name;
    let password = req.body.password;
    userMessage.find({
        name: name,
        password: password
    }, function(err, result){
        if(err){
            throw err;
        }
        let length = result.length;
        if(length == 0){
            res.status(200).json({
                m: 0,
                msg: '用户名或密码错误'
            });
        }else{
            res.status(200).json({m: 1, id: result[0].id});
        }
    })
});
router.get('/register', function(req, res){
    res.render('register');
});
router.get('/getUserId', (req, res)=>{
    let id = req.query.id;
    userMessage.find({id: id}, (err, result)=>{
        if(err){
            throw err;
        }
        res.status(200).json(result[0].name);
    });
});

router.post('/register', function(req, res){
    let id = req.body.id;
    let name = req.body.name;
    let email = req.body.email;
    let pwd = req.body.password;
    let grade = req.body.grade;
    userMessage.find({
        name: name
    }, function(err, result){
        if(err){
            throw err;
        }
        let length = result.length;
        console.log(length);
        if(length == 0){
            userMessage.create({
                id: id,
                name: name,
                email: email,
                password: pwd,
                grade: grade
            }, function(err){
                if(err){
                    throw err;
                }
                res.status(200).json({m: 1})
            })
        }else{
            res.status(200).json({
                m: 0,
                msg: '用户名已存在'
            });
        }
    })
});

//提交订单
//修改地址
router.post('/paySite', (req, res)=>{
    let userId = req.body.userId;
    userSite.create(req.body, (err)=>{
        if(err){
            throw err;
        }
        userSite.find({}, (err, result)=>{
            if(err){
                throw err;
            }
            let userSite = result;
            userMessage.find({id: userId}, (err, result)=>{
                if(err){
                    throw err;
                }
                let name = result[0].name;
                let email = result[0].email;
                let password = result[0].password;
                let grade = result[0].grade;
                let shopCart = result[0].shopCart;
                let orderDetail = result[0].orderDetail;
                let user = {
                    id: userId,
                    name: name,
                    email: email,
                    password: password,
                    grade: grade,
                    shopCart: shopCart,
                    userSite: userSite,
                    orderDetail: orderDetail
                };
                userMessage.update({id: userId}, {$set: user}, (err)=>{
                    if(err){
                        throw err;
                    }
                    console.log('用户地址添加成功');
                    userMessage.find({id: userId}, (err, result)=>{
                        if(err){
                            throw err;
                        }
                        res.status(200).json(result[0].userSite);
                    })
                });
            });
        })
    })
});

router.post('/goSiteChange', (req, res)=>{
    console.log(req.body);
})



module.exports = router;
