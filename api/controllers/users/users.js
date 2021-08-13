const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user/user");

// signup
exports.user_signup = (req, response, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return response.status(409).json({
                    message: "Mail already exists. Please login!"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return response.status(500).json({
                            message: "Unknown error! Please try again",
                            error: err
                        });
                    } else {

                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            name: req.body.name,
                            gender: req.body.gender
                        });

                        // creating user in db
                        user.save()
                            .then(result => {
                                return response.status(201).json({
                                    message: "Signup successful !"
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
                });
            }
        });

}

// login
exports.user_login = (req, response, next) => {

    // console.log("HI++++++++++++++++++++++++++++++++++=",process.env.JWT_KEY);

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return response.status(401).json({
                    message: "User not found! Please register"
                });
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Authentication failed. Please try again"
                        });
                    }
                    if (result) {
                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                gender: user[0].gender
                            },
                            process.env.JWT_KEY,
                            {
                                expiresIn: "2h"
                            }
                        );
                        return response.status(200).json({
                            message: "Login successful",
                            auth: token,
                            email: user[0].email,                          
                            name: user[0].name,
                            gender: user[0].gender
                        });
                    }
                    response.status(401).json({
                        message: "Email or password is incorrect"
                    });
                });
            }
        });

}

// patch 
exports.user_update = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    const prohobited = ['_id', 'email', 'password', 'username', 'gender', 'loyalitypoints', 'numberoforders', 'cart', 'whishlist', 'compare', 'pendingorders', 'orderhistory', 'promocodeorgiftvouchers'];
    for (const ops of req.body) {
        if (prohobited.indexOf(ops.propName) !== -1) {
            res.status(500).json({ error: "Unauthorized" });
        } else {
            updateOps[ops.propName] = ops.value;
        }
    }
    User.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}