<template>
  <div id="app">
    <Navbar />
    <div class="ui text container">
    <div class="ui one column grid">
    <div class="column">
      <h1>New Word</h1>
      <word-form @createOrUpdate="createOrUpdate"></word-form>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helper.js';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'new-word',
  components: {
    'word-form': WordForm,
    Navbar
  },
  methods: {
    async createOrUpdate(word) {
      const res = await api.createWord(word);
      this.flash('Word created', 'success');
      this.$router.push(`/words/${res._id}`);
    },
    flash(message, type) {
      console.log(`${message}, ${type}`);
    }
  }
};
</script>
