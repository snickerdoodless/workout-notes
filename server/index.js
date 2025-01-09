const express = require("express");
const morgan = require("morgan");
const workoutRoutes = require("./routes/workoutRoute.js");
const mongoose = require("mongoose");
const path = require("path"); // Import path module
require('dotenv').config();

// init app
const app = express();

// middleware
app.use(morgan("short")); // for showing request packet
app.use(express.json());
app.use('/api/workouts', workoutRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Serve static files from the React app
        app.use(express.static(path.join(__dirname, '../client/build')));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
        });

        // Start the server
        app.listen(process.env.PORT, () => {
            console.log("Server is running on port", process.env.PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });