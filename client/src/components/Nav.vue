<script setup>
import { RouterLink } from 'vue-router'
import DarkMode from './DarkMode.vue';
import { useStore } from 'vuex';

const store = useStore(); 
</script>

<template>
  <header>
    <nav class="nav-container-horizontal gap-xl poppins-bold text-uppercase">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login" v-if="!store.state.isAuthenticated">Login</RouterLink>
      <RouterLink to="/" v-else @click="store.commit('logout')">Logout</RouterLink>
    <DarkMode />
    </nav>
  </header>
</template>

<style scoped>
  nav {
    position: fixed;
    z-index: 2000;
  }
  .nav-container-horizontal {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: 0.2s;
  }
  nav a {
    position: relative;
    transition: 0.2s;
  }
  nav a:hover {
    color: var(--color-theme-1);
  }
  nav a::after {
    content: "";
    position: absolute;
    height: 2px; width: 0; bottom: 0; left: 0;
    background-color: var(--color-theme-1);
    transition: all 0.2s ease;
  }
  nav a:hover::after {
    width: 100%;
    color: var(--color-theme-1);
  }
</style>
