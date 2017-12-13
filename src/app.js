import Vue from 'vue'
import iView from 'iview'
import './iview.css'
import App from './components/App.vue'
import Routers from './router'
import {sync} from 'vuex-router-sync'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import Partials from './components/common/index'
import commonFilters from './filters/index'
import Util from './lib/util'
import store from './store'
Vue.use(VueCookie)
Vue.use(iView)
// Load partial of single page
for (var key in Partials) {
    Vue.component(key, Partials[key])
}
//Load filters
for (var key in commonFilters) {
    Vue.filter(key, commonFilters[key])
}

Vue.use(VueRouter)
// router config
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
    Util.title(to.meta.title)
    let requireAuth = to.meta.requireAuth
    if(requireAuth){
        let token = VueCookie.get('token')
        let user = localStorage.getItem('user')
         if(token && user){

         }
         else{
             Util.openModal('没有登录系统')
             router.push({path:'/login',query:{to:JSON.stringify(to)}})
         }
    }
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
sync(store, router);

Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
