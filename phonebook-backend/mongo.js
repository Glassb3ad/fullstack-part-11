const mongoose = require("mongoose")

const url = process.env.MONGODB_URI
mongoose.connect(url)
const personSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Number = mongoose.model("Person", personSchema)

if (process.argv.length > 3) {

    const newNumber = new Number({
        name: process.argv[3],
        number: process.argv[4]
    })

    await newNumber.save()

    console.log(newNumber + "saved")
    mongoose.connection.close()
}
else {
    const res = await Number.find({})
    res.forEach(a => {
        console.log(a)
    })
    mongoose.connection.close()
}