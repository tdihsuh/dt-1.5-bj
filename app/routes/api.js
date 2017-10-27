/**
 * Created by lijinde on 17-5-10.
 */
var express = require('express');
var router = express.Router();
//首页接口
router.get('/todo_list', (req, res)=>{
    res.json({success:true,data:[
        { id: 1, text: '季度总结绘图', done: true,like:0,date:'2017/09/01'},
        { id: 2, text: 'UI设计图', done: false,like:0,date:'2017/09/03'},
        { id: 3, text: '前端开发', done: false,like:0,date:'2017/09/03'},
        { id: 4, text: '后端开发', done: true,like:0,date:'2017/09/05'}
    ]});
});
router.use(function(req, res, next){
    res.status(404);
    res.redirect('/404');
});
module.exports = router;