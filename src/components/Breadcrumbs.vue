<template>
  <div class="q-pa-md q-gutter-sm">
    <q-breadcrumbs align="right">
      <q-breadcrumbs-el label="Dashboard" icon="home" to="/dashboard" />
        <q-breadcrumbs-el v-if="$route.fullPath == '/profile'" label="Profile" icon="people" to="/profile" />
    </q-breadcrumbs>
  </div>
</template>
<script>
export default {
  name: 'Breadcumbs'
}
</script>