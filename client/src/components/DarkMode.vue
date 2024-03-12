<template>
    <div @click="toggleDarkMode" :class="{ 'dark-mode': darkMode }">
      {{ darkMode ? '☀️' : '🌙' }}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        darkMode: false,
      };
    },
    methods: {
      toggleDarkMode() {
        this.darkMode = !this.darkMode;
        if (this.darkMode) {
          // DARK MODE
          document.documentElement.style.setProperty('--color-background', 'var(--color-black)');
          document.documentElement.style.setProperty('--color-text', 'var(--color-white)');
          document.documentElement.style.setProperty('--color-container-background', 'var(--color-black-muted)');
        } else {
          // LIGHT MODE
          document.documentElement.style.setProperty('--color-background', 'var(--color-white-muted)');
          document.documentElement.style.setProperty('--color-text', '#333333');
          document.documentElement.style.setProperty('--color-container-background', 'var(--color-white-muted)');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  div {
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  div.dark-mode {
    color: var(--color-white);
  }
  
  div:not(.dark-mode) {
    color: var(--color-black);
  }
  </style>
  