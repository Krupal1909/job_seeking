const mongoose = require("mongoose");
const validator = require("validator");
const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"],
    minLength: [3, "name must be at least 3 characters"],
    maxLength: [30, "name must be at most 30 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    validator: [validator.isEmail, "please provide a valid email"],
  },
  coverLetter: {
    type: String,
    required: [true, "cover letter is required"],
  },
  phone: {
    type: Number,
    required: [true, "phone is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Job Seeker"],
      required: true,
    },
  },
  EmployerId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
});
const Application = mongoose.model("Application", ApplicationSchema);
module.exports = Application;
