<template>
    <div class="container">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
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
      async login() {
        try {
          const response = await fetch('/user/login', {
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
            // Login successful
            this.errorMessage = '';
            // Redirect or handle successful login
            this.$router.push('/dashboard'); 
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