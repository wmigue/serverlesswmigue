const mongoose = require('mongoose')
const schema = mongoose.Schema

const Meals = mongoose.model('Meal', new schema({
    name: String,
    desc: String,

}))

module.exports=Meals