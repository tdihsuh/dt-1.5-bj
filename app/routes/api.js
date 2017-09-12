/**
 * Created by lijinde on 17-5-10.
 */
var express = require('express');
var router = express.Router();
//首页接口
router.get('/todo_list', (req, res)=>{
    res.json({success:true,data:[
        { id: 1, text: 'list 1', done: true,like:0},
        { id: 2, text: 'list 2', done: false,like:0}
    ]});
});
router.use(function(req, res, next){
    res.status(404);
    res.redirect('/404');
});
module.exports = router;