<template>
    <div>
        <h2>Todo List</h2>
        <form class="todo-form" @submit.prevent="submit">
            <input placeholder="请输入内容"  type="text" v-model="todoText" class="todo"><!--
            --><button v-bind:disabled="!isValid" type="button" @keyup.enter="submit" class="todo-add" >添加</button>
        </form>
       <ul class="todo-list" v-for="(todo,index) in todos"  v-bind:key="todo.id">
           <li class="todo-list-item" key="{index}" id="{todo.id}">
               <span>{{ todo.text}}</span><span class="remove">&times;</span>
           </li>
       </ul>

    </div>
</template>
<script>
    import * as types from '../../store/mutation-types'
    import {mapGetters} from  'vuex'
    export default {
        data(){
          return {
              todoText:undefined
          }
        },
        computed: {
            ...mapGetters({
                todos: 'todos'
            }),
            isValid(){
                if(this.todoText && this.todoText.length >0){
                    return true
                }
                else{
                    return false
                }
            },

        },
        methods:{
            submit:(event)=>{
                console.log(event.target)
            }
        },
            created() {
                this.$store.dispatch('getAllTodos')
            }
    }
</script>
<style scoped lang="less">
    @import '../common';
    .todo-form{
        margin: 10px 0;
        input{
            -webkit-appearance: none;
            -moz-appearance: none;
            -o-appearance: none;
            appearance: none;
        }
        >.todo{
            height: 45px;
            line-height: 45px;
            padding: 3px;
            width: 400px;
            border: 1px solid @primary-color;
            border-radius: @border-radius-base 0 0  @border-radius-base;
        }
        >.todo-add{
            height: 53px;
            //line-height: 51px;
            padding: 0;
            width: 100px;
            border: 1px  solid @primary-color;
            background-color: @primary-color;
            color: white;
            &:hover{
                cursor: pointer;
            }
            border-radius: 0 @border-radius-base @border-radius-base 0;
        }
        >.todo-add[disabled='disabled']{
            background-color: @subsidiary-color ;
            border: 1px  solid @subsidiary-color;
        }
    }
.todo-list{
    background-color: #EEE;
    width: 500px;
    font-size: 20px;
    >.todo-list-item{
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        margin-bottom: 10px;
        border: 1px solid @primary-color;
        border-radius: @border-radius-base @border-radius-base;
        >.remove{
            float: right;
        }
    }
}
</style>