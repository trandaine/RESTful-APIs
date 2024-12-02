<template>
    <div id="app">
        <div class="ui container" style="margin-top: 50px; text-align: center;">
        <h2>Google Translate with Vue 2.x and Semantic UI</h2>
        
        <div class="ui form">
            <div class="field">
            <label>Text to Translate</label>
            <input 
                type="text" 
                v-model="textToTranslate" 
                placeholder="Enter text here" 
                class="ui input"
            />
            </div>
            <button class="ui primary button" @click="translateText">Translate</button>
        </div>

        <div v-if="translatedText" class="ui segment">
            <h3>Translated Text:</h3>
            <p>{{ translatedText }}</p>
        </div>

        <div v-if="errorMessage" class="ui red message">
            <p>{{ errorMessage }}</p>
        </div>
        </div>
    </div>
</template>
  
<!-- <script>
    import axios from 'axios';

    export default {
    name: 'App',
    data() {
        return {
        textToTranslate: '',
        translatedText: null,
        errorMessage: null
        };
    },
    methods: {
        async translateText() {
        try {
            const apiKey = 'YOUR_GOOGLE_API_KEY'; // Replace with your API key
            const targetLanguage = 'es'; // Target language (e.g., 'es' for Spanish)

            const response = await axios.post(
            `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
            {
                q: this.textToTranslate,
                target: targetLanguage
            }
            );

            this.translatedText = response.data.data.translations[0].translatedText;
            this.errorMessage = null;
        } catch (error) {
            this.errorMessage = 'Error translating text. Please try again.';
            this.translatedText = null;
        }
        }
    }
    };
</script> -->