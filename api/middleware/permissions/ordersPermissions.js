const meleUser = require("../../models/male/maleuser");
const femaleUser = require("../../models/female/femaleuser");
const { GENDER } = require('../../../role-data');

function viewSingleOrder(adminRole, customerGender) {

    return (req, res, next) => {

        if ((req.userData ? req.userData.role : "noRole" === adminRole) && (req.userData.status === true)) {
            next();
        } else {

            const orderId = req.params.orderId;
            const userid = req.userData ? req.userData.userId : "err";

            if (customerGender === GENDER.MALE) {

                meleUser.findById(userid)
                    .select("pendingorders")
                    .exec()
                    .then(doc => {

                        let orders = doc.pendingorders ? doc.pendingorders : [];
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

                    }).catch(err => {
                        return res.status(501).json({ error: err });
                    });

            }

            if (customerGender === GENDER.FEMALE) {

                femaleUser.findById(req.userData ? req.userData.userId : "err")
                    .select("pendingorders")
                    .exec()
                    .then(doc => {

                        let orders = doc.pendingorders ? doc.pendingorders : [];
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

                    }).catch(err => {
                        return res.status(501).json({ error: err });
                    });

            }


        }
    }
}

module.exports = { viewSingleOrder }