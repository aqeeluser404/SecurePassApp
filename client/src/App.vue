<script setup>
import { RouterView } from 'vue-router'
import Nav from '@/components/Nav.vue'
</script>

<template>
  <Nav />
  <RouterView />
  <div class="img-container">
    <img src="https://cdn.dribbble.com/userupload/10952412/file/original-bf746e8a90e65508ed06ea409a578a6c.png?resize=1024x1024" alt="">
  </div>
</template>

<style>
  .img-container {
    position: fixed;
    top: 50%;
    left: 80%;
    z-index: -1;
    transform: translate(-50%, -50%);
  }
  .img-container img {
    width: 600px;
  }
</style>
