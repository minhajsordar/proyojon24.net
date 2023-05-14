
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/login', component: () => import('pages/auth/loginPage.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/ProfileLayout.vue'),
    children: [
      { path: '/profile', component: () => import('pages/user/profilePage.vue') },
      { path: '/locations', component: () => import('pages/location/locationsPage.vue') },
      { path: '/users', component: () => import('pages/user/userListPage.vue') },
      { path: '/help', component: () => import('pages/contact/helpPage.vue') },
      { path: '/services', component: () => import('pages/services/servicesList.vue') },
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
