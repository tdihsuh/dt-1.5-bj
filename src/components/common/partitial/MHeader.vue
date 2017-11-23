<template>
    <div class="header" :class="{ 'has-border': !nav }">
        <img :src="logoAll" class="logo"><!--
       <img :src="logo" class="logo">
        <img :src="titleImage" class="title">
        --><div class="user-center" ><span class="user-name" :class="{ noNav: !nav }">用户名</span><span :class="{ noNav: !nav }">|</span><a :class="{ noNav: !nav }">退出登录</a></div><!--
        --><ul class="nav" :class="{ noNav: !nav }" >
            <li><router-link active-class="nav-active" to="/dashboard" class="nav-item"><img :src="stat"/>奖惩检测</router-link></li><!--
           --><li><router-link active-class="nav-active" to="/search" class="nav-item"><img :src="search"/>奖惩查询</router-link></li><!--
             --><li><router-link  active-class="nav-active" to="/approval" class="nav-item"><img :src="record"/>审批记录</router-link></li><!--
             --><li><router-link active-class="nav-active" to="/memo" class="nav-item"><img :src="memo"/>奖惩备忘录</router-link></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'MHeader',
        props:['nav'],
      data(){
          return{
              //logo:require('../../../images/logo.png'),
              logoAll:require('../../../images/logo-all.png'),
              //titleImage:require('../../../images/title.png'),
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
    .has-border{
        border-bottom: 3px solid  #1889E3;
    }
  .header{
      //height: 120px;
      background-image: url("./bg_h.png");
      background-repeat:no-repeat;
      background-position: 100%;
      background-size: 675px 100%;
      box-shadow: 2px 3px 5px rgba(0,0,0,.5);
      min-width: 1200px;
      >.logo{
          position: relative;
          height: 90px;
          left: 220px;
          margin: 15px 0;
      }
      >.user-center{
          display: inline-block;
          float: right;
          position: relative;
          right: 220px;
          top:50px;
          >.user-name{
              color: #353742;
              letter-spacing: 0;
              line-height: 24px;
              margin-right: 4px;
          }
          >a{
              color: #1889E3;
              letter-spacing: 0;
              line-height: 24px;
              margin-left: 4px;
          }

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
      .nav-active{
          background-color:#1889E3;
      }
  }


</style>
