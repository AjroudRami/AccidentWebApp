<style>
.user {
  position: relative;
  left: -80px;
  top: 65px;
  font-size: 12px;
  font-style: italic;
}
.message {
  position: relative;
  top: -14px;
}
.form {
  margin: 20px 0px 50px 50px;
}
</style>
<template>
  <div>
    <div v-if="crash">
      <h1>Accident sur {{crash.placeName}} (<i>Niv. {{crash.seriousness}}</i>)</h1>
      <b-card>
        <b-media v-for="comment in crash.comments" :key="comment.id">
          <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" />
          <div class="user">#{{comment.userId.substring(comment.userId.length-4)}}</div>
          <div class="message">
            <h5 class="mt-0">{{comment.title}}</h5>
            <p>
              {{comment.message}}
            </p>
          </div>
        </b-media>
      </b-card>
      <b-form class="form">
        <h3>Ajouter un commentaire</h3>
        <b-form-group id="name-group"
                       label="Nom"
                       label-for="name"
                       description="Rentrez votre nom.">
           <b-form-input id="name"
                         type="text"
                         v-model="name"
                         required
                         placeholder="Votre nom">
           </b-form-input>
         </b-form-group>
         <b-form-group id="title-group"
                      label="Title"
                      label-for="title"
                      description="Le titre de votre message.">
          <b-form-input id="title"
                        type="text"
                        v-model="title"
                        required
                        placeholder="Titre">
          </b-form-input>
        </b-form-group>
        <b-form-group id="message-group"
                     label="Message"
                     label-for="message"
                     description="Votre message.">
         <b-form-input id="message"
                       type="text"
                       v-model="message"
                       required
                       placeholder="Message">
         </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" @click="send()">Envoyer</b-button>
        <b-button type="reset" variant="danger" @click="reset()">RAZ</b-button>
      </b-form>
      <gmap-map
        :center="{lat: location.lat, lng: location.lng}"
        :zoom="17"
        :style="{height: '200px', width: '100%'}"
      >
        <gmap-marker :position="crash" icon="/src/images/crash.png">
        </gmap-marker>
        <gmap-marker :position="location" icon="/src/images/car.png">
        </gmap-marker>
      </gmap-map>
    </div>
    <div v-else>
      Chargement de l'accident
    </div>
  </div>
</template>

<script>
import api from '../../services/api'
import location from '../../services/location'

export default {
  components: {

  },
  data: function () {
    return {
      location: location,
      id: 'unknown',
      crash: null,
      name: '',
      title: '',
      message: ''
    }
  },
  methods: {
    send: function () {
      api.post(`/accidents/${this.id}/comments`, {
      	title: this.title,
        message: this.message,
        userId: this.name.replace(/\ /g, '-')
      }).then(res => {
        this.crash.comments.push(res.data)
      }).catch(err => {
        this.$router.push('/')
      })
      this.reset()
    },
    reset: function () {
      this.name = ''
      this.title = ''
      this.message = ''
    }
  },
  mounted: function () {
    this.id = this.$route.params.id
    api.get(`/accidents/${this.id}`).then(res => {
      this.crash = {
        lng: res.data.loc[0],
        lat: res.data.loc[1],
        seriousness: res.data.seriousness,
        placeName: res.data.placeName,
        comments: []
      }
      // GET ACCIDENT
      api.get(`/accidents/${this.id}/comments`).then(res => {
        this.crash.comments = res.data
      }).catch(err => this.$router.push('/'))
    }).catch(err => this.$router.push('/'))

  }
}
</script>
