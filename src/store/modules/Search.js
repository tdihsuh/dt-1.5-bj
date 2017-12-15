import util from '../../lib/util'
import axios from 'axios/index'

const state = {
  enterpriseInfo: [],
  isPersonal: false,
  personInfo: [],
  enterpriseDetails: {},
  personDetails: {}
}

// getters
const getters = {
  enterpriseInfo: (state, getters) => {
    return state.enterpriseInfo
  },
  personInfo: (state, getters) => {
    return state.personInfo
  },
  enterpriseDetails: (state, getters) => {
    return state.enterpriseDetails
  },
  personDetails: (state, getters) => {
    return state.personDetails
  },
  isPersonal: (state, getters) => {
    return state.isPersonal
  },
  personBase: (state, getters) => {
    if (state.personDetails.info) {
      let data = []
      let info = state.personDetails.info
      data.push({
        name: '姓名：', content: info.name
      })
      data.push({
        name: '身份证号：', content: info.identityCard
      })
      data.push({
        name: '性别：', content: ''
      })
      data.push({
        name: '户籍地址：', content: info.address
      })

      return [data]
    } else {
      return []
    }
  },
  enterpriseBase: (state, getters) => {
    if (state.enterpriseDetails.info) {
      let data = []
      let info = state.enterpriseDetails.info
      data.push({
        name: '企业名称：', content: info.name
      })
      data.push({
        name: '统一社会信用代码：', content: info.code
      })
      data.push({
        name: '法定代表人：', content: info.legalPerson
      })
      data.push({
        name: '企业类型：', content: info.code
      })
      data.push({
        name: '企业地址：', content: info.address
      })
      data.push({
        name: '成立日期：', content: info.createTime
      })
      data.push({
        name: '营业期限至：', content: info.validTime
      })

      return [data]
    } else {
      return []
    }
  },
  subjectDesc: (state, getters) => {
    let subject = state.enterpriseDetails.creditDetailList
    if (state.isPersonal) {
      subject = state.personDetails.creditDetailList
    }
    if (subject) {
      let data = []
      let list = subject
      list.map(item => {
        data.push({
          name: item.key,
          content: item.value
        })
      })
      return [data]
    } else {
      return []
    }
  },
  subjectMemo: (state, getters) => {
    let subject = state.enterpriseDetails.creditMemoList
    if (state.isPersonal) {
      subject = state.personDetails.creditMemoList
    }
    if (subject) {
      let data = []

      for (let memo of subject) {
        let tmp = {
          title: memo.name,
          accountTime: {name: '惩戒认定时间：', content: util.parseDate(memo.time)},
          accountDepartment: {name: '认定部门：', content: memo.relationDepartment}
        }
        let measureList = []
        for (let m of memo.uniMemoDepartmentList) {
          measureList.push([
            {name: '实施部门：', content: m.memoName},
            {
              name: '措施：',
              content: m.measure
            },
            {
              name: '法律及政策依据：',
              content: m.reason
            }
          ])
        }
        tmp.content = measureList

        data.push(tmp)
      }

      return data
    } else {
      return []
    }
  }

}

// actions
const actions = {

  searchEnterprise (store, key) {
    axios.get(`/service/api/credit/enterpriseSearch?key=${key}`).then(res => {
      let result = util.responseProcessor(res)
      if (result.code === '0') {
        store.commit('setEnterpriseInfo', result.obj)
      }
    }).catch(error => {
      if (error.response) {
        util.responseProcessor(error.response)
      }
    })
  },
  searchPerson ({commit}, key) {
    axios.get(`/service/api/credit/personSearch?key=${key}`).then(res => {
      let result = util.responseProcessor(res)
      if (result.code === '0') {
        commit('setPersonInfo', result.obj)
      }
    }).catch(error => {
      if (error.response) {
        util.responseProcessor(error.response)
      }
    })
  },
  fetchEnterpriseDetials (store, eid) {
    axios.get(`/service/api/credit/enterpriseDetail?eid=${eid}`).then(res => {
      let result = util.responseProcessor(res)
      console.log(result.obj)
      if (result.code === '0') {
        store.commit('setEnterpriseDetails', result.obj)
      }
    }).catch(error => {
      if (error.response) {
        util.responseProcessor(error.response)
      }
    })
  },
  fetchPersonDetials (store, eid) {
    axios.get(`/service/api/credit/personDetail?pid=${eid}`).then(res => {
      let result = util.responseProcessor(res)
      console.log(result.obj)
      if (result.code === '0') {
        store.commit('setPersonDetails', result.obj)
      }
    }).catch(error => {
      if (error.response) {
        util.responseProcessor(error.response)
      }
    })
  },
  setPersonal (store, isPersonal) {
    store.commit('setPersonal', isPersonal)
  }
}

// mutations
const mutations = {
  setPersonInfo (state, info) {
    state.personInfo = []
    state.personInfo = info
  },
  setEnterpriseInfo (state, info) {
    state.enterpriseInfo = info
  },
  setEnterpriseDetails (state, details) {
    state.enterpriseDetails = details
  },
  setPersonDetails (state, details) {
    state.personDetails = details
  },
  setPersonal (state, isPersonal) {
    state.isPersonal = isPersonal
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
