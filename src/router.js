import Components from './components/index'

const routers = [

  {
    path: '/login',
    meta: {
      title: '登录'
    },
      component: Components.Login
  },
    {
        path: '/',
        meta: {
            title: '奖惩检测'
        },
        component: Components.Dashbord
    },
    {
        path: '/search',
        meta: {
            title: '奖惩查询'
        },
        component: Components.Search,
    },
    {
        path: '/detail/person/:pid/:type?',
        meta: {
            title: '个人详情'
        },
        component: Components.PersonDetail,
    },
    {
        path: '/approval',
        meta: {
            title: '审批记录'
        },
        component: Components.Approval
    },
    {
        path: '/memo',
        meta: {
            title: '奖惩备忘录'
        },
        component: Components.Memo
    },

  // /page/error
  {
    path: '/404',
    meta: {
      title: '注意'
    },
    component: Components.NotFound
  },
  {
    path: '*',
    meta: {
      title: '注意'
    },
    component: Components.NotFound
  }
];
export default routers;
