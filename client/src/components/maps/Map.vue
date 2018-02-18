<style scoped>

</style>

<template>
  <div>
    <gmap-map
      :center="{lat: location.lat, lng: location.lng}"
      :zoom="17"
      :style="{height: height + 'px', width: '100%'}"
      @rightclick='moveLocation($event)'
    >
    <gmap-marker :position="location" icon="/src/images/car.png">
    </gmap-marker>
    <gmap-marker v-for="item in items" :position="item" icon="/src/images/crash.png">
    </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import api from '../../services/api'
import location from '../../services/location'

export default {
  data: function () {
    return {
      location: location,
      items: [
        {lat:43.615552, lng: 7.071875},
        {lat:43.615452, lng: 7.071875}
      ],
      height: window.innerHeight - 57
    }
  },
  methods: {
    moveLocation: function($event) {
      this.location.setLocation($event.latLng.lat(), $event.latLng.lng())
    }
  },
  mounted: function () {
    this.interval = setInterval(() => {
      api.get('/accidents?lat=10&lng=10&radius=1').then(res => {
        console.log(res.data)
      }).catch(console.error)
    }, 5000)
  },
  beforeDestroy: function () {
    clearInterval(this.interval)
  }
}
</script>
