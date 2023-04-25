const {
  sendOTPValidator,
  verifyEmailValidator,
  loginValidator,
  feedbackValidator,
  resetMailValidator,
  resetPassValidator,
} = require("../validators/joi-validator");
const User = require("../models/User");
const { generateOTP } = require("../Utils/generateOTP");
const passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const sendEmail = require("../Utils/sendEmail");
const sendEmail2 = require("../Utils/sendEmail2");
const webpush = require("web-push");
const { instance } = require("../Utils/razorPayInstance");

exports.registerUser = async (req, res) => {
  req.body.otp = "1";
  const { error } = sendOTPValidator.validate(req.body);
  console.log(error);
  try {
    if (error) return res.status(400).json({ msg: error.details[0].message });

    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      userName,
      mobileNo,
      selectedImg,
      currTimeStamp,
    } = req.body;

    //find existing user
    const existingUser = await User.findOne({ email: email });

    //if user already exists simply return
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //if user doesn't exist create new one and send otp for its verification

    //check whether both passwords are same
    if (password !== confirmPassword) {
      console.log("No match");
      return res.status(400).json({ msg: "Password don't match" });
    }
    //hash the password before storing it in database
    const hashedPassword = passwordHash.generate(password);

    //save the user in database
    //User creation (currently unverified)
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      firstName: firstName,
      lastName: lastName,
      userName: userName,
      mobileNo: mobileNo,
      profilePic: selectedImg,
      createdAt: new Date(currTimeStamp).toISOString(),
      verified: true,
    });

    if (!newUser) {
      return res
        .status(500)
        .json({ msg: "Unable to sign up please try again later" });
    }

    return res.status(200).json({
      msg: "You're Registered Successfully, Login Now",
    });
  } catch (err) {
    console.log({ err });
    return res.status(500).json({ msg: "Something went wrong.." });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  const { error } = loginValidator.validate({ email, password });
  console.log(error);
  try {
    if (error) return res.status(400).json({ msg: error.details[0].message });

    //check if user with this email even exists
    const oldUser = await User.findOne({ email: email });
    //if no user exists
    if (!oldUser) return res.status(404).json({ msg: "User doesn't exist" });

    //if user not verified tell to verify first
    if (!oldUser.verified)
      return res.status(400).json({
        msg: "Please verify your account first! Check the otp sent on mail during registration",
      });

    //Verify if passowrd is correct
    const isMatch = passwordHash.verify(password, oldUser.password);

    //if password doesn't match
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });
    console.log("password matched");

    //sign a token for user to login into his account and send it frontend where token will be stored in localstorage
    const payload = {
      email: oldUser.email,
      id: oldUser._id,
      role: oldUser.role,
    };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
      expiresIn: "3h",
    });

    console.log("token signed");

    return res.status(200).json(token);
  } catch (err) {
    return res.status(500).json({ msg: "Something went wrong.." });
  }
};

exports.getCurrentUser = async (req, res) => {
  console.log("loading user");
  try {
    if (!req.userId) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    //load the user from id and send to frontend
    const user = await User.findById(req.userId);
    return res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      _id: user._id,
      email: user.email,
      mobileNo: user.mobileNo,
      role: user.role,
      profilePic: user.profilePic,
    });
  } catch (err) {
    return res.status(500).json({ msg: "Something went wrong.." });
  }
};

exports.sendFeedback = async (req, res) => {
  const { error } = feedbackValidator.validate(req.body);
  console.log(req.body);
  try {
    if (error) {
      return res
        .status(400)
        .json({ msg: error.details[0].message, severity: "error" });
    }

    //send self email using the details
    const receiverMail = "smartparking678@gmail.com";
    const html = `${req.body.feedback}`;
    const subject = `Feedback from ${req.body.firstName} ${req.body.lastName}`;

    await sendEmail2({ html, subject, receiverMail });

    return res.status(200).json({ msg: "Feedback submit successfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Something went wrong.." });
  }
};

exports.setProfilePic = async (req, res) => {
  if (!req.userId) return res.status(401).json({ msg: "Unauthorized" });

  try {
    if (!req.body.selectedImg) {
      return res.status(400).json({ msg: "Please upload a picture first" });
    }

    ///update profilePic with selectedImg
    await User.findByIdAndUpdate(req.userId, {
      profilePic: req.body.selectedImg,
    });
    return res.status(200).json({ msg: "Profile image updated succesfully" });
  } catch (err) {
    return res.status(500).json({ msg: "Something went wrong.." });
  }
};
