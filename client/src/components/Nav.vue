<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <nav class="nav-container-horizontal gap-xl poppins-bold text-uppercase">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
  nav {
    position: absolute;
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
