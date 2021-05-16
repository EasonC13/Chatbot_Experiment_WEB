import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import intro from '@/pages/intro'
import finish from '@/pages/finish'
import start from '@/pages/start'
import single_real_girl from '@/pages/chatroom/single_real_girl'
import single_real_boy from '@/pages/chatroom/single_real_boy'
import single_anonymous from '@/pages/chatroom/single_anonymous'
import single_anime from '@/pages/chatroom/single_anime'
import multi_anime from '@/pages/chatroom/multi_anime'
import multi_anonymous from '@/pages/chatroom/multi_anonymous'
import warmup from '@/pages/chatroom/warmup'
import intergrated_test from '@/pages/intergrated_test'
import debrief from '@/pages/debrief'
import login from '@/pages/login'
import logout from '@/pages/logout'
Vue.use(Router)

const router =  new Router({
  routes: [
    {
      path: '/',
      redirect: "intro"
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
      path: '/finish',
      name: 'finish',
      component: finish,
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
      path: '/single_real_boy',
      name: 'single_real_boy',
      component: single_real_boy,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/single_anonymous',
      name: 'single_anonymous',
      component: single_anonymous,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/single_anime',
      name: 'single_anime',
      component: single_anime,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/multi_anime',
      name: 'multi_anime',
      component: multi_anime,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/multi_anonymous',
      name: 'multi_anonymous',
      component: multi_anonymous,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/warm_up',
      name: 'warm_up',
      component: warmup,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/debrief',
      name: 'debrief',
      component: debrief,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/intergrated_test',
      name: 'intergrated_test',
      component: intergrated_test,
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