<template>
    <div class="login">
        <h3>账户登录</h3>
        <Form ref="loginForm" :model="user" :rules="rules">
            <FormItem prop="username">
        <Input class="login-input" size="large" v-model="user.username"  :on-blur="saveUserName()">
            <span class="icon-pre" slot="prepend"><Icon type="person"></Icon>用户名</span>
        </Input>
            </FormItem>
            <FormItem prop="password">
        <Input type="password" class="login-input" size="large" v-model="user.password">
        <span class="icon-pre"slot="prepend"><Icon type="ios-locked"></Icon>密&nbsp;&nbsp;码</span>
        </Input>
            </FormItem>
            <FormItem>
        <Checkbox v-model="user.isRemember" :on-change="rememberUsername()">记住用户名</Checkbox>
            </FormItem>
            <FormItem>
        <Button type="primary" class="login-btn" @click="loginMe()">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import util from '../../lib/util'
    import router from 'vue-router'
    export default {
        props:['nav'],
        data(){
            return {
                user:{
                    username:'',
                    password:'',
                    isRemember:false
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { type: 'string', min: 2, message: '用户名无效', trigger: 'blur'}
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },

                    ]
                }
            }
        },
        beforeCreate(){
            this.$emit("hideNav", false);
        },
        created(){
            if(localStorage.getItem('username')){
                this.user.isRemember = true
                this.user.username = localStorage.getItem('username')
            }
        },
        methods:{
            loginMe(){
                let that = this;
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.login(this.user).then( response =>{
                            let result = util.responseProcessor(response)
                            if (result.code === '0') {
                                if(result.obj){
                                    this.$emit("hideNav", true)
                                    let user = result.obj
                                    localStorage.setItem('user',JSON.stringify(user))
                                    if(this.$route.query.to){
                                        let to = JSON.parse(this.$route.query.to)
                                        this.$router.push(to)
                                    }
                                    if(this.$route.query.return){
                                        let url = decodeURIComponent(this.$route.query.return)
                                        location.href = url
                                    }
                                    else{
                                        this.$router.push({path:'/dashboard'})
                                    }
                                }
                                else{
                                    this.$Message.error("登录成功，会话创建失败，请重试")
                                }


                            }
                            else{
                                this.$Message.error(result.msg+",请检查用户名或密码")
                            }
                        })
                            .catch(error => {
                                if (error.response) {
                                    let result = util.responseProcessor(error.response)
                                    this.$Message.error(result.msg)

                                }
                            });
                    } else {
                        this.$Message.error('请检查输入项!');
                    }
                 })
            },
            rememberUsername(){
               if(this.user.isRemember && this.user.username && this.user.username!==''){
                   localStorage.setItem('username',this.user.username)
               }
               else{
                   localStorage.removeItem('username')
               }
            },
            saveUserName(){
                if(this.user.isRemember && this.user.username &&  this.user.username!==''){
                    localStorage.setItem('username',this.user.username)
                }
                else{
                    localStorage.removeItem('username')

                }
            },
            ...mapActions({
                login: 'login'
            })
        }
    }

</script>
<style rel="stylesheet/less" lang="less">
    @font-size: 15px;
    .login{
        width: 460px;
        min-height: 600px;
        margin: 0 auto;
        padding: 120px 0;
        >h3{
            margin-bottom: 20px;
            text-align: center;
            width: 460px;
            font-size:30px;
            color: #353842;
        }
        >.ivu-form{
            .login-input{
               // margin: 20px 0;
                height: 50px;
                font-size:  @font-size;
                >.ivu-input-group-prepend{
                    width: 90px;
                    text-align: left;
                    color: #777;
                    font-size:  @font-size;
                }
                i{
                    margin-right: 8px;
                    font-size:  @font-size;
                }
                input{
                    height: 50px;
                    font-size:  @font-size;
                    color: #353742;
                }
            }

            .ivu-checkbox-wrapper{
                font-size:  @font-size;
                color: #777;
                width: 100%;
                .ivu-checkbox-inner{
                    margin-right: 8px;
                }
            }
            .login-btn{
                //margin-top: 20px;
                height: 48px;
                width: 100%;
                font-size: 15px;
            }
        }

    }
</style>