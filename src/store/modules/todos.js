/**
 * Created by lijinde on 2017/9/11.
 */
import axios from 'axios'
import * as types from '../mutation-types'
import util from '../../lib/util'
import moment from 'moment'

const state = {
    todos: [],
    isDone:false,
    todoText:undefined
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
    },
    valid:state=>{
        if(state.todoText && state.todoText.length>0){
            return true
        }
        else{
            return false
        }
    }
}

// actions
const actions = {
    getAllTodos ({ commit }) {
        axios.get('/local/todo_list')
            .then( response =>{
                let result = util.responseProcessor(response)
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
    },
    addTodo ({ commit }) {
        commit(types.ADD_TODO)
    }
}

// mutations
const mutations = {
    updateTodoText(state,todoText){
        state.todoText =  todoText
    },
    removeTodo(state,id){
        for(var i in state.todos){
            let todo = state.todos[i]
            if(todo.id === id){
                state.todos.splice(i,1)
            }
        }
    },
    isDone(state,isDone){
        state.isDone = isDone
    },
    like(state,id){
        for(var i in state.todos){
            let todo = state.todos[i]
            if(todo.id === id){
                todo.like += 1
            }
        }
    },
    itemDone(state,id){
        for(var i in state.todos){
            let todo = state.todos[i]
            if(todo.id === id){
                todo.done = !todo.done
            }
        }
    },
    [types.ALL_TODOS] (state, { todos }) {
        state.todos = todos
    },
    [types.ADD_TODO] (state) {
        let todo =  { id: state.todos.length + 1, text: state.todoText,date:moment().format('YYYY/MM/DD'), done: false,like:0}
        state.todos.push(todo)
        state.todoText =  undefined
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
