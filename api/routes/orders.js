const express = require('express')
const Orders = require('../models/Orders')
const router = express.Router()
const { isAuthenticated, hasRole } = require('../auth/index')



//obteniendo todos los pedidos  de un usuario
router.get('/userOrders', isAuthenticated, hasRole('user'), (req, res) => {
    const { _id } = req.user_buscado
    Orders.find({user_id: _id}).select('meal_id user_id')
    .populate({path: 'meal_id', select: 'name'})
    .populate({path: 'user_id', select: 'email'})
        .exec()
        .then(x => res.status(200).send(x))
})




//todos los pedidos de todos los usuarios
router.get('/', isAuthenticated,  (req, res) => {
    Orders.find({})
        .exec()
        .then(x => res.status(200).send(x))
})






//por id
router.get('/:id', (req, res) => {
    Orders.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})



//creando pedidos
router.post('/', isAuthenticated, (req, res) => {
    const { _id } = req.user_buscado //viene de la funcion isAuthenticated, y extraigo el _id para usarlo abajo.
    Orders.create({ ...req.body, user_id: _id }) //crear con los datos que te mando por req.body, pero en el user_id, guardame el id del usuario que hace el pedido.
        .then(x => res.status(201).send(x))
})



//Actualizando pedidos
router.put('/:id', isAuthenticated, (req, res) => {
    Orders.findOneAndUpdate(req.params.id, req.body) //actualizame cuando req.params.id (id pedido) con lo que te mando en el body del request.
        .then(() => res.sendStatus(204))
})



//eliminando pedidos por id
router.delete('/:id', isAuthenticated, (req, res) => {
    Orders.findOneAndDelete(req.params.id, req.body)
        .exec()
        .then(() => res.sendStatus(204))
})







module.exports = router