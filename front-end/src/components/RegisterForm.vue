<template>
    <div class="content-box">
      <div class="form-box">
        <div class="form-header">
          <h1>Register</h1>
        </div>
        <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Username:</label>
          <input type="text" id="username" placeholder="Trần Quang Đại" v-model="username" required/>
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email"  id="email" placeholder="name@email.com" v-model="email" required/>
          </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" placeholder="••••••••" v-model="password" required>
        </div>
        <!-- <button type="submit">Register</button> -->
        <button class="positive ui button fluid" type="submit" >Register</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
      </form>
      </div>
    </div>
  </template>
  
  
<script>
import { api } from '../helpers/helper.js';

  export default {
    data() {
      return {
        username: '',
        email: '',
        password: '',
        errorMessage: ''
      };
    },
    methods: {
      async register() {
      try {
        const user = {
          username: this.username,
          email: this.email,
          password: this.password
        };
        const response = await api.createUser(user);
        if (response) {
          this.errorMessage = '';
          // Redirect or handle successful registration
          this.$router.push('/login'); 
        } else {
          this.errorMessage = 'Registration failed';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = error.response ? error.response.data.message : 'An error occurred';
      }
    }
    }
  };
</script>