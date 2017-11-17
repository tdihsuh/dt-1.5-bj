<template>
  <div>
    <MHeader :nav="hasNav"></MHeader>
    <div class="main">
    <div class="content" >
      <router-view :nav="hasNav" @hideNav="hideNav" ></router-view>
    </div>
    </div>
    <MFooter></MFooter>

  </div>
</template>

<script>
  import '../../node_modules/normalize.css/normalize.css'
  export default {
      data() {
          return {hasNav:true}
      },
      methods:{
          hideNav:function(hasNav){
              this.hasNav = hasNav
          }
      }
  }
</script>
<style lang="less">
  body{
    min-width: 1200px;
    background-color: #f0f2f5;
    font-size: 14px;
  }
  .clear:after{content:'';display:block;clear:both;height:0;overflow:hidden;visibility:hidden;}
  .clear{zoom:1;}
  .main{
    background-image: url("../images/bg.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    width: 100%;
    .content{
      max-width: 1600px;
      min-height: 700px;
      margin: 0 auto;
    }
  }

</style>
