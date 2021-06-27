import Vue from 'vue'
import Vuex from 'vuex'
import { auth } from './auth.module'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

const options = {
    // You can set your default options here
};


Vue.use(Toast, options);
// import example from './module-example'
Vue.use(Vuex)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (opts) {
  const Store = new Vuex.Store({
    state: {
      darkMode: false
    },
    mutations: {
      change(state, dark) {
        state.darkMode = dark
      }
    },
    getters: {
      dark: state => state.darkMode
    },
    modules: {
      auth,      
      // example
    },
    actions: {
       error (context, payload) {        
         opts.Vue.$toast.error(payload.message, {
          position: payload.position,
          timeout: payload.timeout,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: true,
          rtl: false
        })
      },
      success (context, payload) {        
        opts.Vue.$toast.success(payload.message, {
         position: payload.position,
         timeout: payload.timeout,
         closeOnClick: true,
         pauseOnFocusLoss: true,
         pauseOnHover: true,
         draggable: true,
         draggablePercent: 0.6,
         showCloseButtonOnHover: false,
         hideProgressBar: true,
         closeButton: 'button',
         icon: true,
         rtl: false
       })
     },
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })


  return Store
}
