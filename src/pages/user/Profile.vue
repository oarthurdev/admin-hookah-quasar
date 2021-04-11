<template>
    <center>
        <h5>Profile</h5>
    </center>
</template>
<script>
export default {
  name: 'Profile',
  data () {
    return {
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
}
</script>
