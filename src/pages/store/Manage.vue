<template>
<div class="row">
     <div class="col-12 col-md-auto" style="width: 400px; margin-right: 30px; margin-bottom: 30px;" v-for="stores in store" v-bind:key="stores.image">
        <q-card dark bordered class="bg-grey-9 my-card">
            <q-card-section>
                <center>
                    <img v-bind:src="'http://localhost:8080/' + criarNome(stores.name) + '/' + stores.image" width="150px" height="150px" class="store-image" />
                    <div class="text-h6">{{stores.name}}</div>
                    <div class="text-subtitle2">{{stores.phone}}</div>
                </center>
            </q-card-section>

            <!-- <q-separator dark inset />

            <center>
                <q-card-section>
                {{stores.street}} {{(stores.number) ? "nº " + stores.number :  null}} - {{stores.neighborhood}}<br />
                {{stores.city}} / {{stores.state}} - {{stores.zipcode}}
                </q-card-section>
            </center> -->

            <q-separator dark inset />

            <center>
                <q-card-section>
                    <q-btn round color="red" icon="delete" @click="prompt = true; store_id = stores.store_id; store_update.name = stores.name" class="margin-right">
                        <q-tooltip
                        transition-show="rotate"
                        transition-hide="rotate">
                        Delete
                        </q-tooltip>
                        <q-dialog v-model="prompt" persistent>
                            <q-card style="min-width: 350px">
                                <q-card-section>
                                <div style="font-size: 13pt;">Please type <b>{{stores.name}}</b> to confirm the deletion.</div>
                                </q-card-section>

                                <q-card-section class="q-pt-none">
                                <q-input dense v-model="storeNameConfirm" autofocus @keyup="confirmDelete(storeNameConfirm, store_update.name)"/>
                                </q-card-section>

                                <q-card-actions align="right" class="text-primary">
                                <q-btn flat label="Cancel" @click="cancel" v-close-popup />
                                <q-btn flat label="Delete" id="btn_delete" color="red" @click="deleteStore(store_id)" :disabled="disabled" v-close-popup />
                                </q-card-actions>
                            </q-card>
                                <!-- <q-btn flat label="Delete" @click="deleteStore(store_id)" color="red"  v-close-popup /> -->
                            </q-dialog>
                    </q-btn>
                     <q-btn round color="secondary" @click="dialog = true; 
                                                            store_id = stores.store_id; 
                                                            store_update.name = stores.name
                                                            store_update.phone = stores.phone
                                                            store_update.address.cep = stores.zipcode
                                                            store_update.address.bairro = stores.neighborhood
                                                            store_update.address.numero = stores.number
                                                            store_update.address.street = stores.street
                                                            store_update.address.complement = stores.complement
                                                            store_update.address.cidade = stores.city
                                                            store_update.address.estado = stores.state
                                                            store_update.description = stores.description
                                                            store_items = stores.product" 
                                                            icon="edit" class="margin-right">
                        <q-tooltip
                        transition-show="rotate"
                        transition-hide="rotate">
                        Edit
                        </q-tooltip>
                    </q-btn>
                    <q-btn round color="primary" icon="power_settings_new" @click="confirm = true; store_id = stores.store_id; store_update.name = stores.name">
                        <q-tooltip
                        transition-show="rotate"
                        transition-hide="rotate">
                        Connect
                        </q-tooltip>
                    </q-btn>
                    <div class="col-12 col-md-auto">
                        <q-dialog
                        v-model="dialog"
                        persistent
                        :maximized="maximizedToggle"
                        transition-show="slide-up"
                        transition-hide="slide-down"
                        >
                        <q-card class="bg-primary text-white">
                            <q-bar>
                            <q-space />

                            <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                                <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
                            </q-btn>
                            <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                                <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
                            </q-btn>
                            <q-btn dense flat icon="close" v-close-popup>
                                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
                            </q-btn>
                            </q-bar>

                            <q-card-section>
                            <div class="text-h6">Edit <b>{{stores.name}}</b></div>
                            </q-card-section>

                            <q-card-section class="q-pt-none">
                                <q-form>
                                    <q-input
                                        filled
                                        v-model="store_id"
                                        label="Store id"
                                        disable
                                        class="margin-bottom"
                                    />
                                    <q-input
                                        filled
                                        v-bind:placeholder="stores.name"
                                        v-model="store_update.name"
                                        label="Store name"
                                        class="margin-bottom"
                                        disable
                                    />
                                    <q-input
                                        filled
                                        v-model="store_update.description"
                                        label="Store description"
                                        class="margin-bottom"
                                    />
                                    
                                    <div class="row">
                                        <div class="col">
                                            <q-input
                                                ref="storea"
                                                filled
                                                v-bind:placeholder="stores.zipcode"
                                                v-model="store_update.address.cep"
                                                label="CEP"
                                                for="cep"
                                                mask="#####-###"
                                                style="max-width: 250px; float: left; margin-bottom: 10px;"
                                                @keydown.tab="getCepInfos(store_update.address.cep)"
                                                v-on:blur="getCepInfos(store_update.address.cep)"
                                                />
                                            </div>
                                        </div>
                                        <div class="row">
                                        <div class="col">
                                            <q-input
                                            ref="storelog"
                                             v-bind:placeholder="stores.street"
                                            filled
                                            v-model="store_update.address.street"
                                            label="Logradouro"
                                            style="margin-right: 10px; margin-bottom: 10px;"
                                            />
                                        </div>
                                        <div class="col">
                                            <q-input
                                            ref="storenum"
                                            filled
                                            v-bind:placeholder="stores.number"
                                            v-model="store_update.address.numero"
                                            label="Numero"
                                            style="margin-right: 10px; margin-bottom: 10px;"
                                            />
                                        </div>
                                        <div class="col">
                                            <q-input
                                            ref="storecomp"
                                            filled
                                            v-bind:placeholder="stores.complement"
                                            v-model="store_update.address.complement"
                                            label="Complemento"
                                            style="margin-bottom: 10px;"
                                            />
                                        </div>
                                        </div>
                                    <div class="row">
                                        <div class="col">
                                        <q-input
                                            ref="storebair"
                                            filled
                                            v-bind:placeholder="stores.neighborhood"
                                            v-model="store_update.address.bairro"
                                            label="Bairro"
                                            style="margin-right: 10px; margin-bottom: 10px;"
                                            />
                                        </div>
                                        <div class="col">
                                        <q-input
                                            ref="storecid"
                                            filled
                                            v-bind:placeholder="stores.city"
                                            v-model="store_update.address.cidade"
                                            label="Cidade"
                                            style="margin-right: 10px; margin-bottom: 10px;"
                                            />
                                        </div>
                                        <div class="col">
                                        <q-input
                                            ref="storeest"
                                            filled
                                            v-bind:placeholder="stores.state"
                                            v-model="store_update.address.estado"
                                            label="Estado"
                                            style="margin-bottom: 10px;"
                                            />
                                        </div>
                                    </div>

                                    <q-input
                                        filled
                                        v-model="store_update.phone"
                                        label="Store Phone"
                                        mask="(##) ##### - ####"
                                        class="margin-bottom"
                                    />
                                    <picture-input 
                                        ref="pictureInput" 
                                        @change="onChange" 
                                        width="200" 
                                        height="200" 
                                        margin="16" 
                                        accept="image/jpeg,image/png" 
                                        size="10" 
                                        style="margin-top: 100px;"
                                        class="margin-bottom"
                                        buttonClass="btn"
                                        :customStrings="{
                                        upload: '<h1>Bummer!</h1>',
                                        drag: 'Choose a new picture'
                                        }">
                                    </picture-input>
                                    <div>
                                        <q-btn class="float-right" style="margin-bottom: 10px;" v-on:click="editStore" label="Edit" type="submit" color="primary"/>
                                    </div>
                                </q-form>
                            </q-card-section>
                        </q-card>
                        </q-dialog>
                    </div>
                </q-card-section>
            </center>
        </q-card>
        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <q-avatar icon="power_settings_new" color="primary" text-color="white" />
                <span class="q-ml-sm">You want to connect to <b>{{store_update.name}}?</b></span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="Cancel" color="red" v-close-popup />
                <q-btn flat label="Yes" color="primary" @click="connect" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</div>
