/**
 * Created by lijinde on 17-5-10.
 */
var express = require('express');
var router = express.Router();

router.use(function(req, res, next){
    res.status(404);
    res.redirect('/404');
});
module.exports = router;