<template>
  <div id="app">
    <Navbar />
    <div class="ui text container">
    <div class="ui one column grid">
    <div class="column">
    <h1>Words</h1>
    <table id="words" class="ui celled compact table">
      <thead>
        <tr>
          <th>English</th>
          <th>German</th>
          <th>Spanish</th>
          <th colspan="4"></th>
        </tr>
      </thead>
      <tr v-for="(word, i) in words" :key="i">
        <td>{{ word.english }}</td>
        <td>{{ word.german }}</td>
        <td>{{ word.spanish }}</td>
        <td width="75" class="center aligned">
        <router-link :to="{ name: 'show', params: { id: word._id }}">Show</router-link></td>
        <td width="75" class="center aligned">
        <router-link :to="{ name: 'edit', params: { id: word._id }}">Edit</router-link></td>
        <td width="75" class="center aligned" @click.prevent="onDestroy(word._id)">
        <a :href="`/words/${word._id}`">Delete</a></td>
      </tr>
    </table>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import { api } from '../helpers/helper.js';

export default {
  name: 'words',
  components: {
    Navbar
  },
  data() {
    return {
      words: []
    };
  },
  methods: {
  async onDestroy(id) {
    const sure = window.confirm('Are you sure?');
    if (!sure) return;
    await api.deleteWord(id);
    this.flash('Word deleted successfully!', 'Type: success');
    const newWords = this.words.filter(word => word._id !== id);
    this.words = newWords;
    this.words = await api.getWords();
    },
    flash(message, type) {
      console.log(`${message}, ${type}`);
    }
  },
  async mounted() {
    this.words = await api.getWords();
  }
};
</script>
