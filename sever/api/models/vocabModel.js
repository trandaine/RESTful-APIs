const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VocabSchema = new Schema(
    {
        english: {
            type: String,
            required: 'English word is required'
        },
        german: {
            type: String,
            required: 'German word is required'
        },
    },
    { collection: 'vocab' }
);

module.exports = mongoose.model('Vocab', VocabSchema);



// const TaskSchema = new Schema({
//     name: {
//         type: String,
//         required: 'Kindly enter the name of the task'
//     },
//     Created_date: {
//         type: Date,
//         default: Date.now
//     },
//     status: {
//         type: [{
//             type: String,
//             enum: ['pending', 'ongoing', 'completed']
//         }],
//         default: ['pending']
//     }
// });

// module.exports = mongoose.model('Tasks', TaskSchema);