/**
 * Created by lijinde on 2017/9/11.
 */
import axios from 'axios'
import * as types from '../mutation-types'
import util from '../../lib/util'


const state = {
    todos: [],
    isDone:false
}

// getters
const getters = {
    todos:state => {
        if(state.isDone){
            return state.todos.filter(todo => todo.done)
        }
        else{
            return state.todos
        }
    }
}

// actions
const actions = {
    getAllTodos ({ commit }) {
        axios.get('/local/todo_list')
            .then( response =>{
                let result = util.responseProcessor(response)
                console.log(result)
                if (result.success) {
                    let todos = result.data
                    commit(types.ALL_TODOS, { todos })
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
const mutations = {
    [types.ALL_TODOS] (state, { todos }) {
        state.todos = todos
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
