import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import intro from '@/pages/intro'
import start from '@/pages/start'
import single_real_girl from '@/pages/chatroom/single_real_girl'
import login from '@/pages/login'
import logout from '@/pages/logout'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/intro',
      name: 'intro',
      component: intro,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/start',
      name: 'start',
      component: start,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/single_real_girl',
      name: 'single_real_girl',
      component: single_real_girl,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/logout',
      name: 'logout',
      component: logout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/home',
      redirect: "/start"
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(firebase.auth().currentUser)
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('/login');
  else next();
});

export default router;