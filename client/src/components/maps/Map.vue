<style scoped>

</style>

<template>
  <div>
    <gmap-map
      :center="{lat:43.615552, lng: 7.071875}"
      :zoom="17"
      :style="{height: height + 'px', width: '100%'}"
    >
    <gmap-marker v-for="item in items" :position="item">
    </gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import api from '../../services/api'

export default {
  data: function () {
    return {
      items: [
        {lat:43.615552, lng: 7.071875},
        {lat:43.615452, lng: 7.071875}
      ],
      height: window.innerHeight - 57
    }
  },
  mounted: function () {
    api.get('/accidents').then(res => {
      console.log(res.data)
    }).catch(console.error)
  }
}
</script>
