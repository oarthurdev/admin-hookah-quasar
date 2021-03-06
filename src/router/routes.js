
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('layouts/RegisterLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('layouts/user/ProfileLayout.vue'),
    children: [
      { path: '', component: () => import('pages/user/Profile.vue') }
    ]
  },
  {
    path: '/store/register',
    name: 'RegisterStore',
    component: () => import('layouts/store/StoreLayout.vue'),
    children: [
      { path: '', component: () => import('pages/store/Register.vue') }
    ]
  },
  {
    path: '/store/manage',
    name: 'ManageStore',
    component: () => import('layouts/store/ManageLayout.vue'),
    children: [
      { path: '', component: () => import('pages/store/Manage.vue') }
    ]
  },
  {
    path: '/store/dashboard',
    name: 'DashboardStore',
    component: () => import('layouts/store/DashboardStoreLayout.vue'),
    children: [
      { path: '', component: () => import('pages/store/DashboardStore.vue') }
    ]
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Dashboard.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
