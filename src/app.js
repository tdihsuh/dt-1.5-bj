import Vue from 'vue'
import App from './components/common/App.vue'
import Routers from './router'
import VueRouter from 'vue-router'
import Partials from './components/common/partitial/index'
import Util from './lib/util'

for(var key in Partials){
  Vue.component(key, Partials[key])
}
Vue.use(VueRouter)
// 路由配置
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
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
