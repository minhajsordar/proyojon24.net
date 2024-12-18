import { useLocalStorage } from '@vueuse/core'
const checkLogin = (to, from, next) => {
  const proyojonloginuser = useLocalStorage('proyojonloginuser', {})

  function isObjEmpty(obj) {
    return Object.keys(obj).length === 0;
  }
  if ((proyojonloginuser.value instanceof Object) && isObjEmpty(proyojonloginuser.value)) {
    next({ name: 'login' })
  } else {
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
    path: '/',
    component: () => import('layouts/PublicLayout.vue'),
    children: [
      { path: '', component: () => import('pages/startingPage.vue') },
      { path: '/home', component: () => import('pages/homePage.vue') },
      { path: '/login', name: 'login', component: () => import('pages/auth/loginPage.vue') },
      { path: '/register', component: () => import('pages/auth/registerView.vue') },
      { path: '/forget_password', component: () => import('pages/auth/forgetPassword.vue') },
      { path: '/service_categorys_list/:id', component: () => import('pages/publicpages/serviceCategorys.vue') },
      { path: '/service_providers_list/:id', component: () => import('pages/publicpages/serviceProviders.vue') },
      { path: '/service_provider/:id', component: () => import('pages/publicpages/serviceProviderProfile.vue') },
      { path: '/notifications', component: () => import('pages/publicpages/commonNotifications.vue') },
      { path: '/how_it_works', component: () => import('pages/howItWorks.vue') },
      { path: '/how_to_register', component: () => import('pages/howToRegister.vue') },
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
        path: '/direct_message', component: () => import('pages/message/messengerPage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/direct_message/:id', component: () => import('pages/message/messengerPage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/service_provider_preview/:id', component: () => import('pages/user/userServiceProviderPreview.vue'),
        beforeEnter: checkLogin,
      },
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
      },
      {
        path: '/banners_create_update', component: () => import('pages/slider/sliderController.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/moving_text', component: () => import('pages/controller/movingTextControl.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/dashboard', component: () => import('pages/dashboard/dashboardPage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/premium_account_and_transactions', component: () => import('pages/user/premiumAccountAndTransactions.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/payment_and_service_configuration', component: () => import('pages/dashboard/paymentAndServiceConfigurationPage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/pending_payments', component: () => import('pages/dashboard/pendingPaymentList.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/pending_nid_verification', component: () => import('pages/dashboard/nidVerificationPendingList.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/our_partners', component: () => import('pages/dashboard/maintainOurPartnersPage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/my_earnings', component: () => import('pages/user/myEarningsPage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/my_withdrawal_methodes', component: () => import('pages/user/myWithdrawalMethodePage.vue'),
        beforeEnter: checkLogin,
      },
      {
        path: '/pending_withdraw_list', component: () => import('pages/dashboard/pendingWithdrawList.vue'),
        beforeEnter: checkLogin,
      },
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
