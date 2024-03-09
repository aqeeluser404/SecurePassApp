<template>
    <div class="form-container flex-row border-radius-sm">
        <div class="text-container">
            <h1>Lorem ipsum dolor sit.</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, saepe?</p>
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
            <p class="text-decoration-underline font-size-responsive-xs">Already have an account?</p>
        </form>
    </div>
</template>
  
<script setup>
    import UserService from '../service/service.js';
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
</script>

<style scoped>
    .text-container {
        width: var(--dynamic-container-width-desktop);
        max-width: 400px;
        height: 100%;
        background-color: var(--color-theme-1);
    }
</style>
  