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
