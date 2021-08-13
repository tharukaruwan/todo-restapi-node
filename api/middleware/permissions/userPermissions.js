function userPermission(adminRole) {

    return (req, res, next) => {

        if ((req.userData ? req.userData.role : "noRole" === adminRole) && (req.userData.status === true)) {
            next();
        } else {

            const userId = req.params.userId;

            if (userId === req.userData.userId) {
                next();
            } else {
                return res.status(401).json({
                    message: 'Unauthorised!'
                });
            }

        }
    }
}

function onlyUserPermission() {
    return (req, res, next) => {
        const userId = req.params.userId;
        if (userId === req.userData.userId) {
            next();
        } else {
            return res.status(401).json({
                message: 'Unauthorised!'
            });
        }
    }
}

module.exports = { userPermission, onlyUserPermission }