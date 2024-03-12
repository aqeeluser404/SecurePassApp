<script setup>
  import Card from '@/components/Card.vue';
  import { ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import Footer from '../components/Footer.vue'
  import { useStore } from 'vuex';

  const store = useStore(); 


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
    // store.commit('toggleNavbar');
  })
</script>

<template>
  <main>
    <div class="dynamic-container flex-column">

      <div class="dash-header flex-row-start">
        <div>
          <h1 class="font-size-responsive-lg">Hi, 
          <span class="username">
            {{ capitalizeFirstLetter(userName) }}
          </span>
        </h1>
        <h1 class="font-size-responsive-xs text-uppercase">
          Secured: 
          <span class="username">
            {{ passItems.length }}
          </span>
        </h1>
        </div>

        <input v-model.trim="search" type="text" placeholder="Search...">
      </div>

      <div class="card-container">
        <Card v-for="pass in passItems"
          :key="pass.id"
          :pass="pass" 
          :userId="userId" 
          @dblclick="deletePass(pass._id, userId)"
        />

        <div class="text-container">
          <p v-if="passItems.length === 0" class="no-items-message">
            Click '+' to add. <br>
            Ensure you enter a new value before confirming update. <br>
            double click the card to delete. <br>
          </p>
        </div>

      </div>
      </div>

      <!-- elements -->
      <!-- modal -->
      <div class="overlay" :style="{ visibility: showModal ? 'visible' : 'hidden', opacity: showModal ? '1' : '0' }" v-show="showModal">            
        <div class="modal form-container border-radius-lg" v-show="showModal">
          <h3>Add Account</h3>
          <br>
          <div class="form-group">
            <label>Account Name:</label>
            <input type="text" class="form-control" v-model="createdPass.accountName">
          </div>
          <div class="form-group">
            <label>Username:</label>
            <input type="text" class="form-control" v-model="createdPass.userName" >
          </div>
          <div class="form-group">
            <label>Password:</label>
            <input type="password" class="form-control" v-model="createdPass.password" >
          </div>
          <div class="form-group">
            <button class="button" @click="addPass">Add Pass Entry</button>
          </div>
        </div>
    </div>

    <!-- button to show modal -->
    <button class="rounded-button" @click="showModal = !showModal">
      <b>{{ showModal ? '-' : '+' }}</b>
    </button>
  </main>
  <Footer />
</template>

<style scoped>
  .dynamic-container {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    min-height: 100vh;
    height: 100%;
  }
  .dash-header {
    border-bottom: 1px solid var(--el-divider-dark-2);
    max-width: 1200px;
    width: 100%;
    height: auto;
    margin-top: 40px;
    padding: 6px 3em;
  }
  .username {
    color: var(--color-theme-1);
  }
  .dash-header div {
    width: 100%;
  }
  .dash-header input {
    max-width: 180px;
    width: 100%;
    border: none;
    background-color: rgba(128, 128, 128, 0.15);
    padding: 10px;
    border-radius: 15px;
  }
  .card-container {
    display: flex;
    flex-wrap: wrap;
    height: fit-content;
    width: 100%;
    gap: 1em;
    margin-top: 20px;
    justify-content: center;
    margin-bottom: 20px;
  }
  .text-container {
    text-align: center;
  }
  /* overlay */
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
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.5s, visibility 0.5s;
  }
  @media screen and (max-width: 768px) {
    .overlay {
      background-color: rgb(0, 0, 0);
    }
  }
  .modal {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.5);
    padding: var(--space-xl);
    z-index: 1001;
  }
  .modal button {
    color: white;
    cursor: pointer;
    margin-top: 15px;
  }
  .rounded-button {
    position: fixed;
    bottom: 1%;
    left: 2%;
    z-index: 10003;
  }
</style>