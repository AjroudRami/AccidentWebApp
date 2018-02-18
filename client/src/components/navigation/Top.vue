<template>
  <b-navbar toggleable="md">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">Ma carte</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item>Accidents</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">

        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profil</b-dropdown-item>
          <b-dropdown-item href="#">Se déconnecter</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>
