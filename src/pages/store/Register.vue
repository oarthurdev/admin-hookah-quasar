<template>
<div class="q-pa-md row items-start q-gutter-md">
 <q-card flat bordered class="card-update-profile">
    <center>
      <q-card-section>
        <div class="text-h6" style="margin-bottom: 20px;">Register your store</div>
        <q-form
      @submit="submit"
      class="q-gutter-md"
    >
    <div class="row">
      <div class="col">
        <q-input
          ref="storeN"
          filled
          v-model="store.name"
          label="Store name"
          :rules="[
            val => !!val || '* Field Required'
          ]"
          lazy-rules
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-input
        ref="storeD"
        v-model="store.description"
        filled
        type="textarea"
        label="Store Description"
        :rules="[
            val => !!val || '* Field Required'
          ]"
        lazy-rules
        />
      </div>
    </div>

    <div class="row">
      <div class="col">
        <q-input
          ref="storeP"
          filled
          v-model="store.phone"
          label="Store Phone"
          mask="(##) ##### - ####"
          :rules="[
            val => !!val || '* Field Required'
          ]"
        lazy-rules
        />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <q-input
            ref="storea"
            filled
            v-model="store.cep"
            label="CEP"
            for="cep"
            mask="#####-###"
            style="max-width: 250px; float: left;"
            v-on:blur="getCepInfos(store.cep)"
            :rules="[
            val => !!val || '* Field Required'
          ]"
            lazy-rules
            />
        </div>
      </div>
    <div class="row">
      <div class="col">
        <q-input
          ref="storelog"
          filled
          v-model="store.logradouro"
          label="Logradouro"
          style="margin-right: 10px;"
          :rules="[
            val => !!val || '* Field Required'
          ]"
          lazy-rules
          />
      </div>
      <div class="col">
        <q-input
          ref="storenum"
          filled
          v-model="store.numero"
          label="Numero"
          style="margin-right: 10px;"
          />
      </div>
      <div class="col">
        <q-input
          ref="storecomp"
          filled
          v-model="store.complemento"
          label="Complemento"
          />
      </div>
    </div>
  <div class="row">
    <div class="col">
      <q-input
        ref="storebair"
        filled
        v-model="store.bairro"
        label="Bairro"
        style="margin-right: 10px;"
        :rules="[
            val => !!val || '* Field Required'
          ]"
          lazy-rules
        />
      </div>
    <div class="col">
      <q-input
        ref="storecid"
        filled
        v-model="store.cidade"
        label="Cidade"
        style="margin-right: 10px;"
        :rules="[
            val => !!val || '* Field Required'
          ]"
          lazy-rules
        />
    </div>
    <div class="col">
      <q-input
        ref="storeest"
        filled
        v-model="store.estado"
        :rules="[
            val => !!val || '* Field Required'
          ]"
          lazy-rules
        label="Estado"
        />
    </div>
  </div>
   <q-select
      filled
      v-model="store.items"
      multiple
      :options="options"
      use-chips
      stack-label
      label="Store products"
      style="margin-bottom: 30px;"
    />
    <picture-input
      ref="pictureInput"
      width="200" 
      height="200" 
      margin="16" 
      accept="image/jpeg,image/png" 
      size="10" 
      button-class="btn"
      :custom-strings="{
          upload: '<h1>Bummer!</h1>',
          drag: 'Upload a Store image. '
      }"
      @change="onChange">
      </picture-input>
    <div>
      <q-btn class="float-right" style="margin-bottom: 10px;" v-on:click="submit" label="Submit" type="submit" color="primary"/>
    </div>
    </q-form>
  </q-card-section>
    </center>
  </q-card> 
</div>
</template>
<script>
import Vue from 'vue'
import PictureInput from 'vue-picture-input'
import 'vue-search-select/dist/VueSearchSelect.css'
import _ from 'lodash'
import VuePlaceAutocomplete from 'vue-place-autocomplete';
import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css'
import cep from 'cep-promise'

