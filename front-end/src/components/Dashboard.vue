<template>
  <div id="app">
    <Navbar />
    <div class="ui text container">
      <div class="ui one column grid">
        <div class="column">
          <h1>User Center</h1>
          <p>Hello, {{ user.username }}</p>
          <p>My mail is {{ user.email }}</p>
          <button class="positive ui button" @click="logout">Logout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from '../helpers/helper.js';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'dashboard',
  components: {
    Navbar
  },
  data() {
    return {
      user: {}
    };
  },
  async created() {
    try {
      // Fetch user data from the server
      const response = await api.getUser(); // Assuming you have a getUser method to fetch user data
      this.user = response.user;
    } catch (error) {
      console.error('Error fetching user data:', error);
      if (error.response && error.response.status === 401) {
        this.$router.push('/login'); // Redirect to login if unauthorized
      }
    }
  },
  methods: {
    async logout() {
      try {
        await api.logoutUser();
        // Redirect to login page after successful logout
        this.$router.push('/login');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  }
};
</script>