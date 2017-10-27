/**
 * Created by lijinde on 2017/9/11.
 */
import Vue from 'vue'
import Vuex from 'vuex'
/*import * as actions from './actions'
import * as getters from './getters'*/
import createLogger from 'vuex/dist/logger';
import todos from './modules/todos'
import shopcart from './modules/shopcart'
Vue.use(Vuex)
export default new Vuex.Store({
 /*   actions,
    getters,*/
    modules: {
        todos,
        shopcart
    },
    plugins:process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
    strict: process.env.NODE_ENV !== 'production'
})