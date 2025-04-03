const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs');
const jsonwebtoken = require("jsonwebtoken");
const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter a name"],
    minLength: [4, "Name must be at least 4 characters"],
    maxLength: [30, "Name Can not exceed 15 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "please provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "Please enter a valid phone number"],
  },
  password: {
    type: String,
    required: [true, "Please enter a valid password"],
    minLength: [8, "Name must be at least 8 characters"],
    maxLength: [30, "Name Can not exceed 30 characters"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "Please enter a valid role"],
    enum: ["Employer", "Job Seeker"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Hashing the password

userModel.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//compare the password

userModel.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userModel.methods.getJWTToken = function () {
  const token = jsonwebtoken.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
  return token;
};

const User = mongoose.model("user", userModel);
module.exports = User;
