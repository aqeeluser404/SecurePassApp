<template>
  <div class="card box-shadow-sm border-radius-lg">
    
    <img src="https://cdn-icons-png.freepik.com/512/3043/3043833.png" class="border-radius-lg lock-icon" alt="lock-icon">
    
    <div class="line-divider" />
    
    <div class="card-text">
      <h1 class="font-size-responsive-md text-uppercase default-color-text mb-md poppins-semibold">
        {{ pass.accountName }}
      </h1>

      <div class="card-row-container">
        <img :src="showUsername ? 'https://cdn.iconscout.com/icon/free/png-512/free-eye-514-457691.png?f=webp&w=256' : 'https://cdn.iconscout.com/icon/free/png-512/free-eye-484-434038.png?f=webp&w=256'" alt="#" @click="toggleUsernameVisibility">
        <img src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="#" @click="updateUsername">
        <input 
          type="text" 
          class="border-radius-sm" 
          v-model="usernameInput" 
          :placeholder="usernamePlaceholder"
        >
        <div v-show="showNotification" class="notification">Copied!</div>
      </div>

      <div class="card-row-container">
        <img :src="showPassword ? 'https://cdn.iconscout.com/icon/free/png-512/free-eye-514-457691.png?f=webp&w=256' : 'https://cdn.iconscout.com/icon/free/png-512/free-eye-484-434038.png?f=webp&w=256'" alt="#" @click="togglePasswordVisibility">
        <img src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="#" @click="updatePassword">
        <input 
          type="password" 
          class="border-radius-sm"  
          v-model="passwordInput"
          :placeholder="passwordPlaceholder" 
        >
      </div>
    </div>
  </div>
</template>
  
<script setup>
  import { defineProps, ref } from 'vue';
  import PassService from '../service/PassService';
  
  const props = defineProps({
    pass: Object,
    userId: [String] ,
  });
  
  const showUsername = ref(false);
  const showPassword = ref(false);
  const showNotification = ref(false);
  
  const usernameInput = ref('');
  const passwordInput = ref('');
  
  const usernamePlaceholder = ref('Username');
  const passwordPlaceholder = ref('Password');
  
  const updateUsername = async () => {
    const passDetails = {
      accountName: props.pass.accountName,
      userName: usernameInput.value,
      password: props.pass.password
    };
  
    try {
      const response = await PassService.updatePassById(
        props.pass._id,
        passDetails,
        props.userId
      );
  
      console.log(response);
  
      if (response.status) {
        alert("Username updated successfully");
        window.location.reload();
      } else {
        alert("Error updating username");
      }
    } catch (error) {
      console.error('Error updating username', error);
      alert("Error updating username");
    }
  };
  
  const updatePassword = async () => {
    const passDetails = {
      accountName: props.pass.accountName,
      userName: props.pass.userName,
      password: passwordInput.value
    };
  
    try {
      const response = await PassService.updatePassById(
        props.pass._id,
        passDetails,
        props.userId
      );
  
      console.log(response);
  
      if (response.status) {
        alert("Password updated successfully");
        window.location.reload();
      } else {
        alert("Error updating password");
      }
    } catch (error) {
      console.error('Error updating password', error);
      alert("Error updating password");
    }
  };
  const toggleUsernameVisibility = async () => {
    showUsername.value = !showUsername.value;
    if (showUsername.value) {
      usernamePlaceholder.value = props.pass.userName;
      await copyToClipboard(props.pass.userName);
    } 
    else {
      usernamePlaceholder.value = 'Username';
    }
  };
  
  const togglePasswordVisibility = async () => {
    showPassword.value = !showPassword.value;
    if (showPassword.value) {
      passwordPlaceholder.value = props.pass.password;
      await copyToClipboard(props.pass.password);
    } 
    else {
      passwordPlaceholder.value = 'Password';
    }
  };
  
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard:', text);
      showNotification.value = true;
      
      setTimeout(() => {
        showNotification.value = false;
      }, 2000); 
    } 
    catch (error) {
      console.error('Error copying text to clipboard:', error);
    }
  };
</script>

<style scoped>
  .card {
    width: 210px;
    overflow: hidden;
    cursor: pointer;
    transition: 0.4s all;
    transform: scale(1);
    padding: 0.5em;
    background-color: var(--color-container-background);
  }
  .card:hover {
    transform: scale(0.95);
  }
  .card img {
    width: 100%;
    margin: 0;
    padding: 15px 0;
  }
  .card .card-text {
    padding: 0 15px;
    line-height: 1;
  }
  .card-row-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.8em;
    max-width: 100%;
  }
  
  .card-row-container img { width: 20px;height: auto; }
  .card-row-container input { padding: 8px; border: 2px solid var(--color-theme-1); background-color: rgba(128, 128, 128, 0.15); width: 100%; }
  
  .notification {
    position: absolute;
    top: 69%;
    left: 23%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    z-index: 999;
  }
</style>