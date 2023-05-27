import { useLocalStorage } from '@vueuse/core'
const checkLogin = (to, from, next) => {
  const proyojonloginuser = useLocalStorage('proyojonloginuser', {})

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  if ((proyojonloginuser.value instanceof Object) && isObjEmpty(proyojonloginuser.value)) {
    next({name: 'login' })
  }else{
    next()
  }
}
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/login',
      name:'login', component: () => import('pages/auth/loginPage.vue') },
      { path: '/allservices', component: () => import('pages/publicpages/servicesList.vue') },
    ]
  },
  {
    path: '/',
    component: () => import('layouts/ProfileLayout.vue'),
    children: [
      {
        path: '/profile', component: () => import('pages/user/profilePage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/locations', component: () => import('pages/location/locationsPage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/users', component: () => import('pages/user/userListPage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/help', component: () => import('pages/contact/helpPage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/services', component: () => import('pages/services/servicesList.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/settings', component: () => import('pages/user/settingsPage.vue'),
        beforeEnter: checkLogin,
      }
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
