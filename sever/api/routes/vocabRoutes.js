module.exports = function(app) {
    const vocab_builder = require('../controllers/vocabController');

    app.route('/words')
        .get(vocab_builder.list_all_words)
        .post(vocab_builder.create_a_word);

    app.route('/words/:wordId')
        .get(vocab_builder.read_a_word)
        .put(vocab_builder.update_a_word)
        .delete(vocab_builder.delete_a_word);
};