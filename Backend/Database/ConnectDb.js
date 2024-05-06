const mongoose = require('mongoose');

const ConnectDb = async(req,res) => {
    try {
        await mongoose.connect('mongodb+srv://krupalpatel10520:zKB59FxTqFB1z1P0@cluster0.v42yzxg.mongodb.net/Job-seeking-mern')
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