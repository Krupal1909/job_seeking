const catchAsyncError = require("../Middleware/catchAsyncError");
const ErrorHandler = require("../Middleware/error");
const User = require("../Models/UserModel");
const sendToken = require("../Utills/jwtToken");

const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, role, password } = req.body;
  if (!name || !email || !password || !role || !phone) {
    return next(new ErrorHandler("Please fill full registration form", 400));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already in use"));
  }
  const user = await User.create({ name, password, email, role, phone });
  sendToken(user, 200, res, "User registered successfully");
});

const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please fill full login form", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email invalid or password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Email invalid or password", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("Email invalid or password", 400));
  }

  sendToken(user, 200, res, "User login successfully");
});

const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "user logged out successfully!",
    });
});

const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

module.exports = { register, login, logout, getUser };
