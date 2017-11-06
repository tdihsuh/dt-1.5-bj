<template>
  <div class="content">
    <img :src = "img404">
    <p>没有找到 <b>{{fullPath}}</b>对应的页面，请检查输入的路径或联系系统管理员进行处理。 <router-link to="/">返回首页</router-link></p>
  </div>
</template>
<script>
  import imgNotFound from '../../images/not-found.png'
  export default {
    data(){
      return {
        fullPath:this.$route.fullPath,
        img404:imgNotFound
      }
    }
  }

</script>
<style lang="less" scoped>
.not-found-title{
  font-size:32px;
  color: #ff3300;
}
  .content {
    padding: 20px;
    display: flex;
    justify-content:center;
    flex-direction: column;
    margin-top: 20px;
    text-align: center;
    >img{
      width: 300px;
      margin: 30px auto;
    }

    >p{
      font-size: 1.2rem;
      >b{
        color: #2db7f5;
      }
    }
  }
</style>
