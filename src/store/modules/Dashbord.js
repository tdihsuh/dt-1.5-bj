import axios from 'axios'
import util from '../../lib/util'

const state = {
    areaData:[],
    pageNum:0,
    currentPage:0,
    pageSize:6,
    departmentData:[],
    areaRankColumns: [
        {
            title: '城市',
            key: 'areaName'
        },
        {
            title: '联合奖惩数量',
            key: 'uniCount'
        },
        {
            title: '查询次数',
            key: 'selectCount'
        },
        {
            title: '活跃度',
            key: 'activeCount'
        },
        {
            title: '排名',
            key: 'rank'
        }
    ],
    departmentRankColumns: [{
        title: '部委',
        key: 'departmentName'
    },
        {
            title: '已联合部委数',
            key: 'joinCount'
        },
        {
            title: '联合激励数量',
            key: 'uniBonusCount'
        },
        {
            title: '联合惩戒数量',
            key: 'uniPubnishCount'
        },
        {
            title: '查询次数',
            key: 'selectCount'
        },
        {
            title: '部委活跃度',
            key: 'activeCount'
        },
        {
            title: '排名',
            key: 'rank'
        }
    ]

}

// getters
const getters = {
    areaData:(state, getters)=>{
        return  state.areaData.slice(state.currentPage*state.pageSize, state.currentPage*state.pageSize + state.pageSize)
    },
    allAreaData:(state, getters)=>{
        return  state.areaData
    },
    departmentData:(state, getters)=>{
        return  state.departmentData
    },
    areaRankColumns:(state, getters)=>{
        return  state.areaRankColumns
    },
    departmentRankColumns:(state, getters)=>{
        return  state.departmentRankColumns
    },
    pageSize:(state, getters)=>{
        return state.pageSize
    },
    currentPage:(state, getters)=>{
        return state.currentPage
    },
    pageNum:(state, getters)=>{
        return state.pageNum
    }
}

// actions
const actions = {
    getAllData(store) {
        let getAreaData = () => {
            return axios.get(`/service/api/count/areaRank`)
        }
        let getDepartmentData = () => {
            return axios.get(`/service/api/count/departmentRank`)
        }
        axios.all([getAreaData(), getDepartmentData()]).then(axios.spread((areaDataRes, departmentDataRes) => {
            let areaData = util.responseProcessor(areaDataRes)
            if (areaData.code === '0') {
                store.commit('areaData', areaData.obj.slice())
            }
            let departmentData = util.responseProcessor(departmentDataRes)
            if (departmentData.code === '0') {
                store.commit('departmentData', departmentData.obj.slice())
            }
        }));
    },
    setCurrentPage(store, current) {
        store.commit('currentPage', current)
    },


}

// mutations
const mutations = {
    areaData(state,data){
        let d = [];
        data.map(o=>{
            let tmp ={
                areaName:o.areaName,
                uniCount:o.uniCount,
                selectCount:o.selectCount,
                activeCount:o.activeCount,
                rank:o.rank
            }
            d.push(tmp)
        });
        state.pageNum = Math.ceil(d.length/state.pageSize)
        state.areaData = d
    },
    departmentData(state,data){
        let d = [];
        data.map(o=>{
            d.push({
                departmentName:o.departmentName,
                joinCount:o.joinCount,
                uniBonusCount:o.uniBonusCount,
                uniPubnishCount:o.uniPubnishCount,
                selectCount:o.selectCount,
                activeCount:o.activeCount,
                rank:o.rank
            })
        });
        state.departmentData = d
    },
    currentPage(state,current){
        state.currentPage = current
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}