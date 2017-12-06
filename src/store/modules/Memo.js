import axios from 'axios'
import util from '../../lib/util'

const state = {
    pendingMemo:[]
}

// getters
const getters = {}

// actions
const actions = {
    ///api/memo/pending/list
    getPendingMemo(store){
        axios.get('/service/api/memo/pending/list').then(res=>{
            let result = util.responseProcessor(res)
            if(result.code === '0'){

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

}

export default {
    state,
    getters,
    actions,
    mutations
}