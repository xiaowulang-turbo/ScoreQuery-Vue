<script setup>
import { ref, computed } from 'vue'
import HelloWorld from './views/HelloWorld.vue'
import Login from './views/Login.vue'
import Home from './views/AdminHome.vue'
import NotFound from './views/NotFound.vue'

// const routes = {
//   // '/': Home,
//   '/login': Login,
//   '/home': Home,
// }
// const currentPath = ref(window.location.hash)
// window.addEventListener('hashchange', () => {
//   currentPath.value = window.location.hash
// })
// const currentView = computed(() => {
//   return routes[currentPath.value.slice(1) || '/'] || NotFound
// })
</script>

<template>
  <router-view />
  <!-- <Home></Home> -->
  <!-- <component :is="currentView" /> -->
  <!-- <Login></Login> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
