<template>
    <div class="login">
        <h3>账户登录</h3>
        <Input class="login-input" size="large">
            <span class="icon-pre" slot="prepend"><Icon type="person"></Icon>用户名</span>
        </Input>
        <Input type="password" class="login-input" size="large">
        <span class="icon-pre"slot="prepend"><Icon type="ios-locked"></Icon>密&nbsp;&nbsp;码</span>
        </Input>
        <Checkbox>记住用户名</Checkbox>
        <Button type="primary" class="login-btn">登录</Button>
    </div>
</template>
<script>
    export default {
        props:['nav'],
        beforeCreate(){
            this.$emit("hideNav", false);
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
        >.login-input{
            margin: 20px 0;
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
        >.ivu-checkbox-wrapper{
            font-size:  @font-size;
            color: #777;
            width: 100%;
            .ivu-checkbox-inner{
                margin-right: 8px;
            }
        }
        >.login-btn{
            margin-top: 20px;
            height: 48px;
            width: 100%;
            font-size: 15px;
        }
    }
</style>