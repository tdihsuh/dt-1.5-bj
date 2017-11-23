<template>
    <div class="memo-form-div">
        <Form :model="memo" :label-width="160" label-position="left">
            <FormItem label="联合惩戒备忘录：">
                <Input v-model="memo.name" placeholder="请输入备忘录名称" style="width:540px"></Input>
            </FormItem>
            <FormItem label="联合奖惩性质：">
                <RadioGroup v-model="memo.type">
                    <Radio label="0"><span style="color:rgb(235, 68, 73);margin: 0 20px 0 0">联合激励</span></Radio>
                    <Radio label="1"><span style="color:rgb(24, 137, 227);margin: 0 20px 0 0">联合惩戒</span></Radio>
                </RadioGroup>
            </FormItem>
            <FormItem label="认定部门：">
                <CheckboxGroup v-model="memo.departments">
                    <Checkbox label="Eat"></Checkbox>
                    <Checkbox label="Sleep"></Checkbox>
                    <Checkbox label="Run"></Checkbox>
                    <Checkbox label="Movie"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem label="标签：">
                <Input v-model="memo.tag" placeholder="请输入标签" style="width:540px"></Input>
            </FormItem>
            <div class="measures" v-for="(measure,index) in memo.measures"  :key="index">
                <div v-if="index>0" class="close-icon" @click="removeMeasure(index)"><Icon type="close"></Icon></div>
                <FormItem label="措施：">
                    <Input v-model="measure.measureName" placeholder="请输入奖励／惩戒措施" style="width:461px"></Input>
                </FormItem>
                <FormItem label="法律及政策依据：">
                    <Input v-model="measure.measureBy" placeholder="请输入法律及政策依据" style="width:461px"></Input>
                </FormItem>
                <FormItem label="实施部门：">
                    <Select v-model="measure.department" style="width:200px">
                        <!--  <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                    </Select>
                </FormItem>
            </div>
                <Button type="ghost" class="add-measure-btn" icon="plus-round" @click="addMeasure">添加</Button>
            <div class="add-form-footer" v-if="isAdd">
                <Button type="error">暂存备忘录</Button>
                <Button type="primary">提交审核</Button>
            </div>
            <div class="add-form-footer" v-else>
                <Button type="error">暂存备忘录</Button>
                <Button type="primary">提交审核</Button>
                <Button type="ghost" @click="closeHandler">返回</Button>
            </div>
        </Form>
    </div>
</template>
<script>
    export default {
        props:['isAdd','closeHandler'],
        data() {
            return {
                memo: {
                    type:0,
                    measures:[
                        {}
                    ]
                },
            }
        },
        methods:{
            addMeasure(e){
                this.memo.measures.push({})
            },
            removeMeasure(i){
                this.memo.measures.splice(i,1)
            }
        }
    }

</script>
<style rel="stylesheet/less" lang="less">
    .memo-form-div{
        margin:  0 auto;
        width: 900px;
        .ivu-input,ivu-radio-group{

        }
        .ivu-form-item{
            margin: 10px 0;
        }
        .ivu-form-item-label{
            color:#666666;
            line-height:20px;
            padding: 0 12px 0 0;
        }
        .measures{
            background:#f7f7f7;
            padding: 10px 30px;
            border:1px solid #d0d0d0;
            border-radius:4px;
            margin: 20px 0 0 0;
            position: relative;
            .close-icon{
                cursor: pointer;
                position: absolute;
                right: 10px;
                color: #777;
                top: 6px;
            }

        }
        .add-form-footer{
            text-align: center;
            .ivu-btn{
                border-radius:4px;
                width:120px;
                height:36px;
                margin: 5px 15px;
            }
        }
        .add-measure-btn{
            margin: 18px 0 0 30px;
            color: #1889e3;
            background-color: transparent;
            border:1px solid #1889e3;
            border-radius:4px;
            width:78px;
            &:hover{
                background-color: #1889e3;
                color: white;
            }
        }
    }
</style>