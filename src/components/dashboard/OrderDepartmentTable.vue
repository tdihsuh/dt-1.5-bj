<template>
  <div>
    <table class="order-department-table">
      <thead>
      <tr>
        <th v-for="(col) in departmentRankColumns()" :key="col.title">
          {{ col.title }}
        </th>
      </tr>
      </thead>
    </table>
    <Carousel autoplay dots="none" loop :autoplay-speed="5000" :height="510">
      <CarouselItem v-for="(rank,index) in getDeparmentRank()" :key="index">
        <table class="order-department-table " :class="{first:index===0}">
          <tbody>
          <tr v-for="(o) in rank" :key="o.department" class="list-complete-item">
            <td v-for="(v,i) in o" :key="i" >
              {{ v }}
            </td>
          </tr>
          </tbody>
        </table>
      </CarouselItem>
    </Carousel>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    methods: {
      ...mapGetters(['departmentData', 'departmentRankColumns', 'getDeparmentRank'])
    }
  }
</script>
<style rel="stylesheet/less" lang="less" scoped>
  .first {
    tr:nth-child(1) {
      > td:nth-child(7) {
        color: red;
        font-weight: 800;
      }

    }
    // #FF4500
    tr:nth-child(2) {
      > td:nth-child(7) {
        color: #FFA500;
        font-weight: 800;
      }

    }
    tr:nth-child(3) {
      > td:nth-child(7) {
        color: #32CD32;
        font-weight: 800;

      }
    }
  }

  .order-department-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;

    td:nth-child(1) {
      text-align: left;
      text-indent: 2em;
    }
    td{
      font-size: 12px;
    }
    td, th {
      width: 14.2%;
      text-align: center;
      height: 50px;
      color: #777;
    }
    thead {
      border: 1px solid #EEEEEE;
      tr {
        background: #EEE;
        th {

          text-align: center;
          border: 1px solid white;

        }
      }
    }
    tbody {
      tr {
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 2px solid #F4F4F4;
      }
    }
  }
</style>
