<template>
  <b-navbar toggleable="md" style="background-color: lightslategray; box-shadow: 0px 5px 10px black;">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand><router-link to="/" style="color:white; font-size: x-large">Ma carte</router-link></b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>{{user.name}}</em>
          </template>
          <b-dropdown-item v-if="user.isAdmin" @click="user.changeUser('John', false)">Se connecter en tant que John</b-dropdown-item>
          <b-dropdown-item v-else @click="user.changeUser('Manager Bob', true)">Se connecter en tant qu'administrateur</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import user from '../../services/user'

export default {
  data: function () {
    return {
      user: user
    }
  }
}
</script>
