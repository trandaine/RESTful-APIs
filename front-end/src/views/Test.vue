<template>
  <div id="app">
    <Navbar />
    <div class="ui text container">
      <div class="ui one column grid">
        <div class="column">
          <h1>Test</h1>

          <div v-if="words.length < 5">
            <p>You need to enter at least five words to begin the test</p>
          </div>
          <div v-else>
            <vocab-test :words="words"></vocab-test>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../helpers/helper.js";
import VocabTest from "../components/VocabTest.vue";
import Navbar from "../components/Navbar.vue";

export default {
  name: "test",
  components: {
    "vocab-test": VocabTest,
    Navbar,
  },
  data() {
    return {
      words: [],
    };
  },
  async mounted() {
    this.words = await api.getWords();
  },
};
</script>
