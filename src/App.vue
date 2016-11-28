<template>
  <div id="app">
    <Gnavbar></Gnavbar>
    <div v-if="appIsLoading">
      <Loading></Loading>
    </div>
    <div v-else>
      <div class="router-view-wrap">
        <router-view class="router-view"></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import Gnavbar from './components/Gnavbar'
import Loading from './components/Loading'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  computed: mapGetters({
    appIsLoading: 'appIsLoading'
  }),
  components: {
    Gnavbar,
    Loading
  },
  created () {
    this.$store.dispatch('appLoad')
  },
  methods: {
  }
}
</script>

<style>
body {
  min-height: inherit;
}
html{
  height: inherit;
  background: #e9e9e9;
}

#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*padding-bottom: 30px;*/
}

.container.router-view{
  padding-top: 60px;
}

.media{
  color: #6E6E6E;
}
</style>
