<template>
    <div>
        <table class="order-department-table">
            <thead>
            <tr>
                <th v-for="(col, index) in columns">
                    {{ col.title }}
                </th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(o, index) in data" :key="o.department" class="list-complete-item">
                    <td v-for="v in o">
                        {{ v }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        props:['data','columns']
    }

</script>
<style rel="stylesheet/less" lang="less" scoped>
    .order-department-table{
        width: 100%;
        border-collapse:collapse;
        font-size: 14px;
        border: 1px solid #EEE;
        td,th{
            width: 14.2%;
            text-align: center;
            height:58px ;
            color: #777;
        }
        thead{
            tr{
                th{
                    background: #EEE;
                    text-align: center;
                    border:2px solid white;
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