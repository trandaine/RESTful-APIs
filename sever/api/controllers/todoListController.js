const mongoose = require('mongoose'),
    Tasks = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
    Tasks.find({}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task); 
    });
};

exports.create_a_task = function(req, res) {
    const new_task = new Tasks(req.body);
    new_task.save(function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.read_a_task = function(req, res) {
    Tasks.findById(req.params.taskId, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.update_a_task = function(req, res) {
    Tasks.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};

exports.delete_a_task = function(req, res) {
    Tasks.remove({
        _id: req.params.taskId
    }, function(err, task) {
        if (err)
            req.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};

