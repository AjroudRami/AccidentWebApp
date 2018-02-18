<template>
  <div>
    <navigation></navigation>
    <my-map></my-map>
  </div>
</template>

<script>
import TopNavigation from './navigation/Top.vue'
import Map from './maps/Map.vue'

export default {
  components: {
    navigation: TopNavigation,
    myMap: Map
  }
}
</script>
