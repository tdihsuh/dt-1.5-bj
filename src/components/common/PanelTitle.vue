<template>
  <div class="panel-title">
    <span><img :src="titleIcon"><span class="title-text">{{title}}</span></span>
  </div>
</template>
<script>
  export default {
    props: ['title'],
    data () {
      return {
        titleIcon: require('../../images/title_icon.png')
      }
    }
  }

</script>
<style rel="stylesheet/less" lang="less" scoped>
  .panel-title {
    border-bottom: 2px solid #e6e6e6;
    font-size: 18px;
    color: #4a4a4a;
    span {
      display: inline-block;
    }
    > span {
      border-bottom: 4px solid #1889e3;
      position: relative;
      top: 3px;
      line-height: 56px;
      height: 56px;
      padding: 0 5px;
      > img {
        position: relative;
        height: 24px;
        top: 6px;
        margin-right: 4px;
      }
    }
  }
</style>
