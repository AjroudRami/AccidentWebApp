<style>

</style>

<template>
  <div>
    <gmap-map
      :center="{lat: location.lat, lng: location.lng}"
      :zoom="17"
      :style="{height: height + 'px', width: '100%'}"
      @rightclick='moveLocation($event)'
    >
      <gmap-info-window :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false" v-if="currentCrash">
        <div>Il y a un accident sur la route: <b>{{currentCrash.placeName}}</b></div>
        Cliquez <button><router-link :to="'accidents/' + currentCrash.id">ici</router-link></button> pour vous rendre sur la page de l'accident
      </gmap-info-window>
      <gmap-marker :position="location" icon="/src/images/car.png">
      </gmap-marker>
      <gmap-marker v-for="item in items" :key="item.id" :position="item" icon="/src/images/crash.png" @click="clickCrash(item)">
      </gmap-marker>
    </gmap-map>

    <b-modal ref="crashModal"  hide-footer >
      Un nouvel accident a été detecté près de vous!
       <div>
         <b-btn class="mt-3" variant="outline-danger" @click="hideCrashModal(true)">Se rendre sur la page de l'accident</b-btn>
         <b-btn class="mt-3" variant="outline-info" @click="hideCrashModal()">Okay</b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import api from '../../services/api'
import location from '../../services/location'

export default {
  data: function () {
    return {
      infoWinOpen: false,
      infoContent: 'INFO',
      currentCrash: null,
      infoWindowPos: {lat: 0, lng: 0},
      location: location,
      items: [
      ],
      height: window.innerHeight - 57
    }
  },
  methods: {
    moveLocation: function($event) {
      this.location.setLocation($event.latLng.lat(), $event.latLng.lng())
    },
    clickCrash: function (crash) {
      this.currentCrash = crash
      this.infoWindowPos = {lat: crash.lat, lng: crash.lng}
      this.infoWinOpen = true
    },
    loadNearbyAccidents: function () {
      api.get(`/accidents?lat=${this.location.lat}&lon=${this.location.lng}&radius=1`).then(res => {
        res.data.forEach(crash => {
          crash.lng = crash.loc[0]
          crash.lat = crash.loc[1]
          // Only add new crash
          if (this.items.filter(c => c.id == crash.id).length == 0) {
            this.$refs.crashModal.show()
            this.currentCrash = crash
            this.items.push(crash)
          }
        })
      }).catch(console.error)
    },
    hideCrashModal: function (goToPageOfCrash) {
      this.$refs.crashModal.hide()
      if (goToPageOfCrash) {
        this.$router.push('/accidents/' + this.currentCrash.id)
      }
    }
  },
  mounted: function () {
    this.loadNearbyAccidents()
    this.interval = setInterval(() => {
      this.loadNearbyAccidents()
    }, 5000)
  },
  beforeDestroy: function () {
    clearInterval(this.interval)
  }
}
</script>
