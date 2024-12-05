<template>
    <div id="app">
      <Navbar />
      <div class="ui text container">
        <div class="ui one column grid">
          <div class="column">
            <h1>Translate Text</h1>
            <div class="translate-app ui container">
              <div class="ui labeled input fluid">
                <div class="ui label">
                  <i></i> Text
                </div>
                <input
                  type="text"
                  placeholder="Enter word..."
                  v-model="text"
                  class="ui input"
                />
              </div>
  
              <div class="ui labeled input fluid">
                <div class="ui label">
                  <i></i> Translation
                </div>
                <select v-model="targetLanguage" class="ui dropdown fluid">
                  <option value="en-de">English to German</option>
                  <option value="de-en">German to English</option>
                  <option value="en-es">English to Spanish</option>
                  <option value="es-en">Spanish to English</option>
                </select>
              </div>
  
              <button class="positive ui button" @click="translateText" :disabled="loading">Translate</button>

              <div v-if="loading" class="ui active inline loader"></div>
  
              <div v-if="translatedText" class="ui message">
                <h3 class="ui header">Translated Text:</h3>
                <p>{{ translatedText }}</p>
              </div>
  
              <div v-if="error" class="ui error message">
                <p>{{ error }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
  import axios from "axios";
  import Navbar from "../components/Navbar.vue";

  export default {
    components: {
      Navbar,
    },
    data() {
      return {
        text: "",
        targetLanguage: "en-de",
        translatedText: "",
        error: null,
        loading: false,
      };
    },
    methods: {
      async translateText() {
        if (!this.text.trim()) {
          this.error = "Please enter some text to translate.";
          return;
        }

        this.loading = true;
        this.error = null;
        this.translatedText = "";

        try {
          const response = await axios.post('http://localhost:3000/translate-api/translate', {
            text: this.text,
            targetLanguage: this.targetLanguage,
          });

          if (response.data.translatedText) {
            this.translatedText = response.data.translatedText;
          } else {
            this.error = "No translation found!";
          }
        } catch (err) {
          console.error("Error:", err);
          this.error = "Failed to fetch translation. Please try again later.";
        } finally {
          this.loading = false;
        }
      },
    },
  };
</script>
