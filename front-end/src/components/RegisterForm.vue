<template>
    <div class="container">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Register</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async register() {
        try {
          const response = await fetch('/user/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password
            })
          });
  
          if (response.ok) {
            // Registration successful
            this.errorMessage = '';
            // Redirect or handle successful registration
            this.$router.push('/login'); 
          } else {
            const data = await response.json();
            this.errorMessage = data.message;
          }
        } catch (error) {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred';
        }
      }
    }
  };
  </script>