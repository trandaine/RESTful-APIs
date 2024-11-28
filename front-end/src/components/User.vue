<template>
    <div>
      <h2>Account center</h2>
      <button @click="logout">Logout</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      async logout() {
        try {
          const response = await fetch('/user/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          });
  
          if (response.ok) {
            // Logout successful
            this.$router.push('/login'); // Redirect to login page
          } else {
            // Handle logout error, if any
            console.error('Logout failed');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  </script>