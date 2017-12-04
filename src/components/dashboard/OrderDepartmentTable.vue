<template>
    <div>
        <table class="order-department-table">
            <thead>
            <tr>
                <th v-for="(col, index) in departmentRankColumns()">
                    {{ col.title }}
                </th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(o, index) in departmentData()" :key="o.department" class="list-complete-item">
                    <td v-for="v in o">
                        {{ v }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {
        methods:{
            ...mapGetters(['departmentData','departmentRankColumns']),
        }

    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
    .order-department-table{
        width: 100%;
        border-collapse:collapse;
        font-size: 14px;
        td,th{
            width: 14.2%;
            text-align: center;
            height:50px ;
            color: #777;
        }
        thead{
            border: 1px solid #EEEEEE;
            tr{
                background: #EEE;
                th{

                    text-align: center;
                    border:1px solid white;

                }
            }
        }
        tbody{
            tr{
                border-top:0;
                border-left:0;
                border-right:0;

                border-bottom: 2px solid  #F4F4F4;
            }
        }
    }
</style>