</template>
<script>
import PictureInput from 'vue-picture-input'
import cep from 'cep-promise'
require('src/functions/string-prototypes')

export default {
  name: 'ManageLounge',
  data () {
    return {
        user: {
            email: null
        },
        store: {},
        prompt: false,
        store_id: null,
        storeNameConfirm: null,
        disabled: true,
        dialog: false,
        maximizedToggle: true,
        store_update: {
            name: null,
            description: null,
            phone: null,
            address: {
                cep: null,
                numero: null,
                cidade: null,
                estado: null,
                complement: null,
                street: null,
                bairro: null,
            },
            image: null
        },
        store_products: [],
        store_items: [],
        confirm: false
    }
  },
  created () {
      this.getAllStore()
  },
  methods: {
      connect () {
          console.log('connect')
      },
      deleteStore (store_id) {
          const vm = this
          let promise = this.$axios
            .post('/api/lounge/delete', {store_id: store_id})
            .then(function (result) {
                if (result.data) {
                    vm.$q.notify({
                        color: 'negative',
                        message: '<b>' + result.data.name + '</b> deleted successfully.',
                        html: true
                    })
                    vm.getAllStore()
                    vm.storeNameConfirm = null
                    vm.disabled = true
                }
            })
      },
      cancel () {
          this.storeNameConfirm = null
      },
      confirmDelete (confirmName, nameStore) {
          if (confirmName === nameStore) {
              this.disabled = false
          } else {
              this.disabled = true
          }
      },
      getCepInfos (cepP) {
        let self = this
        cepP = cepP.replace(/[^a-zA-Z0-9]/g, '');
        cep(cepP)
            .then(function (result) {
                self.store_update.address.street     = result.street
                self.store_update.address.bairro     = result.neighborhood
                self.store_update.address.cidade     = result.city
                self.store_update.address.estado     = result.state
                self.store_update.address.numero     = null
                self.store_update.address.complement = null
            })
        },
      getAllStore () {
        const self = this
        self.user.email = localStorage.getItem('email')

        this.$axios
        .get('/api/lounge/get-all')
        .then(function (result) {
            if (result.data) {
                self.store = result.data.lounge
            }
        })
      },
      criarNome (str) {
          return createSlug(str)
      },
      editStore (e) {
          e.preventDefault()
          const self = this
          let promise = this.$axios.post('/api/lounge/update', {store_id: self.store_id,
                                                            store_update: self.store_update,
                                                            name_file: 'teste.jpg'})
                        .then(function (result) {
                            if (result.data) {
                                const msg = "Store updated successfully."
                                self.$store.dispatch('success', {position: 'bottom-right', message: msg})
                                self.dialog = false
                                setTimeout(() => {
                                    location.reload()
                                    }, 5000)
                            }
                        })
      },
      onChange (image) {
        console.log('New picture selected!')
        if (image) {
            console.log('Picture loaded.')
            this.image = image
        } else {
            console.log('FileReader API not supported: use the <form>, Luke!')
        }
    }
  },
  components: {
    PictureInput
  }
}
</script>
<style scoped>
.my-card {
    width: 100%;
    max-width: 500px;
}
.margin-right {
    margin-right: 5px;
}
.store-image {
    border-radius: 50%;
}
.margin-bottom {
    margin-bottom: 20px;
}
</style>

