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
            this.$router.push('/login');
          }
          else 
          {
            console.error('Logout failed');
          }
        } 
        catch (error) 
        {
          console.error('Error:', error);
        }
      }
    }
  };
  </script>