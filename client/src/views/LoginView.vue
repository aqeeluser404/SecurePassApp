<template>
  <!-- login container -->
    <div class="dynamic-container flex-column">
      <div class="form-container border-radius-lg">
        <form class="p-xl" @submit.prevent="loginData">
            <h2 class="form-heading font-size-responsive-xl">Sign in</h2>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" class="form-control" v-model="user.email">
            </div>
            <div class="form-group">
              <label>Password:</label>
              <div class="password-input">
                <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="user.password">
                <button @click="togglePasswordVisibility($event)" class="password-toggle-button">
                  <i v-if="showPassword" class="fa fa-eye"></i>
                  <i v-else class="fa fa-eye-slash"></i>
                </button>
              </div>
            </div>
            <div class="form-group">
              <button type="submit" class="submit-button">Login</button>
            </div>
        </form>
      </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import UserService from '@/service/UserService'

  export default {
    name : 'LoginView',
    data() {
      return {
        result: {},
        user: {
          email : "",
          password: ""
        },
        showPassword: false,
      }
    },
    methods: {
      refresh() {
        window.location.reload();
      },
      
      // LOGIN 
      loginData() {
        // const store = useStore();
        axios.post('http://localhost:5000/api/user/login', this.user)
        .then(
          ({data}) => {
            console.log(data.status);
            try {
              if (data.status === true) {
                

                // USERSERVICE TO GET USER BY EMAIL
                UserService.getUserByEmail(this.user.email)
                .then(response => {
                  const userId = response.data.user._id;
                  setTimeout(() => {
                    alert("Login Success");
                    this.$router.push(`/passdashview/${userId}`);
                  }, 1000); 
                })
                .catch(err => {
                  console.error(err);
                  alert("An error occurred while fetching user ID");
                });
              } 
              else {
                alert("Login failed")
              }
            }
            catch (err) {
              alert("An error occurred")
            }
          }
        )
      },
      togglePasswordVisibility(event) {
          event.preventDefault(); // Prevent the default behavior of the button click event
          this.showPassword = !this.showPassword;
      },
    }
  }
</script>

<style scoped>
  .password-input {
    position: relative;
  }

  .password-toggle-button {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
  }

  .fa {
    font-size: 1.2em;
    color: var(--color-black-muted);
  }
</style>