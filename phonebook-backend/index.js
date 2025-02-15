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

app.get("/api/persons", async (request, response) => {
    try {
        const persons = await Person.find({})
        response.json(persons)
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
})

app.get("/api/persons/:id", async (request, response, next) => {
    try {
        const person = await Person.findById(request.params.id)
        if (person) {
            response.json(person)
        } else {
            response.status(404).end()
        }
    } catch (error) {
        next(error)
    }
})

app.get("/info", async (req, res) => {
    try {
        const persons = await Person.find({})
        const personCount = persons.length
        res.send(createMessage(personCount, new Date()))
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

app.delete("/api/persons/:id", async (req, res, next) => {
    try {
        await Person.findByIdAndRemove(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

app.post("/api/persons", async (req, res, next) => {
    try {
        const body = req.body
        console.log(body)
        if (!body.name) {
            return res.status(400).json({
                error: "name missing"
            })
        }
        if (!body.number) {
            return res.status(400).json({
                error: "number missing"
            })
        }

        const newPerson = new Person({
            name: body.name,
            number: body.number
        })

        // Save the new person to the database
        const savedPerson = await newPerson.save()

        // Return the saved person as the response
        res.json(savedPerson)
    } catch (err) {
        next(err)
    }
})

app.put("/api/persons/:id", async (request, response, next) => {
    try {
        const body = request.body

        const pers = {
            name: body.name,
            number: body.number
        }

        const updatedPerson = await Person.findByIdAndUpdate(
            request.params.id,
            pers,
            { new: true }
        )

        response.json(updatedPerson)
    } catch (error) {
        next(error)
    }
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
