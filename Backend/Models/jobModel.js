const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please provide job title"],
    minLength: [3, "Job title must contain at least three characters"],
    maxLength: [50, "Job title cannot exceed 50 characters"],
  },
  description: {
    type: String,
    required: [true, "please provide job description"],
    minLength: [30, "Job description must contain at least 30 characters"],
    maxLength: [350, "Job title cannot exceed 350 characters"],
  },
  category: {
    type: String,
    required: [true, "please provide job category"],
  },
  country: {
    type: String,
    required: [true, "please provide job country"],
  },
  city: {
    type: String,
    required: [true, "please provide job city"],
  },
  location: {
    type: String,
    required: [true, "please provide exact location"],
    minLength: [15, "Job location must contain at least 15 characters"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "fixedSalary  must contain at least four characters"],
    maxLength: [10, "fixedSalary  cannot exceed 10 characters"],
  },
  salaryFrom: {
    type: Number,
    minLength: [4, "salary  From must contain at least four characters"],
    maxLength: [10, "salary  From  cannot exceed 10 characters"],
  },
  salaryTo: {
    type: Number,
    minLength: [4, "salaryTo must contain at least four characters"],
    maxLength: [10, "salaryTo  cannot exceed 10 characters"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
