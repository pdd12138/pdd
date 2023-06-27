<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Aside from './components/Aside.vue'

export default{
  name: 'App',
  components: {

    Aside
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  list-style: none;
}

</style>
