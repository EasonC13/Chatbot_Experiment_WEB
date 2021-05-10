// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import firebase from 'firebase';
let app = '';
const config = {
  apiKey: "AIzaSyBFrD0OMvaaFnFwD69tndWPY8H8vnP5ZiM",
  authDomain: "quickstart-1609385748292.firebaseapp.com",
  projectId: "quickstart-1609385748292",
  storageBucket: "quickstart-1609385748292.appspot.com",
  messagingSenderId: "1088063330856",
  appId: "1:1088063330856:web:4aed0445486349e1ca731d",
  measurementId: "G-56Y50ZMK8W"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    window.firebase = firebase
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app');
  }
});
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
