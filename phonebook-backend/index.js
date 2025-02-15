const { response } = require("express")
const { createMessage } = require("./message")

const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv").config()
const Person = require("./models/Person.js")
const app = express()
app.use(express.json())
app.use(morgan("tiny"))
app.use(cors())
app.use(express.static("build"))


app.get("/api/persons", (request, response) => {
    Person.find({}).then(persons => {
        //console.log(persons)
        response.json(persons)
    })
})

app.get("/api/persons/:id", (request, response, next) => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person)
        }
        else response.status(404).end()
    })
        .catch(error => next(error))


    /*const id = Number.parseInt(request.params.id)
    //console.log(id)
    const person = numbers.find(a => {
        //console.log(a.id, typeof a.id, id, typeof id, a.id === id)
        return a.id === id
    })
    //console.log(person)
    if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }*/
})

app.get("/info", (req, res) => {
    Person.find({}).then(persons => {
        //console.log(persons)
        let personCount = persons.length
        //console.log(persons.length)
        res.send(createMessage(personCount, new Date()))
    })
})

app.delete("/api/persons/:id", (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
            console.log(result)
        })
        .catch(error => next(error))
})

app.post("/api/persons", (req, res, next) => {
    const body = req.body
    console.log(body)
    const newPerson = new Person({
        name: body.name,
        number: body.number
    })
    //const personNames = numbers.map(a => a.name)
    //console.log(personNames)
    console.log(newPerson)
    if (!newPerson.name) {
        res.status(400).json({
            error: "name missing"
        })
    }
    else if (!newPerson.number) {
        res.status(400).json({
            error: "number is missing"
        })
    }
    /*else if(personNames.includes(newPerson.name)){
        res.status(400).json({ 
            error: 'name must be unique' 
        })
    }*/
    else {
        newPerson.save().then(savedNote => {
            response.json(savedNote)
        })
            .catch(error => next(error))
    }
})

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body

    const pers = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, pers, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    }
    if (error.name === "ValidationError") {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}
app.use(errorHandler)

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})