Vue.use(VueTelInput)
Vue.use(VuePlaceAutocomplete);

export default {
  name: 'Register',
  data () {
    return {
      user: {
        email: null
      },
      store: {
        name: null,
        description: null,
        cep: null,
        numero: null,
        complemento: null,
        bairro: null,
        estado: null,
        cidade: null,
        logradouro: null,
        phone: null,
        name_file: null,
        items: []
      },
      form: {
        country: {
          label: null,
          data: {}
        }
      },
      productItem: '',
      product: [],
      searchText: '',
      lastSelectItem: {},
      image: null,
      options: []
    }
  },
  mounted () {
    let self = this
    this.storea = new google.maps.places.Autocomplete(
// (this.$refs.autocomplete),
    (document.getElementById("address")),
      {types: ['geocode']}
      );
      this.storea.addListener('place_changed', () => {
      let place = this.storea.getPlace();
      let ac = place.address_components;
      console.log(ac);
      });

      const vm = this

      vm.$axios.get('/api/category/get-all').then(function (result) {
        if (result.data) {
          vm.options = result.data
        }
    })
  },
  created () {
    let vm = this
    vm.user.email = localStorage.getItem('name')

    vm.$axios
        .get('/api/user/get-photo')
        .then(function (result) {
          if (result.data) {
            vm.user.photo = result.data.profile_picture
          } else {
            console.log('Error')
          }
        })
    vm.$axios
        .get('/api/user/get-role')
        .then(function (result) {
          if (result.data) {
            vm.user.role = result.data.role_name
          } else {
            console.log('Error')
          }
        })
  },
  methods: {
    getCepInfos (cepP) {
      let self = this
      cepP = cepP.replace(/[^a-zA-Z0-9]/g, '');
      cep(cepP)
        .then(function (result) {
          self.store.logradouro = result.street
          self.store.bairro = result.neighborhood
          self.store.cidade = result.city
          self.store.estado = result.state
        })
        .catch(function (res) {
            if(res) {
              self.$store.dispatch('error', {position: 'bottom-right', message: 'CEP não encontrado.'})
            }
            return false
        })
    },
    submit (e) {
      let vm = this
      e.preventDefault()
      if(this.$refs.storeN.validate() &&
         this.$refs.storeD.validate() &&
         this.$refs.storeP.validate()) {

         
      this.$axios.post('/api/lounge/upload-image', {image: vm.image, email: vm.user.email, store_name: vm.store.name}
          ).then(function (result) {
            if (result.data) {
              vm.store.name_file = result.data.name_file
            }
          })
      let promise = this.$axios
        .post('/api/lounge/register', {name: vm.store.name, description: vm.store.description, phone: vm.store.phone, cep: vm.store.cep, logradouro: vm.store.logradouro, bairro: vm.store.bairro, cidade: vm.store.cidade, estado: vm.store.estado, numero: vm.store.numero, complemento: vm.store.complemento, name_file: vm.store.name_file, products: vm.store.items})
        .then(function (result) {
          if (result.data) {
            vm.$q.notify({
                color: 'positive',
                message: '<b>' + vm.store.name + '</b> has registered successfully.',
                html: true
            })
          }
        })
        }
    },
    onSelect (items, lastSelectItem) {
      this.items = items
      this.lastSelectItem = lastSelectItem
    },
    onChange (image) {
      if (image) {
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    },
    selectFromParentComponent () {
      this.items = _.unionWith(this.items, [this.product[0]], _.isEqual)
    }
  },
  components: {
    PictureInput
  }
}
</script>
<style scoped>
.img-profile {
  border-radius: 50%;
  width: 120px;
  height: 120px;
}

.q-card {
  max-width: 600px;
  width: 500px;
  margin-left: 10px;
}

.card-update-profile {
  min-width: 1100px;
}
</style>