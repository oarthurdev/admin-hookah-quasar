<template>
  <div id="q-app">
    <main-layout/>
  </div>
</template>
<script>
import MainLayout from 'layouts/MainLayout'

export default {
  name: 'App',
  data () {
    return {
      token: localStorage.getItem('token')
    }
  },
  mounted () {
    if (token == null) {
      window.location.href = '/'
    }
  },
  components: {
    'main-layout': MainLayout
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

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: .25s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
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
