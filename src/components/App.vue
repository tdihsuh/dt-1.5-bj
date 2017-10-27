<template>
  <div>
    <MHeader></MHeader>
    <div class="content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  import '../../node_modules/normalize.css/normalize.css'
  export default {

  }
</script>
<style lang="less">
  @import "./common";
  body{
    font-family: @font-family;
    font-size:@font-size-base;
    line-height: @line-height-base;
    background-color: @body-background;
  }
  a{
    color: @link-color;
    &:hover{
      color: @link-hover-color;
      background-color: @link-background-color;
    }
    &:active{
      color: @link-active-color;
      background-color: @link-background-color;
    }
  }
  ul{
    list-style-type: none;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    -webkit-padding-start: 0;
  }

</style>
