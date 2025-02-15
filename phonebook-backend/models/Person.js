const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

require("dotenv").config()

//console.log(process.env)
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI
//const url = "mongodb+srv://jhalah:Fullstack@cluster0.z1fly.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority" 

console.log("connecting to", url)
mongoose.connect(url)
    .then((_result) => {
        console.log("connected to MongoDB")
        console.log(_result)
    })
    .catch((error) => {
        console.log("error connecting to MongoDB:", error.message)
    })

const noteSchema = new mongoose.Schema({
    name: {type:String, required: true, unique: true, minlength: 3},
    number: {type: String, required: true, minlength: 8} 
})
noteSchema.plugin(uniqueValidator)

noteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", noteSchema)