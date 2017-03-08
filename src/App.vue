<template>
<div id='app'>

  <md-toolbar class="md-accent md-dense">
    <md-button class="md-icon-button">
      <md-icon>menu</md-icon>
    </md-button>
    <h2 class="md-title" style="flex: 1">
      Cover Famous
    </h2>
    <md-button class="md-icon-button">
      <md-icon>favorite</md-icon>
    </md-button>
  </md-toolbar>

  <router-view></router-view>

</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      // first_name: 'David',
      // last_name: 'Nguyen'
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
