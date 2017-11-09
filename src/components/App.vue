<template>
  <div>
    <MHeader :nav="hasNav"></MHeader>
    <div class="content">
      <router-view :nav="hasNav" @hideNav="hideNav" ></router-view>
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
    min-width: 1000px;
    background-color: #f0f2f5;
    font-size: 14px;
  }
  .clear:after{content:'';display:block;clear:both;height:0;overflow:hidden;visibility:hidden;}
  .clear{zoom:1;}
  .content{
    max-width: 1600px;
    min-height: 700px;
    margin: 0 auto;
    background-image: url("../images/bg.png");
    background-size: cover;

  }

</style>
