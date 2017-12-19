/**
 * Created by lijinde on 17-12-13.
 */

/* Vue.component('SearchBoard',SearchBoard) */
let styleBase = {
  display: 'inline-block',
  borderRadius: '3px',
  height: '24px',
  margin: '0 5px',
  width: '120px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: '24px',
  fontSize: '10px',
  textAlign: 'center',
  padding: '0 9px'
}
let style = {
  border: '1px solid #1889E3',
  color: '#1889E3'
}

let styleActive = {
  border: '1px solid #EB4449',
  color: '#EB4449'
}
let style1 = {
  color: '#1889E3'
}
Object.assign(style, styleBase)
Object.assign(styleActive, styleBase)
Object.assign(style1, styleBase)
let renderTagsUnit = (h, params) => {
  let row = params.row
  let htmlArray = []
  let tags = row.tagList
  if (tags.length > 3) {
    tags.slice(0, 3).map(tag => {
      let hTag = h('span', {
        style: tag.type === 'BONUS' ? styleActive : style
      }, tag.label)
      htmlArray.push(hTag)
    })
    let hTag = h('span', {
      style: style1

    }, '...')
    htmlArray.push(hTag)
  } else {
    tags.map(tag => {
      let hTag = h('span', {
        style: tag.type === 'BONUS' ? styleActive : style
      }, tag.label)
      htmlArray.push(hTag)
    })
  }
  return h('span', {props: {tags: row.tags}, style: {'display': 'block', 'margin': '5px 0'}}, htmlArray)
}
let enterpriseColumns = [
  {
    title: '企业名称',
    key: 'name',
    align: 'center'
  },
  {
    title: '统一社会信用代码',
    key: 'code',
    align: 'center'
  },
  {
    title: '联合奖惩标签',
    key: 'tags',
    width: 300,
    render: renderTagsUnit
  },
  {
    title: '审批结果',
    key: 'dealType',
    align: 'center',
    render: (h, params) => {
      let type = '行政许可严格办理'
      if (params.row.dealType === '1') {
        type = '行政许可加速审核'
      }
      return h('span', {props: {}, style: {'display': 'block', 'margin': '5px 0'}}, type)
    }
  },
  {
    title: '处理人',
    key: 'operatorName',
    align: 'center'
  },
  {
    title: '处理日期',
    key: 'createTime',
    align: 'center',
    render: (h, params) => {
      let date = ''
      if (params.row.createTime) {
        date = new Date(params.row.createTime).Format('yyyy/MM/dd hh:mm:ss')
      }
      return h('span', {}, date)
    }
  },
  {
    title: '操作',
    key: 'operations',
    align: 'center',
    render: (h, params) => {
      return h('router-link', {
        props: {
          to: `/approval/detail/${params.row.eid}/enterprise/${params.row.id}`
        }
      }, '详细信息')
    }
  }
]

let personalColumns = [
  {
    title: '姓名',
    key: 'name',
    align: 'center'
  },
  {
    title: '身份证号',
    key: 'identityCard',
    align: 'center'
  },
  {
    title: '联合奖惩标签',
    key: 'tags',
    width: 300,
    render: renderTagsUnit
  },
  {
    title: '审批处理结果',
    key: 'dealType',
    align: 'center',
    render: (h, params) => {
      let type = '行政许可严格办理'
      if (params.row.dealType === '1') {
        type = '行政许可加速审核'
      }
      return h('span', {props: {}, style: {'display': 'block', 'margin': '5px 0'}}, type)
    }
  },
  {
    title: '处理人',
    key: 'operatorName',
    align: 'center'
  },
  {
    title: '处理日期',
    key: 'createTime',
    align: 'center',
    render: (h, params) => {
      let date = ''
      if (params.row.createTime) {
        date = new Date(params.row.createTime).Format('yyyy/MM/dd hh:mm:ss')
      }
      return h('span', {
      }, date)
    }
  },
  {
    title: '操作',
    key: 'operations',
    align: 'center',
    render: (h, params) => {
      return h('router-link', {
        props: {
          to: `/approval/detail/${params.row.pid}/person/${params.row.id}`
        }
      }, '查看详细')
    }
  }
]

export default {
  renderTagsUnit,
  enterpriseColumns,
  personalColumns
}
