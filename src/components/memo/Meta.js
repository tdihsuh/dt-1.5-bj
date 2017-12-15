/**
 * Created by lijinde on 17-12-15.
 */

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
    key: 'memo_name',
    align: 'center'
  },
  {
    title: '发起单位',
    key: 'sponsor',
    align: 'center'
  },
  {
    title: '联合部委数量',
    key: 'joint_count',
    align: 'center'
  },
  {
    title: '发布用户',
    key: 'operator',
    align: 'center'
  },
  {
    title: '发布时间',
    key: 'publish_date',
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
