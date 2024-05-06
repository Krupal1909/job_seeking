const catchAsyncError = require("../Middleware/catchAsyncError");
const {ErrorHandler} = require("../Middleware/error");
const JobSchema = require("../Models/jobModel");

const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await JobSchema.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed to access this role", 400)
    );
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler(
        "Please either provide fixed salary or ranged salary",
        400
      )
    );
  }
  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler(
        "Cannot enter fixed salary and ranged salary together  ",
        400
      )
    );
  }
  const postedBy = req.user._id;
  const job = await JobSchema.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy: postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job Posted successfully",
    job,
    postedBy,
  });
});

const getmyJobs = catchAsyncError(async (req, res, next) => {
  try {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker is not allowed to access this role", 400)
      );
    }
    const myJobs = await JobSchema.find({ postedBy: req.user._id });
    res.status(200).json({
      success: true,
      myJobs,
    });
  } catch (error) {
      console.log(error);
  }
});


const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed to access this role", 400)
    );
  }
  const { id } = req.params;
  let job = await JobSchema.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job Not Found", 404));
  }
  job = await JobSchema.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  console.log("to backend",req.body);
  res.status(200).json({
    success: true,
    
    message: "Job updated successfully",
  });
});

const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker is not allowed to access this role", 400)
    );
  }
  const { id } = req.params;
  let job = await JobSchema.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job Not Found", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    job,
    message: "Job Deleted successfully",
  });
});

const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await JobSchema.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job Not Found", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("CastError", 404));
  }
});

module.exports = {
  getAllJobs,
  postJob,
  getmyJobs,
  updateJob,
  deleteJob,
  getSingleJob,
};
