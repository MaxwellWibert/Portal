const routes = [
	{
		path: '/',
		name: 'MainLayout',
		// lazy loading component
		component: () => import('layouts/MainLayout.vue'),
		children: [
			{
				path: '',
				name: 'IndexPage',
				component: () => import('pages/IndexPage.vue'),
			},
			{
				path: 'studyprogress',
				name: 'StudyProgress',
				component: () => import('pages/TrackingPage.vue'),
			},
			{
				path: 'studydocuments',
				name: 'StudyDocuments',
				component: () => import('pages/FormsPage.vue'),
			},
		],
	},
	// Always leave this as last one,
	// but you can also remove it
	{
		path: '/:catchAll(.*)*',
		// lazy loading component
		component: () => import('pages/ErrorNotFound.vue'),
	},
];

export default routes;
