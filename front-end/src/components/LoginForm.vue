<template>
  <div class="content-box">
    <div class="form-box">
      <div class="form-header">
        <h1>Login</h1>
      </div>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" placeholder="name@email.com" v-model="email" required/>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" placeholder="••••••••" v-model="password" required/>
        </div>
        <!-- <button type="submit">Login</button> -->
        <button class="positive ui button fluid" type="submit" >Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helper.js';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          email: this.email,
          password: this.password
        };
        const response = await api.loginUser(credentials);
        if (response) {
          // Login successful
          this.errorMessage = '';
          // Redirect or handle successful login
          this.$router.push('/words'); 
        } else {
          this.errorMessage = 'Login failed';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = error.response ? error.response.data.message : 'An error occurred';
      }
    }
  }
};
</script>