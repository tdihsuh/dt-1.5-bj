import router from 'vue-router'
let util = {

};
util.title = function (title) {
  title = title ? '河南信用-' + title  : '河南信用';
  window.document.title = title;
};
util.responseProcessor = function(res){
    if (res) {
        let httpCode = res.status;
        console.log(`Server response Code:${httpCode}`);
        if (httpCode >= 200 && httpCode <= 299) {
            return res.data;
        }
        else if (httpCode == 404) {
            return {error: res.data.error};
        }
        else if (httpCode == 401) {
            let url = location.href;
            window.localStorage.removeItem('user');
            if (url.startsWith('/user/login')) {
                return {error: '登录失败'};
            }
            else {
                url = encodeURIComponent(url);
                router.go(`/user/login?return=${url}`);
            }

        }
        else {
            return {error: res.data.error};
        }
    }
    else {
        return {error: '没有找到有效数据'};
    }
}

export default util;
