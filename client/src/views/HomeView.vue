<template>
  <main>
    <div class="dynamic-container flex-row-start">
      <div class="text-container flex-column-start">
        <h1 class="font-size-responsive-giant text-uppercase sm-line-height">Fast and Secure</h1>
        <p class="font-size-responsive-sm">
          Are you tired of jotting down your passwords? <br> 
          And then to find yourself losing track of them? <br> 
          Discover the simplicity and security of our password vault solution.
        </p>
        <button class="button">Get Started</button>
      </div>
      <!-- Absolute Hero Image -->
      <img 
        class="absolute-img" 
        src="https://cdn.dribbble.com/userupload/10952412/file/original-bf746e8a90e65508ed06ea409a578a6c.png?resize=1024x1024" 
        alt="lock-image"
      >
    </div>
    <div class="dynamic-container flex-column">
      <Form />
    </div>
    <!-- footer component -->
    <Footer />
  </main>
</template>

<script setup>
  import Form from '@/components/Form.vue'
  import Footer from '@/components/Footer.vue';
</script>

<style scoped>
  .absolute-img {
    position: absolute;
    top: 1;
    right: 0;
    max-width: 650px;
    z-index: -1;
    height: auto;
    opacity: 1; 
    transition: opacity 1s ease-in-out; 
  }
  @media screen and (max-width: 768px) {
    .absolute-img {
      opacity: 0.2;
    }
  }
  .dynamic-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .flex-column-start {
    gap: var(--space-lg);
  }
</style>