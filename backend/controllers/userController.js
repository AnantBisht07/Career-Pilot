import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/dataUri.js";
// import { singleUpload } from "../middlewares/multer.js"
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    // cloudinary
    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User is already exists with this email!",
        success: false,
      });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role: Array.isArray(role) ? role[0] : role, // Convert array to a single string
      profile: {
        profilePhoto: cloudResponse.secure_url,
      }
    });

    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password!",
      });
    }

    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: "User password is missing!",
      });
    }

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is missing!",
      });
    }

    //  compare passwords
    let isPasswordMatch = await bcrypt.compare(password, user.password); // normal pass, db pass
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password!",
      });
    }

    // check role is correct or not
    if (role != user.role) {
      return res.status(400).json({
        success: false,
        message: "Account doesn't exist with current role!",
      });
    }

    // token generate
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    // jb bhi login krega is data ko bhej dunga..
    // Prepare user data to send back
    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        success: true,
        message: `Welcome back ${user.fullname}`,
        user,
      });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const logout = async (req, res) => {
  try {
    
    return res
      .status(200)
      .cookie("token", "", { httpOnly: true, maxAge: 0 }) // cookie ka token empty krke expire krdiya.
      .json({
        success: true,
        message: "Logged out successfully!",
      });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, skills, bio } = req.body;

    const file = req.file;

    let cloudResponse;

    if (file) {
      try {
        const fileUri = getDataUri(file);
        cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
          resource_type: "raw",
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to upload file",
        });
      }
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(","); // string ko array bna dia
    }

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found!",
      });
    }

    // now update the user with new details ( we can also do findByIdAndUpdate)
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // resume will come here later.....
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url; // saving the URL of the uploaded file from cloudinary
      user.profile.resumeOriginalName = file.originalname; //  save the original file name
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully!",
      user,
    });
  } catch (error) {
    console.log(error);
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
