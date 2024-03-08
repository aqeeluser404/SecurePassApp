<template>
    <div class="form-container">
        <form @submit.prevent="submitForm">
            <h2 class="form-heading">Contact us</h2>
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="formData.name">
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="formData.email">
            </div>
            <!-- Add more form fields here -->
            <button type="submit" class="submit-button">Submit</button>
        </form>
    </div>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  
  interface FormData {
    name: string;
    email: string;
    // Add more form fields here
  }
  
  const formData = ref<FormData>({
    name: '',
    email: '',
    // Initialize more form fields
  });
  
  const submitForm = () => {
    // Handle form submission logic here
    console.log('Form submitted with data:', formData.value);
    // Optionally, you can reset the form fields after submission
    resetForm();
  };
  
  const resetForm = () => {
    // Reset form fields
    formData.value.name = '';
    formData.value.email = '';
    // Reset more form fields
  };
</script>

<style scoped>
    .form-heading {
        margin-bottom: var(--space-md);
    }
    /* Footer container styles */
    .footer-container {
        max-width: var(--normal-container-width-desktop);
        max-width: 400px; 
        margin: 0 auto;
        padding: var(--space-md); 
    }
    @media screen and (max-width: var(--mobile-breakpoint)) {
        .footer-container {
            padding: var(--space-sm); 
        }
    }
    .form-group {
        margin-bottom: var(--space-md);
    }
    label {
        display: block;
        font-weight: bold;
    }
    .input-field {
        width: 100%;
        padding: var(--space-sm);
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }
    .submit-button {
        background-color: var(--color-theme-1);
        color: white;
        padding: var(--space-sm) var(--space-md);
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: 0.5s ease-in-out;
    }
    .submit-button:hover {
        background-color: var(--color-theme-2);
    }
</style>
  