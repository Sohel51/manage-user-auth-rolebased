function authUser(req, res, next) {
    if (req.user == null) {
        res.send("You need to sign in first")
    }

    next();
}

function authRole(role) {
    return (req, res, next) => {
        if(req.user.role !== role){
            res.status(401)
            return res.send("Not Allowed")
        }

        next();
    }

}

module.exports = {
    authUser,
    authRole
}