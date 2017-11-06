<template>
  <div>
    <MHeader></MHeader>
    <div class="content">
      <router-view></router-view>
    </div>
    <MFooter></MFooter>

  </div>
</template>

<script>
  import '../../node_modules/normalize.css/normalize.css'
  export default {

  }
</script>
<style lang="less">
  body{
    min-width: 900px;
    background-color: #f0f2f5;
  }
  .content{
    max-width: 1600px;
    min-height: 700px;
    margin: 0 auto;
    background-image: url("../images/bg.png");
    background-size: cover;

  }

</style>
