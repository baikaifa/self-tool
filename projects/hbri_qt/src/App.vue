<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    </keep-alive>
  </div>
</template>

<script>


export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0.8rem;
}
.mint-toast{
    border-radius:0.7rem;
    padding:0.1rem 0.3rem !important;
}
</style>
