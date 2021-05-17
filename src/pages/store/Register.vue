<template>
<div class="q-pa-md row items-start q-gutter-md">
 <q-card flat bordered class="card-update-profile" style="margin-left: 50px;">
    <center>
      <q-card-section>
        <div class="text-h6" style="margin-bottom: 20px;">Register your store</div>
        <q-form
      @submit="submit"
      class="q-gutter-md"
    >
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

      <q-input
        ref="storea"
        filled
        v-model="store.address"
        label="Store Address"
        for="address"
        />

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
        address: null,
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
    vm.user.email = localStorage.getItem('email')

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
        .post('/api/lounge/register', {name: vm.store.name, description: vm.store.description, phone: vm.store.phone, name_file: vm.store.name_file, products: vm.store.items})
        .then(function (result) {
          if (result.data) {
            const msg = '<b>' + vm.store.name + '</b> has registered successfully.'
            vm.$awn.async(promise, msg)
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
  min-width: 900px;
}
</style>