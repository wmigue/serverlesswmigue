const express = require('express')
const router = express.Router() //manjando las peticiones o routers
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
const { isAuthenticated } = require('../auth/index')



const signToken = (_id) => { //otra encryptacion
    return jwt.sign({ _id }, 'aleatorio', {
       // expiresIn: 60 * 60 * 24 * 365, //duracion del token , en este caso un año.
       expiresIn: 60,
    })

}


//creando elementos 
router.post('/login', (req, res) => {
    const { emaill, passwordd } = req.body
    Users.findOne({ email: emaill }).exec()
        .then(user => {
            if (!user) {
                const comentario = 'usuario o contraseña no coinciden.'
                return res.send(comentario)
            }
            crypto.pbkdf2(passwordd, user.salt, 10000, 64, 'sha1', (err, key) => { //encripto password con el salt almacenados en bd, para despues compararlo abajo
                const encryptedPassword = key.toString('base64') //lo paso al formato del pass almacenado en bd.
                if (user.password === encryptedPassword) {
                    const token = signToken(user._id) //genero la llave.
                    return res.send({ token }) //lo envio al cliente.
                }
                return res.send('usuario o contraseña mala.')
            })
        })
})




//creando usuarios
router.post('/register', (req, res) => {
    const { email, password } = req.body
    crypto.randomBytes(16, (err, salt) => { //genero 16 caracteres random.
        const newSalt = salt.toString('base64') //conteniendo esos caracteres genero una cadena larga.
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => { //con pass enviado por usuario y newSalt generame el pass que voy a almacenar en la base de datos.
            const encryptedPassword = key.toString('base64') //el pass generado anteriormente lo paso a string para guardarlo por fin en bd.
            Users.findOne({ email }).exec()
                .then(user => {
                    if (user) {
                        return res.send('ese usuario ya existe.')
                    }
                    Users.create({
                        email: email,
                        password: encryptedPassword, //lo guardo.
                        salt: newSalt, //guardo el salt generado para usarlo en el login.
                    }).then(() => {
                        res.send('usuario creado con èxito.')
                    })
                })
        })
    })
})



//datos del usuario logueado.
router.get('/me', isAuthenticated, (req, res) => {
    const { _id } = req.user_buscado
    Users.findById({ _id }).select('_id email')
        .exec()
        .then(x => res.send(x))

})



//todos los usuarios
router.get('/usersAll', (req, res) => {
    Users.find({})
        .exec()
        .then(x => res.send(x))

})


//eliminar todos los usuarios
router.delete('/usersDeleteAll', (req, res) => {
    Users.remove({})
        .exec()
        .then(x=>res.send(x))
})









module.exports = router