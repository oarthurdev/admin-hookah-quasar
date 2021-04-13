<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          <router-link to="/dashboard">
          Hookah Finder
          </router-link>
        </q-toolbar-title>

        <div id="dropdownUser">
          <q-item clickable>
            <img v-bind:src="'http://localhost:8080/' + user.photo" class="user-image" alt="User Image">
            <a style="cursor: pointer; font-size: 11pt;">
              <div style="margin-top: 8px;">{{user.email}}</div>
            </a>
          </q-item>

          <q-menu fit>
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section @click="profile">
                <center>
                  <img v-bind:src="'http://localhost:8080/' + user.photo" class="user-image-dropdown" alt="User Image">
                  <q-tooltip
                  transition-show="rotate"
                  transition-hide="rotate">
                  Profile
                </q-tooltip>
                </center>
              </q-item-section>
            </q-item>
            <div style="margin-top: 8px;" class="text-center">{{user.email}}</div>
            <div style="margin-top: 8px;" class="text-center">{{user.role}}</div>
            <q-item clickable @click="logout">
              <q-item-section>
                <q-btn :icon="'logout'">
                  <q-tooltip
                    transition-show="rotate"
                    transition-hide="rotate">
                    Logout
                  </q-tooltip>
                </q-btn>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title align="right"><font size="4pt">Hookah Finder - Copyright &#9400; 2021</font></q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    <q-toggle v-model="darkMode"
                  :click="setDarkMode()"
                   class="toggleDarkMode">
      <q-tooltip
          transition-show="rotate"
          transition-hide="rotate">
          Turn lights {{onOrOff}}
        </q-tooltip>
    </q-toggle>
      <q-list id="main-navigation">
        <q-item-label
          header
          class="text-grey-8"
        >
          Main Navigation
        </q-item-label>
        <router-link v-for="link in essentialLinks"
                     v-bind:key="link.link"
                     v-bind:to="link.link"
                     class="text-grey-8">
          <EssentialLink
            :key="link.title"
            v-bind="link"
          />
        </router-link>
      </q-list>
    </q-drawer>

    <q-page-container>
      <Breadcrumbs />
      <vue-page-transition name="fade-in-right">
        <router-view />
      </vue-page-transition>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import linksData from 'boot/menu.js'
import Vue from 'vue'
import VuePageTransition from 'vue-page-transition'
import Breadcrumbs from 'components/Breadcrumbs'

Vue.use(VuePageTransition)

export default {
  name: 'MainLayout',
  components: { 
    EssentialLink,
    Breadcrumbs 
  },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      el: '',
      darkMode: true,
      onOrOff: 'on',
      user: {
        email: '',
        photo: '',
        role: ''
      },
      token: null
    }
  },
  created () {
    let vm = this
    vm.user.email = localStorage.getItem('email')
    vm.token = localStorage.getItem('token')

    vm.$axios
        .post('/user/get-photo', {email: vm.user.email})
        .then(function (result) {
          if (result.data) {
            vm.user.photo = result.data.profile_picture
            console.log(vm.fullPath)
          } else {
            console.log('Error')
          }
        })
    vm.$axios
        .post('/user/get-role', {email: vm.user.email})
        .then(function (result) {
          if (result.data) {
            vm.user.role = result.data.role_name
          } else {
            console.log('Error')
          }
        })
  },
  methods: {
    setDarkMode () {
      if(this.darkMode) {
        this.$q.dark.set(true)
        this.onOrOff = 'on'
      } else {
        this.$q.dark.set(false)
        this.onOrOff = 'off'
      }
    },
    logout (e) {
      const self = this
      e.preventDefault()
      this.$axios
        .post('logout', {token: this.token})
        .then(function (result) {
          console.log(result)
          if (result.data) {
            console.log(result.data)
            localStorage.clear()
            window.location.href = '/'
          } else {
            console.log('Error')
          }
        })
    },
    profile () {
      const self = this
      self.$router.push('/profile')
    }
  }
}
</script>
<style>
.toggleDarkMode {
  float: right;
}
.user-image {
  width: 35px;
  height: 35px;
  border-radius: 50px;
  margin-right: 10px;
}

.user-image-dropdown {
  width: 105px;
  height: 105px;
  border-radius: 50%;
}

#dropdownUser {
  margin-right: -15px;
}
</style>
