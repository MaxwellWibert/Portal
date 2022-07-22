const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
        {
            path: '',
            name: 'IndexPage',
            component: () => import('@/pages/IndexPage.vue'),
        },
        {
            path: 'studyprogress',
            name: 'StudyProgress',
            component: () => import('@/pages/TrackingPage.vue'),
        },
        {
            path: 'studydocuments',
            name: 'StudyDocuments',
            component: () => import('@/pages/FormsPage.vue'),
        },
    ],
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
]

export default routes