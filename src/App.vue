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
<style lang="scss">
body, html{
  height: 100%;
  overflow: hidden;
}

body {
  font-family: 'Source Sans Pro','Helvetica Neue',Helvetica,Arial,sans-serif;
  font-weight: 400;
  overflow-x: hidden;
  overflow-y: auto;
}

#app {
  margin: -1px;
  height: 100%;
}
a {
  text-decoration: none;
  color: whitesmoke;
}
</style>
