<template>
<div class="row container">
    <div class="col-3"></div>
    <div class="col-6">
        <q-layout view="hHh lpR fFf">

            <q-page-container>
            <router-view />
            </q-page-container>

        </q-layout>
    </div>
</div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
<style>
.container {
    margin-top: 250px;
}
</style>
