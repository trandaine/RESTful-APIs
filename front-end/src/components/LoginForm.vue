<template>
    <div class="container">
      <div class="form-box">
        <h1>Login</h1>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email"  id="email" placeholder="name@email.com" v-model="email" required/>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" placeholder="••••••••" v-model="password" required/>
          </div>
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <button type="submit">Login</button>
          <p>Don't have an account? <router-link to="/register">Register</router-link></p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
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
          const response = await fetch('/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              email: this.email, 
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

<style>
/* General Styles */
body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    background-color: #60a5fa !important;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Container */
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

/* Form Title */
.form-box h1 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    color: #111827;
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
    color: #374151;
    font-weight: bold; /* Makes labels bold */
}

.form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 5px;
    font-size: 1rem;
    color: #374151;
    outline: none;
    box-sizing: border-box;
}

.form-group input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 3px rgba(37, 99, 235, 0.5);
}

/* Error Message */
.error {
    font-size: 0.9rem;
    color: #b91c1c;
    margin-bottom: 1rem;
}

/* Button */
button {
    width: 100%;
    padding: 0.7rem;
    background-color: #2563eb;
    color: #fff;
    font-size: 1rem;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #1e3a8a;
}

/* Sign Up Text */
.signup {
    margin-top: 1rem;
    font-size: 0.9rem;
    color: #6b7280;
}

.signup a {
    color: #2563eb;
    text-decoration: none;
}

.signup a:hover {
    text-decoration: underline;
}
</style>