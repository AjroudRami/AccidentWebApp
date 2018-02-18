<template>
  <div>
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavigation from './components/navigation/Top.vue'

export default {
  components: {
    navigation: TopNavigation
  }
}
</script>
