<template>
<q-layout view="hHh lpR fFf">
    <q-page-container>
    <transition name="page" mode="out-in">
      <router-view></router-view>
    </transition>
    </q-page-container>
</q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>