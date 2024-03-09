<template>
  <main>
    <div class="dynamic-container flex-row-start">
      <div class="text-container flex-column-start">
        <h1 class="font-size-responsive-giant text-uppercase sm-line-height">Fast and Secure</h1>
        <p class="font-size-responsive-sm">Are you tired of jotting down your passwords? <br> And then to find yourself losing track of them? <br> Discover the simplicity and security of our password vault solution.</p>
        <button class="button">Get Started</button>
      </div>
    </div>
    <div class="dynamic-container flex-column">
      <Form />
    </div>
  </main>
</template>

<script setup>
  import Form from '@/components/Form.vue'
</script>

<style scoped>
  .dynamic-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .flex-column-start {
    gap: var(--space-lg);
  }
</style>