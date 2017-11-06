<template>
    <div class="header">
       <img :src="logo" class="logo">
        <img :src="titleImage" class="title">
        <div class="nav"></div>
    </div>
</template>

<script>
    export default {
        name: 'MHeader',
      data(){
          return{
              logo:require('../../../images/logo.png'),
              titleImage:require('../../../images/title.png'),
              bg:require('./bg_h.png')
          }
      }
    }
</script>
<style  lang="less">

  .header{
      height: 120px;
      border-bottom: 3px solid  #1889E3;
      background-image: url("./bg_h.png");
      background-repeat:no-repeat;
      background-position: 85%;
      box-shadow: 0 1px 8px rgba(0,0,0,.3);
      >.logo{
          position: relative;
          left: 220px;
          top:20px;
          height: 90px;
          width: 90px;
      }
      >.title{
          position: relative;
          left: 340 - 90px;
          height: 50px;
      }
  }


</style>
