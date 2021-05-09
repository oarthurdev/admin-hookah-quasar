import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
  login(user) {
    const self = this
    return axios
      .post(API_URL + 'login', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.noExist) {
            self.$awn.alert('Email does not exist in our system.')
          } else if (response.data.isEmpty) {
            self.$awn.alert('User and password cannot be empty.')
            return false
          } else if (response.data.auth) {
            localStorage.setItem('token', JSON.stringify(response.data.token));
            localStorage.setItem('email', response.data.email)
          } else {
            self.$awn.alert('Wrong email or password, try again.')
          }

        return response.data;
      });
  }

  logout() {
    localStorage.clear()
    location.href = '/'
  }

  register(user) {
    const options = {
        url: 'register',
        method: 'POST',
        data: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            password: user.password,
            rpassword: user.repeatPassword
        }
    }

    return axios.post(API_URL + options).then(function (result) {
        if (result.data.emailExist) {
          vm.errorMsg = vm.user.email + ' is already registered, try another.'
          vm.$awn.alert(vm.errorMsg)
        } else if(result.data.empty) {
          vm.$awn.alert('The form cannot contain empty fields.')
        } else if(result.data.diffPass) {
          vm.$awn.alert('The passwords you entered do not match.')
        } else if (result.data) {
          vm.$awn.async(promise, vm.user.name + ' registered successfully.')
        } else {
          vm.$awn.alert('Oops, something went wrong, try again later.')
        }
      })
  }
}

export default new AuthService();