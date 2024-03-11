<script setup>
import Card from '@/components/Card.vue';
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import UserService from '../service/UserService';
import PassService from '../service/PassService';

// user item
// Got userId from route
const route = useRoute()
const userId = ref(route.params.id)
const user = ref(null);
const userName = ref('')

const search = ref("")
const showModal = ref(false)

// pass item
const passItems = ref([]);

const result = ref({});
const createdPass = ref({
  accountName: '',
  userName: '',
  password: '',
  user: ''
})

const fetchUserDetails = async () => {
  try {
    // REFRESH ARRAY 
    passItems.value = [];

    // GET USER ITEM
    const userResponse = await UserService.getUserById(userId.value)
    user.value = userResponse.data
    userName.value = userResponse.data.firstName;

    // Set the user property of createdPass here
    createdPass.value.user = userId.value

    // GET PASS ITEM
    const passIds = userResponse.data.pass;

    for (const passId of passIds) {
      const passResponse = await PassService.getPassById(passId, userId.value);
      const pass = passResponse.data;
      const passItem = pass.pass
 

      // Check if pass data is not empty before pushing to passItems
      if (passItem) {
        passItems.value.push(passItem);
      } else {
        console.warn(`Pass with ID ${passId} not found`);
      }
    }
  }
  catch(error) {
    console.error('Error fetching user details', error)
  }
}

const addPass = async () => {
  try {
    const response = await PassService.createPass(userId.value, createdPass.value);
    console.log(response)

    if (response.status === 200) {
      alert("Success");
      showModal.value = false;
      window.location.reload();
    }
    else {
      alert("Error adding pass");
    }

  } 
  catch (error) {
    console.error('Error adding pass', error);
    alert("Error adding pass");
  }
};

const deletePass = async (passId, userId) => {
  try {
    const response = await PassService.deletePassById(passId, userId);
    if (response.status) {
      alert("Pass entry deleted successfully");
      window.location.reload();
    } 
    else {
      alert("Error deleting pass entry");
    }
  } catch (error) {
    console.error('Error deleting pass entry', error);
    alert("Error deleting pass entry");
  }
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

watch(search, () => {
  if (search.value === '') {
    fetchUserDetails();
  } else {
    passItems.value = passItems.value.filter(pass => pass.accountName.toLowerCase().includes(search.value.toLowerCase()));
  }
});

onMounted(() => {
  fetchUserDetails();
})
</script>

<template>
  <div class="container">
    <header>
      <h1>Hi, {{ capitalizeFirstLetter(userName) }}</h1>
      <input v-model.trim="search" type="text" placeholder="Search...">
    </header>
      <main>
        <div class="card-container">
          <Card v-for="pass in passItems"
           :key="pass.id"
           :pass="pass" 
           :userId="userId" 
           @dblclick="deletePass(pass._id, userId)"
          />
          <div class="overlay" :style="{ visibility: showModal ? 'visible' : 'hidden', opacity: showModal ? '1' : '0' }" v-show="showModal">            
            <div class="modal" v-show="showModal">
              <h3>Add Account</h3>
              <br>
              <input type="text" class="form-control" placeholder="Account Name..." v-model="createdPass.accountName">
              <input type="text" class="form-control" placeholder="Username..." v-model="createdPass.userName" >
              <input type="password" class="form-control" placeholder="Password..." v-model="createdPass.password" >
              <button class="button" @click="addPass">Add Pass Entry</button>
            </div>
          </div>
        </div>
      </main>
  </div>
  <button class="rounded-button" @click="showModal = !showModal">
    <b>{{ showModal ? '-' : '+' }}</b>
  </button>
</template>

<style scoped>
  .container {
    position: relative;
    margin: 0 auto;
    width: 1024px;
    height: auto;
  }
  header {
    border-bottom: 1px solid var(--el-divider-dark-2);
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    margin-top: 40px;
    padding: 6px 3em;
  }
  header input {
    border: none;
    background-color: rgba(128, 128, 128, 0.15);
    padding: 10px;
    margin-left: 100px;
    border-radius: 15px;
  }
  main {
    /* position: relative; */
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    height: fit-content;
    gap: 1em;
    margin-top: 20px;
    justify-content: center;
    margin-bottom: 20px;
  }
  .overlay {
    transition: opacity 0.5s linear;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw; 
    height: 100vh; 
    background-color: rgba(0, 0, 0, 0.5); 
    z-index: 1000; 
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden; /* Initially hidden */
    opacity: 0;
    transition: opacity 0.5s, visibility 0.5s;
  }
  .form-control {
    margin-bottom: 10px;
  }
  .modal {
    position: relative;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    height: 50%;
    width: 350px;
    z-index: 2;
    background-color: white;
    border-radius: 10px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    z-index: 1001;
  }
  .modal button {
    color: white;
    cursor: pointer;
    margin-top: 15px;
  }
  .rounded-button {
    position: fixed;
    bottom: 5%;
    left: 5%;
    font-size: 29px;
    width: 75px;
    height: 75px;
    border: none;
    border-radius: 100%;
    z-index: 10003;
    background-color: var(--color-scheme-3);
    color: var(--vt-c-white);
    transition: 0.4s all;
  }
  .button {
    background-color: var(--color-scheme-3);
    color: var(--vt-c-white);
  }
  .rounded-button:hover {
    transform: scale(1.1);
  }
</style>