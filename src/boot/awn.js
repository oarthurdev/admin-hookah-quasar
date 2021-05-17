import Vue from 'vue'
import VueAWN from "vue-awesome-notifications"
let options = {}
Vue.use(VueAWN, options)

Vue.prototype.$awn = VueAWN