/* eslint-disable no-empty */
<template>
  <!-- todos os códigos que estou usando são do qusar, exempo q-form, q-input, q-tooltip, basta ir no site
  e ver o que melhor te atende, existem milhoes de opções, o que ajuda tb a não perder muito tempo com css -->
  <q-page padding>
    <!-- se usar a abreviação q- por se tratar de obejtos do quasar -->
    <!-- Na linha abaixo vemos o primeiro comando do vue.js que é o v-on:v-on:keyup.enter esse comando que dizer
    que quando o usuario apertar o enter o formulário será submetido -->
    <!-- logo em seguida precisamos definir da um nome para nosso formulario o qual chamei de formularioLogin e usei
    o :model para armazenar o fomulario -->
    <q-form v-on:keyup.enter="logar()" :model="formularioLogin" ref="formularioLogin" class="q-gutter-md">
      <!-- Aqui entra outro ponto importante do vue.js que é o v-model, o v-model armazena o valor do input,
      nesse caso estou falando que quero que o email digitado fique dentro do formularioLogin, ou seja,
      estou com o email armazenado dentro do formulario, o mesmo faço nos ponto 2 -->
        <q-input filled lazy-rules type="email" v-model="formularioLogin.email" label="Email"
          :rules="[ val => val && val.length > 0 || 'Insira o email']">
        </q-input>
        <!-- Ponto 2 -->
      <q-input filled type="password" lazy-rules v-model="formularioLogin.senha"
        :rules="[ val => val && val.length > 0 || 'Insira a senha']" label="Senha">
      </q-input>
       
      <div class="row justify-center content-center">
        <!-- Depois de ter criado o formulario e colocado o email e a senha dentro do formularioLogin
        precisamos então submeter o formulario, daqui vem outro comando do vue.js, o @click seguido
        de um metodo que chamei de logar() -->
        <q-btn label="Logar" @click="logar()" color="primary">
        <q-tooltip
          transition-show="rotate"
          transition-hide="rotate">
          Logar!
        </q-tooltip>
        </q-btn>
        <!-- Outro metodo que agora chamei de limpar() -->
        <q-btn label="Limpar" @click="limpar()" color="primary" flat class="q-ml-sm">
        <q-tooltip
          transition-show="rotate"
          transition-hide="rotate">
          Limpar Formulario!
        </q-tooltip>
        </q-btn>
      </div>
      <div class="form-group">
          <div class="col-sm-12 text-center">
            <p class="p2">Não tem uma conta?
              <a href="#" class="text-primary">
                <b>
                  <router-link to="/registrar" class="b2">Registrar</router-link>
                </b>
              </a>
            </p>
          </div>
        </div>

        <div class="form-group">
          <div class="col-sm-12 text-center">
            <p class="p2">Esqueceu a Senha?
              <a href="#" class="text-primary">
                <b>
                  <router-link to="/recuperar-senha" class="b2">Recuperar</router-link>
                </b>
              </a>
            </p>
          </div>
        </div>
    </q-form>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      // primeiro passo é definir o formulário que estamos usando no html
      // Abaixo defino o formulárioLogin como um objeto vazio
      formularioLogin: {}
    }
  },
  // outro ponto importe no vue.js são os methods, ou seja, basicamente é onde colocamos a açoes
  // que pecisamos executar, no caso o login e o limpar formulario, ao click nos botoes acionamos
  // as funções que são implementadas aqui no methods
  methods: {
    async logar () {
      try {
      this.$axios
        .post('http://localhost:8081/login', { email: this.formularioLogin.email, password: this.formularioLogin.senha })
        .then(function (result) {
          if (result.data.noExist) {
            new AWN().alert('Email does not exist in our system.')
          } else if (result.data.isEmpty) {
            new AWN().alert('User and password cannot be empty.')
            return false
          } else if (result.data.auth) {
            sessionStorage.setItem('token', result.data.token)
            sessionStorage.setItem('email', result.data.email)
            window.open('/#/dashboard', 'janela1', 'directories=no, location=no, menubar=no, scrollbars=no, status=no, toolbar=no, resizable=no')
          } else {
            new AWN().alert('Wrong email or password, try again.')
          }
        })
      } catch (erro) {
        console.log('Dados com o erro', erro)
      }
    },
    limpar () {
      this.formularioLogin = {}
    }
  },
  create () {
    console.log('Assim que a tela for inicia essa mensagem irá aparecer')
  }
}
</script>