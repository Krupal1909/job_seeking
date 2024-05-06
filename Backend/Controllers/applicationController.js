const catchAsyncError = require("../Middleware/catchAsyncError");
const {ErrorHandler} = require("../Middleware/error")
const ApplicationSchema = require("../Models/ApplicationModel");
const cloudinary = require("cloudinary");
const JobSchema = require("../Models/jobModel")
const employerGetAllApplications = catchAsyncError(async (req, res, next) => {
  const { role, _id } = req.user;
  if (role !== "Employer") {
    return next(new ErrorHandler("Only employers can access this route", 403));
  }
  try {
    const applications = await ApplicationSchema.find({ "EmployerId.user": _id });
    res.status(200).json({
      success: true,
      applications,
    });
  } catch (err) {
    next(err);
  }
});

const JobSeekerAllApplications = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer is not allowed to access this role", 400)
    );
  }
  const { _id } = req.user;
  const applications = await ApplicationSchema.find({
    "applicantId.user": _id,
  });
  res.status(200).json({
    success: true,
    applications,
  });
});

const DeleteApplication = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer is not allowed to access this role", 400)
    );
  }
  const { id } = req.params;
  const application = await ApplicationSchema.findById(id);
  if (!application) {
    return next(new ErrorHandler("Application not Found", 404));
  }
  await application.deleteOne();
  res.status(200).json({
    success: true,
    message: "Application deleted successfully",
  });
});



const PostApplications = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Employer") {
    return next(
      new ErrorHandler("Employer is not allowed to access this role", 400)
    );
  }
  if (!req.files || Object.keys(req.files).length === 0) {
    
    return next(new ErrorHandler("File does not exist"), 404);
  }


  const { resume } = req.files;
  const AllowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!AllowedFormats.includes(resume.mimetype)) {
    return next(new ErrorHandler("Please provide valid file type"), 400);
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    resume.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error",
      cloudinaryResponse.error || "Unknown cloudinary error"
    );
    return next(new ErrorHandler("failed to upload resume", 500));
  }

  const { name, email, coverLetter, phone, address, jobId } = req.body;
  const applicantId = {
    user: req.user._id,
    role: "Job Seeker",
  };
  if (!jobId) {
    return next(new ErrorHandler("Job Not Found", 404));
  }
  const jobDetails = await JobSchema.findById(jobId);
  if (!jobDetails) {
    return next(new ErrorHandler("Job Not Found", 404));
  }

  const employerId = {
    user: jobDetails.postedBy,
    role: "Employer",
  };
  if (
    !name ||
    !email ||
    !coverLetter ||
    !phone ||
    !address ||
    !applicantId ||
    !employerId ||
    !resume
  ) {
    return next(new ErrorHandler("Please provide a valid details", 404));
  }
  const application = await ApplicationSchema.create({
    name,
    email,
    coverLetter,
    phone,
    address,
    applicantId,
    employerId,
    resume: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    EmployerId: {
      user: employerId.user,
      role: "Employer", // Assuming "Employer" is the correct role for EmployerId
    },
  });
  res.status(200).json({
    success: true,
    message: "Job posted successfully",
    application,
  });
});
module.exports = {
  employerGetAllApplications,
  JobSeekerAllApplications,
  DeleteApplication,
  PostApplications,
};
