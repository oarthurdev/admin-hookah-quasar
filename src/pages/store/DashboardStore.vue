<template>
    <center>
        <h5>Dashboard Store</h5>
    </center>
</template>
<script>
export default {
  name: 'DashboardStore',
  data () {
    return {
      user: {
        email: null,
        token: null,
        photo: null
      },
      store: {
        id: null,
        image: null
      }
    }
  },
  created () {
    let vm = this
    vm.user.email = localStorage.getItem('name')
    vm.user.token = localStorage.getItem('token')
    vm.store.id = localStorage.getItem('store_id')

console.log(vm.store.id)
    vm.$axios
        .post('/api/lounge/get-image', {store_id: vm.store.id})
        .then(function (result) {
          if (result.data) {
            vm.store.image = result.data.lounge[0].image
          } else {
            console.log('Error')
          }
        })
  }
}
</script>
