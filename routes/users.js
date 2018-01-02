var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/user', function(req, res){
    console.log(req.body);
})

module.exports = router;
