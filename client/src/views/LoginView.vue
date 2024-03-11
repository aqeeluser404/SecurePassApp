<template>
    <div class="dynamic-container flex-column">
      <div class="form-container border-radius-sm">
        <form class="p-xl" @submit.prevent="loginData">
            <h2 class="form-heading font-size-responsive-xl">Sign in</h2>
            <div class="form-group">
              <label>Email:</label>
              <input type="email" class="form-control" v-model="user.email">
            </div>
            <div class="form-group">
              <label>Password:</label>
              <input type="password" class="form-control" v-model="user.password">
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
        }
      }
    },
    created() {},
    mounted() {},
    methods: {
      refresh() {
        window.location.reload();
      },
      // LOGIN 
      loginData() {
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
                    // this.$router.push(`/passdashview/${userId}`);
                    this.$router.push('/');
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
    }
  }
</script>
  