const express = require("express")
const Workouts = require("../models/workoutModels.js")
const {
    addWorkouts,
    getAllWorkouts,
    getWorkouts,
    deleteRecord,
    updateRecord
} = require("../controllers/workoutControllers.js")

const route = express.Router()


route.get('/', getAllWorkouts)

route.get('/:id', getWorkouts)

route.post('/', addWorkouts)

route.delete('/:id', deleteRecord)

route.patch('/:id', updateRecord)

module.exports = route