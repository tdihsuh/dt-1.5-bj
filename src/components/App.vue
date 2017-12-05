<template>
  <div>
    <MHeader :nav="hasNav"></MHeader>
    <div class="main">
    <div class="content" >
      <router-view :nav="hasNav" @hideNav="hideNav" ></router-view>
    </div>
    </div>
    <MFooter></MFooter>
    <BackTop  v-if="hasNav" class="backtop">
      <Icon type="ios-arrow-up"></Icon>
      <div class="top">返回顶端</div>
    </BackTop>
  </div>
</template>

<script>
  import '../../node_modules/normalize.css/normalize.css'
  export default {
      data() {
          return {hasNav:true}
      },
      methods: {
          hideNav: function (hasNav) {
              this.hasNav = hasNav
          }
      }

  }
</script>
<style lang="less">
  @import './main';
  .backtop{
    text-align: center;
    background-color: rgba(0,0,0,0.3);
    color: white;
    font-size: 14px;
    height: 80px;
    width: 80px;
    line-height: 20px;
  }

</style>
