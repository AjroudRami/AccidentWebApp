<style scoped>

</style>

<template>
  <div>
    <gmap-map
      :center="{lat:43.615552, lng: 7.071875}"
      :zoom="17"
      :style="{height: height + 'px', width: '100%'}"
    ></gmap-map>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      height: window.innerHeight - 57
    }
  }
}
</script>
