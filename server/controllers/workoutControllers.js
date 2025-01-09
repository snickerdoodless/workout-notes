const Workouts = require("../models/workoutModels.js")
const mongoose = require("mongoose")

// handle workout creation
const addWorkouts = async (req, res) => {
    const { title, load, reps} = req.body

    // error handling
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    
    if (!load) {
        emptyFields.push('load')
    }

    if (!reps) {
        emptyFields.push('reps')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please Fill All Fields!"})
    }

    try {
        const workout = await Workouts.create({title, load, reps})
        res.status(200).json(workout)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// fetch all workouts
const getAllWorkouts = async (req, res) => {
    const workout = await Workouts.find({}).sort({createdAt: -1})

    res.status(200).json(workout)
}

// fetch single workouts
const getWorkouts = async (req, res) => {
    const { id } = req.params
   
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "Invalid ID."})
    }
    
    const workout = await Workouts.findById(id)

    if (!workout) {
        return res.status(404).json({error: "No data found."})
    }

    res.status(200).json(workout)
}

// delete workout records
const deleteRecord = async (req, res) => {
    
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: "Invalid ID"})
        }


        const workout = await Workouts.findByIdAndDelete(id)

        if (!workout) {
            return res.status(404).json({error: "No data found."})
        }

        res.status(200).json(workout)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


// update workout records
const updateRecord = async (req, res) => {

    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({error: "Invalid ID"})
        }

        const workout = await Workouts.findByIdAndUpdate(id, {
            ...req.body
        }, {new: true})
        
        if (!workout) {
            return res.status(404).json({error: "No data found."})
        }

        res.status(200).json(workout)
        
    } catch (error) {
        res.status(500).json({error: error.message})
    }
    
}

module.exports = {
    addWorkouts,
    getAllWorkouts,
    getWorkouts,
    deleteRecord,
    updateRecord
}
