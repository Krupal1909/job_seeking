const mongoose = require('mongoose');

const ConnectDb = async(req,res) => {
    try {
        await mongoose.connect('mongodb+srv://krupalpatel10520:bU0fNTSx5ifHqz4k@cluster0.bug2vij.mongodb.net/job-mern')
        console.log("connected to MongoDB");
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success : false,
            message : "Database Not Established",
        });
    }
}

module.exports = ConnectDb;