const jwt = require('jsonwebtoken')
const Users = require('../models/Users')


const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.sendStatus(403)
    }
    jwt.verify(token, 'aleatorio', (err, decoded) => {
        const { _id } = decoded
        Users.findOne({ _id }).exec()
            .then(user => {
                req.user_buscado = user
                next()
            })
    })
}



//no lo estoy usando, es solo para identificar que rol tiene el usuario que hace el request.
const hasRole = role => (req, res, next) => {
if(req.user_buscado.rol === role){
    return next()
}
    res.sendStatus(403)
}



module.exports = {
    isAuthenticated,
    hasRole,
}