<template>
    <table class="order-table">
        <thead>
        <tr>
            <th v-for="(col, index) in areaRankColumns()">
                {{ col.title }}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(o, index) in areaData()" :key="o.city" class="list-complete-item">
            <td v-for="v in o">
                {{ v }}
            </td>
        </tr>
        </tbody>
    </table>

</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        created() {
            let i = 0
            setInterval(() => {
                if (this.pageNum() > 0) {
                    let current = i % this.pageNum();
                    this.setCurrentPage(current)
                    i++;
                }

            }, 2200);
        },
        methods: {
            ...mapGetters(['areaData', 'areaRankColumns', 'pageNum']),
            ...mapActions(['setCurrentPage'])
        }
    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
    .order-table {
        width: 100%;
        border-collapse: collapse;
        td, th {
            width: 16.5%;
            text-align: center;
            height: 50px;
        }
        thead {
            tr {
                background-image: url("./city_rank_bg.png");
                background-size: cover;
                th {
                    background: transparent;
                    color: white;
                    text-align: center;
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