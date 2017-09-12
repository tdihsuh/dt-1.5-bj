<template>
    <div class="header">
      <ul class="header-navigator">
        <li class="header-navigator-item">
          <router-link to="/">Todo List</router-link>
        </li>
        <li class="header-navigator-item">
          <router-link to="/">Todo List</router-link>
        </li>
      </ul>
    </div>
</template>

<script>
    export default {
        name: 'MHeader',
      data(){
          return{

          }
      }
    }
</script>
<style scoped lang="less">
  @import "../../common";
  .header{
    font-size: 16px;
    position: relative;
    z-index: 3;
    border-top: 3px solid @primary-color;
    box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.1), 0 1px rgba(0,0,0,0.1);
    background: #fafafa;
    >.header-navigator{
      height: 40px;
      line-height: 40px;
      list-style: none;
      -webkit-margin-before: 0;
      -webkit-margin-after: 0;
      -webkit-margin-start: 0px;
      -webkit-margin-end: 0px;
      -webkit-padding-start: 0;
      width: 1000px;
      margin: 0 auto;
      >li{
        display: inline-block;
        >a{
          text-decoration: none;
          display: block;
          width: 100px;
          text-align: center;
        }
      }
    }

  }


</style>
