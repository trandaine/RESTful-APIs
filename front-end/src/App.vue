<template>
  <!-- <div id="app">
    <Navbar />
    <div class="ui text container">
      <div class="ui one column grid">
        <div class="column">
          <router-view />
        </div>
      </div>
    </div>
  </div> -->
  <router-view />
</template>

<script>
import Navbar from './components/Navbar.vue';
import router from './router';

export default {
  name: 'app',
  components: {
    Navbar
  }
};
</script>

<style>
#app > div.navbar {
  margin-bottom: 1.5em;
}
.myFlash {
  width: 250px;
  margin: 10px;
  position: absolute;
  top: 50;
  right: 0;
}
input {
  width: 300px;
}
div.label {
  width: 120px;
}
div.input {
  margin-bottom: 10px;
}
button.ui.button {
  margin-top: 15px;
  display: block;
}

/* Content-box for the form */
.content-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-family: 'Open Sans', sans-serif;
  background-color: #101d14;
}

/* Form Box */
.form-box {
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.623);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

/* Form Header */
.form-header h1 {
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
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
  color: #374151;
  font-weight: bold;
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
  border-color: #21BA45;
  box-shadow: 0 0 3px rgba(37, 235, 63, 0.5);
}

.error-message {
  font-size: 0.9rem;
  color: #ef4444;
  margin-bottom: 1rem;
}

button {
  width: 100%;
  padding: 0.7rem;
  background-color: #4aff8f;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #21BA45;
}

.login-link {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.login-link a {
  color: #2563eb;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>