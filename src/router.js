import Components from './components/index'

const routers = [
  {
    path: '/',
    meta: {
      title: '首页'
    },
    component: Components.Index
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
