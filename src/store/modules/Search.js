import util from "../../lib/util"
import axios from "axios/index"

const state = {
    enterpriseInfo:[],
    personInfo:[]
}

// getters
const getters = {
    enterpriseInfo: (state, getters) => {
        return state.enterpriseInfo
    },
    personInfo: (state, getters) => {
        return state.personInfo
    }
}

// actions
const actions = {

    searchEnterprise(store,key){
        axios.get(`/service/api/credit/enterpriseSearch?key=${key}`).then(res=>{
            let result = util.responseProcessor(res)
            if(result.code === '0'){
                store.commit('setEnterpriseInfo', result.obj.slice())
            }
        }).catch(error => {
            if (error.response) {
                util.responseProcessor(error.response);
            }
        })
    },
    searchPerson({ commit },key){
        axios.get(`/service/api/credit/personSearch?key=${key}`).then(res=>{
            let result = util.responseProcessor(res)
            console.log(result.obj)
            if(result.code === '0'){
                commit('setPersonInfo', result.obj)
            }
            else{

            }
        }).catch(error => {
            if (error.response) {
                util.responseProcessor(error.response);
            }
        })
    }
}

// mutations
const mutations = {
    setPersonInfo(state,info){
        state.personInfo = []
        state.personInfo.push(info)
    },
    setEnterpriseInfo(state,info){
        state.enterpriseInfo = info
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}