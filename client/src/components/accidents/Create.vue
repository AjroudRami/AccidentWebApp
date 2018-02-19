<template>
  <b-modal ref="modal"  hide-footer>
    Création d'un nouvel accident
    <b-form class="form">
     <b-form-group id="name-group"
                  label="Nom"
                  label-for="name"
                  description="Le nom de l'accident">
        <b-form-input id="name"
                      type="text"
                      v-model="name"
                      required
                      placeholder="Nom">
        </b-form-input>
      </b-form-group>
       <b-form-group id="seriousness-group"
                    label="Sévérité"
                    label-for="seriousness"
                    description="La sévérité de l'accident">
        <b-form-input id="seriousness"
                      type="number"
                      v-model="seriousness"
                      required
                      placeholder="Séverité">
        </b-form-input>
      </b-form-group>
       <b-form-group id="lat-group"
                    label="Latitude"
                    label-for="lat"
                    description="La latitude de l'accident">
        <b-form-input id="lat"
                      type="number"
                      v-model="lat"
                      required
                      placeholder="Latitude">
        </b-form-input>
      </b-form-group>
      </b-form-group>
         <b-form-group id="lng-group"
                      label="Longitude"
                      label-for="lng"
                      description="La longitude de l'accident">
          <b-form-input id="lng"
                        type="number"
                        v-model="lng"
                        required
                        placeholder="Longitude">
          </b-form-input>
        </b-form-group>
      </b-form-group>
    </b-form>
     <div>
       <b-btn class="mt-3" variant="outline-danger" @click="createCrash()">Créer un nouvel accident</b-btn>
       <b-btn class="mt-3" variant="outline-info" @click="hideModal()">Annuler</b-btn>
    </div>
  </b-modal>
</template>

<script>
import api from '../../services/api'

export default {
  props: [
    'lat', 'lng'
  ],
  data: function () {
    return {
      seriousness: 1,
      name: ''
    }
  },
  methods: {
    show() {
      this.$refs.modal.show()
    },
    hideModal() {
      this.$refs.modal.hide()
    },
    createCrash() {
      api.post('/accidents', {
      	placeName: this.name,
      	loc: [this.lng, this.lat],
      	seriousness: this.seriousness
      }).then(res => {
        this.name = ''
        this.seriousness = 1
        this.hideModal()
      }).catch(console.error)
    }
  }
}
</script>
