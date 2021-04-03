<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      darkMode: false
    }
  },
  created () {
    let vm = this
    vm.darkMode = localStorage.getItem('dark')
    this.$q.dark.set(vm.darkMode)
  }
}
</script>
