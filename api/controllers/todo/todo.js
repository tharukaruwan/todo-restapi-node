const mongoose = require("mongoose");
const Todo = require("../../models/todo/todo");

// create to do
exports.todo_create = (req, response, next) => {

    const dateTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Colombo" });

    const todo = new Todo({
        _id: new mongoose.Types.ObjectId(),
        heading: req.body.heading,
        content: req.body.content,
        datetime: dateTime,
        userid: req.body.userid
    });

    // creating todo in db
    todo.save()
        .then(result => {
            return response.status(201).json({
                message: "Todo created successful!",
                todoID: todo._id
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).json({
                message: "Unknown error! Please try again",
                error: err
            });
        });

}

// get all to do
exports.todo_get_all = (req, res, next) => {
    Todo.find()
        // .select("_id heading content datetime userid")
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);

            // const activeproducts = docs.filter(product => product.active === true);
            // activeproducts.forEach((product, i) => {

            //     if (product.variation.length === 0) {
            //         product.variation = null;
            //     }

            // });
            // res.status(200).json(activeproducts);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// patch todo
exports.todo_update = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    const prohobited = ['_id', 'datetime', 'userid'];
    for (const ops of req.body) {
        if (prohobited.indexOf(ops.propName) !== -1) {
            res.status(500).json({ error: "Unauthorized" });
        } else {
            updateOps[ops.propName] = ops.value;
        }
    }
    Todo.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Update sucessful",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

// delete todo
exports.todo_delete = (req, res, next) => {
    const id = req.params.id;
    Todo.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Delete sucessful",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}