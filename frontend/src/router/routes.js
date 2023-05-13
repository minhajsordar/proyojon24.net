
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/login', component: () => import('pages/auth/loginPage.vue') },
      { path: '/login2', component: () => import('pages/auth/loginPage2.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/ProfileLayout.vue'),
    children: [
      { path: '/user', component: () => import('pages/user/profilePage.vue') },
      { path: '/settings', component: () => import('pages/user/settingsPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
