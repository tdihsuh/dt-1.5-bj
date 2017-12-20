/**
 * Created by lijinde on 17-12-15.
 */
let departmentsList = require('../common/departments')
let data = [{
  memo_name: '失信企业协同监管',
  sponsor: '省发改委',
  joint_count: 17,
  operator: 'admin001',
  publish_date: '2017/08/12 13:56:00',
  id: 2
}, {
  memo_name: '失信企业协同监管',
  sponsor: '省发改委',
  joint_count: 17,
  operator: 'admin001',
  publish_date: '2017/08/12 13:56:00',
  id: 1}]
let columnBase = [
  {
    title: '备忘录名称',
    key: 'name',
    /*align: 'center'*/
  },
  {
    title: '发起单位',
    key: 'relationDepartment',
    render: (h, params) => {
      let departments = params.row.relationDepartment
      let tmp =[]
      for(let d of departments.split(',')){
        tmp.push(departmentsList[d])
      }
      return h('span', {
      }, tmp.join())
    }
  },
  {
    title: '标签',
    key: 'tags',
    align: 'center',
    render: (h, params) => {
      let attrs = {
          style:'color:rgb(235, 68, 73)'
        }
        if(params.row.type === '1'){
          attrs = {
            style:'color:#1889e3'
          }
        }
      return h('span', {
        attrs:attrs
      }, params.row.tags)
    }
  },
  {
    title: '联合部委数量',
    key: 'departmentCount',
    align: 'center'
  },
  {
    title: '发布用户',
    key: 'operatorName',
    align: 'center'
  }
]

let labelPublish =(h) => {
  let that = this
  return h('TabLabel', {
    props: {
      count: 0,
      text: '已发布备忘录',
      icon: 'icon-yifabu'
    }
  })
}
 let  labelUnpublish = (h) => {
  let that = this
  return h('TabLabel', {
    props: {
      count: 0,
      text: '未发布备忘录',
      icon: 'icon-zancun'
    }
  })
}
 let labelPending = (h) => {
  return h('TabLabel', {
    props: {
      count: 0,
      text: '暂存备忘录',
      icon: 'icon-zancun'
    }
  })
}
  let labelAdd = (h) => {
  return h('TabLabel', {
    props: {
      count: 0,
      text: '新增备忘录',
      icon: 'icon-xinzeng'
    }
  })
}


export default {
  data,
  columnBase,
  labelPublish,
  labelUnpublish,
  labelPending,
  labelAdd
}
