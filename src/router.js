import Components from './components/index'

const routers = [

  {
    path: '/login',
    meta: {
      title: '登录'
    },
      component: Components.Login
  },
    { path: '/', redirect: '/dashboard'},
    {
        path: '/dashboard',
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
        component: Components.Search
    },
    {
        path: '/:from?/detail/:pid/:type?',
        meta: {
            title: '主体详情'
        },
        component: Components.SubjectDetail
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
