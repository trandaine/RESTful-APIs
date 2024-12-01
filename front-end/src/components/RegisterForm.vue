<template>
    <div class="container">
      <div class="form-box">
        <div class="form-header">
          <h1>Register</h1>
        </div>
        <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Username:</label>
          <input type="text" id="username" placeholder="Vũ Trần Quang Minh" v-model="username" required/>
        </div>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email"  id="email" placeholder="name@email.com" v-model="email" required/>
          </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" placeholder="••••••••" v-model="password" required>
        </div>
        <button type="submit">Register</button>
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


<!-- <style>
/* General styles */
body {
  margin: 0;
  padding: 0;
  font-family: 'Open Sans', sans-serif;
  background-color: #60a5fa; /* blue-400 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Container for the form */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

/* Form Box */
.form-box {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

/* Form Header */
.form-header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #111827; /* gray-900 */
  margin-bottom: 1rem;
}

/* Form Group */
.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #374151; /* gray-700 */
  font-weight: bold; /* Makes labels bold */
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 5px;
  font-size: 1rem;
  color: #374151; /* gray-700 */
  outline: none;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #2563eb; /* primary-600 */
  box-shadow: 0 0 3px rgba(37, 99, 235, 0.5);
}

/* Error Message */
.error-message {
  font-size: 0.9rem;
  color: #ef4444; /* red-400 */
  margin-bottom: 1rem;
}

/* Button */
button {
  width: 100%;
  padding: 0.7rem;
  background-color: #2563eb; /* blue-600 */
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #1e3a8a; /* dark blue */
}

/* Login Link */
.login-link {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #6b7280; /* gray-500 */
}

.login-link a {
  color: #2563eb; /* blue-600 */
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>
 -->
