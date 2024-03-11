<template>
    <div class="form-container flex-row border-radius-lg">
        <div class="text-container">
            <h1 class="default-color-white text-decoration-underline">Sign up free!</h1>
            <br>
            <p class="default-color-white font-size-md">Safeguard your digital world with Secure Pass. Enjoy effortless management and lightning-fast access to your passwords, ensuring your online presence stays safe and secure. Join us now for worry-free browsing!</p>
        </div>
        <form class="p-xl" @submit.prevent="saveData">
            <!-- <h2 class="form-heading font-size-responsive-xl">Register</h2> -->
            <div class="form-group">
                <label>First Name:</label>
                <input type="text" class="form-control" v-model="user.firstname">
            </div>
            <div class="form-group">
                <label>Last Name:</label>
                <input type="text" class="form-control" v-model="user.lastname">
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" class="form-control" v-model="user.email">
            </div>
            <div class="form-group">
                <label>Password:</label>
                <input type="password" class="form-control" v-model="user.password">
            </div>
            <button type="submit" class="submit-button">Signup</button>
            <p class="text-decoration-underline font-size-responsive-xs" @click="GoToLogin">Already have an account?</p>
        </form>
    </div>
</template>
  
<script setup>
    import UserService from '../service/UserService.js';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const result = ref({});
    const user = ref({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });

    const register = UserService.createUser;

    const saveData = async () => {
        try {
            const response = await register(user.value);
            result.value = response;

            if (result.value.status) {
                setTimeout(() => {
                    alert("Saved")
                    router.push('/login');
                }, 1000); 
            }
        } 
        catch (error) {
            console.error('Error saving user data:', error);
        }
    };

    const GoToLogin = () => {
        router.push('/login');
    }
</script>

<style scoped>
    .text-container {
        text-align: center;
        padding: 1em 2em;
        width: var(--dynamic-container-width-desktop);
        max-width: 400px;
        height: 100%;
        background-color: var(--color-theme-1);
    }
</style>