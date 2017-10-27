<template>
    <div class="todo-content">
        <h2>Todo List</h2>
        <form class="todo-form" @submit.prevent="submit">
            <input placeholder="请输入内容" @input="updateTodo"   v-model="todo"  class="todo"><!--
            --><button v-bind:disabled="!valid" type="button" @keyup.enter="submit" @click="submit" class="todo-add" >添加</button>
                <span class="is-done"><input  type="checkbox" v-model="isDone" @change="checkDone" />已完成</span>
        </form>

       <ul class="todo-list"   >
           <transition-group name="list-complete" tag="p">
           <li v-for="(todo,index) in todos"  class="todo-list-item list-complete-item"
               key="{index}" :id="todo.id" v-bind:class="{'done' : todo.done}">
               <span class="item-is-done"><input  type="checkbox" @change="itemDone(todo.id)" :checked="todo.done"/></span>
               <span>{{ todo.text}}</span>
               <span class="likes" >{{todo.like}}</span>
               <img  @click="like(todo.id)" :class="{'no-likes':todo.like===0}" :src="likeImage">
               <span class="remove" :data-id="todo.id" v-on:click="removeTodo(todo.id)">&times;</span>
               <span class="date">{{ todo.date }}</span>
           </li>
           </transition-group>
       </ul>


    </div>
</template>
<script>
    import * as types from '../../store/mutation-types'
    import {mapGetters} from  'vuex'
    export default {
        data(){
            return {
                todo:undefined,
                isDone:false,
                likeImage:require("./likes.png")
            }
        },
        computed: {
            ...mapGetters({
                todos: 'todos',
                valid: 'valid'
            })

        },
        methods:{
            updateTodo (e) {
                this.$store.commit('updateTodoText', this.todo)
            },
            checkDone(){
                this.$store.commit('isDone', this.isDone)
            },
            like(id){
                this.$store.commit('like', id)
            },
            itemDone(id){
                this.$store.commit('itemDone', id)
            },
            submit(e){
                if( this.todo && this.todo.length>0){
                    this.$store.dispatch('addTodo')
                    this.todo = undefined
                }
            },
            removeTodo(id){
                this.$store.commit('removeTodo', id)
            },
        },

            created() {
                this.$store.dispatch('getAllTodos')
            }
    }
</script>
<style scoped lang="less">
    @import '../common';
    @todo-height:40px;
    @todo-width:400px;
    .todo-content{
        padding: 10px;
    }
    .list-complete-item {
        transition: all 1s;
    }
    .list-complete-enter, .list-complete-leave-to
        /* .list-complete-leave-active for below version 2.1.8 */ {
        opacity: 0;
        width:@todo-width;
        transform: translateX( 0 - @todo-width);
    }
    .list-complete-leave-active {
        //position: absolute;
    }
    .todo-form{
        margin: 10px 0;
        textarea,select,input{outline: none}
        >.todo{
            height:  @todo-height - 8px;
            line-height: @todo-height - 8px;
            padding: 3px;
            width: @todo-width * 0.8 ;
            border: 1px solid @subsidiary-color;
            border-radius: @border-radius-base 0 0  @border-radius-base;
            &:focus{
                border: 1px solid @primary-color;
            }
        }
        >.is-done{
           display: inline-block;
            height:  @todo-height;
            line-height: @todo-height;
            width: @todo-width * 0.2;

            > input{
                height:  @todo-height * 0.5;
                width: @todo-height * 0.5;
                position: relative;
                top:@todo-height * 0.125;
                color: @warning-color;
                border: 0;
                }
        }
        >.todo-add{
            height: @todo-height;
            //line-height: 51px;
            padding: 0;
            width: @todo-width * 0.2;
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

    width: @todo-width;
    font-size: 20px;

    .done{
        color:@subsidiary-color!important;
        text-decoration: line-through;
    }
    .todo-list-item{
        height: @todo-height;
        background-color: #f5f5d5;
        line-height: @todo-height;
        padding: 0 15px;
        margin-bottom: 10px;
        box-shadow: 0 0 5px 2px rgba(0,0,0,0.2);
        border-radius: @border-radius-base @border-radius-base;
        color: @success-color;
        >img{
            height:  @todo-height * 0.5;
            width: @todo-height * 0.5;
            float: right;
            position: relative;
            top:@todo-height * 0.2;
            margin-left: 8px;
            cursor: pointer;
        }
        >.no-likes{
            filter: grayscale(100%);
        }
        >.likes{
            float:right;
            font-size: 12px;
            margin-left: 8px;
            color: @primary-color;
        }
        >.remove{
            display: inline-block;
            float: right;
            cursor: pointer;
        }
        .item-is-done{
            display: inline-block;
            margin: 0 8px 0 0;
            >input{
                height:  @todo-height * 0.5;
                width: @todo-height * 0.5;
                position: relative;
                top:@todo-height * 0.125;

            }

        }
        .date{
            float: right;
            display: inline-block;
            margin: 0 10px;
            font-size: 12px;
        }
    }
}
</style>