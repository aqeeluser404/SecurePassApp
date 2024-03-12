<template>
    <div class="form-container default-color-white flex-row border-radius-lg">
        <div class="text-container">
            <h1 class="default-color-white text-decoration-underline">Sign up free!</h1>
            <br>
            <p class="default-color-white font-size-md">Safeguard your digital world with Secure Pass. Enjoy effortless management and lightning-fast access to your passwords, ensuring your online presence stays safe and secure. Join us now for worry-free browsing!</p>
        </div>
        <form class="p-xl" @submit.prevent="saveData">
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
    const checkDuplicateUser = UserService.checkDuplicateUser;

    const saveData = async () => {
        try {
            const token = await grecaptcha.execute('6LfGy5UpAAAAAFpzQ8Qg-ctMJl5x-ZW9yMLHwseP');
            console.log('reCAPTCHA token:', token);
            // Check if the email already exists in the database
            const emailExists = await checkDuplicateUser('email', user.value.email);
            if (emailExists) {
                alert("Email already exists. Please use a different email.");
                return;
            }

            // Check if the password already exists in the database
            const passwordExists = await checkDuplicateUser('password', user.value.password);
            if (passwordExists) {
                alert("Password already exists. Please use a different password.");
                return;
            }

            // Validate password complexity
            if (!isPasswordComplex(user.value.password)) {
                alert("Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.");
                return;
            }

            // If email, password, and complexity requirements are met, proceed with user registration
            const response = await register(user.value, token);
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

    const isPasswordComplex = (password) => {
        // Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const numberRegex = /[0-9]/;
        const symbolRegex = /[$&+,:;=?@#|'<>.^*()%!-]/;
        
        return (
            uppercaseRegex.test(password) &&
            lowercaseRegex.test(password) &&
            numberRegex.test(password) &&
            symbolRegex.test(password)
        );
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
        border-radius: var(--space-lg) 0 0 var(--space-lg);
    }
    @media screen and (max-width: 768px) {
        .text-container {
            border-radius: var(--space-lg) var(--space-lg) 0 0;
        }
    }
</style>