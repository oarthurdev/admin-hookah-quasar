import Vue from 'vue'
import Vuex from 'vuex'
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
// import example from './module-example'
import VueAWN from "vue-awesome-notifications"
let options = {}
Vue.use(VueAWN, options)
Vue.use(Vuex)
Vue.use(VueTelInput)
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      // example
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING
  })

  return Store
}
