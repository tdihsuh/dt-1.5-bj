import axios from 'axios'
import util from '../../lib/util'
const state = {

}

// getters
const getters = {}

// actions
const actions = {
    login ({ commit },user) {
        axios.get(`/service/user/session?uname=${user.username}&pwd=${user.password}`)
            .then( response =>{
                let result = util.responseProcessor(response)
                console.log(result.code)
                if (result.code === '0') {
                    location.href = '/'
                }
            })
            .catch(error => {
                if (error.response) {
                    util.responseProcessor(error.response);
                }
            });
    }
}

// mutations
const mutations = {}

export default {
    state,
    getters,
    actions,
    mutations
}