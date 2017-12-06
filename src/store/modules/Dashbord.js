import axios from 'axios'
import util from '../../lib/util'

const state = {
    areaData: [],
    departmentData: [],
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
    getAreaRank: (state, getters) => {
        let data = state.areaData.slice()
        let loop = data.length
        let rankData = []
        for (let i = 0; i < loop; i += 6) {
            rankData.push(data.slice(i, i + 6))
        }
        return rankData
    },
    allAreaData: (state, getters) => {
        return state.areaData
    },
    departmentData: (state, getters) => {
        return state.departmentData
    },
    areaRankColumns: (state, getters) => {
        return state.areaRankColumns
    },
    departmentRankColumns: (state, getters) => {
        return state.departmentRankColumns
    },
    getDeparmentRank: (state, getters) => {
        let data = state.departmentData.slice()
        let loop = data.length
        let rankData = []
        for (let i = 0; i < loop; i += 10) {
            rankData.push(data.slice(i, i + 10))
        }
        return rankData
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
    }

}

// mutations
const mutations = {
    areaData(state, data) {
        let d = [];
        data.map(o => {
            let tmp = {
                areaName: o.areaName,
                uniCount: o.uniCount,
                selectCount: o.selectCount,
                activeCount: o.activeCount,
                rank: o.rank
            }
            d.push(tmp)
        });
        state.areaData = d
    },
    departmentData(state, data) {
        let d = [];
        data.map(o => {
            d.push({
                departmentName: o.departmentName,
                joinCount: o.joinCount,
                uniBonusCount: o.uniBonusCount,
                uniPubnishCount: o.uniPubnishCount,
                selectCount: o.selectCount,
                activeCount: o.activeCount,
                rank: o.rank
            })
        });
        state.departmentData = d
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}