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

            <q-separator dark inset />

            <center>
                <q-card-section>
                {{stores.address}}
                </q-card-section>
            </center>

            <q-separator dark inset />

            <center>
                <q-card-section>
                    <q-btn round color="red" icon="delete" @click="prompt = true; store_id = stores.store_id; store_name = stores.name" class="margin-right">
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
                                <q-input dense v-model="storeNameConfirm" autofocus @keyup="confirmDelete(storeNameConfirm, store_name)"/>
                                </q-card-section>

                                <q-card-actions align="right" class="text-primary">
                                <q-btn flat label="Cancel" v-close-popup />
                                <q-btn flat label="Delete" id="btn_delete" color="red" @click="deleteStore(store_id)" :disabled="disabled" v-close-popup />
                                </q-card-actions>
                            </q-card>
                                <!-- <q-btn flat label="Delete" @click="deleteStore(store_id)" color="red"  v-close-popup /> -->
                            </q-dialog>
                    </q-btn>
                    <q-btn round color="secondary" icon="edit" class="margin-right">
                        <q-tooltip
                        transition-show="rotate"
                        transition-hide="rotate">
                        Edit
                        </q-tooltip>
                    </q-btn>
                    <q-btn round color="primary" icon="power_settings_new">
                        <q-tooltip
                        transition-show="rotate"
                        transition-hide="rotate">
                        Connect
                        </q-tooltip>
                    </q-btn>
                </q-card-section>
            </center>
        </q-card>
    </div>
</div>
</template>
<script>
require('src/functions/string-prototypes')

export default {
  name: 'ManageLounge',
  data () {
    return {
        user: {
            token: null
        },
        store: {},
        prompt: false,
        store_id: null,
        storeNameConfirm: null,
        store_name: null,
        disabled: true
    }
  },
  created () {
      this.getAllStore()
  },
  methods: {
      deleteStore (store_id) {
          const vm = this
          this.$axios
            .post('/lounge/delete', {store_id: store_id})
            .then(function (result) {
                if (result.data) {
                    const msg = "<b>" + result.data.name + '</b> has deleted successfully.'
                    vm.$awn.alert(msg)
                    vm.getAllStore()
                    vm.storeNameConfirm = null
                    vm.disabled = true
                }
            })
      },
      confirmDelete (confirmName, nameStore) {
          if (confirmName === nameStore) {
              this.disabled = false
          }
      },
      getAllStore () {
        const self = this
        self.user.token = localStorage.getItem('token')

        this.$axios
        .post('/lounge/get-all', {token: self.user.token})
        .then(function (result) {
            if (result.data) {
                self.store = result.data.lounge
            }
        })
      },
      criarNome (str) {
          return createSlug(str)
      }
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
</style>

