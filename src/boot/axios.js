import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

axios.defaults.baseURL = 'http://localhost:8081'