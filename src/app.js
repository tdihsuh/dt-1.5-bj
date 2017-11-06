import Vue from 'vue'
import iView from 'iview';
import './iview.css'
import App from './components/App.vue'
import Routers from './router'
import {sync} from 'vuex-router-sync';
import VueRouter from 'vue-router'
import Partials from './components/common/partitial/index'
import commonFilters from './filters/index'
import Util from './lib/util'
import store from './store'
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
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
sync(store, router);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
