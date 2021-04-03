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
          Hookah Finder
        </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

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
          Set dark mode {{onOrOff}}
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
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Dashboard',
    caption: 'Home',
    icon: 'home',
    link: '/dashboard'
  },
  {
    title: 'Teste',
    caption: 'Arthur',
    icon: 'dashboard',
    link: '/teste'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      el: '',
      darkMode: false,
      onOrOff: 'on'
    }
  },
  methods: {
    setDarkMode () {
      if(this.darkMode) {
        this.$q.dark.set(true)
        this.onOrOff = 'off'
      } else {
        this.$q.dark.set(false)
        this.onOrOff = 'on'
      }

      localStorage.setItem('dark', this.$q.dark.isActive)
    }
  }
}
</script>
<style scoped>
.toggleDarkMode {
  float: right;
}
</style>
