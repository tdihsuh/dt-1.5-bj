<template>
  <div class="item-list-wrapper">
    <ul class="item-list clear" v-for="(o,index) in list" :style="listStyle" :key="index">
      <li v-for="item in o " class="clear" :key="item.name">
        <span class="item-name">{{ item.name }}</span><span class="item-content">{{ item.content}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['list', 'listStyle']
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .item-list {
    padding: 10px 40px;
    > li {
      font-size: 14px;
      display: block;
      padding: 1px 0;
      .item-name, .item-content {
        display: inline-block;
        line-height: 30px;
        text-align: left;
      }
      > .item-name {
        width: 16%;
        color: #9b9b9b;

      }
      > .item-content {
        color: #353842;
        width: 84%;
      }
    }
  }
</style>
