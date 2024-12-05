const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;
  const [sourceLang, targetLang] = targetLanguage.split('-');

  try {
    const response = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${process.env.GOOGLE_API_KEY}`,
      {
        q: text,
        source: sourceLang,
        target: targetLang,
      }
    );

    if (response.data.data && response.data.data.translations) {
      res.json({ translatedText: response.data.data.translations[0].translatedText });
    } else {
      res.status(400).json({ error: 'No translation found!' });
    }
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to fetch translation. Please try again later.' });
  }
});

module.exports = router;