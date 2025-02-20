export default [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/foo',
    children: [
      {
        path: 'baz',
        children: [],
        component: () => import('@/pages/foo/baz/index.vue'),
      },
    ],
    component: () => import('@/pages/foo/index.vue'),
  },
  {
    path: '/tooltip',
    children: [],
    component: () => import('@/pages/tooltip/index.vue'),
  },
  {
    path: '/user',
    children: [
      {
        path: ':id',
        component: () => import('@/pages/user/[id].vue'),
      },
    ],
    component: () => import('@/pages/user/index.vue'),
  },
  {
    path: '/:role',
    children: [],
    component: () => import('@/pages/[role]/index.vue'),
  },
]
