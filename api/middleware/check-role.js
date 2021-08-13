
function authRole(role) {
    return (req, res, next) => {
        if ((req.userData.role !== role) || (req.userData.status === false)) {
            console.log("ROLE BLOCKED");
            res.status(401);
            return res.send('Not allowed');
        } else {
            next();
        }
    }
}

function multipleAuthRoles(roles) {
    return (req, res, next) => {
        if (roles.length) {
            for (let i = 0; i < roles.length; i++) {
                if (req.userData.role !== roles[i]) {
                    next();
                }
            }
            res.status(401);
            return res.send('Not allowed');
        } else {
            res.status(401);
            return res.send('Not allowed');
        }
    }
}

function genderRole(gender) {
    return (req, res, next) => {
        if (req.userData.gender !== gender) {
            console.log("GENDER BLOCKED");
            res.status(401);
            return res.send('Not allowed');
        } else {
            console.log("GENDER ALLOWED");
            next();
        }
    }
}

module.exports = { authRole, genderRole, multipleAuthRoles }