const mongoose = require('mongoose')
const schema = mongoose.Schema

const Orders = mongoose.model('Orders', new schema({
    meal_id: {type: schema.Types.ObjectId, ref: 'Meal'},
    user_id: {type: schema.Types.ObjectId, ref: 'User'},
}))

module.exports=Orders