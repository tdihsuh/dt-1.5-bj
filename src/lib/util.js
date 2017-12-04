
let util = {

};

util.title = function (title) {
  title = title ? '河南联合奖惩-' + title  : '河南信用';
  window.document.title = title;
};
util.responseProcessor = function(res){
    if (res) {
        let httpCode = res.status
        console.log(`Server response Code:${httpCode}`)
            if (httpCode >= 200 && httpCode <= 299) {
               if(res.code === '1001'){
                   let url = location.href;
                   if (url.startsWith('/login')) {
                       return {code:'1',msg: '登录失败,用户名或密码错误'}
                   }
                   else {
                       url = encodeURIComponent(url)
                       location.href = `/login?return=${url}`
                   }
               }
               else{
                   return res.data;
               }


            }
            else {
                return {code:'1',msg: res.data.error};
            }

    }
    else {
        return {code:'1',error: '没有找到有效数据'};
    }
}

export default util;
