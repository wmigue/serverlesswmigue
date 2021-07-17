const jwt = require('jsonwebtoken')
const Users = require('../models/Users')


//middleware para saber si tiene token activo.
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



//middleware para identificar que rol tiene el usuario que hace el request.
const hasRole = role => (req, res, next) => {
    if (req.user_buscado.rol === role) { //user_buscado viene de isAuthenticated, cuando se ejecuta next()
        return next()
    }
    return res.status(403).send({ noHayRol: '!! No tenes el ROL requerido para ingresar al sistema .' })
}



module.exports = {
    isAuthenticated,
    hasRole,
}