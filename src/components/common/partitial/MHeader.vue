<template>
    <div class="header">
       <img :src="logo" class="logo">
        <img :src="titleImage" class="title">
        <ul class="nav" :class="{ noNav: !nav }" >
            <li><a class="nav-item"><img :src="stat"/>奖惩检测</a></li><!--
           --><li><a class="nav-item"><img :src="search"/>奖惩查询</a></li><!--
             --><li><a class="nav-item"><img :src="record"/>审批记录</a></li><!--
             --><li><a class="nva-item"><img :src="memo"/>奖惩备忘录</a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'MHeader',
        props:['nav'],
      data(){
          return{
              logo:require('../../../images/logo.png'),
              titleImage:require('../../../images/title.png'),
              bg:require('./bg_h.png'),
              memo:require('./memo.png'),
              record:require('./record.png'),
              search:require('./search.png'),
              stat:require('./stat.png')
          }
      }
    }
</script>
<style  lang="less">
    .noNav{
        display: none;
    }
  .header{
      //height: 120px;
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
          margin: 0 0 30px 0;
      }
      >.title{
          position: relative;
          left: 340 - 90px;
          top: -30px;
          height: 50px;
      }
      >.nav{
          width: 100%;
          background: #2F6FD0;
          text-align: center;
          >li{
              display: inline-block;
              >a{
                  font-size: 16px;
                  height: 50px;
                  display: block;
                  line-height: 50px;
                  width: 140px;
                  color:#FFFFFF;
                  >img{
                      height: 20px;
                      width: 20px;
                      position: relative;
                      top:5px;
                      margin-right: 6px;
                  }
                  &:hover{
                      background-color:#1889E3;
                  }
              }
          }

      }
  }


</style>
