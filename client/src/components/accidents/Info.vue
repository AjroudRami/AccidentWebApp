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
h1 {
  margin-left: 20px;
}
.button {
   transition: all 0.2s ease;
   cursor: pointer;
   color: #cc0303;
}
.button:hover {
  color: darkred;
}
</style>
<template>
  <div style="padding: 50px; background-color: darkslateblue">
    <div v-if="crash">
      <b-card style="padding: 20px; margin-bottom: 20px">
        <h1>
          Accident sur {{crash.placeName}} (<i>Niv. {{crash.seriousness}}</i>)
          <span v-if="user.isAdmin" @click="deleteCrash()"><i class="far fa-trash-alt button"></i></span>
        </h1>
        <gmap-map
                :center="{lat: crash.lat, lng: crash.lng}"
                :zoom="17"
                :style="{height: '200px', width: '100%'}"
        >
          <gmap-marker :position="crash" icon="/src/images/crash.png">
          </gmap-marker>
          <gmap-marker :position="location" icon="/src/images/car.png">
          </gmap-marker>
        </gmap-map>
      </b-card>

      <b-card style="padding:20px; margin-bottom: 20px">
        <h4>
          Liste des commentaires:
        </h4>
        <b-media v-for="comment in crash.comments" :key="comment.id">
          <b-img slot="aside" blank blank-color="#ccc" width="64" alt="placeholder" />
          <div class="user">#{{comment.userId}}</div>
          <div class="message">
            <h5 class="mt-0">{{comment.title}}</h5>
            <p>
              {{comment.message}}
            </p>
          </div>
        </b-media>
      </b-card>
      <b-card style="margin-bottom: 20px">
        <b-form class="form">
          <h3>Ajouter un commentaire</h3>
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
      </b-card>
    </div>
    <div v-else>
      Chargement de l'accident
    </div>
  </div>
</template>

<script>
import api from '../../services/api'
import location from '../../services/location'
import user from '../../services/user'

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
      message: '',
      user: user
    }
  },
  methods: {
    send: function () {
      api.post(`/accidents/${this.id}/comments`, {
      	title: this.title,
        message: this.message,
        userId: user.name
      }).then(res => {
        this.crash.comments.push(res.data)
      }).catch(err => {
        this.$router.push('/')
      });
      this.reset()
    },
    reset: function () {
      this.name = '';
      this.title = '';
      this.message = ''
    },
    deleteCrash: function () {
      api.delete(`/accidents/${this.id}`).then(res => {
        this.$router.push('/')
      }).catch(console.error)
    }
  },
  mounted: function () {
    this.id = this.$route.params.id;
    api.get(`/accidents/${this.id}`).then(res => {
      this.crash = {
        lng: res.data.loc[0],
        lat: res.data.loc[1],
        seriousness: res.data.seriousness,
        placeName: res.data.placeName,
        comments: []
      };
      // GET ACCIDENT
      api.get(`/accidents/${this.id}/comments`).then(res => {
        this.crash.comments = res.data
      }).catch(err => this.$router.push('/'))
    }).catch(err => this.$router.push('/'))

  }
}
</script>
