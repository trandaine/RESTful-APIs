<template>
  <div>
    <Navbar />
    <div>
      <h1>Edit Word</h1>
      <word-form @createOrUpdate="createOrUpdate" :word="this.word"></word-form>
    </div>
  </div>
</template> 

<script>
import WordForm from '../components/WordForm.vue';
import { api } from '../helpers/helper.js';
import Navbar from '../components/Navbar.vue';

export default {
  name: 'edit',
  components: {
    'word-form': WordForm,
    Navbar
  },
  data: function() {
    return {
      word: {}
    };
  },
  async mounted() {
    this.word = await api.getWord(this.$route.params.id);
  },
  methods: {
  createOrUpdate: async function(word) {
    await api.updateWord(word);
    alert('Word updated successfully!');
    this.$router.push(`/words/${word._id}`);
        }
    }
};
</script>
