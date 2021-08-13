const meleUser = require("../../models/male/maleuser");
const femaleUser = require("../../models/female/femaleuser");
const { GENDER } = require('../../../role-data');

function viewSingleOrderHistory(adminRole, customerGender) {

    return (req, res, next) => {

        if ((req.userData ? req.userData.role : "noRole" === adminRole) && (req.userData.status === true)) {
            next();
        } else {

            const orderId = req.params.orderId;

            if (customerGender === GENDER.MALE) {

                meleUser.findById(req.userData ? req.userData.userId : "err")
                    .select("orderhistory")
                    .exec()
                    .then(doc => {

                        let orders = doc.orderhistory ? doc.orderhistory : [];
                        let authorization = false;

                        orders.forEach(order => {
                            if (order === orderId) {
                                authorization = true;
                                next();
                            }
                        });

                        if (authorization !== true) {
                            return res.status(401).json({
                                message: 'Unauthorised!'
                            });
                        }

                    })
                    .catch(err => {
                        console.log(err);
                        res.status(501).json({ error: err });
                    });

            }

            if (customerGender === GENDER.FEMALE) {

                femaleUser.findById(req.userData ? req.userData.userId : "err")
                    .select("orderhistory")
                    .exec()
                    .then(doc => {

                        let orders = doc.orderhistory ? doc.orderhistory : [];
                        let authorization = false;

                        orders.forEach(order => {
                            if (order === orderId) {
                                authorization = true;
                                next();
                            }
                        });

                        if (authorization !== true) {
                            return res.status(401).json({
                                message: 'Unauthorised!'
                            });
                        }

                    })
                    .catch(err => {
                        console.log(err);
                        res.status(501).json({ error: err });
                    });

            }

        }
    }
}

module.exports = { viewSingleOrderHistory }