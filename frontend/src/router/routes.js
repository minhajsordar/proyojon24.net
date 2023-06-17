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
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') },
  //     { path: '/login',
  //     name:'login', component: () => import('pages/auth/loginPage.vue') },
  //   ]
  // },
  {
    path: '/', component: () => import('pages/startingPage.vue'),
  },
  {
    path: '/direct_message', component: () => import('pages/message/messengerPage.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/direct_message/:id', component: () => import('pages/message/messengerPage.vue'),
    beforeEnter: checkLogin,
  },
  {
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { path: '', component: () => import('pages/startingPage.vue') },
      { path: '/home', component: () => import('pages/homePage.vue') },
      { path: '/login', name:'login', component: () => import('pages/auth/loginPage.vue') },
      { path: '/register', component: () => import('pages/auth/registerView.vue') },
      { path: '/service_categorys_list/:id', component: () => import('pages/publicpages/serviceCategorys.vue') },
      { path: '/service_providers_list/:id', component: () => import('pages/publicpages/serviceProviders.vue') },
      { path: '/service_provider/:id', component: () => import('pages/publicpages/serviceProviderProfile.vue') },
      { path: '/notifications', component: () => import('pages/publicpages/commonNotifications.vue') },
  //   ]
  // },
  // {
  //   path: '/',
  //   component: () => import('layouts/ProfileLayout.vue'),
  //   children: [
      // {
      //   path: '/direct_message/:id', component: () => import('pages/message/messengerPage.vue'),
      //   beforeEnter: checkLogin,
      // },
      {
        path: '/profile', component: () => import('pages/user/profilePage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/service_provider_profile', component: () => import('pages/user/userServiceProviderProfile.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/service_provider_pending_list', component: () => import('pages/user/serviceProviderPendingList.vue'),
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
        path: '/notification_list', component: () => import('pages/notification/notificationsList.vue'),
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
