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
  @import './main';

</style>
